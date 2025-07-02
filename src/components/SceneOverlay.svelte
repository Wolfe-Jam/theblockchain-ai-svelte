<!-- SceneOverlay.svelte - Brand story overlay component -->
<script>
  import { fade } from 'svelte/transition';

  // This `visible` prop is the component's "on/off" switch.
  // The parent page will control this value.
  export let visible = false;

  // This function is purely for the component to close itself.
  function closeOverlay() {
    visible = false;
  }
</script>

{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div 
    class="overlay-backdrop" 
    on:click|self={closeOverlay}
    transition:fade={{ duration: 300 }}
  >
    <div class="overlay-content" role="dialog" aria-modal="true">
      
      <button 
        on:click={closeOverlay}
        class="close-button"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="overlay-title">About This Scene</h2>
      <div class="overlay-text">
        <p>The <strong class="ocean-color">Ocean</strong> is the vast potential of Open Source;</p>
        <p>The <strong class="sky-color">Sky</strong> is the opportunity above.</p>
        <p>The <strong class="sun-color">Sun</strong> is Trust, illuminating the path forward.</p>
        <p>The Horizon is the <span class="blockchain-highlight">theBlockchain</span>—<br>
        the stable, immutable, foundational line.</p>
        <p>The <strong>Boats</strong> are projects. Many are lost, drifting, or broken. The one sailing straight into the light is built on <strong class="trust-color">Trust</strong>.</p>
        <p>The question is: Which boat are you on?</p>
      </div>

    </div>
  </div>
{/if}

<style>
  .overlay-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
  }

  .overlay-content {
    background-color: var(--color-bg-light);
    color: var(--color-text-dark);
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    padding: 2rem;
    max-width: 32rem;
    width: 90%;
    position: relative;
    border: 1px solid var(--brand-cyan);
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0.25rem;
  }

  .close-button:hover {
    color: var(--color-text-dark);
  }

  .close-icon {
    height: 1.5rem;
    width: 1.5rem;
  }

  .overlay-title {
    color: var(--brand-cyan);
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  .overlay-text {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .overlay-text p {
    margin: 0;
  }

  .overlay-text strong {
    font-weight: 600;
  }
  
  /* Brand color classes for metaphor elements */
  .ocean-color {
    color: #3B82F6; /* Blue for Ocean */
    font-weight: 600;
  }
  
  .sky-color {
    color: var(--brand-cyan); /* Cyan for Sky */
    font-weight: 600;
  }
  
  .sun-color {
    color: var(--brand-orange); /* Orange for Sun */
    font-weight: 600;
  }
  
  .trust-color {
    color: var(--brand-orange); /* Orange for Trust */
    font-weight: 600;
  }
  
  .blockchain-highlight {
    color: #000000; /* Black text */
    background-color: rgba(255, 255, 255, 0.5); /* 50% transparent white background */
    text-decoration: underline;
    font-weight: 700;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
  }

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    .overlay-content {
      padding: 1.5rem;
      max-width: 90%;
      margin: 1rem;
    }
    
    .overlay-title {
      font-size: 1.25rem;
    }
    
    .overlay-text {
      font-size: 0.9rem;
      gap: 0.5rem;
    }
    
    .close-button {
      top: 0.75rem;
      right: 0.75rem;
      padding: 0.5rem;
      min-height: 44px;
      min-width: 44px;
    }
  }
  
  @media (max-width: 480px) {
    .overlay-content {
      padding: 1rem;
      max-width: 95%;
      margin: 0.5rem;
    }
    
    .overlay-title {
      font-size: 1.125rem;
      margin-bottom: 0.75rem;
    }
    
    .overlay-text {
      font-size: 0.85rem;
      line-height: 1.5;
    }
  }

  /* Dark theme adjustments */
  @media (prefers-color-scheme: dark) {
    .overlay-content {
      background-color: var(--color-bg-dark);
      color: var(--color-text-light);
    }

    .close-button {
      color: var(--color-text-muted);
    }

    .close-button:hover {
      color: var(--color-text-light);
    }
  }
</style>
