// FlipCard Product Creation System Types
// Complete type definitions for the 3-step workflow

export interface Position {
  x: number;
  y: number;
}

export interface DesignChange {
  type: 'color' | 'icon' | 'text' | 'layout';
  field: string;
  oldValue: any;
  newValue: any;
  timestamp: Date;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  animation_url?: string;
  external_url?: string;
}

export interface ProductAnalytics {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  averageTimeOnProduct: number;
  bounceRate: number;
}

export interface CatalogStats {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalViews: number;
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
}

// 🎨 MASTER CARD DESIGN (333x333px Perfect Design)
export interface MasterCardDesign {
  width: 333;
  height: 333;
  design: {
    colors: {
      primary: string;           // Main gradient (e.g., 'from-orange-400 to-red-500')
      secondary: string;         // Secondary gradient
      accent: string;            // Accent color
      theme: string;             // Theme name ('wallet', 'neon', etc.)
    };
    icon: {
      type: 'library' | 'custom' | 'ai-generated';
      svg: string;               // Complete SVG code
      size: number;              // Icon size at 333px master (e.g., 96px)
      position: Position;        // Icon placement
      color: string;             // Icon color
    };
    text: {
      title: {
        content: string;         // Product name
        fontSize: number;        // Font size at 333px master (e.g., 36px)
        fontWeight: number;      // Font weight (400, 600, 700)
        color: string;           // Text color
        position: Position;      // Text placement
        maxLength: 20;           // Character limit
      };
      tagline: {
        content: string;         // 4-5 word description
        fontSize: number;        // Font size at 333px master (e.g., 18px)
        fontWeight: number;      // Font weight
        color: string;           // Text color
        position: Position;      // Text placement
        maxLength: 30;           // Character limit
      };
    };
    layout: {
      padding: number;           // Card padding at 333px master (e.g., 20px)
      spacing: number;           // Element spacing
      borderRadius: number;      // Card border radius
      backgroundGradient: string; // Background gradient
    };
  };
}

// 📊 COMPREHENSIVE METADATA TRACKING
export interface FlipCardMetadata {
  // 🎨 DESIGN HISTORY
  designHistory: Array<{
    version: number;
    changes: DesignChange[];
    timestamp: Date;
    creator: string;
    notes?: string;
  }>;
  
  // 🛠️ CREATION PROCESS
  creationProcess: {
    timeSpent: number;              // Total design time (seconds)
    iterationCount: number;         // Number of design iterations
    toolsUsed: string[];            // Designer tools used
    colorChanges: number;           // Number of color adjustments
    iconChanges: number;            // Number of icon changes
    textEdits: number;              // Number of text modifications
    previewViews: number;           // Times preview was viewed
    exportAttempts: number;         // Number of export attempts
    startedAt: Date;                // When design session started
    lastActivity: Date;             // Last design activity
  };
  
  // 🎯 DESIGN QUALITY METRICS (0-100 scores)
  qualityMetrics: {
    colorHarmony: number;           // Color scheme quality
    textReadability: number;        // Text legibility
    iconClarity: number;            // Icon clarity
    overallComposition: number;     // Layout quality
    scalingQuality: number;         // How well it scales 1-8
    professionalScore: number;      // Overall professional appearance
  };
  
  // 🌍 USAGE ANALYTICS
  usageAnalytics: {
    viewsBySize: Record<number, number>;  // Views per SIZE-1 through SIZE-8
    interactionHeatmap: Position[];       // Click/hover positions
    timeOnProduct: number[];              // Session durations
    bounceRate: number;                   // Immediate exit rate
    conversionFunnel: {
      views: number;
      clicksToDemo: number;
      clicksToBuy: number;
      purchases: number;
      conversionRate: number;
    };
    popularSizes: number[];               // Most viewed sizes
  };
  
  // 🚀 TECHNICAL METADATA
  technical: {
    masterCardHash: string;         // SHA-256 hash of 333x333px design
    svgComplexity: number;          // Icon complexity score
    fileSize: number;               // Total asset size (bytes)
    renderPerformance: number;      // Rendering speed score
    compatibilityScore: number;     // Cross-browser compatibility
    accessibilityScore: number;     // A11y compliance score
    mobileOptimization: number;     // Mobile rendering quality
  };
  
  // 🎨 AI ENHANCEMENT DATA (Future Phase)
  aiEnhancements: {
    suggestedColors: string[];      // AI color suggestions
    suggestedIcons: string[];       // AI icon suggestions
    qualityImprovements: string[];  // AI improvement suggestions
    marketFit: number;              // AI market fit prediction
    trendinessScore: number;        // How "on-trend" the design is
    competitorAnalysis: string[];   // Similar products in market
  };
}

// 🎯 CORE FLIPCARD PRODUCT
export interface FlipCardProduct {
  // 🎯 CORE IDENTITY
  id: string;                      // Unique product identifier (UUID)
  name: string;                    // Product name (max 50 chars)
  slug: string;                    // URL-friendly identifier
  creator: string;                 // Creator username/ID
  creatorDisplayName: string;      // Creator display name
  
  // 🎨 DESIGN DATA (333x333px Master)
  masterCard: MasterCardDesign;
  
  // 📦 PRODUCT INFORMATION
  description: string;             // Full product description (max 500 chars)
  shortDescription: string;        // Brief description (max 100 chars)
  category: string;                // Primary category
  subcategory?: string;            // Optional subcategory
  tags: string[];                  // Multiple tags for discovery (max 10)
  features: string[];              // Key features list (max 8)
  techStack: string[];             // Technologies used (max 6)
  license: string;                 // License type (MIT, Commercial, etc.)
  
  // 💰 PRICING & SALES
  pricing: {
    individual: number;            // Individual license (cents)
    team: number;                  // Team license (5 users, cents)
    enterprise: number;            // Enterprise license (unlimited, cents)
    currency: string;              // Currency code (USD, EUR, etc.)
  };
  sales: {
    totalSales: number;            // Total units sold
    totalRevenue: number;          // Total revenue (cents)
    averageRating: number;         // Average rating (0-5)
    reviewCount: number;           // Number of reviews
    lastSaleAt?: Date;             // Last sale timestamp
  };
  
  // 🗂️ CATALOG ORGANIZATION
  catalogs: {
    personal: {
      catalogId: string;           // Personal catalog ID
      addedAt: Date;               // When added to personal catalog
      status: 'draft' | 'ready' | 'published' | 'archived';
      version: number;             // Product version number
      notes?: string;              // Private notes
    };
    master: {
      publishedAt: Date | null;    // When published to master catalog
      featured: boolean;           // Featured in master catalog
      visibility: 'public' | 'unlisted' | 'private';
      moderationStatus: 'pending' | 'approved' | 'rejected';
      featuredUntil?: Date;        // Featured expiration
    };
  };
  
  // 🎬 DEMO & DOCUMENTATION
  demo: {
    demoUrl?: string;              // Live demo URL
    githubUrl?: string;            // GitHub repository
    documentationUrl?: string;     // Documentation URL
    videoUrl?: string;             // Demo video URL
    screenshots: string[];         // Screenshot URLs
  };
  
  // ⚡️ NFT METADATA (Phase 2 Ready)
  nft: {
    mintable: boolean;             // Can be minted as NFT
    minted: boolean;               // Has been minted
    tokenId: string | null;        // NFT token ID
    contractAddress: string | null; // Smart contract address
    metadata: NFTMetadata | null;   // NFT metadata
    mintedAt?: Date;               // When minted
    mintPrice?: number;            // Mint price (cents)
    royaltyPercentage?: number;    // Creator royalty %
  };
  
  // 📈 ANALYTICS & TRACKING
  analytics: {
    views: number;                 // Total product views
    uniqueViews: number;           // Unique visitor views
    clicks: number;                // Total clicks
    conversions: number;           // Total purchases
    conversionRate: number;        // Conversion percentage
    designIterations: number;      // Number of design updates
    lastUpdated: Date;             // Last modification
    trending: boolean;             // Currently trending
    trendingScore: number;         // Trending algorithm score
  };
  
  // 🔒 PERMISSIONS & ACCESS
  permissions: {
    public: boolean;               // Publicly visible
    purchasable: boolean;          // Available for purchase
    downloadable: boolean;         // Can be downloaded
    forkable: boolean;             // Can be forked/copied
    modifiable: boolean;           // Can be modified by others
  };
  
  // 🕒 TIMESTAMPS
  createdAt: Date;                 // Created timestamp
  updatedAt: Date;                 // Last updated
  publishedAt: Date | null;        // Published to master catalog
  archivedAt?: Date;               // Archived timestamp
  
  // 📊 METADATA
  metadata: FlipCardMetadata;
}

// 📦 PERSONAL CATALOG
export interface PersonalCatalog {
  id: string;                      // Catalog ID
  owner: string;                   // Owner username/ID
  name: string;                    // Catalog name
  description?: string;            // Catalog description
  products: string[];              // Product IDs in this catalog
  settings: {
    privacy: 'private' | 'public' | 'unlisted';
    defaultTags: string[];         // Auto-applied tags
    autoPublish: boolean;          // Auto-add to master catalog
    allowForking: boolean;         // Allow others to fork designs
    requireApproval: boolean;      // Require approval before publish
  };
  stats: CatalogStats;
  createdAt: Date;
  updatedAt: Date;
}

// 🌍 MASTER CATALOG
export interface MasterCatalog {
  products: FlipCardProduct[];     // All public products
  categories: Category[];          // Product categories
  tags: Tag[];                     // All available tags
  featured: string[];              // Featured product IDs
  trending: string[];              // Trending product IDs
  filters: {
    byCategory: Record<string, string[]>;      // Category -> Product IDs
    byTag: Record<string, string[]>;           // Tag -> Product IDs
    byPrice: Record<string, string[]>;         // Price range -> Product IDs
    byCreator: Record<string, string[]>;       // Creator -> Product IDs
    byRating: Record<string, string[]>;        // Rating -> Product IDs
  };
  lastUpdated: Date;
}

// 🏷️ CATEGORY & TAG SYSTEM
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;                    // Icon SVG or emoji
  productCount: number;
  parentCategory?: string;         // For subcategories
  featured: boolean;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  category: 'technology' | 'design' | 'pricing' | 'quality' | 'feature';
  productCount: number;
  trending: boolean;
  color?: string;                  // Tag color for UI
}

// 🛒 PURCHASE & TRANSACTION
export interface PurchaseResult {
  success: boolean;
  transactionId?: string;
  productId: string;
  license: 'individual' | 'team' | 'enterprise';
  amount: number;                  // Amount paid (cents)
  currency: string;
  downloadUrl?: string;            // Download link
  error?: string;                  // Error message if failed
  timestamp: Date;
}

// 🔄 EXPORT FORMATS
export interface FlipCardExport {
  product: FlipCardProduct;
  format: 'json' | 'svg' | 'png' | 'pdf';
  masterCard333px: string;         // Base64 or URL
  scaledVersions?: Record<number, string>; // SIZE-1 to SIZE-8 exports
  metadata: FlipCardMetadata;
  exportedAt: Date;
  exportedBy: string;
}

// 🎨 DESIGNER STATE
export interface DesignerState {
  currentProduct: Partial<FlipCardProduct>;
  designConfig: {
    colors: MasterCardDesign['design']['colors'];
    icon: MasterCardDesign['design']['icon'];
    text: MasterCardDesign['design']['text'];
    layout: MasterCardDesign['design']['layout'];
  };
  previewSizes: number[];          // Which sizes to show in preview
  metadata: Partial<FlipCardMetadata>;
  isExporting: boolean;
  hasUnsavedChanges: boolean;
}