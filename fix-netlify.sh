#!/bin/bash

# 🚀 Netlify Deployment Fix Script

echo "🧹 Cleaning up old dependencies..."
rm -rf node_modules package-lock.json

echo "📦 Installing fresh dependencies..."
npm install

echo "🔧 Installing Netlify adapter..."
npm install @sveltejs/adapter-netlify@latest

echo "🏗️ Testing build locally..."
npm run build

echo "✅ Done! Your project should now deploy correctly on Netlify."
echo ""
echo "📋 Next steps:"
echo "1. Commit these changes: git add . && git commit -m 'Fix Netlify deployment'"
echo "2. Push to your repository: git push"
echo "3. Go to Netlify dashboard and click 'Clear cache and deploy site'"