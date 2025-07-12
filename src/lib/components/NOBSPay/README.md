# NOBS Pay Component

The No BS Payment Component for the New Digital Economy

## Features

- 💳 **Multiple Payment Methods**: Stripe, PayPal, and Cryptocurrency
- 🎨 **Customizable Themes**: Default, Dark, Minimal, Brand
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🔒 **Secure**: PCI compliant with industry-standard security
- ⚡ **Easy Integration**: < 15 minutes to implement
- 🌍 **International**: Multi-currency support

## Installation

```bash
# Copy the NOBSPay folder to your project
cp -r src/lib/components/NOBSPay your-project/src/lib/components/
```

## Basic Usage

```svelte
<script>
  import NOBSPay from '$lib/components/NOBSPay';
  
  const handleSuccess = (result) => {
    console.log('Payment successful!', result);
    // Handle successful payment
  };
  
  const handleError = (error) => {
    console.error('Payment failed:', error);
    // Handle payment error
  };
</script>

<NOBSPay
  amount={19900}
  productName="Your Product Name"
  onSuccess={handleSuccess}
  onError={handleError}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | required | Amount in cents (e.g., 19900 = $199.00) |
| `productName` | `string` | required | Name of the product being purchased |
| `currency` | `string` | `'USD'` | Currency code |
| `methods` | `PaymentMethod[]` | `['stripe', 'paypal', 'crypto']` | Available payment methods |
| `theme` | `Theme` | `'default'` | UI theme (default, dark, minimal, brand) |
| `customerEmail` | `string` | `''` | Pre-fill customer email if known |
| `testMode` | `boolean` | `false` | Use test API keys |
| `onSuccess` | `(result: PaymentResult) => void` | required | Success callback |
| `onError` | `(error: Error) => void` | required | Error callback |
| `onCancel` | `() => void` | optional | Cancel callback |

## Configuration

Add your payment processor API keys to your `.env` file:

```env
# Stripe
PUBLIC_STRIPE_TEST_KEY=pk_test_...
PUBLIC_STRIPE_LIVE_KEY=pk_live_...

# PayPal
PUBLIC_PAYPAL_CLIENT_ID=...

# Coinbase Commerce
PUBLIC_COINBASE_API_KEY=...
```

## Themes

### Default Theme
Clean, professional appearance with standard colors.

### Dark Theme
Perfect for dark mode applications.

### Minimal Theme
Reduced visual elements for a cleaner look.

### Brand Theme
Uses your theBlockchain.ai brand colors.

## TypeScript Support

NOBS Pay is written in TypeScript and includes full type definitions:

```typescript
import type { NOBSPayProps, PaymentResult } from '$lib/components/NOBSPay';
```

## Demo

Visit `/marketplace/demo/nobs-pay` to see NOBS Pay in action!

## The Inception

Experience the magic - purchase NOBS Pay using NOBS Pay itself. This is the ultimate proof that we believe in our own product.

## License

This component is part of theBlockchain.ai marketplace. See LICENSE for details.
