/**
 * Domain Models for bAI Marketplace
 * These types define the core business entities and their relationships
 */

// ============================================
// PRODUCT DOMAIN
// ============================================

export interface Component {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  
  // Multi-audience naming strategy
  formal_name?: string;          // "Neural Omni Balance System"
  fintech_name?: string;         // "Next Open Billing Stack"
  api_name?: string;             // "Next Open Billing Software"
  consumer_tagline?: string;     // "No BS pay less"
  
  // Pricing (in cents for precision)
  price_individual: number;
  price_team: number;
  price_enterprise: number;
  
  // Search optimization
  category: ComponentCategory;
  tags: string[];
  keywords: string[];
  tech_stack: string[];
  
  // Display configuration
  flip_card_theme: FlipCardTheme;
  flip_card_size: FlipCardSize;
  
  // Quality metrics
  rating: number;
  download_count: number;
  
  // Status flags
  featured: boolean;
  is_api_product: boolean;
  is_active: boolean;
  is_published: boolean;
  
  // Computed search text (generated in DB)
  search_text?: string;
  
  created_at: string;
}

export type ComponentCategory = 
  | 'payment-processing'
  | 'blockchain-integration'
  | 'ui-components'
  | 'data-visualization'
  | 'authentication'
  | 'analytics'
  | 'developer-tools';

export type FlipCardTheme = 
  | 'wallet'
  | 'nft'
  | 'minimal'
  | 'premium'
  | 'api';

export type FlipCardSize = 
  | 'square'        // Instagram
  | 'story'         // Instagram/FB story
  | 'pinterest'     // Tall
  | 'twitter'       // Wide
  | 'standard'      // Default
  | 'compact'       // Small
  | 'hero'          // Large feature
  | 'mobile'        // Mobile optimized
  | 'desktop'       // Desktop optimized
  | 'coinbase'      // Wallet style
  | 'opensea'       // NFT marketplace style
  | 'github';       // Developer focused

// ============================================
// SEARCH DOMAIN
// ============================================

export interface SearchQuery {
  query: string;
  mode: 'traditional' | 'ai';
  filters?: SearchFilters;
}

export interface SearchFilters {
  category?: ComponentCategory;
  priceRange?: PriceRange;
  tags?: string[];
  sortBy?: 'relevance' | 'price' | 'rating' | 'downloads';
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface SearchResult {
  component: Component;
  relevanceScore: number;
  matchedKeywords: string[];
  aiConfidence?: number;
}

export interface SearchAnalytic {
  id: string;
  query: string;
  mode: 'search' | 'ai';
  results_count: number;
  response_time_ms: number;
  converted_to_purchase: boolean;
  timestamp: string;
}

// ============================================
// AI DOMAIN
// ============================================

export interface AIConversation {
  id: string;
  query: string;
  response: AIResponse;
  confidence: number;
  led_to_purchase: boolean;
  timestamp: string;
}

export interface AIResponse {
  message: string;
  recommendations: Component[];
  confidence: number;
  reasoning?: string;
}

export interface AIContext {
  conversationHistory: AIMessage[];
  userPreferences?: UserPreferences;
  currentCart?: CartItem[];
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ============================================
// PAYMENT DOMAIN
// ============================================

export interface PaymentProvider {
  id: 'stripe' | 'paypal' | 'coinbase';
  name: string;
  enabled: boolean;
  testMode: boolean;
}

export interface PaymentSession {
  id: string;
  amount: number;
  currency: string;
  provider: PaymentProvider['id'];
  status: PaymentStatus;
  customerEmail?: string;
  metadata?: Record<string, any>;
}

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface NOBSPayConfig {
  amount: number;
  currency: string;
  description?: string;
  customerEmail?: string;
  audience: AudienceType;
  theme?: FlipCardTheme;
  allowedMethods?: PaymentProvider['id'][];
  onSuccess?: (session: PaymentSession) => void;
  onError?: (error: Error) => void;
}

export type AudienceType = 
  | 'consumer'
  | 'developer'
  | 'enterprise'
  | 'fintech';

// ============================================
// ORDER DOMAIN
// ============================================

export interface Order {
  id: string;
  user_id?: string;
  items: OrderItem[];
  total_amount: number;
  payment_provider: PaymentProvider['id'];
  payment_status: PaymentStatus;
  discovered_via?: 'search' | 'ai' | 'browse' | 'direct';
  search_query?: string;
  created_at: string;
}

export interface OrderItem {
  component_id: string;
  component_name: string;
  license_type: 'individual' | 'team' | 'enterprise';
  price: number;
  quantity: number;
}

// ============================================
// CART DOMAIN
// ============================================

export interface CartItem {
  component: Component;
  license_type: 'individual' | 'team' | 'enterprise';
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// ============================================
// USER DOMAIN
// ============================================

export interface UserPreferences {
  preferredPaymentMethod?: PaymentProvider['id'];
  audienceType?: AudienceType;
  savedSearches?: string[];
  viewedComponents?: string[];
}

// ============================================
// ANALYTICS DOMAIN
// ============================================

export interface MarketplaceMetrics {
  totalSearches: number;
  averageResponseTime: number;
  successRate: number;
  topQueries: QueryMetric[];
  searchTrends: TrendData[];
  aiModeUsage: number;
  conversionRate: number;
}

export interface QueryMetric {
  query: string;
  count: number;
}

export interface TrendData {
  timestamp: string;
  searches: number;
  aiSearches: number;
  conversions: number;
}
