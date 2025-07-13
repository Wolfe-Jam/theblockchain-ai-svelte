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
  let showNotification = false;
  
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
    
    // Show notification
    showNotification = true;
    setTimeout(() => {
      showNotification = false;
    }, 4000);
    
    // Show success feedback for longer to make it more visible
    setTimeout(() => {
      demoResult = null;
    }, 8000); // Extended from 5 to 8 seconds
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
  <!-- Success Notification -->
  {#if showNotification}
    <div class="fixed top-4 right-4 z-50 animate-pulse">
      <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <span class="text-xl">✅</span>
        <span class="font-medium">Demo Payment Successful!</span>
      </div>
    </div>
  {/if}
  
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
          <p class="mt-1">Click any payment method to see the success flow</p>
          {#if demoResult}
            <p class="mt-2 text-green-600 dark:text-green-400 font-medium">
              ✨ Success! Check the detailed result below ↓
            </p>
          {/if}
        </div>
        
        <!-- Success Result Display -->
        {#if demoResult}
          <div class="mt-6 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl max-w-sm mx-auto shadow-lg animate-bounce-gentle">
            <div class="text-center mb-4">
              <div class="text-4xl mb-2">🎉</div>
              <h4 class="font-bold text-green-800 dark:text-green-300 text-lg">Payment Successful!</h4>
              <p class="text-green-600 dark:text-green-400 text-sm">Demo transaction completed</p>
            </div>
            <dl class="text-sm space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div class="flex justify-between">
                <dt class="text-green-600 dark:text-green-400 font-medium">Method:</dt>
                <dd class="font-mono text-gray-900 dark:text-gray-100 capitalize">{demoResult.method}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-green-600 dark:text-green-400 font-medium">Transaction ID:</dt>
                <dd class="font-mono text-xs text-gray-900 dark:text-gray-100">{demoResult.transactionId}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-green-600 dark:text-green-400 font-medium">Amount:</dt>
                <dd class="font-mono text-gray-900 dark:text-gray-100 font-semibold">${(demoResult.amount / 100).toFixed(2)}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-green-600 dark:text-green-400 font-medium">Status:</dt>
                <dd class="text-green-600 dark:text-green-400 font-semibold">✅ Complete</dd>
              </div>
            </dl>
            <div class="mt-4 text-center">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                This was a demo transaction - no real charges were made
              </p>
            </div>
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
          href="/marketplace/products/nobs-pay"
          class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Buy NOBS Pay - From $1.00
        </a>
        <a
          href="/marketplace/products/nobs-pay#features"
          class="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
        >
          View Features & Pricing
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
  
  .animate-bounce-gentle {
    animation: gentle-bounce 1s ease-out;
  }
  
  @keyframes gentle-bounce {
    0% { 
      transform: translateY(20px);
      opacity: 0;
    }
    60% { 
      transform: translateY(-5px);
      opacity: 1;
    }
    100% { 
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>