<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { formatAmount } from './config';
  
  export let amount: number;
  export let currency: string;
  export let productName: string;
  export let email: string;
  export let testMode: boolean;
  
  const dispatch = createEventDispatcher();
  
  const handleBack = () => {
    dispatch('back');
  };
  
  // Placeholder for now
  const handlePayPal = () => {
    // In production, this would integrate with PayPal SDK
    alert('PayPal integration coming soon! This would open PayPal checkout.');
    dispatch('success', 'paypal_demo_' + Date.now());
  };
</script>

<div class="paypal-payment">
  <h3 class="payment-title">PayPal Payment</h3>
  <p class="payment-amount">{formatAmount(amount, currency)}</p>
  
  <div class="paypal-info">
    <p>You'll be redirected to PayPal to complete your purchase.</p>
    <p class="email-info">Receipt will be sent to: <strong>{email}</strong></p>
  </div>
  
  <div class="form-actions">
    <button class="back-button" on:click={handleBack}>
      ← Back
    </button>
    <button class="paypal-button" on:click={handlePayPal}>
      Continue to PayPal
    </button>
  </div>
  
  {#if testMode}
    <div class="test-mode-notice">
      🧪 Test Mode - PayPal Sandbox
    </div>
  {/if}
</div>

<style>
  .paypal-payment {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .payment-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0;
    color: var(--bai-text-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .payment-title::before {
    content: '🅿️';
    font-size: 1.5rem;
  }
  
  .payment-amount {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: var(--brand-orange-text);
    text-align: center;
  }
  
  .paypal-info {
    padding: 1rem;
    background: var(--bai-bg-hover, #f3f4f6);
    border-radius: 0.5rem;
    text-align: center;
  }
  
  .paypal-info p {
    margin: 0.5rem 0;
    color: var(--bai-text-secondary);
  }
  
  .email-info strong {
    color: var(--bai-text-primary);
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .back-button,
  .paypal-button {
    flex: 1;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .back-button {
    background: transparent;
    border: 2px solid var(--bai-border);
    color: var(--bai-text-secondary);
  }
  
  .back-button:hover {
    background: var(--bai-bg-hover);
    color: var(--bai-text-primary);
  }
  
  .paypal-button {
    background: var(--brand-orange-text);
    border: 2px solid var(--brand-orange-text);
    color: white;
  }
  
  .paypal-button:hover {
    background: var(--brand-orange);
    border-color: var(--brand-orange);
    transform: translateY(-1px);
  }
  
  .test-mode-notice {
    padding: 0.75rem;
    background: #fef3c7;
    border: 1px solid #fbbf24;
    border-radius: 0.5rem;
    color: #92400e;
    font-size: 0.875rem;
    text-align: center;
  }
</style>