<!-- 
  🔄 FlipCard Marketplace Adapter
  
  This adapter connects the new 1st class FlipCard component to the existing 
  marketplace system while maintaining backward compatibility.
  
  Eventually, this can be removed once the marketplace fully adopts the 
  new component architecture.
-->
<script lang="ts">
  import { FlipCard } from '$lib/components/FlipCard';
  import { flipcardPreferences } from '$lib/stores/flipcardPreferences';
  import type { Component } from '$lib/marketplace/types';
  
  // 📦 MARKETPLACE PROPS (Legacy)
  export let component: Component;
  export let size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5;
  export let theme: 'professional' | 'wallet' | 'neon' | 'gradient' | 'solid' = 'professional';
  export let displayOnly: boolean = false;
  export let iconType: 'checkmark' | 'custom' | 'component' = 'checkmark';
  export let customIconSvg: string = '';
  
  // 🔄 ADAPTER LOGIC - Convert marketplace data to 1st class FlipCard props
  
  // Extract gradient from component or theme
  function getGradient(): [string, string] {
    if (component.flip_card_color) {
      // Extract colors from custom gradient
      const hexMatches = component.flip_card_color.match(/#[0-9a-f]{6}/gi);
      if (hexMatches && hexMatches.length >= 2) {
        return [hexMatches[0], hexMatches[1]];
      }
    }
    
    // Default gradients based on theme
    const themeGradients = {
      professional: ['#22d3ee', '#3b82f6'],
      wallet: ['#fb923c', '#ef4444'],
      neon: ['#a855f7', '#ec4899'],
      gradient: ['#60a5fa', '#06b6d4'],
      solid: ['#64748b', '#334155']
    };
    
    return themeGradients[theme] as [string, string];
  }
  
  // Get icon based on category and type
  function getIcon(): string {
    if (customIconSvg) return customIconSvg;
    
    // Category-based icons
    if (component.category === 'payment-processing') {
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      `;
    }
    
    // Default component icon
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <rect x="7" y="7" width="3" height="3"></rect>
        <rect x="14" y="7" width="3" height="3"></rect>
        <rect x="7" y="14" width="3" height="3"></rect>
        <rect x="14" y="14" width="3" height="3"></rect>
      </svg>
    `;
  }
  
  // Convert marketplace pricing to FlipCard format
  function getPricing() {
    return {
      individual: component.price_individual || 19900,
      team: component.price_team || 49900,
      enterprise: component.price_enterprise || 149900
    };
  }
  
  // Clean up tags
  function getTags(): string[] {
    return component.tags?.slice(0, 3) || ['component', 'svelte', 'pro'];
  }
  
  // Event handlers - forward to marketplace
  function handlePurchase(event: CustomEvent) {
    const { tier, amount } = event.detail;
    // Forward to marketplace purchase logic
    console.log('Marketplace purchase:', { component, tier, amount });
  }
  
  function handleFlip(event: CustomEvent) {
    const { side } = event.detail;
    console.log('Card flipped to:', side);
  }
  
  function handleFavorite(event: CustomEvent) {
    const { favorited } = event.detail;
    console.log('Favorite toggled:', favorited);
  }
  
  function handleAddToCart(event: CustomEvent) {
    const { item } = event.detail;
    console.log('Added to cart:', item);
  }
</script>

<!-- 🎯 NEW 1ST CLASS FLIPCARD -->
<FlipCard 
  title={component.name}
  tagline={component.consumer_tagline || 'Professional Component'}
  gradient={getGradient()}
  icon={getIcon()}
  {size}
  showPalette={!displayOnly && $flipcardPreferences.showPalette}
  showTags={!displayOnly && $flipcardPreferences.showTags}
  showToolbar={!displayOnly && $flipcardPreferences.showToolbar}
  showBuyButton={!displayOnly && $flipcardPreferences.showBuyButton}
  tags={getTags()}
  pricing={getPricing()}
  interactive={!displayOnly}
  cornerButtons={!displayOnly}
  theme="dark"
  description={component.description || 'Professional component with enterprise-grade features and beautiful design.'}
  features={component.developer_features?.slice(0, 4) || [
    'Professional visual design',
    'Enterprise-grade quality',
    'Mathematical precision',
    'Universal compatibility'
  ]}
  techStack={component.tech_stack || ['SvelteKit', 'TypeScript', 'Tailwind']}
  on:purchase={handlePurchase}
  on:flip={handleFlip}
  on:favorite={handleFavorite}
  on:add-to-cart={handleAddToCart}
/>
