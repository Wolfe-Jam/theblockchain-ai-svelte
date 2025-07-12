# 🚀 Netlify + SvelteKit File Placement Guide

## 🎯 CRITICAL: File Locations Matter!

The SvelteKit Netlify adapter has **very specific requirements** for where files go:

### ✅ **Correct File Placement**
```
theblockchain-ai-svelte/
├── _headers          ← ROOT directory (NOT in static/)
├── static/
│   └── _redirects    ← STATIC directory
├── netlify.toml      ← ROOT directory (no redirects here!)
└── build/           ← Generated during build
```

### ❌ **Common Mistakes**
- Don't put `_headers` in `static/` → Error!
- Don't put redirects in `netlify.toml` → Error!
- Don't put `_redirects` in root → It won't be included in build!

### 🔧 **Why This Weird Split?**
- **_headers**: The adapter reads this directly from root during build
- **_redirects**: Gets copied from static/ to build output
- **netlify.toml**: Only for build configuration, not redirects

### 📝 **Quick Reference**
| File | Location | Reason |
|------|----------|--------|
| `_headers` | Root `/` | Adapter requirement |
| `_redirects` | Static `/static/` | Copied to build output |
| `netlify.toml` | Root `/` | Build config only |

### 🎨 **Designer Analogy**
Think of it like a house:
- **_headers** = Security system (installed at main entrance)
- **_redirects** = Interior signage (goes with the furniture)
- **netlify.toml** = Construction blueprint (stays with builder)

### ✅ **Ready to Deploy**
```bash
git add -A
git commit -m "Fix: Place _headers in root, _redirects in static per adapter requirements"
git push
```

### 🚨 **Remember**
This is specific to `@sveltejs/adapter-netlify`. Other adapters may have different requirements!

---
*Last updated after discovering adapter quirks the hard way*
