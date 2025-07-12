/**
 * NOBS Pay - No BS Payment Component
 * TypeScript type definitions
 */

export type PaymentMethod = 'stripe' | 'paypal' | 'coinbase';

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export type Theme = 'default' | 'dark' | 'minimal' | 'brand';

export interface PaymentResult {
  success: boolean;
  method: PaymentMethod;
  transactionId: string;
  amount: number;
  currency: string;
  timestamp: Date;
  error?: string;
}

export interface NOBSPayProps {
  // Core payment info
  amount: number;                    // Amount in cents (e.g., 19900 = $199.00)
  currency?: string;                 // Default: 'USD'
  productName: string;               // What they're buying
  productId?: string;                // Optional product identifier
  
  // Payment methods
  methods?: PaymentMethod[];         // Default: ['stripe', 'paypal', 'crypto']
  preferredMethod?: PaymentMethod;   // Pre-select a method
  
  // Customer info
  customerEmail?: string;            // Pre-fill if known
  
  // UI customization
  theme?: Theme;                     // Default: 'default'
  compactMode?: boolean;             // Smaller UI for embedded use
  showMethodIcons?: boolean;         // Default: true
  
  // Callbacks
  onSuccess: (result: PaymentResult) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
  
  // Advanced options
  metadata?: Record<string, any>;    // Additional data to store
  testMode?: boolean;                // Use test API keys
}

export interface PaymentMethodConfig {
  id: PaymentMethod;
  name: string;
  icon: string;
  logo?: string; // Path to logo image
  color: string;
  description: string;
  enabled: boolean;
  testKey?: string;
  liveKey?: string;
}

export interface CustomerInfo {
  email: string;
  name?: string;
  company?: string;
}

// Stripe specific types
export interface StripeConfig {
  publishableKey: string;
  clientSecret?: string;
}

// PayPal specific types
export interface PayPalConfig {
  clientId: string;
  merchantId?: string;
}

// Crypto specific types
export interface CryptoConfig {
  acceptedCurrencies: string[];
  walletAddress?: string;
  network?: 'mainnet' | 'testnet';
}
