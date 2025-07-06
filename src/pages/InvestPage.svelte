<!-- src/pages/InvestPage.svelte - Svelte-First Implementation -->
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import InvestorModal from '../components/InvestorModal.svelte';
  import ReportDownload from '../components/ReportDownload.svelte';
  import DataBox from '../components/DataBox.svelte';
  import TimelineBox from '../components/TimelineBox.svelte';
  
  let showModal = false;
  let showReportDownload = false;
  
  // Realistic market progression data
  let currentYear = 2025;
  let marketOutlook = 'highly-likely'; // Toggle state
  
  let marketData = {
    2025: { total: 2.52, ai: 1.80, blockchain: 0.12, software: 0.60 },
    2026: { total: 3.25, ai: 2.20, blockchain: 0.30, software: 0.75 },
    2027: { total: 4.12, ai: 2.65, blockchain: 0.52, software: 0.95 },
    2028: { total: 4.85, ai: 2.85, blockchain: 0.75, software: 1.25 },
    2029: { total: 5.68, ai: 3.15, blockchain: 1.08, software: 1.45 },
    2030: { total: 6.15, ai: 3.25, blockchain: 1.43, software: 1.47 },
    2031: { total: 7.23, ai: 3.45, blockchain: 1.98, software: 1.80 },
    2032: { total: 8.41, ai: 3.55, blockchain: 2.86, software: 2.00 },
    2033: { total: 9.87, ai: 3.62, blockchain: 4.15, software: 2.10 },
    2034: { total: 11.43, ai: 3.68, blockchain: 5.85, software: 1.90 }
  };
  
  let currentMarketValue = marketData[currentYear].total;
  let animatedMarketValue = currentMarketValue;
  let spotsLeft = 1337;
  let animationPaused = false;
  
  // Chart display states
  let showMarketChart = false;
  let showCAGRChart = false;
  let showTimelineChart = false;
  
  // Hover states for dynamic width
  let hoveredChart = null; // 'market', 'cagr', 'timeline', or null
  let clickedChart = null; // Which chart is clicked and fully expanded
  
  // Svelte tweened animations for charts
  const aiMarketHeight = tweened(0, { duration: 1000, easing: cubicOut });
  const blockchainMarketHeight = tweened(0, { duration: 1200, easing: cubicOut });
  const softwareMarketHeight = tweened(0, { duration: 800, easing: cubicOut });
  
  const cagrBlockchainHigh = tweened(0, { duration: 1000, easing: cubicOut });
  const cagrBlockchainLow = tweened(0, { duration: 1100, easing: cubicOut });
  const cagrBlockchainAI = tweened(0, { duration: 1200, easing: cubicOut });
  const cagrSoftware = tweened(0, { duration: 900, easing: cubicOut });

  // Toggle function
  function toggleMarketOutlook(outlook, event) {
    event.stopPropagation();
    marketOutlook = outlook;
  }

  // Reactive data for Box 1: Market Size (3 bars)
  $: marketSizeData = marketOutlook === 'conservative' ? [
    { label: 'Blockchain by 2034', value: 3.2, color: 'var(--brand-orange-text)', unit: 'T' },
    { label: 'AI by 2034', value: 2.1, color: 'var(--brand-cyan)', unit: 'T' },
    { label: 'Software by 2034', value: 1.1, color: 'var(--brand-blue)', unit: 'T' }
  ] : [
    { label: 'Blockchain by 2034', value: 5.85, color: 'var(--brand-orange-text)', unit: 'T' },
    { label: 'AI by 2034', value: 3.68, color: 'var(--brand-cyan)', unit: 'T' },
    { label: 'Software by 2034', value: 1.90, color: 'var(--brand-blue)', unit: 'T' }
  ];

  // Reactive data for Box 2: Growth Rate (4 bars)
  $: cagrData = marketOutlook === 'conservative' ? [
    { label: 'Blockchain (High)', value: 45.2, color: 'var(--brand-orange-text)', unit: '%' },
    { label: 'Blockchain (Low)', value: 22.1, color: 'var(--brand-orange)', unit: '%' },
    { label: 'AI', value: 18.5, color: 'var(--brand-cyan)', unit: '%' },
    { label: 'Software', value: 11.4, color: 'var(--brand-blue)', unit: '%' }
  ] : [
    { label: 'Blockchain (High)', value: 90.1, color: 'var(--brand-orange-text)', unit: '%' },
    { label: 'Blockchain (Low)', value: 43.6, color: 'var(--brand-orange)', unit: '%' },
    { label: 'AI', value: 37.18, color: 'var(--brand-cyan)', unit: '%' },
    { label: 'Software', value: 22.71, color: 'var(--brand-blue)', unit: '%' }
  ];
  
  // Computed totals
  $: marketSizeTotal = marketSizeData.reduce((sum, item) => sum + item.value, 0).toFixed(2);
  $: cagrAverage = (cagrData.reduce((sum, item) => sum + item.value, 0) / cagrData.length).toFixed(1);
  
  const cagrAI = tweened(0, { duration: 800, easing: cubicOut });
  
  onMount(() => {
    // Ensure professional focus
    document.title = "Investment Opportunity | theBlockchain.ai";
    
    // Add click outside listener for chart control
    document.addEventListener('click', handleOutsideClick);
    
    // Trigger Svelte chart animations
    setTimeout(() => {
      // Market size chart animations
      aiMarketHeight.set(100); // 3.68T = 100%
      blockchainMarketHeight.set(39); // 1.43T = 39% of AI
      softwareMarketHeight.set(28); // 1.04T = 28% of AI
      
      // CAGR chart animations  
      cagrBlockchainHigh.set(100); // 90.1% = 100%
      cagrBlockchainLow.set(48); // 43.6% = 48% of high
      cagrBlockchainAI.set(41); // 37.18% = 41% of high
      cagrSoftware.set(25); // 22.71% = 25% of high
      cagrAI.set(21); // 19.2% = 21% of high
    }, 500);
    
    // Realistic market progression animation with smooth counter
    animateMarketProgression();
    
    // Spots counter animation
    const spotsInterval = setInterval(() => {
      spotsLeft -= Math.floor(Math.random() * 3) + 1;
      if (spotsLeft < 500) spotsLeft = 1337; // reset
    }, 3000);
    
    return () => {
      clearInterval(spotsInterval);
      document.removeEventListener('click', handleOutsideClick);
    };
  });
  
  function animateMarketProgression() {
    const years = Object.keys(marketData).map(Number);
    let currentIndex = 0;
    let targetValue = marketData[years[currentIndex]].total;
    let smoothCounterInterval;
    let yearProgressionInterval;
    
    function startSmoothCounter() {
      smoothCounterInterval = setInterval(() => {
        if (animationPaused) return;
        
        const difference = targetValue - animatedMarketValue;
        
        if (Math.abs(difference) > 0.01) {
          const increment = difference * 0.02;
          animatedMarketValue += Math.max(increment, 0.001);
        }
      }, 50);
    }
    
    function startYearProgression() {
      yearProgressionInterval = setInterval(() => {
        if (animationPaused) return;
        
        currentIndex = (currentIndex + 1) % years.length;
        
        if (currentIndex === 0) {
          animatedMarketValue = marketData[years[currentIndex]].total;
        }
        
        currentYear = years[currentIndex];
        currentMarketValue = marketData[currentYear].total;
        targetValue = currentMarketValue;
      }, 4000);
    }
    
    startSmoothCounter();
    startYearProgression();
    
    return () => {
      clearInterval(smoothCounterInterval);
      clearInterval(yearProgressionInterval);
    };
  }
  
  function resetAnimation() {
    currentYear = 2025;
    currentMarketValue = marketData[currentYear].total;
    animatedMarketValue = currentMarketValue;
    animationPaused = false;
  }
  
  function manualReset() {
    resetAnimation();
  }
  
  function openInvestorModal() {
    showModal = true;
  }
  
  function openReportDownload() {
    showReportDownload = true;
  }
  
  function navigateToOpportunities() {
    window.location.href = '/invest/opportunities';
  }
  
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
  
  // Hover functions for short preview effects
  let hoverTimeout = null;
  
  function handleChartHover(chartType) {
    clearTimeout(hoverTimeout);
    hoveredChart = chartType;
  }
  
  function handleChartLeave() {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      hoveredChart = null;
    }, 300);
  }
  
  // Click functions for full animations
  function handleChartClick(chartType) {
    clickedChart = clickedChart === chartType ? null : chartType;
  }
  
  function handleOutsideClick(event) {
    // Check if click is outside any chart card
    if (!event.target.closest('.chart-card')) {
      clickedChart = null;
    }
  }
</script>

<svelte:head>
  <title>Investment Opportunity | theBlockchain.ai</title>
  <meta name="description" content="Position yourself in the $6+ trillion convergence of AI, Blockchain, and Software markets. Professional investment opportunities available." />
</svelte:head>

<!-- Market-Shock Hero Section -->
<div class="market-hero">
  <div class="container">
    <!-- BANG! Headline -->
    <div class="hero-content">
      <div class="market-headline">
        <div class="market-progression">
          <div class="market-year">{currentYear}</div>
          <h1 class="market-title">
            <span class="market-value">${animatedMarketValue.toFixed(2)}</span>
            <span class="market-label">TRILLION</span>
          </h1>
          
          <!-- Reset Prompt - Always Visible -->
          <div class="reset-prompt">
            <p class="reset-question">Are you IN yet?</p>
            <button class="reset-btn primary" on:click={resetAnimation}>
              <i class="fas fa-redo"></i>
              Start Over
            </button>
          </div>
          
          <p class="market-subtitle">Market Convergence Is Here</p>
          <div class="market-breakdown">
            <div class="breakdown-item">
              <span class="breakdown-label">AI</span>
              <span class="breakdown-value">${marketData[currentYear].ai.toFixed(2)}T</span>
            </div>
            <div class="breakdown-separator">+</div>
            <div class="breakdown-item">
              <span class="breakdown-label">Blockchain</span>
              <span class="breakdown-value">${marketData[currentYear].blockchain.toFixed(2)}T</span>
            </div>
            <div class="breakdown-separator">+</div>
            <div class="breakdown-item">
              <span class="breakdown-label">Software</span>
              <span class="breakdown-value">${marketData[currentYear].software.toFixed(2)}T</span>
            </div>
          </div>
        </div>
        <p class="market-description">
          AI, Blockchain, and Software markets are converging into the largest economic opportunity of our generation. Position yourself at the intersection.
        </p>
      </div>
      
      <!-- New 2-Box Layout with DataBox Components -->
      <div class="charts-container">
        <!-- Top Row: Box 1 & Box 2 Side by Side -->
        <div class="top-row">
          <!-- Box 1: Market Size (3 bars + 1 spacer = 4 total) -->
          <DataBox 
            title="Market Size by 2034"
            bars={marketSizeData}
            totalLabel="TOTAL"
            totalValue="${marketSizeTotal}T"
            {marketOutlook}
            maxBars={4}
          >
            <div slot="controls" class="toggle-buttons">
              <button 
                class="toggle-btn"
                class:active={marketOutlook === 'conservative'}
                on:click={(e) => toggleMarketOutlook('conservative', e)}
              >
                Conservative
              </button>
              <button 
                class="toggle-btn"
                class:active={marketOutlook === 'highly-likely'}
                on:click={(e) => toggleMarketOutlook('highly-likely', e)}
              >
                Highly Likely
              </button>
            </div>
          </DataBox>
          
          <!-- Box 2: Growth Rate (4 bars + 0 spacers = 4 total) -->
          <DataBox 
            title="Growth Rate Comparison"
            bars={cagrData}
            totalLabel="AVG GROWTH"
            totalValue="{cagrAverage}%"
            {marketOutlook}
            maxBars={4}
          />
        </div>
        
        <!-- Bottom Row: Box 3 Timeline Full Width -->
        <div class="bottom-row">
          <TimelineBox {marketOutlook} />
        </div>
      </div>
      
      <!-- Hero Transition -->
      <div class="hero-transition">
        <div class="convergence-statement">
          <h2 class="transition-title">Your Position in This<br><span class="historic-highlight">Historic Market Shift</span></h2>
          <p class="transition-text">
            <span class="emphasis-text">We're not just watching the convergence—we're building it.</span>
            <br><br>
            While others chase individual markets, we've positioned at the <strong>intersection of all three</strong>. 
            Your early stake in our platform means <span class="value-highlight">simultaneous exposure</span> 
            to the AI revolution, blockchain transformation, and software evolution.
            <br><br>
            <span class="opportunity-text">This is your moment. The infrastructure is ready. The market is moving.</span>
          </p>
        </div>
        
        <div class="urgency-indicators">
          <div class="indicator">
            <div class="indicator-icon animate-pulse">📈</div>
            <span>Market acceleration phase</span>
          </div>
          <div class="indicator">
            <div class="indicator-icon animate-pulse">⏰</div>
            <span>{spotsLeft} investment opportunities remaining</span>
          </div>
          <div class="indicator">
            <div class="indicator-icon animate-pulse">🎯</div>
            <span>Early-stage positioning window</span>
          </div>
          <div class="indicator">
            <button class="timeline-reset-btn" on:click={manualReset} title="Start Over">
              <i class="fas fa-redo"></i>
              <span>Start Over</span>
            </button>
          </div>
        </div>
        
        <div class="hero-cta-group">
          <button class="hero-cta" on:click={navigateToOpportunities}>
            <span>Explore Investment Opportunities</span>
            <i class="fas fa-arrow-right"></i>
          </button>
          
          <a href="/invest/dashboard" class="hero-cta secondary">
            <span>View Live Dashboard</span>
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Investor Modal -->
<InvestorModal bind:isOpen={showModal} />

<!-- Report Download Modal -->
<ReportDownload bind:isOpen={showReportDownload} />

<style lang="postcss">
  :root {
    --brand-sky: #17A2B8;
    --brand-ocean: #007BFF;
    --brand-sun: #FD7E14;
    --brand-trust: #28A745;
    --blockchain-blue: #004AAE;
    --brand-orange: #FF914D;
    --brand-cyan: #0CC0DF;
    --brand-orange-text: #EA580C;
    --brand-blue: #004AAE;
    --brand-blue-text: #2563EB;
    --brand-cyan-text: #06B6D4;
  }
  
  /* Market Hero Section */
  .market-hero {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
    padding: 4rem 0 6rem;
    position: relative;
    overflow: hidden;
  }
  
  .market-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(255, 145, 77, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  
  .hero-content {
    text-align: center;
    position: relative;
    z-index: 2;
  }
  
  .market-headline {
    margin-bottom: 5rem;
    margin-top: 5rem;
  }
  
  .market-progression {
    margin: 3rem 0;
  }
  
  .market-year {
    font-size: 2rem;
    color: var(--brand-orange-text);
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
    margin-bottom: 1rem;
    opacity: 0.9;
  }
  
  .market-title {
    font-size: clamp(3rem, 8vw, 8rem);
    font-weight: 900;
    line-height: 0.9;
    margin-bottom: 2rem;
    font-family: 'Roboto Mono', monospace;
  }
  
  .market-value {
    background: linear-gradient(135deg, var(--brand-orange), var(--brand-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    animation: glow 3s ease-in-out infinite alternate;
  }
  
  .market-label {
    color: #f8fafc;
    font-size: 0.4em;
    font-weight: 700;
    letter-spacing: 0.2em;
    display: block;
    margin-top: 0.5rem;
  }
  
  /* Reset Prompt Styling - Simple & Minimal */
  .reset-prompt {
    margin: 0.5rem 0;
    display: inline-block;
  }
  
  .reset-question {
    color: var(--brand-cyan);
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    text-align: center;
  }
  
  .reset-btn {
    background: linear-gradient(135deg, var(--brand-cyan), var(--brand-orange));
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
  }
  
  .reset-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(12, 192, 223, 0.3);
  }
  
  .market-subtitle {
    font-size: clamp(1.8rem, 5vw, 3rem);
    color: var(--brand-orange);
    font-weight: 700;
    margin: 1.5rem 0 2rem;
    font-family: 'Roboto Mono', monospace;
    letter-spacing: 0.05em;
  }
  
  .market-breakdown {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin: 2rem 0;
    flex-wrap: wrap;
  }
  
  .breakdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .breakdown-label {
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .breakdown-value {
    font-size: 1.8rem;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
    color: var(--brand-cyan);
  }
  
  .breakdown-separator {
    font-size: 2rem;
    color: var(--brand-orange);
    font-weight: 700;
    margin: 0 0.5rem;
  }
  
  .market-description {
    font-size: 1.25rem;
    color: #e2e8f0;
    max-width: 800px;
    margin: 2rem auto 0;
    line-height: 1.6;
  }
  
  /* 2-Box Layout Styles */
  .charts-container {
    width: 100%;
    padding: 0 2rem;
    margin: 4rem 0 6rem;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: flex-start; /* Align tops of boxes */
  }
  
  .bottom-row {
    display: grid;
    grid-template-columns: 1fr;
  }
  
  /* Simple, Minimal Toggle Styles */
  .toggle-buttons {
    display: flex;
    gap: 0.25rem;
    background: rgba(51, 65, 85, 0.2);
    border-radius: 0.5rem;
    padding: 0.125rem;
    border: 1px solid rgba(51, 65, 85, 0.3);
    height: 44px; /* Fixed height for consistent header alignment */
    align-items: center;
  }
  
  .toggle-btn {
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    background: transparent;
    color: #9ca3af;
    min-width: 80px;
    height: 36px; /* Fixed button height */
  }
  
  .toggle-btn.active {
    color: #f3f4f6;
    background: rgba(51, 65, 85, 0.7);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .toggle-btn:hover:not(.active) {
    background: rgba(51, 65, 85, 0.3);
    color: #d1d5db;
  }
  
  
  .chart-title {
    color: var(--brand-cyan);
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  /* Base chart container */
  .svelte-chart-container {
    height: 250px;
    margin-bottom: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 1rem;
  }
  
  /* Expanded chart content adjustments */
  .chart-card.expanded .svelte-chart-container {
    height: auto;
    min-height: 300px;
    padding: 2rem;
  }
  
  .chart-card.expanded:nth-child(2) .svelte-chart-container {
    height: 60vh;
    min-height: 500px;
  }
  
  .chart-card.expanded:nth-child(3) .svelte-chart-container {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .horizontal-chart-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .chart-insight {
    color: var(--brand-orange-text);
    font-weight: 600;
    text-align: center;
    font-size: 0.9rem;
  }
  
  /* Horizontal Bar Chart */
  .chart-bar-horizontal {
    display: grid;
    grid-template-columns: 1fr 2fr auto;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
  
  .bar-label {
    font-size: 0.85rem;
    color: #cbd5e1;
    text-align: right;
    padding-right: 0.5rem;
  }
  
  .bar-track {
    height: 32px;
    background: rgba(51, 65, 85, 0.3);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  
  .bar-fill {
    height: 100%;
    border-radius: 16px;
    transition: width 1s ease;
    position: relative;
    min-width: 8px;
  }
  
  .bar-value {
    font-size: 1rem;
    color: #f8fafc;
    font-weight: 700;
    text-align: left;
    padding-left: 0.5rem;
  }
  
  /* Vertical Bar Chart */
  .chart-bar-vertical {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin: 0 0.5rem;
  }
  
  .bar-track-vertical {
    width: 32px;
    height: 150px;
    background: rgba(51, 65, 85, 0.3);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: flex-end;
  }
  
  .bar-fill-vertical {
    width: 100%;
    border-radius: 16px;
    transition: height 1s ease;
    position: relative;
  }
  
  .bar-label-vertical {
    font-size: 0.75rem;
    color: #cbd5e1;
    text-align: center;
    margin-top: 0.5rem;
    line-height: 1.2;
  }
  
  .bar-value-vertical {
    font-size: 0.8rem;
    color: #f8fafc;
    font-weight: 700;
    margin-top: 0.25rem;
  }
  
  /* Timeline Chart - More Exciting + Stable Layout */
  .timeline-chart {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 250px; /* Ensure consistent height */
  }
  
  .timeline-content {
    text-align: center;
    width: 100%;
    padding: 1rem; /* Add padding to prevent overflow */
  }
  
  .countdown-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .countdown-item {
    text-align: center;
  }
  
  .countdown-number {
    font-size: 2.5rem;
    font-weight: 900;
    font-family: 'Roboto Mono', monospace;
    background: linear-gradient(135deg, var(--brand-orange), var(--brand-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 10px rgba(255, 145, 77, 0.3);
  }
  
  .countdown-label {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.25rem;
  }
  
  .countdown-separator {
    font-size: 1.5rem;
    color: var(--brand-cyan);
    font-weight: 700;
    /* Removed rapid pulse animation */
  }
  
  .explosion-stats {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .stat-icon {
    font-size: 1.2rem;
    /* Calm, slow animation instead of rapid bounce */
    animation: gentleBob 5s ease-in-out infinite;
  }
  
  .stat-text {
    font-size: 0.9rem;
    color: #e2e8f0;
    font-weight: 600;
  }
  
  /* Bullet Emphasis for Timeline Square */
  .bullet-emphasis {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255, 145, 77, 0.1);
    border-radius: 1rem;
    border: 1px solid rgba(255, 145, 77, 0.3);
  }
  
  .bullet-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.75rem;
    transition: all 0.3s ease;
  }
  
  .bullet-item:hover {
    background: rgba(255, 145, 77, 0.2);
    transform: translateX(5px);
  }
  
  .bullet-icon {
    font-size: 1.5rem;
    min-width: 2rem;
    text-align: center;
    animation: bounce 2s ease-in-out infinite;
    animation-delay: var(--delay, 0s);
  }
  
  .bullet-text {
    font-size: 1rem;
    color: #f8fafc;
    font-weight: 700;
    line-height: 1.3;
  }
  
  /* Staggered animation delays */
  .bullet-item:nth-child(1) .bullet-icon { --delay: 0s; }
  .bullet-item:nth-child(2) .bullet-icon { --delay: 0.2s; }
  .bullet-item:nth-child(3) .bullet-icon { --delay: 0.4s; }
  .bullet-item:nth-child(4) .bullet-icon { --delay: 0.6s; }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
    60% { transform: translateY(-3px); }
  }
  
  /* Gentle bob animation - much slower and calmer */
  @keyframes gentleBob {
    0%, 50%, 100% { transform: translateY(0); }
    25% { transform: translateY(-2px); }
  }
  
  /* Hero CTA Styles */
  .hero-cta-group {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    flex-wrap: wrap;
  }
  
  .hero-cta {
    background: linear-gradient(135deg, var(--brand-blue), var(--brand-blue-text));
    color: white;
    border: none;
    padding: 1.25rem 2.5rem;
    border-radius: 3rem;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    box-shadow: 0 4px 15px rgba(0, 74, 174, 0.3);
  }
  
  .hero-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 74, 174, 0.4);
  }
  
  .hero-cta.secondary {
    background: linear-gradient(135deg, var(--brand-orange-text), var(--brand-orange));
    box-shadow: 0 4px 15px rgba(255, 145, 77, 0.3);
  }
  
  .hero-cta.secondary:hover {
    box-shadow: 0 8px 25px rgba(255, 145, 77, 0.4);
  }
  
  @keyframes glow {
    from {
      text-shadow: 0 0 20px rgba(255, 145, 77, 0.3);
    }
    to {
      text-shadow: 0 0 30px rgba(255, 145, 77, 0.6), 0 0 40px rgba(12, 192, 223, 0.3);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .animate-pulse {
    animation: pulse 2s infinite;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .chart-trinity {
      margin: 4rem 1rem;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .market-hero {
      padding: 3rem 0 4rem;
    }
    
    .market-headline {
      margin-bottom: 4rem;
    }
    
    .market-year {
      font-size: 1.5rem;
    }
    
    .market-breakdown {
      gap: 1rem;
      flex-direction: column;
    }
    
    .breakdown-item {
      flex-direction: row;
      gap: 1rem;
    }
    
    .breakdown-separator {
      display: none;
    }
    
    .breakdown-value {
      font-size: 1.4rem;
    }
    
    .chart-trinity {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .svelte-chart-container {
      height: 200px;
    }
    
    .urgency-indicators {
      gap: 1.5rem;
      flex-direction: column;
      align-items: center;
    }
    
    .hero-cta {
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 480px) {
    .chart-bar-horizontal {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }
    
    .bar-label {
      text-align: center;
      min-width: auto;
    }
    
    .bar-value {
      text-align: center;
      min-width: auto;
    }
  }
  
  /* Dramatic Convergence Statement Styling */
  .convergence-statement {
    text-align: center;
    margin: 2rem auto 4rem; /* Reduced top margin to prevent overlap */
    max-width: 900px;
    padding: 3rem 2rem;
    background: rgba(15, 23, 42, 0.8);
    border-radius: 2rem;
    border: 2px solid rgba(255, 145, 77, 0.3);
    backdrop-filter: blur(15px);
    position: relative;
    overflow: hidden;
    z-index: 1; /* Lower than chart expansions */
  }
  
  .convergence-statement::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(255, 145, 77, 0.1), transparent, rgba(12, 192, 223, 0.1), transparent);
    animation: rotate 20s linear infinite;
    z-index: -1;
  }
  
  .transition-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 2rem;
    color: #f8fafc;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
  
  .historic-highlight {
    background: linear-gradient(135deg, var(--brand-orange), var(--brand-cyan), var(--brand-orange));
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease-in-out infinite;
    display: inline-block;
    text-shadow: none;
  }
  
  .transition-text {
    font-size: 1.3rem;
    line-height: 1.7;
    color: #e2e8f0;
    margin: 0;
  }
  
  .emphasis-text {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--brand-cyan);
    text-shadow: 0 2px 10px rgba(12, 192, 223, 0.3);
  }
  
  .value-highlight {
    color: var(--brand-orange);
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(255, 145, 77, 0.3);
  }
  
  .opportunity-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--brand-orange), var(--brand-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
    margin-top: 1rem;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  /* Responsive adjustments for convergence statement */
  @media (max-width: 768px) {
    .convergence-statement {
      margin: 2rem auto;
      padding: 2rem 1.5rem;
    }
    
    .transition-title {
      font-size: 2.5rem;
    }
    
    .transition-text {
      font-size: 1.2rem;
    }
    
    .emphasis-text {
      font-size: 1.3rem;
    }
    
    .opportunity-text {
      font-size: 1.3rem;
    }
    
    /* Mobile responsiveness for 2-box layout */
    .charts-container {
      padding: 0 1rem;
    }
    
    .top-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .toggle-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
    
    .toggle-buttons {
      align-self: stretch;
    }
    
    .toggle-btn {
      flex: 1;
    }
    
    .chart-bar-horizontal {
      grid-template-columns: 1fr 1.5fr auto;
      gap: 0.75rem;
    }
    
    .bar-label {
      font-size: 0.8rem;
    }
    
    .bar-value {
      font-size: 0.9rem;
    }
  }
</style>
