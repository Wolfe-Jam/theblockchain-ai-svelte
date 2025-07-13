<!-- FlipCard.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Component } from '$lib/marketplace/types';
  
  export let component: Component;
  export let theme: 'wallet' | 'neon' | 'gradient' | 'solid' = 'solid';
  
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
  class="flip-card"
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
      <!-- Category badge -->
      <div class="category-badge">
        {(component.category || 'Component').replace('-', ' ')}
      </div>
      
      <!-- Main content area -->
      <div class="card-content">
        <!-- Icon/Graphic area -->
        <div class="icon-area">
          <!-- Use ✅ checkmark for all cards -->
          <div class="checkmark-icon">✅</div>
        </div>
        
        <!-- Title and tagline -->
        <h3 class="card-title">{component.name}</h3>
        <p class="card-tagline">{component.consumer_tagline || component.tagline}</p>
      </div>
      
      <!-- Action button -->
      <div class="front-action">
        <button 
          class="btn-mint"
          on:click={handleBuyNow}
          aria-label="Buy {component.name}"
        >
          BUY
        </button>
      </div>
      
      <!-- Flip indicator -->
      <div class="flip-indicator">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
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
              class="btn-mint"
              on:click={handleBuyNow}
              aria-label="Buy {component.name}"
            >
              BUY
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
    height: 400px;
    perspective: 1000px;
    cursor: pointer;
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
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
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
    justify-content: center;
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .icon-area {
    margin-bottom: 2rem;
    position: relative;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding: 0 1rem;
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
    animation: pulse 2s infinite;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 1rem;
    height: 1rem;
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
      padding: 1.5rem;
      margin-bottom: 1.5rem;
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