# 🔧 Netlify Environment Variables - MANUAL DEPLOY Required

## ❌ **My Mistake: Auto-Deploy Doesn't Happen**
Adding environment variables to Netlify **does NOT** automatically trigger a redeploy. You need to manually trigger it.

---

## ✅ **Correct Process**

### **Step 1: Add Environment Variables**
1. Go to: [https://app.netlify.com](https://app.netlify.com) 
2. Click your **theBlockchain.ai** site
3. **Site settings** → **Environment variables**
4. Add each variable (get values from your local `.env` file)

### **Step 2: MANUALLY Trigger Deploy**
After adding all variables, you MUST manually redeploy:

**Option A: Trigger Deploy Button**
1. Go to **Deploys** tab in Netlify
2. Click **"Trigger deploy"** dropdown
3. Select **"Deploy site"**
4. Wait for deployment to complete

**Option B: Git Push (Easier)**
```bash
# In your project directory
git add .
git commit -m "Update for environment variables"
git push origin main
```

**Option C: Clear Cache & Deploy**
1. **Deploys** tab → **"Trigger deploy"**
2. Select **"Clear cache and deploy site"**
3. This ensures fresh build with new variables

---

## 🔍 **How to Verify Variables Loaded**

### **Check Deploy Logs**
1. **Deploys** tab → Click latest deploy
2. **Deploy log** → Look for build process
3. **Environment section** → Should show variable names (not values)

### **Test on Live Site**
1. Visit: [https://theblockchain.ai/marketplace/demo/nobs-pay/](https://theblockchain.ai/marketplace/demo/nobs-pay/)
2. Try a $1.00 live payment
3. Check browser console for errors
4. Verify Stripe dashboard shows transaction

---

## 🚨 **Common Issues**

### **Variables Not Working After Deploy**
- **Check**: Variable names exactly match (case-sensitive)
- **Verify**: All scopes selected (Build time + Runtime)
- **Try**: Clear cache and redeploy

### **Still Getting "Payment Processing Not Configured"**
- **Check**: `STRIPE_SECRET_KEY` is set (server-side)
- **Verify**: `VITE_STRIPE_LIVE_KEY` is set (frontend)
- **Debug**: Check deploy logs for build errors

---

## 📋 **Required Variables (Get from .env file)**

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=[FROM_YOUR_ENV_FILE]

VITE_STRIPE_LIVE_KEY=[FROM_YOUR_ENV_FILE]

# Supabase Configuration  
VITE_SUPABASE_URL=[FROM_YOUR_ENV_FILE]

VITE_SUPABASE_ANON_KEY=[FROM_YOUR_ENV_FILE]

# PayPal (Optional)
PAYPAL_CLIENT_ID=[FROM_YOUR_ENV_FILE]
```

**Security Note**: Never paste actual API keys in documentation files. Always get them from your secure `.env` file.

---

## ⚡ **Quick Action Steps**

### **Right Now**
1. **Add variables** to Netlify (5 minutes)
2. **Trigger deploy** via "Trigger deploy" button  
3. **Wait** for deployment to complete (2-3 minutes)
4. **Test** live payment on production site

### **Alternative: Git Push Method**
```bash
# Make a small change and push
echo "# Environment variables updated" >> README.md
git add .
git commit -m "Trigger deploy for environment variables"  
git push origin main
```

---

## 🎯 **After Manual Deploy**

### **Success Indicators**
- ✅ **Build completes** without errors
- ✅ **Live site loads** NOBS Pay component  
- ✅ **Payment works** on production
- ✅ **Stripe dashboard** shows transaction

### **If Still Not Working**
- **Check deploy logs** for error messages
- **Verify variable names** are exactly correct
- **Try clear cache & deploy** option
- **Test individual API endpoint**: `yoursite.com/api/stripe/create-payment-intent`

---

**You're absolutely right** - I should have mentioned the manual deploy requirement! Thanks for catching that. 

**Next**: Add variables → **MANUALLY trigger deploy** → Test live payments! 🚀