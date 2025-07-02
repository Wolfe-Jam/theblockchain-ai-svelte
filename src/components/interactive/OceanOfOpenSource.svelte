<!-- OceanOfOpenSource.svelte - Hero scene visualization -->
<script>
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import ScrollObserver from './ScrollObserver.svelte';
  
  export let isActive = false;
  
  // Boat states with their positions and messages
  const boats = [
    { id: 'lost', x: 15, y: 35, message: 'Lost in the sea of code', delay: 0 },
    { id: 'drifting', x: 70, y: 25, message: 'Drifting without direction', delay: 200 },
    { id: 'trust', x: 45, y: 60, message: 'Trust is the anchor', delay: 400 },
    { id: 'tokenize', x: 25, y: 80, message: 'Tokenize your journey', delay: 600 },
    { id: 'navigate', x: 80, y: 70, message: 'Navigate with purpose', delay: 800 }
  ];
  
  // Wave animation stores
  const wavePhase = spring(0, { stiffness: 0.03, damping: 0.9 });
  let animationFrame;
  let hoveredBoat = null;
  
  // Animate waves
  function animateWaves() {
    wavePhase.update(p => p + 0.02);
    animationFrame = requestAnimationFrame(animateWaves);
  }
  
  onMount(() => {
    // Start animation immediately
    animateWaves();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });
</script>

<ScrollObserver 
  threshold={0.3} 
  on:enter={() => isActive = true}
  on:leave={() => isActive = false}
>
  <div class="ocean-container">
    <svg 
      viewBox="0 0 100 100" 
      class="ocean-svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <!-- Gradient definitions -->
      <defs>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#001a3d;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#003366;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#004d99;stop-opacity:1" />
        </linearGradient>
        
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--brand-cyan);stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:var(--brand-blue);stop-opacity:0.2" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Ocean background -->
      <rect width="100" height="100" fill="url(#oceanGradient)" />
      
      <!-- Stars/particles in the background -->
      {#each Array(20) as _, i}
        <circle
          cx={Math.random() * 100}
          cy={Math.random() * 50}
          r="0.3"
          fill="white"
          opacity={0.3 + Math.random() * 0.4}
          style="animation: twinkle {2 + Math.random() * 3}s ease-in-out infinite"
        />
      {/each}
      
      <!-- Animated waves -->
      {#each [0, 1, 2] as waveIndex}
        <path
          d="M 0,{60 + waveIndex * 8} 
             Q {25 + Math.sin($wavePhase + waveIndex) * 5},{60 + waveIndex * 8 + Math.sin($wavePhase + waveIndex) * 3} 
               50,{60 + waveIndex * 8}
             T 100,{60 + waveIndex * 8}"
          fill="url(#waveGradient)"
          opacity={0.6 - waveIndex * 0.15}
          class="wave"
        />
      {/each}
      
      <!-- Boats -->
      {#each boats as boat, index}
        <g 
          class="boat-group"
          transform="translate({boat.x}, {boat.y + Math.sin($wavePhase + index) * 2})"
          style="animation-delay: {boat.delay}ms"
          on:mouseenter={() => hoveredBoat = boat.id}
          on:mouseleave={() => hoveredBoat = null}
          role="button"
          tabindex="0"
        >
          <!-- Boat hull -->
          <path 
            d="M -4,0 L -3,3 L 3,3 L 4,0 Z"
            fill={hoveredBoat === boat.id ? 'var(--brand-orange)' : 'var(--brand-cyan)'}
            stroke="white"
            stroke-width="0.3"
            filter="url(#glow)"
          />
          
          <!-- Sail -->
          <path 
            d="M 0,0 L 0,-5 L 3,-2.5 Z"
            fill="white"
            opacity="0.95"
          />
          
          <!-- Tooltip -->
          {#if hoveredBoat === boat.id}
            <foreignObject x="5" y="-5" width="20" height="10">
              <div class="boat-tooltip">
                {boat.message}
              </div>
            </foreignObject>
          {/if}
        </g>
      {/each}
      
      <!-- Title overlay -->
      <text x="50" y="20" text-anchor="middle" class="ocean-title">
        Ocean of Open-Source
      </text>
      <text x="50" y="25" text-anchor="middle" class="ocean-subtitle">
        Navigate with blockchain trust
      </text>
    </svg>
  </div>
</ScrollObserver>

<style>
  .ocean-container {
    position: relative;
    width: 1200px; /* Fixed width for stable review */
    max-width: 100%; /* Prevent overflow on smaller screens */
    height: 600px;   /* Fixed height for stable review */
    margin: 2rem auto 0; /* Center the container */
    /* overflow: hidden; */
    background: linear-gradient(to bottom, transparent, #001a3d 20%, #000d1a);
    border: 1px solid rgba(12, 192, 223, 0.3); /* Add border to show container bounds */
    border-radius: 8px;
  }
  
  .ocean-svg {
    width: 100%;
    height: 100%;
  }
  
  .boat-group {
    cursor: pointer;
    animation: fadeInFloat 2s ease-out forwards;
  }
  
  @keyframes fadeInFloat {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .boat-group:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease;
  }
  
  .boat-tooltip {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
    border: 1px solid var(--brand-cyan);
  }
  
  .ocean-title {
    fill: white;
    font-size: 2.5rem;
    font-weight: 800;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
    opacity: 0.9;
  }
  
  .ocean-subtitle {
    fill: var(--brand-cyan);
    font-size: 1rem;
    font-weight: 500;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .ocean-container {
      height: 400px;
    }
    
    .ocean-title {
      font-size: 2rem;
    }
    
    .ocean-subtitle {
      font-size: 1rem;
    }
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
</style>
