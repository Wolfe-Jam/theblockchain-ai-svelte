<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { PaymentMethod } from './types';
  import { paymentMethods } from './config';
  
  export let methods: PaymentMethod[] = ['stripe', 'paypal', 'crypto'];
  export let showMethodIcons = true;
  
  const dispatch = createEventDispatcher();
  
  const selectMethod = (method: PaymentMethod) => {
    dispatch('select', method);
  };
</script>

<div class="payment-methods">
  <h3 class="methods-title">Select Payment Method</h3>
  
  <div class="methods-grid">
    {#each methods as method}
      {@const config = paymentMethods[method]}
      {#if config?.enabled}
        <button
          class="method-card"
          style="--method-color: {config.color};"
          on:click={() => selectMethod(method)}
          transition:fade
        >
          {#if showMethodIcons}
            <span class="method-icon">{config.icon}</span>
          {/if}
          <span class="method-name">{config.name}</span>
          <span class="method-description">{config.description}</span>
        </button>
      {/if}
    {/each}
  </div>
</div>

<style>
  .payment-methods {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .methods-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0;
    color: var(--bai-text-primary, #111827);
  }
  
  .methods-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .method-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background: var(--bai-bg-light, #ffffff);
    border: 2px solid var(--bai-border, #e5e7eb);
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }
  
  .method-card:hover {
    border-color: var(--method-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
  }
  
  .method-card:active {
    transform: translateY(0);
  }
  
  .method-icon {
    font-size: 2rem;
  }
  
  .method-name {
    font-weight: 600;
    color: var(--bai-text-primary, #111827);
  }
  
  .method-description {
    font-size: 0.875rem;
    color: var(--bai-text-secondary, #6b7280);
  }
  
  /* Compact mode */
  @media (min-width: 640px) {
    .methods-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }
</style>