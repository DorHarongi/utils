#!/bin/bash

# ============================================
# Pasiflora Smart CI/CD Script
# ============================================
# Polls for git changes, auto-pulls, builds, and restarts services
# Run this script ONCE - it will loop forever and watch for changes
#
# Repos watched:
#   - https://github.com/DorHarongi/client
#   - https://github.com/DorHarongi/utils
#   - https://github.com/DorHarongi/userService
#   - https://github.com/DorHarongi/dbUpdator

PASIFLORA_DIR=~/Desktop/pasiflora

# Configuration
BRANCH=dev
POLL_INTERVAL=10      # seconds between git fetch checks
COOLDOWN=20           # seconds of silence after last change before restart

# State
RESTART_NEEDED=0
LAST_CHANGE=0

# All repos to watch
REPOS=(
  "$PASIFLORA_DIR/client"
  "$PASIFLORA_DIR/utils"
  "$PASIFLORA_DIR/userService"
  "$PASIFLORA_DIR/dbUpdator"
)

# ============================================
# Helper Functions
# ============================================

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Stop only the services we started (not this script!)
stop_services() {
  log "Stopping services..."
  
  # Kill Node/Angular processes by pattern (safe - won't kill this bash script)
  pkill -9 -f "ng serve" 2>/dev/null
  pkill -9 -f "node main.js" 2>/dev/null
  pkill -9 -f "node db-updator.js" 2>/dev/null
  
  # Kill the bash processes running our services (using PASIFLORA_SVC env var in command)
  pkill -9 -f "PASIFLORA_SVC" 2>/dev/null
  
  # Close terminal windows by their title using wmctrl (if available)
  if command -v wmctrl &> /dev/null; then
    wmctrl -c "Pasiflora-Client" 2>/dev/null
    wmctrl -c "Pasiflora-UserService" 2>/dev/null
    wmctrl -c "Pasiflora-DBUpdator" 2>/dev/null
  fi
  
  sleep 2
  log "Services stopped."
}

# Pull latest code from all repos
pull_repos() {
  log "Pulling latest code from all repos..."
  
  for repo in "${REPOS[@]}"; do
    if [[ -d "$repo" ]]; then
      cd "$repo" || continue
      repo_name=$(basename "$repo")
      log "  → Pulling $repo_name..."
      if ! git pull origin "$BRANCH"; then
        log "ERROR: Failed to pull $repo_name"
        return 1
      fi
    else
      log "WARNING: Directory not found: $repo"
    fi
  done
  
  log "Pull complete."
  return 0
}

# Build projects (utils must be built before userService)
build_projects() {
  source ~/.nvm/nvm.sh
  
  # Build utils first (it's a dependency)
  log "Building utils..."
  cd "$PASIFLORA_DIR/utils" || return 1
  if ! npm run build; then
    log "ERROR: Failed to build utils"
    return 1
  fi
  
  # Build userService (depends on utils)
  log "Building userService..."
  cd "$PASIFLORA_DIR/userService" || return 1
  if ! npm run build; then
    log "ERROR: Failed to build userService"
    return 1
  fi
  
  # Note: client (Angular) builds on-the-fly with ng serve
  # Note: dbUpdator is plain JS, no build needed
  
  log "Build complete."
  return 0
}

# Start all services in new terminal windows
start_services() {
  log "Starting services..."
  
  cd "$PASIFLORA_DIR"
  
  # Start Angular client
  # PASIFLORA_SVC env var allows pkill to find these bash processes
  log "  Starting Angular client..."
  gnome-terminal --title="Pasiflora-Client" -- bash -c "export PASIFLORA_SVC=client; source ~/.nvm/nvm.sh; cd $PASIFLORA_DIR/client; echo '=== Angular Client ==='; ng serve --configuration=production --host 0.0.0.0 --port 80 --disable-host-check"
  sleep 1
  
  # Start User Service
  log "  Starting User Service..."
  gnome-terminal --title="Pasiflora-UserService" -- bash -c "export PASIFLORA_SVC=userservice; source ~/.nvm/nvm.sh; cd $PASIFLORA_DIR/userService/dist; echo '=== User Service ==='; node main.js"
  sleep 1
  
  # Start DB Updator
  log "  Starting DB Updator..."
  gnome-terminal --title="Pasiflora-DBUpdator" -- bash -c "export PASIFLORA_SVC=dbupdator; source ~/.nvm/nvm.sh; cd $PASIFLORA_DIR/dbUpdator; echo '=== DB Updator ==='; node db-updator.js"
  
  log "Services started in separate terminals."
}

# Full deploy cycle
deploy() {
  log "=========================================="
  log "Starting Deploy Cycle"
  log "=========================================="
  
  stop_services
  
  if ! pull_repos; then
    log "Deploy FAILED at pull stage"
    return 1
  fi
  
  if ! build_projects; then
    log "Deploy FAILED at build stage"
    return 1
  fi
  
  start_services
  
  log "=========================================="
  log "Deploy Complete!"
  log "=========================================="
}

# Check for remote changes without pulling
check_for_changes() {
  local changes_found=0
  
  for repo in "${REPOS[@]}"; do
    if [[ -d "$repo" ]]; then
      cd "$repo" || continue
      
      # Fetch without merging
      git fetch origin "$BRANCH" 2>/dev/null
      
      # Check if local is behind remote
      LOCAL=$(git rev-parse HEAD 2>/dev/null)
      REMOTE=$(git rev-parse "origin/$BRANCH" 2>/dev/null)
      
      if [[ "$LOCAL" != "$REMOTE" ]]; then
        repo_name=$(basename "$repo")
        log "Change detected in $repo_name (local: ${LOCAL:0:7}, remote: ${REMOTE:0:7})"
        changes_found=1
      fi
    fi
  done
  
  return $changes_found
}

# ============================================
# Main
# ============================================

# Handle Ctrl+C gracefully
trap 'log "Shutting down CI/CD watcher..."; stop_services; exit 0' SIGINT SIGTERM

clear
echo "=========================================="
echo "   Pasiflora CI/CD Watcher"
echo "=========================================="
echo ""
log "Configuration:"
log "  Directory:     $PASIFLORA_DIR"
log "  Branch:        $BRANCH"
log "  Poll interval: ${POLL_INTERVAL}s"
log "  Cooldown:      ${COOLDOWN}s"
log ""
log "Watching repos:"
for repo in "${REPOS[@]}"; do
  log "  - $(basename "$repo")"
done
echo "=========================================="
echo ""
log "Performing initial deploy..."
echo ""

# Initial deploy on startup
deploy

echo ""
log "Now watching for changes... (Ctrl+C to stop)"
echo ""

# Main watch loop
while true; do
  NOW=$(date +%s)
  
  # Check for changes in any repo
  if check_for_changes; then
    RESTART_NEEDED=1
    LAST_CHANGE=$NOW
  fi
  
  # If changes were detected, wait for cooldown then restart
  if [[ $RESTART_NEEDED -eq 1 ]]; then
    SILENCE=$(( NOW - LAST_CHANGE ))
    
    if [[ $SILENCE -ge $COOLDOWN ]]; then
      echo ""
      log "No new changes for ${COOLDOWN}s → triggering deploy"
      echo ""
      deploy
      RESTART_NEEDED=0
      echo ""
      log "Watching for changes... (Ctrl+C to stop)"
      echo ""
    fi
  fi
  
  sleep "$POLL_INTERVAL"
done
