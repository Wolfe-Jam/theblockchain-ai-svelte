<script lang="ts">
  import { onMount } from 'svelte';
  import NOBSPayCompact from '$lib/components/NOBSPay/NOBSPayCompact.svelte';
  import type { PaymentResult } from '$lib/components/NOBSPay/types';
  
  // Demo configuration
  let amount = 100; // $1.00 for testing
  let productName = 'NOBS Pay License';
  let selectedTheme: 'default' | 'brand' = 'brand';
  let testMode = true;
  
  // Demo states
  let demoResult: PaymentResult | null = null;
  let customAmount = '1.00';
  
  function updateAmount() {
    const value = customAmount.replace(/[^\d.]/g, '');
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      amount = Math.round(parsed * 100);
    }
  }
  
  function handlePaymentSuccess(event: CustomEvent<PaymentResult>) {
    console.log('Payment successful!', event.detail);
    demoResult = event.detail;
    
    // Show success feedback
    setTimeout(() => {
      demoResult = null;
    }, 5000);
  }
  
  // Product variations for demo
  const productVariations = [
    { name: 'NOBS Pay License', amount: 19900 },
    { name: 'Pro Bundle', amount: 49900 },
    { name: 'Enterprise', amount: 99900 }
  ];
  
  let selectedProduct = 0;
  
  $: {
    amount = productVariations[selectedProduct].amount;
    productName = productVariations[selectedProduct].name;
    customAmount = (amount / 100).toFixed(2);
  }
</script>
<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Compact Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        NOBS Pay ⚡ One-Click Payments
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        The payment component that respects your time
      </p>
    </div>
    
    <div class="grid lg:grid-cols-3 gap-8 items-start">
      <!-- Configuration (Simplified) -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Quick Config</h3>
          
          <!-- Product Selection -->
          <div class="space-y-2 mb-4">
            {#each productVariations as product, i}
              <button
                class="w-full text-left px-4 py-3 rounded-lg border-2 transition-all
                  {selectedProduct === i 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}"
                on:click={() => selectedProduct = i}
              >
                <div class="flex justify-between items-center">
                  <span class="font-medium text-sm">{product.name}</span>
                  <span class="text-sm font-mono">${(product.amount / 100).toFixed(2)}</span>
                </div>
              </button>
            {/each}
          </div>
          
          <!-- Theme Toggle -->
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span class="text-sm font-medium">Theme</span>
            <button
              class="px-3 py-1 text-xs font-medium rounded-md
                {selectedTheme === 'brand' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'}"
              on:click={() => selectedTheme = selectedTheme === 'brand' ? 'default' : 'brand'}
            >
              {selectedTheme === 'brand' ? 'Brand' : 'Default'}
            </button>
          </div>
        </div>
        
        <!-- Features List -->
        <div class="mt-6 space-y-3">
          <div class="flex items-center gap-3 text-sm">
            <span class="text-green-500">✓</span>
            <span class="text-gray-600 dark:text-gray-300">One-click checkout</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <span class="text-green-500">✓</span>
            <span class="text-gray-600 dark:text-gray-300">Zero configuration</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <span class="text-green-500">✓</span>
            <span class="text-gray-600 dark:text-gray-300">Mobile optimized</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <span class="text-green-500">✓</span>
            <span class="text-gray-600 dark:text-gray-300">Instant feedback</span>
          </div>
        </div>
      </div>
      
      <!-- Payment Component Demo -->
      <div class="lg:col-span-2 flex flex-col items-center">
        <!-- Live Demo Label -->
        <div class="mb-4 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
          🟢 Live Demo - Click any payment method
        </div>
        
        <!-- The Actual Component -->
        <NOBSPayCompact
          {amount}
          {productName}
          theme={selectedTheme}
          {testMode}
          on:success={handlePaymentSuccess}
        />
        
        <!-- Test Instructions -->
        <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>This is a demo - no real charges</p>
          <p class="mt-1">Just click any payment method to see the flow</p>
        </div>
        
        <!-- Success Result Display -->
        {#if demoResult}
          <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg max-w-sm">
            <h4 class="font-semibold text-green-800 dark:text-green-300 mb-2">Payment Successful!</h4>
            <dl class="text-sm space-y-1">
              <div class="flex justify-between">
                <dt class="text-green-600 dark:text-green-400">Method:</dt>
                <dd class="font-mono">{demoResult.method}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-green-600 dark:text-green-400">Transaction:</dt>
                <dd class="font-mono text-xs">{demoResult.transactionId}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-green-600 dark:text-green-400">Amount:</dt>
                <dd class="font-mono">${(demoResult.amount / 100).toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Code Example -->
    <div class="mt-16 bg-gray-900 rounded-xl p-6 overflow-x-auto">
      <h3 class="text-white font-semibold mb-4">Integration Example</h3>
      <pre class="text-sm"><code class="language-svelte text-gray-300">{`<script>
  import NOBSPay from 'nobs-pay';
  
  function handlePayment(result) {
    console.log('Payment complete!', result);
  }
</script>

<NOBSPay 
  amount={19900}
  productName="Your Product"
  theme="brand"
  on:success={handlePayment}
/>`}</code></pre>
    </div>
    
    <!-- Bottom CTA -->
    <div class="mt-16 text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Ready to eliminate payment friction?
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-8">
        Get NOBS Pay today and start accepting payments in minutes, not hours
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/marketplace/nobs-pay"
          class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Get NOBS Pay - $199
        </a>
        <a
          href="/docs/nobs-pay"
          class="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
        >
          View Documentation
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom styles for the demo page */
  :global(.language-svelte) {
    font-family: 'Fira Code', 'Consolas', monospace;
  }
</style>