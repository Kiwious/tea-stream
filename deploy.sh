#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

COMPOSE="docker compose -f docker-compose.prod.yml"

git pull --ff-only

# The frontend build prerenders pages that fetch from the public API,
# so the backend has to be live before the frontend image is built.
$COMPOSE up -d --build --wait db redis backend
$COMPOSE up -d --build frontend

docker image prune -f
