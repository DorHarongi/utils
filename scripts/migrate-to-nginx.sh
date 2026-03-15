#!/bin/bash
# One-time migration: ng serve -> nginx
# Run this when nginx is installed. Keeps ng serve running until nginx is ready.

set -e
PASIFLORA_DIR=~/Desktop/pasiflora
CLIENT_DIST="$PASIFLORA_DIR/client/dist"
NGINX_CONF_SRC="$PASIFLORA_DIR/utils/nginx-pasiflora.conf"
NGINX_CONF_DST="/etc/nginx/sites-available/pasiflora"

echo "=== Pasiflora nginx migration ==="

# 1. Ensure nginx is installed
if ! command -v nginx &>/dev/null; then
  echo "Installing nginx..."
  sudo apt install nginx-core -y
fi

# 2. Ensure client is built
if [[ ! -d "$CLIENT_DIST/client" ]] && [[ ! -d "$CLIENT_DIST/client-new" ]]; then
  echo "Building client..."
  cd "$PASIFLORA_DIR/client" && source ~/.nvm/nvm.sh && ng build --configuration=production
fi

# 3. Atomic swap if we have client-new
if [[ -d "$CLIENT_DIST/client-new" ]]; then
  echo "Atomic swap: client-new -> client"
  rm -rf "$CLIENT_DIST/client-old"
  [[ -d "$CLIENT_DIST/client" ]] && mv "$CLIENT_DIST/client" "$CLIENT_DIST/client-old"
  mv "$CLIENT_DIST/client-new" "$CLIENT_DIST/client"
fi

# 4. Install nginx config
echo "Installing nginx config..."
sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"
sudo ln -sf "$NGINX_CONF_DST" /etc/nginx/sites-enabled/pasiflora
sudo nginx -t

# 5. Stop ng serve, start nginx (minimal gap)
echo "Stopping ng serve..."
pkill -9 -f "ng serve" 2>/dev/null || true
sleep 1

echo "Starting nginx..."
sudo systemctl start nginx

echo "=== Migration complete. Frontend now on nginx:443 ==="
