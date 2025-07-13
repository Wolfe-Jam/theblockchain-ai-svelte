<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { formatAmount } from './config';
  
  export let amount: number;
  export let currency: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export let productName: string;
  export let email: string;
  export let testMode: boolean;
  
  const dispatch = createEventDispatcher();
  
  const handleBack = () => {
    dispatch('back');
  };
  
  // Placeholder for now
  const handleCrypto = () => {
    // In production, this would integrate with Coinbase Commerce
    alert('Crypto payment integration coming soon! This would open Coinbase Commerce.');
    dispatch('success', 'crypto_demo_' + Date.now());
  };
</script>

<div class="crypto-payment">
  <h3 class="payment-title">Cryptocurrency Payment</h3>
  <p class="payment-amount">{formatAmount(amount, currency)}</p>
  
  <div class="crypto-info">
    <p>Pay with Bitcoin, Ethereum, or USDC</p>
    <p class="email-info">Receipt will be sent to: <strong>{email}</strong></p>
  </div>
  
  <div class="crypto-options">
    <div class="crypto-option">
      <span class="crypto-icon">₿</span>
      <span>Bitcoin</span>
    </div>
    <div class="crypto-option">
      <span class="crypto-icon">Ξ</span>
      <span>Ethereum</span>
    </div>
    <div class="crypto-option">
      <span class="crypto-icon">$</span>
      <span>USDC</span>
    </div>
  </div>
  
  <div class="form-actions">
    <button class="back-button" on:click={handleBack}>
      ← Back
    </button>
    <button class="crypto-button" on:click={handleCrypto}>
      Pay with Crypto
    </button>
  </div>
  
  {#if testMode}
    <div class="test-mode-notice">
      🧪 Test Mode - Testnet Payments
    </div>
  {/if}
</div>

<style>
  .crypto-payment {
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
    content: '🔗';
    font-size: 1.5rem;
  }
  
  .payment-amount {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: var(--brand-cyan-text);
    text-align: center;
  }
  
  .crypto-info {
    padding: 1rem;
    background: var(--bai-bg-hover, #f3f4f6);
    border-radius: 0.5rem;
    text-align: center;
  }
  
  .crypto-info p {
    margin: 0.5rem 0;
    color: var(--bai-text-secondary);
  }
  
  .email-info strong {
    color: var(--bai-text-primary);
  }
  
  .crypto-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
  
  .crypto-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--bai-bg-light);
    border: 1px solid var(--bai-border);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: var(--bai-text-secondary);
  }
  
  .crypto-icon {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--brand-cyan-text);
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .back-button,
  .crypto-button {
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
  
  .crypto-button {
    background: var(--brand-cyan-text);
    border: 2px solid var(--brand-cyan-text);
    color: white;
  }
  
  .crypto-button:hover {
    background: var(--brand-cyan);
    border-color: var(--brand-cyan);
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