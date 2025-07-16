<!-- Enhanced FlipCard.svelte with Global Preferences -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { scale } from 'svelte/transition';
  import { elasticOut, cubicOut } from 'svelte/easing';
  import type { Component } from '$lib/marketplace/types';
  import { flipcardPreferences, flipcardPreferencesActions } from '$lib/stores/flipcardPreferences';
  
  // Directional flip transitions - forward (→) and backward (←)
  function flipTransitionForward(node: Element, { duration = 800 }: { duration?: number } = {}) {
    return {
      duration,
      easing: cubicOut,
      css: (t: number) => {
        const isBackSide = node.classList.contains('flipcard-back');
        
        if (isBackSide) {
          // Back side: incoming from right (180° → 0°)
          const rotateY = 180 - (t * 180);
          return `
            transform: perspective(1200px) rotateY(${rotateY}deg);
            backface-visibility: hidden;
          `;
        } else {
          // Front side: outgoing to right (0° → 180°)
          const rotateY = t * 180;
          return `
            transform: perspective(1200px) rotateY(${rotateY}deg);
            backface-visibility: hidden;
          `;
        }
      }
    };
  }
  
  function flipTransitionBackward(node: Element, { duration = 800 }: { duration?: number } = {}) {
    return {
      duration,
      easing: cubicOut,
      css: (t: number) => {
        const isBackSide = node.classList.contains('flipcard-back');
        
        if (isBackSide) {
          // Back side: outgoing to left (0° → -180°, matching ← arrow)
          const rotateY = -(t * 180);
          return `
            transform: perspective(1200px) rotateY(${rotateY}deg);
            backface-visibility: hidden;
          `;
        } else {
          // Front side: incoming from left (-180° → 0°)
          const rotateY = -180 + (t * 180);
          return `
            transform: perspective(1200px) rotateY(${rotateY}deg);
            backface-visibility: hidden;
          `;
        }
      }
    };
  }
  
  // Props from parent 
  export let component: Component;
  export let theme: 'professional' | 'wallet' | 'neon' | 'gradient' | 'solid' = 'professional';
  export let displayOnly: boolean = false;
  export let iconType: 'checkmark' | 'custom' | 'component' = 'checkmark';
  export let customIconSvg: string = '';
  export let size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5; // Mathematical SIZE everywhere!
  
  const dispatch = createEventDispatcher();
  
  // Global preferences state
  let showPreferencesOnBack = false; // Show preferences instead of regular content
  
  let isFlipped = false;
  let cardElement: HTMLDivElement;
  
  // 🎮 4-CORNER BUTTON SYSTEM STATE
  let isLoved = false;
  let cartItemAdded = false;
  let cartCount = 0;
  
  // 🎯 4-CORNER BUTTON FUNCTIONS
  
  // TOP-LEFT: Settings/Preferences
  function openPreferences() {
    showPreferencesOnBack = true;
    if (!isFlipped) {
      isFlipped = true; // Flip to back to show preferences
    }
  }
  
  // TOP-RIGHT: Add to Cart  
  function addToCart(event: Event) {
    event.stopPropagation();
    cartItemAdded = true;
    cartCount++;
    
    // TODO: Update global cart state
    dispatch('add-to-cart', { 
      component: component,
      count: cartCount 
    });
    
    // Visual feedback
    setTimeout(() => {
      cartItemAdded = false;
    }, 2000);
  }
  
  // BOTTOM-LEFT: Love/Favorite
  function toggleLove(event: Event) {
    event.stopPropagation();
    isLoved = !isLoved;
    
    // TODO: Update user favorites
    dispatch('toggle-love', { 
      component: component,
      isLoved: isLoved 
    });
  }
  
  // BOTTOM-RIGHT: Flip Card
  function toggleFlip(event: Event) {
    event.stopPropagation();
    isFlipped = !isFlipped;
    showPreferencesOnBack = false; // Reset preferences view
  }
  
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
  // Smart flip sizing logic - BACK SIDE MINIMUM SIZE-5 (333px) ⭐
  $: currentSize = isFlipped ? Math.max(size, 5) : size; // Back side minimum SIZE-5 for comfortable reading
  $: cardWidth = SIZES[currentSize];
  $: cardHeight = SIZES[currentSize];
  
  // VITAL: Consistent 40px padding across ALL sizes for perfect grid alignment
  $: padding = 40; // Fixed 40px padding for all sizes ⭐
  
  $: availableHeight = cardHeight - (padding * 2); // Content area after padding
  $: imageBoxSize = Math.round(availableHeight * IMAGE_BOX_RATIO); // 2/3 of available height
  
  // Scale elements based on card size - optimized for readability at all sizes
  $: titleFontSize = Math.max(8, Math.round(32 * cardWidth / MASTER_SIZE)); // Min 8px, scales to 32px at SIZE-5
  $: taglineFontSize = Math.max(6, Math.round(18 * cardWidth / MASTER_SIZE)); // Min 6px, scales to 18px at SIZE-5
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
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
        <path d="M21 21v-5h-5"></path>
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
  
  // Calculate color contrast for better color selection
  function getColorContrast(color1: string, color2: string): number {
    // Convert hex to RGB and calculate relative luminance
    function getLuminance(hex: string): number {
      const rgb = parseInt(hex.replace('#', ''), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = rgb & 0xff;
      
      // Convert to relative luminance
      const rs = r / 255;
      const gs = g / 255;
      const bs = b / 255;
      
      const rLinear = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
      const gLinear = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
      const bLinear = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
      
      return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
    }
    
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }
  
  // Extract colors in meaningful order: Background, Title, Best 3 from gradient
  function extractColors(gradient: string): string[] {
    const orderedColors = [];
    
    // 1. Background color of card (black in default example)
    orderedColors.push(currentTheme.cardBg);
    
    // 2. Title color (white in default example)  
    orderedColors.push(currentTheme.textColor);
    
    // 3-5. Extract best 3 colors from gradient using contrast analysis
    const gradientColors = [];
    
    // Extract colors from gradient
    if (currentTheme.gradientColors) {
      gradientColors.push(...currentTheme.gradientColors);
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
      gradientColors.push(...hexMatches);
      
      // Then add mapped colors
      for (const match of matches) {
        if (!match.startsWith('#') && colorMap[match]) {
          gradientColors.push(colorMap[match]);
        }
      }
    }
    
    // Generate variations and analyze contrast for best selection
    const candidateColors = [...gradientColors];
    
    // Add variations of gradient colors
    for (const baseColor of gradientColors) {
      candidateColors.push(adjustColor(baseColor, 40));   // Lighter
      candidateColors.push(adjustColor(baseColor, -40));  // Darker
      candidateColors.push(adjustColor(baseColor, 80));   // Much lighter
      candidateColors.push(adjustColor(baseColor, -80));  // Much darker
    }
    
    // Remove duplicates and colors too similar to background/title
    const uniqueColors = candidateColors.filter((color, index, self) => {
      return self.indexOf(color) === index &&
             color !== currentTheme.cardBg &&
             color !== currentTheme.textColor &&
             getColorContrast(color, currentTheme.cardBg) > 1.5; // Ensure some contrast
    });
    
    // Sort by contrast against background for best utility
    const bestColors = uniqueColors
      .map(color => ({
        color,
        contrast: getColorContrast(color, currentTheme.cardBg)
      }))
      .sort((a, b) => b.contrast - a.contrast) // Highest contrast first
      .slice(0, 3) // Take best 3
      .map(item => item.color);
    
    // Add the 3 best contrasting colors
    orderedColors.push(...bestColors);
    
    // Ensure we always have 5 colors
    while (orderedColors.length < 5) {
      orderedColors.push('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    }
    
    return orderedColors.slice(0, 5);
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
    
    // Reset preferences view when flipping back to front
    if (!isFlipped) {
      showPreferencesOnBack = false;
    }
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
  
  <!-- Main FlipCard with Svelte Transitions -->
  <div 
    class="flipcard-wrapper"
    style="width: {cardWidth}px; height: {cardHeight}px;"
    on:click={handleFlip}
    bind:this={cardElement}
  >
    {#if isFlipped}
      <!-- Back Side - Visible when flipped -->
      <div 
        class="flipcard-side flipcard-back" 
        style="
          background-color: {currentTheme.cardBg};
          border-radius: {borderRadius}px;
          padding: {padding}px;
        " 
        on:click|stopPropagation
        transition:flipTransitionForward={{ duration: 800 }}
      >
        <!-- 🎮 3-CORNER BUTTON SYSTEM (Back Side) - ONLY SIZE 4+ -->
        {#if !displayOnly && size >= 4}
          <div class="corner-buttons-container">
            <!-- TOP-LEFT: Settings -->
            <button 
              class="corner-btn top-left" 
              on:click|stopPropagation={openPreferences}
              title="Settings & Preferences"
            >
              i
            </button>
            
            <!-- TOP-RIGHT: Add to Cart -->
            <button 
              class="corner-btn top-right" 
              on:click|stopPropagation={addToCart}
              title="Add to Cart"
              class:cart-added={cartItemAdded}
            >
              🛒
              {#if cartItemAdded}
                <span class="cart-indicator">+1</span>
              {/if}
            </button>
            
            <!-- BOTTOM-LEFT: Love/Favorite -->
            <button 
              class="corner-btn bottom-left heart-btn" 
              on:click|stopPropagation={toggleLove}
              title="Add to Favorites"
              class:loved={isLoved}
            >
              {isLoved ? '♥' : '♡'}
            </button>
            
            <!-- BOTTOM-RIGHT: Keep original UFO system -->
          </div>
        {/if}
        
        <div class="flipcard-back-content">
          {#if showPreferencesOnBack}
            <!-- BACK ARROW for preferences navigation - ONLY SIZE 4+ -->
            {#if size >= 4}
              <div class="preferences-back-arrow">
                <button 
                  class="back-arrow-btn" 
                  on:click|stopPropagation={() => { 
                    showPreferencesOnBack = false; 
                    isFlipped = false; 
                  }}
                  title="Back to FlipCard"
                >
                  ←
                </button>
              </div>
            {/if}
            
            <!-- Compact Preferences Interface (No Title) -->
            <div class="preferences-sections">
              <!-- Live Status (moved to top) -->
              <div class="live-status">
                <div class="pulse-dot"></div>
                <span class="tech-text">LIVE_SYNC >> all.flipcards.global()</span>
              </div>
              
              <!-- Color Palette Toggle -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">🎨</span>
                  <span class="pref-label">Color Palette</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showPalette}
                  on:click={() => flipcardPreferencesActions.toggle('showPalette')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <!-- Tags Toggle -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">#️⃣</span>
                  <span class="pref-label">Tags</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showTags}
                  on:click={() => flipcardPreferencesActions.toggle('showTags')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <!-- Toolbar Toggle -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">🔧</span>
                  <span class="pref-label">Toolbar</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showToolbar}
                  on:click={() => flipcardPreferencesActions.toggle('showToolbar')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <!-- Buy Button Toggle -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">💳</span>
                  <span class="pref-label">Buy Button</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showBuyButton}
                  on:click={() => flipcardPreferencesActions.toggle('showBuyButton')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
            </div>
          {:else}
            <!-- Regular Component Information -->
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
          {/if}
        </div>
        
        <!-- Flip UFO on Back Side (bottom right - for return navigation) - ONLY SIZE 4+ -->
        {#if !displayOnly && size >= 4}
          <div class="flip-arrows-container" on:click|stopPropagation={handleFlip}>
            <div 
              class="flip-arrows" 
              title="FlipCard Back"
              transition:scale={{ duration: 400, easing: elasticOut }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12h18"></path>
                <path d="M13 18l6-6-6-6"></path>
                <path d="M11 6l-6 6 6 6"></path>
              </svg>
            </div>
            
            <!-- FlipCard Tooltip -->
            <div class="tardis-tooltip">
              FlipCard
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <!-- Front Side - Visible when not flipped -->
      <div 
        class="flipcard-side flipcard-front" 
        style="
          background-color: {currentTheme.cardBg};
          border-radius: {borderRadius}px;
          padding: {padding}px;
          display: flex;
          flex-direction: column;
        "
        transition:flipTransitionBackward={{ duration: 800 }}
      >
        <!-- 🎮 3-CORNER BUTTON SYSTEM (Front Side) - ONLY SIZE 4+ -->
        {#if !displayOnly && size >= 4}
          <div class="corner-buttons-container">
            <!-- TOP-LEFT: Settings -->
            <button 
              class="corner-btn top-left" 
              on:click|stopPropagation={openPreferences}
              title="Settings & Preferences"
            >
              i
            </button>
            
            <!-- TOP-RIGHT: Add to Cart -->
            <button 
              class="corner-btn top-right" 
              on:click|stopPropagation={addToCart}
              title="Add to Cart"
              class:cart-added={cartItemAdded}
            >
              🛒
              {#if cartItemAdded}
                <span class="cart-indicator">+1</span>
              {/if}
            </button>
            
            <!-- BOTTOM-LEFT: Love/Favorite -->
            <button 
              class="corner-btn bottom-left heart-btn" 
              on:click|stopPropagation={toggleLove}
              title="Add to Favorites"
              class:loved={isLoved}
            >
              {isLoved ? '♥' : '♡'}
            </button>
            
            <!-- BOTTOM-RIGHT: Keep original UFO system -->
          </div>
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
        
        <!-- Flip Arrows (bottom right - critical UX discovery element) - ONLY SIZE 4+ -->
        {#if !displayOnly && size >= 4}
          <div class="flip-arrows-container" on:click|stopPropagation={handleFlip}>
            <div 
              class="flip-arrows" 
              title="FlipCard Forward"
              transition:scale={{ duration: 400, easing: elasticOut }}
              on:mouseenter={() => {/* Tooltip handled by CSS */}}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12h18"></path>
                <path d="M13 18l6-6-6-6"></path>
                <path d="M11 6l-6 6 6 6"></path>
              </svg>
            </div>
            
            <!-- FlipCard Tooltip -->
            <div class="tardis-tooltip">
              FlipCard
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  
  <!-- Simple Tags - Directly Below Card -->
  {#if $flipcardPreferences.showTags && !displayOnly && size >= 4}
    <div class="simple-tags">
      {#each visibleTags as tag}
        <span class="simple-tag">{tag}</span>
      {/each}
    </div>
  {/if}
  
  <!-- Color Palette Component - ONLY SIZE 4+ -->
  {#if $flipcardPreferences.showPalette && !displayOnly && size >= 4}
    <div class="color-palette">
      {#each extractedColors as color}
        <div class="color-swatch" style="background-color: {color}"></div>
      {/each}
    </div>
  {/if}
  
  <!-- Toolbar - ONLY SIZE 4+ -->
  {#if $flipcardPreferences.showToolbar && !displayOnly && size >= 4}
    <div class="toolbar">
      <button title="Download" on:click|stopPropagation>📥</button>
      <button title="Share" on:click|stopPropagation>📤</button>
      <button title="Email" on:click|stopPropagation>📧</button>
      <button title="Mobile" on:click|stopPropagation>📱</button>
      <button title="Link" on:click|stopPropagation>🔗</button>
      <button title="Settings" on:click|stopPropagation>⚙️</button>
    </div>
  {/if}
  
  <!-- ⚡️ ORIGINAL BUY BUTTON (Simple & Clean) -->
  {#if $flipcardPreferences.showBuyButton && !displayOnly}
    <button 
      class="original-buy-btn" 
      on:click={(e) => handleBuyNow(e, 'individual')}
    >
      ⚡ BUY
    </button>
  {/if}
</div>

<style>
  .flipcard-container {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    gap: 0.5rem; /* Consistent spacing between card and components */
  }
  
  .flipcard-wrapper {
    position: relative;
    cursor: pointer;
    perspective: 1200px;
    transform-style: preserve-3d;
  }
  
  .flipcard-side {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: inherit;
    backface-visibility: hidden;
    transform-origin: center center;
  }
  
  /* 🎮 4-CORNER BUTTON SYSTEM */
  .corner-buttons-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none; /* Allow clicks through to card */
    z-index: 10;
  }

  .corner-btn {
    position: absolute;
    pointer-events: auto; /* Enable clicks on buttons */
    width: 28px; /* Exact same size for ALL corners */
    height: 28px; /* Exact same size for ALL corners */
    border: none;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem; /* Same font size for all */
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .corner-btn:hover {
    background: rgba(0, 0, 0, 0.95);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  /* Corner Positions - MINIMAL PADDING, EXACT ALIGNMENT */
  .top-left { 
    top: 4px; 
    left: 4px; 
  }
  
  .top-right { 
    top: 4px; 
    right: 4px;
  }
  
  .bottom-left { 
    bottom: 4px; 
    left: 4px; 
  }
  
  .bottom-right { 
    bottom: 4px; 
    right: 4px; 
  }

  /* Special States */
  .corner-btn.loved {
    background: rgba(220, 38, 127, 0.9);
  }

  .corner-btn.cart-added {
    background: rgba(34, 197, 94, 0.9);
  }

  /* Heart Button Styling - SAME SIZE AS ALL OTHERS */
  .corner-btn.heart-btn {
    font-size: 0.8rem; /* Same as all other corner buttons */
  }

  .corner-btn.heart-btn:not(.loved) {
    color: rgba(255, 255, 255, 0.8); /* Outline heart - subtle */
  }

  .corner-btn.heart-btn.loved {
    color: #ff1744; /* Solid heart - bright red */
    background: rgba(220, 38, 127, 0.9);
  }

  .cart-indicator {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    font-size: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  /* Responsive sizing - MAINTAIN EXACT 28px SIZE */
  @media (max-width: 640px) {
    .corner-btn {
      width: 28px; /* Keep exact same size on mobile */
      height: 28px; /* Keep exact same size on mobile */
      font-size: 0.8rem; /* Keep same font size */
    }
  }
  
  /* Flip Arrows (bottom right discovery element) */
  .flip-arrows-container {
    position: absolute;
    bottom: 0.375rem;
    right: 0.375rem;
    z-index: 5;
  }
  
  .flip-arrows {
    width: 1.25rem;
    height: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    animation: flipHint 3s infinite;
    pointer-events: auto; /* Allow clicks to pass through to wrapper */
    cursor: pointer;
  }
  
  .flip-arrows svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }
  
  @keyframes flipHint {
    0%, 85%, 100% { 
      opacity: 0.8;
      transform: scale(1);
    }
    90%, 95% { 
      opacity: 1;
      transform: scale(1.1);
    }
  }
  
  /* TARDIS Tooltip - Minimal UFO Style */
  .tardis-tooltip {
    position: absolute;
    bottom: 2rem;
    right: -0.25rem;
    background: rgba(0, 0, 0, 0.85);
    color: #00d4ff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.6rem;
    font-weight: 700;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(0.25rem) scale(0.8);
    transition: all 0.15s ease-out;
    pointer-events: none;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(0, 212, 255, 0.3);
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
    z-index: 25;
    text-shadow: 0 0 4px rgba(0, 212, 255, 0.4);
    letter-spacing: 0.05em;
  }
  
  /* No arrow - clean minimal look */
  
  /* UFO hover triggers tooltip with quick poof effect */
  .flip-arrows-container:hover .tardis-tooltip {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  /* Quick vanish when hover ends */
  .flip-arrows-container:not(:hover) .tardis-tooltip {
    opacity: 0;
    transform: translateY(0.25rem) scale(0.8);
    transition: all 0.1s ease-in;
  }
  
  .flip-arrows-container:hover .flip-arrows {
    opacity: 1;
    transform: scale(1.15);
    animation: none;
    filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.3));
  }
  
  /* Gradient Box (Pure gradient only - exactly 2/3 of card) */
  .image-box {
    flex-shrink: 0;
    display: block;
  }
  
  /* Text Content Below Gradient - FULL WIDTH */
  .text-content {
    text-align: center;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0; /* Remove horizontal padding for full width */
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
  
  /* Back Arrow for Preferences Navigation */
  .preferences-back-arrow {
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 20;
  }

  .back-arrow-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .back-arrow-btn:hover {
    background: rgba(0, 0, 0, 1);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  /* Back Side Styles - FULL WIDTH */
  .flipcard-back-content {
    height: 100%;
    overflow-y: auto;
    color: white;
    padding: 0; /* Remove any padding for full width */
  }
  
  /* Dark Scrollbars */
  .flipcard-back-content::-webkit-scrollbar {
    width: 6px;
  }
  
  .flipcard-back-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  .flipcard-back-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    transition: all 0.2s;
  }
  
  .flipcard-back-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  /* Firefox scrollbar styling */
  .flipcard-back-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
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
    gap: 0.375rem;
    padding: 0.75rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
  }
  
  .color-swatch {
    width: 3.125rem;  /* 5:4 ratio width (2.5rem × 5/4) */
    height: 2.5rem;   /* Same height as ❤️ button */
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .color-swatch:hover {
    transform: translateY(-1px) scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 1);
  }
  
  /* Simple Tags - Clean Text Only */
  .simple-tags {
    display: flex;
    gap: 0.75rem;
    padding: 0.5rem 0;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .simple-tag {
    color: #64748b;
    font-size: 0.75rem;
    font-weight: 500;
    font-family: 'Inter', -apple-system, sans-serif;
    transition: color 0.2s ease;
  }
  
  .simple-tag:hover {
    color: #475569;
  }
  
  .toolbar {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    border-radius: 0.75rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .toolbar button {
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    font-size: 1rem;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .toolbar button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  /* ⚡️ ORIGINAL BUY BUTTON (Simple & Clean) */
  .original-buy-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background: #000000;
    color: white;
    border: none;
    border-radius: 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .original-buy-btn:hover {
    background: #1f1f1f;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .original-buy-btn:active {
    transform: translateY(0);
  }

  /* Dark mode support for other components */
  :global(.dark) .color-palette,
  :global(.dark) .buy-component {
    background: #1f2937;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  :global(.dark) .simple-tag {
    color: #94a3b8;
  }
  
  :global(.dark) .simple-tag:hover {
    color: #cbd5e1;
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
  
  /* Preferences Interface Styles */
  .preferences-sections {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.25rem 0;
    height: 100%;
    justify-content: center;
  }
  
  .pref-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.375rem;
    transition: all 0.2s;
  }
  
  .pref-section:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  .pref-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .pref-icon {
    font-size: 1rem;
    width: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pref-label {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  /* FlipCard Toggle Switch */
  .flip-toggle {
    position: relative;
    display: inline-block;
    width: 2.25rem;
    height: 1.125rem;
    cursor: pointer;
  }
  
  .toggle-slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1.125rem;
    transition: 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 0.875rem;
    width: 0.875rem;
    left: 0.125rem;
    bottom: 0.125rem;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .flip-toggle.checked .toggle-slider {
    background: rgba(59, 130, 246, 0.8);
    border-color: rgba(59, 130, 246, 0.6);
  }
  
  .flip-toggle.checked .toggle-slider:before {
    transform: translateX(1.125rem);
  }
  
  .toggle-slider:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  
  .flip-toggle.checked .toggle-slider:hover {
    background: rgba(59, 130, 246, 0.9);
  }
  
  /* Live Status */
  .live-status {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.375rem;
    margin-top: 0.25rem;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .tech-text {
    font-family: 'Roboto Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-weight: 500;
    letter-spacing: 0.025em;
    color: #10b981;
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
  }
  
  .pulse-dot {
    width: 5px;
    height: 5px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { 
      opacity: 1;
      transform: scale(1);
    }
    50% { 
      opacity: 0.7;
      transform: scale(1.2);
    }
  }
</style>