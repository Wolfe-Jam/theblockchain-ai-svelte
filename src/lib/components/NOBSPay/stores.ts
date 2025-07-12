/**
 * Payment state management for NOBS Pay
 */
import { writable, derived } from 'svelte/store';
import type { PaymentMethod, PaymentStatus, CustomerInfo } from './types';

// Core payment state
export const paymentStatus = writable<PaymentStatus>('idle');
export const selectedMethod = writable<PaymentMethod | null>(null);
export const customerInfo = writable<CustomerInfo>({ email: '' });
export const errorMessage = writable<string>('');

// Processing state
export const isProcessing = derived(
  paymentStatus,
  $status => $status === 'processing'
);

// Reset all state
export const resetPayment = () => {
  paymentStatus.set('idle');
  selectedMethod.set(null);
  errorMessage.set('');
};
