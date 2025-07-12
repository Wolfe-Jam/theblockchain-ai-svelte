<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase, isSupabaseConfigured } from '$lib/database/supabase';
  import type { Component } from '$lib/marketplace/types';
  import NOBSPay from '$lib/components/NOBSPay';
  import type { PaymentResult } from '$lib/components/NOBSPay/types';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import FlipCard from '$lib/components/marketplace/FlipCard.svelte';
  import { searchStore, searchResults } from '$lib/search/store';
  import { createSearchManager } from '$lib/search/manager';
  import type { SearchQuery } from '$lib/search/types';
  import { goto } from '$app/navigation';
  
  let components: Component[] = [];
  let loading = true;
  let viewMode: 'flip' | 'grid' = 'flip'; // Toggle between flip cards and grid view
  
  // Payment state
  let showPayment = false;
  let selectedComponent: Component | null = null;
  let purchaseComplete = false;
  
  // Search state
  let searchManager: ReturnType<typeof createSearchManager>;
  let displayedComponents: Component[] = [];
  
  // Load components on mount
  onMount(async () => {
    await loadComponents();
  });
  
  async function loadComponents() {
    try {
      loading = true;
      
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured) {
        console.log('Using mock data - Supabase not configured');
        components = getMockComponents();
      } else {
        // Try to load from Supabase
        const { data, error: supabaseError } = await supabase
          .from('components')
          .select('*')
          .eq('is_published', true)
          .eq('is_active', true)
          .order('featured', { ascending: false })
          .order('download_count', { ascending: false });
        
        if (supabaseError) {
          console.log('Falling back to mock data:', supabaseError.message);
          components = getMockComponents();
        } else {
          components = data || getMockComponents();
        }
      }
    } catch (err) {
      console.log('Using mock data due to error');
      components = getMockComponents();
    } finally {
      loading = false;
      
      // Initialize search manager with components
      searchManager = createSearchManager(components);
      displayedComponents = components;
    }
  }
  
  // Mock data for development before Supabase is configured
  function getMockComponents(): Component[] {
    return [
      {
        id: '1',
        name: 'NOBS Pay',
        slug: 'nobs-pay',
        tagline: 'Universal payment component for modern apps',
        description: 'The only payment component that gives your users maximum choice while giving you minimum complexity.',
        consumer_tagline: 'No BS pay less',
        api_name: 'Next Open Billing Software',
        formal_name: 'Neural Omni Balance System',
        fintech_name: 'Next Open Billing Stack',
        price_individual: 19900,
        price_team: 49900,
        price_enterprise: 149900,
        category: 'payment-processing',
        tags: ['payment', 'stripe', 'paypal', 'crypto'],
        keywords: ['payment gateway', 'checkout', 'e-commerce'],
        tech_stack: ['svelte', 'typescript', 'stripe-api'],
        flip_card_theme: 'wallet',
        flip_card_size: 'standard',
        rating: 5.0,
        download_count: 0,
        featured: true,
        is_api_product: true,
        is_active: true,
        is_published: true,
        created_at: new Date().toISOString(),
        demo_url: '/marketplace/demo/nobs-pay',
        developer_features: ['Universal payment gateway', 'Multi-processor support', 'TypeScript definitions', 'Theme customization', 'Webhook handling']
      },
      {
        id: '2',
        name: 'DataViz Pro',
        slug: 'dataviz-pro',
        tagline: 'Beautiful charts and graphs for your data',
        description: 'Professional data visualization components with D3.js integration and real-time updates.',
        consumer_tagline: 'Visualize everything',
        api_name: 'DataViz Professional',
        formal_name: 'Data Visualization Suite',
        fintech_name: 'Analytics Display Engine',
        price_individual: 14900,
        price_team: 34900,
        price_enterprise: 99900,
        category: 'data-visualization',
        tags: ['charts', 'd3js', 'analytics', 'dashboard'],
        keywords: ['data viz', 'graphs', 'charts', 'analytics'],
        tech_stack: ['svelte', 'd3js', 'typescript'],
        flip_card_theme: 'neon',
        flip_card_size: 'standard',
        rating: 4.8,
        download_count: 42,
        featured: false,
        is_api_product: false,
        is_active: true,
        is_published: true,
        created_at: new Date().toISOString(),
        demo_url: '/marketplace/demo/dataviz-pro',
        developer_features: ['20+ chart types', 'Real-time updates', 'Responsive design', 'Export to PNG/SVG', 'Custom themes']
      },
      {
        id: '3',
        name: 'Auth Shield',
        slug: 'auth-shield',
        tagline: 'Complete authentication solution',
        description: 'Secure, customizable authentication components with social login, MFA, and passwordless options.',
        consumer_tagline: 'Login made simple',
        api_name: 'Authentication Shield',
        formal_name: 'Security Authentication Framework',
        fintech_name: 'Identity Verification System',
        price_individual: 24900,
        price_team: 59900,
        price_enterprise: 179900,
        category: 'authentication',
        tags: ['auth', 'security', 'oauth', 'mfa'],
        keywords: ['authentication', 'login', 'security', 'oauth'],
        tech_stack: ['svelte', 'supabase', 'oauth2'],
        flip_card_theme: 'gradient',
        flip_card_size: 'standard',
        rating: 4.9,
        download_count: 128,
        featured: true,
        is_api_product: true,
        is_active: true,
        is_published: true,
        created_at: new Date().toISOString(),
        demo_url: '/marketplace/demo/auth-shield',
        developer_features: ['Social login', 'Multi-factor auth', 'Passwordless', 'Session management', 'Role-based access']
      }
    ];
  }
  
  function formatPrice(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }
  
  // Payment handling functions
  function handleBuyNow(component: Component) {
    selectedComponent = component;
    showPayment = true;
  }
  
  function handlePaymentSuccess(result: PaymentResult) {
    console.log('Payment successful!', result);
    purchaseComplete = true;
    showPayment = false;
    
    // Here you would typically:
    // 1. Save the order to database
    // 2. Grant access to the component
    // 3. Send confirmation email
    // 4. Redirect to download page
    
    // For now, show success message
    setTimeout(() => {
      alert(`Success! You've purchased ${selectedComponent?.name}. Transaction ID: ${result.transactionId}`);
      purchaseComplete = false;
      selectedComponent = null;
    }, 100);
  }
  
  // Demo handling function
  function handleDemoClick(component: Component) {
    // Map component names to demo slugs
    const demoSlugMap: { [key: string]: string } = {
      'bAI-Pay Universal Payment Component': 'bai-pay',
      'NOBS Pay - No BS Payment Processing': 'nobs-pay', 
      'DataViz Pro - Advanced Chart Library': 'dataviz-pro',
      'Auth Shield - Complete Authentication': 'auth-shield'
    };
    
    const demoSlug = demoSlugMap[component.name] || component.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    goto(`/demo/${demoSlug}`);
  }
  
  // Details handling function  
  function handleDetailsClick(component: Component) {
    // Navigate to product details page (Shopify-style)
    const productSlug = component.slug || component.id;
    goto(`/marketplace/products/${productSlug}`);
  }
  
  function handlePaymentError(error: Error) {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error.message}`);
  }
  
  function handlePaymentCancel() {
    showPayment = false;
    selectedComponent = null;
  }
  
  // Handle search
  async function handleSearch(event: CustomEvent<{ query: string; mode: string }>) {
    const { query, mode } = event.detail;
    
    if (!searchManager) return;
    
    searchStore.setSearching(true);
    
    try {
      const searchQuery: SearchQuery = {
        query,
        mode: mode as any,
        limit: 20
      };
      
      const results = await searchManager.search(searchQuery);
      
      // Update search results in store
      searchStore.setResults(results.combined, results.claude);
      
      // Update displayed components based on search results
      if (results.combined.length > 0) {
        displayedComponents = results.combined.map(result => 
          components.find(c => c.id === result.id)!
        ).filter(Boolean);
      } else {
        displayedComponents = [];
      }
    } catch (error) {
      console.error('Search failed:', error);
      searchStore.setError('Search failed. Please try again.');
    } finally {
      searchStore.setSearching(false);
    }
  }
  
  // Reset search and show all components
  function resetSearch() {
    searchStore.reset();
    displayedComponents = components;
  }
  
  // Handle FlipCard events
  function handleCardBuy(event: CustomEvent<Component>) {
    handleBuyNow(event.detail);
  }
  
  function handleCardDemo(event: CustomEvent<Component>) {
    handleDemoClick(event.detail);
  }
  
  function handleCardDetails(event: CustomEvent<Component>) {
    handleDetailsClick(event.detail);
  }
  
  // Subscribe to search results
  $: if ($searchResults.length === 0 && !$searchStore.query) {
    displayedComponents = components;
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
