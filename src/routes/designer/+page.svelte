<script lang="ts">
  import { onMount } from 'svelte';
  import FlipCardDesignerEnhanced from '$lib/components/marketplace/FlipCardDesignerEnhanced.svelte';
  import type { Component } from '$lib/marketplace/types';
  
  let designedComponent: Component | null = null;
  let showSuccess = false;
  
  function handleExport(event: CustomEvent) {
    const { component, designConfig } = event.detail;
    designedComponent = component;
    showSuccess = true;
    
    console.log('🎨 FlipCard Designed!', { component, designConfig });
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      showSuccess = false;
    }, 3000);
  }
  
  function downloadComponentJSON() {
    if (!designedComponent) return;
    
    const dataStr = JSON.stringify(designedComponent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${designedComponent.name.toLowerCase().replace(/\s+/g, '-')}-flipcard.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>FlipCard Designer - theBlockchain.ai</title>
  <meta name="description" content="Create professional software packaging with the universal FlipCard Designer. Turn any dev tool into a beautiful, sellable product." />
</svelte:head>

<!-- 🎨 FLIPCARD DESIGNER PAGE -->
<div class="designer-page">
  <!-- Success Notification -->
  {#if showSuccess}
    <div class="success-notification">
      <div class="success-content">
        <span class="success-icon">🎉</span>
        <span class="success-text">FlipCard Created Successfully!</span>
        <button class="download-btn" on:click={downloadComponentJSON}>
          📦 Download JSON
        </button>
      </div>
    </div>
  {/if}
  
  <!-- Designer Component (has its own header) -->
  <FlipCardDesignerEnhanced on:export={handleExport} />
</div>

<style>
  .designer-page {
    min-height: 100vh;
    background: #f9fafb;
  }
  
  /* 🎉 SUCCESS NOTIFICATION */
  .success-notification {
    background: #10b981;
    color: white;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 50;
  }
  
  .success-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .success-icon {
    font-size: 1.5rem;
  }
  
  .success-text {
    font-weight: 500;
  }
  
  .download-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .download-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  /* Responsive Design */
  @media (max-width: 640px) {
    .success-content {
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    .download-btn {
      width: 100%;
    }
  }
  
  /* Dark mode support */
  :global(.dark) .designer-page {
    background: #111827;
  }
</style>