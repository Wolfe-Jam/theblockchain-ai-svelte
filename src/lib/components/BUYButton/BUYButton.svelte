<script lang="ts">
  import { getContext, createEventDispatcher } from 'svelte';
  import type { Component } from '$lib/marketplace/types';
  
  // Props for button customization
  export let size: 'compact' | 'small' | 'medium' | 'large' = 'medium';
  export let style: 'lightning' | 'minimal' | 'premium' = 'lightning';
  export let disabled: boolean = false;
  
  const dispatch = createEventDispatcher<{
    purchase: Component;
  }>();
  
  // Get product from container context - THE MAGIC!
  const productContext = getContext<{ product: Component }>('product-context');
  
  function handlePurchase() {
    if (productContext?.product && !disabled) {
      console.log('🚀 ONE-CLICK BUY:', productContext.product.name);
      dispatch('purchase', productContext.product);
    }
  }
  
  // Size configurations
  const sizeClasses = {
    compact: 'px-3 py-1.5 text-xs',
    small: 'px-4 py-2 text-sm', 
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  const iconSizes = {
    compact: 'w-3 h-3',
    small: 'w-4 h-4',
    medium: 'w-5 h-5', 
    large: 'w-6 h-6'
  };
</script>

<button 
  class="buy-button {sizeClasses[size]} {style}"
  class:disabled
  on:click={handlePurchase}
  {disabled}
  title="BUY ⚡️ {productContext?.product?.name || ''}"
>
  <svg class="lightning-icon {iconSizes[size]}" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z"/>
  </svg>
  BUY
</button>

<style>
  .buy-button {
    background: rgba(0, 0, 0, 0.9);
    color: white;
    border: none;
    border-radius: 2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    min-width: fit-content;
    white-space: nowrap;
  }
  
  .buy-button:hover:not(.disabled) {
    transform: scale(1.05) translateY(-1px);
    background: rgba(0, 0, 0, 1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  
  .buy-button:active:not(.disabled) {
    transform: scale(0.98);
  }
  
  .buy-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Style variations */
  .buy-button.lightning {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 30, 30, 0.9));
  }
  
  .buy-button.minimal {
    background: rgba(255, 255, 255, 0.9);
    color: #1f2937;
    backdrop-filter: blur(10px);
  }
  
  .buy-button.premium {
    background: linear-gradient(135deg, #f59e0b, #f97316);
    color: white;
  }
  
  .lightning-icon {
    color: #f59e0b;
    filter: drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3));
    transition: all 0.2s ease;
  }
  
  .buy-button:hover:not(.disabled) .lightning-icon {
    color: #f97316;
    transform: scale(1.1);
    filter: drop-shadow(0 2px 6px rgba(249, 115, 22, 0.4));
  }
  
  .buy-button.minimal .lightning-icon {
    color: #f59e0b;
  }
  
  .buy-button.premium .lightning-icon {
    color: #fff;
  }
</style>