<!-- Enhanced FlipCard.svelte with Correct ImageBox Layout -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Component } from '$lib/marketplace/types';
  
  // Props from parent 
  export let component: Component;
  export let theme: 'professional' | 'wallet' | 'neon' | 'gradient' | 'solid' = 'professional';
  export let displayOnly: boolean = false;
  export let iconType: 'checkmark' | 'custom' | 'component' = 'checkmark';
  export let customIconSvg: string = '';
  export let size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5; // Mathematical SIZE everywhere!
  export let showComponents = {
    colorPalette: true,
    tags: true,
    toolbar: true,
    buyComponent: true
  };
  
  const dispatch = createEventDispatcher();
  
  let isFlipped = false;
  let cardElement: HTMLDivElement;
  
  // 📐 MATHEMATICAL SIZE SYSTEM - Used EVERYWHERE!
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
  
  // CRITICAL PROPORTIONS WITH PADDING: 
  // - Card has 5% padding for framing (black border effect)
  // - Content area uses 2/3 gradient + 1/3 text proportions
  // - At SIZE-5: ~17px padding + 2/3 and 1/3 of remaining ~299px
  const IMAGE_BOX_RATIO = 2/3; // EXACT: 66.66% for gradient box
  
  // Smart text truncation for small sizes
  $: displayName = size === 1 ? 
    (component.name.includes(' ') ? component.name.split(' ')[0].substring(0, 4) : component.name.substring(0, 4)) :
    size === 2 ? 
    (component.name.includes(' ') ? component.name.split(' ')[0].substring(0, 6) : component.name.substring(0, 6)) :
    component.name;
  
  $: displayTagline = size === 1 ? 
    '' : // No tagline for SIZE-1 (too small)
    size === 2 ?
    'Tool' : // Simple tagline for SIZE-2
    size <= 3 ? 
    (component.consumer_tagline && component.consumer_tagline.length > 10 ? 
      component.consumer_tagline.substring(0, 10) : 
      component.consumer_tagline || 'Tool') :
    component.consumer_tagline || 'Professional Component';
  // Smart flip sizing logic
  $: currentSize = isFlipped ? Math.max(size, 5) : size; // Back side minimum SIZE-5
  $: cardWidth = SIZES[currentSize];
  $: cardHeight = SIZES[currentSize];
  $: padding = Math.max(4, Math.round(cardWidth * 0.05)); // Min 4px padding, scales to 5%
  $: availableHeight = cardHeight - (padding * 2); // Content area after padding
  $: imageBoxSize = Math.round(availableHeight * IMAGE_BOX_RATIO); // 2/3 of available height
  
  // Scale elements based on card size - optimized for readability at all sizes
  $: titleFontSize = Math.max(8, Math.round(32 * cardWidth / MASTER_SIZE)); // Min 8px, scales to 32px at SIZE-5
  $: taglineFontSize = Math.max(6, Math.round(18 * cardWidth / MASTER_SIZE)); // Min 6px, scales to 18px at SIZE-5
  $: padding = Math.round(cardWidth * 0.05); // 5% padding
  $: borderRadius = Math.round(16 * cardWidth / MASTER_SIZE);
  $: imageBoxRadius = Math.round(12 * cardWidth / MASTER_SIZE);
  
  // Theme configurations
  const themes = {
    professional: {
      gradient: 'from-cyan-400 to-blue-500',
      cardBg: '#000000',
      textColor: '#ffffff'
    },
    wallet: {
      gradient: 'from-orange-400 to-red-500',
      cardBg: '#000000',
      textColor: '#ffffff'
    },
    neon: {
      gradient: 'from-purple-500 to-pink-500',
      cardBg: '#000000',
      textColor: '#ffffff'
    },
    gradient: {
      gradient: 'from-blue-400 to-cyan-500',
      cardBg: '#000000',
      textColor: '#ffffff'
    },
    solid: {
      gradient: 'from-gray-600 to-gray-800',
      cardBg: '#000000',
      textColor: '#ffffff'
    }
  };
  
  // Get theme configuration
  function getThemeForComponent() {
    if (component.flip_card_color) {
      // Handle custom gradient colors (from designer)
      const customGradient = component.flip_card_color;
      
      // Extract hex colors from gradient string
      const hexMatches = customGradient.match(/#[0-9a-f]{6}/gi) || [];
      if (hexMatches.length >= 2) {
        return {
          gradient: customGradient,
          gradientColors: hexMatches,
          cardBg: '#000000',
          textColor: '#ffffff'
        };
      }
      
      // Handle Tailwind gradient format like "from-cyan-400 to-blue-500"
      if (customGradient.includes('from-') && customGradient.includes('to-')) {
        // Convert Tailwind classes to CSS gradient
        const colorMap: Record<string, string> = {
          'cyan-400': '#22d3ee',
          'blue-500': '#3b82f6',
          'orange-400': '#fb923c',
          'red-500': '#ef4444',
          'purple-500': '#a855f7',
          'pink-500': '#ec4899'
        };
        
        const fromMatch = customGradient.match(/from-([a-z]+-\d+)/);
        const toMatch = customGradient.match(/to-([a-z]+-\d+)/);
        
        if (fromMatch && toMatch) {
          const fromColor = colorMap[fromMatch[1]] || '#22d3ee';
          const toColor = colorMap[toMatch[1]] || '#3b82f6';
          
          return {
            gradient: customGradient,
            gradientColors: [fromColor, toColor],
            cardBg: '#000000',
            textColor: '#ffffff'
          };
        }
      }
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
    `,
    refresh: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
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
    
    // First check if we have gradientColors array
    if (currentTheme.gradientColors) {
      colors.push(...currentTheme.gradientColors);
    } else {
      // Extract from gradient string
      const hexMatches = gradient.match(/#[0-9a-f]{6}/gi) || [];
      const matches = gradient.match(/(#[0-9a-f]{6}|[a-z]+-\d+)/gi) || [];
      
      const colorMap: Record<string, string> = {
        'cyan-400': '#22d3ee',
        'blue-500': '#3b82f6',
        'orange-400': '#fb923c',
        'red-500': '#ef4444',
        'purple-500': '#a855f7',
        'pink-500': '#ec4899'
      };
      
      // Add hex colors first
      colors.push(...hexMatches);
      
      // Then add mapped colors
      for (const match of matches) {
        if (!match.startsWith('#') && colorMap[match]) {
          colors.push(colorMap[match]);
        }
      }
    }
    
    // Generate variations if we don't have enough colors
    while (colors.length < 5 && colors.length > 0) {
      const baseColor = colors[0];
      const variation = adjustColor(baseColor, 20 * (colors.length - 1));
      colors.push(variation);
    }
    
    // Fallback colors
    while (colors.length < 5) {
      colors.push('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    }
    
    return colors.slice(0, 5);
  }
  
  // Helper to adjust color brightness
  function adjustColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  
  $: extractedColors = extractColors(currentTheme.gradient || '');
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

<!-- 🎨 FLIPCARD WITH CORRECT LAYOUT -->
<div class="flipcard-container" style="width: {cardWidth}px;">
  
  <!-- Main FlipCard -->
  <div 
    class="flipcard-wrapper"
    class:flipped={isFlipped}
    style="width: {cardWidth}px; height: {cardHeight}px;"
    on:click={handleFlip}
    bind:this={cardElement}
  >
    <!-- Front Side -->
    <div class="flipcard-side flipcard-front" style="
      background-color: {currentTheme.cardBg};
      border-radius: {borderRadius}px;
      padding: {padding}px;
      display: flex;
      flex-direction: column;
    ">
      <!-- Settings Button (only show on SIZE-3 and above) -->
      {#if !displayOnly && size >= 3}
        <button class="settings-button" on:click|stopPropagation>
          i
        </button>
      {/if}
      
      <!-- Gradient Box (2/3 of available content area) -->
      <div class="image-box" style="
        width: {imageBoxSize}px;
        height: {imageBoxSize}px;
        background: linear-gradient(135deg, {currentTheme.gradientColors ? currentTheme.gradientColors.join(', ') : currentTheme.gradient.replace('from-', '').replace(' to-', ', ')});
        border-radius: {imageBoxRadius}px;
        margin: 0 auto 0;
      ">
      </div>
      
      <!-- Text Area (1/3 of available height with smart minimums) -->
      <div class="text-content" style="height: {Math.max(size === 1 ? 16 : size === 2 ? 20 : 24, Math.round(availableHeight * (1/3)))}px;">
        <h3 class="card-title" style="
          color: {currentTheme.textColor};
          font-size: {titleFontSize}px;
          font-family: {component.titleFont || 'Inter'}, -apple-system, sans-serif;
          font-weight: {component.titleWeight || 600};
          margin-bottom: {size <= 2 && displayTagline ? '1px' : '0'};
        ">
          {displayName}
        </h3>
        {#if displayTagline}
          <p class="card-tagline" style="
            color: {currentTheme.textColor};
            font-size: {taglineFontSize}px;
            opacity: 0.9;
            font-family: {component.taglineFont || 'Inter'}, -apple-system, sans-serif;
            font-weight: {component.taglineWeight || 500};
            margin: 0;
          ">
            {displayTagline}
          </p>
        {/if}
      </div>
      
      <!-- Refresh Icon (only show on SIZE-3 and above) -->
      {#if !displayOnly && size >= 3}
        <button class="refresh-button" on:click|stopPropagation>
          {@html iconSvgs.refresh}
        </button>
      {/if}
    </div>
    
    <!-- Back Side -->
    <div class="flipcard-side flipcard-back" style="
      background-color: {currentTheme.cardBg};
      border-radius: {borderRadius}px;
      padding: {padding}px;
    ">
      <div class="flipcard-back-content">
        <h3 class="back-title" style="color: {currentTheme.textColor};">
          {displayName}
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
    <div class="color-palette" style="margin-top: {padding/2}px;">
      {#each extractedColors as color}
        <div class="color-swatch" style="background-color: {color}"></div>
      {/each}
    </div>
  {/if}
  
  <!-- Tags Bar -->
  {#if showComponents.tags && !displayOnly}
    <div class="tags-bar" style="margin-top: {padding/2}px;">
      {#each visibleTags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  {/if}
  
  <!-- Toolbar -->
  {#if showComponents.toolbar && !displayOnly}
    <div class="toolbar" style="margin-top: {padding/2}px;">
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
    <div class="buy-component" style="margin-top: {padding/2}px;">
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
    display: flex;
    flex-direction: column;
  }
  
  .flipcard-front {
    z-index: 2;
    position: relative;
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
  
  /* Settings Button */
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
    color: #000;
  }
  
  .settings-button:hover {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  /* Gradient Box (Pure gradient only - exactly 2/3 of card) */
  .image-box {
    flex-shrink: 0;
    display: block;
  }
  
  /* Text Content Below Gradient (exactly 1/3 of card with better spacing) */
  .text-content {
    text-align: center;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0.5rem;
    min-height: 0; /* Allow shrinking */
    overflow: hidden; /* Prevent text overflow from breaking layout */
  }
  
  .card-title {
    font-weight: 700; /* Bolder for prominence */
    margin: 0; /* Margin controlled inline based on size */
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.0; /* Tighter line height for small cards */
    text-align: center;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Prevent text wrapping that causes cutoff */
  }
  
  .card-tagline {
    font-weight: 400; /* Lighter weight for contrast */
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.1; /* Tighter line height for small cards */
    text-align: center;
    opacity: 0.85;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Prevent text wrapping that causes cutoff */
  }
  
  /* Refresh Button */
  .refresh-button {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .refresh-button:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .refresh-button svg {
    width: 1rem;
    height: 1rem;
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
    color: white;
  }
  
  .section-content {
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .tech-list,
  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
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