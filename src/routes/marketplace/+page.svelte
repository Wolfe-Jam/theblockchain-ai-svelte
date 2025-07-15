<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Component } from '$lib/marketplace/types';
  import NOBSPay from '$lib/components/NOBSPay';
  import type { PaymentResult } from '$lib/components/NOBSPay/types';
  import FlipCard from '$lib/components/marketplace/FlipCard.svelte';
  
  let components: Component[] = [];
  let loading = true;
  
  // View modes
  let viewMode: 'flip' | 'list' = 'flip';
  let layoutMode: 'overlapping' | 'grid' = 'overlapping';
  
  // Mathematical SIZE control (1-9)
  let flipCardSize: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5; // Default: SIZE-5 (333px)
  
  // Mathematical SIZE system - CRITICAL!
  const SIZES = {
    1: 88,   // 333 ÷ 4 = Micro Badge
    2: 111,  // 333 ÷ 3 = Tiny Perfect  
    3: 166,  // 333 ÷ 2 = Small Grid
    4: 222,  // 333 × 2/3 = Compact
    5: 333,  // 333 × 1 = Master Baseline ⭐
    6: 444,  // 333 × 4/3 = Large Display
    7: 555,  // 333 × 5/3 = Feature Hero
    8: 777,  // 333 × 7/3 = Showcase
    9: 999   // 333 × 3 = Mega Hero
  };
  
  // Calculate optimal grid columns based on card size
  function getOptimalColumns(size: number): number {
    switch(size) {
      case 1: // 88px
      case 2: // 111px
        return 8;
      case 3: // 166px
        return 6;
      case 4: // 222px
        return 5;
      case 5: // 333px
        return 4;
      case 6: // 444px
        return 3;
      case 7: // 555px
      case 8: // 777px
        return 2;
      case 9: // 999px
        return 1;
      default:
        return 3;
    }
  }
  
  // Dynamic grid columns
  $: gridColumns = getOptimalColumns(flipCardSize);
  
  // Filtered components
  $: filteredComponents = components;
  
  // Payment state
  let showPayment = false;
  let selectedComponent: Component | null = null;
  let selectedTier: 'individual' | 'team' | 'enterprise' = 'individual';
  
  // Load components on mount
  // Responsive offset calculation
  let isMobile = false;
  
  onMount(async () => {
    await loadComponents();
    loadPreferences();
    
    // Check if mobile
    if (typeof window !== 'undefined') {
      isMobile = window.innerWidth < 768;
      window.addEventListener('resize', () => {
        isMobile = window.innerWidth < 768;
      });
    }
  });
  
  // Calculate offsets based on screen size
  $: offsetMultiplier = isMobile ? 10 : 20;
  $: verticalOffset = isMobile ? 4 : 8;
  
  // Load saved preferences
  function loadPreferences() {
    if (typeof window === 'undefined') return;
    
    const savedSize = localStorage.getItem('marketplace-flipcard-size');
    if (savedSize) {
      const parsedSize = parseInt(savedSize);
      if (parsedSize >= 1 && parsedSize <= 9) {
        flipCardSize = parsedSize as any;
      }
    }
    
    const savedLayout = localStorage.getItem('marketplace-layout-mode');
    if (savedLayout === 'overlapping' || savedLayout === 'grid') {
      layoutMode = savedLayout;
    }
    
    const savedView = localStorage.getItem('marketplace-view-mode');
    if (savedView === 'flip' || savedView === 'list') {
      viewMode = savedView;
    }
  }
  
  // Save preferences
  function savePreferences() {
    if (typeof window === 'undefined') return;
    localStorage.setItem('marketplace-flipcard-size', flipCardSize.toString());
    localStorage.setItem('marketplace-layout-mode', layoutMode);
    localStorage.setItem('marketplace-view-mode', viewMode);
  }
  
  // Handle size change
  function setFlipCardSize(newSize: number) {
    if (newSize >= 1 && newSize <= 9) {
      flipCardSize = newSize as any;
      savePreferences();
    }
  }
  
  // Toggle layout mode
  function toggleLayoutMode() {
    layoutMode = layoutMode === 'overlapping' ? 'grid' : 'overlapping';
    savePreferences();
  }
  
  // Toggle view mode
  function toggleViewMode() {
    viewMode = viewMode === 'flip' ? 'list' : 'flip';
    savePreferences();
  }
  
  // Get grid class
  function getGridClass(cols: number): string {
    const gridClasses: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2', 
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8'
    };
    return gridClasses[cols] || 'grid-cols-3';
  }
  
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
  
  // Mock data matching new FlipCard standard
  function getMockComponents(): Component[] {
    const products = [];
    
    // Sample products with FlipCard-style themes
    const productData = [
      { 
        name: 'NOBS PAY', 
        tagline: 'Done for You Billing',
        theme: 'from-cyan-400 to-blue-500', 
        category: 'payment-processing',
        description: 'Universal payment processing with Stripe, PayPal, and crypto support.'
      },
      { 
        name: 'DataViz Pro', 
        tagline: 'Beautiful Data Stories',
        theme: 'from-purple-500 to-pink-500', 
        category: 'data-visualization',
        description: 'Transform your data into stunning interactive visualizations.'
      },
      { 
        name: 'Auth Shield', 
        tagline: 'Enterprise Security',
        theme: 'from-emerald-400 to-teal-600', 
        category: 'authentication',
        description: 'Complete authentication solution with OAuth, SSO, and 2FA.'
      },
      { 
        name: 'Form Builder', 
        tagline: 'Smart Form Creation',
        theme: 'from-orange-400 to-red-500', 
        category: 'forms',
        description: 'Drag-and-drop form builder with validation and analytics.'
      },
      { 
        name: 'API Gateway', 
        tagline: 'Scalable Endpoints',
        theme: 'from-blue-400 to-cyan-500', 
        category: 'api',
        description: 'Manage, monitor, and monetize your API endpoints.'
      },
      { 
        name: 'Analytics Hub', 
        tagline: 'Real-time Insights',
        theme: 'from-indigo-500 to-purple-600', 
        category: 'analytics',
        description: 'Track user behavior and performance metrics in real-time.'
      },
      { 
        name: 'Email Service', 
        tagline: 'Transactional Email',
        theme: 'from-amber-400 to-orange-500', 
        category: 'email',
        description: 'Send beautiful emails with templates and tracking.'
      },
      { 
        name: 'File Manager', 
        tagline: 'Cloud Storage API',
        theme: 'from-rose-500 to-pink-600', 
        category: 'files',
        description: 'Secure file upload, storage, and CDN delivery.'
      }
    ];
    
    productData.forEach((product, index) => {
      products.push({
        id: `component-${index + 1}`,
        name: product.name,
        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
        tagline: product.tagline,
        description: product.description,
        consumer_tagline: product.tagline,
        api_name: product.name.replace(/\s+/g, ''),
        formal_name: `${product.name} Professional`,
        fintech_name: product.name,
        price_individual: 19900, // $199
        price_team: 49900,      // $499
        price_enterprise: 149900, // $1499
        category: product.category,
        tags: [product.category.split('-')[0], 'component', 'pro', 'enterprise'],
        keywords: [product.category, 'enterprise', 'solution', 'api'],
        tech_stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
        flip_card_theme: 'professional',
        flip_card_size: 'standard',
        flip_card_color: product.theme,
        rating: 4.5 + (Math.random() * 0.5),
        download_count: Math.floor(100 + Math.random() * 900),
        featured: index < 3,
        is_api_product: true,
        is_active: true,
        is_published: true,
        created_at: new Date().toISOString(),
        demo_url: `/marketplace/demo/${product.name.toLowerCase().replace(/\s+/g, '-')}`,
        developer_features: [
          'Full TypeScript Support',
          'Comprehensive Documentation', 
          'Premium Support',
          'Regular Updates',
          'MIT License'
        ]
      });
    });
    
    return products;
  }
  
  // Payment handlers
  function handleBuyNow(event: CustomEvent) {
    const { component, tier } = event.detail;
    selectedComponent = component;
    selectedTier = tier;
    showPayment = true;
  }
  
  function handlePaymentSuccess(result: PaymentResult) {
    console.log('Payment successful!', result);
    showPayment = false;
    goto('/purchase-success');
  }
  
  function handlePaymentCancel() {
    showPayment = false;
    selectedComponent = null;
  }
  
  function handleComponentClick(component: Component) {
    // Don't navigate on click - let FlipCard handle the flip
    // Navigation happens via demo/details buttons on the card
  }
  
  // Get price based on tier
  function getTierPrice(component: Component, tier: string): number {
    switch(tier) {
      case 'team':
        return component.price_team || 49900;
      case 'enterprise':
        return component.price_enterprise || 149900;
      default:
        return component.price_individual || 19900;
    }
  }
</script>

<svelte:head>
  <title>Component Marketplace | theBlockchain.ai</title>
  <meta name="description" content="Professional AI-powered components with mathematical precision scaling. Enterprise-ready solutions for modern applications." />
</svelte:head>

<div class="marketplace-page">
  <!-- Header with Controls -->
  <div class="marketplace-header">
    <div class="header-content">
      <h1 class="page-title">
        Component Marketplace
        <span class="beta-badge">Beta</span>
      </h1>
      <p class="page-subtitle">
        Professional FlipCard components with mathematical SIZE system (88px → 999px)
      </p>
    </div>
    
    <!-- Controls Bar -->
    <div class="controls-bar">
      <!-- View Mode Toggle -->
      <div class="view-toggle">
        <button 
          class:active={viewMode === 'flip'}
          on:click={() => toggleViewMode()}
        >
          🎴 FlipCards
        </button>
        <button 
          class:active={viewMode === 'list'}
          on:click={() => toggleViewMode()}
        >
          📋 List View
        </button>
      </div>
      
      {#if viewMode === 'flip'}
        <!-- Layout Mode Toggle -->
        <div class="layout-toggle">
          <button 
            class:active={layoutMode === 'overlapping'}
            on:click={() => toggleLayoutMode()}
          >
            🎭 Fan/Deck
          </button>
          <button 
            class:active={layoutMode === 'grid'}
            on:click={() => toggleLayoutMode()}
          >
            ⚏ Grid
          </button>
        </div>
        
        <!-- Mathematical SIZE Control -->
        <div class="size-control">
          <label>SIZE:</label>
          <div class="size-buttons">
            {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as size}
              <button 
                class="size-btn"
                class:active={flipCardSize === size}
                on:click={() => setFlipCardSize(size)}
                title="SIZE-{size} ({SIZES[size]}px)"
              >
                {size}
              </button>
            {/each}
          </div>
          <span class="size-label">{SIZES[flipCardSize]}px</span>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Components Display -->
  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading FlipCard components...</p>
    </div>
  {:else if viewMode === 'flip'}
    {#if layoutMode === 'overlapping'}
      <!-- Fan/Deck View (Clean Overlapping Stack) -->
      <div 
        class="overlapping-container" 
        style="
          min-height: {SIZES[flipCardSize] + 200}px;
          --flipcard-size: {SIZES[flipCardSize]}px;
        "
      >
        <div class="fan-deck">
          {#each filteredComponents as component, index}
            <div 
              class="overlapping-card"
              style="
                --index: {index};
                --total: {filteredComponents.length};
                --offset-x: {index * offsetMultiplier}px;
                --offset-y: {index * verticalOffset}px;
                --scale: {1 - (index * 0.02)};
                z-index: {filteredComponents.length - index};
              "
            >
              <FlipCard 
                {component}
                size={flipCardSize}
                theme="professional"
                on:buy={handleBuyNow}
              />
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <!-- Grid View (Clean Layout) -->
      <div class="grid-container {getGridClass(gridColumns)}">
        {#each filteredComponents as component}
          <div class="grid-item">
            <FlipCard 
              {component}
              size={flipCardSize}
              theme="professional"
              on:buy={handleBuyNow}
            />
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <!-- List View -->
    <div class="list-container">
      {#each filteredComponents as component}
        <div class="list-item">
          <div class="list-thumbnail">
            <FlipCard 
              {component}
              size={3}
              displayOnly={true}
              showComponents={{
                colorPalette: false,
                tags: false,
                toolbar: false,
                buyComponent: false
              }}
            />
          </div>
          <div class="list-details">
            <h3>{component.name}</h3>
            <p class="tagline">{component.consumer_tagline}</p>
            <p class="description">{component.description}</p>
            <div class="list-meta">
              <span class="category">{component.category.replace('-', ' ')}</span>
              <span class="rating">⭐ {component.rating?.toFixed(1) || '5.0'}</span>
              <span class="downloads">📥 {component.download_count || 0} downloads</span>
            </div>
          </div>
          <div class="list-actions">
            <button 
              class="demo-btn" 
              on:click={() => goto(component.demo_url || `/marketplace/demo/${component.slug}`)}
            >
              👁️ View Demo
            </button>
            <div class="price-buttons">
              <button 
                class="buy-btn individual" 
                on:click={() => handleBuyNow({ detail: { component, tier: 'individual' } })}
              >
                💰 ${(component.price_individual / 100).toFixed(0)}
              </button>
              <button 
                class="buy-btn team" 
                on:click={() => handleBuyNow({ detail: { component, tier: 'team' } })}
              >
                💼 ${(component.price_team / 100).toFixed(0)}
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  
  <!-- Payment Modal -->
  {#if showPayment && selectedComponent}
    <div class="payment-modal">
      <div class="modal-content">
        <button class="close-btn" on:click={handlePaymentCancel}>×</button>
        <h2>Purchase {selectedComponent.name}</h2>
        <p class="tier-info">
          {selectedTier === 'individual' ? 'Individual License' : 
           selectedTier === 'team' ? 'Team License (up to 10 developers)' :
           'Enterprise License (unlimited developers)'}
        </p>
        <NOBSPay
          amount={getTierPrice(selectedComponent, selectedTier)}
          productId={selectedComponent.id}
          productName={`${selectedComponent.name} - ${selectedTier}`}
          on:success={handlePaymentSuccess}
          on:cancel={handlePaymentCancel}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .marketplace-page {
    min-height: 100vh;
    background: #f9fafb;
    padding: 2rem;
  }
  
  /* Header */
  .marketplace-header {
    max-width: 1400px;
    margin: 0 auto 3rem;
  }
  
  .header-content {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    color: #111827;
  }
  
  .beta-badge {
    background: linear-gradient(135deg, #22d3ee, #3b82f6);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .page-subtitle {
    font-size: 1.25rem;
    color: #6b7280;
    margin: 0;
  }
  
  /* Controls Bar */
  .controls-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .view-toggle,
  .layout-toggle {
    display: flex;
    background: #f3f4f6;
    border-radius: 0.5rem;
    padding: 0.25rem;
  }
  
  .view-toggle button,
  .layout-toggle button {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: #6b7280;
    font-weight: 500;
    cursor: pointer;
    border-radius: 0.375rem;
    transition: all 0.2s;
  }
  
  .view-toggle button.active,
  .layout-toggle button.active {
    background: white;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* Size Control */
  .size-control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .size-control label {
    font-weight: 600;
    color: #374151;
  }
  
  .size-buttons {
    display: flex;
    gap: 0.25rem;
  }
  
  .size-btn {
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid #e5e7eb;
    background: white;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.875rem;
  }
  
  .size-btn:hover {
    border-color: #9ca3af;
    background: #f9fafb;
  }
  
  .size-btn.active {
    background: linear-gradient(135deg, #22d3ee, #3b82f6);
    color: white;
    border-color: transparent;
  }
  
  .size-label {
    font-weight: 500;
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  /* Fan/Deck Container - Controlled Overlapping */
  .overlapping-container {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* Prevent any overflow */
  }
  
  .fan-deck {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Constrain the deck size based on flipcard size */
    max-width: calc(var(--flipcard-size, 333px) + 400px);
    max-height: calc(var(--flipcard-size, 333px) + 200px);
  }
  
  .overlapping-card {
    position: absolute;
    transform: 
      translateX(var(--offset-x)) 
      translateY(var(--offset-y))
      scale(var(--scale, 1));
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center center;
  }
  
  .overlapping-card:hover {
    transform: 
      translateX(var(--offset-x)) 
      translateY(calc(var(--offset-y) - 20px))
      scale(1.03);
    z-index: 100 !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    filter: brightness(1.05);
  }
  
  /* Grid Container */
  .grid-container {
    display: grid;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    place-items: center;
  }
  
  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  /* List View */
  .list-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .list-item {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    align-items: center;
  }
  
  .list-thumbnail {
    flex-shrink: 0;
  }
  
  .list-details {
    flex: 1;
  }
  
  .list-details h3 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
    color: #111827;
  }
  
  .tagline {
    font-size: 1.125rem;
    font-weight: 500;
    color: #3b82f6;
    margin: 0 0 0.75rem;
  }
  
  .description {
    color: #6b7280;
    margin: 0 0 1rem;
    line-height: 1.6;
  }
  
  .list-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
  }
  
  .category {
    background: #e0e7ff;
    color: #4338ca;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-weight: 500;
    text-transform: capitalize;
  }
  
  .rating,
  .downloads {
    color: #6b7280;
    display: flex;
    align-items: center;
  }
  
  .list-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
    min-width: 180px;
  }
  
  .demo-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
    border: 2px solid #e5e7eb;
    color: #374151;
  }
  
  .demo-btn:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  .price-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .buy-btn {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    font-size: 0.875rem;
  }
  
  .buy-btn.individual {
    background: #fef3c7;
    color: #92400e;
  }
  
  .buy-btn.team {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .buy-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 1rem;
  }
  
  .spinner {
    width: 3rem;
    height: 3rem;
    border: 3px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Payment Modal */
  .payment-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
  }
  
  .modal-content {
    background: white;
    padding: 2.5rem;
    border-radius: 1rem;
    max-width: 500px;
    width: 100%;
    position: relative;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    background: #f3f4f6;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  
  .close-btn:hover {
    background: #e5e7eb;
  }
  
  .modal-content h2 {
    margin: 0 0 0.5rem;
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
  }
  
  .tier-info {
    color: #6b7280;
    margin: 0 0 1.5rem;
  }
  
  /* Dark mode support */
  :global(.dark) .marketplace-page {
    background: #111827;
  }
  
  :global(.dark) .controls-bar,
  :global(.dark) .list-item,
  :global(.dark) .modal-content {
    background: #1f2937;
  }
  
  :global(.dark) .page-title,
  :global(.dark) .list-details h3,
  :global(.dark) .modal-content h2 {
    color: #f3f4f6;
  }
  
  :global(.dark) .page-subtitle,
  :global(.dark) .description,
  :global(.dark) .tier-info {
    color: #9ca3af;
  }
  
  :global(.dark) .view-toggle,
  :global(.dark) .layout-toggle {
    background: #374151;
  }
  
  :global(.dark) .view-toggle button.active,
  :global(.dark) .layout-toggle button.active,
  :global(.dark) .size-btn {
    background: #1f2937;
    color: #f3f4f6;
  }
  
  :global(.dark) .size-btn.active {
    background: linear-gradient(135deg, #22d3ee, #3b82f6);
  }
  
  :global(.dark) .demo-btn {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .grid-container {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    }
  }
  
  @media (max-width: 768px) {
    .controls-bar {
      flex-direction: column;
      gap: 1rem;
    }
    
    .size-buttons {
      flex-wrap: wrap;
    }
    
    .list-item {
      flex-direction: column;
      text-align: center;
    }
    
    .list-thumbnail {
      margin-bottom: 1rem;
    }
    
    .list-actions {
      width: 100%;
      flex-direction: row;
      gap: 0.5rem;
    }
    
    .demo-btn {
      flex: 1;
    }
    
    .overlapping-container {
      overflow-x: auto;
      padding: 2rem;
    }
    
    .fan-deck {
      min-width: calc(var(--flipcard-size, 333px) + 200px);
    }
  }
</style>