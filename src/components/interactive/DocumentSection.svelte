<!-- DocumentSection.svelte - Reusable section component for scrollytelling -->
<script>
  import ScrollObserver from './ScrollObserver.svelte';
  
  export let id = '';
  export let title = '';
  export let subtitle = '';
  export let background = 'default';
  export let centerContent = false;
  
  let isVisible = false;
  
  const backgrounds = {
    default: 'rgba(30, 41, 59, 0.3)',
    dark: 'rgba(15, 23, 42, 0.8)',
    gradient: 'linear-gradient(to bottom, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8))',
    transparent: 'transparent'
  };
</script>

<ScrollObserver 
  threshold={0.2} 
  on:enter={() => isVisible = true}
  once={true}
>
  <section 
    {id}
    class="document-section"
    class:visible={isVisible}
    class:center={centerContent}
    style="background: {backgrounds[background]};"
  >
    <div class="section-content">
      {#if title}
        <h2 class="section-title">{title}</h2>
      {/if}
      {#if subtitle}
        <p class="section-subtitle">{subtitle}</p>
      {/if}
      <div class="section-body">
        <slot />
      </div>
    </div>
  </section>
</ScrollObserver>

<style>
  .document-section {
    padding: 4rem 0;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .document-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .document-section.center {
    text-align: center;
  }
  
  .section-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--brand-cyan);
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .section-subtitle {
    font-size: 1.25rem;
    color: var(--color-text-muted);
    margin-bottom: 3rem;
    line-height: 1.6;
    max-width: 800px;
  }
  
  .section-body {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text-light);
  }
  
  @media (max-width: 768px) {
    .document-section {
      padding: 3rem 0;
    }
    
    .section-title {
      font-size: 2rem;
    }
    
    .section-subtitle {
      font-size: 1.125rem;
    }
    
    .section-content {
      padding: 0 1rem;
    }
  }
</style>
