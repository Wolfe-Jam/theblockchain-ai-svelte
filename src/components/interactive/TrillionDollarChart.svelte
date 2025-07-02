<!-- TrillionDollarChart.svelte - Animated market size visualization -->
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import ScrollObserver from './ScrollObserver.svelte';
  
  export let showCallouts = false;
  
  // Market data from the document
  const marketsData = [
    {
      name: 'Artificial Intelligence',
      shortName: 'AI',
      value2025: 757.58,
      value2034: 3680.47,
      cagr: 19.20,
      color: 'var(--brand-orange)',
      icon: '🧠'
    },
    {
      name: 'Software Development',
      shortName: 'Software',
      value2025: 570.00,
      value2034: 1040.00,
      cagr: 12.90,
      color: 'var(--brand-cyan)',
      icon: '💻'
    },
    {
      name: 'Blockchain Technology',
      shortName: 'Blockchain',
      value2025: 31.18,
      value2034: 393.42,
      cagr: 43.60,
      color: 'var(--brand-blue)',
      icon: '🔗'
    }
  ];
  
  // Create separate stores for animation values
  const barHeight1 = tweened(0, { duration: 1000, easing: cubicOut });
  const barHeight2 = tweened(0, { duration: 1000, easing: cubicOut });
  const barHeight3 = tweened(0, { duration: 1000, easing: cubicOut });
  
  const value1 = tweened(0, { duration: 1500, easing: cubicOut });
  const value2 = tweened(0, { duration: 1500, easing: cubicOut });
  const value3 = tweened(0, { duration: 1500, easing: cubicOut });
  
  const barHeights = [barHeight1, barHeight2, barHeight3];
  const values = [value1, value2, value3];
  
  let activeYear = '2025';
  let hasAnimated = false;
  
  function animateChart() {
    if (!hasAnimated) {
      hasAnimated = true;
      marketsData.forEach((market, index) => {
        const value = activeYear === '2025' ? market.value2025 : market.value2034;
        const maxValue = activeYear === '2025' ? 800 : 4000;
        const heightPercent = (value / maxValue) * 100;
        
        setTimeout(() => {
          barHeights[index].set(heightPercent);
          values[index].set(value);
        }, index * 200);
      });
    }
  }
  
  function switchYear(year) {
    activeYear = year;
    marketsData.forEach((market, index) => {
      const value = year === '2025' ? market.value2025 : market.value2034;
      const maxValue = year === '2025' ? 800 : 4000;
      const heightPercent = (value / maxValue) * 100;
      
      barHeights[index].set(heightPercent);
      values[index].set(value);
    });
  }
</script>

<ScrollObserver threshold={0.5} on:enter={animateChart}>
  <div class="chart-container">
    <div class="chart-header">
      <h3 class="chart-title">Market Size Projections</h3>
      <div class="year-selector">
        <button 
          class="year-button" 
          class:active={activeYear === '2025'}
          on:click={() => switchYear('2025')}
        >
          2025
        </button>
        <button 
          class="year-button" 
          class:active={activeYear === '2034'}
          on:click={() => switchYear('2034')}
        >
          2034
        </button>
      </div>
    </div>
    
    <div class="chart-wrapper">
      <div class="chart-bars">
        {#each marketsData as market, index}
          <div class="bar-group">
            <div class="bar-container">
              <div 
                class="bar"
                style="
                  height: {index === 0 ? $barHeight1 : index === 1 ? $barHeight2 : $barHeight3}%;
                  background: {market.color};
                "
              >
                <span class="bar-icon">{market.icon}</span>
              </div>
              <div class="bar-value">
                ${(index === 0 ? $value1 : index === 1 ? $value2 : $value3).toFixed(2)}B
              </div>
            </div>
            <div class="bar-label">
              <div class="market-name">{market.shortName}</div>
              <div class="market-cagr">CAGR: {market.cagr}%</div>
            </div>
          </div>
        {/each}
      </div>
      
      {#if showCallouts}
        <div class="callout-cards">
          {#each marketsData as market, index}
            <div 
              class="callout-card"
              style="
                border-color: {market.color};
                animation-delay: {index * 200}ms;
              "
            >
              <h4 style="color: {market.color}">{market.name}</h4>
              <p class="callout-text">
                Growing from ${market.value2025}B to ${market.value2034}B
              </p>
              <p class="callout-highlight">
                {market.cagr}% CAGR
              </p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</ScrollObserver>

<style>
  .chart-container {
    background: rgba(30, 41, 59, 0.5);
    border-radius: 1rem;
    padding: 2rem;
    margin: 2rem 0;
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .chart-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-light);
  }
  
  .year-selector {
    display: flex;
    gap: 0.5rem;
  }
  
  .year-button {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid var(--brand-cyan);
    color: var(--brand-cyan-text);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  
  .year-button:hover {
    background: rgba(12, 192, 223, 0.1);
  }
  
  .year-button.active {
    background: var(--brand-cyan);
    color: white;
  }
  
  .chart-wrapper {
    position: relative;
  }
  
  .chart-bars {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 400px;
    gap: 2rem;
  }
  
  .bar-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .bar-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }
  
  .bar {
    width: 80%;
    max-width: 120px;
    border-radius: 0.5rem 0.5rem 0 0;
    transition: height 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 1rem;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .bar-icon {
    font-size: 2rem;
    filter: brightness(2);
  }
  
  .bar-value {
    position: absolute;
    bottom: -2rem;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--color-text-light);
  }
  
  .bar-label {
    margin-top: 3rem;
    text-align: center;
  }
  
  .market-name {
    font-weight: 600;
    font-size: 1rem;
    color: var(--color-text-light);
    margin-bottom: 0.25rem;
  }
  
  .market-cagr {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  
  .callout-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 3rem;
  }
  
  .callout-card {
    background: rgba(30, 41, 59, 0.8);
    border: 2px solid;
    border-radius: 0.5rem;
    padding: 1.5rem;
    animation: slideUp 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .callout-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 700;
  }
  
  .callout-text {
    margin: 0 0 0.5rem 0;
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
  
  .callout-highlight {
    margin: 0;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--color-text-light);
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
    from {
      opacity: 0;
      transform: translateY(20px);
    }
  }
  
  @media (max-width: 768px) {
    .chart-bars {
      height: 300px;
      gap: 1rem;
    }
    
    .callout-cards {
      grid-template-columns: 1fr;
    }
    
    .bar-icon {
      font-size: 1.5rem;
    }
  }
</style>
