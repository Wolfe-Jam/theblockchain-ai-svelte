<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { formatAmount } from './config';
  
  export let amount: number;
  export let currency: string;
  export let productName: string;
  export let email: string;
  export let testMode: boolean;
  
  const dispatch = createEventDispatcher();
  
  let loading = false;
  let error = '';
  let chargeData: any = null;
  let showAddresses = false;
  
  const handleBack = () => {
    dispatch('back');
  };

  const handleCoinbaseCommerce = async () => {
    loading = true;
    error = '';
    
    try {
      const response = await fetch('/api/coinbase/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          productName,
          email
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create crypto charge');
      }
      
      chargeData = data;
      showAddresses = true;
      
      // Open Coinbase Commerce hosted checkout
      if (data.hostedUrl) {
        window.open(data.hostedUrl, '_blank');
      }
      
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to create crypto payment';
    } finally {
      loading = false;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
</script>

<div class="crypto-payment">
  <h3 class="payment-title">Cryptocurrency Payment</h3>
  <p class="payment-amount">{formatAmount(amount, currency)}</p>
  
  <div class="crypto-info">
    <p>Pay with Bitcoin, Ethereum, or USDC</p>
    <p class="email-info">Receipt will be sent to: <strong>{email}</strong></p>
  </div>

  {#if error}
    <div class="error-message">
      <p>{error}</p>
    </div>
  {/if}

  {#if !chargeData}
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
        <span class="crypto-icon">💲</span>
        <span>USDC</span>
      </div>
    </div>
  {/if}

  {#if chargeData && showAddresses}
    <div class="payment-addresses">
      <h4>Payment Addresses:</h4>
      {#each Object.entries(chargeData.addresses || {}) as [currency, address]}
        <div class="address-item">
          <div class="address-header">
            <span class="currency-name">{currency.toUpperCase()}</span>
          </div>
          <div class="address-display">
            <code class="address-code">{address}</code>
            <button class="copy-button" on:click={() => copyToClipboard(address)}>
              📋
            </button>
          </div>
        </div>
      {/each}
      
      <div class="checkout-notice">
        <p>💡 A new window opened with Coinbase Commerce checkout</p>
        <p>You can also send crypto directly to the addresses above</p>
      </div>
    </div>
  {/if}
  
  <div class="form-actions">
    <button class="back-button" on:click={handleBack} disabled={loading}>
      ← Back
    </button>
    
    {#if !chargeData}
      <button class="crypto-button" on:click={handleCoinbaseCommerce} disabled={loading}>
        {#if loading}
          Processing...
        {:else}
          Continue with Crypto
        {/if}
      </button>
    {/if}
  </div>
</div>

<style>
  .crypto-payment {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .payment-title {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: #1f2937;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .payment-title::before {
    content: '🪙';
    font-size: 1.5rem;
  }

  .payment-amount {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #059669;
    margin: 0;
  }

  .crypto-info {
    text-align: center;
    color: #6b7280;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.5rem;
  }

  .crypto-info p {
    margin: 0.5rem 0;
  }

  .email-info {
    font-size: 0.875rem;
    color: #374151;
  }

  .error-message {
    background-color: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: center;
  }

  .error-message p {
    color: #dc2626;
    margin: 0;
    font-weight: 500;
  }

  .crypto-options {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .crypto-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #f3f4f6;
    border-radius: 0.5rem;
    min-width: 80px;
  }

  .crypto-icon {
    font-size: 2rem;
  }

  .payment-addresses {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .payment-addresses h4 {
    margin: 0 0 1rem 0;
    color: #374151;
    font-size: 1.125rem;
  }

  .address-item {
    margin-bottom: 1rem;
  }

  .address-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .currency-name {
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
  }

  .address-display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.5rem;
  }

  .address-code {
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    word-break: break-all;
    flex: 1;
    color: #374151;
  }

  .copy-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    font-size: 1rem;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .copy-button:hover {
    opacity: 1;
  }

  .checkout-notice {
    margin-top: 1rem;
    padding: 1rem;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 0.5rem;
    text-align: center;
  }

  .checkout-notice p {
    margin: 0.25rem 0;
    color: #1e40af;
    font-size: 0.875rem;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .back-button, .crypto-button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    border: 1px solid;
  }

  .back-button {
    background-color: #f3f4f6;
    color: #374151;
    border-color: #d1d5db;
  }

  .back-button:hover:not(:disabled) {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }

  .back-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .crypto-button {
    background-color: #f59e0b;
    color: white;
    border-color: #f59e0b;
    min-width: 160px;
  }

  .crypto-button:hover:not(:disabled) {
    background-color: #d97706;
    border-color: #d97706;
  }

  .crypto-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Dark mode support */
  :global(.dark) .payment-title {
    color: #f9fafb;
  }

  :global(.dark) .crypto-info {
    color: #9ca3af;
    background: #374151;
  }

  :global(.dark) .email-info {
    color: #d1d5db;
  }

  :global(.dark) .crypto-option {
    background: #374151;
    color: #f9fafb;
  }

  :global(.dark) .payment-addresses {
    background: #374151;
    border-color: #4b5563;
  }

  :global(.dark) .payment-addresses h4 {
    color: #f9fafb;
  }

  :global(.dark) .currency-name {
    color: #f9fafb;
  }

  :global(.dark) .address-display {
    background: #1f2937;
    border-color: #4b5563;
  }

  :global(.dark) .address-code {
    color: #e5e7eb;
  }

  :global(.dark) .back-button {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
  }

  :global(.dark) .back-button:hover:not(:disabled) {
    background-color: #4b5563;
    border-color: #6b7280;
  }
</style>