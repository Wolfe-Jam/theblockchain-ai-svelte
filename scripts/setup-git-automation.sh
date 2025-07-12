#!/bin/bash
# Git Cleanup & Automation Setup
# Fixes node_modules tracking and sets up prevention

echo "🔧 Setting up git automation and cleaning node_modules..."

# Step 1: Remove node_modules from git tracking
echo "📁 Removing node_modules from git tracking..."
git rm -r --cached node_modules/ 2>/dev/null || echo "  (node_modules not tracked, skipping)"

# Step 2: Remove package-lock.json if it's causing issues
echo "📦 Checking package-lock.json..."
if git status --porcelain | grep -q "M  package-lock.json"; then
    read -p "   Reset package-lock.json? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout -- package-lock.json
        echo "   ✅ Reset package-lock.json"
    fi
fi

# Step 3: Install git hooks
echo "🪝 Installing git hooks..."
if [ -d ".git/hooks" ]; then
    cp .githooks/pre-commit .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo "   ✅ Pre-commit hook installed"
else
    echo "   ⚠️ .git/hooks directory not found"
fi

# Step 4: Update .gitignore if needed
echo "🚫 Checking .gitignore..."
if ! grep -q "^node_modules/" .gitignore; then
    echo "node_modules/" >> .gitignore
    echo "   ✅ Added node_modules/ to .gitignore"
else
    echo "   ✅ .gitignore already configured"
fi

# Step 5: Clean git status
echo "🧹 Cleaning git status..."
git add .gitignore
git add package.json

# Step 6: Show final status
echo ""
echo "📊 Current git status:"
git status --short

echo ""
echo "🎯 Next steps:"
echo "1. Commit your security changes: git commit -m 'Your security commit message'"
echo "2. Push to deploy: git push origin main"
echo "3. Check automation works: npm run git:check"

echo ""
echo "✅ Git automation setup complete!"
echo "   Pre-commit hook will prevent node_modules from being committed"
