<!-- ERC1155Visualization.svelte - Multi-token standard animation -->
<script>
  import { onMount } from 'svelte';
  import { spring, tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import ScrollObserver from './ScrollObserver.svelte';
  
  export let isActive = false;
  
  const tokenTypes = [
    { 
      type: 'fungible', 
      label: 'Utility Tokens',
      example: 'API Credits',
      color: 'var(--brand-cyan)',
      count: 100,
      icon: '🪙'
    },
    { 
      type: 'nft', 
      label: 'NFT Ownership',
      example: 'IP Rights',
      color: 'var(--brand-orange)',
      count: 1,
      icon: '🎨'
    },
    { 
      type: 'semi', 
      label: 'Governance',
      example: 'Voting Power',
      color: 'var(--brand-blue)',
      count: 50,
      icon: '🗳️'
    }
  ];
  
  let selectedType = null;
  let hasAnimated = false;
  
  // Animation stores - declare individually
  const contractScale = spring(0, { stiffness: 0.1, damping: 0.8 });
  const tokenScale1 = spring(0, { stiffness: 0.2, damping: 0.7 });
  const tokenScale2 = spring(0, { stiffness: 0.2, damping: 0.7 });
  const tokenScale3 = spring(0, { stiffness: 0.2, damping: 0.7 });
  const connectionOpacity = tweened(0, { duration: 800, easing: cubicOut });
  
  const tokenScales = [tokenScale1, tokenScale2, tokenScale3];
  
  function animateIn() {
    if (!hasAnimated && isActive) {
      hasAnimated = true;
      contractScale.set(1);
      
      setTimeout(() => {
        connectionOpacity.set(1);
      }, 500);
      
      tokenTypes.forEach((_, index) => {
        setTimeout(() => {
          tokenScales[index].set(1);
        }, 800 + index * 200);
      });
    }
  }
  
  function selectType(type) {
    selectedType = selectedType === type ? null : type;
  }
</script>

<ScrollObserver 
  threshold={0.5} 
  on:enter={() => { isActive = true; animateIn(); }}
  on:leave={() => isActive = false}
>
  <div class="erc1155-container">
    <div class="visualization-wrapper">
      <svg viewBox="0 0 600 400" class="erc1155-svg">
        <defs>
          <linearGradient id="contractGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0f0f23;stop-opacity:1" />
          </linearGradient>
          
          <filter id="contractGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Central contract -->
        <g transform="translate(300, 200)">
          <rect
            x="-80"
            y="-40"
            width="160"
            height="80"
            rx="8"
            fill="url(#contractGradient)"
            stroke="var(--brand-cyan)"
            stroke-width="2"
            filter="url(#contractGlow)"
            transform="scale({$contractScale})"
          />
          <text
            text-anchor="middle"
            y="5"
            class="contract-label"
            transform="scale({$contractScale})"
          >
            ERC-1155
          </text>
        </g>
        
        <!-- Token types -->
        {#each tokenTypes as token, index}
          {@const angle = (index * 120 - 90) * Math.PI / 180}
          {@const x = 300 + Math.cos(angle) * 150}
          {@const y = 200 + Math.sin(angle) * 150}
          
          <!-- Connection line -->
          <line
            x1="300"
            y1="200"
            x2={x}
            y2={y}
            stroke="var(--brand-cyan)"
            stroke-width="2"
            stroke-dasharray="5,5"
            opacity={$connectionOpacity * 0.3}
          />
          
          <!-- Token circle -->
          <g 
            transform="translate({x}, {y}) scale({index === 0 ? $tokenScale1 : index === 1 ? $tokenScale2 : $tokenScale3})"
            on:click={() => selectType(token.type)}
            on:keypress={(e) => e.key === 'Enter' && selectType(token.type)}
            role="button"
            tabindex="0"
            class="token-group"
          >
            <circle
              r="50"
              fill={token.color}
              opacity="0.2"
              stroke={token.color}
              stroke-width="2"
              class:selected={selectedType === token.type}
            />
            <text text-anchor="middle" y="-10" class="token-icon">
              {token.icon}
            </text>
            <text text-anchor="middle" y="15" class="token-label">
              {token.label}
            </text>
            <text text-anchor="middle" y="30" class="token-count">
              ×{token.count}
            </text>
          </g>
        {/each}
      </svg>
      
      <!-- Token details -->
      <div class="token-details">
        {#if selectedType}
          {@const selected = tokenTypes.find(t => t.type === selectedType)}
          <div class="detail-card" style="border-color: {selected.color}">
            <h4>{selected.label}</h4>
            <p class="detail-example">Example: {selected.example}</p>
            <p class="detail-description">
              {#if selectedType === 'fungible'}
                Interchangeable tokens that can be divided and combined. Perfect for 
                usage credits, royalty shares, and payment tokens.
              {:else if selectedType === 'nft'}
                Unique, indivisible tokens representing ownership of specific assets 
                like IP rights, access keys, or digital certificates.
              {:else}
                Tokens that start fungible but can become unique. Ideal for governance 
                tokens that gain special properties or time-locked rewards.
              {/if}
            </p>
          </div>
        {:else}
          <div class="detail-prompt">
            Click on any token type to learn more
          </div>
        {/if}
      </div>
    </div>
  </div>
</ScrollObserver>

<style>
  .erc1155-container {
    background: rgba(30, 41, 59, 0.3);
    border-radius: 1rem;
    padding: 3rem;
    margin: 2rem 0;
  }
  
  .visualization-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .erc1155-svg {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
  
  .contract-label {
    fill: white;
    font-size: 1.25rem;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
  }
  
  .token-group {
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .token-group:hover {
    transform: scale(1.1);
  }
  
  .token-group circle.selected {
    opacity: 0.4;
    stroke-width: 3;
  }
  
  .token-icon {
    font-size: 2rem;
    fill: white;
  }
  
  .token-label {
    fill: white;
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  .token-count {
    fill: rgba(255, 255, 255, 0.7);
    font-size: 0.75rem;
    font-family: 'Roboto Mono', monospace;
  }
  
  .token-details {
    width: 100%;
    max-width: 500px;
    min-height: 150px;
  }
  
  .detail-card {
    background: rgba(30, 41, 59, 0.8);
    border: 2px solid;
    border-radius: 0.5rem;
    padding: 1.5rem;
    animation: slideIn 0.3s ease-out;
  }
  
  .detail-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-light);
  }
  
  .detail-example {
    margin: 0 0 1rem 0;
    color: var(--brand-cyan);
    font-weight: 600;
  }
  
  .detail-description {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
  
  .detail-prompt {
    text-align: center;
    color: var(--color-text-muted);
    font-style: italic;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @media (max-width: 768px) {
    .erc1155-container {
      padding: 1.5rem;
    }
    
    .token-icon {
      font-size: 1.5rem;
    }
  }
</style>
