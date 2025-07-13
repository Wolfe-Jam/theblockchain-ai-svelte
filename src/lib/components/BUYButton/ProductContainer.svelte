<script lang="ts">
  import { setContext } from 'svelte';
  import type { Component } from '$lib/marketplace/types';
  
  export let product: Component;
  export let layout: 'vertical' | 'inline' = 'vertical';
  export let gap: 'small' | 'medium' | 'large' = 'medium';
  
  // THE MAGIC: Provide product context to all children
  setContext('product-context', { product });
  
  const gapClasses = {
    small: 'gap-2',
    medium: 'gap-4', 
    large: 'gap-6'
  };
</script>

<div 
  class="product-container {layout} {gapClasses[gap]}"
  data-product-id={product.id}
  data-product-name={product.name}
>
  <div class="product-display">
    <slot name="product">
      <!-- Default: Product card goes here -->
    </slot>
  </div>
  
  <div class="product-action">
    <slot name="buy">
      <!-- Default: BUY button goes here -->
    </slot>
  </div>
</div>

<style>
  .product-container {
    display: flex;
    width: 100%;
  }
  
  .product-container.vertical {
    flex-direction: column;
  }
  
  .product-container.inline {
    flex-direction: row;
    align-items: flex-end;
  }
  
  .product-display {
    flex: 1;
    min-height: 0; /* Allow shrinking */
  }
  
  .product-action {
    display: flex;
    justify-content: center;
    flex-shrink: 0; /* Never shrink the BUY button */
  }
  
  /* Inline layout adjustments */
  .product-container.inline .product-action {
    justify-content: flex-start;
    margin-left: auto; /* Push to right in inline mode */
  }
</style>