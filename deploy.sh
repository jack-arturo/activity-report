#!/bin/bash
# Deploy activity-report to Cloudflare Pages

set -e

cd "$(dirname "$0")"

export CLOUDFLARE_ACCOUNT_ID="2cc725912d479c0bd6c08fc24931a478"

echo "🚀 Deploying activity-report to Cloudflare Pages..."
npx wrangler pages deploy . --project-name=activity-report --branch=main --commit-dirty=true

echo ""
echo "✅ Deployed to: https://activity-report.pages.dev"
echo "   Custom domain: https://activity.drunk.support"

