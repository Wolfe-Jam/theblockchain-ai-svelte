<!-- Clean FlipCardDesigner Layout -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import FlipCard from './FlipCard.svelte';
  import type { Component } from '$lib/marketplace/types';
  
  const dispatch = createEventDispatcher();
  
  // Design state for master card (SIZE-5: 333px)
  let designConfig = {
    name: 'NOBS PAY',
    tagline: 'Done for You Billing',
    description: 'Universal payment processing with Stripe, PayPal, and crypto support.',
    category: 'payment-processing',
    gradientStart: '#fb923c', // orange-400
    gradientEnd: '#ef4444',   // red-500
    
    // Pricing tiers
    priceIndividual: 19900,
    priceTeam: 49900,
    priceEnterprise: 149900,
    
    // Component visibility
    showColorPalette: true,
    showTags: true,
    showToolbar: true,
    showBuyComponent: true,
    
    // Tags
    tags: ['payment', 'stripe', 'billing']
  };
  
  // Color presets
  const colorPresets = [
    { name: 'Payment Orange', start: '#fb923c', end: '#ef4444' },
    { name: 'Professional Cyan', start: '#22d3ee', end: '#3b82f6' },
    { name: 'Success Green', start: '#34d399', end: '#14b8a6' },
    { name: 'Royal Purple', start: '#a855f7', end: '#ec4899' },
    { name: 'Modern Blue', start: '#60a5fa', end: '#06b6d4' },
    { name: 'Warm Sunset', start: '#fbbf24', end: '#f97316' },
    { name: 'Dark Slate', start: '#64748b', end: '#334155' },
    { name: 'Neon Pink', start: '#ec4899', end: '#f43f5e' }
  ];
  
  // Generate preview component
  $: previewComponent = {
    id: 'designer-preview',
    name: designConfig.name,
    consumer_tagline: designConfig.tagline,
    description: designConfig.description,
    category: designConfig.category,
    flip_card_color: `from-[${designConfig.gradientStart}] to-[${designConfig.gradientEnd}]`,
    price_individual: designConfig.priceIndividual,
    price_team: designConfig.priceTeam,
    price_enterprise: designConfig.priceEnterprise,
    tags: designConfig.tags,
    tech_stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
    developer_features: ['Full TypeScript Support', 'Comprehensive Documentation', 'Premium Support']
  };
  
  // Apply color preset
  function applyPreset(preset: typeof colorPresets[0]) {
    designConfig.gradientStart = preset.start;
    designConfig.gradientEnd = preset.end;
  }
  
  // Export design
  function exportDesign() {
    dispatch('export', {
      component: previewComponent,
      designConfig
    });
  }
</script>

<div class="designer-container">
  <!-- Header -->
  <header class="designer-header">
    <h1>🎨 FlipCard Designer</h1>
    <p>Create professional software packaging with the universal FlipCard system</p>
  </header>
  
  <div class="designer-content">
    <!-- Left: Controls -->
    <aside class="controls-panel">
      <!-- Colors Section -->
      <section class="control-section">
        <h3>🎨 Colors & Theme</h3>
        
        <div class="color-inputs">
          <div class="input-group">
            <label>Gradient Start</label>
            <div class="color-input">
              <input type="color" bind:value={designConfig.gradientStart} />
              <input type="text" bind:value={designConfig.gradientStart} />
            </div>
          </div>
          
          <div class="input-group">
            <label>Gradient End</label>
            <div class="color-input">
              <input type="color" bind:value={designConfig.gradientEnd} />
              <input type="text" bind:value={designConfig.gradientEnd} />
            </div>
          </div>
        </div>
        
        <div class="preset-grid">
          {#each colorPresets as preset}
            <button 
              class="preset-btn"
              style="background: linear-gradient(135deg, {preset.start}, {preset.end})"
              on:click={() => applyPreset(preset)}
              title={preset.name}
            />
          {/each}
        </div>
      </section>
      
      <!-- Text Section -->
      <section class="control-section">
        <h3>✏️ Text & Content</h3>
        
        <div class="input-group">
          <label>Product Title</label>
          <input type="text" bind:value={designConfig.name} maxlength="20" />
        </div>
        
        <div class="input-group">
          <label>Tagline (4-5 words)</label>
          <input type="text" bind:value={designConfig.tagline} maxlength="30" />
        </div>
        
        <div class="input-group">
          <label>Full Description</label>
          <textarea bind:value={designConfig.description} rows="3"></textarea>
        </div>
      </section>
      
      <!-- Pricing Section -->
      <section class="control-section">
        <h3>💰 Pricing</h3>
        
        <div class="pricing-grid">
          <div class="input-group">
            <label>Individual</label>
            <input type="number" bind:value={designConfig.priceIndividual} step="100" />
          </div>
          
          <div class="input-group">
            <label>Team</label>
            <input type="number" bind:value={designConfig.priceTeam} step="100" />
          </div>
          
          <div class="input-group">
            <label>Enterprise</label>
            <input type="number" bind:value={designConfig.priceEnterprise} step="100" />
          </div>
        </div>
      </section>
      
      <!-- Export Button -->
      <button class="export-btn" on:click={exportDesign}>
        ⚡️ Create FlipCard
      </button>
    </aside>
    
    <!-- Right: Preview -->
    <main class="preview-panel">
      <!-- Master Preview -->
      <div class="master-preview">
        <h3>Live Preview (Vector Scaling)</h3>
        <p class="preview-subtitle">SIZE-5 Master (333px baseline)</p>
        
        <div class="master-card">
          <FlipCard 
            component={previewComponent}
            size={5}
            showComponents={{
              colorPalette: designConfig.showColorPalette,
              tags: designConfig.showTags,
              toolbar: designConfig.showToolbar,
              buyComponent: designConfig.showBuyComponent
            }}
          />
        </div>
      </div>
      
      <!-- Size Variations -->
      <div class="size-variations">
        <h4>Automatic Size Derivatives</h4>
        <div class="size-grid">
          {#each [1, 2, 3, 4, 6, 7, 8] as size}
            <div class="size-item">
              <FlipCard 
                component={previewComponent}
                {size}
                showComponents={{
                  colorPalette: size >= 3,
                  tags: size >= 4,
                  toolbar: size >= 5,
                  buyComponent: size >= 5
                }}
              />
              <span class="size-label">SIZE-{size}</span>
            </div>
          {/each}
        </div>
      </div>
    </main>
  </div>
</div>

<style>
  /* Container */
  .designer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
    min-height: 100vh;
    background: #f9fafb;
  }
  
  /* Header */
  .designer-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .designer-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: #111827;
  }
  
  .designer-header p {
    color: #6b7280;
    margin: 0;
  }
  
  /* Main Layout */
  .designer-content {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  /* Controls Panel */
  .controls-panel {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .control-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .control-section:last-of-type {
    border-bottom: none;
    margin-bottom: 1rem;
  }
  
  .control-section h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 1rem;
    color: #111827;
  }
  
  /* Input Groups */
  .input-group {
    margin-bottom: 1rem;
  }
  
  .input-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
  
  .input-group input,
  .input-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }
  
  /* Color Inputs */
  .color-inputs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .color-input {
    display: flex;
    gap: 0.5rem;
  }
  
  .color-input input[type="color"] {
    width: 40px;
    height: 34px;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  
  .color-input input[type="text"] {
    flex: 1;
  }
  
  /* Preset Grid */
  .preset-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }
  
  .preset-btn {
    height: 32px;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .preset-btn:hover {
    transform: scale(1.1);
  }
  
  /* Pricing Grid */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
  
  /* Export Button */
  .export-btn {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .export-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  /* Preview Panel */
  .preview-panel {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .master-preview {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .master-preview h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #111827;
  }
  
  .preview-subtitle {
    color: #6b7280;
    margin: 0 0 2rem;
    font-size: 0.875rem;
  }
  
  .master-card {
    display: inline-flex;
    padding: 2rem;
    background: #f9fafb;
    border-radius: 1rem;
  }
  
  /* Size Variations */
  .size-variations {
    text-align: center;
  }
  
  .size-variations h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 1.5rem;
    color: #111827;
  }
  
  .size-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }
  
  .size-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .size-label {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 500;
  }
  
  /* Dark mode */
  :global(.dark) .designer-container {
    background: #111827;
  }
  
  :global(.dark) .controls-panel,
  :global(.dark) .preview-panel {
    background: #1f2937;
  }
  
  :global(.dark) .designer-header h1,
  :global(.dark) .control-section h3,
  :global(.dark) .master-preview h3,
  :global(.dark) .size-variations h4 {
    color: #f3f4f6;
  }
  
  :global(.dark) .designer-header p,
  :global(.dark) .preview-subtitle,
  :global(.dark) .size-label {
    color: #9ca3af;
  }
  
  :global(.dark) .input-group label {
    color: #d1d5db;
  }
  
  :global(.dark) input,
  :global(.dark) textarea {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  
  :global(.dark) .master-card {
    background: #374151;
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .designer-content {
      grid-template-columns: 320px 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .designer-content {
      grid-template-columns: 1fr;
    }
    
    .controls-panel {
      order: 2;
    }
    
    .preview-panel {
      order: 1;
    }
  }
</style>