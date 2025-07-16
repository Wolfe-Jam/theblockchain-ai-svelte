<!-- 
  🎯 FlipCard - Professional UI Component
  
  A revolutionary "album cover for software" - transforms any content into 
  beautiful, scalable visual cards that work perfectly from micro thumbnails 
  to mega hero displays.
  
  Mathematical precision: 9 exact sizes based on 333px master baseline
  Professional quality: Enterprise-grade visual design
  Universal API: Works with any data structure
  Self-contained: No external dependencies
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { cubicOut, elasticOut } from 'svelte/easing';
  
  // 🎨 UNIVERSAL PROPS API - Clean & Professional
  export let title: string = 'FlipCard';
  export let tagline: string = 'Professional Component';
  export let gradient: [string, string] = ['#22d3ee', '#3b82f6']; // [start, end] colors
  export let icon: string = ''; // SVG string or emoji
  export let size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5; // Mathematical sizing
  
  // 📊 COMPONENT FEATURES (All Optional)
  export let showPalette: boolean = true;
  export let showTags: boolean = true;
  export let showToolbar: boolean = false;
  export let showBuyButton: boolean = false;
  
  // 🏷️ DATA
  export let tags: string[] = [];
  export let pricing: { individual: number; team: number; enterprise: number } = {
    individual: 19900, // $199 in cents
    team: 49900,       // $499 in cents
    enterprise: 149900  // $1499 in cents
  };
  
  // 🎛️ CUSTOMIZATION
  export let theme: 'light' | 'dark' = 'dark';
  export let interactive: boolean = true;
  export let cornerButtons: boolean = true;
  
  // 📝 CONTENT (for back side)
  export let description: string = 'Professional component with enterprise-grade features and beautiful design.';
  export let features: string[] = [
    'Mathematical precision sizing',
    'Professional visual design', 
    'Universal API interface',
    'Self-contained architecture'
  ];
  export let techStack: string[] = ['SvelteKit', 'TypeScript', 'Tailwind'];
  
  // 🎯 EVENT DISPATCHER
  const dispatch = createEventDispatcher<{
    flip: { side: 'front' | 'back' };
    purchase: { tier: 'individual' | 'team' | 'enterprise'; amount: number };
    favorite: { favorited: boolean };
    'add-to-cart': { item: any };
  }>();
  
  // 🔄 COMPONENT STATE
  let isFlipped = false;
  let isLoved = false;
  let cartItemAdded = false;
  let showPreferences = false;
  
  // 📐 MATHEMATICAL SIZE SYSTEM - The FlipCard Foundation
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
  
  // 🎨 RESPONSIVE CALCULATIONS
  $: cardWidth = SIZES[size];
  $: cardHeight = SIZES[size];
  $: padding = 40; // Fixed padding for all sizes
  $: availableHeight = cardHeight - (padding * 2);
  $: imageBoxSize = Math.round(availableHeight * (2/3)); // 66.6% ratio
  $: borderRadius = Math.round(16 * cardWidth / MASTER_SIZE);
  $: imageBoxRadius = Math.round(12 * cardWidth / MASTER_SIZE);
  
  // 📱 SMART TEXT SCALING
  $: titleFontSize = Math.max(8, Math.round(32 * cardWidth / MASTER_SIZE));
  $: taglineFontSize = Math.max(6, Math.round(18 * cardWidth / MASTER_SIZE));
  
  // 🎭 SMART CONTENT TRUNCATION
  $: displayTitle = size === 1 ? 
    (title.includes(' ') ? title.split(' ')[0].substring(0, 4) : title.substring(0, 4)) :
    size === 2 ? 
    (title.includes(' ') ? title.split(' ')[0].substring(0, 6) : title.substring(0, 6)) :
    title;
  
  $: displayTagline = size === 1 ? 
    '' : // No tagline for SIZE-1
    size === 2 ?
    'Tool' : // Simple tagline for SIZE-2
    size <= 3 ? 
    (tagline.length > 10 ? tagline.substring(0, 10) : tagline) :
    tagline;
  
  // 🎨 THEME CONFIGURATION
  const themes = {
    light: {
      cardBg: '#ffffff',
      textColor: '#1f2937',
      shadowColor: 'rgba(0, 0, 0, 0.1)'
    },
    dark: {
      cardBg: '#000000',
      textColor: '#ffffff',
      shadowColor: 'rgba(255, 255, 255, 0.1)'
    }
  };
  
  $: currentTheme = themes[theme];
  
  // 🌈 COLOR PALETTE EXTRACTION
  function extractColors(gradientColors: [string, string]): string[] {
    const [start, end] = gradientColors;
    const colors = [currentTheme.cardBg, currentTheme.textColor];
    
    // Add gradient colors
    colors.push(start, end);
    
    // Generate a middle color
    const middleColor = blendColors(start, end, 0.5);
    colors.push(middleColor);
    
    return colors;
  }
  
  // 🎨 COLOR BLENDING UTILITY
  function blendColors(color1: string, color2: string, ratio: number): string {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  $: extractedColors = extractColors(gradient);
  $: visibleTags = tags.slice(0, 3).map(tag => tag.startsWith('#') ? tag : `#${tag}`);
  
  // 🎯 EVENT HANDLERS
  function handleFlip() {
    if (!interactive) return;
    isFlipped = !isFlipped;
    dispatch('flip', { side: isFlipped ? 'back' : 'front' });
  }
  
  function handlePurchase(tier: 'individual' | 'team' | 'enterprise') {
    dispatch('purchase', { tier, amount: pricing[tier] });
  }
  
  function handleFavorite() {
    isLoved = !isLoved;
    dispatch('favorite', { favorited: isLoved });
  }
  
  function handleAddToCart() {
    cartItemAdded = true;
    dispatch('add-to-cart', { item: { title, pricing, tags } });
    setTimeout(() => { cartItemAdded = false; }, 2000);
  }
  
  // 🎨 DEFAULT ICON IF NONE PROVIDED
  const defaultIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <rect x="7" y="7" width="3" height="3"></rect>
      <rect x="14" y="7" width="3" height="3"></rect>
      <rect x="7" y="14" width="3" height="3"></rect>
      <rect x="14" y="14" width="3" height="3"></rect>
    </svg>
  `;
  
  // 🎨 GRADIENT CSS GENERATOR
  $: gradientCSS = `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`;
  
  // 🔄 FLIP TRANSITIONS
  function flipTransition(node: Element, { duration = 800 }: { duration?: number } = {}) {
    const isBackSide = node.classList.contains('flipcard-back');
    
    return {
      duration,
      easing: cubicOut,
      css: (t: number) => {
        const rotateY = isBackSide ? 180 - (t * 180) : t * 180;
        return `
          transform: perspective(1200px) rotateY(${rotateY}deg);
          backface-visibility: hidden;
        `;
      }
    };
  }
  
  // 💰 PRICE FORMATTER
  function formatPrice(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }
</script>

<!-- 🎨 FLIPCARD CONTAINER -->
<div class="flipcard-container" style="width: {cardWidth}px;">
  
  <!-- 📦 MAIN FLIPCARD -->
  <div 
    class="flipcard-wrapper"
    style="width: {cardWidth}px; height: {cardHeight}px;"
    on:click={handleFlip}
  >
    {#if isFlipped}
      <!-- 🔄 BACK SIDE -->
      <div 
        class="flipcard-side flipcard-back" 
        style="
          background-color: {currentTheme.cardBg};
          border-radius: {borderRadius}px;
          padding: {padding}px;
          color: {currentTheme.textColor};
        "
        on:click|stopPropagation
        transition:flipTransition
      >
        <!-- 🎮 CORNER BUTTONS (Back Side) -->
        {#if interactive && cornerButtons && size >= 4}
          <div class="corner-buttons">
            <button class="corner-btn top-left" on:click={() => showPreferences = true}>
              ⚙️
              <div class="tooltip tooltip-white">Settings</div>
            </button>
            <button class="corner-btn top-right" on:click={handleAddToCart}>
              🛒
              <div class="tooltip tooltip-green">Cart</div>
              {#if cartItemAdded}
                <span class="cart-indicator">+1</span>
              {/if}
            </button>
            <button class="corner-btn bottom-left" on:click={handleFavorite}>
              {isLoved ? '❤️' : '🤍'}
              <div class="tooltip tooltip-pink">Love</div>
            </button>
          </div>
        {/if}
        
        <!-- 📄 BACK CONTENT -->
        <div class="back-content">
          <h3 class="back-title">{displayTitle}</h3>
          
          <div class="back-sections">
            <!-- 📋 Overview -->
            <div class="back-section">
              <h4 class="section-title">📋 Overview</h4>
              <p class="section-content">{description}</p>
            </div>
            
            <!-- 🛠️ Features -->
            <div class="back-section">
              <h4 class="section-title">🛠️ Features</h4>
              <ul class="features-list">
                {#each features as feature}
                  <li>{feature}</li>
                {/each}
              </ul>
            </div>
            
            <!-- 🔧 Tech Stack -->
            <div class="back-section">
              <h4 class="section-title">🔧 Tech Stack</h4>
              <ul class="tech-list">
                {#each techStack as tech}
                  <li>{tech}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
        
        <!-- 🔄 FLIP INDICATOR -->
        {#if interactive && size >= 4}
          <div class="flip-indicator" on:click|stopPropagation={handleFlip}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18"></path>
              <path d="M13 18l6-6-6-6"></path>
              <path d="M11 6l-6 6 6 6"></path>
            </svg>
            <div class="tooltip tooltip-cyan">FlipCard</div>
          </div>
        {/if}
      </div>
    {:else}
      <!-- 🎨 FRONT SIDE -->
      <div 
        class="flipcard-side flipcard-front" 
        style="
          background-color: {currentTheme.cardBg};
          border-radius: {borderRadius}px;
          padding: {padding}px;
        "
        transition:flipTransition
      >
        <!-- 🎮 CORNER BUTTONS (Front Side) -->
        {#if interactive && cornerButtons && size >= 4}
          <div class="corner-buttons">
            <button class="corner-btn top-left" on:click={() => showPreferences = true}>
              ⚙️
              <div class="tooltip tooltip-white">Settings</div>
            </button>
            <button class="corner-btn top-right" on:click={handleAddToCart}>
              🛒
              <div class="tooltip tooltip-green">Cart</div>
              {#if cartItemAdded}
                <span class="cart-indicator">+1</span>
              {/if}
            </button>
            <button class="corner-btn bottom-left" on:click={handleFavorite}>
              {isLoved ? '❤️' : '🤍'}
              <div class="tooltip tooltip-pink">Love</div>
            </button>
          </div>
        {/if}
        
        <!-- 🌈 GRADIENT BOX -->
        <div 
          class="gradient-box"
          style="
            width: {imageBoxSize}px;
            height: {imageBoxSize}px;
            background: {gradientCSS};
            border-radius: {imageBoxRadius}px;
          "
        >
          <!-- 🎨 ICON (Optional) -->
          {#if icon}
            <div class="icon-container">
              {@html icon}
            </div>
          {/if}
        </div>
        
        <!-- 📝 TEXT CONTENT -->
        <div class="text-content">
          <h3 
            class="card-title" 
            style="
              color: {currentTheme.textColor};
              font-size: {titleFontSize}px;
            "
          >
            {displayTitle}
          </h3>
          {#if displayTagline}
            <p 
              class="card-tagline" 
              style="
                color: {currentTheme.textColor};
                font-size: {taglineFontSize}px;
              "
            >
              {displayTagline}
            </p>
          {/if}
        </div>
        
        <!-- 🔄 FLIP INDICATOR -->
        {#if interactive && size >= 4}
          <div class="flip-indicator" on:click|stopPropagation={handleFlip}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18"></path>
              <path d="M13 18l6-6-6-6"></path>
              <path d="M11 6l-6 6 6 6"></path>
            </svg>
            <div class="tooltip tooltip-cyan">FlipCard</div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  
  <!-- 🏷️ TAGS (Simple & Clean) -->
  {#if showTags && tags.length > 0 && size >= 4}
    <div class="simple-tags">
      {#each visibleTags as tag}
        <span class="simple-tag">{tag}</span>
      {/each}
    </div>
  {/if}
  
  <!-- 🎨 COLOR PALETTE -->
  {#if showPalette && size >= 4}
    <div class="color-palette">
      {#each extractedColors as color}
        <div class="color-swatch" style="background-color: {color}">
          <div class="tooltip tooltip-hex">{color.toUpperCase()}</div>
        </div>
      {/each}
    </div>
  {/if}
  
  <!-- 🔧 TOOLBAR -->
  {#if showToolbar && size >= 4}
    <div class="toolbar">
      <button>
        📥
        <div class="tooltip tooltip-dark">Download</div>
      </button>
      <button>
        📤
        <div class="tooltip tooltip-blue">Share</div>
      </button>
      <button>
        📧
        <div class="tooltip tooltip-dark">Email</div>
      </button>
      <button>
        📱
        <div class="tooltip tooltip-dark">Mobile</div>
      </button>
      <button>
        🔗
        <div class="tooltip tooltip-blue">Link</div>
      </button>
      <button>
        ⚙️
        <div class="tooltip tooltip-dark">Settings</div>
      </button>
    </div>
  {/if}
  
  <!-- 💳 BUY BUTTON -->
  {#if showBuyButton}
    <div class="buy-section">
      <button class="buy-btn" on:click={() => handlePurchase('individual')}>
        ⚡ BUY {formatPrice(pricing.individual)}
        <div class="tooltip tooltip-green">Individual</div>
      </button>
      {#if size >= 5}
        <div class="pricing-tiers">
          <button class="tier-btn" on:click={() => handlePurchase('team')}>
            💼 Team {formatPrice(pricing.team)}
            <div class="tooltip tooltip-orange">Team</div>
          </button>
          <button class="tier-btn" on:click={() => handlePurchase('enterprise')}>
            🏢 Enterprise {formatPrice(pricing.enterprise)}
            <div class="tooltip tooltip-purple">Enterprise</div>
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  
  /* 🎯 UFO TOOLTIP ETHOS - Fast, Bright, High Contrast, Instantly On-View */
  .tooltip {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-weight: 700;
    white-space: nowrap;
    opacity: 0;
    transform: translateX(-50%) translateY(0.125rem) scale(0.95);
    transition: all 0.1s ease-out; /* Much faster like UFO */
    pointer-events: none;
    z-index: 50;
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    letter-spacing: 0.05em;
    text-transform: uppercase; /* More impactful like UFO */
  }
  
  /* UFO-Style Color Variants - Bright & High Contrast */
  .tooltip-white {
    background: rgba(255, 255, 255, 0.95);
    color: #000000;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }
  
  .tooltip-green {
    background: rgba(16, 185, 129, 0.95);
    color: white;
    border: 1px solid rgba(16, 185, 129, 0.5);
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
    text-shadow: 0 0 4px rgba(16, 185, 129, 0.6);
  }
  
  .tooltip-pink {
    background: rgba(219, 39, 119, 0.95);
    color: white;
    border: 1px solid rgba(219, 39, 119, 0.5);
    box-shadow: 0 0 12px rgba(219, 39, 119, 0.5);
    text-shadow: 0 0 4px rgba(219, 39, 119, 0.6);
  }
  
  .tooltip-cyan {
    background: rgba(6, 182, 212, 0.95);
    color: white;
    border: 1px solid rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 12px rgba(6, 182, 212, 0.5);
    text-shadow: 0 0 4px rgba(6, 182, 212, 0.6);
  }
  
  .tooltip-hex {
    background: rgba(0, 0, 0, 0.95);
    color: #00ff00; /* Bright green for hex codes */
    border: 1px solid rgba(0, 255, 0, 0.3);
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-shadow: 0 0 4px rgba(0, 255, 0, 0.4);
    text-transform: none; /* Keep hex codes as-is */
  }
  
  .tooltip-dark {
    background: rgba(0, 0, 0, 0.95);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }
  
  .tooltip-blue {
    background: rgba(59, 130, 246, 0.95);
    color: white;
    border: 1px solid rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
    text-shadow: 0 0 4px rgba(59, 130, 246, 0.6);
  }
  
  .tooltip-orange {
    background: rgba(249, 115, 22, 0.95);
    color: white;
    border: 1px solid rgba(249, 115, 22, 0.5);
    box-shadow: 0 0 12px rgba(249, 115, 22, 0.5);
    text-shadow: 0 0 4px rgba(249, 115, 22, 0.6);
  }
  
  .tooltip-purple {
    background: rgba(168, 85, 247, 0.95);
    color: white;
    border: 1px solid rgba(168, 85, 247, 0.5);
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.5);
    text-shadow: 0 0 4px rgba(168, 85, 247, 0.6);
  }
  
  /* UFO-Style Instant Show/Hide */
  .corner-btn:hover .tooltip,
  .flip-indicator:hover .tooltip,
  .color-swatch:hover .tooltip,
  .toolbar button:hover .tooltip,
  .buy-btn:hover .tooltip,
  .tier-btn:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
    transition: all 0.1s ease-out; /* Instant like UFO */
  }
  
  /* Instant hide when not hovering */
  .corner-btn:not(:hover) .tooltip,
  .flip-indicator:not(:hover) .tooltip,
  .color-swatch:not(:hover) .tooltip,
  .toolbar button:not(:hover) .tooltip,
  .buy-btn:not(:hover) .tooltip,
  .tier-btn:not(:hover) .tooltip {
    opacity: 0;
    transform: translateX(-50%) translateY(0.125rem) scale(0.95);
    transition: all 0.05s ease-in; /* Very fast hide */
  }
  
  /* Positioning adjustments */
  .color-swatch .tooltip,
  .toolbar button .tooltip,
  .buy-btn .tooltip,
  .tier-btn .tooltip {
    bottom: 3.5rem;
  }
  
  /* 🎨 FLIPCARD FOUNDATION */
  .flipcard-container {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
  }
  
  .flipcard-side:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  }
  
  /* 🎮 CORNER BUTTONS */
  .corner-buttons {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 10;
  }
  
  .corner-btn {
    position: absolute;
    pointer-events: auto;
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .corner-btn:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
  
  .top-left { top: 4px; left: 4px; }
  .top-right { top: 4px; right: 4px; }
  .bottom-left { bottom: 4px; left: 4px; }
  .bottom-right { bottom: 4px; right: 4px; }
  
  /* 🌈 GRADIENT BOX */
  .gradient-box {
    flex-shrink: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .icon-container {
    width: 60%;
    height: 60%;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
  
  /* 📝 TEXT CONTENT */
  .text-content {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 0.5rem;
  }
  
  .card-title {
    font-weight: 600;
    margin: 0;
    line-height: 1.1;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .card-tagline {
    font-weight: 400;
    margin: 0;
    line-height: 1.2;
    opacity: 0.85;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  /* 🔄 FLIP INDICATOR */
  .flip-indicator {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 5;
  }
  
  .flip-indicator:hover {
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
  }
  
  /* 📄 BACK CONTENT */
  .back-content {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  
  .back-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
    text-align: center;
  }
  
  .back-sections {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .back-section {
    background: rgba(255, 255, 255, 0.05);
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
    opacity: 0.9;
  }
  
  .features-list,
  .tech-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.875rem;
  }
  
  .features-list li::before {
    content: '✓ ';
    color: #10b981;
  }
  
  .tech-list li::before {
    content: '🔧 ';
  }
  
  /* 🏷️ SIMPLE TAGS */
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
    transition: color 0.2s ease;
  }
  
  .simple-tag:hover {
    color: #475569;
  }
  
  /* 🎨 COLOR PALETTE */
  .color-palette {
    display: flex;
    gap: 0.375rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    backdrop-filter: blur(10px);
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .color-swatch {
    width: 3rem;
    height: 2.5rem;
    border-radius: 0.375rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all 0.2s ease;
  }
  
  .color-swatch:hover {
    transform: translateY(-2px) scale(1.05);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  /* 🔧 TOOLBAR */
  .toolbar {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 0.75rem;
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
    transition: all 0.2s ease;
    font-size: 1rem;
  }
  
  .toolbar button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  
  /* 💳 BUY SECTION */
  .buy-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .buy-btn {
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
  }
  
  .buy-btn:hover {
    background: #1f1f1f;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .pricing-tiers {
    display: flex;
    gap: 0.5rem;
  }
  
  .tier-btn {
    flex: 1;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.1);
    color: #666;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .tier-btn:hover {
    background: rgba(0, 0, 0, 0.2);
    color: #333;
  }
  
  /* 🌗 RESPONSIVE & ACCESSIBILITY */
  @media (max-width: 640px) {
    .pricing-tiers {
      flex-direction: column;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>