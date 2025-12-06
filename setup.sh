#!/bin/bash

set -e

echo '🚀 Starting Vly project setup...'

# Check Node.js
if ! command -v node &> /dev/null; then
    echo '❌ Node.js missing'
    exit 1
fi

echo '✅ Node.js is installed'

# Install dependencies
echo 'Installing dependencies...'
pnpm install
echo '✅ Dependencies installed'

# Convex Setup
echo 'Setting up Convex...'
if [ ! -d 'convex/_generated' ]; then
    npx convex dev --once
fi
echo '✅ Convex is ready'

# Backend env
if [ -f setup-backend-env.sh ]; then
    chmod +x setup-backend-env.sh
    ./setup-backend-env.sh
else
    echo '⚠️ No backend env script found'
fi

echo '🎉 Setup complete'
