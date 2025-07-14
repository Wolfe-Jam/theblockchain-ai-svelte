<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { formatAmount } from './config';
  import { dev } from '$app/environment';
  
  export let amount: number;
  export let currency: string;
  export let productName: string;
  export let email: string;
  export let testMode: boolean;
  
  const dispatch = createEventDispatcher();
  
  let paypalButtonContainer: HTMLElement;
  let loading = false;
  let error = '';
  let paypalLoaded = false;
  let paypalClientId = '';
  
  const handleBack = () => {
    dispatch('back');
  };

  onMount(() => {
    loadPayPalConfig();
  });

  async function loadPayPalConfig() {
    try {
      const response = await fetch('/api/paypal/config');
      const config = await response.json();
      paypalClientId = config.paypalClientId;
      loadPayPalSDK();
    } catch (err) {
      console.error('Failed to load PayPal config:', err);
      error = 'Failed to load PayPal configuration';
    }
  }

  async function loadPayPalSDK() {
    // Make sure we have the client ID first
    if (!paypalClientId) {
      error = 'PayPal client ID not available';
      return;
    }

    // Check if PayPal is already loaded
    if (typeof window !== 'undefined' && window.paypal) {
      paypalLoaded = true;
      initializePayPal();
      return;
    }

    // Load PayPal SDK dynamically
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`;
    script.onload = () => {
      paypalLoaded = true;
      initializePayPal();
    };
    script.onerror = () => {
      error = 'Failed to load PayPal SDK';
    };
    document.head.appendChild(script);
  }

  async function initializePayPal() {
    try {
      await window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 40
        },
        createOrder: async () => {
          loading = true;
          error = '';
          
          const response = await fetch('/api/paypal/create-order', {
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
            throw new Error(data.error || 'Failed to create PayPal order');
          }
          
          return data.orderID;
        },
        
        onApprove: async (data: any) => {
          try {
            const response = await fetch('/api/paypal/capture-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderID: data.orderID })
            });

            const result = await response.json();
            
            if (!response.ok) {
              throw new Error(result.error || 'Failed to capture payment');
            }
            
            dispatch('success', result.transactionId);
          } catch (err) {
            error = err instanceof Error ? err.message : 'Payment capture failed';
            loading = false;
          }
        },
        
        onError: (err: any) => {
          console.error('PayPal error:', err);
          error = 'PayPal payment failed. Please try again.';
          loading = false;
        },
        
        onCancel: () => {
          loading = false;
          dispatch('back');
        }
      }).render(paypalButtonContainer);
      
    } catch (err) {
      console.error('PayPal initialization error:', err);
      error = 'Failed to initialize PayPal. Please try again.';
    }
  }
</script>

<div class="paypal-payment">
  <h3 class="payment-title">PayPal Payment</h3>
  <p class="payment-amount">{formatAmount(amount, currency)}</p>
  
  <div class="paypal-info">
    <p>Complete your payment securely with PayPal.</p>
    <p class="email-info">Receipt will be sent to: <strong>{email}</strong></p>
  </div>

  {#if error}
    <div class="error-message">
      <p>{error}</p>
    </div>
  {/if}

  {#if loading}
    <div class="loading-state">
      <p>Processing payment...</p>
    </div>
  {/if}

  <!-- PayPal Buttons Container -->
  <div class="paypal-buttons-container" bind:this={paypalButtonContainer}></div>
  
  <div class="form-actions">
    <button class="back-button" on:click={handleBack} disabled={loading}>
      ← Back
    </button>
  </div>
</div>

<style>
  .paypal-payment {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 350px;
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
    content: '🅿️';
    font-size: 1.5rem;
  }

  .payment-amount {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #059669;
    margin: 0;
  }

  .paypal-info {
    text-align: center;
    color: #6b7280;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.5rem;
  }

  .paypal-info p {
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

  .loading-state {
    text-align: center;
    padding: 1rem;
  }

  .loading-state p {
    color: #6b7280;
    margin: 0;
    font-style: italic;
  }

  .paypal-buttons-container {
    min-height: 50px;
    margin: 1rem 0;
    /* Ensure PayPal buttons render properly */
    background: transparent;
  }

  /* Ensure PayPal button styling */
  :global(.paypal-buttons-container div) {
    background: transparent !important;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .back-button {
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }

  .back-button:hover:not(:disabled) {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }

  .back-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Dark mode support */
  :global(.dark) .payment-title {
    color: #f9fafb;
  }

  :global(.dark) .paypal-info {
    color: #9ca3af;
    background: #374151;
  }

  :global(.dark) .email-info {
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