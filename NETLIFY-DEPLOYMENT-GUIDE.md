# SvelteKit + Netlify Deployment Guide

## ✅ Correct File Structure (Adapter v5.0+)

```
project-root/
├── _headers          ← Security headers (ROOT directory)
├── _redirects        ← URL redirects (ROOT directory)
├── netlify.toml      ← Build configuration only (NO redirects here!)
├── netlify/
│   └── functions/    ← Serverless functions
│       ├── package.json
│       └── *.js
└── static/           ← Static assets only (NO _headers or _redirects!)
```

## 📝 netlify.toml Example

```toml
[build]
  command = "npm install && cd netlify/functions && npm install && cd ../.. && npm run build"
  publish = "build"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

# Headers go in _headers file, not here!
# Redirects go in _redirects file, not here!
```

## 🚀 Key Points

1. **Both `_headers` and `_redirects` must be in root** - not in static/
2. **No [[redirects]] in netlify.toml** - use _redirects file instead
3. **Functions need separate npm install** - included in build command
4. **Adapter is strict** - wrong file placement = build failure

## 🔧 Troubleshooting

If build fails with file placement errors:
- Check NO _headers or _redirects in static/
- Ensure both files are in project root
- Commit ALL changes including deletions
- Check adapter version compatibility

---
*Last updated: After fixing 9 failed builds the hard way!*
