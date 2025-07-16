<!-- Clean FlipCard Designer Focused on SIZE-5 Master -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import FlipCard from './FlipCard.svelte';
  
  const dispatch = createEventDispatcher();
  
  // 📐 MASTER SIZE - SIZE 5 (333px) is the design canvas
  const MASTER_SIZE = 333;
  const IMAGE_BOX_RATIO = 0.85; // ImageBox takes 85% of card
  const IMAGE_BOX_SIZE = Math.round(MASTER_SIZE * IMAGE_BOX_RATIO);
  
  // Mathematical SIZE system for preview
  const SIZES = {
    1: 88,   // 333 ÷ 4
    2: 111,  // 333 ÷ 3  
    3: 166,  // 333 ÷ 2
    4: 222,  // 333 × 2/3
    5: 333,  // Master ⭐
    6: 444,  // 333 × 4/3
    7: 555,  // 333 × 5/3
    8: 777,  // 333 × 7/3
    9: 999   // 333 × 3
  };
  
  // Design state for SIZE-5 master
  let designState = {
    // Product info
    name: 'NOBS PAY',
    tagline: 'Done for You Billing',
    description: 'Universal payment processing with Stripe, PayPal, and crypto support.',
    category: 'payment-processing',
    
    // Design settings
    gradientStart: '#22d3ee', // cyan-400
    gradientEnd: '#3b82f6',   // blue-500
    gradientAngle: 135,
    
    // Text settings
    titleFont: 'Inter',
    titleSize: 36,
    titleWeight: 600,
    
    taglineFont: 'Inter', 
    taglineSize: 18,
    taglineWeight: 500,
    
    // Tags
    tags: ['payment', 'stripe', 'billing'],
    
    // Pricing
    priceIndividual: 19900,
    priceTeam: 49900,
    priceEnterprise: 149900,
    
    // Component toggles
    showColorPalette: true,
    showTags: true,
    showToolbar: true,
    showBuyComponent: true
  };
  
  // Available fonts
  const fonts = [
    { name: 'Inter', label: 'Inter - Clean & Professional' },
    { name: 'Poppins', label: 'Poppins - Friendly & Rounded' },
    { name: 'JetBrains Mono', label: 'JetBrains Mono - Technical' },
    { name: 'Playfair Display', label: 'Playfair Display - Elegant' },
    { name: 'Oswald', label: 'Oswald - Bold Impact' },
    { name: 'Space Grotesk', label: 'Space Grotesk - Modern' },
    { name: 'Roboto', label: 'Roboto - Universal' },
    { name: 'Montserrat', label: 'Montserrat - Geometric' }
  ];
  
  // Font weights
  const fontWeights = [
    { value: 400, label: 'Regular' },
    { value: 500, label: 'Medium' },
    { value: 600, label: 'SemiBold' },
    { value: 700, label: 'Bold' }
  ];
  
  // Quick color presets
  const colorPresets = [
    { name: 'Professional Cyan', start: '#22d3ee', end: '#3b82f6' },
    { name: 'Payment Orange', start: '#fb923c', end: '#ef4444' },
    { name: 'Success Green', start: '#34d399', end: '#14b8a6' },
    { name: 'Royal Purple', start: '#a855f7', end: '#ec4899' },
    { name: 'Modern Blue', start: '#60a5fa', end: '#06b6d4' },
    { name: 'Warm Sunset', start: '#fbbf24', end: '#f97316' },
    { name: 'Dark Slate', start: '#64748b', end: '#334155' },
    { name: 'Neon Pink', start: '#ec4899', end: '#f43f5e' }
  ];
  
  // Generate component for preview
  $: previewComponent = {
    id: 'designer-preview',
    name: designState.name,
    consumer_tagline: designState.tagline,
    description: designState.description,
    category: designState.category,
    flip_card_color: `from-[${designState.gradientStart}] to-[${designState.gradientEnd}]`,
    price_individual: designState.priceIndividual,
    price_team: designState.priceTeam,
    price_enterprise: designState.priceEnterprise,
    tags: designState.tags,
    tech_stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
    developer_features: ['Full TypeScript Support', 'Comprehensive Documentation', 'Premium Support'],
    // Typography settings
    titleFont: designState.titleFont,
    titleWeight: designState.titleWeight,
    taglineFont: designState.taglineFont,
    taglineWeight: designState.taglineWeight
  };
  
  // Handle export
  function handleExport() {
    const exportData = {
      product: previewComponent,
      design: {
        gradient: {
          start: designState.gradientStart,
          end: designState.gradientEnd,
          angle: designState.gradientAngle
        },
        typography: {
          title: {
            font: designState.titleFont,
            size: designState.titleSize,
            weight: designState.titleWeight
          },
          tagline: {
            font: designState.taglineFont,
            size: designState.taglineSize,
            weight: designState.taglineWeight
          }
        }
      },
      exportedAt: new Date().toISOString()
    };
    
    dispatch('export', exportData);
    console.log('Exported FlipCard:', exportData);
  }
  
  // Apply color preset
  function applyPreset(preset: typeof colorPresets[0]) {
    designState.gradientStart = preset.start;
    designState.gradientEnd = preset.end;
  }
  
  // Add tag
  function addTag() {
    const newTag = prompt('Enter new tag:');
    if (newTag && !designState.tags.includes(newTag)) {
      designState.tags = [...designState.tags, newTag.toLowerCase().replace(/\s+/g, '-')];
    }
  }
  
  // Remove tag
  function removeTag(index: number) {
    designState.tags = designState.tags.filter((_, i) => i !== index);
  }
  
  // Load fonts
  onMount(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
</script>

<div class="designer-container">
  <!-- Minimal Header -->
  <header class="designer-header">
    <h1>🎨 FlipCard Designer</h1>
    <div class="header-actions">
      <span class="master-label">Master: SIZE-5 (333px)</span>
      <button class="export-btn" on:click={handleExport}>
        📦 Export to Catalog
      </button>
    </div>
  </header>
  
  <div class="designer-layout">
    <!-- LEFT COLUMN: Tools -->
    <aside class="tools-panel">
      <!-- Product Info -->
      <section class="tool-section">
        <h3>📝 Product Info</h3>
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            id="name"
            type="text" 
            bind:value={designState.name}
            maxlength="20"
            placeholder="Product Name"
          />
        </div>
        <div class="form-group">
          <label for="tagline">Tagline</label>
          <input 
            id="tagline"
            type="text" 
            bind:value={designState.tagline}
            maxlength="30"
            placeholder="Short Description"
          />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" bind:value={designState.category}>
            <option value="payment-processing">Payment Processing</option>
            <option value="authentication">Authentication</option>
            <option value="data-visualization">Data Visualization</option>
            <option value="forms">Forms & Input</option>
            <option value="api">API & Backend</option>
            <option value="analytics">Analytics</option>
            <option value="email">Email & Communication</option>
            <option value="files">File Management</option>
          </select>
        </div>
      </section>
      
      <!-- Colors -->
      <section class="tool-section">
        <h3>🎨 Colors</h3>
        <div class="color-controls">
          <div class="form-group">
            <label for="gradient-start">Gradient Start</label>
            <div class="color-input-group">
              <input 
                id="gradient-start"
                type="color" 
                bind:value={designState.gradientStart}
              />
              <input 
                type="text" 
                bind:value={designState.gradientStart}
                placeholder="#22d3ee"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="gradient-end">Gradient End</label>
            <div class="color-input-group">
              <input 
                id="gradient-end"
                type="color" 
                bind:value={designState.gradientEnd}
              />
              <input 
                type="text" 
                bind:value={designState.gradientEnd}
                placeholder="#3b82f6"
              />
            </div>
          </div>
        </div>
        
        <!-- Color Presets -->
        <div class="color-presets">
          <label>Quick Presets</label>
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
        </div>
      </section>
      
      <!-- Typography -->
      <section class="tool-section">
        <h3>📝 Typography</h3>
        
        <!-- Title Settings -->
        <div class="typography-group">
          <h4>Title</h4>
          <div class="form-group">
            <label for="title-font">Font</label>
            <select id="title-font" bind:value={designState.titleFont}>
              {#each fonts as font}
                <option value={font.name}>{font.label}</option>
              {/each}
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="title-size">Size</label>
              <input 
                id="title-size"
                type="number" 
                bind:value={designState.titleSize}
                min="20" 
                max="48"
              />
            </div>
            <div class="form-group">
              <label for="title-weight">Weight</label>
              <select id="title-weight" bind:value={designState.titleWeight}>
                {#each fontWeights as weight}
                  <option value={weight.value}>{weight.label}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        
        <!-- Tagline Settings -->
        <div class="typography-group">
          <h4>Tagline</h4>
          <div class="form-group">
            <label for="tagline-font">Font</label>
            <select id="tagline-font" bind:value={designState.taglineFont}>
              {#each fonts as font}
                <option value={font.name}>{font.label}</option>
              {/each}
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="tagline-size">Size</label>
              <input 
                id="tagline-size"
                type="number" 
                bind:value={designState.taglineSize}
                min="12" 
                max="24"
              />
            </div>
            <div class="form-group">
              <label for="tagline-weight">Weight</label>
              <select id="tagline-weight" bind:value={designState.taglineWeight}>
                {#each fontWeights as weight}
                  <option value={weight.value}>{weight.label}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Tags -->
      <section class="tool-section">
        <h3>🏷️ Tags</h3>
        <div class="tags-editor">
          <div class="current-tags">
            {#each designState.tags as tag, index}
              <span class="tag-item">
                #{tag}
                <button on:click={() => removeTag(index)}>×</button>
              </span>
            {/each}
          </div>
          <button class="add-tag-btn" on:click={addTag}>+ Add Tag</button>
        </div>
      </section>
      
      <!-- Component Toggles -->
      <section class="tool-section">
        <h3>🎛️ Components</h3>
        <div class="toggle-list">
          <label>
            <input type="checkbox" bind:checked={designState.showColorPalette} />
            Show Color Palette
          </label>
          <label>
            <input type="checkbox" bind:checked={designState.showTags} />
            Show Tags Bar
          </label>
          <label>
            <input type="checkbox" bind:checked={designState.showToolbar} />
            Show Toolbar
          </label>
          <label>
            <input type="checkbox" bind:checked={designState.showBuyComponent} />
            Show Buy Component
          </label>
        </div>
      </section>
      
      <!-- Pricing -->
      <section class="tool-section">
        <h3>💰 Pricing</h3>
        <div class="form-group">
          <label for="price-individual">Individual ($)</label>
          <input 
            id="price-individual"
            type="number" 
            bind:value={designState.priceIndividual}
            min="100"
            step="100"
          />
        </div>
        <div class="form-group">
          <label for="price-team">Team ($)</label>
          <input 
            id="price-team"
            type="number" 
            bind:value={designState.priceTeam}
            min="100"
            step="100"
          />
        </div>
        <div class="form-group">
          <label for="price-enterprise">Enterprise ($)</label>
          <input 
            id="price-enterprise"
            type="number" 
            bind:value={designState.priceEnterprise}
            min="100"
            step="100"
          />
        </div>
      </section>
    </aside>
    
    <!-- RIGHT COLUMN: Design Window -->
    <main class="design-panel">
      <!-- Master Design (SIZE-5) - No title, starts at top -->
      <div class="master-design">
        <div class="canvas-container">
          <div class="canvas-wrapper">
            <FlipCard 
              component={previewComponent}
              size={5}
            />
            />
          </div>
          <div class="canvas-info">
            <h2>Master Design Canvas</h2>
            <span>SIZE-5 (333×333px) • Master Baseline</span>
          </div>
        </div>
      </div>
      
      <!-- Size Previews -->
      <div class="size-previews">
        <h3>Automatic Size Derivatives</h3>
        <div class="preview-grid">
          {#each [1, 2, 3, 4, 6, 7, 8, 9] as size}
            <div class="preview-item">
              <FlipCard 
                component={previewComponent}
                {size}
              />
              <div class="preview-label">
                SIZE-{size} ({SIZES[size]}px)
              </div>
            </div>
          {/each}
        </div>
      </div>
    </main>
  </div>
</div>

<style>
  .designer-container {
    min-height: 100vh;
    background: #f9fafb;
    display: flex;
    flex-direction: column;
  }
  
  /* Minimal Header */
  .designer-header {
    background: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .designer-header h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: #111827;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .master-label {
    color: #6b7280;
    font-weight: 500;
  }
  
  .export-btn {
    background: linear-gradient(135deg, #22d3ee, #3b82f6);
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .export-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  /* Layout */
  .designer-layout {
    flex: 1;
    display: grid;
    grid-template-columns: 320px 1fr;
    overflow: hidden;
  }
  
  /* Tools Panel */
  .tools-panel {
    background: white;
    border-right: 1px solid #e5e7eb;
    overflow-y: auto;
    padding: 1.5rem;
  }
  
  .tool-section {
    margin-bottom: 2rem;
  }
  
  .tool-section h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 1rem;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .tool-section h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #374151;
  }
  
  /* Form Controls */
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
  
  .form-group input[type="text"],
  .form-group input[type="number"],
  .form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }
  
  .form-group input[type="number"] {
    -moz-appearance: textfield;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  
  /* Color Controls */
  .color-input-group {
    display: flex;
    gap: 0.5rem;
  }
  
  .color-input-group input[type="color"] {
    width: 48px;
    height: 36px;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  
  .color-input-group input[type="text"] {
    flex: 1;
  }
  
  .color-presets {
    margin-top: 1rem;
  }
  
  .color-presets label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .preset-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }
  
  .preset-btn {
    width: 100%;
    height: 32px;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .preset-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  /* Typography */
  .typography-group {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .typography-group:last-child {
    border-bottom: none;
  }
  
  /* Tags */
  .current-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .tag-item {
    background: #e0e7ff;
    color: #4338ca;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .tag-item button {
    background: none;
    border: none;
    color: #4338ca;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
  }
  
  .add-tag-btn {
    background: #f3f4f6;
    border: 1px dashed #9ca3af;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .add-tag-btn:hover {
    background: #e5e7eb;
    border-color: #6b7280;
  }
  
  /* Toggle List */
  .toggle-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .toggle-list label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
  }
  
  /* Design Panel */
  .design-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    overflow-y: auto;
  }
  
  /* Master Design */
  .master-design {
    margin-bottom: 3rem;
  }
  
  .canvas-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .canvas-wrapper {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 2px solid #e5e7eb;
  }
  
  .canvas-info {
    text-align: center;
  }
  
  .canvas-info h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.25rem;
    color: #111827;
  }
  
  .canvas-info span {
    display: block;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  /* Size Previews */
  .size-previews h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1.5rem;
    color: #111827;
    text-align: center;
  }
  
  .preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    justify-items: center;
  }
  
  .preview-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  .preview-label {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 500;
  }
  
  /* Dark mode support */
  :global(.dark) .designer-container {
    background: #111827;
  }
  
  :global(.dark) .designer-header,
  :global(.dark) .tools-panel,
  :global(.dark) .canvas-wrapper {
    background: #1f2937;
    border-color: #374151;
  }
  
  :global(.dark) .designer-header h1,
  :global(.dark) .tool-section h3,
  :global(.dark) .master-design h2,
  :global(.dark) .size-previews h3 {
    color: #f3f4f6;
  }
  
  :global(.dark) .form-group label,
  :global(.dark) .tool-section h4,
  :global(.dark) .toggle-list label {
    color: #d1d5db;
  }
  
  :global(.dark) input,
  :global(.dark) select {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .designer-layout {
      grid-template-columns: 280px 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .designer-layout {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
    
    .tools-panel {
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
      max-height: 50vh;
    }
    
    .preview-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>