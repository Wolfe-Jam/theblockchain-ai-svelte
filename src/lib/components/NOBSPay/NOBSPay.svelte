<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import type { NOBSPayProps, PaymentMethod, PaymentResult } from './types';
  import { paymentMethods, formatAmount } from './config';
  import { paymentStatus, selectedMethod, customerInfo, errorMessage, resetPayment } from './stores';
  import PaymentMethods from './PaymentMethods.svelte';
  import CustomerForm from './CustomerForm.svelte';
  import StripePayment from './StripePayment.svelte';
  import PayPalPayment from './PayPalPayment.svelte';
  import CryptoPayment from './CryptoPayment.svelte';
  
  // Props with defaults
  export let amount: number;
  export let productName: string;
  export let productId = '';
  export let currency = 'USD';
  export let methods: PaymentMethod[] = ['stripe', 'paypal', 'crypto'];
  export let preferredMethod: PaymentMethod | undefined = undefined;
  export let customerEmail = '';
  export let theme: NOBSPayProps['theme'] = 'default';
  export let compactMode = false;
  export let showMethodIcons = true;
  export let onSuccess: (result: PaymentResult) => void;
  export let onError: (error: Error) => void;
  export let onCancel: (() => void) | undefined = undefined;
  export let metadata: Record<string, any> = {};
  export let testMode = false;
  
  const dispatch = createEventDispatcher();
  
  // Initialize customer info if email provided
  if (customerEmail) {
    customerInfo.update(info => ({ ...info, email: customerEmail }));
  }
  
  // Set preferred method if provided
  if (preferredMethod && methods.includes(preferredMethod)) {
    selectedMethod.set(preferredMethod);
  }
  
  // Handle successful payment
  const handlePaymentSuccess = (transactionId: string, method: PaymentMethod) => {
    const result: PaymentResult = {
      success: true,
      method,
      transactionId,
      amount,
      currency,
      timestamp: new Date()
    };
    
    paymentStatus.set('success');
    onSuccess(result);
    dispatch('success', result);
    
    // Reset after short delay
    setTimeout(() => resetPayment(), 3000);
  };
  
  // Handle payment error
  const handlePaymentError = (error: Error) => {
    paymentStatus.set('error');
    errorMessage.set(error.message);
    onError(error);
    dispatch('error', error);
  };
  
  // Handle cancel
  const handleCancel = () => {
    resetPayment();
    onCancel?.();
    dispatch('cancel');
  };
  
  // Get enabled payment methods
  $: enabledMethods = methods.filter(method => 
    paymentMethods[method]?.enabled
  );
  
  $: formattedAmount = formatAmount(amount, currency);
</script>

<div class="nobs-pay {theme}" class:compact={compactMode}>
  <div class="payment-container">
    <!-- Header -->
    <div class="payment-header">
      <h2 class="payment-title">Complete Your Purchase</h2>
      <p class="product-info">
        {productName} - <strong>{formattedAmount}</strong>
      </p>
    </div>
    
    <!-- Error Message -->
    {#if $errorMessage}
      <div class="error-message" transition:slide>
        <span class="error-icon">⚠️</span>
        {$errorMessage}
      </div>
    {/if}
    
    <!-- Success Message -->
    {#if $paymentStatus === 'success'}
      <div class="success-message" transition:slide>
        <span class="success-icon">✅</span>
        Payment successful! Thank you for your purchase.
      </div>
    {/if}
    
    <!-- Payment Flow -->
    {#if $paymentStatus !== 'success'}
      <!-- Step 1: Select Payment Method -->
      {#if !$selectedMethod}
        <PaymentMethods 
          {methods}
          {showMethodIcons}
          on:select={(e) => selectedMethod.set(e.detail)}
        />
      {/if}
      
      <!-- Step 2: Customer Info (if needed) -->
      {#if $selectedMethod && !$customerInfo.email}
        <CustomerForm 
          on:submit={(e) => customerInfo.set(e.detail)}
          on:back={() => selectedMethod.set(null)}
        />
      {/if}
      
      <!-- Step 3: Payment Processing -->
      {#if $selectedMethod && $customerInfo.email}
        <div class="payment-method-container" transition:fade>
          {#if $selectedMethod === 'stripe'}
            <StripePayment
              {amount}
              {currency}
              {productName}
              email={$customerInfo.email}
              {testMode}
              on:success={(e) => handlePaymentSuccess(e.detail, 'stripe')}
              on:error={(e) => handlePaymentError(e.detail)}
              on:back={() => customerInfo.update(info => ({ ...info, email: '' }))}
            />
          {:else if $selectedMethod === 'paypal'}
            <PayPalPayment
              {amount}
              {currency}
              {productName}
              email={$customerInfo.email}
              {testMode}
              on:success={(e) => handlePaymentSuccess(e.detail, 'paypal')}
              on:error={(e) => handlePaymentError(e.detail)}
              on:back={() => customerInfo.update(info => ({ ...info, email: '' }))}
            />
          {:else if $selectedMethod === 'crypto'}
            <CryptoPayment
              {amount}
              {currency}
              {productName}
              email={$customerInfo.email}
              {testMode}
              on:success={(e) => handlePaymentSuccess(e.detail, 'crypto')}
              on:error={(e) => handlePaymentError(e.detail)}
              on:back={() => customerInfo.update(info => ({ ...info, email: '' }))}
            />
          {/if}
        </div>
      {/if}
    {/if}
    
    <!-- Footer -->
    <div class="payment-footer">
      <p class="security-note">
        🔒 Secure payment powered by NOBS Pay
      </p>
      {#if onCancel}
        <button class="cancel-button" on:click={handleCancel}>
          Cancel
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .nobs-pay {
    --nobs-border-radius: 0.75rem;
    --nobs-padding: 2rem;
    --nobs-gap: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .nobs-pay.compact {
    --nobs-padding: 1rem;
    --nobs-gap: 1rem;
  }
  
  .payment-container {
    background: var(--bai-bg-light, #ffffff);
    border: 1px solid var(--bai-border, #e5e7eb);
    border-radius: var(--nobs-border-radius);
    padding: var(--nobs-padding);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
  }
  
  /* Dark theme */
  .nobs-pay.dark .payment-container {
    background: var(--bai-bg-dark, #1a1a1a);
    border-color: var(--bai-border-dark, #333);
    color: var(--bai-text-light, #ffffff);
  }
  
  /* Brand theme */
  .nobs-pay.brand .payment-container {
    background: linear-gradient(135deg, rgba(12, 192, 223, 0.05), rgba(0, 74, 174, 0.05));
    border-color: var(--brand-cyan);
  }
  
  .payment-header {
    text-align: center;
    margin-bottom: var(--nobs-gap);
    padding-bottom: var(--nobs-gap);
    border-bottom: 1px solid var(--bai-border, #e5e7eb);
  }
  
  .payment-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--bai-text-primary, #111827);
  }
  
  .dark .payment-title {
    color: var(--bai-text-light, #ffffff);
  }
  
  .product-info {
    color: var(--bai-text-secondary, #6b7280);
    margin: 0;
  }
  
  .product-info strong {
    color: var(--brand-orange-text);
  }
  
  /* Messages */
  .error-message,
  .success-message {
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: var(--nobs-gap);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .error-message {
    background: #fee;
    color: #dc2626;
    border: 1px solid #fecaca;
  }
  
  .success-message {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #86efac;
  }
  
  .payment-footer {
    margin-top: var(--nobs-gap);
    padding-top: var(--nobs-gap);
    border-top: 1px solid var(--bai-border, #e5e7eb);
    text-align: center;
  }
  
  .security-note {
    font-size: 0.875rem;
    color: var(--bai-text-secondary, #6b7280);
    margin: 0;
  }
  
  .cancel-button {
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid var(--bai-border, #e5e7eb);
    border-radius: 0.375rem;
    color: var(--bai-text-secondary, #6b7280);
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-button:hover {
    background: var(--bai-bg-hover, #f3f4f6);
    color: var(--bai-text-primary, #111827);
  }
  
  /* Mobile responsive */
  @media (max-width: 640px) {
    .nobs-pay {
      --nobs-padding: 1rem;
    }
    
    .payment-title {
      font-size: 1.25rem;
    }
  }
</style>