<!-- Personal Catalog Component - Step 2 of FlipCard Workflow -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import FlipCard from './FlipCard.svelte';
  import type { FlipCardProduct, PersonalCatalog, CatalogStats } from '$lib/types/flipcard';
  
  export let catalogId: string = 'default-personal-catalog';
  export let catalogName: string = 'My FlipCard Collection';
  
  // View modes
  type ViewMode = 'grid' | 'list' | 'table';
  let viewMode: ViewMode = 'grid';
  
  // Filters and search
  let searchQuery = '';
  let statusFilter: 'all' | 'draft' | 'ready' | 'published' | 'archived' = 'all';
  let sortBy: 'name' | 'created' | 'updated' | 'quality' | 'sales' = 'created';
  let sortOrder: 'asc' | 'desc' = 'desc';
  
  // Size controls for grid view
  let gridSize: 3 | 4 | 5 | 6 = 5; // FlipCard SIZE system
  
  // Selection for bulk operations
  let selectedProducts = new Set<string>();
  let selectAll = false;
  
  // Catalog data
  let catalog: PersonalCatalog = {
    id: catalogId,
    owner: 'current-user',
    name: catalogName,
    description: 'My collection of professional FlipCard products',
    products: [],
    settings: {
      privacy: 'private',
      defaultTags: ['component', 'svelte'],
      autoPublish: false,
      allowForking: false,
      requireApproval: true
    },
    stats: {
      totalProducts: 0,
      publishedProducts: 0,
      draftProducts: 0,
      totalViews: 0,
      totalSales: 0,
      totalRevenue: 0,
      averageRating: 0
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // Mock products for demonstration
  let products: FlipCardProduct[] = [
    {
      id: 'fc_demo_1',
      name: 'NOBS PAY',
      slug: 'nobs-pay',
      creator: 'current-user',
      creatorDisplayName: 'Current User',
      masterCard: {
        width: 333,
        height: 333,
        design: {
          colors: {
            primary: 'from-cyan-400 to-blue-500',
            secondary: 'from-cyan-500 to-blue-600',
            accent: '#ffffff',
            theme: 'professional'
          },
          icon: {
            type: 'library',
            svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
            size: 222,
            position: { x: 167, y: 147 },
            color: '#ffffff'
          },
          text: {
            title: {
              content: 'NOBS PAY',
              fontSize: 36,
              fontFamily: 'Inter',
              fontWeight: 600,
              color: '#ffffff',
              position: { x: 167, y: 200 },
              maxLength: 20
            },
            tagline: {
              content: 'Done for You Billing',
              fontSize: 18,
              fontFamily: 'Inter',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.9)',
              position: { x: 167, y: 230 },
              maxLength: 30
            }
          },
          layout: {
            padding: 20,
            spacing: 16,
            borderRadius: 16,
            backgroundGradient: 'from-cyan-400 to-blue-500'
          }
        }
      },
      description: 'Universal payment component with Stripe, PayPal, and crypto support.',
      shortDescription: 'Done for You Billing',
      category: 'payment-processing',
      tags: ['payment', 'stripe', 'billing', 'svelte'],
      features: ['Universal Payment Support', 'TypeScript Ready', 'Mobile Responsive'],
      techStack: ['Svelte', 'TypeScript', 'Stripe API'],
      license: 'Commercial',
      pricing: {
        individual: 19900,
        team: 49900,
        enterprise: 149900,
        currency: 'USD'
      },
      sales: {
        totalSales: 45,
        totalRevenue: 895500,
        averageRating: 4.8,
        reviewCount: 23
      },
      catalogs: {
        personal: {
          catalogId: catalogId,
          addedAt: new Date('2024-01-15'),
          status: 'published',
          version: 3,
          notes: 'Best seller - keep featured'
        },
        master: {
          publishedAt: new Date('2024-01-20'),
          featured: true,
          visibility: 'public',
          moderationStatus: 'approved'
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
        views: 1250,
        uniqueViews: 890,
        clicks: 234,
        conversions: 45,
        conversionRate: 19.2,
        designIterations: 12,
        lastUpdated: new Date(),
        trending: true,
        trendingScore: 92
      },
      permissions: {
        public: true,
        purchasable: true,
        downloadable: true,
        forkable: false,
        modifiable: false
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-07-10'),
      publishedAt: new Date('2024-01-20'),
      metadata: {
        designHistory: [],
        creationProcess: {
          timeSpent: 2400,
          iterationCount: 12,
          toolsUsed: ['color-picker', 'icon-selector', 'text-editor'],
          colorChanges: 8,
          iconChanges: 5,
          textEdits: 15,
          previewViews: 45,
          exportAttempts: 3,
          startedAt: new Date('2024-01-15'),
          lastActivity: new Date('2024-01-15')
        },
        qualityMetrics: {
          colorHarmony: 92,
          textReadability: 94,
          iconClarity: 90,
          overallComposition: 92,
          scalingQuality: 95,
          professionalScore: 93
        },
        usageAnalytics: {
          viewsBySize: { 3: 145, 5: 678, 6: 234, 8: 193 },
          interactionHeatmap: [],
          timeOnProduct: [],
          bounceRate: 12.5,
          conversionFunnel: {
            views: 1250,
            clicksToDemo: 456,
            clicksToBuy: 234,
            purchases: 45,
            conversionRate: 19.2
          },
          popularSizes: [5, 6, 3]
        },
        technical: {
          masterCardHash: 'fc1234567890abcdef',
          svgComplexity: 35,
          fileSize: 12800,
          renderPerformance: 96,
          compatibilityScore: 98,
          accessibilityScore: 89,
          mobileOptimization: 94
        },
        aiEnhancements: {
          suggestedColors: [],
          suggestedIcons: [],
          qualityImprovements: [],
          marketFit: 88,
          trendinessScore: 91,
          competitorAnalysis: []
        }
      }
    },
    // Add more mock products as needed
  ];
  
  // Computed values
  $: filteredProducts = filterAndSortProducts(products, searchQuery, statusFilter, sortBy, sortOrder);
  $: stats = calculateStats(products);
  
  // Filter and sort products
  function filterAndSortProducts(
    products: FlipCardProduct[],
    search: string,
    status: typeof statusFilter,
    sort: typeof sortBy,
    order: typeof sortOrder
  ): FlipCardProduct[] {
    let filtered = products;
    
    // Apply search filter
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(p => p.catalogs.personal.status === status);
    }
    
    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sort) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'created':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'updated':
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
        case 'quality':
          comparison = a.metadata.qualityMetrics.professionalScore - b.metadata.qualityMetrics.professionalScore;
          break;
        case 'sales':
          comparison = a.sales.totalSales - b.sales.totalSales;
          break;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  }
  
  // Calculate catalog statistics
  function calculateStats(products: FlipCardProduct[]): CatalogStats {
    return {
      totalProducts: products.length,
      publishedProducts: products.filter(p => p.catalogs.personal.status === 'published').length,
      draftProducts: products.filter(p => p.catalogs.personal.status === 'draft').length,
      totalViews: products.reduce((sum, p) => sum + p.analytics.views, 0),
      totalSales: products.reduce((sum, p) => sum + p.sales.totalSales, 0),
      totalRevenue: products.reduce((sum, p) => sum + p.sales.totalRevenue, 0),
      averageRating: products.reduce((sum, p) => sum + p.sales.averageRating, 0) / products.length || 0
    };
  }
  
  // Bulk operations
  function toggleSelectAll() {
    if (selectAll) {
      selectedProducts.clear();
    } else {
      filteredProducts.forEach(p => selectedProducts.add(p.id));
    }
    selectedProducts = new Set(selectedProducts);
  }
  
  function toggleProductSelection(productId: string) {
    if (selectedProducts.has(productId)) {
      selectedProducts.delete(productId);
    } else {
      selectedProducts.add(productId);
    }
    selectedProducts = new Set(selectedProducts);
  }
  
  function bulkPublish() {
    const selected = Array.from(selectedProducts);
    console.log('Publishing products:', selected);
    // Implement bulk publish logic
  }
  
  function bulkArchive() {
    const selected = Array.from(selectedProducts);
    console.log('Archiving products:', selected);
    // Implement bulk archive logic
  }
  
  function bulkDelete() {
    if (confirm(`Are you sure you want to delete ${selectedProducts.size} products?`)) {
      const selected = Array.from(selectedProducts);
      console.log('Deleting products:', selected);
      // Implement bulk delete logic
    }
  }
  
  // Individual product actions
  function editProduct(product: FlipCardProduct) {
    console.log('Edit product:', product.id);
    // Navigate to designer with product data
  }
  
  function duplicateProduct(product: FlipCardProduct) {
    console.log('Duplicate product:', product.id);
    // Create a copy of the product
  }
  
  function publishToMaster(product: FlipCardProduct) {
    console.log('Publish to master catalog:', product.id);
    // Implement master catalog publishing
  }
  
  function viewAnalytics(product: FlipCardProduct) {
    console.log('View analytics for:', product.id);
    // Show detailed analytics modal
  }
  
  // Format helpers
  function formatCurrency(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }
  
  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }
  
  function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
  }
  
  onMount(() => {
    // Load catalog data from storage/API
    console.log('Loading personal catalog:', catalogId);
  });
</script>

<!-- 🗂️ PERSONAL CATALOG INTERFACE -->
<div class="personal-catalog">
  <!-- Header Section -->
  <div class="catalog-header">
    <div class="header-content">
      <div class="header-info">
        <h1 class="catalog-title">
          {catalogName}
          <span class="catalog-badge">Personal</span>
        </h1>
        <p class="catalog-description">
          {catalog.description}
        </p>
      </div>
      
      <div class="header-actions">
        <button class="action-btn primary">
          ➕ Create New FlipCard
        </button>
        <button class="action-btn secondary">
          ⚙️ Catalog Settings
        </button>
      </div>
    </div>
    
    <!-- Statistics Bar -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-value">{stats.totalProducts}</span>
        <span class="stat-label">Total Products</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{stats.publishedProducts}</span>
        <span class="stat-label">Published</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{formatNumber(stats.totalViews)}</span>
        <span class="stat-label">Total Views</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{formatNumber(stats.totalSales)}</span>
        <span class="stat-label">Total Sales</span>
      </div>
      <div class="stat-item highlight">
        <span class="stat-value">{formatCurrency(stats.totalRevenue)}</span>
        <span class="stat-label">Total Revenue</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">⭐ {stats.averageRating.toFixed(1)}</span>
        <span class="stat-label">Avg Rating</span>
      </div>
    </div>
  </div>
  
  <!-- Controls Bar -->
  <div class="controls-bar">
    <div class="controls-left">
      <!-- View Mode Selector -->
      <div class="view-selector">
        <button 
          class="view-btn" 
          class:active={viewMode === 'grid'}
          on:click={() => viewMode = 'grid'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" rx="1"/>
            <rect x="9" y="1" width="6" height="6" rx="1"/>
            <rect x="1" y="9" width="6" height="6" rx="1"/>
            <rect x="9" y="9" width="6" height="6" rx="1"/>
          </svg>
          Grid
        </button>
        <button 
          class="view-btn" 
          class:active={viewMode === 'list'}
          on:click={() => viewMode = 'list'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="2" width="14" height="2" rx="1"/>
            <rect x="1" y="7" width="14" height="2" rx="1"/>
            <rect x="1" y="12" width="14" height="2" rx="1"/>
          </svg>
          List
        </button>
        <button 
          class="view-btn" 
          class:active={viewMode === 'table'}
          on:click={() => viewMode = 'table'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="14" height="3" rx="0.5"/>
            <rect x="1" y="6" width="14" height="3" rx="0.5"/>
            <rect x="1" y="11" width="14" height="3" rx="0.5"/>
          </svg>
          Table
        </button>
      </div>
      
      <!-- Size Control (for grid view) -->
      {#if viewMode === 'grid'}
        <div class="size-control">
          <label>Card Size:</label>
          <select bind:value={gridSize}>
            <option value={3}>SIZE-3 (166px)</option>
            <option value={4}>SIZE-4 (222px)</option>
            <option value={5}>SIZE-5 (333px)</option>
            <option value={6}>SIZE-6 (444px)</option>
          </select>
        </div>
      {/if}
      
      <!-- Status Filter -->
      <div class="filter-control">
        <select bind:value={statusFilter}>
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="ready">Ready</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      
      <!-- Sort Control -->
      <div class="sort-control">
        <select bind:value={sortBy}>
          <option value="created">Created Date</option>
          <option value="updated">Updated Date</option>
          <option value="name">Name</option>
          <option value="quality">Quality Score</option>
          <option value="sales">Sales</option>
        </select>
        <button 
          class="sort-order-btn" 
          on:click={() => sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
    
    <div class="controls-right">
      <!-- Search -->
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Search products..." 
          bind:value={searchQuery}
        />
      </div>
      
      <!-- Bulk Actions -->
      {#if selectedProducts.size > 0}
        <div class="bulk-actions">
          <span class="selected-count">{selectedProducts.size} selected</span>
          <button class="bulk-btn" on:click={bulkPublish}>Publish</button>
          <button class="bulk-btn" on:click={bulkArchive}>Archive</button>
          <button class="bulk-btn danger" on:click={bulkDelete}>Delete</button>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Products Display -->
  <div class="products-container">
    {#if viewMode === 'grid'}
      <!-- Grid View -->
      <div class="products-grid" data-size={gridSize}>
        {#each filteredProducts as product}
          <div class="product-card">
            <div class="product-select">
              <input 
                type="checkbox" 
                checked={selectedProducts.has(product.id)}
                on:change={() => toggleProductSelection(product.id)}
              />
            </div>
            
            <div class="product-flipcard">
              <FlipCard 
                component={{
                  id: product.id,
                  name: product.name,
                  consumer_tagline: product.shortDescription,
                  description: product.description,
                  category: product.category,
                  price_individual: product.pricing.individual,
                  price_team: product.pricing.team,
                  price_enterprise: product.pricing.enterprise,
                  flip_card_color: product.masterCard.design.colors.primary,
                  tags: product.tags,
                  tech_stack: product.techStack,
                  developer_features: product.features
                }}
                size={gridSize}
                displayOnly={true}
              />
            </div>
            
            <div class="product-info">
              <h3>{product.name}</h3>
              <div class="product-meta">
                <span class="status status-{product.catalogs.personal.status}">
                  {product.catalogs.personal.status}
                </span>
                <span class="quality">Quality: {product.metadata.qualityMetrics.professionalScore}%</span>
              </div>
              <div class="product-stats">
                <span>👁️ {formatNumber(product.analytics.views)}</span>
                <span>💰 {product.sales.totalSales} sales</span>
                <span>⭐ {product.sales.averageRating.toFixed(1)}</span>
              </div>
              <div class="product-actions">
                <button on:click={() => editProduct(product)}>Edit</button>
                <button on:click={() => duplicateProduct(product)}>Duplicate</button>
                <button on:click={() => publishToMaster(product)}>Publish</button>
                <button on:click={() => viewAnalytics(product)}>Analytics</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
    {:else if viewMode === 'list'}
      <!-- List View -->
      <div class="products-list">
        {#each filteredProducts as product}
          <div class="list-item">
            <div class="list-select">
              <input 
                type="checkbox" 
                checked={selectedProducts.has(product.id)}
                on:change={() => toggleProductSelection(product.id)}
              />
            </div>
            
            <div class="list-thumbnail">
              <FlipCard 
                component={{
                  id: product.id,
                  name: product.name,
                  consumer_tagline: product.shortDescription,
                  category: product.category,
                  flip_card_color: product.masterCard.design.colors.primary
                }}
                size={2}
                displayOnly={true}
              />
              />
            </div>
            
            <div class="list-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div class="list-tags">
                {#each product.tags.slice(0, 5) as tag}
                  <span class="tag">#{tag}</span>
                {/each}
              </div>
            </div>
            
            <div class="list-stats">
              <div class="stat">
                <span class="stat-label">Views</span>
                <span class="stat-value">{formatNumber(product.analytics.views)}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Sales</span>
                <span class="stat-value">{product.sales.totalSales}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Revenue</span>
                <span class="stat-value">{formatCurrency(product.sales.totalRevenue)}</span>
              </div>
            </div>
            
            <div class="list-status">
              <span class="status status-{product.catalogs.personal.status}">
                {product.catalogs.personal.status}
              </span>
              <span class="quality-score">
                Quality: {product.metadata.qualityMetrics.professionalScore}%
              </span>
            </div>
            
            <div class="list-actions">
              <button class="action-icon" on:click={() => editProduct(product)} title="Edit">
                ✏️
              </button>
              <button class="action-icon" on:click={() => duplicateProduct(product)} title="Duplicate">
                📋
              </button>
              <button class="action-icon" on:click={() => publishToMaster(product)} title="Publish">
                🚀
              </button>
              <button class="action-icon" on:click={() => viewAnalytics(product)} title="Analytics">
                📊
              </button>
            </div>
          </div>
        {/each}
      </div>
      
    {:else}
      <!-- Table View -->
      <div class="products-table-wrapper">
        <table class="products-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  bind:checked={selectAll}
                  on:change={toggleSelectAll}
                />
              </th>
              <th>Product</th>
              <th>Status</th>
              <th>Quality</th>
              <th>Views</th>
              <th>Sales</th>
              <th>Revenue</th>
              <th>Rating</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredProducts as product}
              <tr>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedProducts.has(product.id)}
                    on:change={() => toggleProductSelection(product.id)}
                  />
                </td>
                <td class="product-cell">
                  <div class="table-product">
                    <FlipCard 
                      component={{
                        id: product.id,
                        name: product.name,
                        consumer_tagline: product.shortDescription,
                        category: product.category,
                        flip_card_color: product.masterCard.design.colors.primary
                      }}
                      size={1}
                      displayOnly={true}
                    />
                    />
                    <div class="table-product-info">
                      <strong>{product.name}</strong>
                      <span>{product.shortDescription}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="status status-{product.catalogs.personal.status}">
                    {product.catalogs.personal.status}
                  </span>
                </td>
                <td>{product.metadata.qualityMetrics.professionalScore}%</td>
                <td>{formatNumber(product.analytics.views)}</td>
                <td>{product.sales.totalSales}</td>
                <td>{formatCurrency(product.sales.totalRevenue)}</td>
                <td>⭐ {product.sales.averageRating.toFixed(1)}</td>
                <td>{formatDate(product.createdAt)}</td>
                <td>
                  <div class="table-actions">
                    <button class="action-icon" on:click={() => editProduct(product)} title="Edit">
                      ✏️
                    </button>
                    <button class="action-icon" on:click={() => publishToMaster(product)} title="Publish">
                      🚀
                    </button>
                    <button class="action-icon" on:click={() => viewAnalytics(product)} title="Analytics">
                      📊
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
  
  <!-- Empty State -->
  {#if filteredProducts.length === 0}
    <div class="empty-state">
      <div class="empty-icon">📦</div>
      <h3>No products found</h3>
      <p>
        {#if searchQuery}
          No products match your search criteria.
        {:else if statusFilter !== 'all'}
          No {statusFilter} products in your catalog.
        {:else}
          Create your first FlipCard to get started!
        {/if}
      </p>
      <button class="action-btn primary">
        ➕ Create FlipCard
      </button>
    </div>
  {/if}
</div>

<style>
  .personal-catalog {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* Header Section */
  .catalog-header {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .catalog-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .catalog-badge {
    background: #dbeafe;
    color: #1e40af;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .catalog-description {
    color: #6b7280;
    margin: 0;
  }
  
  .header-actions {
    display: flex;
    gap: 1rem;
  }
  
  .action-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .action-btn.primary {
    background: #3b82f6;
    color: white;
  }
  
  .action-btn.primary:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  .action-btn.secondary {
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
  }
  
  .action-btn.secondary:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  /* Statistics Bar */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
  }
  
  .stat-item.highlight .stat-value {
    color: #10b981;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  /* Controls Bar */
  .controls-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .controls-left,
  .controls-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .view-selector {
    display: flex;
    background: #f3f4f6;
    border-radius: 0.5rem;
    padding: 0.25rem;
  }
  
  .view-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: #6b7280;
    font-weight: 500;
    cursor: pointer;
    border-radius: 0.375rem;
    transition: all 0.2s;
  }
  
  .view-btn.active {
    background: white;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .size-control,
  .filter-control,
  .sort-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .size-control label {
    font-size: 0.875rem;
    color: #374151;
    font-weight: 500;
  }
  
  select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
    cursor: pointer;
  }
  
  .sort-order-btn {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;
    font-size: 1rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .search-box input {
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    width: 250px;
  }
  
  .bulk-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .selected-count {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .bulk-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .bulk-btn:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  .bulk-btn.danger {
    color: #dc2626;
  }
  
  .bulk-btn.danger:hover {
    background: #fee2e2;
    border-color: #ef4444;
  }
  
  /* Grid View */
  .products-grid {
    display: grid;
    gap: 2rem;
  }
  
  .products-grid[data-size="3"] {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .products-grid[data-size="4"] {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
  
  .products-grid[data-size="5"] {
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
  
  .products-grid[data-size="6"] {
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
  }
  
  .product-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    position: relative;
  }
  
  .product-select {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
  }
  
  .product-flipcard {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .product-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }
  
  .product-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .status {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
  }
  
  .status-draft {
    background: #fef3c7;
    color: #92400e;
  }
  
  .status-ready {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .status-published {
    background: #d1fae5;
    color: #065f46;
  }
  
  .status-archived {
    background: #f3f4f6;
    color: #6b7280;
  }
  
  .quality {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .product-stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .product-actions {
    display: flex;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .product-actions button {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .product-actions button:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  /* List View */
  .products-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .list-item {
    display: grid;
    grid-template-columns: auto auto 1fr auto auto auto;
    gap: 1.5rem;
    align-items: center;
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .list-thumbnail {
    width: 111px;
  }
  
  .list-details h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 0.25rem;
  }
  
  .list-details p {
    color: #6b7280;
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
  }
  
  .list-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .tag {
    background: #e0e7ff;
    color: #4338ca;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .list-stats {
    display: flex;
    gap: 1.5rem;
  }
  
  .list-stats .stat {
    text-align: center;
  }
  
  .list-stats .stat-label {
    display: block;
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
  }
  
  .list-stats .stat-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
  }
  
  .list-status {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  
  .quality-score {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .list-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-icon {
    width: 2rem;
    height: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  
  .action-icon:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  /* Table View */
  .products-table-wrapper {
    overflow-x: auto;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .products-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .products-table th {
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
    font-size: 0.875rem;
    color: #374151;
  }
  
  .products-table td {
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .products-table tr:hover {
    background: #f9fafb;
  }
  
  .table-product {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .table-product-info {
    display: flex;
    flex-direction: column;
  }
  
  .table-product-info strong {
    font-weight: 600;
  }
  
  .table-product-info span {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .table-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .empty-state h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #111827;
  }
  
  .empty-state p {
    color: #6b7280;
    margin: 0 0 2rem;
  }
  
  /* Dark mode support */
  :global(.dark) .personal-catalog {
    color: #f3f4f6;
  }
  
  :global(.dark) .catalog-header,
  :global(.dark) .controls-bar,
  :global(.dark) .product-card,
  :global(.dark) .list-item,
  :global(.dark) .products-table-wrapper {
    background: #1f2937;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  :global(.dark) .catalog-title,
  :global(.dark) .stat-value,
  :global(.dark) .product-info h3,
  :global(.dark) .list-details h3,
  :global(.dark) .empty-state h3 {
    color: #f3f4f6;
  }
  
  :global(.dark) .view-selector {
    background: #374151;
  }
  
  :global(.dark) .view-btn.active {
    background: #1f2937;
  }
  
  :global(.dark) select,
  :global(.dark) .sort-order-btn,
  :global(.dark) .search-box input,
  :global(.dark) .bulk-btn,
  :global(.dark) .product-actions button,
  :global(.dark) .action-icon {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  
  :global(.dark) .products-table th {
    border-color: #374151;
  }
  
  :global(.dark) .products-table td {
    border-color: #374151;
  }
  
  :global(.dark) .products-table tr:hover {
    background: #374151;
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .controls-bar {
      flex-direction: column;
      align-items: stretch;
    }
    
    .controls-left,
    .controls-right {
      flex-wrap: wrap;
    }
    
    .search-box input {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      align-items: stretch;
    }
    
    .header-actions {
      flex-direction: column;
    }
    
    .stats-bar {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .products-grid {
      grid-template-columns: 1fr !important;
    }
    
    .list-item {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .list-thumbnail {
      display: none;
    }
    
    .products-table-wrapper {
      overflow-x: scroll;
    }
  }
</style>