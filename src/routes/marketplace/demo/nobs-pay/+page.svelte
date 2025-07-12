<script lang="ts">
  import { onMount } from 'svelte';
  import NOBSPay from '$lib/components/NOBSPay';
  import type { PaymentResult } from '$lib/components/NOBSPay/types';
  
  // Demo configuration
  let amount = 9900; // $99.00
  let currency = 'USD';
  let productName = 'Demo Product';
  let selectedTheme: 'default' | 'brand' = 'default';
  let testMode = true;
  
  // Demo states
  let demoResult: PaymentResult | null = null;
  let showResult = false;
  let customAmount = '99.00';
  
  // Payment methods toggle
  let enabledMethods = {
    stripe: true,
    paypal: true,
    crypto: false
  };
  
  function updateAmount() {
    const parsed = parseFloat(customAmount);
    if (!isNaN(parsed) && parsed > 0) {
      amount = Math.round(parsed * 100);
    }
  }
  
  function handlePaymentSuccess(result: PaymentResult) {    console.log('Demo payment successful!', result);
    demoResult = result;
    showResult = true;
    
    // Auto-hide result after 5 seconds
    setTimeout(() => {
      showResult = false;
    }, 5000);
  }
  
  function handlePaymentError(error: Error) {
    console.error('Demo payment failed:', error);
    alert(`Demo payment failed: ${error.message}`);
  }
  
  function handlePaymentCancel() {
    console.log('Demo payment cancelled');
  }
  
  function resetDemo() {
    demoResult = null;
    showResult = false;
  }
  
  $: enabledMethodsArray = Object.entries(enabledMethods)
    .filter(([_, enabled]) => enabled)
    .map(([method]) => method);
  
  $: updateAmount();
</script>
<div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
  <div class="max-w-7xl mx-auto px-4 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        NOBS Pay Interactive Demo
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300">
        Try out the universal payment component before you buy
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        This is a test environment - no real charges will be made
      </p>
    </div>
    
    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Configuration Panel -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Demo Configuration
        </h2>
        
        <div class="space-y-6">
          <!-- Amount Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>              <input
                type="number"
                step="0.01"
                bind:value={customAmount}
                on:input={updateAmount}
                class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="99.00"
              />
            </div>
          </div>
          
          <!-- Product Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              bind:value={productName}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Your Product Name"
            />
          </div>
          
          <!-- Theme Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <select
              bind:value={selectedTheme}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="default">Default</option>
              <option value="brand">Brand</option>
            </select>
          </div>
          
          <!-- Payment Methods -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payment Methods
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  bind:checked={enabledMethods.stripe}
                  class="mr-2 rounded"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Stripe (Credit/Debit Cards)</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  bind:checked={enabledMethods.paypal}
                  class="mr-2 rounded"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">PayPal</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  bind:checked={enabledMethods.crypto}
                  class="mr-2 rounded"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Cryptocurrency (Coming Soon)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Payment Component Demo -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Payment Component
        </h2>
        
        {#if showResult && demoResult}
          <div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-800 dark:text-green-300 font-medium">
                  Payment Successful! 🎉
                </p>
                <p class="text-sm text-green-600 dark:text-green-400 mt-1">
                  Transaction ID: {demoResult.transactionId}
                </p>
              </div>
              <button
                on:click={resetDemo}
                class="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Reset
              </button>
            </div>
          </div>
        {/if}
        
        <NOBSPay
          {amount}
          {currency}
          {productName}
          theme={selectedTheme}
          enabledMethods={enabledMethodsArray}
          {testMode}
          on:success={(e) => handlePaymentSuccess(e.detail)}
          on:error={(e) => handlePaymentError(e.detail)}
          on:cancel={handlePaymentCancel}
        />
        
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p class="text-sm text-blue-800 dark:text-blue-300">
            <strong>Test Mode:</strong> Use test card 4242 4242 4242 4242 with any future expiry date
          </p>
        </div>
      </div>
    </div>
    
    <!-- Features Section -->
    <div class="mt-16 grid md:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Lightning Fast
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Optimized for speed with minimal dependencies
        </p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Secure by Default
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          PCI compliant with built-in fraud protection
        </p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Fully Customizable
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Match your brand with flexible theming options
        </p>
      </div>
    </div>
  </div>
</div>