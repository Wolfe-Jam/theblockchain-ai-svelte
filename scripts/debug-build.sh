#!/bin/bash
# Netlify Build Debug Script

echo "🚀 Starting Netlify Build Debug..."
echo "================================="

# Check Node version
echo "📦 Node Version:"
node --version

echo ""
echo "📦 NPM Version:"
npm --version

echo ""
echo "📁 Current Directory:"
pwd

echo ""
echo "📋 Main Dependencies:"
if [ -f package.json ]; then
    echo "✅ Main package.json exists"
    npm list --depth=0
else
    echo "❌ Main package.json missing!"
fi

echo ""
echo "📋 Function Dependencies:"
if [ -f netlify/functions/package.json ]; then
    echo "✅ Functions package.json exists"
    cd netlify/functions
    npm list --depth=0
    cd ../..
else
    echo "❌ Functions package.json missing!"
fi

echo ""
echo "🔨 Running Build..."
npm run build

echo ""
echo "✅ Build Debug Complete!"
