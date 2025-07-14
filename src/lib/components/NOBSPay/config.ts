/**
 * Payment method configurations for NOBS Pay
 */
import type { PaymentMethodConfig } from './types';

export const paymentMethods: Record<string, PaymentMethodConfig> = {
  stripe: {
    id: 'stripe',
    name: 'Credit/Debit Card',
    icon: '💳',
    color: 'var(--brand-blue)',
    description: 'Secure card payment via Stripe',
    enabled: true,
    testKey: import.meta.env.VITE_STRIPE_TEST_KEY || import.meta.env.PUBLIC_STRIPE_TEST_KEY || '',
    liveKey: import.meta.env.VITE_STRIPE_LIVE_KEY || import.meta.env.PUBLIC_STRIPE_LIVE_KEY || ''
  },
  paypal: {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    color: 'var(--brand-orange)',
    description: 'Fast checkout with PayPal',
    enabled: true,
    testKey: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
    liveKey: import.meta.env.VITE_PUBLIC_PAYPAL_CLIENT_ID || import.meta.env.PUBLIC_PAYPAL_CLIENT_ID || ''
  },
  crypto: {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: '🔗',
    color: 'var(--brand-cyan)',
    description: 'Pay with Bitcoin, Ethereum, or USDC',
    enabled: true,
    testKey: import.meta.env.VITE_COINBASE_API_KEY || import.meta.env.PUBLIC_COINBASE_API_KEY || ''
  }
};

// Formatting utilities
export const formatAmount = (cents: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(cents / 100);
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
