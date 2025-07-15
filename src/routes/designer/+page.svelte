<script lang="ts">
  import { onMount } from 'svelte';
  import FlipCardDesigner from '$lib/components/marketplace/FlipCardDesigner.svelte';
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
  <!-- Header -->
  <header class="page-header">
    <div class="container">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">
            🎨 FlipCard Designer
          </h1>
          <p class="page-subtitle">
            Create the "album cover" for your software. Turn any dev tool into a professional, sellable product with the universal FlipCard packaging system.
          </p>
        </div>
        
        <div class="header-stats">
          <div class="stat">
            <span class="stat-number">333px</span>
            <span class="stat-label">Magic Baseline</span>
          </div>
          <div class="stat">
            <span class="stat-number">1-8</span>
            <span class="stat-label">Vector Sizes</span>
          </div>
          <div class="stat">
            <span class="stat-number">∞</span>
            <span class="stat-label">Possibilities</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  
  <!-- Success Notification -->
  {#if showSuccess}
    <div class="success-notification">
      <div class="container">
        <div class="success-content">
          <div class="success-icon">🎉</div>
          <div class="success-text">
            <h3>FlipCard Created Successfully!</h3>
            <p>Your professional software packaging is ready. Perfect scaling across all sizes (1-8).</p>
          </div>
          <button class="download-btn" on:click={downloadComponentJSON}>
            📦 Download JSON
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Designer Interface -->
  <main class="designer-main">
    <div class="container">
      <FlipCardDesigner on:export={handleExport} />
    </div>
  </main>
  
  <!-- About Section -->
  <section class="about-section">
    <div class="container">
      <div class="about-content">
        <h2>🚀 The Software Packaging Revolution</h2>
        <div class="about-grid">
          <div class="about-card">
            <div class="about-icon">🎨</div>
            <h3>Universal Packaging</h3>
            <p>Turn any dev tool into a professional product with beautiful FlipCard packaging. No design skills required.</p>
          </div>
          
          <div class="about-card">
            <div class="about-icon">📐</div>
            <h3>Vector Scaling</h3>
            <p>Perfect aspect ratio scaling from SIZE-1 (giant) to SIZE-8 (micro). Beats MidJourney's vague "small/medium/large".</p>
          </div>
          
          <div class="about-card">
            <div class="about-icon">⚡️</div>
            <h3>NFT Ready</h3>
            <p>FlipCard "album covers" can be minted as collectible NFTs. Dual revenue: component sales + NFT collectibles.</p>
          </div>
          
          <div class="about-card">
            <div class="about-icon">🏆</div>
            <h3>Creator Economy</h3>
            <p>Enable Developer + Artist collaboration. Build the trading card economy for software components.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Call to Action -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2>Ready to Package Your Software?</h2>
        <p>Join the FlipCard revolution. Create professional packaging for any dev tool.</p>
        <div class="cta-buttons">
          <a href="/marketplace" class="btn btn-primary">
            🛍️ Browse Marketplace
          </a>
          <a href="/docs" class="btn btn-secondary">
            📚 Documentation
          </a>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .designer-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  /* 📄 PAGE HEADER */
  .page-header {
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    color: white;
    padding: 4rem 0;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
  }
  
  .title-section {
    flex: 1;
  }
  
  .page-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.1;
  }
  
  .page-subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    line-height: 1.6;
    max-width: 600px;
  }
  
  .header-stats {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  
  .stat {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 1rem;
    min-width: 100px;
  }
  
  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 0.875rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* 🎉 SUCCESS NOTIFICATION */
  .success-notification {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 1.5rem 0;
    position: relative;
    z-index: 50;
  }
  
  .success-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .success-icon {
    font-size: 2rem;
  }
  
  .success-text {
    flex: 1;
  }
  
  .success-text h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .success-text p {
    opacity: 0.9;
    font-size: 0.875rem;
  }
  
  .download-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
  }
  
  .download-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  /* 🎨 DESIGNER MAIN */
  .designer-main {
    padding: 4rem 0;
  }
  
  /* 📖 ABOUT SECTION */
  .about-section {
    background: white;
    padding: 4rem 0;
  }
  
  .about-content {
    text-align: center;
  }
  
  .about-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 3rem;
  }
  
  .about-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .about-card {
    background: #f9fafb;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    transition: transform 0.2s;
  }
  
  .about-card:hover {
    transform: translateY(-4px);
  }
  
  .about-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .about-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1rem;
  }
  
  .about-card p {
    color: #6b7280;
    line-height: 1.6;
  }
  
  /* 🚀 CTA SECTION */
  .cta-section {
    background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
    color: white;
    padding: 4rem 0;
  }
  
  .cta-content {
    text-align: center;
  }
  
  .cta-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .cta-content p {
    font-size: 1.25rem;
    opacity: 0.8;
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn {
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .header-content {
      flex-direction: column;
      text-align: center;
      gap: 2rem;
    }
    
    .header-stats {
      justify-content: center;
    }
    
    .page-title {
      font-size: 2.5rem;
    }
    
    .success-content {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }
  }
  
  @media (max-width: 640px) {
    .container {
      padding: 0 1rem;
    }
    
    .page-title {
      font-size: 2rem;
    }
    
    .header-stats {
      flex-direction: column;
      gap: 1rem;
    }
    
    .stat {
      min-width: 80px;
      padding: 1rem;
    }
    
    .about-grid {
      grid-template-columns: 1fr;
    }
    
    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .btn {
      width: 100%;
      max-width: 300px;
    }
  }
</style>