# ⚡ NOBS Pay Cart Fix - 4-Step Implementation

## 🎯 **MISSION: Fix Cart Failure → Enable First Sale**

**Current Issue**: Cart starts payment process but fails at completion
**Root Cause**: Missing Stripe API configuration 
**Solution**: 4 critical tasks (2 hours total)
**Success Metric**: Complete test transaction end-to-end

---

## 🔧 **TASK 1: Create NOBS Pay Product (15 mins)**

### **API Call**
```bash
curl -X POST https://api.stripe.com/v1/products \
  -u sk_test_YOUR_SECRET_KEY: \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "id=nobs-pay-universal" \
  -d "name=NOBS Pay - Universal Payment Component" \
  -d "description=Universal payment interface supporting Stripe, PayPal, and Crypto" \
  -d "active=true"
```

### **Expected Response**
```json
{
  "id": "nobs-pay-universal",
  "object": "product",
  "name": "NOBS Pay - Universal Payment Component",
  "description": "Universal payment interface supporting Stripe, PayPal, and Crypto",
  "active": true
}
```

### **Verification**
- ✅ Product appears in Stripe Dashboard → Products
- ✅ Product ID: `nobs-pay-universal`

---

## 💰 **TASK 2: Create 3 Pricing Tiers (15 mins)**

### **Basic License ($199)**
```bash
curl -X POST https://api.stripe.com/v1/prices \
  -u sk_test_YOUR_SECRET_KEY: \
  -d "currency=usd" \
  -d "product=nobs-pay-universal" \
  -d "unit_amount=19900" \
  -d "nickname=Basic License"
```

### **Pro License ($499)**
```bash
curl -X POST https://api.stripe.com/v1/prices \
  -u sk_test_YOUR_SECRET_KEY: \
  -d "currency=usd" \
  -d "product=nobs-pay-universal" \
  -d "unit_amount=49900" \
  -d "nickname=Pro License"
```

### **Enterprise License ($1,499)**
```bash
curl -X POST https://api.stripe.com/v1/prices \
  -u sk_test_YOUR_SECRET_KEY: \
  -d "currency=usd" \
  -d "product=nobs-pay-universal" \
  -d "unit_amount=149900" \
  -d "nickname=Enterprise License"
```

### **Save Price IDs**
```bash
# Copy these from API responses
BASIC_PRICE_ID=price_xxxxx
PRO_PRICE_ID=price_xxxxx  
ENTERPRISE_PRICE_ID=price_xxxxx
```

---

## 🔄 **TASK 3: Build PaymentIntents Flow (45 mins)**

### **Backend API Route**
**File**: `routes/api/create-payment-intent/+server.ts`

```typescript
import Stripe from 'stripe';
import { error, json } from '@sveltejs/kit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST({ request }) {
  try {
    const { priceId, customerEmail } = await request.json();
    
    // Validate input
    if (!priceId || !customerEmail) {
      throw error(400, 'Missing required fields');
    }
    
    // Get price details
    const price = await stripe.prices.retrieve(priceId);
    
    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount!,
      currency: price.currency,
      payment_method_types: ['card'],
      metadata: {
        product_id: price.product as string,
        customer_email: customerEmail,
        license_type: price.nickname || 'unknown'
      }
    });
    
    return json({
      clientSecret: paymentIntent.client_secret
    });
    
  } catch (err) {
    console.error('PaymentIntent creation failed:', err);
    throw error(500, 'Payment initialization failed');
  }
}
```

### **Frontend Integration**
**File**: Update your cart component

```typescript
// Inside your cart/payment component
async function createPaymentIntent(priceId: string, customerEmail: string) {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, customerEmail })
  });
  
  if (!response.ok) {
    throw new Error('Failed to create payment intent');
  }
  
  return response.json();
}

// Use in payment flow
const { clientSecret } = await createPaymentIntent(selectedPriceId, customerEmail);
```

---

## 🔔 **TASK 4: Configure Webhooks (30 mins)**

### **Webhook Endpoint**
**File**: `routes/api/webhooks/stripe/+server.ts`

```typescript
import Stripe from 'stripe';
import { error, json } from '@sveltejs/kit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST({ request }) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw error(400, 'Missing webhook signature or secret');
  }
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body, 
      signature, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    throw error(400, 'Invalid webhook signature');
  }
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handleSuccessfulPayment(paymentIntent);
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      await handleFailedPayment(failedPayment);
      break;
  }
  
  return json({ received: true });
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  const { customer_email, license_type, product_id } = paymentIntent.metadata;
  
  // TODO: Implement your business logic
  // 1. Grant access to NOBS Pay download
  // 2. Send license key via email
  // 3. Update customer database
  // 4. Send confirmation email
  
  console.log('Payment succeeded:', {
    amount: paymentIntent.amount,
    customer: customer_email,
    license: license_type
  });
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  // TODO: Handle failed payment
  // 1. Log failure reason
  // 2. Send failure notification
  // 3. Update customer records
  
  console.log('Payment failed:', paymentIntent.id);
}
```

### **Environment Variables**
**Add to Netlify + .env.local**

```bash
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY  
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
```

---

## 🧪 **TESTING SEQUENCE**

### **Phase 1: API Testing (10 mins)**
```bash
# Test product creation
curl -X GET https://api.stripe.com/v1/products/nobs-pay-universal \
  -u sk_test_YOUR_KEY:

# Test price retrieval  
curl -X GET https://api.stripe.com/v1/prices/YOUR_PRICE_ID \
  -u sk_test_YOUR_KEY:
```

### **Phase 2: PaymentIntent Testing (15 mins)**
```bash
# Test via your API
curl -X POST http://localhost:5173/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_xxxxx","customerEmail":"test@example.com"}'
```

### **Phase 3: End-to-End Testing (15 mins)**
```typescript
// Test card numbers
const testCards = {
  success: '4242424242424242',
  declined: '4000000000000002',
  secure3d: '4000000000003220'
};
```

1. ✅ Add NOBS Pay to cart
2. ✅ Select Basic License ($199)
3. ✅ Enter test card: 4242424242424242
4. ✅ Complete payment successfully
5. ✅ Verify webhook received in console

---

## ✅ **SUCCESS CRITERIA**

### **Immediate (Next 2 Hours)**
- [ ] Product created in Stripe Dashboard
- [ ] 3 pricing tiers visible and functional
- [ ] PaymentIntent creates successfully 
- [ ] Test transaction completes end-to-end
- [ ] Webhook receives success event
- [ ] Cart failure → FIXED

### **Revenue Activation**
- [ ] First real transaction possible within 24 hours
- [ ] All pricing tiers ($199, $499, $1,499) working
- [ ] Customer receives license key automatically
- [ ] Failed payments handled gracefully

---

## 🚨 **TROUBLESHOOTING**

### **Common Issues**
```bash
# Issue: "No such product"
# Fix: Verify product ID exactly matches

# Issue: "Invalid price"  
# Fix: Check unit_amount is in cents (19900 = $199)

# Issue: "Webhook signature failed"
# Fix: Use raw request body, verify webhook secret

# Issue: "PaymentIntent requires payment_method"
# Fix: Add payment_method_types: ['card'] to creation
```

### **Debug Commands**
```bash
# Check Stripe dashboard
open https://dashboard.stripe.com/test/payments

# View webhook events
stripe events list --limit=5

# Test webhook locally
stripe listen --forward-to localhost:5173/api/webhooks/stripe
```

---

**Time Estimate**: 2 hours total
**Success Metric**: Cart failure fixed → First sale enabled
**Next Step**: Complete PayPal + Crypto integration