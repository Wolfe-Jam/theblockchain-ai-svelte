<!-- FlipCardDesigner.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import FlipCard from './FlipCard.svelte';
  import type { Component } from '$lib/marketplace/types';
  
  const dispatch = createEventDispatcher();
  
  // 🎨 DESIGN STATE (NOBS Pay as default example)
  let designConfig = {
    colors: {
      primary: 'from-orange-400 to-red-500',
      secondary: 'from-orange-500 to-red-600',
      theme: 'wallet' // matches payment processing
    },
    icon: {
      type: 'payment',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>`
    },
    text: {
      title: 'NOBS PAY',
      tagline: 'Done for You Billing',
      description: 'Universal payment processing with Stripe, PayPal, and crypto support. Ready-to-use components for any application.'
    },
    pricing: {
      individual: 19900, // $199 in cents
      team: 49900,       // $499 in cents
      enterprise: 149900 // $1,499 in cents
    }
  };
  
  // 🎯 VECTOR SCALING (333px magic number system)
  let previewSizes = [1, 3, 6, 8]; // Show range from giant to micro
  
  // 🎨 COLOR THEMES (Gradient options)
  const colorThemes = [
    { name: 'Payment Orange', value: 'from-orange-400 to-red-500', category: 'payment' },
    { name: 'Auth Blue', value: 'from-blue-400 to-cyan-500', category: 'auth' },
    { name: 'Data Purple', value: 'from-purple-500 to-pink-500', category: 'data' },
    { name: 'Success Green', value: 'from-emerald-400 to-teal-600', category: 'success' },
    { name: 'Royal Indigo', value: 'from-indigo-500 to-purple-600', category: 'premium' },
    { name: 'Sunset Amber', value: 'from-amber-400 to-orange-500', category: 'warm' },
    { name: 'Neon Pink', value: 'from-pink-500 to-rose-500', category: 'vibrant' },
    { name: 'Ocean Teal', value: 'from-teal-400 to-blue-500', category: 'cool' }
  ];
  
  // 📦 ICON LIBRARY (Payment focused for NOBS Pay)
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
              <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z"/>
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
    }
  ];
  
  // 🔄 GENERATE COMPONENT DATA (for FlipCard preview)
  $: previewComponent = {
    id: 'designer-preview',
    name: designConfig.text.title,
    consumer_tagline: designConfig.text.tagline,
    description: designConfig.text.description,
    category: 'payment-processing',
    price: designConfig.pricing.individual,
    price_individual: designConfig.pricing.individual,
    price_team: designConfig.pricing.team,
    price_enterprise: designConfig.pricing.enterprise,
    flip_card_color: designConfig.colors.primary,
    tech_stack: ['Svelte', 'TypeScript', 'Payments'],
    developer_features: [
      'Stripe Integration',
      'PayPal Support', 
      'Crypto Payments',
      'TypeScript Ready'
    ]
  } as Component;
  
  // 🎨 EVENT HANDLERS
  function selectColorTheme(theme: typeof colorThemes[0]) {
    designConfig.colors.primary = theme.value;
    designConfig.colors.secondary = theme.value.replace('400', '500').replace('500', '600');
    designConfig = { ...designConfig }; // Trigger reactivity
  }
  
  function selectIcon(icon: typeof iconLibrary[0]) {
    designConfig.icon = {
      type: 'custom',
      svg: icon.svg
    };
    designConfig = { ...designConfig }; // Trigger reactivity
  }
  
  function updateText(field: 'title' | 'tagline' | 'description', value: string) {
    designConfig.text[field] = value;
    designConfig = { ...designConfig }; // Trigger reactivity
  }
  
  function exportDesign() {
    dispatch('export', {
      component: previewComponent,
      designConfig
    });
  }
</script>

<!-- 🎨 FLIPCARD DESIGNER INTERFACE -->
<div class="flipcard-designer">
  <div class="designer-header">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
      🎨 FlipCard Designer
    </h2>
    <p class="text-gray-600 dark:text-gray-400 mt-1">
      Create professional software packaging with the universal FlipCard system
    </p>
  </div>
  
  <div class="designer-layout">
    <!-- 🎛️ LEFT PANEL: Design Controls -->
    <div class="design-controls">
      
      <!-- 🎨 COLOR PICKER -->
      <div class="control-section">
        <h3 class="control-title">Colors & Theme</h3>
        <div class="color-grid">
          {#each colorThemes as theme}
            <button
              class="color-option {designConfig.colors.primary === theme.value ? 'active' : ''}"
              style="background: linear-gradient(135deg, {theme.value.replace('from-', '').replace(' to-', ', ')})"
              on:click={() => selectColorTheme(theme)}
              title={theme.name}
            >
              {#if designConfig.colors.primary === theme.value}
                <div class="color-check">✓</div>
              {/if}
            </button>
          {/each}
        </div>
      </div>
      
      <!-- 📦 ICON SELECTOR -->
      <div class="control-section">
        <h3 class="control-title">Icon & Graphics</h3>
        <div class="icon-grid">
          {#each iconLibrary as icon}
            <button
              class="icon-option {designConfig.icon.svg === icon.svg ? 'active' : ''}"
              on:click={() => selectIcon(icon)}
              title={icon.name}
            >
              <div class="icon-preview">
                {@html icon.svg}
              </div>
            </button>
          {/each}
        </div>
      </div>
      
      <!-- ✏️ TEXT EDITOR -->
      <div class="control-section">
        <h3 class="control-title">Text & Content</h3>
        
        <div class="text-field">
          <label for="title">Product Title</label>
          <input
            id="title"
            type="text"
            bind:value={designConfig.text.title}
            on:input={(e) => updateText('title', e.target.value)}
            placeholder="Enter product name..."
            maxlength="20"
          />
        </div>
        
        <div class="text-field">
          <label for="tagline">Tagline (4-5 words)</label>
          <input
            id="tagline"
            type="text"
            bind:value={designConfig.text.tagline}
            on:input={(e) => updateText('tagline', e.target.value)}
            placeholder="Brief description..."
            maxlength="30"
          />
        </div>
        
        <div class="text-field">
          <label for="description">Full Description</label>
          <textarea
            id="description"
            bind:value={designConfig.text.description}
            on:input={(e) => updateText('description', e.target.value)}
            placeholder="Detailed product description..."
            rows="3"
          ></textarea>
        </div>
      </div>
      
      <!-- 🚀 EXPORT CONTROLS -->
      <div class="control-section">
        <button class="export-btn" on:click={exportDesign}>
          ⚡️ Create FlipCard
        </button>
      </div>
    </div>
    
    <!-- 👁️ RIGHT PANEL: Live Preview -->
    <div class="preview-panel">
      <h3 class="preview-title">Live Preview (Vector Scaling)</h3>
      
      <!-- SIZE-3 MASTER PREVIEW -->
      <div class="master-preview">
        <h4>SIZE-3 Master (333px baseline)</h4>
        <div class="preview-container size-3">
          <FlipCard
            component={previewComponent}
            vectorSize={3}
            iconType="custom"
            customIconSvg={designConfig.icon.svg}
          />
        </div>
      </div>
      
      <!-- MULTI-SIZE PREVIEW -->
      <div class="multi-size-preview">
        <h4>Vector Scaling (1-8 sizes)</h4>
        <div class="size-grid">
          {#each previewSizes as size}
            <div class="size-demo">
              <span class="size-label">SIZE-{size}</span>
              <div class="preview-container size-{size}">
                <FlipCard
                  component={previewComponent}
                  vectorSize={size}
                  iconType="custom"
                  customIconSvg={designConfig.icon.svg}
                />
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .flipcard-designer {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .designer-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .designer-layout {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 3rem;
    align-items: start;
  }
  
  /* 🎛️ DESIGN CONTROLS */
  .design-controls {
    background: white;
    dark:bg-gray-800;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .control-section {
    margin-bottom: 2rem;
  }
  
  .control-section:last-child {
    margin-bottom: 0;
  }
  
  .control-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  /* 🎨 COLOR PICKER */
  .color-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }
  
  .color-option {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    border: 3px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .color-option:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .color-option.active {
    border-color: #3b82f6;
    transform: scale(1.1);
  }
  
  .color-check {
    color: white;
    font-weight: bold;
    font-size: 1.25rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  /* 📦 ICON SELECTOR */
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }
  
  .icon-option {
    width: 60px;
    height: 60px;
    background: #f3f4f6;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon-option:hover {
    background: #e5e7eb;
    transform: scale(1.05);
  }
  
  .icon-option.active {
    border-color: #3b82f6;
    background: #dbeafe;
  }
  
  .icon-preview {
    width: 28px;
    height: 28px;
    color: #6b7280;
  }
  
  .icon-option.active .icon-preview {
    color: #3b82f6;
  }
  
  /* ✏️ TEXT EDITOR */
  .text-field {
    margin-bottom: 1rem;
  }
  
  .text-field label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .text-field input,
  .text-field textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }
  
  .text-field input:focus,
  .text-field textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  /* 🚀 EXPORT BUTTON */
  .export-btn {
    width: 100%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
  }
  
  .export-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  }
  
  /* 👁️ PREVIEW PANEL */
  .preview-panel {
    background: #f9fafb;
    border-radius: 1rem;
    padding: 2rem;
    min-height: 600px;
  }
  
  .preview-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .master-preview {
    margin-bottom: 3rem;
  }
  
  .master-preview h4 {
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .preview-container {
    background: white;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }
  
  .preview-container.size-3 {
    width: 350px; /* Slightly larger than 333px for padding */
    height: 350px;
  }
  
  /* MULTI-SIZE PREVIEW */
  .multi-size-preview h4 {
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .size-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .size-demo {
    text-align: center;
  }
  
  .size-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #9ca3af;
    margin-bottom: 0.5rem;
  }
  
  .size-demo .preview-container {
    width: fit-content;
    height: auto;
    margin: 0 auto;
  }
  
  /* Dark mode support */
  :global(.dark) .design-controls {
    background: #1f2937;
    border-color: #374151;
  }
  
  :global(.dark) .control-title {
    color: #f3f4f6;
  }
  
  :global(.dark) .icon-option {
    background: #374151;
    border-color: transparent;
  }
  
  :global(.dark) .icon-option:hover {
    background: #4b5563;
  }
  
  :global(.dark) .icon-option.active {
    background: #1e40af;
    border-color: #3b82f6;
  }
  
  :global(.dark) .text-field input,
  :global(.dark) .text-field textarea {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  
  :global(.dark) .preview-panel {
    background: #111827;
  }
  
  :global(.dark) .preview-title {
    color: #f3f4f6;
  }
  
  :global(.dark) .preview-container {
    background: #1f2937;
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .designer-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .design-controls {
      margin-bottom: 2rem;
    }
  }
</style>