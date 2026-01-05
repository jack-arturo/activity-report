#!/bin/bash
# Deploy activity-report to Cloudflare Pages

set -e

cd "$(dirname "$0")"

echo "🚀 Deploying activity-report to Cloudflare Pages..."
npx wrangler pages deploy . --project-name=activity-report --branch=main --commit-dirty=true

echo ""
echo "✅ Deployed to: https://activity-report.pages.dev"
echo "   Custom domain: https://activity.drunk.support"

