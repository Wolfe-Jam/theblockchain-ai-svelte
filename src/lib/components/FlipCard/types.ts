/**
 * 🎯 FlipCard Types - Professional TypeScript Definitions
 * 
 * Clean, universal types for the FlipCard component system.
 * Designed for distribution and professional use.
 */

export interface FlipCardProps {
  // 🎨 Core Design
  title: string;
  tagline?: string;
  gradient: [string, string]; // [startColor, endColor]
  icon?: string; // SVG string or emoji
  size: FlipCardSize;
  
  // 📊 Features (All Optional)
  showPalette?: boolean;
  showTags?: boolean;
  showToolbar?: boolean;
  showBuyButton?: boolean;
  
  // 🏷️ Data
  tags?: string[];
  pricing?: FlipCardPricing;
  
  // 🎛️ Customization
  theme?: 'light' | 'dark';
  interactive?: boolean;
  cornerButtons?: boolean;
  
  // 📝 Content (Back Side)
  description?: string;
  features?: string[];
  techStack?: string[];
}

export type FlipCardSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface FlipCardPricing {
  individual: number; // Price in cents
  team: number;       // Price in cents
  enterprise: number; // Price in cents
}

export interface FlipCardTheme {
  cardBg: string;
  textColor: string;
  shadowColor: string;
}

export interface FlipCardEvents {
  flip: { side: 'front' | 'back' };
  purchase: { tier: 'individual' | 'team' | 'enterprise'; amount: number };
  favorite: { favorited: boolean };
  'add-to-cart': { item: FlipCardItem };
}

export interface FlipCardItem {
  title: string;
  pricing: FlipCardPricing;
  tags: string[];
  gradient: [string, string];
}

// 📐 Mathematical Size System Constants
export const FLIPCARD_SIZES: Record<FlipCardSize, number> = {
  1: 88,   // Micro Badge
  2: 111,  // Tiny Perfect
  3: 166,  // Small Grid
  4: 222,  // Compact
  5: 333,  // Master Baseline
  6: 444,  // Large Display
  7: 555,  // Feature Hero
  8: 777,  // Showcase
  9: 999   // Mega Hero
};

export const FLIPCARD_MASTER_SIZE = 333; // SIZE-5 baseline

// 🎨 Pre-defined Gradient Presets
export const FLIPCARD_GRADIENTS = {
  payment: ['#fb923c', '#ef4444'] as [string, string],
  professional: ['#22d3ee', '#3b82f6'] as [string, string],
  success: ['#34d399', '#14b8a6'] as [string, string],
  royal: ['#a855f7', '#ec4899'] as [string, string],
  modern: ['#60a5fa', '#06b6d4'] as [string, string],
  sunset: ['#fbbf24', '#f97316'] as [string, string],
  slate: ['#64748b', '#334155'] as [string, string],
  neon: ['#ec4899', '#f43f5e'] as [string, string],
} as const;

// 🎯 Utility Functions
export function formatFlipCardPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function validateFlipCardSize(size: number): size is FlipCardSize {
  return size >= 1 && size <= 9 && Number.isInteger(size);
}

export function getFlipCardDimensions(size: FlipCardSize): { width: number; height: number } {
  const dimension = FLIPCARD_SIZES[size];
  return { width: dimension, height: dimension };
}
