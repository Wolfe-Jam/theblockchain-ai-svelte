<!-- InvestPage.svelte - Clean Production Version -->
<script>
  import { onMount } from 'svelte';
  import InvestorModal from '../components/InvestorModal.svelte';
  import ReportDownload from '../components/ReportDownload.svelte';
  import DataBox from '../lib/components/DataBox.svelte';
  import TimelineBox from '../lib/components/TimelineBox.svelte';
  
  // Modal states
  let showModal = false;
  let showReportDownload = false;
  
  // Hero animation state
  let currentYear = 2025;
  let animatedMarketValue = 2.52;
  let animationPaused = false;
  
  // Market data for hero animation
  const marketData = {
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
  
  // Toggle state for data boxes
  let marketOutlook = 'highly-likely';

  // Reactive data for DataBox components
  $: marketSizeData = marketOutlook === 'conservative' ? [
    { label: 'Blockchain by 2034', value: 3.2, color: 'var(--brand-orange-text)', unit: 'T' },
    { label: 'AI by 2034', value: 2.1, color: 'var(--brand-cyan)', unit: 'T' },
    { label: 'Software by 2034', value: 1.1, color: 'var(--brand-blue)', unit: 'T' }
  ] : [
    { label: 'Blockchain by 2034', value: 5.85, color: 'var(--brand-orange-text)', unit: 'T' },
    { label: 'AI by 2034', value: 3.68, color: 'var(--brand-cyan)', unit: 'T' },
    { label: 'Software by 2034', value: 1.90, color: 'var(--brand-blue)', unit: 'T' }
  ];

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
  
  // Computed totals for DataBox components
  $: marketSizeTotal = marketSizeData.reduce((sum, item) => sum + item.value, 0).toFixed(2);
  $: cagrAverage = (cagrData.reduce((sum, item) => sum + item.value, 0) / cagrData.length).toFixed(1);

  // Component initialization
  onMount(() => {
    document.title = "Investment Opportunity | theBlockchain.ai";
    animateMarketProgression();
    
    return () => {
      // Cleanup handled by animateMarketProgression return function
    };
  });

  // Hero animation controller
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
        targetValue = marketData[currentYear].total;
      }, 4000);
    }
    
    startSmoothCounter();
    startYearProgression();
    
    return () => {
      clearInterval(smoothCounterInterval);
      clearInterval(yearProgressionInterval);
    };
  }

  // Event handlers
  function toggleMarketOutlook(outlook, event) {
    event.stopPropagation();
    marketOutlook = outlook;
  }

  function resetAnimation() {
    currentYear = 2025;
    animatedMarketValue = marketData[currentYear].total;
    animationPaused = false;
  }

  function openInvestorModal() {
    showModal = true;
  }

  function navigateToFoundersMint() {
    window.location.href = '/founders-mint';
  }

  function navigateToSmartContract() {
    window.location.href = '/smart-contract';
  }
</script>

<svelte:head>
  <title>Investment Opportunity | theBlockchain.ai</title>
  <meta name="description" content="Position yourself in the $6+ trillion convergence of AI, Blockchain, and Software markets. Professional investment opportunities available." />
</svelte:head>

<!-- Hero Section -->
<div class="market-hero">
  <div class="container">
    <div class="hero-content">
      <div class="market-headline">
        <div class="market-progression">
          <div class="market-year">{currentYear}</div>
          <h1 class="market-title">
            <span class="market-value">${animatedMarketValue.toFixed(2)}</span>
            <span class="market-label">TRILLION</span>
          </h1>
          
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
      
      <!-- Data Visualization Section -->
      <div class="charts-container">
        <div class="top-row">
          <!-- Market Size Box -->
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
          
          <!-- Growth Rate Box -->
          <DataBox 
            title="Growth Rate Comparison"
            bars={cagrData}
            totalLabel="AVG GROWTH"
            totalValue="{cagrAverage}%"
            {marketOutlook}
            maxBars={4}
          />
        </div>
        
        <!-- Timeline Box -->
        <div class="bottom-row">
          <TimelineBox {marketOutlook} />
        </div>
      </div>
      
      <!-- Conversion Section -->
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
            <span class="opportunity-text">The infrastructure is ready. The market is moving.<br>This is your moment.</span>
          </p>
        </div>
        
        <div class="conversion-section">
          <div class="conversion-prompt">
            <h3 class="prompt-text">Ready to position yourself in this opportunity?</h3>
          </div>
          
          <!-- Primary CTA -->
          <div class="primary-cta-container">
            <button class="primary-cta-button" on:click={openInvestorModal}>
              <span class="cta-text">GET INVESTMENT DETAILS</span>
              <span class="cta-arrow">→</span>
            </button>
          </div>
          
          <!-- Next Steps -->
          <div class="next-steps">
            <div class="next-steps-label">Next steps:</div>
            <div class="next-steps-links">
              <button class="step-link founders-mint" on:click={navigateToFoundersMint}>Founders Mint</button>
              <span class="step-separator">•</span>
              <button class="step-link smart-contracts" on:click={navigateToSmartContract}>Smart Contracts</button>
              <span class="step-separator">•</span>
              <a href="/invest/dashboard" class="step-link full-dashboard">Full Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modals -->
<InvestorModal bind:isOpen={showModal} />
<ReportDownload bind:isOpen={showReportDownload} />

<style lang="postcss">
  /* CSS Variables */
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
  
  /* Layout */
  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
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
    align-items: flex-start;
  }
  
  .bottom-row {
    display: grid;
    grid-template-columns: 1fr;
  }

  /* Toggle Controls */
  .toggle-buttons {
    display: flex;
    gap: 0.25rem;
    background: rgba(51, 65, 85, 0.2);
    border-radius: 0.5rem;
    padding: 0.125rem;
    border: 1px solid rgba(51, 65, 85, 0.3);
    height: 44px;
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
    height: 36px;
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

  /* Hero Section */
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
  
  /* Reset Prompt */
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

  /* Conversion Section */
  .hero-transition {
    margin-top: 3rem;
  }
  
  .convergence-statement {
    max-width: 1000px;
    margin: 0 auto 4rem;
    padding: 3rem 2rem;
    text-align: center;
  }
  
  .transition-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 900;
    color: #f8fafc;
    margin-bottom: 2rem;
    line-height: 1.2;
  }
  
  .historic-highlight {
    background: linear-gradient(135deg, var(--brand-orange), var(--brand-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .transition-text {
    font-size: 1.3rem;
    color: #cbd5e1;
    line-height: 1.7;
    margin: 0;
  }
  
  .emphasis-text {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--brand-cyan);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
  }
  
  .value-highlight {
    color: var(--brand-orange);
    font-weight: 700;
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
  
  .conversion-section {
    text-align: center;
    margin: 3rem 0;
    padding: 2rem 0;
  }
  
  .conversion-prompt {
    margin-bottom: 2rem;
  }
  
  .prompt-text {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--brand-cyan);
    margin: 0;
    line-height: 1.3;
  }
  
  /* Primary CTA */
  .primary-cta-container {
    margin-bottom: 2rem;
  }
  
  .primary-cta-button {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 2.5rem;
    background: linear-gradient(135deg, var(--brand-cyan), var(--brand-blue));
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(12, 192, 223, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .primary-cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(12, 192, 223, 0.4);
  }
  
  .cta-text {
    font-size: 1.1rem;
  }
  
  .cta-arrow {
    font-size: 1.3rem;
    transition: transform 0.3s ease;
  }
  
  .primary-cta-button:hover .cta-arrow {
    transform: translateX(4px);
  }
  
  /* Next Steps */
  .next-steps {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  .next-steps-label {
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 600;
  }
  
  .next-steps-links {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .step-link {
    color: var(--brand-cyan);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: none;
    transition: all 0.3s ease;
  }
  
  /* Color-coded step links */
  .step-link.founders-mint {
    color: var(--brand-orange);
  }
  
  .step-link.smart-contracts {
    color: var(--brand-cyan);
  }
  
  .step-link.full-dashboard {
    color: #f8fafc;
  }
  
  .step-link:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  
  .step-separator {
    color: #475569;
    font-weight: 700;
  }

  /* Animations */
  @keyframes glow {
    from { text-shadow: 0 0 20px rgba(255, 145, 77, 0.5); }
    to { text-shadow: 0 0 30px rgba(12, 192, 223, 0.8); }
  }

  /* Mobile Responsive */
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
    
    /* Mobile charts and CTA */
    .charts-container {
      padding: 0 1rem;
    }
    
    .top-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .prompt-text {
      font-size: 1.5rem;
    }
    
    .primary-cta-button {
      padding: 1rem 2rem;
      font-size: 1rem;
    }
    
    .next-steps-links {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .step-separator {
      display: none;
    }
    
    .container {
      padding: 0 1rem;
    }
  }
</style>
