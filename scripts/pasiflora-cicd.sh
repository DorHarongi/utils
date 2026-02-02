#!/bin/bash

# ============================================
# Pasiflora Smart CI/CD Script
# ============================================

PASIFLORA_DIR=~/Desktop/pasiflora
LOCKFILE="/tmp/pasiflora-cicd.lock"

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

stop_services() {
  log "Stopping services..."

  pkill -9 -f "ng serve" 2>/dev/null
  pkill -9 -f "node main.js" 2>/dev/null
  pkill -9 -f "node db-updator.js" 2>/dev/null
  pkill -9 -f "PASIFLORA_SVC" 2>/dev/null

  if command -v wmctrl &>/dev/null; then
    wmctrl -c "Pasiflora-Client" 2>/dev/null
    wmctrl -c "Pasiflora-UserService" 2>/dev/null
    wmctrl -c "Pasiflora-DBUpdator" 2>/dev/null
  fi

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

build_projects() {
  source ~/.nvm/nvm.sh

  log "Building utils..."
  cd "$PASIFLORA_DIR/utils" || return 1
  npm run build || return 1

  log "Building userService..."
  cd "$PASIFLORA_DIR/userService" || return 1
  npm run build || return 1

  return 0
}

start_services() {
  log "Starting services..."

  gnome-terminal --title="Pasiflora-Client" -- bash -c "
    export PASIFLORA_SVC=client
    source ~/.nvm/nvm.sh
    cd $PASIFLORA_DIR/client
    ng serve --configuration=production --host 0.0.0.0 --port 80 --disable-host-check
  "

  sleep 1

  gnome-terminal --title="Pasiflora-UserService" -- bash -c "
    export PASIFLORA_SVC=userservice
    source ~/.nvm/nvm.sh
    cd $PASIFLORA_DIR/userService/dist
    node main.js
  "

  sleep 1

  gnome-terminal --title="Pasiflora-DBUpdator" -- bash -c "
    export PASIFLORA_SVC=dbupdator
    source ~/.nvm/nvm.sh
    cd $PASIFLORA_DIR/dbUpdator
    node db-updator.js
  "

  log "Services started."
}

deploy() {
  log "=========================================="
  log "Starting Deploy"
  log "=========================================="

  stop_services
  pull_repos || return 1
  build_projects || return 1
  start_services

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
    RESTART_NEEDED=1
    LAST_CHANGE=$NOW
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
