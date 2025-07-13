<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Component } from '$lib/marketplace/types';
  import NOBSPay from '$lib/components/NOBSPay';
  import type { PaymentResult } from '$lib/components/NOBSPay/types';
  import FlipCard from '$lib/components/marketplace/FlipCard.svelte';
  
  let components: Component[] = [];
  let loading = true;
  let viewMode: 'flip' | 'list' = 'flip';
  
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
  
  // Utility functions
  function formatPrice(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }
  
  function handleDemoClick(component: Component) {
    const demoSlugMap: { [key: string]: string } = {
      'NOBS PAY CART': 'nobs-pay',
      'DataViz Pro': 'dataviz-pro', 
      'Auth Shield': 'auth-shield'
    };
    
    const demoSlug = demoSlugMap[component.name] || component.slug || component.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    goto(`/marketplace/demo/${demoSlug}`);
  }
  
  function handleDetailsClick(component: Component) {
    const productSlug = component.slug || component.id;
    goto(`/marketplace/products/${productSlug}`);
  }
  
  // Get tech stack display (concise, no fluff)
  function getTechDisplay(component: Component): string {
    const tech = component.tech_stack || ['TypeScript', 'Svelte', 'API'];
    return tech.slice(0, 3).join(' • ');
  }
  
  // Get concise description (4-5 words max)
  function getShortDescription(component: Component): string {
    const desc = component.consumer_tagline || component.tagline || component.description;
    const words = desc.split(' ').slice(0, 5);
    return words.join(' ');
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Flip Cards
          </button>
          <button
            on:click={() => viewMode = 'list'}
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors {viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
          >
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            List View
          </button>
        </div>
      </div>
      
      {#if viewMode === 'flip'}
        <!-- Flip Cards View -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each components as component (component.id)}
            <FlipCard 
              {component}
              on:buy={handleCardBuy}
            />
          {/each}
        </div>
      {:else}
        <!-- Legendary List View -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <!-- Desktop List -->
          <div class="legendary-list-desktop">
            <!-- List Header -->
            <div class="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
              <div class="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                <div class="col-span-1"></div> <!-- Icon space -->
                <div class="col-span-3">Product</div>
                <div class="col-span-3">Description</div>
                <div class="col-span-3">Tech Stack</div>
                <div class="col-span-1 text-right">Price</div>
                <div class="col-span-1"></div> <!-- Actions space -->
              </div>
            </div>
            
            <!-- List Items -->
            <div class="divide-y divide-gray-200 dark:divide-gray-600">
              {#each components as component, index (component.id)}
                <div 
                  class="legendary-list-row grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
                  on:click={() => handleDetailsClick(component)}
                  on:keydown={(e) => e.key === 'Enter' && handleDetailsClick(component)}
                  role="button"
                  tabindex="0"
                  aria-label="View details for {component.name}"
                >
                  <!-- ✅ Icon -->
                  <div class="col-span-1 flex items-center justify-center">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br {component.flip_card_color || 'from-blue-500 to-blue-600'} flex items-center justify-center">
                      <span class="text-white text-lg">✅</span>
                    </div>
                  </div>
                  
                  <!-- Product Name -->
                  <div class="col-span-3">
                    <h3 class="product-name font-semibold text-gray-900 dark:text-white transition-colors">
                      {component.name}
                    </h3>
                    {#if component.featured}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 mt-1">
                        Featured
                      </span>
                    {/if}
                  </div>
                  
                  <!-- 4-5 Word Description -->
                  <div class="col-span-3">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {getShortDescription(component)}
                    </p>
                  </div>
                  
                  <!-- Tech Stack (No Fluff) -->
                  <div class="col-span-3">
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {getTechDisplay(component)}
                      </span>
                      {#if component.rating}
                        <div class="flex items-center ml-2">
                          <span class="text-yellow-400 text-sm">★</span>
                          <span class="text-xs text-gray-500 dark:text-gray-400 ml-0.5">
                            {component.rating}
                          </span>
                        </div>
                      {/if}
                    </div>
                  </div>
                  
                  <!-- Price -->
                  <div class="col-span-1 text-right">
                    <span class="font-bold text-gray-900 dark:text-white">
                      {formatPrice(component.price || component.price_individual)}
                    </span>
                  </div>
                  
                  <!-- Actions -->
                  <div class="col-span-1 flex items-center justify-end gap-1">
                    {#if component.demo_url}
                      <button 
                        on:click={(e) => { e.stopPropagation(); handleDemoClick(component); }}
                        class="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Try Demo"
                        aria-label="Try demo for {component.name}"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 010 5H9m4.5-5H15m0 0l3 3m-3-3l3-3" />
                        </svg>
                      </button>
                    {/if}
                    <button 
                      on:click={(e) => { e.stopPropagation(); handleBuyNow(component); }}
                      class="p-1.5 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                      title="Buy Now"
                      aria-label="Buy {component.name}"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L3 21m0 0h5.5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
                      </svg>
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- Mobile List (Compact Cards) -->
          <div class="legendary-list-mobile divide-y divide-gray-200 dark:divide-gray-600">
            {#each components as component (component.id)}
              <div 
                class="legendary-list-row p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                on:click={() => handleDetailsClick(component)}
                on:keydown={(e) => e.key === 'Enter' && handleDetailsClick(component)}
                role="button"
                tabindex="0"
                aria-label="View details for {component.name}"
              >
                <div class="flex items-center gap-3">
                  <!-- ✅ Icon -->
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br {component.flip_card_color || 'from-blue-500 to-blue-600'} flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-lg">✅</span>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <h3 class="product-name font-semibold text-gray-900 dark:text-white transition-colors truncate">
                        {component.name}
                      </h3>
                      <span class="font-bold text-gray-900 dark:text-white ml-2">
                        {formatPrice(component.price || component.price_individual)}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {getShortDescription(component)}
                    </p>
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        {getTechDisplay(component)}
                      </span>
                      <div class="flex items-center gap-2">
                        {#if component.demo_url}
                          <button 
                            on:click={(e) => { e.stopPropagation(); handleDemoClick(component); }}
                            class="text-xs px-2 py-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            aria-label="Try demo for {component.name}"
                          >
                            Demo
                          </button>
                        {/if}
                        <button 
                          on:click={(e) => { e.stopPropagation(); handleBuyNow(component); }}
                          class="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                          aria-label="Buy {component.name}"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
          
          <!-- List Footer -->
          {#if components.length > 5}
            <div class="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
              <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
                {components.length} components • Use arrow keys for navigation • Tab to interact
              </p>
            </div>
          {/if}
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
  
  /* Legendary List Navigation */
  .legendary-list-row {
    outline: none;
    transition: all 0.15s ease;
  }
  
  .legendary-list-row:focus {
    background-color: #dbeafe; /* blue-100 */
    box-shadow: inset 3px 0 0 #2563eb; /* blue-600 left border */
  }
  
  :global(.dark) .legendary-list-row:focus {
    background-color: #1e3a8a; /* blue-900 */
    box-shadow: inset 3px 0 0 #60a5fa; /* blue-400 left border */
  }
  
  /* Smooth hover states */
  .legendary-list-row:hover .product-name {
    color: #2563eb; /* blue-600 */
  }
  
  :global(.dark) .legendary-list-row:hover .product-name {
    color: #60a5fa; /* blue-400 */
  }
  
  /* Mobile responsiveness for list */
  @media (max-width: 768px) {
    .legendary-list-desktop {
      display: none;
    }
    
    .legendary-list-mobile {
      display: block;
    }
  }
  
  @media (min-width: 769px) {
    .legendary-list-desktop {
      display: block;
    }
    
    .legendary-list-mobile {
      display: none;
    }
  }
  
  /* Icon gradients matching FlipCard themes */
  .icon-red { background: linear-gradient(135deg, #ef4444, #dc2626); }
  .icon-orange { background: linear-gradient(135deg, #f97316, #ea580c); }
  .icon-yellow { background: linear-gradient(135deg, #eab308, #ca8a04); }
  .icon-green { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .icon-blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
  .icon-indigo { background: linear-gradient(135deg, #6366f1, #4f46e5); }
  .icon-purple { background: linear-gradient(135deg, #a855f7, #9333ea); }
  .icon-pink { background: linear-gradient(135deg, #ec4899, #db2777); }
</style>
