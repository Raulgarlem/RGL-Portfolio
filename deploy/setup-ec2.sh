#!/usr/bin/env bash
set -euo pipefail

WEB_ROOT="/var/www/RGL-Portfolio"
CADDYFILE="/etc/caddy/Caddyfile"
SITE_MARKER="# AI Portfolio"

sudo mkdir -p "$WEB_ROOT"
sudo chown -R "$USER:$USER" "$WEB_ROOT"

if ! sudo grep -Fq "$SITE_MARKER" "$CADDYFILE"; then
  sudo cp "$CADDYFILE" "${CADDYFILE}.before-aiportfolio"
  printf '\n' | sudo tee -a "$CADDYFILE" >/dev/null
  sudo tee -a "$CADDYFILE" < "$(dirname "$0")/Caddyfile.aiportfolio" >/dev/null
fi

sudo caddy validate --config "$CADDYFILE"
sudo systemctl reload caddy

echo "EC2 setup complete: https://aiportfolio.beetikmx.com"
