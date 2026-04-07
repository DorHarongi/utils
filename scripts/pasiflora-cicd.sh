#!/bin/bash

# ============================================
# Pasiflora Smart CI/CD Script (Blue-Green)
# ============================================
# Zero-downtime deploys using slot-specific build directories.
# Each slot (blue/green) has its own build dir that persists while
# the service runs. No files are moved from under a running process.

PASIFLORA_DIR=~/Desktop/pasiflora
LOCKFILE="/tmp/pasiflora-cicd.lock"
LOG_DIR="$PASIFLORA_DIR/.cicd-logs"
SCRIPT_PATH="$PASIFLORA_DIR/utils/scripts/pasiflora-cicd.sh"

# ============================================
# Prevent multiple instances (EARLY + ATOMIC)
# ============================================
exec 9>"$LOCKFILE"
if ! flock -n 9; then
  echo "ERROR: Pasiflora CI/CD is already running."
  exit 1
fi
echo $$ 1>&9

# ============================================
# Ensure terminal visibility (double-click safe)
# ============================================
if [ -z "${PASIFLORA_IN_TERMINAL:-}" ] && [ ! -t 0 ]; then
  export PASIFLORA_IN_TERMINAL=1
  gnome-terminal --title="Pasiflora-CICD" -- bash -c "exec \"$0\" $*"
  exit 0
fi

# ============================================
# Configuration
# ============================================
BRANCH=dev
POLL_INTERVAL=10
COOLDOWN=20

# State
RESTART_NEEDED=0
LAST_CHANGE=0
DB_UPDATOR_PID=""

# Repos
REPOS=(
  "$PASIFLORA_DIR/client"
  "$PASIFLORA_DIR/utils"
  "$PASIFLORA_DIR/userService"
  "$PASIFLORA_DIR/dbUpdator"
)

# ============================================
# Blue-Green Configuration
# ============================================
ACTIVE_SLOT_FILE="$PASIFLORA_DIR/.bluegreen-active-slot"
DEPLOY_LOCK="$PASIFLORA_DIR/.deploy-in-progress"
NGINX_UPSTREAM_CONF="/etc/nginx/pasiflora-upstream.conf"
BLUE_PORT=3001
GREEN_PORT=3002
LEGACY_PORT=3000
HEALTH_RETRIES=30
HEALTH_INTERVAL=2
BUILD_BASE="$PASIFLORA_DIR/.cicd-build"

# ============================================
# Paths
# ============================================
CERT_DIR="$PASIFLORA_DIR/certs"
CERT_FILE="$CERT_DIR/fullchain.pem"
KEY_FILE="$CERT_DIR/privkey.pem"
CLIENT_DIST="$PASIFLORA_DIR/client/dist"
NGINX_CONF_SRC="$PASIFLORA_DIR/utils/nginx-pasiflora.conf"
NGINX_CONF_DST="/etc/nginx/conf.d/pasiflora.conf"

# ============================================
# Helpers
# ============================================
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# ============================================
# Blue-Green Slot Management
# ============================================
get_active_slot() {
  if [[ -f "$ACTIVE_SLOT_FILE" ]]; then
    cat "$ACTIVE_SLOT_FILE"
  else
    echo ""
  fi
}

get_slot_port() {
  case "$1" in
    blue)   echo "$BLUE_PORT" ;;
    green)  echo "$GREEN_PORT" ;;
    legacy) echo "$LEGACY_PORT" ;;
    *)      echo "" ;;
  esac
}

get_inactive_slot() {
  case "$(get_active_slot)" in
    blue)   echo "green" ;;
    green)  echo "blue" ;;
    legacy) echo "blue" ;;
    *)      echo "blue" ;;
  esac
}

# ============================================
# Process Management
# ============================================
kill_rogue_instances() {
  local active
  active=$(get_active_slot)
  local active_port
  if [[ -n "$active" && "$active" != "legacy" ]]; then
    active_port=$(get_slot_port "$active")
  else
    active_port="$LEGACY_PORT"
  fi
  local rogue_found=0
  for port in $BLUE_PORT $GREEN_PORT $LEGACY_PORT; do
    [[ "$port" == "$active_port" ]] && continue
    local pids
    pids=$(sudo lsof -ti "tcp:$port" 2>/dev/null)
    if [[ -n "$pids" ]]; then
      echo "$pids" | xargs sudo kill -9 2>/dev/null
      log "SAFETY: Killed rogue process on port $port (active=$active, active_port=$active_port)"
      rogue_found=1
    fi
  done
  [[ $rogue_found -eq 1 ]] && sleep 1
}

kill_process_on_port() {
  local port="$1"
  local pids
  pids=$(sudo lsof -ti "tcp:$port" 2>/dev/null)
  if [[ -z "$pids" ]]; then
    pids=$(sudo ss -tlnp "sport = :$port" 2>/dev/null | grep -oP 'pid=\K\d+' | sort -u)
  fi
  if [[ -z "$pids" ]]; then
    sudo fuser -k "$port/tcp" 2>/dev/null
    sleep 1
    return
  fi
  if [[ -n "$pids" ]]; then
    echo "$pids" | xargs sudo kill -9 2>/dev/null
    log "Killed process(es) on port $port (PIDs: $(echo $pids | tr '\n' ' '))"
    sleep 1
  fi
}

start_userservice_on_port() {
  local port="$1"
  local use_ssl="${2:-0}"
  local build_dir="${3:-$PASIFLORA_DIR/userService}"
  local no_crons="${4:-0}"
  log "Starting userService on port $port (SSL=$use_ssl, NO_CRONS=$no_crons) from=$build_dir..."
  local no_ssl_val=0
  [[ "$use_ssl" -eq 0 ]] && no_ssl_val=1
  setsid bash -c "
    export PASIFLORA_SVC=userservice PORT=$port NO_SSL=$no_ssl_val NO_CRONS=$no_crons
    source ~/.nvm/nvm.sh 2>/dev/null
    cd '$build_dir/dist' || exit 1
    node -e \"
      process.on('SIGTERM', () => { console.log('SIGNAL: SIGTERM'); process.exit(0); });
      process.on('SIGINT',  () => { console.log('SIGNAL: SIGINT');  process.exit(0); });
      process.on('SIGHUP',  () => { console.log('SIGNAL: SIGHUP');  process.exit(0); });
      process.on('beforeExit', (c) => console.log('BEFORE_EXIT code=' + c));
      process.on('exit', (c) => console.log('PROCESS_EXIT code=' + c));
      require('./main');
    \"
    echo \"[\$(date '+%Y-%m-%d %H:%M:%S')] EXIT: node on port $port exited with code \$?\"
  " >> "$LOG_DIR/userService-$port.log" 2>&1 &
}

health_check() {
  local port="$1"
  local retries="${2:-$HEALTH_RETRIES}"
  log "Health-checking port $port (max ${retries} attempts)..."
  for ((i=1; i<=retries; i++)); do
    if curl --max-time 3 -sf "http://localhost:$port/health" >/dev/null 2>&1; then
      log "Health check PASSED on port $port (attempt $i/$retries)"
      return 0
    fi
    if curl --max-time 3 -skf "https://localhost:$port/health" >/dev/null 2>&1; then
      log "Health check PASSED on port $port via HTTPS (attempt $i/$retries)"
      return 0
    fi
    sleep "$HEALTH_INTERVAL"
  done
  log "Health check FAILED on port $port after $retries attempts"
  return 1
}

# ============================================
# Cron Management
# ============================================
enable_crons() {
  local port="$1"
  log "Enabling crons on port $port..."
  local i
  for i in 1 2 3 4 5; do
    if curl -s -X POST --max-time 5 "http://localhost:$port/crons/enable" >/dev/null 2>&1; then
      log "Crons enabled on port $port"
      return 0
    fi
    log "Cron enable attempt $i failed, retrying..."
    sleep 2
  done
  log "WARNING: Failed to enable crons on port $port after 5 attempts"
  return 1
}

# ============================================
# Nginx Management
# ============================================
write_upstream() {
  local port="$1"
  log "Writing nginx upstream -> 127.0.0.1:$port"
  echo "server 127.0.0.1:$port;" | sudo tee "$NGINX_UPSTREAM_CONF" >/dev/null
}

ensure_upstream_file() {
  if [[ -f "$NGINX_UPSTREAM_CONF" ]]; then
    return 0
  fi
  local active
  active=$(get_active_slot)
  local port
  if [[ -n "$active" ]]; then
    port=$(get_slot_port "$active")
  else
    port=$LEGACY_PORT
  fi
  log "Creating initial upstream file -> port $port"
  write_upstream "$port"
}

deploy_nginx_config() {
  if ! command -v nginx &>/dev/null; then
    log "WARNING: nginx not installed, skipping config deploy"
    return 1
  fi

  if [[ -f "$NGINX_CONF_SRC" ]]; then
    sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST" 2>/dev/null
    sudo ln -sf "$NGINX_CONF_DST" /etc/nginx/sites-enabled/pasiflora 2>/dev/null
  fi

  if sudo nginx -t 2>/dev/null; then
    if sudo systemctl is-active --quiet nginx 2>/dev/null; then
      sudo systemctl reload nginx
      log "nginx reloaded successfully"
    else
      sudo systemctl start nginx
      log "nginx started"
    fi
    return 0
  else
    log "ERROR: nginx config test failed -- NOT reloading (old config stays active)"
    return 1
  fi
}

# ============================================
# Blue-Green Deploy for userService
# ============================================
bluegreen_deploy_userservice() {
  local active inactive inactive_port active_port
  active=$(get_active_slot)
  inactive=$(get_inactive_slot)
  inactive_port=$(get_slot_port "$inactive")
  active_port=$(get_slot_port "$active")
  local build_dir="$BUILD_BASE/$inactive"

  # ----------------------------------------------------------
  # First-time: no slot file -- start on blue from its build dir
  # ----------------------------------------------------------
  if [[ -z "$active" ]]; then
    log "=== First-time blue-green setup ==="
    if [[ ! -d "$build_dir/dist" ]]; then
      log "ERROR: No build found at $build_dir/dist for first-time setup"
      return 1
    fi
    kill_process_on_port "$inactive_port"
    start_userservice_on_port "$inactive_port" 0 "$build_dir" 0
    if ! health_check "$inactive_port"; then
      log "ERROR: userService failed to start on port $inactive_port"
      return 1
    fi
    write_upstream "$inactive_port"
    echo "$inactive" > "$ACTIVE_SLOT_FILE"
    log "=== First-time setup complete: $inactive (port $inactive_port) ==="
    return 0
  fi

  # ----------------------------------------------------------
  # Legacy -> Blue: first real blue-green deploy
  # ----------------------------------------------------------
  if [[ "$active" == "legacy" ]]; then
    log "=== Transitioning from legacy to blue-green ==="
    touch "$DEPLOY_LOCK"
    start_userservice_on_port "$inactive_port" 0 "$build_dir" 1
    if ! health_check "$inactive_port"; then
      log "ERROR: New instance failed health check on port $inactive_port"
      log "Keeping legacy service on port $LEGACY_PORT -- no disruption"
      kill_process_on_port "$inactive_port"
      rm -f "$DEPLOY_LOCK"
      return 1
    fi
    write_upstream "$inactive_port"
    deploy_nginx_config
    echo "$inactive" > "$ACTIVE_SLOT_FILE"
    rm -f "$DEPLOY_LOCK"
    sleep 4
    kill_process_on_port "$LEGACY_PORT"
    enable_crons "$inactive_port"
    log "=== Blue-green active: $inactive (port $inactive_port) ==="
    return 0
  fi

  # ----------------------------------------------------------
  # Normal blue-green swap
  # ----------------------------------------------------------
  log "=== Blue-green deploy: $active -> $inactive ==="
  touch "$DEPLOY_LOCK"
  kill_process_on_port "$inactive_port"
  start_userservice_on_port "$inactive_port" 0 "$build_dir" 1
  if ! health_check "$inactive_port"; then
    log "ERROR: New instance failed health check on port $inactive_port"
    log "Keeping current active: $active (port $active_port) -- no disruption"
    kill_process_on_port "$inactive_port"
    rm -f "$DEPLOY_LOCK"
    return 1
  fi
  write_upstream "$inactive_port"
  deploy_nginx_config
  echo "$inactive" > "$ACTIVE_SLOT_FILE"
  rm -f "$DEPLOY_LOCK"
  sleep 4
  kill_process_on_port "$active_port"
  kill_process_on_port "$LEGACY_PORT"
  enable_crons "$inactive_port"
  log "=== Deploy complete: $inactive (port $inactive_port) ==="
  return 0
}

# ============================================
# Stop ALL services (used by trap on exit only)
# ============================================
stop_services() {
  log "Stopping all services..."
  kill_process_on_port "$BLUE_PORT"
  kill_process_on_port "$GREEN_PORT"
  kill_process_on_port "$LEGACY_PORT"
  if [[ -n "$DB_UPDATOR_PID" ]]; then
    kill "$DB_UPDATOR_PID" 2>/dev/null
  fi
  pkill -f "node db-updator.js" 2>/dev/null
  sleep 1
  log "Services stopped."
}

# ============================================
# Repo + Build
# ============================================
pull_repos() {
  log "Pulling latest code..."
  for repo in "${REPOS[@]}"; do
    if [[ -d "$repo" ]]; then
      cd "$repo" || continue
      log "  -> Resetting $(basename "$repo") to origin/$BRANCH"
      git fetch origin "$BRANCH" || return 1
      git reset --hard "origin/$BRANCH" || return 1
      git clean -fd 2>/dev/null
    fi
  done
  return 0
}

fix_node_modules_permissions() {
  for repo in "${REPOS[@]}"; do
    if [[ -d "$repo/node_modules" ]]; then
      sudo chown -R "$(whoami)" "$repo/node_modules" 2>/dev/null
    fi
  done
}

start_persistent_watchdog() {
  log "Starting persistent watchdog (checks every 3s, restart after 3 consecutive failures)"
  (
    source ~/.nvm/nvm.sh 2>/dev/null
    wd_fail_count=0
    while true; do
      sleep 3
      if [[ -f "$DEPLOY_LOCK" ]]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] WATCHDOG: Deploy in progress, skipping checks"
        continue
      fi
      wd_slot=$(cat "$ACTIVE_SLOT_FILE" 2>/dev/null)
      [[ -z "$wd_slot" || "$wd_slot" == "legacy" ]] && continue
      if [[ "$wd_slot" == "blue" ]]; then
        wd_port=$BLUE_PORT
        stale_port=$GREEN_PORT
      else
        wd_port=$GREEN_PORT
        stale_port=$BLUE_PORT
      fi
      # Kill any rogue process on inactive slot or legacy port
      for rp in $stale_port $LEGACY_PORT; do
        local_pid=$(sudo lsof -t -i :"$rp" 2>/dev/null)
        if [[ -n "$local_pid" ]]; then
          sudo kill -9 $local_pid 2>/dev/null
        fi
      done
      wd_build="$BUILD_BASE/$wd_slot"
      [[ ! -d "$wd_build/dist" ]] && continue
      if ! curl -s --max-time 2 "http://localhost:$wd_port/health" >/dev/null 2>&1; then
        wd_fail_count=$((wd_fail_count + 1))
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] WATCHDOG: port $wd_port ($wd_slot) unresponsive ($wd_fail_count/3)"
        if [[ $wd_fail_count -ge 3 ]]; then
          echo "[$(date '+%Y-%m-%d %H:%M:%S')] WATCHDOG: 3 consecutive failures, restarting..."
          sudo fuser -k "$wd_port/tcp" 2>/dev/null
          sleep 1
          setsid bash -c "
            export PASIFLORA_SVC=userservice
            export PORT=$wd_port
            export NO_SSL=1
            cd \"$wd_build/dist\" || exit 1
            node main.js
            echo \"[\$(date '+%Y-%m-%d %H:%M:%S')] WATCHDOG-EXIT: node on port $wd_port exited with code \$?\"
          " >> "$LOG_DIR/userService-$wd_port.log" 2>&1 &
          sleep 6
          if curl -s --max-time 2 "http://localhost:$wd_port/health" >/dev/null 2>&1; then
            curl -s -X POST --max-time 5 "http://localhost:$wd_port/crons/enable" >/dev/null 2>&1
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] WATCHDOG: Crons re-enabled on port $wd_port"
          fi
          wd_fail_count=0
        fi
      else
        wd_fail_count=0
      fi
    done
  ) &
  WATCHDOG_PID=$!
  log "Persistent watchdog PID: $WATCHDOG_PID"
}

build_projects() {
  source ~/.nvm/nvm.sh
  fix_node_modules_permissions

  local inactive
  inactive=$(get_inactive_slot)
  local build_dir="$BUILD_BASE/$inactive"

  local THROTTLE="taskset -c 2,3 nice -n 19 ionice -c 3"

  log "Installing & building utils..."
  cd "$PASIFLORA_DIR/utils" || return 1
  $THROTTLE npm ci --prefer-offline || return 1
  $THROTTLE npm run build || return 1

  log "Installing & building userService (isolated: $build_dir)..."
  cd "$PASIFLORA_DIR/userService" || return 1

  rm -rf "$build_dir"
  mkdir -p "$build_dir" || return 1
  if command -v rsync &>/dev/null; then
    rsync -a --exclude node_modules --exclude dist --exclude dist.prev --exclude .git ./ "$build_dir/"
  else
    tar --exclude=node_modules --exclude=dist --exclude=dist.prev --exclude=.git -cf - . 2>/dev/null \
      | (cd "$build_dir" && tar xf -) || return 1
  fi

  (
    cd "$build_dir" || exit 1
    $THROTTLE npm ci --prefer-offline || exit 1
    $THROTTLE npm run build || exit 1
    exit 0
  ) || {
    log "userService build FAILED in $build_dir"
    rm -rf "$build_dir"
    return 1
  }

  log "userService build OK ($build_dir)"

  log "Installing & building client (to dist/client-new for atomic deploy)..."
  cd "$PASIFLORA_DIR/client" || return 1
  rm -rf .angular/cache
  $THROTTLE npm ci --prefer-offline || return 1
  $THROTTLE npx ng build --configuration=production --output-path=dist/client-new >> "$LOG_DIR/client-build.log" 2>&1 || return 1

  return 0
}

bump_version() {
  local vfile="$PASIFLORA_DIR/userService/version.json"
  local cur="1.0.0"
  if [[ -f "$vfile" ]]; then
    cur=$(grep -oP '"version"\s*:\s*"\K[^"]+' "$vfile" 2>/dev/null || echo "1.0.0")
  fi
  IFS='.' read -r major minor patch <<< "$cur"
  patch=$((patch + 1))
  if (( patch > 9 )); then patch=0; minor=$((minor + 1)); fi
  if (( minor > 9 )); then minor=0; major=$((major + 1)); fi
  local next="${major}.${minor}.${patch}"
  echo "{\"version\":\"${next}\"}" > "$vfile"

  local active
  active=$(get_active_slot)
  local active_build="$BUILD_BASE/$active"
  if [[ -d "$active_build" ]]; then
    cp "$vfile" "$active_build/version.json" 2>/dev/null
  fi

  log "Version bumped: $cur -> $next"
}

# ============================================
# Frontend Deploy (atomic swap + nginx reload)
# ============================================
deploy_frontend() {
  if [[ -d "$CLIENT_DIST/client-new" ]]; then
    log "Atomic deploy: swapping client-new -> client"
    rm -rf "$CLIENT_DIST/client-old"
    [[ -d "$CLIENT_DIST/client" ]] && mv "$CLIENT_DIST/client" "$CLIENT_DIST/client-old"
    mv "$CLIENT_DIST/client-new" "$CLIENT_DIST/client"
  fi
  deploy_nginx_config
}

# ============================================
# dbUpdator restart (not client-facing, simple stop+start)
# ============================================
restart_dbupdator() {
  log "Restarting dbUpdator (with auto-restart)..."
  if [[ -n "$DB_UPDATOR_PID" ]]; then
    kill "$DB_UPDATOR_PID" 2>/dev/null
  fi
  pkill -f "node db-updator.js" 2>/dev/null
  sleep 2
  (
    export PASIFLORA_SVC=dbupdator
    source ~/.nvm/nvm.sh 2>/dev/null
    cd "$PASIFLORA_DIR/dbUpdator" || exit 1
    while true; do
      node db-updator.js
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] db-updator exited unexpectedly, restarting in 5s..."
      sleep 5
    done
  ) >> "$LOG_DIR/dbUpdator.log" 2>&1 &
  DB_UPDATOR_PID=$!
  log "dbUpdator started with auto-restart (wrapper PID: $DB_UPDATOR_PID)"
}

# ============================================
# SSL Certs
# ============================================
ensure_certs() {
  mkdir -p "$LOG_DIR" "$CERT_DIR"
  if [[ ! -f "$CERT_FILE" || ! -f "$KEY_FILE" ]]; then
    if [[ -f /etc/letsencrypt/live/emperium.hopto.org/fullchain.pem ]]; then
      log "Copying SSL certs from letsencrypt..."
      sudo cp /etc/letsencrypt/live/emperium.hopto.org/fullchain.pem "$CERT_FILE" 2>/dev/null
      sudo cp /etc/letsencrypt/live/emperium.hopto.org/privkey.pem "$KEY_FILE" 2>/dev/null
      sudo chown "$(whoami)" "$CERT_FILE" "$KEY_FILE" 2>/dev/null
    fi
  fi
}

# ============================================
# Main Deploy
# ============================================
deploy() {
  log "=========================================="
  log "Starting Deploy"
  log "=========================================="

  kill_rogue_instances

  local old_hash
  old_hash=$(md5sum "$SCRIPT_PATH" 2>/dev/null | awk '{print $1}')

  pull_repos || { log "Deploy aborted: pull failed"; return 1; }

  local new_hash
  new_hash=$(md5sum "$SCRIPT_PATH" 2>/dev/null | awk '{print $1}')

  if [[ "$old_hash" != "$new_hash" ]]; then
    if bash -n "$SCRIPT_PATH" 2>/dev/null; then
      log "CI/CD script changed - restarting with new version..."
      [[ -n "${WATCHDOG_PID:-}" ]] && kill "$WATCHDOG_PID" 2>/dev/null
      flock -u 9 2>/dev/null || true
      exec 9>&- 2>/dev/null || true
      exec bash "$SCRIPT_PATH"
    else
      log "WARNING: New CI/CD script has syntax errors -- continuing with current version"
    fi
  fi

  build_projects || { log "Deploy aborted: build failed"; return 1; }

  if [[ ! -f "$PASIFLORA_DIR/userService/mongo-credentials.txt" ]] || \
     [[ ! -f "$PASIFLORA_DIR/dbUpdator/mongo-credentials.txt" ]]; then
    log "Deploy aborted: mongo-credentials.txt missing (userService or dbUpdator)"
    return 1
  fi

  ensure_certs
  ensure_upstream_file

  if ! bluegreen_deploy_userservice; then
    log "ERROR: Blue-green deploy failed - aborting (no frontend swap, no version bump)"
    return 1
  fi

  restart_dbupdator
  deploy_frontend
  bump_version

  log "=========================================="
  log "Deploy Complete"
  log "=========================================="
}

# ============================================
# Change Detection
# ============================================
check_for_changes() {
  local found=1
  for repo in "${REPOS[@]}"; do
    cd "$repo" || continue
    LOCAL=$(git rev-parse HEAD 2>/dev/null)
    REMOTE=$(git ls-remote --heads origin "$BRANCH" 2>/dev/null | awk '{print $1}')
    if [[ -n "$LOCAL" && -n "$REMOTE" && "$LOCAL" != "$REMOTE" ]]; then
      log "Change detected in $(basename "$repo")"
      found=0
    fi
  done
  return $found
}

# ============================================
# Main
# ============================================
watcher_shutdown() {
  [[ -n "${WATCHDOG_PID:-}" ]] && kill "$WATCHDOG_PID" 2>/dev/null
  log "CI/CD watcher exiting, userService not stopped"
  exit 0
}
trap watcher_shutdown INT TERM
trap 'rm -f "$DEPLOY_LOCK"' EXIT

clear
echo "=========================================="
echo "   Pasiflora CI/CD Watcher (Blue-Green)"
echo "=========================================="

log "Killing any rogue instances..."
kill_rogue_instances

log "Initial deploy..."
deploy

start_persistent_watchdog

log "Watching for changes..."

while true; do
  NOW=$(date +%s)

  kill_rogue_instances

  if check_for_changes; then
    if [[ $RESTART_NEEDED -eq 0 ]]; then
      RESTART_NEEDED=1
      LAST_CHANGE=$NOW
    fi
  fi

  if [[ $RESTART_NEEDED -eq 1 ]]; then
    if (( NOW - LAST_CHANGE >= COOLDOWN )); then
      log "Cooldown passed -> redeploying"
      deploy || log "Deploy failed -- will retry on next change detection"
      RESTART_NEEDED=0

      # Re-check immediately: changes may have arrived during the build
      if check_for_changes; then
        log "New changes detected during build -> queuing immediate redeploy"
        RESTART_NEEDED=1
        LAST_CHANGE=$(date +%s)
      fi
    fi
  fi

  sleep "$POLL_INTERVAL"
done
