<!-- Enhanced FlipCardDesigner with Complete Product Creation System -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import FlipCard from './FlipCard.svelte';
  import type { 
    FlipCardProduct, 
    MasterCardDesign, 
    FlipCardMetadata, 
    DesignerState,
    FlipCardExport 
  } from '$lib/types/flipcard';
  
  const dispatch = createEventDispatcher();
  
  // 📐 MATHEMATICAL SIZE SYSTEM ⭐ CRITICAL
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
  
  const GRAPHICS_RATIO = 2/3; // 66.6% of FlipCard size
  
  // Get graphics box size for any card size
  function getGraphicsSize(cardSize: number): number {
    return Math.round(cardSize * GRAPHICS_RATIO);
  }
  
  // 🎨 ENHANCED DESIGNER STATE
  let designerState: DesignerState = {
    currentProduct: {},
    designConfig: {
      colors: {
        primary: 'from-cyan-400 to-blue-500', // Match reference image
        secondary: 'from-cyan-500 to-blue-600',
        accent: '#ffffff',
        theme: 'professional'
      },
      icon: {
        type: 'library',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>`,
        size: getGraphicsSize(MASTER_SIZE), // 222px for SIZE-5
        position: { x: MASTER_SIZE / 2, y: MASTER_SIZE / 2 - 20 },
        color: '#ffffff'
      },
      text: {
        title: {
          content: 'NOBS PAY',
          fontSize: 36,  // Perfect for 333px master card
          fontFamily: 'Inter',
          fontWeight: 600,
          color: '#ffffff',
          position: { x: MASTER_SIZE / 2, y: MASTER_SIZE / 2 + 40 },
          maxLength: 20
        },
        tagline: {
          content: 'Done for You Billing',
          fontSize: 18,
          fontFamily: 'Inter',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.9)',
          position: { x: MASTER_SIZE / 2, y: MASTER_SIZE / 2 + 65 },
          maxLength: 30
        }
      },
      layout: {
        padding: 20,
        spacing: 16,
        borderRadius: 16,
        backgroundGradient: 'from-cyan-400 to-blue-500'
      }
    },
    previewSizes: [1, 3, 6, 8], // Mathematical sizes to preview
    metadata: {
      designHistory: [],
      creationProcess: {
        timeSpent: 0,
        iterationCount: 0,
        toolsUsed: ['color-picker', 'icon-selector', 'text-editor'],
        colorChanges: 0,
        iconChanges: 0,
        textEdits: 0,
        previewViews: 0,
        exportAttempts: 0,
        startedAt: new Date(),
        lastActivity: new Date()
      },
      qualityMetrics: {
        colorHarmony: 90,
        textReadability: 92,
        iconClarity: 88,
        overallComposition: 90,
        scalingQuality: 95,
        professionalScore: 91
      },
      usageAnalytics: {
        viewsBySize: {},
        interactionHeatmap: [],
        timeOnProduct: [],
        bounceRate: 0,
        conversionFunnel: {
          views: 0,
          clicksToDemo: 0,
          clicksToBuy: 0,
          purchases: 0,
          conversionRate: 0
        },
        popularSizes: [3, 5, 6]
      },
      technical: {
        masterCardHash: '',
        svgComplexity: 45,
        fileSize: 12800,
        renderPerformance: 95,
        compatibilityScore: 98,
        accessibilityScore: 85,
        mobileOptimization: 92
      },
      aiEnhancements: {
        suggestedColors: [],
        suggestedIcons: [],
        qualityImprovements: [],
        marketFit: 0,
        trendinessScore: 0,
        competitorAnalysis: []
      }
    },
    isExporting: false,
    hasUnsavedChanges: false
  };
  
  // Component visibility toggles
  let showColorPalette = true;
  let showTags = true;
  let showToolbar = true;
  let showBuyComponent = true;
  
  // Color extraction for palette
  let extractedColors: string[] = [];
  
  // Tags
  let visibleTags = ['#payment', '#stripe', '#billing'];
  let autoTags = ['tech-svelte', 'color-cyan', 'premium-quality'];
  
  // 🎨 ENHANCED COLOR THEMES
  const colorThemes = [
    { name: 'Professional Cyan', value: 'from-cyan-400 to-blue-500', category: 'professional', hex: '#06b6d4' },
    { name: 'Payment Orange', value: 'from-orange-400 to-red-500', category: 'payment', hex: '#fb923c' },
    { name: 'Auth Blue', value: 'from-blue-400 to-cyan-500', category: 'auth', hex: '#60a5fa' },
    { name: 'Data Purple', value: 'from-purple-500 to-pink-500', category: 'data', hex: '#a855f7' },
    { name: 'Success Green', value: 'from-emerald-400 to-teal-600', category: 'success', hex: '#34d399' },
    { name: 'Royal Indigo', value: 'from-indigo-500 to-purple-600', category: 'premium', hex: '#6366f1' },
    { name: 'Sunset Amber', value: 'from-amber-400 to-orange-500', category: 'warm', hex: '#fbbf24' },
    { name: 'Neon Pink', value: 'from-pink-500 to-rose-500', category: 'vibrant', hex: '#ec4899' }
  ];
  
  // 🎨 CURATED FONT SYSTEM
  const CORE_FONTS = [
    { name: 'Inter', value: 'Inter', style: 'Clean & Professional' },
    { name: 'Poppins', value: 'Poppins', style: 'Friendly & Rounded' },
    { name: 'JetBrains Mono', value: 'JetBrains Mono', style: 'Technical & Dev' },
    { name: 'Playfair Display', value: 'Playfair Display', style: 'Elegant & Premium' },
    { name: 'Oswald', value: 'Oswald', style: 'Bold & Impact' },
    { name: 'Nunito Sans', value: 'Nunito Sans', style: 'Geometric & Designer' },
    { name: 'Space Grotesk', value: 'Space Grotesk', style: 'Modern & Startup' },
    { name: 'Fira Code', value: 'Fira Code', style: 'Modern Mono' }
  ];
  
  // 📦 MIT-LICENSED ICON LIBRARY
  const iconLibrary = [
    {
      name: 'Credit Card',
      category: 'payment',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>`
    },
    {
      name: 'Lightning Bolt',
      category: 'payment',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-3 8 10-12h-7l4-8z"/>
            </svg>`
    },
    {
      name: 'Wallet',
      category: 'payment',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12V7H5a2 2 0 010-4h14v4"/>
              <path d="M3 5v14a2 2 0 002 2h16v-5"/>
              <path d="M18 12a2 2 0 000 4h4v-4z"/>
            </svg>`
    },
    {
      name: 'Dollar Sign',
      category: 'payment',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>
            </svg>`
    },
    {
      name: 'Shield Check',
      category: 'security',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>`
    },
    {
      name: 'Database',
      category: 'data',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>`
    },
    {
      name: 'Settings',
      category: 'system',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m3.22-10.22l4.24-4.24M6.34 18.66l4.24-4.24m0 4.24l-4.24-4.24M17.66 18.66l-4.24-4.24"/>
            </svg>`
    },
    {
      name: 'Code',
      category: 'technical',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>`
    }
  ];
  
  // 🕒 SESSION TRACKING
  let sessionStartTime = Date.now();
  let lastActivityTime = Date.now();
  
  // Extract colors from current design
  function extractColors(): string[] {
    const theme = colorThemes.find(t => t.value === designerState.designConfig.colors.primary);
    if (!theme) return ['#06b6d4', '#3b82f6', '#0ea5e9', '#0284c7', '#0369a1'];
    
    // Extract 5 colors from the gradient
    const colors = [];
    const hex = theme.hex;
    
    // Generate 5 harmonious colors based on the primary
    colors.push(hex); // Primary
    colors.push(adjustColor(hex, 20)); // Lighter
    colors.push(adjustColor(hex, -20)); // Darker
    colors.push(adjustColor(hex, 40)); // Much lighter
    colors.push(adjustColor(hex, -40)); // Much darker
    
    return colors;
  }
  
  // Helper to adjust color brightness
  function adjustColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  
  // ⚡️ REACTIVITY
  $: {
    lastActivityTime = Date.now();
    designerState.hasUnsavedChanges = true;
    designerState.metadata.creationProcess.lastActivity = new Date();
    extractedColors = extractColors();
  }
  
  $: previewComponent = generatePreviewComponent(designerState.designConfig);
  
  // 🎯 GENERATE PREVIEW COMPONENT
  function generatePreviewComponent(designConfig: typeof designerState.designConfig) {
    return {
      id: 'designer-preview',
      name: designConfig.text.title.content,
      consumer_tagline: designConfig.text.tagline.content,
      description: `Professional ${designConfig.text.title.content} component.`,
      category: 'payment-processing',
      price: 19900,
      price_individual: 19900,
      price_team: 49900,
      price_enterprise: 149900,
      flip_card_color: designConfig.colors.primary,
      tech_stack: ['Svelte', 'TypeScript', 'Payments'],
      developer_features: [
        'Universal Payment Support',
        'TypeScript Ready',
        'Mobile Responsive',
        'Easy Integration'
      ]
    };
  }
  
  // 🎨 EVENT HANDLERS
  function selectColorTheme(theme: typeof colorThemes[0]) {
    trackDesignChange('color', 'primary', designerState.designConfig.colors.primary, theme.value);
    
    designerState.designConfig.colors.primary = theme.value;
    designerState.designConfig.colors.secondary = theme.value.replace('400', '500').replace('500', '600');
    designerState.designConfig.layout.backgroundGradient = theme.value;
    
    designerState.metadata.creationProcess.colorChanges++;
    designerState = { ...designerState };
  }
  
  function selectIcon(icon: typeof iconLibrary[0]) {
    trackDesignChange('icon', 'svg', designerState.designConfig.icon.svg, icon.svg);
    
    designerState.designConfig.icon = {
      ...designerState.designConfig.icon,
      type: 'library',
      svg: icon.svg
    };
    
    designerState.metadata.creationProcess.iconChanges++;
    designerState = { ...designerState };
  }
  
  function updateText(field: 'title' | 'tagline', property: string, value: string | number) {
    const oldValue = (designerState.designConfig.text[field] as any)[property];
    trackDesignChange('text', `${field}.${property}`, oldValue, value);
    
    (designerState.designConfig.text[field] as any)[property] = value;
    designerState.metadata.creationProcess.textEdits++;
    designerState = { ...designerState };
  }
  
  function selectFont(field: 'title' | 'tagline', font: typeof CORE_FONTS[0]) {
    updateText(field, 'fontFamily', font.value);
  }
  
  function trackDesignChange(type: string, field: string, oldValue: any, newValue: any) {
    const change = {
      type: type as any,
      field,
      oldValue,
      newValue,
      timestamp: new Date()
    };
    
    designerState.metadata.designHistory.push({
      version: designerState.metadata.designHistory.length + 1,
      changes: [change],
      timestamp: new Date(),
      creator: 'current-user',
      notes: `${type} update: ${field}`
    });
    
    designerState.metadata.creationProcess.iterationCount++;
  }
  
  // 📊 QUALITY METRICS
  function calculateQualityMetrics(): typeof designerState.metadata.qualityMetrics {
    const metrics = {
      colorHarmony: calculateColorHarmony(),
      textReadability: calculateTextReadability(),
      iconClarity: calculateIconClarity(),
      overallComposition: 0,
      scalingQuality: 95, // High since we use mathematical scaling
      professionalScore: 0
    };
    
    metrics.overallComposition = Math.round((metrics.colorHarmony + metrics.textReadability + metrics.iconClarity) / 3);
    metrics.professionalScore = Math.round((Object.values(metrics).reduce((a, b) => a + b, 0) / Object.keys(metrics).length));
    
    return metrics;
  }
  
  function calculateColorHarmony(): number {
    const primary = designerState.designConfig.colors.primary;
    if (primary.includes('cyan') && primary.includes('blue')) return 92;
    if (primary.includes('orange') && primary.includes('red')) return 90;
    if (primary.includes('blue') && primary.includes('cyan')) return 88;
    if (primary.includes('purple') && primary.includes('pink')) return 85;
    return 80;
  }
  
  function calculateTextReadability(): number {
    const titleLength = designerState.designConfig.text.title.content.length;
    const taglineLength = designerState.designConfig.text.tagline.content.length;
    
    let score = 100;
    if (titleLength > 15) score -= 10;
    if (taglineLength > 25) score -= 10;
    if (titleLength < 3) score -= 20;
    
    return Math.max(60, score);
  }
  
  function calculateIconClarity(): number {
    const svgLength = designerState.designConfig.icon.svg.length;
    if (svgLength < 200) return 95;
    if (svgLength < 400) return 85;
    return 75;
  }
  
  // 🎯 MASTER CARD CREATION
  function createMasterCard333px(): MasterCardDesign {
    const masterCard: MasterCardDesign = {
      width: 333,
      height: 333,
      design: {
        colors: { ...designerState.designConfig.colors },
        icon: { ...designerState.designConfig.icon },
        text: { ...designerState.designConfig.text },
        layout: { ...designerState.designConfig.layout }
      }
    };
    
    const masterCardString = JSON.stringify(masterCard);
    designerState.metadata.technical.masterCardHash = btoa(masterCardString).slice(0, 32);
    
    return masterCard;
  }
  
  // 📦 COMPLETE PRODUCT CREATION
  function createFlipCardProduct(): FlipCardProduct {
    const now = new Date();
    const masterCard = createMasterCard333px();
    const qualityMetrics = calculateQualityMetrics();
    
    designerState.metadata.creationProcess.timeSpent = (Date.now() - sessionStartTime) / 1000;
    designerState.metadata.qualityMetrics = qualityMetrics;
    
    const product: FlipCardProduct = {
      id: generateUniqueId(),
      name: designerState.designConfig.text.title.content,
      slug: slugify(designerState.designConfig.text.title.content),
      creator: 'current-user',
      creatorDisplayName: 'Current User',
      masterCard,
      description: `Professional ${designerState.designConfig.text.title.content} component with perfect mathematical scaling.`,
      shortDescription: designerState.designConfig.text.tagline.content,
      category: 'payment-processing',
      tags: visibleTags.map(t => t.replace('#', '')).concat(autoTags),
      features: [
        'Universal Payment Support',
        'Perfect Mathematical Scaling',
        'TypeScript Ready',
        'Mobile Responsive'
      ],
      techStack: ['Svelte', 'TypeScript', 'JavaScript'],
      license: 'Commercial',
      pricing: {
        individual: 19900,
        team: 49900,
        enterprise: 149900,
        currency: 'USD'
      },
      sales: {
        totalSales: 0,
        totalRevenue: 0,
        averageRating: 0,
        reviewCount: 0
      },
      catalogs: {
        personal: {
          catalogId: 'default-personal-catalog',
          addedAt: now,
          status: 'ready',
          version: 1,
          notes: 'Created with Enhanced FlipCard Designer'
        },
        master: {
          publishedAt: null,
          featured: false,
          visibility: 'private',
          moderationStatus: 'pending'
        }
      },
      demo: {
        screenshots: []
      },
      nft: {
        mintable: true,
        minted: false,
        tokenId: null,
        contractAddress: null,
        metadata: null
      },
      analytics: {
        views: 0,
        uniqueViews: 0,
        clicks: 0,
        conversions: 0,
        conversionRate: 0,
        designIterations: designerState.metadata.creationProcess.iterationCount,
        lastUpdated: now,
        trending: false,
        trendingScore: 0
      },
      permissions: {
        public: false,
        purchasable: false,
        downloadable: true,
        forkable: false,
        modifiable: false
      },
      createdAt: now,
      updatedAt: now,
      publishedAt: null,
      metadata: designerState.metadata as FlipCardMetadata
    };
    
    return product;
  }
  
  // 🚀 EXPORT FUNCTIONS
  function exportToPersonalCatalog() {
    designerState.isExporting = true;
    designerState.metadata.creationProcess.exportAttempts++;
    
    try {
      const product = createFlipCardProduct();
      
      const exportPackage: FlipCardExport = {
        product,
        format: 'json',
        masterCard333px: generateSVGDataUrl(MASTER_SIZE),
        metadata: product.metadata,
        exportedAt: new Date(),
        exportedBy: product.creator
      };
      
      dispatch('export-to-catalog', exportPackage);
      designerState.hasUnsavedChanges = false;
      
      console.log('🎨 FlipCard Product Created!', product);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      designerState.isExporting = false;
    }
  }
  
  function generateSVGDataUrl(size: number): string {
    // Generate actual SVG for the design
    const graphicsSize = getGraphicsSize(size);
    const padding = Math.round(size * 0.06);
    
    const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${extractedColors[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${extractedColors[2]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.048)}" fill="url(#bg)"/>
      <g transform="translate(${size/2}, ${size/2})">
        <g transform="translate(0, -${size * 0.06})">
          <g transform="scale(${graphicsSize/24}, ${graphicsSize/24}) translate(-12, -12)">
            ${designerState.designConfig.icon.svg}
          </g>
        </g>
        <text y="${size * 0.12}" text-anchor="middle" fill="${designerState.designConfig.text.title.color}" 
              font-family="${designerState.designConfig.text.title.fontFamily}" 
              font-size="${designerState.designConfig.text.title.fontSize}" 
              font-weight="${designerState.designConfig.text.title.fontWeight}">
          ${designerState.designConfig.text.title.content}
        </text>
        <text y="${size * 0.195}" text-anchor="middle" fill="${designerState.designConfig.text.tagline.color}" 
              font-family="${designerState.designConfig.text.tagline.fontFamily}" 
              font-size="${designerState.designConfig.text.tagline.fontSize}" 
              font-weight="${designerState.designConfig.text.tagline.fontWeight}">
          ${designerState.designConfig.text.tagline.content}
        </text>
      </g>
    </svg>`;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
  
  function downloadJSON() {
    const product = createFlipCardProduct();
    const dataStr = JSON.stringify(product, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.slug}-flipcard.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }
  
  // 🛠️ UTILITY FUNCTIONS
  function generateUniqueId(): string {
    return `fc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  // 🎯 LIFECYCLE
  onMount(() => {
    sessionStartTime = Date.now();
    designerState.metadata.creationProcess.startedAt = new Date();
    
    // Update quality metrics periodically
    const interval = setInterval(() => {
      designerState.metadata.qualityMetrics = calculateQualityMetrics();
      designerState = { ...designerState };
    }, 5000);
    
    return () => clearInterval(interval);
  });
</script>

<!-- 🎨 ENHANCED FLIPCARD DESIGNER INTERFACE -->
<div class="flipcard-designer-enhanced">
  <div class="designer-header">
    <div class="header-content">
      <div class="title-section">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          🎨 FlipCard Designer
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Create professional software packaging with mathematical precision (88px → 999px)
        </p>
      </div>
      
      <div class="quality-metrics">
        <div class="metric">
          <span class="metric-value">{Math.round(designerState.metadata.qualityMetrics.professionalScore)}</span>
          <span class="metric-label">Quality Score</span>
        </div>
        <div class="metric">
          <span class="metric-value">{designerState.metadata.creationProcess.iterationCount}</span>
          <span class="metric-label">Iterations</span>
        </div>
        <div class="metric">
          <span class="metric-value">{Math.round((Date.now() - sessionStartTime) / 1000 / 60)}</span>
          <span class="metric-label">Minutes</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="designer-layout">
    <!-- 🎛️ LEFT PANEL: Enhanced Design Controls -->
    <div class="design-controls">
      
      <!-- 🎨 COLOR PICKER -->
      <div class="control-section">
        <h3 class="control-title">
          Colors & Theme
          <span class="quality-badge" class:high={designerState.metadata.qualityMetrics.colorHarmony >= 85}>
            {Math.round(designerState.metadata.qualityMetrics.colorHarmony)}%
          </span>
        </h3>
        <div class="color-grid">
          {#each colorThemes as theme}
            <button
              class="color-option"
              class:active={designerState.designConfig.colors.primary === theme.value}
              style="background: linear-gradient(135deg, {theme.value.replace('from-', '').replace(' to-', ', ')})"
              on:click={() => selectColorTheme(theme)}
              title="{theme.name} ({theme.category})"
            >
              {#if designerState.designConfig.colors.primary === theme.value}
                <div class="color-check">✓</div>
              {/if}
            </button>
          {/each}
        </div>
      </div>
      
      <!-- 📦 ICON SELECTOR -->
      <div class="control-section">
        <h3 class="control-title">
          Icon & Graphics (66.6% Ratio)
          <span class="quality-badge" class:high={designerState.metadata.qualityMetrics.iconClarity >= 85}>
            {Math.round(designerState.metadata.qualityMetrics.iconClarity)}%
          </span>
        </h3>
        <div class="icon-grid">
          {#each iconLibrary as icon}
            <button
              class="icon-option"
              class:active={designerState.designConfig.icon.svg === icon.svg}
              on:click={() => selectIcon(icon)}
              title="{icon.name} ({icon.category})"
            >
              <div class="icon-preview">
                {@html icon.svg}
              </div>
            </button>
          {/each}
        </div>
      </div>
      
      <!-- ✏️ ENHANCED TEXT EDITOR WITH FONTS -->
      <div class="control-section">
        <h3 class="control-title">
          Text & Typography
          <span class="quality-badge" class:high={designerState.metadata.qualityMetrics.textReadability >= 85}>
            {Math.round(designerState.metadata.qualityMetrics.textReadability)}%
          </span>
        </h3>
        
        <div class="text-field">
          <label for="title">
            Product Title
            <span class="char-count">{designerState.designConfig.text.title.content.length}/20</span>
          </label>
          <input
            id="title"
            type="text"
            bind:value={designerState.designConfig.text.title.content}
            on:input={(e) => updateText('title', 'content', e.target.value)}
            placeholder="Enter product name..."
            maxlength="20"
            class:warning={designerState.designConfig.text.title.content.length > 15}
          />
        </div>
        
        <div class="font-selector">
          <label>Title Font</label>
          <div class="font-grid">
            {#each CORE_FONTS as font}
              <button
                class="font-option"
                class:active={designerState.designConfig.text.title.fontFamily === font.value}
                on:click={() => selectFont('title', font)}
                style="font-family: '{font.value}'"
              >
                {font.name}
              </button>
            {/each}
          </div>
        </div>
        
        <div class="text-field">
          <label for="tagline">
            Tagline (4-5 words ideal)
            <span class="char-count">{designerState.designConfig.text.tagline.content.length}/30</span>
          </label>
          <input
            id="tagline"
            type="text"
            bind:value={designerState.designConfig.text.tagline.content}
            on:input={(e) => updateText('tagline', 'content', e.target.value)}
            placeholder="Brief description..."
            maxlength="30"
            class:warning={designerState.designConfig.text.tagline.content.length > 25}
          />
        </div>
        
        <!-- Typography Controls -->
        <div class="typography-controls">
          <div class="control-row">
            <label>Title Size</label>
            <input
              type="range"
              min="24"
              max="48"
              bind:value={designerState.designConfig.text.title.fontSize}
              on:input={(e) => updateText('title', 'fontSize', parseInt(e.target.value))}
            />
            <span class="value">{designerState.designConfig.text.title.fontSize}px</span>
          </div>
          
          <div class="control-row">
            <label>Title Weight</label>
            <select
              bind:value={designerState.designConfig.text.title.fontWeight}
              on:change={(e) => updateText('title', 'fontWeight', parseInt(e.target.value))}
            >
              <option value={400}>Regular</option>
              <option value={500}>Medium</option>
              <option value={600}>Semibold</option>
              <option value={700}>Bold</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- 🏷️ TAGS EDITOR -->
      <div class="control-section">
        <h3 class="control-title">Tags & Discovery</h3>
        <div class="tags-editor">
          <div class="tag-group">
            <label>Visible Tags</label>
            <div class="tags-input">
              {#each visibleTags as tag, i}
                <span class="tag visible-tag">
                  {tag}
                  <button on:click={() => visibleTags = visibleTags.filter((_, idx) => idx !== i)}>×</button>
                </span>
              {/each}
              <input
                type="text"
                placeholder="Add tag..."
                on:keydown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    visibleTags = [...visibleTags, `#${e.target.value.replace('#', '')}`];
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
          
          <div class="tag-group">
            <label>Auto-Generated Tags</label>
            <div class="tags-display">
              {#each autoTags as tag}
                <span class="tag auto-tag">{tag}</span>
              {/each}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 🚀 ENHANCED EXPORT CONTROLS -->
      <div class="control-section">
        <h3 class="control-title">Export & Publish</h3>
        <div class="export-actions">
          <button 
            class="export-btn primary"
            on:click={exportToPersonalCatalog}
            disabled={designerState.isExporting}
          >
            {#if designerState.isExporting}
              ⏳ Creating Product...
            {:else}
              🎯 Add to My Catalog
            {/if}
          </button>
          
          <button 
            class="export-btn secondary"
            on:click={downloadJSON}
          >
            📦 Download JSON
          </button>
        </div>
        
        <div class="export-info">
          <div class="info-item">
            <span class="info-label">Master Size:</span>
            <span class="info-value">333×333px (SIZE-5)</span>
          </div>
          <div class="info-item">
            <span class="info-label">Scaling Range:</span>
            <span class="info-value">88px → 999px</span>
          </div>
          <div class="info-item">
            <span class="info-label">Graphics Ratio:</span>
            <span class="info-value">66.6% of card size</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 👁️ RIGHT PANEL: Enhanced Live Preview -->
    <div class="preview-panel">
      <div class="preview-header">
        <h3 class="preview-title">Live Preview (Mathematical Scaling)</h3>
        
        <!-- Component Toggles -->
        <div class="component-toggles">
          <label>
            <input type="checkbox" bind:checked={showColorPalette} />
            Color Palette
          </label>
          <label>
            <input type="checkbox" bind:checked={showTags} />
            Tags
          </label>
          <label>
            <input type="checkbox" bind:checked={showToolbar} />
            Toolbar
          </label>
          <label>
            <input type="checkbox" bind:checked={showBuyComponent} />
            Buy Component
          </label>
        </div>
      </div>
      
      <!-- MASTER CARD PREVIEW (SIZE-5 / 333px) -->
      <div class="master-preview">
        <h4>SIZE-5 Master Card (333×333px)</h4>
        <div class="preview-container master">
          <div class="flipcard-wrapper" style="width: {SIZES[5]}px;">
            <!-- Settings Button -->
            <button class="settings-button">i</button>
            
            <!-- Main FlipCard -->
            <div class="flipcard" style="width: {SIZES[5]}px; height: {SIZES[5]}px;">
              <div class="flipcard-gradient" style="background: linear-gradient(135deg, {designerState.designConfig.colors.primary.replace('from-', '').replace(' to-', ', ')})">
                <div class="flipcard-content">
                  <div class="icon-container" style="width: {getGraphicsSize(SIZES[5])}px; height: {getGraphicsSize(SIZES[5])}px;">
                    {@html designerState.designConfig.icon.svg}
                  </div>
                  <h3 class="card-title" style="font-family: '{designerState.designConfig.text.title.fontFamily}'; font-size: {designerState.designConfig.text.title.fontSize}px; font-weight: {designerState.designConfig.text.title.fontWeight}">
                    {designerState.designConfig.text.title.content}
                  </h3>
                  <p class="card-tagline" style="font-family: '{designerState.designConfig.text.tagline.fontFamily}'; font-size: {designerState.designConfig.text.tagline.fontSize}px;">
                    {designerState.designConfig.text.tagline.content}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Color Palette -->
            {#if showColorPalette}
              <div class="color-palette">
                {#each extractedColors as color}
                  <div class="color-swatch" style="background-color: {color}"></div>
                {/each}
              </div>
            {/if}
            
            <!-- Tags Bar -->
            {#if showTags}
              <div class="tags-bar">
                {#each visibleTags.slice(0, 3) as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            {/if}
            
            <!-- Toolbar -->
            {#if showToolbar}
              <div class="toolbar">
                <button title="Download">📥</button>
                <button title="Share">📤</button>
                <button title="Email">📧</button>
                <button title="Mobile">📱</button>
                <button title="Link">🔗</button>
                <button title="Settings">⚙️</button>
              </div>
            {/if}
            
            <!-- Enhanced Buy Component -->
            {#if showBuyComponent}
              <div class="buy-component">
                <button class="favorite-btn">❤️</button>
                <div class="pricing-tiers">
                  <button class="price-btn individual">💰 $199</button>
                  <button class="price-btn team">💼 $499</button>
                  <button class="price-btn enterprise">🏢 $1499</button>
                </div>
              </div>
            {/if}
          </div>
        </div>
        <div class="master-stats">
          <span>Perfect baseline • Graphics: {getGraphicsSize(SIZES[5])}px</span>
        </div>
      </div>
      
      <!-- MATHEMATICAL SCALING PREVIEW -->
      <div class="scaling-preview">
        <h4>Mathematical Scaling Demonstration</h4>
        <div class="scaling-grid">
          {#each [1, 3, 6, 9] as size}
            <div class="scale-demo">
              <div class="scale-header">
                <span class="size-label">SIZE-{size}</span>
                <span class="size-pixels">{SIZES[size]}px</span>
              </div>
              <div class="preview-container scale-{size}">
                <div class="flipcard" style="width: {SIZES[size]}px; height: {SIZES[size]}px;">
                  <div class="flipcard-gradient" style="background: linear-gradient(135deg, {designerState.designConfig.colors.primary.replace('from-', '').replace(' to-', ', ')})">
                    <div class="flipcard-content">
                      <div class="icon-container" style="width: {getGraphicsSize(SIZES[size])}px; height: {getGraphicsSize(SIZES[size])}px;">
                        {@html designerState.designConfig.icon.svg}
                      </div>
                      <h3 class="card-title" style="font-size: {Math.round(designerState.designConfig.text.title.fontSize * SIZES[size] / MASTER_SIZE)}px;">
                        {designerState.designConfig.text.title.content}
                      </h3>
                      <p class="card-tagline" style="font-size: {Math.round(designerState.designConfig.text.tagline.fontSize * SIZES[size] / MASTER_SIZE)}px;">
                        {designerState.designConfig.text.tagline.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="scale-note">
                Graphics: {getGraphicsSize(SIZES[size])}px
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- QUALITY METRICS DISPLAY -->
      <div class="quality-display">
        <h4>Design Quality Metrics</h4>
        <div class="metrics-grid">
          <div class="metric-item">
            <div class="metric-bar">
              <div class="metric-fill" style="width: {designerState.metadata.qualityMetrics.colorHarmony}%"></div>
            </div>
            <span class="metric-name">Color Harmony</span>
            <span class="metric-score">{Math.round(designerState.metadata.qualityMetrics.colorHarmony)}%</span>
          </div>
          <div class="metric-item">
            <div class="metric-bar">
              <div class="metric-fill" style="width: {designerState.metadata.qualityMetrics.textReadability}%"></div>
            </div>
            <span class="metric-name">Text Readability</span>
            <span class="metric-score">{Math.round(designerState.metadata.qualityMetrics.textReadability)}%</span>
          </div>
          <div class="metric-item">
            <div class="metric-bar">
              <div class="metric-fill" style="width: {designerState.metadata.qualityMetrics.scalingQuality}%"></div>
            </div>
            <span class="metric-name">Scaling Quality</span>
            <span class="metric-score">{Math.round(designerState.metadata.qualityMetrics.scalingQuality)}%</span>
          </div>
          <div class="metric-item">
            <div class="metric-bar">
              <div class="metric-fill" style="width: {designerState.metadata.qualityMetrics.professionalScore}%"></div>
            </div>
            <span class="metric-name">Professional Score</span>
            <span class="metric-score">{Math.round(designerState.metadata.qualityMetrics.professionalScore)}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .flipcard-designer-enhanced {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .designer-header {
    margin-bottom: 3rem;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
  
  .quality-metrics {
    display: flex;
    gap: 2rem;
  }
  
  .metric {
    text-align: center;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .metric-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #3b82f6;
  }
  
  .metric-label {
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .designer-layout {
    display: grid;
    grid-template-columns: 500px 1fr;
    gap: 3rem;
    align-items: start;
  }
  
  /* Enhanced Design Controls */
  .design-controls {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .control-section {
    margin-bottom: 2.5rem;
  }
  
  .control-section:last-child {
    margin-bottom: 0;
  }
  
  .control-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  .quality-badge {
    background: #fef3c7;
    color: #92400e;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .quality-badge.high {
    background: #d1fae5;
    color: #065f46;
  }
  
  /* Color Grid */
  .color-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }
  
  .color-option {
    width: 100%;
    height: 3rem;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
  }
  
  .color-option:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .color-option.active {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .color-check {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #3b82f6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  /* Icon Grid */
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }
  
  .icon-option {
    width: 100%;
    height: 4rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  
  .icon-option:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }
  
  .icon-option.active {
    border-color: #3b82f6;
    background: #eff6ff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .icon-preview {
    width: 2rem;
    height: 2rem;
    color: #374151;
  }
  
  .icon-option.active .icon-preview {
    color: #3b82f6;
  }
  
  /* Text Fields */
  .text-field {
    margin-bottom: 1rem;
  }
  
  .text-field label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .char-count {
    font-size: 0.75rem;
    color: #9ca3af;
    font-weight: normal;
  }
  
  .text-field input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .text-field input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .text-field input.warning {
    border-color: #f59e0b;
    background: #fffbeb;
  }
  
  /* Font Selector */
  .font-selector {
    margin-bottom: 1rem;
  }
  
  .font-selector label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .font-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  
  .font-option {
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .font-option:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }
  
  .font-option.active {
    border-color: #3b82f6;
    background: #eff6ff;
    font-weight: 500;
  }
  
  /* Typography Controls */
  .typography-controls {
    background: #f9fafb;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
  }
  
  .control-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .control-row:last-child {
    margin-bottom: 0;
  }
  
  .control-row label {
    font-size: 0.875rem;
    font-weight: 500;
    min-width: 100px;
  }
  
  .control-row input[type="range"] {
    flex: 1;
  }
  
  .control-row select {
    flex: 1;
    padding: 0.25rem 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }
  
  .control-row .value {
    font-size: 0.875rem;
    font-weight: 500;
    color: #3b82f6;
    min-width: 50px;
  }
  
  /* Tags Editor */
  .tags-editor {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .tag-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .tags-input {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background: white;
    min-height: 2.5rem;
    align-items: center;
  }
  
  .tags-input input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.875rem;
    min-width: 100px;
  }
  
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .visible-tag {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .visible-tag button {
    background: none;
    border: none;
    color: #1e40af;
    cursor: pointer;
    font-weight: bold;
    line-height: 1;
    padding: 0;
    margin-left: 0.25rem;
  }
  
  .auto-tag {
    background: #f3f4f6;
    color: #6b7280;
  }
  
  .tags-display {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  /* Export Controls */
  .export-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .export-btn {
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
  }
  
  .export-btn.primary {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
  }
  
  .export-btn.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  }
  
  .export-btn.secondary {
    background: white;
    border: 1px solid #d1d5db;
    color: #374151;
  }
  
  .export-btn.secondary:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  .export-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .export-info {
    padding: 1rem;
    background: #f0f9ff;
    border-radius: 0.5rem;
    border: 1px solid #0ea5e9;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .info-item:last-child {
    margin-bottom: 0;
  }
  
  .info-label {
    font-size: 0.875rem;
    color: #0369a1;
  }
  
  .info-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: #0c4a6e;
  }
  
  /* Preview Panel */
  .preview-panel {
    background: #f9fafb;
    border-radius: 1rem;
    padding: 2rem;
    min-height: 800px;
  }
  
  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .preview-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
  }
  
  .component-toggles {
    display: flex;
    gap: 1rem;
  }
  
  .component-toggles label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
  }
  
  .component-toggles input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
  }
  
  /* Master Preview */
  .master-preview {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .master-preview h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .preview-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  
  .flipcard-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
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
    cursor: pointer;
    z-index: 10;
  }
  
  .flipcard {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
  }
  
  .flipcard-gradient {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .flipcard-content {
    text-align: center;
    color: white;
  }
  
  .icon-container {
    margin: 0 auto 1rem;
    color: white;
  }
  
  .icon-container svg {
    width: 100%;
    height: 100%;
  }
  
  .card-title {
    margin: 0 0 0.5rem;
    color: white;
  }
  
  .card-tagline {
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
  }
  
  /* FlipCard Components */
  .color-palette {
    display: flex;
    gap: 0.25rem;
    padding: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .color-swatch {
    width: 20%;
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
  
  .tags-bar .tag {
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
  }
  
  .price-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
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
  
  .master-stats {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  /* Scaling Preview */
  .scaling-preview {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .scaling-preview h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  .scaling-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
  
  .scale-demo {
    text-align: center;
  }
  
  .scale-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 0 0.5rem;
  }
  
  .size-label {
    font-weight: 600;
    color: #374151;
  }
  
  .size-pixels {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .scale-note {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  /* Quality Display */
  .quality-display {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .quality-display h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .metric-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .metric-bar {
    width: 100%;
    height: 0.5rem;
    background: #e5e7eb;
    border-radius: 0.25rem;
    overflow: hidden;
  }
  
  .metric-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #6366f1);
    transition: width 0.5s ease;
  }
  
  .metric-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  .metric-score {
    font-size: 0.875rem;
    font-weight: 600;
    color: #3b82f6;
  }
  
  /* Dark mode support */
  :global(.dark) .design-controls,
  :global(.dark) .preview-panel,
  :global(.dark) .master-preview,
  :global(.dark) .scaling-preview,
  :global(.dark) .quality-display {
    background: #1f2937;
    border-color: #374151;
  }
  
  :global(.dark) .control-title,
  :global(.dark) .preview-title,
  :global(.dark) h4 {
    color: #f3f4f6;
  }
  
  :global(.dark) .text-field input,
  :global(.dark) .control-row select,
  :global(.dark) .tags-input {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  
  :global(.dark) .icon-option,
  :global(.dark) .font-option {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  
  :global(.dark) .export-btn.secondary {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
</style>