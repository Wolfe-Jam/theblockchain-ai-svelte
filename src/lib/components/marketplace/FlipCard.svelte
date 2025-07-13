<!-- FlipCard.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Component } from '$lib/marketplace/types';
  // Props from parent 
  export let component: Component;
  export let theme: 'wallet' | 'neon' | 'gradient' | 'solid' = 'solid';
  export let aspectRatio: 'square' | 'portrait' | 'postcard' = 'square';
  export let displayOnly: boolean = false; // NEW: Pure display mode (no BUY buttons)
  export let iconType: 'checkmark' | 'custom' | 'component' = 'checkmark';
  export let customIconSvg: string = '';
  
  const dispatch = createEventDispatcher();
  
  let isFlipped = false;
  let cardElement: HTMLDivElement;
  
  // Theme configurations
  const themes = {
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
    emerald: {
      front: 'bg-gradient-to-br from-emerald-400 to-teal-600',
      back: 'bg-gradient-to-br from-emerald-500 to-teal-700',
      accent: 'text-white'
    },
    royal: {
      front: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      back: 'bg-gradient-to-br from-indigo-600 to-purple-700',
      accent: 'text-white'
    },
    sunset: {
      front: 'bg-gradient-to-br from-amber-400 to-orange-500',
      back: 'bg-gradient-to-br from-amber-500 to-orange-600',
      accent: 'text-white'
    },
    solid: {
      front: 'bg-gray-800',
      back: 'bg-gray-900',
      accent: 'text-white'
    }
  };
  
  // Get theme colors based on component category
  function getThemeForCategory(category: string) {
    switch(category) {
      case 'payment-processing':
        return themes.wallet;
      case 'data-visualization':
        return themes.neon;
      case 'authentication':
        return themes.gradient;
      default:
        return themes.solid;
    }
  }
  
  // Use dynamic colors from component data or theme fallback
  $: currentTheme = component.flip_card_color ? {
    front: `bg-gradient-to-br ${component.flip_card_color}`,
    back: `bg-gradient-to-br ${component.flip_card_color}`,
    accent: 'text-white'
  } : getThemeForCategory(component.category);
  
  // 🎨 Aspect ratio configurations (HEIGHT-ONLY adjustment)
  // Width is controlled by flex grid (1-8 cards per row)
  // These heights create different aspect ratios relative to flex width
  const aspectRatios = {
    square: {
      height: 'auto', // Height = Width (perfect square)
      aspectClass: 'aspect-square',
      description: '1:1 Classic'
    },
    portrait: {
      height: 'auto', // Height = Width * 4/3 (taller)
      aspectClass: 'aspect-[3/4]',
      description: '3:4 Modern'
    },
    postcard: {
      height: 'auto', // Height = Width * 3/4 (wider)
      aspectClass: 'aspect-[4/3]',
      description: '4:3 Landscape'
    }
  };
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
  
  // Get appropriate icon based on component type
  function getComponentIcon(): string {
    if (customIconSvg) return customIconSvg;
    
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
  
  // Smart icon selection based on component category
  function getSmartIcon(): string {
    if (customIconSvg) return customIconSvg;
    
    if (component.category === 'payment-processing') {
      return iconSvgs.payment;
    }
    
    return getComponentIcon();
  }
  
  function handleFlip() {
    isFlipped = !isFlipped;
  }
  
  function handleBuyNow(e: Event) {
    e.stopPropagation();
    dispatch('buy', component);
  }
  
  function handleDemo(e: Event) {
    e.stopPropagation();
    // Map component names to demo slugs
    const demoSlugMap: { [key: string]: string } = {
      'NOBS Pay': 'nobs-pay',
      'DataViz Pro': 'dataviz-pro', 
      'Auth Shield': 'auth-shield'
    };
    
    const demoSlug = demoSlugMap[component.name] || component.slug || component.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
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

<div 
  class="flip-card {aspectRatios[aspectRatio].aspectClass}"
  bind:this={cardElement}
  on:click={handleFlip}
  on:keydown={(e) => e.key === 'Enter' && handleFlip()}
  role="button"
  tabindex="0"
  aria-label="Flip card for {component.name}"
>
  <div class="flip-card-inner" class:flipped={isFlipped}>
    <!-- Front of card -->
    <div class="flip-card-front {currentTheme.front} {currentTheme.accent}">
      <!-- Main content area -->
      <div class="card-content">
        <!-- Icon/Graphic area -->
        <div class="icon-area">
          <!-- Vector SVG Icon (Image) -->
          <div class="svg-icon-container">
            {@html getSmartIcon()}
          </div>
        </div>
        
        <!-- Title -->
        <h3 class="card-title">{component.name}</h3>
        
        <!-- Tagline -->
        <p class="card-tagline">{component.consumer_tagline || component.tagline}</p>
      </div>
      
      <!-- Flip indicator (pure display mode) -->
      {#if !displayOnly}
        <div class="flip-indicator">
          <button 
            class="flip-icon-btn"
            on:click|stopPropagation={handleFlip}
            aria-label="Flip card to see details"
            title="Flip card"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      {/if}
    </div>
    
    <!-- Back of card -->
    <div class="flip-card-back {currentTheme.back} {currentTheme.accent}">
      <div class="back-content">
        <h3 class="back-title">{component.name}</h3>
        
        <!-- Description -->
        <p class="back-description">{component.description}</p>
        
        <!-- Features -->
        <div class="features-list">
          <h4 class="features-title">Key Features:</h4>
          <ul>
            {#each (component.developer_features || ['Easy Integration', 'Full Documentation', 'TypeScript Support', 'Mobile Responsive']).slice(0, 4) as feature}
              <li>{feature}</li>
            {/each}
          </ul>
        </div>
        
        <!-- Tech stack -->
        <div class="tech-stack">
          {#each (component.tech_stack || ['Svelte', 'TypeScript', 'JavaScript']).slice(0, 3) as tech}
            <span class="tech-badge">{tech}</span>
          {/each}
        </div>
        
        <!-- Pricing and Action Section -->
        <div class="pricing-section">
          <!-- All pricing tiers -->
          <div class="pricing-tiers">
            <div class="tier tier-primary">
              <span class="tier-name">Individual</span>
              <span class="tier-price">{formatPrice(component.price || component.price_individual)}</span>
            </div>
            {#if component.price_team}
              <div class="tier">
                <span class="tier-name">Team</span>
                <span class="tier-price">{formatPrice(component.price_team)}</span>
              </div>
            {/if}
          </div>
          
          <!-- Action buttons -->
          <div class="back-actions">
            <button 
              class="btn-mint btn-buy-enhanced"
              on:click={handleBuyNow}
              aria-label="Buy {component.name}"
              title="BUY ⚡️"
            >
              <span class="btn-buy-content">
                <svg class="lightning-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z"/>
                </svg>
                BUY
              </span>
            </button>
            
            <div class="secondary-actions">
              {#if component.demo_url}
                <button 
                  class="btn-demo"
                  on:click={handleDemo}
                  aria-label="Try demo"
                >
                  Demo
                </button>
              {/if}
              <button 
                class="btn-details"
                on:click={handleDetails}
                aria-label="View details"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
        
        <!-- Flip indicator (back) -->
        <div class="flip-indicator">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .flip-card {
    width: 100%;
    /* Height now controlled by aspect ratio */
    perspective: 1000px;
    cursor: pointer;
    min-height: 300px; /* Ensure minimum height for content */
  }
  
  .flip-card:hover .flip-card-inner:not(.flipped) {
    transform: rotateY(10deg);
  }
  
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .flip-card-inner.flipped {
    transform: rotateY(180deg);
  }
  
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    overflow: visible; /* Changed from hidden to ensure BUY button shows */
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
    min-height: 100%; /* Ensure full height usage */
  }
  
  .flip-card-front::before,
  .flip-card-back::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .flip-card-back {
    transform: rotateY(180deg);
  }
  
  /* Front styles */
  .category-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Changed from center to start */
    text-align: center;
    padding: 1.5rem 1rem 1rem 1rem; /* Reduced padding */
    min-height: 0; /* Allow shrinking */
  }
  
  .icon-area {
    margin-bottom: 1.5rem;
    position: relative;
    padding: 1.5rem 1rem 1rem 1rem; /* Top padding modest, reduced bottom */
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;        /* Horizontal center (keep) */
    justify-content: flex-start; /* Top align (changed from center) */
  }
  
  /* 🎨 NEW: SVG Icon Container */
  .svg-icon-container {
    width: 6rem;
    height: 6rem;
    color: white;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    animation: pulse 2s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .svg-icon-container svg {
    width: 100%;
    height: 100%;
    stroke-width: 2.5;
  }
  
  /* 🎯 NEW: Text Below Icon */
  .icon-text {
    margin-top: 1rem;
    text-align: center;
  }
  
  .icon-label {
    font-size: 0.875rem;
    font-weight: 600;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(10px);
  }
  
  .checkmark-icon {
    font-size: 6rem;
    line-height: 1;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { 
      opacity: 0.9;
      transform: scale(1);
    }
    50% { 
      opacity: 1;
      transform: scale(1.05);
    }
  }
  
  .icon-placeholder {
    width: 6rem;
    height: 6rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
    border-radius: 1.25rem;
    position: relative;
    overflow: hidden;
  }
  
  .icon-placeholder::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  
  .card-title {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .card-tagline {
    font-size: 1.125rem;
    opacity: 0.9;
    max-width: 90%;
    line-height: 1.4;
  }
  
  .front-action {
    margin-top: auto;
    padding: 0.5rem 1rem 0.5rem 1rem; /* Added bottom padding */
    flex-shrink: 0; /* Prevent shrinking */
  }
  
  .btn-mint {
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    color: #1f2937;
    padding: 0.875rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
    backdrop-filter: blur(10px);
  }
  
  .btn-mint:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Enhanced BUY Button with Lightning Bolt & Feel-Good Factor */
  .btn-buy-enhanced {
    background: rgba(255, 255, 255, 0.85) !important;
    backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
    border-radius: 12px; /* Rounded square - perfect for "BUY" text */
    position: relative;
    overflow: hidden;
  }
  
  .btn-buy-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
  }
  
  .btn-buy-enhanced:hover::before {
    left: 100%;
  }
  
  .btn-buy-enhanced:hover {
    background: rgba(255, 255, 255, 0.95) !important;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  .btn-buy-enhanced:active {
    transform: translateY(-1px) scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .btn-buy-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    position: relative;
    z-index: 1;
  }
  
  .lightning-icon {
    width: 1rem;
    height: 1rem;
    color: #f59e0b; /* Amber for energy */
    filter: drop-shadow(0 1px 2px rgba(245, 158, 11, 0.3));
    transition: all 0.2s ease;
  }
  
  .btn-buy-enhanced:hover .lightning-icon {
    color: #f97316; /* Orange on hover for more energy */
    transform: scale(1.1);
    filter: drop-shadow(0 2px 4px rgba(249, 115, 22, 0.4));
  }
  
  .price-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  
  .price {
    font-size: 2.25rem;
    font-weight: 700;
  }
  
  .price-label {
    font-size: 0.875rem;
    opacity: 0.8;
  }
  
  .action-buttons {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  
  .btn-primary {
    background: rgba(255, 255, 255, 0.9);
    color: #1f2937;
    position: relative;
    overflow: hidden;
  }
  
  .btn-primary:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .buy-button {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white !important;
    font-weight: 700;
    letter-spacing: 0.025em;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }
  
  .buy-button:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }
  
  .buy-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  .buy-button:hover::before {
    left: 100%;
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    backdrop-filter: blur(10px);
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .flip-indicator {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    opacity: 0.6;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .flip-icon-btn, .compact-buy-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
  }
  
  .flip-icon-btn {
    color: rgba(255, 255, 255, 0.8);
    animation: pulse 2s infinite;
  }
  
  .compact-buy-btn {
    background: rgba(255, 255, 255, 0.4) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  }
  
  .flip-icon-btn:hover, .compact-buy-btn:hover {
    background: rgba(255, 255, 255, 0.6) !important;
    transform: scale(1.15);
    opacity: 1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
  }
  
  .lightning-icon-compact {
    width: 1.1rem;
    height: 1.1rem;
    color: #f59e0b;
    filter: drop-shadow(0 2px 4px rgba(245, 158, 11, 0.4));
  }
  
  .compact-buy-btn:hover .lightning-icon-compact {
    color: #f97316;
    transform: scale(1.1);
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  
  /* Back styles */
  .back-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .back-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .back-description {
    font-size: 0.875rem;
    line-height: 1.5;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
  
  .features-list {
    margin-bottom: 1.5rem;
  }
  
  .features-title {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
  
  .features-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .features-list li {
    font-size: 0.75rem;
    padding: 0.25rem 0;
    padding-left: 1rem;
    position: relative;
  }
  
  .features-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    opacity: 0.8;
  }
  
  .tech-stack {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
  
  .tech-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    backdrop-filter: blur(10px);
  }
  
  .pricing-section {
    margin-top: auto;
  }
  
  .pricing-tiers {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .tier {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem;
    border-radius: 0.5rem;
    text-align: center;
  }
  
  .tier-primary {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .tier-name {
    display: block;
    font-size: 0.75rem;
    opacity: 0.8;
    margin-bottom: 0.25rem;
  }
  
  .tier-price {
    display: block;
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  .back-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: auto;
  }
  
  .back-actions .btn-mint {
    background: rgba(255, 255, 255, 0.9);
    color: #1f2937;
    padding: 0.875rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .back-actions .btn-mint:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .secondary-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn-demo,
  .btn-details {
    flex: 1;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.625rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.875rem;
    backdrop-filter: blur(10px);
  }
  
  .btn-demo:hover,
  .btn-details:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  /* Dark mode adjustments */
  :global(.dark) .btn-primary,
  :global(.dark) .btn-details {
    background: rgba(255, 255, 255, 0.9);
    color: #1f2937;
  }
  
  :global(.dark) .btn-primary:hover,
  :global(.dark) .btn-details:hover {
    background: white;
  }
  
  /* Mobile responsive */
  @media (max-width: 640px) {
    .flip-card {
      height: 400px;
    }
    
    .card-title {
      font-size: 1.5rem;
    }
    
    .card-tagline {
      font-size: 1rem;
    }
    
    .icon-area {
      padding: 1.25rem 1rem 1rem 1rem; /* Modest top padding for mobile */
      margin-bottom: 1.25rem;
    }
    
    .icon-placeholder {
      width: 5rem;
      height: 5rem;
    }
    
    .card-content {
      padding: 2rem 1rem;
    }
    
    .back-actions {
      gap: 0.5rem;
    }
    
    .secondary-actions {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .btn-mint {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
    }
  }
</style>