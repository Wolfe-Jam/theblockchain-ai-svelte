<!-- AIBlockchainFlywheel.svelte - Animated synergy diagram -->
<script>
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import ScrollObserver from './ScrollObserver.svelte';
  
  export let isActive = false;
  
  const rotation = spring(0, { stiffness: 0.05, damping: 0.9 });
  const pulseScale = spring(1, { stiffness: 0.3, damping: 0.8 });
  
  let animationFrame;
  let hoveredSide = null;
  
  const synergies = {
    ai: [
      { text: 'Intelligent Oracles', icon: '🧠' },
      { text: 'Security Enhancement', icon: '🛡️' },
      { text: 'Network Optimization', icon: '⚙️' }
    ],
    blockchain: [
      { text: 'Data Provenance', icon: '🔎' },
      { text: 'Immutable Audit Trails', icon: '🔒' },
      { text: 'Democratized Access', icon: '🌐' }
    ]
  };
  
  function animateFlywheel() {
    if (isActive) {
      rotation.update(r => r + 0.5);
    }
    animationFrame = requestAnimationFrame(animateFlywheel);
  }
  
  onMount(() => {
    animateFlywheel();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });
  
  function handleHover(side) {
    hoveredSide = side;
    pulseScale.set(1.05);
  }
  
  function handleLeave() {
    hoveredSide = null;
    pulseScale.set(1);
  }
</script>

<ScrollObserver 
  threshold={0.5} 
  on:enter={() => isActive = true}
  on:leave={() => isActive = false}
>
  <div class="flywheel-container">
    <div class="flywheel-wrapper">
      <svg viewBox="0 0 400 400" class="flywheel-svg">
        <defs>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:var(--brand-orange);stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFB366;stop-opacity:1" />
          </linearGradient>
          
          <linearGradient id="blockchainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:var(--brand-blue);stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2668C7;stop-opacity:1" />
          </linearGradient>
          
          <filter id="flywheelGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Center circle -->
        <g transform="translate(200, 200)">
          <!-- Rotating arrows -->
          <g transform="rotate({$rotation})" style="transform-origin: center;">
            <path
              d="M 0,-80 A 80,80 0 0,1 80,0 L 75,5 L 80,0 L 75,-5"
              fill="none"
              stroke="var(--brand-cyan)"
              stroke-width="3"
              opacity="0.6"
            />
            <path
              d="M 80,0 A 80,80 0 0,1 0,80 L -5,75 L 0,80 L 5,75"
              fill="none"
              stroke="var(--brand-cyan)"
              stroke-width="3"
              opacity="0.6"
            />
            <path
              d="M 0,80 A 80,80 0 0,1 -80,0 L -75,-5 L -80,0 L -75,5"
              fill="none"
              stroke="var(--brand-cyan)"
              stroke-width="3"
              opacity="0.6"
            />
            <path
              d="M -80,0 A 80,80 0 0,1 0,-80 L 5,-75 L 0,-80 L -5,-75"
              fill="none"
              stroke="var(--brand-cyan)"
              stroke-width="3"
              opacity="0.6"
            />
          </g>
          
          <!-- AI Side -->
          <g 
            transform="translate(-120, 0) scale({hoveredSide === 'ai' ? $pulseScale : 1})"
            on:mouseenter={() => handleHover('ai')}
            on:mouseleave={handleLeave}
            role="button"
            tabindex="0"
          >
            <circle r="60" fill="url(#aiGradient)" filter="url(#flywheelGlow)" />
            <text text-anchor="middle" y="5" class="side-label">AI</text>
          </g>
          
          <!-- Blockchain Side -->
          <g 
            transform="translate(120, 0) scale({hoveredSide === 'blockchain' ? $pulseScale : 1})"
            on:mouseenter={() => handleHover('blockchain')}
            on:mouseleave={handleLeave}
            role="button"
            tabindex="0"
          >
            <circle r="60" fill="url(#blockchainGradient)" filter="url(#flywheelGlow)" />
            <text text-anchor="middle" y="5" class="side-label">Blockchain</text>
          </g>
          
          <!-- Center synergy symbol -->
          <g transform="scale({$pulseScale})">
            <circle r="30" fill="var(--brand-cyan)" opacity="0.2" />
            <text text-anchor="middle" y="5" class="synergy-symbol">∞</text>
          </g>
        </g>
      </svg>
      
      <!-- Synergy details -->
      <div class="synergy-details">
        {#if hoveredSide === 'ai'}
          <div class="synergy-list">
            <h4 class="synergy-title">AI Enhances Blockchain</h4>
            {#each synergies.ai as item}
              <div class="synergy-item">
                <span class="synergy-icon">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            {/each}
          </div>
        {:else if hoveredSide === 'blockchain'}
          <div class="synergy-list">
            <h4 class="synergy-title">Blockchain Enhances AI</h4>
            {#each synergies.blockchain as item}
              <div class="synergy-item">
                <span class="synergy-icon">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            {/each}
          </div>
        {:else}
          <div class="synergy-prompt">
            Hover over AI or Blockchain to explore synergies
          </div>
        {/if}
      </div>
    </div>
  </div>
</ScrollObserver>

<style>
  .flywheel-container {
    background: rgba(30, 41, 59, 0.3);
    border-radius: 1rem;
    padding: 3rem;
    margin: 2rem 0;
  }
  
  .flywheel-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .flywheel-svg {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
  
  .side-label {
    fill: white;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
  }
  
  .synergy-symbol {
    fill: white;
    font-size: 2rem;
    font-weight: 700;
  }
  
  .synergy-details {
    width: 100%;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .synergy-list {
    background: rgba(30, 41, 59, 0.8);
    border-radius: 0.5rem;
    padding: 1.5rem;
    animation: fadeIn 0.3s ease-out;
  }
  
  .synergy-title {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--brand-cyan);
  }
  
  .synergy-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    color: var(--color-text-light);
  }
  
  .synergy-icon {
    font-size: 1.5rem;
  }
  
  .synergy-prompt {
    color: var(--color-text-muted);
    font-style: italic;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .flywheel-container {
      padding: 1.5rem;
    }
  }
</style>
