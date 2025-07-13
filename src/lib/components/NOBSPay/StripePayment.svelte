<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { paymentStatus } from './stores';
  import { formatAmount } from './config';
  
  export let amount: number;
  export let currency: string;
  export let productName: string;
  export let email: string;
  export let testMode: boolean;
  
  const dispatch = createEventDispatcher();
  
  let stripe: any;
  let elements: any;
  let cardElement: any;
  let cardError = '';
  let processing = false;
  
  // Initialize Stripe
  onMount(async () => {
    // Wait a moment for Stripe.js to fully load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check if Stripe is available
    if (typeof window !== 'undefined' && window.Stripe) {
      const stripeKey = testMode 
        ? (import.meta.env.VITE_STRIPE_TEST_KEY || import.meta.env.PUBLIC_STRIPE_TEST_KEY) 
        : (import.meta.env.VITE_STRIPE_LIVE_KEY || import.meta.env.PUBLIC_STRIPE_LIVE_KEY);
      
      if (!stripeKey) {
        cardError = 'Stripe is not configured. Please add your API keys.';
        return;
      }
      
      stripe = window.Stripe(stripeKey);
      console.log('Stripe initialized:', !!stripe);
      elements = stripe.elements();
      
      // Create card element with custom styling
      cardElement = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#dc2626',
            iconColor: '#dc2626'
          }
        }
      });
      
      // Mount the card element
      const cardMount = document.getElementById('card-element');
      if (cardMount) {
        cardElement.mount(cardMount);
        console.log('Card element mounted successfully');
        
        // Handle card validation errors
        cardElement.on('change', (event: any) => {
          cardError = event.error ? event.error.message : '';
        });
      }
    } else {
      cardError = 'Stripe.js not loaded. Please check your internet connection.';
    }
  });
  
  const handleSubmit = async () => {
    if (!stripe || !cardElement || processing) return;
    
    processing = true;
    paymentStatus.set('processing');
    cardError = '';
    
    try {
      // In production, you would call your backend to create a payment intent
      // For demo purposes, we'll simulate the payment
      if (testMode) {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate success
        const mockTransactionId = `pi_demo_${Date.now()}`;
        dispatch('success', mockTransactionId);
      } else {
        // Real Stripe integration would go here
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          'CLIENT_SECRET_FROM_BACKEND',
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                email: email
              }
            }
          }
        );
        
        if (error) {
          throw new Error(error.message);
        }
        
        dispatch('success', paymentIntent.id);
      }
    } catch (error: any) {
      cardError = error.message || 'Payment failed. Please try again.';
      dispatch('error', error);
      paymentStatus.set('error');
    } finally {
      processing = false;
    }
  };
  
  const handleBack = () => {
    dispatch('back');
  };
</script>

<div class="stripe-payment">
  <h3 class="payment-title">Card Payment</h3>
  <p class="payment-amount">{formatAmount(amount, currency)}</p>
  
  <div class="card-form">
    <div class="form-group">
      <label for="card-element" class="form-label">Card Details</label>
      <div id="card-element" class="card-element"></div>
      {#if cardError}
        <span class="error-text">{cardError}</span>
      {/if}
    </div>
    
    <div class="form-info">
      <p class="email-info">Receipt will be sent to: <strong>{email}</strong></p>
    </div>
    
    <div class="form-actions">
      <button 
        type="button" 
        class="back-button" 
        on:click={handleBack}
        disabled={processing}
      >
        ← Back
      </button>
      <button 
        type="button" 
        class="pay-button" 
        on:click={handleSubmit}
        disabled={processing || !stripe}
        class:processing
      >
        {#if processing}
          Processing...
        {:else}
          Pay {formatAmount(amount, currency)}
        {/if}
      </button>
    </div>
    
    {#if testMode}
      <div class="test-mode-notice">
        🧪 Test Mode - Use card 4242 4242 4242 4242
      </div>
    {/if}
  </div>
</div>

<style>
  .stripe-payment {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .payment-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0;
    color: var(--bai-text-primary, #111827);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .payment-title::before {
    content: '💳';
    font-size: 1.5rem;
  }
  
  .payment-amount {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: var(--brand-blue-text);
    text-align: center;
  }
  
  .card-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--bai-text-primary, #111827);
  }
  
  .card-element {
    padding: 0.75rem 1rem;
    border: 2px solid var(--bai-border, #e5e7eb);
    border-radius: 0.5rem;
    background: var(--bai-bg-light, #ffffff);
    min-height: 44px;
    transition: border-color 0.2s;
  }
  
  .card-element:focus-within {
    border-color: var(--brand-blue-text);
  }
  
  .error-text {
    font-size: 0.875rem;
    color: #dc2626;
  }
  
  .form-info {
    padding: 1rem;
    background: var(--bai-bg-hover, #f3f4f6);
    border-radius: 0.5rem;
  }
  
  .email-info {
    font-size: 0.875rem;
    color: var(--bai-text-secondary, #6b7280);
    margin: 0;
  }
  
  .email-info strong {
    color: var(--bai-text-primary, #111827);
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .back-button,
  .pay-button {
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
    border: 2px solid var(--bai-border, #e5e7eb);
    color: var(--bai-text-secondary, #6b7280);
  }
  
  .back-button:hover:not(:disabled) {
    background: var(--bai-bg-hover, #f3f4f6);
    color: var(--bai-text-primary, #111827);
  }
  
  .pay-button {
    background: var(--brand-blue-text);
    border: 2px solid var(--brand-blue-text);
    color: white;
  }
  
  .pay-button:hover:not(:disabled) {
    background: var(--brand-blue);
    border-color: var(--brand-blue);
    transform: translateY(-1px);
  }
  
  .pay-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pay-button.processing {
    background: var(--brand-orange-text);
    border-color: var(--brand-orange-text);
  }
  
  .test-mode-notice {
    padding: 0.75rem;
    background: #fef3c7;
    border: 1px solid #fbbf24;
    border-radius: 0.5rem;
    color: #92400e;
    font-size: 0.875rem;
    text-align: center;
    margin-top: 1rem;
  }
</style>