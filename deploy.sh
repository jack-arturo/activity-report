#!/usr/bin/env bash
# Deploy this repo to Cloudflare Pages.

set -euo pipefail

cd "$(dirname "$0")"

WRANGLER_TOML="${WRANGLER_TOML:-wrangler.toml}"
PROJECT_NAME_DEFAULT=""
if [[ -f "$WRANGLER_TOML" ]]; then
  PROJECT_NAME_DEFAULT="$(awk -F'\"' '/^name *=/ { print $2; exit }' "$WRANGLER_TOML" || true)"
fi

PROJECT_NAME="${PROJECT_NAME:-${PROJECT_NAME_DEFAULT:-activity-report}}"
BRANCH="${BRANCH:-main}"
COMMIT_DIRTY="${COMMIT_DIRTY:-true}"

if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "Missing CLOUDFLARE_ACCOUNT_ID."
  echo "Set it (or export it) before running:"
  echo '  export CLOUDFLARE_ACCOUNT_ID="your-account-id"'
  exit 1
fi

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "Note: CLOUDFLARE_API_TOKEN is not set. wrangler may require interactive auth."
fi

export CLOUDFLARE_ACCOUNT_ID

echo "Deploying ${PROJECT_NAME} to Cloudflare Pages..."
npx wrangler pages deploy . --project-name="${PROJECT_NAME}" --branch="${BRANCH}" --commit-dirty="${COMMIT_DIRTY}"

echo "Done."
