# 🔧 Netlify Deployment Troubleshooting

## Common Issues & Solutions:

### 1. "Module not found" errors
**Solution**: Clear Netlify's cache
- Go to Netlify Dashboard → Deploys → Deploy settings
- Click "Clear cache and deploy site"

### 2. Build fails with dependency errors
**Solution**: Ensure package-lock.json is committed
```bash
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### 3. "Cannot find module 'vite'" error
**Solution**: Add to build command in netlify.toml:
```toml
command = "npm install --force && npm run build"
```

### 4. Environment variable issues
**Solution**: Check Netlify Dashboard → Site settings → Environment variables
- Ensure all required env vars are set
- No quotes around values in Netlify UI

### 5. Function timeout errors
**Solution**: Netlify functions have a 10-second timeout by default
- Consider using background functions for long tasks
- Or upgrade to Netlify Pro for extended timeouts

## Emergency Reset:
If nothing works, try this nuclear option:
```bash
# Delete everything and start fresh
rm -rf node_modules package-lock.json .svelte-kit build dist
npm cache clean --force
npm install
npm run build
```

## Verification Checklist:
- [ ] Using @sveltejs/adapter-netlify (not adapter-static)
- [ ] netlify.toml has publish = "build" (not "dist")
- [ ] NODE_VERSION = "18" in netlify.toml
- [ ] All dependencies in package.json
- [ ] No node_modules in git repository
- [ ] Environment variables set in Netlify dashboard