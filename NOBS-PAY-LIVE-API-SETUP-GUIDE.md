# 🚀 NOBS Pay - Live API Setup Guide

## 🎯 **CRITICAL MILESTONE: Test → Production**
**Moving from sandbox payments to REAL revenue generation**

---

## 🏗️ **Architecture Overview**

Think of this like **switching from play money to real cash** in a casino:
- **Sandbox**: Practice with fake money (what we've been doing)
- **Production**: Real money, real customers, real revenue
- **Netlify Functions**: The secure vault that processes payments

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Netlify        │    │  Payment        │
│   (UI Layer)    │────│  Functions      │────│  Providers      │
│                 │    │  (API Layer)    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
    User clicks            Secure backend           Live payment
    "Pay with..."          processes payment        processing
```

---

## 💳 **1. STRIPE LIVE SETUP**

### **Step 1: Stripe Dashboard**
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Toggle from **"Test mode"** to **"Live mode"** (top right)
3. Navigate to **Developers > API Keys**

### **Step 2: Get Live API Keys**
```bash
# You'll need these TWO keys:
STRIPE_LIVE_SECRET_KEY=sk_live_... (starts with sk_live_)
STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_... (starts with pk_live_)
```

### **Step 3: Netlify Environment Variables**
1. Go to your Netlify dashboard
2. Navigate to **Site Settings > Environment Variables**
3. Add these variables:

```env
# Stripe Live Keys
STRIPE_SECRET_KEY=sk_live_51...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Environment flag
NODE_ENV=production
```

### **Step 4: Update Frontend Code**
```typescript
// In your Svelte component
const stripePublishableKey = import.meta.env.MODE === 'production' 
  ? 'pk_live_...' 
  : 'pk_test_...';
```

---

## 💙 **2. PAYPAL LIVE SETUP**

### **Step 1: PayPal Developer Dashboard**
1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Click **"My Apps & Credentials"**
3. Switch to **"Live"** tab (not Sandbox)

### **Step 2: Create Live App**
1. Click **"Create App"**
2. Name: "NOBS Pay Live"
3. Select your **live business account**
4. Choose **"Merchant"** features

### **Step 3: Get Live Credentials**
```bash
# PayPal Live Keys
PAYPAL_CLIENT_ID=AZ... (live client ID)
PAYPAL_CLIENT_SECRET=EL... (live client secret)
```

### **Step 4: Netlify Environment Variables**
```env
# PayPal Live Keys
PAYPAL_CLIENT_ID=AZ...
PAYPAL_CLIENT_SECRET=EL...
PAYPAL_MODE=live
```

### **Step 5: Update PayPal SDK**
```javascript
// In your payment component
const paypalClientId = import.meta.env.PROD 
  ? 'AZ...' // Live client ID
  : 'sb...' // Sandbox client ID

const paypalConfig = {
  'client-id': paypalClientId,
  currency: 'USD',
  intent: 'capture',
  'data-client-token': 'your-live-client-token'
};
```

---

## 🌐 **3. COINBASE COMMERCE LIVE SETUP**

### **Step 1: Coinbase Commerce Dashboard**
1. Go to [commerce.coinbase.com](https://commerce.coinbase.com)
2. Sign up/log in with business account
3. Complete business verification (required for live)

### **Step 2: Get Live API Keys**
1. Navigate to **Settings > API Keys**
2. Create new API key for **"Live"** environment
3. Download the key (you can't see it again!)

```bash
# Coinbase Commerce Live Keys
COINBASE_COMMERCE_API_KEY=your-live-api-key
COINBASE_COMMERCE_WEBHOOK_SECRET=your-webhook-secret
```

### **Step 3: Business Verification**
⚠️ **IMPORTANT**: Coinbase requires business verification for live payments:
- Business license/registration
- Tax ID (EIN)
- Bank account verification
- Identity verification

### **Step 4: Netlify Environment Variables**
```env
# Coinbase Commerce Live Keys
COINBASE_COMMERCE_API_KEY=your-live-api-key
COINBASE_COMMERCE_WEBHOOK_SECRET=your-webhook-secret
COINBASE_ENVIRONMENT=live
```

---

## 🔧 **4. NETLIFY FUNCTIONS SETUP**

### **Step 1: Create Payment Endpoints**
Create these files in `netlify/functions/`:

```
netlify/functions/
├── stripe-payment.js
├── paypal-payment.js
├── coinbase-payment.js
└── payment-webhook.js
```

### **Step 2: Stripe Function Example**
```javascript
// netlify/functions/stripe-payment.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, currency = 'usd' } = JSON.parse(event.body);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      automatic_payment_methods: { enabled: true }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        clientSecret: paymentIntent.client_secret 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### **Step 3: PayPal Function Example**
```javascript
// netlify/functions/paypal-payment.js
const paypal = require('@paypal/checkout-server-sdk');

const environment = process.env.PAYPAL_MODE === 'live' 
  ? new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    )
  : new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    );

const client = new paypal.core.PayPalHttpClient(environment);

exports.handler = async (event, context) => {
  // PayPal order creation logic
};
```

---

## 🛡️ **5. SECURITY CHECKLIST**

### **Environment Variables Security**
```bash
# ✅ DO: Use environment variables
STRIPE_SECRET_KEY=sk_live_...

# ❌ DON'T: Hard-code in source code
const stripeKey = "sk_live_abc123"; // NEVER DO THIS!
```

### **API Key Protection**
- **Never** commit API keys to Git
- **Always** use environment variables
- **Rotate** keys regularly
- **Monitor** for unusual activity

### **Webhook Security**
```javascript
// Verify webhook signatures
const crypto = require('crypto');

const verifyWebhook = (payload, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};
```

---

## 📊 **6. TESTING LIVE PAYMENTS**

### **Safe Testing Strategy**
1. **Start with $0.50 transactions** (minimum amounts)
2. **Use your own payment methods** first
3. **Test all three providers** systematically
4. **Monitor transaction logs** closely

### **Test Checklist**
- [ ] Stripe: Card payment successful
- [ ] PayPal: PayPal account payment successful  
- [ ] PayPal: Credit card via PayPal successful
- [ ] Coinbase: Bitcoin payment successful
- [ ] Coinbase: Ethereum payment successful
- [ ] Coinbase: USDC payment successful
- [ ] Webhooks: All payment confirmations received
- [ ] Receipts: Email confirmations sent

---

## ⚡ **7. DEPLOYMENT STEPS**

### **Step 1: Update Environment Variables**
1. Add all live API keys to Netlify
2. Set `NODE_ENV=production`
3. Update any environment checks in code

### **Step 2: Update Frontend Config**
```javascript
// src/lib/config/payments.js
export const paymentConfig = {
  stripe: {
    publishableKey: import.meta.env.PROD 
      ? 'pk_live_...' 
      : 'pk_test_...'
  },
  paypal: {
    clientId: import.meta.env.PROD 
      ? 'AZ...' 
      : 'sb...'
  },
  coinbase: {
    environment: import.meta.env.PROD ? 'live' : 'sandbox'
  }
};
```

### **Step 3: Deploy and Test**
```bash
npm run build
git add .
git commit -m "feat: Live payment API integration"
git push origin main
# Netlify auto-deploys
```

---

## 💰 **8. PRICING STRATEGY**

### **Current vs Target Pricing**
```
Test Phase:    $1.00  (proof of concept)
Launch Phase:  $199   (early adopter pricing)
Growth Phase:  $499   (market positioning)
Premium:      $1,499  (enterprise licensing)
```

### **Revenue Projections**
- **50 sales at $199** = $9,950 first month
- **25 sales at $499** = $12,475 second month  
- **10 sales at $1,499** = $14,990 third month

---

## 🚨 **IMMEDIATE ACTION ITEMS**

### **Today (Live API Setup)**
1. [ ] Get Stripe live keys from dashboard
2. [ ] Create PayPal live app and get credentials
3. [ ] Sign up for Coinbase Commerce (start verification)
4. [ ] Add all keys to Netlify environment variables

### **This Week (Testing & Launch)**
1. [ ] Test all payment methods with small amounts
2. [ ] Update pricing from $1 to $199
3. [ ] Prepare Product Hunt launch materials
4. [ ] Monitor first live transactions

### **Next Week (Scale)**
1. [ ] Increase marketing spend
2. [ ] Track conversion rates
3. [ ] Optimize payment flow based on data
4. [ ] Plan next component (bAI-Auth)

---

## 🎯 **SUCCESS METRICS**

### **Technical KPIs**
- Payment success rate > 95%
- Page load time < 2 seconds
- Zero API errors in production
- All three payment methods working

### **Business KPIs**
- First week: 10+ sales ($1,990+ revenue)
- First month: 50+ sales ($9,950+ revenue)
- Customer satisfaction: 4.5+ stars
- Product Hunt: Top 5 product of the day

---

**Next Step**: Get those live API keys and let's start generating real revenue! 🚀💰

**Created**: July 14, 2025  
**Phase**: Production API Setup  
**Goal**: Launch live payments within 24 hours