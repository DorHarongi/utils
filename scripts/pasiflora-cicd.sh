#!/bin/bash

# ============================================
# Pasiflora Smart CI/CD Script (Blue-Green)
# ============================================
# Phase 1: Restarts on legacy port 3000 + sets up nginx proxy infrastructure
# Phase 2+: True zero-downtime blue-green deploys on ports 3001/3002

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
NGINX_UPSTREAM_CONF="/etc/nginx/pasiflora-upstream.conf"
BLUE_PORT=3001
GREEN_PORT=3002
LEGACY_PORT=3000
HEALTH_RETRIES=30
HEALTH_INTERVAL=2

# ============================================
# Paths
# ============================================
CERT_DIR="$PASIFLORA_DIR/certs"
CERT_FILE="$CERT_DIR/fullchain.pem"
KEY_FILE="$CERT_DIR/privkey.pem"
CLIENT_DIST="$PASIFLORA_DIR/client/dist"
# Isolated npm ci + nest build so live userService is not killed when node_modules is wiped
USER_SERVICE_BUILD_DIR="$PASIFLORA_DIR/.cicd-build/userService"
NGINX_CONF_SRC="$PASIFLORA_DIR/utils/nginx-pasiflora.conf"
NGINX_CONF_DST="/etc/nginx/sites-available/pasiflora"

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
kill_process_on_port() {
  local port="$1"
  local pids
  pids=$(lsof -ti "tcp:$port" 2>/dev/null)
  if [[ -z "$pids" ]]; then
    pids=$(ss -tlnp "sport = :$port" 2>/dev/null | grep -oP 'pid=\K\d+' | sort -u)
  fi
  if [[ -n "$pids" ]]; then
    echo "$pids" | xargs kill -9 2>/dev/null
    log "Killed process(es) on port $port (PIDs: $(echo $pids | tr '\n' ' '))"
    sleep 1
  fi
}

start_userservice_on_port() {
  local port="$1"
  local use_ssl="${2:-0}"
  local app_root="${USERSERVICE_APP_ROOT:-$PASIFLORA_DIR/userService}"
  log "Starting userService on port $port (SSL=$use_ssl) app_root=$app_root..."
  (
    export PASIFLORA_SVC=userservice
    export PORT="$port"
    [[ "$use_ssl" -eq 0 ]] && export NO_SSL=1
    source ~/.nvm/nvm.sh 2>/dev/null
    cd "$app_root/dist" && exec node main.js
  ) >> "$LOG_DIR/userService-$port.log" 2>&1 &
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
# Nginx Management
# ============================================
write_upstream() {
  local port="$1"
  log "Writing nginx upstream Ã¢â€ â€™ 127.0.0.1:$port"
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
  log "Creating initial upstream file Ã¢â€ â€™ port $port"
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
    log "ERROR: nginx config test failed Ã¢â‚¬â€ NOT reloading (old config stays active)"
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

  # ----------------------------------------------------------
  # First-time: no slot file Ã¢â‚¬â€ restart on legacy port 3000
  # This gives us the same downtime as the old script (a few seconds).
  # Sets up nginx infrastructure without changing user experience.
  # ----------------------------------------------------------
  if [[ -z "$active" ]]; then
    log "=== First-time blue-green setup (legacy mode) ==="
    kill_process_on_port "$LEGACY_PORT"
    start_userservice_on_port "$LEGACY_PORT" 0
    if ! health_check "$LEGACY_PORT"; then
      log "ERROR: userService failed to start on legacy port $LEGACY_PORT"
      return 1
    fi
    write_upstream "$LEGACY_PORT"
    echo "legacy" > "$ACTIVE_SLOT_FILE"
    log "=== Legacy mode active Ã¢â‚¬â€ next deploy will be blue-green ==="
    return 0
  fi

  # ----------------------------------------------------------
  # LegacyÃ¢â€ â€™Blue: first real blue-green deploy
  # Old service on 3000 (HTTPS for old clients), new on 3001 (HTTP behind nginx)
  # ----------------------------------------------------------
  if [[ "$active" == "legacy" ]]; then
    log "=== Transitioning from legacy to blue-green ==="
    log "Starting new instance on $inactive (port $inactive_port)..."
    start_userservice_on_port "$inactive_port" 0
    if ! health_check "$inactive_port"; then
      log "ERROR: New instance failed health check on port $inactive_port"
      log "Keeping legacy service on port $LEGACY_PORT Ã¢â‚¬â€ no disruption"
      kill_process_on_port "$inactive_port"
      return 1
    fi
    write_upstream "$inactive_port"
    deploy_nginx_config
    kill_process_on_port "$LEGACY_PORT"
    echo "$inactive" > "$ACTIVE_SLOT_FILE"
    log "=== Blue-green active: $inactive (port $inactive_port) ==="
    return 0
  fi

  # ----------------------------------------------------------
  # Normal blue-green swap
  # ----------------------------------------------------------
  log "=== Blue-green deploy: $active Ã¢â€ â€™ $inactive ==="
  start_userservice_on_port "$inactive_port" 0
  if ! health_check "$inactive_port"; then
    log "ERROR: New instance failed health check on port $inactive_port"
    log "Keeping current active: $active (port $active_port) Ã¢â‚¬â€ no disruption"
    kill_process_on_port "$inactive_port"
    return 1
  fi
  write_upstream "$inactive_port"
  deploy_nginx_config
  kill_process_on_port "$active_port"
  echo "$inactive" > "$ACTIVE_SLOT_FILE"
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
      log "  Ã¢â€ â€™ Resetting $(basename "$repo") to origin/$BRANCH"
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

build_projects() {
  source ~/.nvm/nvm.sh
  fix_node_modules_permissions

  log "Installing & building utils..."
  cd "$PASIFLORA_DIR/utils" || return 1
  npm ci || return 1
  npm run build || return 1

  log "Installing & building userService..."
  unset USERSERVICE_APP_ROOT
  cd "$PASIFLORA_DIR/userService" || return 1
  # prebuild runs "rimraf dist" - preserve live dist (same as dist.prev pattern).
  # npm ci MUST NOT run in this tree while userService is up: deleting node_modules
  # breaks the running Nest process (502 until deploy finishes). Build in isolation.
  if [[ -d dist ]]; then
    log "Preserving live build: dist -> dist.prev (avoids rimraf breaking running API)"
    rm -rf dist.prev
    mv dist dist.prev || return 1
  fi

  rm -rf "$USER_SERVICE_BUILD_DIR"
  mkdir -p "$USER_SERVICE_BUILD_DIR" || return 1
  if command -v rsync &>/dev/null; then
    rsync -a --exclude node_modules --exclude dist --exclude dist.prev --exclude .git ./ "$USER_SERVICE_BUILD_DIR/"
  else
    tar --exclude=node_modules --exclude=dist --exclude=dist.prev --exclude=.git -cf - . 2>/dev/null \
      | (cd "$USER_SERVICE_BUILD_DIR" && tar xf -) || return 1
  fi

  (
    cd "$USER_SERVICE_BUILD_DIR" || exit 1
    npm ci || exit 1
    npm run build || exit 1
  ) || {
    log "userService build failed - restoring dist.prev if present"
    cd "$PASIFLORA_DIR/userService" || return 1
    if [[ -d dist.prev && ! -d dist ]]; then
      mv dist.prev dist || true
    fi
    rm -rf "$USER_SERVICE_BUILD_DIR"
    return 1
  }

  export USERSERVICE_APP_ROOT="$USER_SERVICE_BUILD_DIR"
  log "userService build OK (isolated); new instances will use $USER_SERVICE_BUILD_DIR until sync after blue-green"

  log "Installing & building client (to dist/client-new for atomic deploy)..."
  cd "$PASIFLORA_DIR/client" || return 1
  npm ci || return 1
  npx ng build --configuration=production --output-path=dist/client-new >> "$LOG_DIR/client-build.log" 2>&1 || return 1

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
  log "Version bumped: $cur Ã¢â€ â€™ $next"
}

# ============================================
# Frontend Deploy (atomic swap + nginx reload)
# ============================================
deploy_frontend() {
  if [[ -d "$CLIENT_DIST/client-new" ]]; then
    log "Atomic deploy: swapping client-new Ã¢â€ â€™ client"
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
  log "Restarting dbUpdator..."
  pkill -f "node db-updator.js" 2>/dev/null
  sleep 2
  (
    export PASIFLORA_SVC=dbupdator
    source ~/.nvm/nvm.sh 2>/dev/null
    cd "$PASIFLORA_DIR/dbUpdator" && exec node db-updator.js
  ) >> "$LOG_DIR/dbUpdator.log" 2>&1 &
  log "dbUpdator restarted."
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

  local old_hash
  old_hash=$(md5sum "$SCRIPT_PATH" 2>/dev/null | awk '{print $1}')

  pull_repos || { log "Deploy aborted: pull failed"; return 1; }

  local new_hash
  new_hash=$(md5sum "$SCRIPT_PATH" 2>/dev/null | awk '{print $1}')

  if [[ "$old_hash" != "$new_hash" ]]; then
    if bash -n "$SCRIPT_PATH" 2>/dev/null; then
      log "CI/CD script changed - restarting with new version..."
      flock -u 9 2>/dev/null || true
      exec 9>&- 2>/dev/null || true
      exec bash "$SCRIPT_PATH"
    else
      log "WARNING: New CI/CD script has syntax errors Ã¢â‚¬â€ continuing with current version"
    fi
  fi

  build_projects || { log "Deploy aborted: build failed"; return 1; }

  if [[ ! -f "$PASIFLORA_DIR/userService/mongo-credentials.txt" ]] || \
     [[ ! -f "$PASIFLORA_DIR/dbUpdator/mongo-credentials.txt" ]]; then
    log "Deploy aborted: mongo-credentials.txt missing (userService or dbUpdator)"
    unset USERSERVICE_APP_ROOT
    return 1
  fi

  ensure_certs
  ensure_upstream_file

  if ! bluegreen_deploy_userservice; then
    log "ERROR: Blue-green deploy failed - aborting deploy (no frontend swap, no version bump)"
    unset USERSERVICE_APP_ROOT
    return 1
  fi

  # Active instance was stopped; safe to replace main tree with isolated build output
  if [[ -n "${USERSERVICE_APP_ROOT:-}" && -d "${USERSERVICE_APP_ROOT}/dist" && -d "${USERSERVICE_APP_ROOT}/node_modules" ]]; then
    log "Syncing userService dist + node_modules from isolated build dir..."
    rm -rf "$PASIFLORA_DIR/userService/dist"
    mv "${USERSERVICE_APP_ROOT}/dist" "$PASIFLORA_DIR/userService/dist"
    rm -rf "$PASIFLORA_DIR/userService/node_modules"
    mv "${USERSERVICE_APP_ROOT}/node_modules" "$PASIFLORA_DIR/userService/node_modules"
    rm -rf "$USER_SERVICE_BUILD_DIR"
    unset USERSERVICE_APP_ROOT
  fi

  rm -rf "$PASIFLORA_DIR/userService/dist.prev" 2>/dev/null
  log "Removed userService/dist.prev (previous live build no longer needed)"

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
    git fetch origin "$BRANCH" 2>/dev/null
    LOCAL=$(git rev-parse HEAD 2>/dev/null)
    REMOTE=$(git rev-parse "origin/$BRANCH" 2>/dev/null)
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
# Do not call stop_services here - restarting the watcher must not kill userService.
# Use trap FUNC INT TERM - avoids TERM parse issues vs SIGTERM on older bash.
watcher_shutdown() {
  log "CI/CD watcher exiting, userService not stopped"
  exit 0
}
trap watcher_shutdown INT TERM

clear
echo "=========================================="
echo "   Pasiflora CI/CD Watcher (Blue-Green)"
echo "=========================================="

log "Initial deploy..."
deploy

log "Watching for changes..."

while true; do
  NOW=$(date +%s)

  if check_for_changes; then
    if [[ $RESTART_NEEDED -eq 0 ]]; then
      RESTART_NEEDED=1
      LAST_CHANGE=$NOW
    fi
  fi

  if [[ $RESTART_NEEDED -eq 1 ]]; then
    if (( NOW - LAST_CHANGE >= COOLDOWN )); then
      log "Cooldown passed Ã¢â€ â€™ redeploying"
      deploy || log "Deploy failed Ã¢â‚¬â€ will retry on next change detection"
      RESTART_NEEDED=0
    fi
  fi

  sleep "$POLL_INTERVAL"
done
