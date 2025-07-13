<script lang="ts">
  import { onMount } from 'svelte';
  import type { Component } from '$lib/marketplace/types';
  import NOBSPay from '$lib/components/NOBSPay';
  import type { PaymentResult } from '$lib/components/NOBSPay/types';
  import FlipCard from '$lib/components/marketplace/FlipCard.svelte';
  
  let components: Component[] = [];
  let loading = true;
  
  // Payment state
  let showPayment = false;
  let selectedComponent: Component | null = null;
  
  // Load components on mount
  onMount(async () => {
    await loadComponents();
  });
  
  async function loadComponents() {
    try {
      loading = true;
      components = getMockComponents();
    } catch (err) {
      console.log('Using mock data due to error');
      components = getMockComponents();
    } finally {
      loading = false;
    }
  }
  
  // Mock data for development - 8 color spectrum FlipCards
  function getMockComponents(): Component[] {
    const colorSpectrum = [
      { name: 'Red', theme: 'red', bg: 'from-red-500 to-red-600' },
      { name: 'Orange', theme: 'orange', bg: 'from-orange-500 to-orange-600' },
      { name: 'Yellow', theme: 'yellow', bg: 'from-yellow-500 to-yellow-600' },
      { name: 'Green', theme: 'green', bg: 'from-green-500 to-green-600' },
      { name: 'Blue', theme: 'blue', bg: 'from-blue-500 to-blue-600' },
      { name: 'Indigo', theme: 'indigo', bg: 'from-indigo-500 to-indigo-600' },
      { name: 'Purple', theme: 'purple', bg: 'from-purple-500 to-purple-600' },
      { name: 'Pink', theme: 'pink', bg: 'from-pink-500 to-pink-600' }
    ];

    return colorSpectrum.map((color, index) => ({
      id: (index + 1).toString(),
      name: 'NOBS PAY CART',
      slug: 'nobs-pay',
      tagline: 'Done for You Billing system',
      description: 'Universal payment component that handles Stripe, PayPal, and Crypto payments with a single interface.',
      consumer_tagline: 'Done for You Billing system',
      api_name: 'NOBS Pay',
      formal_name: 'NOBS Pay Cart',
      fintech_name: 'NOBS Pay',
      price_individual: 100,  // $1.00 for testing
      price_team: 300,        // $3.00 for testing  
      price_enterprise: 500,  // $5.00 for testing
      category: 'payment-processing',
      tags: ['payment', 'stripe', 'paypal', 'crypto'],
      keywords: ['payment gateway', 'checkout', 'e-commerce'],
      tech_stack: ['svelte', 'typescript', 'stripe-api'],
      flip_card_theme: color.theme,
      flip_card_size: 'standard',
      flip_card_color: color.bg,
      rating: 5.0,
      download_count: 0,
      featured: index === 0, // Only first card is featured
      is_api_product: true,
      is_active: true,
      is_published: true,
      created_at: new Date().toISOString(),
      demo_url: '/marketplace/demo/nobs-pay',
      developer_features: ['Universal payment gateway', 'Multi-processor support', 'TypeScript definitions', 'Theme customization', 'Webhook handling']
    }));
  }
  
  // Payment handling functions
  function handleBuyNow(component: Component) {
    selectedComponent = component;
    showPayment = true;
  }
  
  function handlePaymentSuccess(result: PaymentResult) {
    console.log('Payment successful!', result);
    showPayment = false;
    
    // Show success message
    setTimeout(() => {
      alert(`Success! You've purchased ${selectedComponent?.name}. Transaction ID: ${result.transactionId}`);
      selectedComponent = null;
    }, 100);
  }
  
  function handlePaymentError(error: Error) {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error.message}`);
  }
  
  function handlePaymentCancel() {
    showPayment = false;
    selectedComponent = null;
  }
  
  // Handle FlipCard events
  function handleCardBuy(event: CustomEvent<Component>) {
    handleBuyNow(event.detail);
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors pt-20">
  <!-- Announcement Banner -->
  <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4">
    <div class="max-w-7xl mx-auto text-center">
      <p class="text-sm font-medium">
        🎉 <strong>Inaugural Launch:</strong> NOBS Pay is now available! The first product on theMarketplace - buy it using itself! 
        <a href="/marketplace/demo/nobs-pay" class="underline hover:text-blue-200 ml-2">Try Demo →</a>
      </p>
    </div>
  </div>
  
  <!-- Marketplace Hero -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome to theMarketplace
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        The Google of Digital Components - Search, Discover, Build
      </p>
    </div>
  </div>
  
  <!-- Search Bar -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SearchBar on:search={handleSearch} />
    
    {#if $searchStore.query && !loading}
      <div class="search-status">
        <div>
          {#if $searchStore.isSearching}
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Searching for "{$searchStore.query}"...
            </p>
          {:else if displayedComponents.length === 0}
            <p class="text-sm text-gray-600 dark:text-gray-400">
              No results found for "{$searchStore.query}". Try different keywords or use Claude Smarts mode.
            </p>
          {:else}
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Found {displayedComponents.length} result{displayedComponents.length === 1 ? '' : 's'} for "{$searchStore.query}"
              {#if $searchStore.mode === 'claude' || $searchStore.mode === 'hybrid'}
                with Claude's help
              {/if}
            </p>
          {/if}
        </div>
        
        {#if $searchStore.query}
          <button 
            class="clear-search"
            on:click={resetSearch}
          >
            Clear search
          </button>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">
    {#if loading}
      <div class="text-center py-12">
        <div class="inline-flex items-center">
          <svg class="animate-spin h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-600 dark:text-gray-300">Loading marketplace...</span>
        </div>
      </div>
    {/if}

    <!-- Component Grid -->
    <div class="mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {#if components.some(c => c.featured)}
            Featured Components
          {:else}
            All Components
          {/if}
        </h2>
        
        <!-- View Mode Toggle -->
        <div class="flex gap-2">
          <button
            on:click={() => viewMode = 'flip'}
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors {viewMode === 'flip' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
          >
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            Flip Cards
          </button>
          <button
            on:click={() => viewMode = 'grid'}
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors {viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
          >
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Grid View
          </button>
        </div>
      </div>
      
      {#if viewMode === 'flip'}
        <!-- Flip Cards View -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each displayedComponents as component (component.id)}
            <FlipCard 
              {component}
              on:buy={handleCardBuy}
            />
          {/each}
        </div>
      {:else}
        <!-- Traditional Grid View -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {#each displayedComponents as component (component.id)}
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-4 border border-gray-200 dark:border-gray-700">
              <!-- Compact card content -->
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {component.name}
                </h3>
                {#if component.featured}
                  <span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                {/if}
              </div>
              
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {component.consumer_tagline || component.tagline || component.description}
              </p>
              
              <div class="flex flex-wrap gap-1 mb-3">
                {#each (component.tags || [component.category || 'Component', 'Featured']).slice(0, 2) as tag}
                  <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                {/each}
              </div>
              
              <div class="flex items-center justify-between mb-3">
                <span class="text-xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(component.price || component.price_individual)}
                </span>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span class="text-yellow-400">★</span>
                  <span class="ml-1">{component.rating || '4.8'}</span>
                </div>
              </div>
              
              <div class="flex gap-2">
                <button 
                  on:click={() => handleBuyNow(component)}
                  class="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded text-sm font-medium transition-colors"
                >
                  Buy
                </button>
                {#if component.demo_url}
                  <button 
                    on:click={() => handleDemoClick(component)}
                    class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                  >
                    Demo
                  </button>
                {/if}
                <button 
                  on:click={() => handleDetailsClick(component)}
                  class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
                >
                  Details
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
      
      {#if components.length === 0 && !loading}
        <div class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">No components available yet.</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">Check back soon!</p>
        </div>
      {/if}
    </div>

    <!-- The Inception Teaser -->
    {#if components.some(c => c.slug === 'nobs-pay')}
      <div class="mt-12 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-300 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          🎪 Experience the Inception
        </h3>
        <p class="text-gray-800 dark:text-gray-300 font-medium">
          Try searching for "payment component" above, then purchase NOBS Pay using NOBS Pay itself! 
          It's the ultimate proof that our marketplace works.
        </p>
      </div>
    {/if}
  </main>
  
  <!-- NOBS Pay Modal -->
  {#if showPayment && selectedComponent}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Complete Your Purchase
            </h2>
            <button 
              on:click={handlePaymentCancel}
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <NOBSPay
            amount={selectedComponent.price || selectedComponent.price_individual}
            productName={selectedComponent.name}
            productId={selectedComponent.id}
            theme="brand"
            testMode={true}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
          />
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Utility class for line clamping */
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  
  /* Search status area */
  .search-status {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .clear-search {
    background: none;
    border: none;
    color: #06b6d4; /* Cyan color */
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.2s;
  }
  
  .clear-search:hover {
    color: #0891b2; /* Darker cyan on hover */
  }
  
  :global(.dark) .clear-search {
    color: #22d3ee;
  }
  
  :global(.dark) .clear-search:hover {
    color: #06b6d4;
  }
</style>
