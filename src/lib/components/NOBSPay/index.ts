/**
 * NOBS Pay - No BS Payment Component
 * A universal payment component for the new digital economy
 * 
 * Features:
 * - Multiple payment methods (Stripe, PayPal, Crypto)
 * - Clean, professional UI
 * - TypeScript support
 * - Fully customizable themes
 * - Mobile responsive
 * 
 * Usage:
 * import NOBSPay from '$lib/components/NOBSPay';
 * 
 * <NOBSPay
 *   amount={19900}
 *   productName="DataBox Component"
 *   onSuccess={handleSuccess}
 *   onError={handleError}
 * />
 */

export { default } from './NOBSPay.svelte';
export * from './types';
export { paymentMethods, formatAmount } from './config';
