<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { PaymentMethod, PaymentResult } from './types';
  import { formatAmount } from './config';
  
  // Props
  export let amount: number;
  export let productName: string;
  export let currency = 'USD';
  export let testMode = false;
  export let theme: 'default' | 'brand' = 'brand';
  
  const dispatch = createEventDispatcher();
  
  let selectedMethod: PaymentMethod | null = null;
  let isProcessing = false;
  let showSuccess = false;
  let email = '';
  
  $: formattedAmount = formatAmount(amount, currency);
  
  // One-click payment handlers
  const handleQuickPay = async (method: PaymentMethod) => {
    if (isProcessing) return;
    
    selectedMethod = method;
    isProcessing = true;
    
    // Simulate payment processing
    setTimeout(() => {
      isProcessing = false;
      showSuccess = true;
      
      const result: PaymentResult = {
        success: true,
        method,
        transactionId: `demo-${Date.now()}`,
        amount,
        currency,
        timestamp: new Date()
      };
      
      dispatch('success', result);
      
      // Reset after 2 seconds
      setTimeout(() => {
        showSuccess = false;
        selectedMethod = null;
      }, 2000);
    }, 1500);
  };
  
  const paymentOptions = [
    { 
      method: 'stripe' as PaymentMethod, 
      label: 'Card', 
      icon: '💳',
      color: '#635BFF'
    },
    { 
      method: 'paypal' as PaymentMethod, 
      label: 'PayPal', 
      icon: '🅿️',
      color: '#0070BA'
    },
    { 
      method: 'crypto' as PaymentMethod, 
      label: 'Crypto', 
      icon: '₿',
      color: '#F7931A'
    }
  ];
</script>

<div class="nobs-pay-compact {theme}">
  <div class="payment-card">
    {#if showSuccess}
      <!-- Success State -->
      <div class="success-view" transition:fade>
        <div class="success-icon">✅</div>
        <h3>Payment Complete!</h3>
        <p>Thank you for your purchase</p>
      </div>
    {:else}
      <!-- Payment State -->
      <div class="payment-header">
        <h3 class="product-name">{productName}</h3>
        <div class="amount">{formattedAmount}</div>
      </div>
      
      <div class="payment-methods">
        {#each paymentOptions as option}
          <button
            class="payment-button"
            class:processing={isProcessing && selectedMethod === option.method}
            disabled={isProcessing}
            on:click={() => handleQuickPay(option.method)}
            style="--button-color: {option.color}"
          >
            {#if isProcessing && selectedMethod === option.method}
              <span class="spinner"></span>
            {:else}
              <span class="icon">{option.icon}</span>
              <span class="label">{option.label}</span>
            {/if}
          </button>
        {/each}
      </div>
      
      {#if testMode}
        <div class="test-badge">TEST MODE</div>
      {/if}
    {/if}
    
    <div class="secure-badge">
      🔒 Secure • Instant • No BS
    </div>
  </div>
</div>

<style>
  .nobs-pay-compact {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 320px;
    margin: 0 auto;
  }
  
  .payment-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    position: relative;
    overflow: hidden;
  }
  
  /* Brand theme gradient */
  .nobs-pay-compact.brand .payment-card {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.98), 
      rgba(12, 192, 223, 0.03)
    );
    border: 1px solid rgba(12, 192, 223, 0.2);
  }
  
  .payment-header {
    margin-bottom: 16px;
    text-align: center;
  }
  
  .product-name {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
  }
  
  .amount {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    letter-spacing: -0.02em;
  }
  
  .payment-methods {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .payment-button {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    position: relative;
    overflow: hidden;
  }
  
  .payment-button:hover:not(:disabled) {
    border-color: var(--button-color);
    background: rgba(0, 0, 0, 0.02);
    transform: translateY(-1px);
  }
  
  .payment-button:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .payment-button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .payment-button.processing {
    border-color: var(--button-color);
    background: var(--button-color);
    color: white;
  }
  
  .payment-button .icon {
    font-size: 24px;
    line-height: 1;
  }
  
  .payment-button .label {
    font-size: 12px;
    font-weight: 600;
    color: #374151;
  }
  
  .payment-button.processing .label {
    color: white;
  }
  
  /* Spinner */
  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Success View */
  .success-view {
    text-align: center;
    padding: 20px 0;
  }
  
  .success-icon {
    font-size: 48px;
    margin-bottom: 12px;
    animation: bounce 0.5s ease;
  }
  
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  .success-view h3 {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 600;
    color: #059669;
  }
  
  .success-view p {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
  }
  
  /* Test Badge */
  .test-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #f59e0b;
    color: white;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }
  
  /* Secure Badge */
  .secure-badge {
    text-align: center;
    font-size: 11px;
    color: #9ca3af;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
  
  /* Dark mode support */
  :global(.dark) .payment-card {
    background: #1f2937;
    border-color: #374151;
  }
  
  :global(.dark) .amount {
    color: white;
  }
  
  :global(.dark) .payment-button {
    background: #111827;
    border-color: #374151;
  }
  
  :global(.dark) .payment-button:hover:not(:disabled) {
    background: #1f2937;
  }
  
  :global(.dark) .payment-button .label {
    color: #d1d5db;
  }
  
  /* Mobile optimization */
  @media (max-width: 360px) {
    .nobs-pay-compact {
      max-width: 100%;
    }
    
    .payment-card {
      padding: 16px;
    }
    
    .payment-methods {
      gap: 6px;
    }
    
    .payment-button {
      padding: 10px 6px;
    }
  }
</style>