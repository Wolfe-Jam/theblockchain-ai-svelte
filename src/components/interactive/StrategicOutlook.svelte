<!-- StrategicOutlook.svelte - Animated hooks, lines, and nets visualization -->
<script>
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import ScrollObserver from './ScrollObserver.svelte';
  
  export let isActive = false;
  
  const strategies = [
    {
      id: 'hooks',
      title: 'Horizontal Platforms',
      subtitle: 'The "Picks and Shovels"',
      icon: '🪝',
      color: 'var(--brand-orange)',
      items: [
        'Tokenization-as-a-Service',
        'White-Label Marketplaces',
        'Smart Contract Auditing'
      ]
    },
    {
      id: 'lines',
      title: 'Vertical Marketplaces',
      subtitle: 'Specialized Trading Venues',
      icon: '🎣',
      color: 'var(--brand-cyan)',
      items: [
        'AI Model Exchanges',
        'Software IP Markets',
        'Compute Marketplaces'
      ]
    },
    {
      id: 'nets',
      title: 'Ecosystem Plays',
      subtitle: 'Network Effects at Scale',
      icon: '🕸️',
      color: 'var(--brand-blue)',
      items: [
        'DAO Governance Platforms',
        'Decentralized Development',
        'Community-Owned Projects'
      ]
    }
  ];
  
  let selectedStrategy = null;
  let hasAnimated = false;
  
  // Declare individual springs for each strategy
  const cardScale1 = spring(0, { stiffness: 0.1, damping: 0.8 });
  const cardScale2 = spring(0, { stiffness: 0.1, damping: 0.8 });
  const cardScale3 = spring(0, { stiffness: 0.1, damping: 0.8 });
  
  const iconRotation1 = spring(0, { stiffness: 0.2, damping: 0.9 });
  const iconRotation2 = spring(0, { stiffness: 0.2, damping: 0.9 });
  const iconRotation3 = spring(0, { stiffness: 0.2, damping: 0.9 });
  
  const cardScales = [cardScale1, cardScale2, cardScale3];
  const iconRotations = [iconRotation1, iconRotation2, iconRotation3];
  
  function animateIn() {
    if (!hasAnimated && isActive) {
      hasAnimated = true;
      strategies.forEach((_, index) => {
        setTimeout(() => {
          cardScales[index].set(1);
          // Animate icon rotation
          iconRotations[index].set(360);
        }, index * 300);
      });
    }
  }
  
  function selectStrategy(id) {
    selectedStrategy = selectedStrategy === id ? null : id;
  }
</script>

<ScrollObserver 
  threshold={0.3} 
  on:enter={() => { isActive = true; animateIn(); }}
  on:leave={() => isActive = false}
>
  <div class="strategic-container">
    <div class="strategies-grid">
      {#each strategies as strategy, index}
        <button
          class="strategy-card"
          class:selected={selectedStrategy === strategy.id}
          style="
            transform: scale({index === 0 ? $cardScale1 : index === 1 ? $cardScale2 : $cardScale3});
            border-color: {strategy.color};
          "
          on:click={() => selectStrategy(strategy.id)}
        >
          <div 
            class="strategy-icon"
            style="
              transform: rotate({index === 0 ? $iconRotation1 : index === 1 ? $iconRotation2 : $iconRotation3}deg);
              color: {strategy.color};
            "
          >
            {strategy.icon}
          </div>
          <h3 class="strategy-title" style="color: {strategy.color}">
            {strategy.title}
          </h3>
          <p class="strategy-subtitle">{strategy.subtitle}</p>
          
          {#if selectedStrategy === strategy.id}
            <ul class="strategy-items">
              {#each strategy.items as item}
                <li>{item}</li>
              {/each}
            </ul>
          {/if}
        </button>
      {/each}
    </div>
    
    {#if selectedStrategy}
      {@const selected = strategies.find(s => s.id === selectedStrategy)}
      <div class="strategy-detail" style="border-color: {selected.color}">
        <h4>Investment Opportunity: {selected.title}</h4>
        <p>
          {#if selectedStrategy === 'hooks'}
            The infrastructure layer captures value from every transaction in the convergent 
            economy. These horizontal platforms provide essential services that all participants 
            need, creating defensible moats through network effects and switching costs.
          {:else if selectedStrategy === 'lines'}
            Specialized marketplaces create liquidity for previously illiquid digital assets. 
            By focusing on specific verticals, these platforms can build deep expertise and 
            trusted communities, commanding premium fees for high-value transactions.
          {:else}
            The ultimate play is building entire ecosystems where community ownership aligns 
            incentives. These platforms don't just facilitate transactions—they create new 
            economic models where every participant benefits from collective success.
          {/if}
        </p>
      </div>
    {/if}
  </div>
</ScrollObserver>

<style>
  .strategic-container {
    background: rgba(30, 41, 59, 0.3);
    border-radius: 1rem;
    padding: 3rem;
    margin: 2rem 0;
  }
  
  .strategies-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .strategy-card {
    background: rgba(30, 41, 59, 0.8);
    border: 2px solid;
    border-radius: 1rem;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .strategy-card:hover {
    background: rgba(30, 41, 59, 1);
    transform: scale(1.05) !important;
  }
  
  .strategy-card.selected {
    background: rgba(30, 41, 59, 1);
    border-width: 3px;
  }
  
  .strategy-icon {
    font-size: 4rem;
    transition: transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .strategy-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
  }
  
  .strategy-subtitle {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
  
  .strategy-items {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0 0;
    text-align: left;
  }
  
  .strategy-items li {
    padding: 0.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.875rem;
    color: var(--color-text-light);
  }
  
  .strategy-detail {
    background: rgba(30, 41, 59, 0.8);
    border: 2px solid;
    border-radius: 0.5rem;
    padding: 2rem;
    animation: fadeIn 0.3s ease-out;
  }
  
  .strategy-detail h4 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-light);
  }
  
  .strategy-detail p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.7;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .strategies-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .strategy-icon {
      font-size: 3rem;
    }
    
    .strategic-container {
      padding: 1.5rem;
    }
  }
</style>
