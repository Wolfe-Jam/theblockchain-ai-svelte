<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  
  let orderDetails = {
    productId: '',
    transactionId: '',
    productName: 'NOBS Pay',
    amount: 19900,
    downloadUrl: ''
  };
  
  let downloading = false;
  let downloadComplete = false;
  let copySuccess = false;
  
  onMount(() => {
    // Get order details from URL params
    const params = $page.url.searchParams;
    orderDetails.productId = params.get('product') || '';
    orderDetails.transactionId = params.get('transaction') || '';
    
    // In production, verify the order with your backend
    // For now, we'll use the mock download URL
    orderDetails.downloadUrl = `/api/download/${orderDetails.productId}?order=${orderDetails.transactionId}`;
  });
  
  async function handleDownload() {
    downloading = true;
    
    try {
      // In production, this would download the actual file
      // For demo, we'll simulate a download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Trigger actual download
      const link = document.createElement('a');
      link.href = orderDetails.downloadUrl;
      link.download = 'nobs-pay-v1.0.zip';
      link.click();
      
      downloadComplete = true;
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please contact support.');
    } finally {
      downloading = false;
    }
  }
  
  async function copyTransactionId() {
    try {
      await navigator.clipboard.writeText(orderDetails.transactionId);
      copySuccess = true;
      setTimeout(() => copySuccess = false, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }
  
  function formatPrice(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  }
</script>
<div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20 pt-20">
  <div class="max-w-4xl mx-auto px-4 py-16">
    <!-- Success Animation -->
    <div class="text-center mb-12" in:fade={{ duration: 600 }}>
      <div class="success-animation">
        <svg class="checkmark" viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
        Purchase Successful! 🎉
      </h1>
      
      <p class="text-xl text-gray-600 dark:text-gray-300">
        {#if orderDetails.productId === 'nobs-pay-v1'}
          Welcome to the inception club - you just used NOBS Pay to buy NOBS Pay!
        {:else}
          Thank you for your purchase!
        {/if}
      </p>
    </div>
    
    <!-- Order Details Card -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8" in:fly={{ y: 20, duration: 600, delay: 300 }}>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Order Details
      </h2>      
      <div class="space-y-4">
        <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
          <span class="text-gray-600 dark:text-gray-400">Product</span>
          <span class="font-semibold text-gray-900 dark:text-white">{orderDetails.productName}</span>
        </div>
        
        <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
          <span class="text-gray-600 dark:text-gray-400">Amount</span>
          <span class="font-semibold text-gray-900 dark:text-white">{formatPrice(orderDetails.amount)}</span>
        </div>
        
        <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
          <span class="text-gray-600 dark:text-gray-400">License</span>
          <span class="font-semibold text-gray-900 dark:text-white">Individual License</span>
        </div>
        
        <div class="flex justify-between items-center py-3">
          <span class="text-gray-600 dark:text-gray-400">Transaction ID</span>
          <div class="flex items-center gap-2">
            <code class="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm">
              {orderDetails.transactionId || 'Loading...'}
            </code>
            <button
              on:click={copyTransactionId}
              class="text-blue-600 hover:text-blue-700 dark:text-blue-400"
              title="Copy transaction ID"
            >
              {#if copySuccess}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>              {:else}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              {/if}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Download Button -->
      <div class="mt-8">
        <button
          on:click={handleDownload}
          disabled={downloading || downloadComplete}
          class="download-button {downloading ? 'downloading' : ''} {downloadComplete ? 'complete' : ''}"
        >
          {#if downloading}
            <svg class="animate-spin mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.75"></path>
            </svg>
            Preparing Download...
          {:else if downloadComplete}
            <svg class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Download Complete!
          {:else}            <svg class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download NOBS Pay (20KB)
          {/if}
        </button>
        
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
          You can always re-download from your account dashboard
        </p>
      </div>
    </div>
    
    <!-- Quick Start Guide -->
    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-8" in:fly={{ y: 20, duration: 600, delay: 600 }}>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        🚀 Quick Start Guide
      </h3>
      
      <ol class="space-y-3 text-gray-700 dark:text-gray-300">
        <li class="flex gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</span>
          <div>
            <strong>Extract the ZIP file</strong>
            <p class="text-sm text-gray-600 dark:text-gray-400">Unzip nobs-pay-v1.0.zip to your project</p>
          </div>
        </li>
        <li class="flex gap-3">          <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</span>
          <div>
            <strong>Install dependencies</strong>
            <pre class="text-sm bg-gray-900 text-gray-100 p-2 rounded mt-1"><code>npm install stripe @paypal/react-paypal-js</code></pre>
          </div>
        </li>
        <li class="flex gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</span>
          <div>
            <strong>Import and use</strong>
            <pre class="text-sm bg-gray-900 text-gray-100 p-2 rounded mt-1"><code>import NOBSPay from './components/NOBSPay.svelte';</code></pre>
          </div>
        </li>
      </ol>
      
      <div class="mt-6 flex gap-4">
        <a 
          href="/docs/nobs-pay"
          class="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
        >
          View Documentation →
        </a>
        <a 
          href="/marketplace/demo/nobs-pay"
          class="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
        >
          Live Demo →
        </a>
      </div>
    </div>    
    <!-- Support Section -->
    <div class="text-center text-gray-600 dark:text-gray-400">
      <p class="mb-2">Need help? We're here for you!</p>
      <div class="flex items-center justify-center gap-6">
        <a href="mailto:support@theblockchain.ai" class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="m22 7-10 5L2 7"></path>
          </svg>
          support@theblockchain.ai
        </a>
        <a href="/discord" class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Join Discord
        </a>
      </div>
    </div>
  </div>
</div>
<style>
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  /* Success Animation */
  .success-animation {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  
  .checkmark {
    width: 100%;
    height: 100%;
  }
  
  .checkmark-circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #10b981;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  
  .checkmark-check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;    stroke-dashoffset: 48;
    stroke: #10b981;
    stroke-width: 3;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
  }
  
  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  
  /* Download Button */
  .download-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    font-weight: 600;
    font-size: 1.125rem;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .download-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }  
  .download-button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .download-button.downloading {
    background: linear-gradient(135deg, #6366f1, #a78bfa);
  }
  
  .download-button.complete {
    background: linear-gradient(135deg, #10b981, #34d399);
  }
  
  /* Code blocks */
  pre {
    overflow-x: auto;
  }
  
  code {
    font-family: 'Fira Code', 'Monaco', monospace;
  }
</style>