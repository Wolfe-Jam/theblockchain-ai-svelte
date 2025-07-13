# 🔐 Netlify Environment Variables Setup

## 🚨 **Security Note**
All API keys must be configured as environment variables in Netlify - never hardcoded in files.

---

## 🔧 **Netlify Environment Variables Setup**

### **Step 1: Access Netlify Settings**
1. Go to: [https://app.netlify.com](https://app.netlify.com)
2. Click on your **theBlockchain.ai** site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** for each setting below

---

## 💳 **Required Environment Variables**

### **Stripe Configuration**
```bash
# Stripe Live Keys (for production payments)
STRIPE_SECRET_KEY=sk_live_[YOUR_STRIPE_SECRET_KEY]

STRIPE_PUBLISHABLE_KEY=pk_live_[YOUR_STRIPE_PUBLISHABLE_KEY]

VITE_STRIPE_LIVE_KEY=pk_live_[YOUR_STRIPE_PUBLISHABLE_KEY]

STRIPE_WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]
```

### **PayPal Configuration (Optional)**
```bash
PAYPAL_CLIENT_ID=[YOUR_PAYPAL_CLIENT_ID]

PAYPAL_CLIENT_SECRET=[YOUR_PAYPAL_CLIENT_SECRET]

PAYPAL_MODE=live
```

### **Supabase Configuration**
```bash
VITE_SUPABASE_URL=[YOUR_SUPABASE_URL]

VITE_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
```

---

## 📋 **Step-by-Step Netlify Setup**

### **Add Each Variable**
For each environment variable above:

1. **Variable name**: Copy the name (e.g., `STRIPE_SECRET_KEY`)
2. **Variable value**: Get from your local `.env` file  
3. **Scopes**: Select **All deploy contexts** (Build time + Runtime)
4. **Click**: "Create variable"

### **Important Settings**
- ✅ **Deploy contexts**: All deploy contexts
- ✅ **Build time**: Checked (for VITE_ variables)
- ✅ **Runtime**: Checked (for server-side variables)

---

## 🔐 **Security Best Practices**

### **Secret Keys (Server-side only)**
```bash
✅ STRIPE_SECRET_KEY          # Backend API access
✅ PAYPAL_CLIENT_SECRET       # PayPal server authentication
✅ STRIPE_WEBHOOK_SECRET      # Webhook verification
```

### **Public Keys (Frontend safe)**  
```bash
✅ VITE_STRIPE_LIVE_KEY       # Browser Stripe integration
✅ PAYPAL_CLIENT_ID           # PayPal frontend integration
✅ VITE_SUPABASE_URL          # Database connection
✅ VITE_SUPABASE_ANON_KEY     # Public database access
```

---

## 🚀 **Deploy & Test**

### **After Adding Variables**
1. **Trigger new deploy**: Netlify will automatically redeploy
2. **Wait for completion**: Check deploy logs for any errors
3. **Test live site**: Visit [theblockchain.ai](https://theblockchain.ai)
4. **Test payments**: Try $1.00 live transaction

### **Verification Steps**
1. **Check frontend**: NOBS Pay component loads
2. **Test API**: Payment intents create successfully  
3. **Stripe dashboard**: Live transactions appear
4. **No console errors**: Clean browser console

---

## 🧪 **Development vs Production**

### **Development (localhost)**
- **Uses**: `.env.local` and `.env` files
- **Testing**: Both test and live modes available
- **Safety**: $1.00 amounts for testing

### **Production (Netlify)**
- **Uses**: Netlify environment variables
- **Live mode**: Real customer payments
- **Security**: Secret keys never exposed to browser

---

## ⚠️ **Important Notes**

### **Secret Key Sources**
- **Get from**: Your existing `.env` file in the project
- **Security**: Never share or commit secret keys to git
- **Production**: Only stored in Netlify environment variables

### **Webhook Secret**
- **Get from**: Stripe Dashboard → Developers → Webhooks
- **Format**: Starts with `whsec_`
- **Purpose**: Webhook verification

---

## 🎯 **After Netlify Setup**

### **What Will Work**
- ✅ **Live payments** on production site
- ✅ **Real revenue** from component sales  
- ✅ **Stripe dashboard** tracking
- ✅ **Customer receipts** via email

### **Week 3 Launch Ready**
- 🚀 **NOBS Pay sales** at component pricing
- 💰 **Real revenue** generation
- 📊 **Analytics** from actual transactions
- 🎯 **Marketplace** ready for customers

---

**Next Steps**:
1. **Add all variables** to Netlify environment settings
2. **Trigger new deploy** (automatic after adding variables)  
3. **Test live payments** on production site
4. **Launch Week 3** marketplace with confidence!

Get API keys from your local `.env` file and add them securely to Netlify! 🔐