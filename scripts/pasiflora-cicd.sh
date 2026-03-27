#!/bin/bash

# ============================================
# Pasiflora Smart CI/CD Script
# ============================================

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
  gnome-terminal --title="Pasiflora-CICD" -- bash -c "exec \"$0\""
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
# Helpers
# ============================================
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

CERT_DIR="$PASIFLORA_DIR/certs"
CERT_FILE="$CERT_DIR/fullchain.pem"
KEY_FILE="$CERT_DIR/privkey.pem"
CLIENT_DIST="$PASIFLORA_DIR/client/dist"
NGINX_CONF_SRC="$PASIFLORA_DIR/utils/nginx-pasiflora.conf"
NGINX_CONF_DST="/etc/nginx/sites-available/pasiflora"

stop_services() {
  log "Stopping services..."

  pkill -9 -f "ng serve" 2>/dev/null
  pkill -9 -f "node main.js" 2>/dev/null
  pkill -9 -f "node db-updator.js" 2>/dev/null
  pkill -9 -f "PASIFLORA_SVC" 2>/dev/null

  sleep 2
  log "Services stopped."
}

pull_repos() {
  log "Pulling latest code..."

  for repo in "${REPOS[@]}"; do
    if [[ -d "$repo" ]]; then
      cd "$repo" || continue
      log "  → Pulling $(basename "$repo")"
      git pull origin "$BRANCH" || return 1
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
  cd "$PASIFLORA_DIR/userService" || return 1
  npm ci || return 1
  npm run build || return 1

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
  if (( patch > 9 )); then
    patch=0
    minor=$((minor + 1))
  fi
  if (( minor > 9 )); then
    minor=0
    major=$((major + 1))
  fi

  local next="${major}.${minor}.${patch}"
  echo "{\"version\":\"${next}\"}" > "$vfile"
  log "Version bumped: $cur → $next"
}

deploy_frontend() {
  # Atomic swap: deploy client-new -> client (0 downtime)
  if [[ -d "$CLIENT_DIST/client-new" ]]; then
    log "Atomic deploy: swapping client-new -> client"
    rm -rf "$CLIENT_DIST/client-old"
    [[ -d "$CLIENT_DIST/client" ]] && mv "$CLIENT_DIST/client" "$CLIENT_DIST/client-old"
    mv "$CLIENT_DIST/client-new" "$CLIENT_DIST/client"
  fi

  if command -v nginx &>/dev/null; then
    # Ensure nginx config is installed
    if [[ -f "$NGINX_CONF_SRC" ]]; then
      sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST" 2>/dev/null
      sudo ln -sf "$NGINX_CONF_DST" /etc/nginx/sites-enabled/pasiflora 2>/dev/null
    fi
    # Start or reload nginx (graceful, ~0 downtime)
    if sudo systemctl is-active --quiet nginx 2>/dev/null; then
      sudo nginx -t 2>/dev/null && sudo systemctl reload nginx
    else
      sudo systemctl start nginx
    fi
  else
    # Fallback: ng serve when nginx not installed (smooth migration)
    log "nginx not installed, using ng serve fallback"
    NG_OPTS="--configuration=production --host 0.0.0.0 --port 443 --disable-host-check"
    [[ -f "$CERT_FILE" && -f "$KEY_FILE" ]] && NG_OPTS="$NG_OPTS --ssl --ssl-cert $CERT_FILE --ssl-key $KEY_FILE"
    ( export PASIFLORA_SVC=client; source ~/.nvm/nvm.sh 2>/dev/null
      cd "$PASIFLORA_DIR/client" && npx ng serve $NG_OPTS ) >> "$LOG_DIR/client.log" 2>&1 &
  fi
}

start_services() {
  log "Starting services..."

  mkdir -p "$LOG_DIR" "$CERT_DIR"

  # Ensure certs exist (copy from letsencrypt if missing, e.g. after renewal)
  if [[ ! -f "$CERT_FILE" || ! -f "$KEY_FILE" ]]; then
    if [[ -f /etc/letsencrypt/live/emperium.hopto.org/fullchain.pem ]]; then
      log "Copying SSL certs from letsencrypt..."
      sudo cp /etc/letsencrypt/live/emperium.hopto.org/fullchain.pem "$CERT_FILE" 2>/dev/null
      sudo cp /etc/letsencrypt/live/emperium.hopto.org/privkey.pem "$KEY_FILE" 2>/dev/null
      sudo chown "$(whoami)" "$CERT_FILE" "$KEY_FILE" 2>/dev/null
    fi
  fi

  # Frontend: nginx (deploy_frontend does atomic swap + nginx reload)
  deploy_frontend

  sleep 1

  (
    export PASIFLORA_SVC=userservice
    source ~/.nvm/nvm.sh 2>/dev/null
    cd "$PASIFLORA_DIR/userService/dist" && node main.js
  ) >> "$LOG_DIR/userService.log" 2>&1 &

  sleep 1

  (
    export PASIFLORA_SVC=dbupdator
    source ~/.nvm/nvm.sh 2>/dev/null
    cd "$PASIFLORA_DIR/dbUpdator" && node db-updator.js
  ) >> "$LOG_DIR/dbUpdator.log" 2>&1 &

  log "Services started (logs in $LOG_DIR/)."
}

deploy() {
  log "=========================================="
  log "Starting Deploy"
  log "=========================================="

  # Pull and build FIRST - only stop services if we're about to succeed.
  # Previously: stop_services ran first, so if pull/build failed, services stayed down.
  local old_hash
  old_hash=$(md5sum "$SCRIPT_PATH" 2>/dev/null | awk '{print $1}')

  pull_repos || { log "Deploy aborted: pull failed"; return 1; }

  local new_hash
  new_hash=$(md5sum "$SCRIPT_PATH" 2>/dev/null | awk '{print $1}')

  if [[ "$old_hash" != "$new_hash" ]]; then
    log "CI/CD script changed — restarting with new version..."
    exec bash "$SCRIPT_PATH"
    log "WARNING: exec failed — continuing with current version"
  fi

  build_projects || { log "Deploy aborted: build failed"; return 1; }

  # Ensure mongo credentials exist (gitignore'd, can be deleted by pull in edge cases)
  if [[ ! -f "$PASIFLORA_DIR/userService/mongo-credentials.txt" ]] || [[ ! -f "$PASIFLORA_DIR/dbUpdator/mongo-credentials.txt" ]]; then
    log "Deploy aborted: mongo-credentials.txt missing (userService or dbUpdator)"
    return 1
  fi

  stop_services
  start_services
  bump_version

  log "=========================================="
  log "Deploy Complete"
  log "=========================================="
}

# FIXED: returns 0 ONLY when changes exist
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
trap 'log "Stopping CI/CD..."; stop_services; exit 0' SIGINT SIGTERM

clear
echo "=========================================="
echo "   Pasiflora CI/CD Watcher"
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
      log "Cooldown passed → redeploying"
      deploy
      RESTART_NEEDED=0
    fi
  fi

  sleep "$POLL_INTERVAL"
done
