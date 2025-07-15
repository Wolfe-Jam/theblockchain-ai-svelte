<script lang="ts">
  import { page } from '$app/stores';
  import FlipCardDesignerEnhanced from '$lib/components/marketplace/FlipCardDesignerEnhanced.svelte';
  import FlipCard from '$lib/components/marketplace/FlipCard.svelte';
  import type { FlipCardExport } from '$lib/types/flipcard';
  
  // Example components for showcase
  const exampleComponents = [
    {
      id: 'example-1',
      name: 'NOBS PAY',
      consumer_tagline: 'Done for You Billing',
      description: 'Universal payment component with Stripe, PayPal, and crypto support.',
      category: 'payment-processing',
      price_individual: 19900,
      price_team: 49900,
      price_enterprise: 149900,
      flip_card_color: 'from-cyan-400 to-blue-500',
      tags: ['payment', 'stripe', 'billing'],
      tech_stack: ['Svelte', 'TypeScript', 'Stripe API'],
      developer_features: [
        'Universal Payment Support',
        'TypeScript Ready',
        'Mobile Responsive',
        'Easy Integration'
      ]
    },
    {
      id: 'example-2',
      name: 'DataViz Pro',
      consumer_tagline: 'Beautiful Data Visualization',
      description: 'Advanced charting and visualization components.',
      category: 'data-visualization',
      price_individual: 29900,
      price_team: 79900,
      price_enterprise: 199900,
      flip_card_color: 'from-purple-500 to-pink-500',
      tags: ['charts', 'data', 'visualization'],
      tech_stack: ['Svelte', 'D3.js', 'TypeScript'],
      developer_features: [
        'Interactive Charts',
        'Real-time Updates',
        'Custom Themes',
        'Export Support'
      ]
    },
    {
      id: 'example-3',
      name: 'Auth Shield',
      consumer_tagline: 'Secure Authentication',
      description: 'Complete authentication system with OAuth support.',
      category: 'authentication',
      price_individual: 39900,
      price_team: 99900,
      price_enterprise: 299900,
      flip_card_color: 'from-emerald-400 to-teal-600',
      tags: ['auth', 'security', 'oauth'],
      tech_stack: ['Svelte', 'JWT', 'OAuth2'],
      developer_features: [
        'Multiple Auth Providers',
        'JWT Integration',
        'Role-based Access',
        'Session Management'
      ]
    }
  ];
  
  let personalCatalog: FlipCardExport[] = [];
  
  function handleExportToCatalog(event: CustomEvent<FlipCardExport>) {
    personalCatalog = [...personalCatalog, event.detail];
    console.log('Added to catalog:', event.detail);
  }
  
  function handleBuy(event: CustomEvent) {
    console.log('Buy event:', event.detail);
  }
</script>

<svelte:head>
  <title>FlipCard Designer - Create Professional Software Packaging | theBlockchain.ai</title>
  <meta name="description" content="Revolutionary FlipCard system - create album covers for software components with mathematical precision scaling from 88px to 999px." />
</svelte:head>

<div class="flipcard-designer-page">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">
        🎨 FlipCard Designer
        <span class="hero-badge">Revolutionary</span>
      </h1>
      <p class="hero-subtitle">
        Create "album covers for software" with mathematical precision
      </p>
      <div class="hero-features">
        <div class="feature">
          <span class="feature-icon">📐</span>
          <span class="feature-text">88px → 999px Perfect Scaling</span>
        </div>
        <div class="feature">
          <span class="feature-icon">🎯</span>
          <span class="feature-text">66.6% Graphics Ratio</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✨</span>
          <span class="feature-text">Professional Quality</span>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Mathematical SIZE System Showcase -->
  <section class="size-showcase">
    <div class="section-header">
      <h2>Mathematical SIZE System</h2>
      <p>Precise scaling with perfect proportions at every size</p>
    </div>
    
    <div class="size-grid">
      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as size}
        <div class="size-demo">
          <div class="size-info">
            <span class="size-label">SIZE-{size}</span>
            <span class="size-pixels">
              {size === 1 ? '88px' : 
               size === 2 ? '111px' :
               size === 3 ? '166px' :
               size === 4 ? '222px' :
               size === 5 ? '333px' :
               size === 6 ? '444px' :
               size === 7 ? '555px' :
               size === 8 ? '777px' : '999px'}
            </span>
          </div>
          <div class="size-preview">
            <FlipCard 
              component={exampleComponents[0]} 
              size={size}
              showComponents={{
                colorPalette: size >= 3,
                tags: size >= 4,
                toolbar: size >= 5,
                buyComponent: size >= 5
              }}
            />
          </div>
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Example FlipCards -->
  <section class="examples-section">
    <div class="section-header">
      <h2>Professional Examples</h2>
      <p>See what you can create with the FlipCard Designer</p>
    </div>
    
    <div class="examples-grid">
      {#each exampleComponents as component}
        <div class="example-item">
          <FlipCard 
            {component} 
            size={5}
            on:buy={handleBuy}
          />
          <div class="example-info">
            <h3>{component.name}</h3>
            <p>{component.consumer_tagline}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Enhanced Designer -->
  <section class="designer-section">
    <FlipCardDesignerEnhanced on:export-to-catalog={handleExportToCatalog} />
  </section>
  
  <!-- Personal Catalog Preview -->
  {#if personalCatalog.length > 0}
    <section class="catalog-section">
      <div class="section-header">
        <h2>Your Personal Catalog</h2>
        <p>{personalCatalog.length} FlipCard{personalCatalog.length !== 1 ? 's' : ''} created</p>
      </div>
      
      <div class="catalog-grid">
        {#each personalCatalog as item}
          <div class="catalog-item">
            <h4>{item.product.name}</h4>
            <p>{item.product.shortDescription}</p>
            <div class="catalog-meta">
              <span>Quality: {Math.round(item.product.metadata.qualityMetrics.professionalScore)}%</span>
              <span>Created: {new Date(item.exportedAt).toLocaleTimeString()}</span>
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  .flipcard-designer-page {
    min-height: 100vh;
    background: #f9fafb;
  }
  
  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, #0ea5e9, #3b82f6);
    color: white;
    padding: 4rem 2rem;
    text-align: center;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .hero-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    margin: 0 0 2rem;
    opacity: 0.9;
  }
  
  .hero-features {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
  }
  
  .feature-icon {
    font-size: 1.5rem;
  }
  
  .feature-text {
    font-weight: 500;
  }
  
  /* Size Showcase */
  .size-showcase {
    padding: 4rem 2rem;
    background: white;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .section-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: #111827;
  }
  
  .section-header p {
    font-size: 1.125rem;
    color: #6b7280;
  }
  
  .size-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .size-demo {
    text-align: center;
  }
  
  .size-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
  
  .size-label {
    font-weight: 600;
    color: #374151;
  }
  
  .size-pixels {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .size-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 150px;
    padding: 1rem;
  }
  
  /* Examples Section */
  .examples-section {
    padding: 4rem 2rem;
    background: #f3f4f6;
  }
  
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .example-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .example-info {
    text-align: center;
  }
  
  .example-info h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #111827;
  }
  
  .example-info p {
    color: #6b7280;
    margin: 0;
  }
  
  /* Designer Section */
  .designer-section {
    padding: 4rem 0;
    background: white;
  }
  
  /* Catalog Section */
  .catalog-section {
    padding: 4rem 2rem;
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
  
  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .catalog-item {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }
  
  .catalog-item h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #111827;
  }
  
  .catalog-item p {
    color: #6b7280;
    margin: 0 0 1rem;
  }
  
  .catalog-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #9ca3af;
  }
  
  /* Dark mode support */
  :global(.dark) .flipcard-designer-page {
    background: #111827;
  }
  
  :global(.dark) .size-showcase,
  :global(.dark) .designer-section {
    background: #1f2937;
  }
  
  :global(.dark) .examples-section {
    background: #111827;
  }
  
  :global(.dark) .catalog-section {
    background: #111827;
    border-top-color: #374151;
  }
  
  :global(.dark) .section-header h2,
  :global(.dark) .example-info h3,
  :global(.dark) .catalog-item h4 {
    color: #f3f4f6;
  }
  
  :global(.dark) .catalog-item {
    background: #1f2937;
    border-color: #374151;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
      flex-direction: column;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
    }
    
    .hero-features {
      flex-direction: column;
      align-items: center;
    }
    
    .size-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
    
    .examples-grid {
      grid-template-columns: 1fr;
    }
  }
</style>