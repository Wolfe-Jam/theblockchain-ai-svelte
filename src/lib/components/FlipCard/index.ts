/**
 * 🎯 FlipCard - Professional UI Component System
 * 
 * Export everything needed for clean imports:
 * 
 * // New 1st class component
 * import { FlipCard } from '$lib/components/FlipCard';
 * 
 * // Marketplace adapter (backward compatibility)
 * import { MarketplaceAdapter } from '$lib/components/FlipCard';
 * 
 * // Types and utilities
 * import { FLIPCARD_GRADIENTS, type FlipCardProps } from '$lib/components/FlipCard';
 */

export { default as FlipCard } from './FlipCard.svelte';
export { default as MarketplaceAdapter } from './MarketplaceAdapter.svelte';
export * from './types';
