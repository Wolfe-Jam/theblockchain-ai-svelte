<!-- Enhanced FlipCard.svelte with Mathematical Sizing System -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Component } from '$lib/marketplace/types';
  
  // Props from parent 
  export let component: Component;
  export let theme: 'professional' | 'wallet' | 'neon' | 'gradient' | 'solid' = 'professional';
  export let displayOnly: boolean = false; // Pure display mode (no BUY buttons)
  export let iconType: 'checkmark' | 'custom' | 'component' = 'checkmark';
  export let customIconSvg: string = '';
  export let size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5; // Mathematical SIZE system
  export let showComponents = {
    colorPalette: true,
    tags: true,
    toolbar: true,
    buyComponent: true
  };
  
  const dispatch = createEventDispatcher();
  
  let isFlipped = false;
  let cardElement: HTMLDivElement;
  
  // 📐 MATHEMATICAL SIZE SYSTEM ⭐ CRITICAL
  const MASTER_SIZE = 333; // SIZE-5 baseline
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
  
  const GRAPHICS_RATIO = 2/3; // 66.6% of FlipCard size
  
  // Smart flip sizing logic
  $: currentSize = isFlipped ? Math.max(size, 5) : size; // Back side minimum SIZE-5
  $: cardWidth = SIZES[currentSize];
  $: cardHeight = SIZES[currentSize];
  $: graphicsSize = Math.round(cardWidth * GRAPHICS_RATIO);
  
  // Scale text based on card size
  $: titleFontSize = Math.round(36 * cardWidth / MASTER_SIZE);
  $: taglineFontSize = Math.round(18 * cardWidth / MASTER_SIZE);
  $: padding = Math.round(20 * cardWidth / MASTER_SIZE);
  $: borderRadius = Math.round(16 * cardWidth / MASTER_SIZE);
  
  // Theme configurations
  const themes = {
    professional: {
      front: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      back: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      accent: 'text-white'
    },
    wallet: {
      front: 'bg-gradient-to-br from-orange-400 to-red-500',
      back: 'bg-gradient-to-br from-orange-500 to-red-600',
      accent: 'text-white'
    },
    neon: {
      front: 'bg-gradient-to-br from-purple-500 to-pink-500',
      back: 'bg-gradient-to-br from-purple-600 to-pink-600',
      accent: 'text-white'
    },
    gradient: {
      front: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      back: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      accent: 'text-white'
    },
    solid: {
      front: 'bg-gray-800',
      back: 'bg-gray-900',
      accent: 'text-white'
    }
  };
  
  // Get theme colors based on component category or prop
  function getThemeForComponent() {
    if (component.flip_card_color) {
      return {
        front: `bg-gradient-to-br ${component.flip_card_color}`,
        back: `bg-gradient-to-br ${component.flip_card_color}`,
        accent: 'text-white'
      };
    }
    
    switch(component.category) {
      case 'payment-processing':
        return themes.wallet;
      case 'data-visualization':
        return themes.neon;
      case 'authentication':
        return themes.gradient;
      default:
        return themes[theme] || themes.professional;
    }
  }
  
  $: currentTheme = getThemeForComponent();
  
  // Icon SVGs
  const iconSvgs = {
    checkmark: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 12l2 2 4-4"></path>
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    `,
    component: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <rect x="7" y="7" width="3" height="3"></rect>
        <rect x="14" y="7" width="3" height="3"></rect>
        <rect x="7" y="14" width="3" height="3"></rect>
        <rect x="14" y="14" width="3" height="3"></rect>
      </svg>
    `,
    payment: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    `
  };
  
  // Get appropriate icon
  function getComponentIcon(): string {
    if (customIconSvg) return customIconSvg;
    
    if (component.category === 'payment-processing') {
      return iconSvgs.payment;
    }
    
    switch (iconType) {
      case 'custom':
        return customIconSvg || iconSvgs.checkmark;
      case 'component':
        return iconSvgs.component;
      case 'checkmark':
      default:
        return iconSvgs.checkmark;
    }
  }
  
  // Extract colors from gradient
  function extractColors(gradient: string): string[] {
    const colors = [];
    const matches = gradient.match(/(#[0-9a-f]{6}|[a-z]+-\d+)/gi) || [];
    
    // Convert Tailwind colors to hex approximations
    const colorMap: Record<string, string> = {
      'cyan-400': '#22d3ee',
      'blue-500': '#3b82f6',
      'orange-400': '#fb923c',
      'red-500': '#ef4444',
      'purple-500': '#a855f7',
      'pink-500': '#ec4899'
    };
    
    for (const match of matches.slice(0, 5)) {
      if (match.startsWith('#')) {
        colors.push(match);
      } else if (colorMap[match]) {
        colors.push(colorMap[match]);
      }
    }
    
    // Ensure we have 5 colors
    while (colors.length < 5) {
      colors.push('#' + Math.floor(Math.random()*16777215).toString(16));
    }
    
    return colors.slice(0, 5);
  }
  
  $: extractedColors = extractColors(currentTheme.front);
  
  // Component visibility tags
  $: visibleTags = component.tags?.slice(0, 3).map(tag => `#${tag}`) || ['#component', '#svelte', '#pro'];
  
  function handleFlip() {
    isFlipped = !isFlipped;
  }
  
  function handleBuyNow(e: Event, tier: 'individual' | 'team' | 'enterprise') {
    e.stopPropagation();
    dispatch('buy', { component, tier });
  }
  
  function handleDemo(e: Event) {
    e.stopPropagation();
    const demoSlug = component.slug || component.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    goto(`/marketplace/demo/${demoSlug}`);
  }
  
  function handleDetails(e: Event) {
    e.stopPropagation();
    const productSlug = component.slug || component.id;
    goto(`/marketplace/products/${productSlug}`);
  }
  
  function formatPrice(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }
</script>

<!-- 🎨 COMPLETE FLIPCARD SYSTEM -->
<div class="flipcard-container" style="width: {cardWidth}px;">
  <!-- Settings Button -->
  {#if !displayOnly}
    <button class="settings-button" on:click|stopPropagation>
      i
    </button>
  {/if}
  
  <!-- Main FlipCard -->
  <div 
    class="flipcard-wrapper"
    class:flipped={isFlipped}
    style="width: {cardWidth}px; height: {cardHeight}px;"
    on:click={handleFlip}
    bind:this={cardElement}
  >
    <!-- Front Side -->
    <div class="flipcard-side flipcard-front {currentTheme.front}" style="border-radius: {borderRadius}px;">
      <div class="flipcard-content" style="padding: {padding}px;">
        <!-- Graphics Box (66.6% ratio) -->
        <div class="graphics-box" style="width: {graphicsSize}px; height: {graphicsSize}px;">
          {@html getComponentIcon()}
        </div>
        
        <!-- Title -->
        <h3 class="card-title {currentTheme.accent}" style="font-size: {titleFontSize}px;">
          {component.name}
        </h3>
        
        <!-- Tagline -->
        <p class="card-tagline {currentTheme.accent}" style="font-size: {taglineFontSize}px;">
          {component.consumer_tagline || 'Professional Component'}
        </p>
      </div>
    </div>
    
    <!-- Back Side (Minimum SIZE-5 for readability) -->
    <div class="flipcard-side flipcard-back {currentTheme.back}" style="border-radius: {borderRadius}px;">
      <div class="flipcard-back-content" style="padding: {padding}px;">
        <h3 class="back-title {currentTheme.accent}">
          {component.name}
        </h3>
        
        <div class="back-sections">
          <!-- Overview Section -->
          <div class="back-section">
            <h4 class="section-title">📋 Overview</h4>
            <p class="section-content">
              {component.description || 'Professional component for modern web applications.'}
            </p>
          </div>
          
          <!-- Technical Details -->
          <div class="back-section">
            <h4 class="section-title">📋 Technical Details</h4>
            <ul class="tech-list">
              {#each component.tech_stack || [] as tech}
                <li>{tech}</li>
              {/each}
            </ul>
          </div>
          
          <!-- Features -->
          <div class="back-section">
            <h4 class="section-title">📋 Key Features</h4>
            <ul class="features-list">
              {#each component.developer_features?.slice(0, 4) || [] as feature}
                <li>{feature}</li>
              {/each}
            </ul>
          </div>
          
          <!-- Action Buttons -->
          {#if !displayOnly}
            <div class="back-actions">
              <button class="action-btn demo" on:click={handleDemo}>
                👁️ View Demo
              </button>
              <button class="action-btn details" on:click={handleDetails}>
                📄 Details
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Color Palette Component -->
  {#if showComponents.colorPalette && !displayOnly}
    <div class="color-palette">
      {#each extractedColors as color}
        <div class="color-swatch" style="background-color: {color}"></div>
      {/each}
    </div>
  {/if}
  
  <!-- Tags Bar -->
  {#if showComponents.tags && !displayOnly}
    <div class="tags-bar">
      {#each visibleTags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  {/if}
  
  <!-- Toolbar -->
  {#if showComponents.toolbar && !displayOnly}
    <div class="toolbar">
      <button title="Download" on:click|stopPropagation>📥</button>
      <button title="Share" on:click|stopPropagation>📤</button>
      <button title="Email" on:click|stopPropagation>📧</button>
      <button title="Mobile" on:click|stopPropagation>📱</button>
      <button title="Link" on:click|stopPropagation>🔗</button>
      <button title="Settings" on:click|stopPropagation>⚙️</button>
    </div>
  {/if}
  
  <!-- Enhanced Buy Component -->
  {#if showComponents.buyComponent && !displayOnly}
    <div class="buy-component">
      <button class="favorite-btn" on:click|stopPropagation>❤️</button>
      <div class="pricing-tiers">
        <button 
          class="price-btn individual" 
          on:click={(e) => handleBuyNow(e, 'individual')}
        >
          💰 {formatPrice(component.price_individual || 19900)}
        </button>
        <button 
          class="price-btn team" 
          on:click={(e) => handleBuyNow(e, 'team')}
        >
          💼 {formatPrice(component.price_team || 49900)}
        </button>
        <button 
          class="price-btn enterprise" 
          on:click={(e) => handleBuyNow(e, 'enterprise')}
        >
          🏢 {formatPrice(component.price_enterprise || 149900)}
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .flipcard-container {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .settings-button {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    font-style: italic;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s;
  }
  
  .settings-button:hover {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .flipcard-wrapper {
    position: relative;
    perspective: 1000px;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .flipcard-side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: transform 0.6s;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
  }
  
  .flipcard-front {
    z-index: 2;
  }
  
  .flipcard-back {
    transform: rotateY(180deg);
  }
  
  .flipped .flipcard-front {
    transform: rotateY(-180deg);
  }
  
  .flipped .flipcard-back {
    transform: rotateY(0deg);
  }
  
  .flipcard-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }
  
  .graphics-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .graphics-box :global(svg) {
    width: 66.6%;
    height: 66.6%;
    color: white;
  }
  
  .card-title {
    font-weight: 600;
    margin: 0 0 0.5rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .card-tagline {
    font-weight: 500;
    margin: 0;
    opacity: 0.9;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* Back Side Styles */
  .flipcard-back-content {
    height: 100%;
    overflow-y: auto;
    color: white;
  }
  
  .back-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
    text-align: center;
  }
  
  .back-sections {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .back-section {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    padding: 0.75rem;
  }
  
  .section-title {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }
  
  .section-content {
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;
  }
  
  .tech-list,
  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.875rem;
  }
  
  .tech-list li,
  .features-list li {
    padding: 0.25rem 0;
  }
  
  .tech-list li::before {
    content: '🔧 ';
  }
  
  .features-list li::before {
    content: '✓ ';
  }
  
  .back-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .action-btn {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .action-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  /* Component Styles */
  .color-palette {
    display: flex;
    gap: 0.25rem;
    padding: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .color-swatch {
    flex: 1;
    height: 1.5rem;
    border-radius: 0.25rem;
  }
  
  .tags-bar {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .tag {
    background: #e0e7ff;
    color: #4338ca;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .toolbar {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    justify-content: center;
  }
  
  .toolbar button {
    width: 2rem;
    height: 2rem;
    border: none;
    background: #f3f4f6;
    border-radius: 0.375rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  
  .toolbar button:hover {
    background: #e5e7eb;
  }
  
  .buy-component {
    display: flex;
    gap: 0.75rem;
    padding: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    align-items: center;
  }
  
  .favorite-btn {
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid #e5e7eb;
    background: white;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all 0.2s;
  }
  
  .favorite-btn:hover {
    border-color: #ef4444;
    background: #fee2e2;
  }
  
  .pricing-tiers {
    display: flex;
    gap: 0.5rem;
    flex: 1;
  }
  
  .price-btn {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  
  .price-btn.individual {
    background: #fef3c7;
    color: #92400e;
  }
  
  .price-btn.team {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .price-btn.enterprise {
    background: #e0e7ff;
    color: #4338ca;
  }
  
  .price-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Dark mode support */
  :global(.dark) .color-palette,
  :global(.dark) .tags-bar,
  :global(.dark) .toolbar,
  :global(.dark) .buy-component {
    background: #1f2937;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  :global(.dark) .toolbar button {
    background: #374151;
  }
  
  :global(.dark) .toolbar button:hover {
    background: #4b5563;
  }
  
  :global(.dark) .favorite-btn {
    background: #1f2937;
    border-color: #374151;
  }
  
  :global(.dark) .favorite-btn:hover {
    border-color: #ef4444;
    background: #7f1d1d;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .pricing-tiers {
      flex-direction: column;
    }
    
    .price-btn {
      width: 100%;
    }
  }
</style>