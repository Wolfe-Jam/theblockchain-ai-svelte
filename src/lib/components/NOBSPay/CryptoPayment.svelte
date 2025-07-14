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
  
  const handleBack = () => {
    dispatch('back');
  };

  const handleCryptoPayment = async () => {
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
      
      // Open Coinbase Commerce hosted checkout
      if (data.hostedUrl) {
        window.open(data.hostedUrl, '_blank');
        dispatch('success', data.chargeId);
      }
      
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to create crypto payment';
      console.error('Crypto payment error:', err);
    } finally {
      loading = false;
    }
  };
</script>

<div class="crypto-payment">
  <div class="crypto-info">
    <div class="crypto-provider">
      <img src="/coinbase-logo.svg" alt="Coinbase" class="payment-logo" />
      <span>Powered by Coinbase Commerce</span>
    </div>
    <div class="crypto-types">
      <span class="crypto-badge">₿</span>
      <span class="crypto-badge">Ξ</span>
      <span class="crypto-badge">💲</span>
    </div>
  </div>

  {#if error}
    <div class="error-message">
      <p>❌ {error}</p>
    </div>
  {/if}

  <div class="form-actions">
    <button class="back-button" on:click={handleBack} disabled={loading}>
      ← Back
    </button>
    
    <button 
      class="crypto-button" 
      on:click={handleCryptoPayment} 
      disabled={loading}
    >
      {#if loading}
        ⏳ Creating Payment...
      {:else}
        🚀 Pay with Crypto
      {/if}
    </button>
  </div>
</div>

<style>
  .crypto-payment {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 350px;
    margin: 0 auto;
  }

  .crypto-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
  }

  .crypto-provider {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }

  .payment-logo {
    width: 1.25rem;
    height: 1.25rem;
  }

  .crypto-types {
    display: flex;
    gap: 0.25rem;
  }

  .crypto-badge {
    width: 1.75rem;
    height: 1.75rem;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
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

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .back-button, .crypto-button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    border: 1px solid;
    font-size: 0.875rem;
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

  .crypto-button {
    background: linear-gradient(135deg, #0052ff, #0066ff);
    color: white;
    border-color: #0052ff;
    min-width: 140px;
  }

  .crypto-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #0041cc, #0052ff);
    transform: translateY(-1px);
  }

  .back-button:disabled,
  .crypto-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Dark mode support */
  :global(.dark) .crypto-info {
    background: #374151;
    border-color: #4b5563;
  }

  :global(.dark) .crypto-provider {
    color: #9ca3af;
  }

  :global(.dark) .crypto-badge {
    background: #4b5563;
    border-color: #6b7280;
    color: #d1d5db;
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