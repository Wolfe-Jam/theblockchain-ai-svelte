<!-- Interactive Market Analysis Dashboard -->
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  // Chart display states
  let showMarketChart = false;
  let showCAGRChart = false;
  let showTimelineChart = false;
  
  // Svelte tweened animations for charts
  const aiMarketHeight = tweened(0, { duration: 1000, easing: cubicOut });
  const blockchainMarketHeight = tweened(0, { duration: 1200, easing: cubicOut });
  const softwareMarketHeight = tweened(0, { duration: 800, easing: cubicOut });
  
  // Enhanced market data with convergence multipliers
  const marketSizeData = [
    { label: 'AI by 2034', value: 3.68, convergenceValue: 4.2, color: 'var(--brand-cyan)' },
    { label: 'Blockchain by 2030', value: 1.43, convergenceValue: 4.8, color: 'var(--brand-orange)' },
    { label: 'Software by 2030', value: 1.04, convergenceValue: 2.43, color: 'var(--brand-blue)' }
  ];
  
  onMount(() => {
    // Trigger chart animations on load
    setTimeout(() => {
      aiMarketHeight.set(100);
      blockchainMarketHeight.set(39);
      softwareMarketHeight.set(28);
    }, 500);
  });
  
  function toggleMarketChart() {
    showMarketChart = !showMarketChart;
    showCAGRChart = false;
    showTimelineChart = false;
  }
  
  function toggleCAGRChart() {
    showCAGRChart = !showCAGRChart;
    showMarketChart = false;
    showTimelineChart = false;
  }
  
  function toggleTimelineChart() {
    showTimelineChart = !showTimelineChart;
    showMarketChart = false;
    showCAGRChart = false;
  }
</script>

<svelte:head>
  <title>Interactive Market Analysis | theBlockchain.ai</title>
  <meta name="description" content="Interactive dashboard analyzing the $11+ trillion convergence of AI, Blockchain, and Software markets." />
</svelte:head>

<!-- Interactive Dashboard -->
<div class="dashboard-hero">
  <div class="container">
    <header class="dashboard-header">
      <h1 class="dashboard-title">Interactive Market Analysis</h1>
      <p class="dashboard-subtitle">
        Deep dive into the $11+ trillion convergence opportunity with interactive data visualization
      </p>
    </header>
    
    <!-- Interactive Chart Buttons -->
    <div class="chart-buttons-container">
      <div class="chart-buttons">
        <!-- Market Size Button -->
        <button class="chart-button" on:click={toggleMarketChart} class:active={showMarketChart}>
          <div class="chart-button-icon">📊</div>
          <h3 class="chart-button-title">Market Size Forecasts</h3>
          <p class="chart-button-subtitle">2030-2034 Convergence Projections</p>
          <div class="chart-button-value">$11.43T</div>
          <div class="chart-button-cta">
            {showMarketChart ? 'Hide Analysis' : 'View Breakdown'}
            <i class="fas fa-chevron-{showMarketChart ? 'up' : 'down'}"></i>
          </div>
        </button>
        
        <!-- CAGR Button -->
        <button class="chart-button" on:click={toggleCAGRChart} class:active={showCAGRChart}>
          <div class="chart-button-icon">📈</div>
          <h3 class="chart-button-title">Growth Rate Analysis</h3>
          <p class="chart-button-subtitle">Compound Annual Growth Rates</p>
          <div class="chart-button-value">90%+ CAGR</div>
          <div class="chart-button-cta">
            {showCAGRChart ? 'Hide Analysis' : 'View Comparison'}
            <i class="fas fa-chevron-{showCAGRChart ? 'up' : 'down'}"></i>
          </div>
        </button>
        
        <!-- Timeline Button -->
        <button class="chart-button" on:click={toggleTimelineChart} class:active={showTimelineChart}>
          <div class="chart-button-icon">⏰</div>
          <h3 class="chart-button-title">Convergence Timeline</h3>
          <p class="chart-button-subtitle">Strategic Market Positioning</p>
          <div class="chart-button-value">2024-2030</div>
          <div class="chart-button-cta">
            {showTimelineChart ? 'Hide Timeline' : 'View Opportunity'}
            <i class="fas fa-chevron-{showTimelineChart ? 'up' : 'down'}"></i>
          </div>
        </button>
      </div>
    </div>
    
    <!-- Large Chart Display Area -->
    {#if showMarketChart || showCAGRChart || showTimelineChart}
      <div class="large-chart-container">
        {#if showMarketChart}
          <div class="large-chart">
            <h2 class="large-chart-title">Market Size Forecasts (2030-2034)</h2>
            <p class="large-chart-description">
              Projections show these sectors commanding a multi-trillion dollar combined value within the next decade.
              Convergence effects create additional value beyond individual market sizes.
            </p>
            <div class="professional-chart-placeholder">
              <div class="chart-legend">
                <span class="legend-item">
                  <span class="legend-color" style="background: var(--brand-cyan)"></span>
                  Individual Markets
                </span>
                <span class="legend-item">
                  <span class="legend-color" style="background: var(--brand-orange)"></span>
                  Convergence Premium
                </span>
              </div>
              <div class="coming-soon">
                🚧 Professional Chart Implementation in Progress 🚧<br>
                Next: Build investor-grade visualization matching Image 1 reference
              </div>
            </div>
          </div>
        {/if}
        
        {#if showCAGRChart}
          <div class="large-chart">
            <h2 class="large-chart-title">Compound Annual Growth Rate Analysis</h2>
            <p class="large-chart-description">
              Blockchain's exponential growth rate signals its early-stage, high-potential status compared to mature AI and Software markets.
            </p>
            <div class="professional-chart-placeholder">
              <div class="coming-soon">
                🚧 CAGR Comparison Chart Coming Soon 🚧<br>
                Vertical bars with professional styling and full data breakdown
              </div>
            </div>
          </div>
        {/if}
        
        {#if showTimelineChart}
          <div class="large-chart">
            <h2 class="large-chart-title">Convergence Timeline & Strategic Positioning</h2>
            <p class="large-chart-description">
              Critical 2024-2030 window for early-stage positioning in the convergent economy.
            </p>
            <div class="professional-chart-placeholder">
              <div class="coming-soon">
                🚧 Timeline Visualization Coming Soon 🚧<br>
                Interactive timeline with key milestones and opportunity windows
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  /* Dashboard Styles */
  .dashboard-hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
    padding: 4rem 0;
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .dashboard-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .dashboard-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    background: linear-gradient(135deg, var(--brand-cyan), var(--brand-orange));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
  }
  
  .dashboard-subtitle {
    font-size: 1.25rem;
    color: #cbd5e1;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* Chart Buttons */
  .chart-buttons-container {
    margin-bottom: 3rem;
  }
  
  .chart-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .chart-button {
    background: rgba(15, 23, 42, 0.9);
    border: 2px solid rgba(51, 65, 85, 0.5);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    backdrop-filter: blur(10px);
  }
  
  .chart-button:hover {
    border-color: var(--brand-cyan);
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(12, 192, 223, 0.2);
  }
  
  .chart-button.active {
    border-color: var(--brand-orange);
    background: rgba(255, 145, 77, 0.1);
  }
  
  .chart-button-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .chart-button-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--brand-cyan);
    margin-bottom: 0.5rem;
  }
  
  .chart-button-subtitle {
    font-size: 0.9rem;
    color: #94a3b8;
    margin-bottom: 1rem;
  }
  
  .chart-button-value {
    font-size: 2rem;
    font-weight: 900;
    color: var(--brand-orange);
    margin-bottom: 1.5rem;
    font-family: 'Roboto Mono', monospace;
  }
  
  .chart-button-cta {
    font-size: 0.9rem;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  /* Large Chart Container */
  .large-chart-container {
    background: rgba(15, 23, 42, 0.95);
    border-radius: 1.5rem;
    padding: 3rem;
    margin-top: 3rem;
    border: 1px solid rgba(51, 65, 85, 0.5);
    backdrop-filter: blur(10px);
  }
  
  .large-chart-title {
    font-size: 2rem;
    font-weight: 800;
    color: var(--brand-cyan);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .large-chart-description {
    font-size: 1.1rem;
    color: #cbd5e1;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
  
  .professional-chart-placeholder {
    min-height: 400px;
    border: 2px dashed rgba(51, 65, 85, 0.5);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .chart-legend {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 1rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #cbd5e1;
  }
  
  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }
  
  .coming-soon {
    text-align: center;
    color: #94a3b8;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .chart-buttons {
      grid-template-columns: 1fr;
    }
    
    .large-chart-container {
      padding: 2rem;
    }
  }
  
  /* CSS Variables for Brand Colors */
  :global(:root) {
    --brand-orange: #FF914D;
    --brand-cyan: #0CC0DF;
    --brand-blue: #004AAE;
    --brand-orange-text: #EA580C;
  }
</style>
