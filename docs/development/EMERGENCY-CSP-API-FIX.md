# 🚨 EMERGENCY FIX: CSP + API Issues

## 🎯 **Root Cause Found**

### **Issue 1: CSP Deployment Cache**
- **Problem**: Netlify cached old CSP headers, not using our netlify.toml
- **Evidence**: Browser shows `*.supabase.co` only, but file has both `.co` and `.com`
- **Fix**: Aggressive cache busting + single-line CSP + explicit domain

### **Issue 2: Supabase Domain Mismatch**  
- **Problem**: Your Supabase URL is `.com` but CSP only allowed `.co` (in deployed version)
- **Evidence**: `minumiricmuddzcyxyzd.supabase.com` blocked by CSP
- **Fix**: Added explicit domain + wildcard for both

### **Issue 3: API Split Functions 404**
- **Problem**: Split functions creating routing conflicts
- **Evidence**: `/api/stripe/create-payment-intent` returns 404
- **Fix**: Disabled split (split: false) + simplified redirects

## 🔧 **Changes Made**

### **netlify.toml v3**
```toml
# Before (cached):
connect-src 'self' https://api.stripe.com https://*.supabase.co

# After (v3):
connect-src 'self' ... https://minumiricmuddzcyxyzd.supabase.com https://*.supabase.co https://*.supabase.com
```

### **svelte.config.js**
```javascript
// Before:
split: true    // Created multiple function files

// After:  
split: false   // Single function file for easier debugging
```

### **Deployment Strategy**
```bash
# Maximum cache busting:
rm -rf .netlify build node_modules/.vite
npm cache clean --force
npm ci && git push
```

## ⚡ **Quick Deploy**

**Run this command:**
```bash
./emergency-fix.sh
```

**Or manually:**
```bash
git add . && git commit -m "emergency: CSP + API fixes v3"
git push origin main
```

## ✅ **Expected Results**

### **Before Fix**
```
❌ CSP: Refused to connect to minumiricmuddzcyxyzd.supabase.com  
❌ API: 404 /api/stripe/create-payment-intent
❌ JSON: Unexpected token '<', "<!DOCTYPE"...
```

### **After Fix**
```  
✅ CSP: Supabase connections allowed
✅ API: Stripe endpoint returns JSON
✅ Payment: Card processing works end-to-end
```

## 🧪 **Verification Steps**

1. **Check deployment version**: `curl -I https://theblockchain.ai/ | grep "X-Deployment-Version"`
   - Should show: `v3-supabase-fix-2025-07-13`

2. **Test API endpoint**: `curl -I https://theblockchain.ai/api/stripe/create-payment-intent`
   - Should return: `200 OK` (not 404)

3. **Test payment form**: Visit `/marketplace/demo/nobs-pay`
   - Should load without CSP errors in console
   - Card processing should work (after Stripe keys added)

## 📋 **Next Steps After Deploy**

1. ✅ **CSP Fixed** → Supabase data loads
2. ✅ **API Fixed** → Stripe endpoints accessible  
3. 🔧 **Add Stripe Keys** → See STRIPE-SETUP-GUIDE.md
4. 🧪 **Test Payment** → Use 4242 4242 4242 4242
5. 🎯 **NOBS Pay Live** → Ready for marketplace

---

**Status**: Emergency fixes ready  
**Deploy Time**: 3 minutes  
**Risk**: Low (fixes deployment issues)  
**Priority**: Critical (unblocks NOBS Pay)