#!/usr/bin/env bash
# Copy Hening journal UI into the DomaiNesia project folder.
# Run on the server from the repo root, or after a git pull:
#   bash scripts/deploy-journalitsme.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${JOURNALITSME_DEST:-/home/ihdalabs/projects/journalitsme}"

mkdir -p "$DEST/css" "$DEST/js" "$DEST/assets"
cp -f "$ROOT/journal.html" "$DEST/index.html"
cp -f "$ROOT/css/journal.css" "$DEST/css/journal.css"
cp -f "$ROOT/js/journal.js" "$DEST/js/journal.js"
cp -f "$ROOT/assets/favicon.svg" "$DEST/assets/favicon.svg"
cp -f "$ROOT/.htaccess.journalitsme" "$DEST/.htaccess"

echo "Deployed Hening to $DEST"
ls -la "$DEST" "$DEST/css" "$DEST/js" "$DEST/assets"
