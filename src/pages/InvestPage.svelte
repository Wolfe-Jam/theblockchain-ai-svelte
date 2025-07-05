<!-- src/pages/InvestPage.svelte - Svelte-First Implementation -->
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import InvestorModal from '../components/InvestorModal.svelte';
  import ReportDownload from '../components/ReportDownload.svelte';
  
  let showModal = false;
  let showReportDownload = false;
  
  // Realistic market progression data
  let currentYear = 2025;
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
  
  // Svelte tweened animations for charts
  const aiMarketHeight = tweened(0, { duration: 1000, easing: cubicOut });
  const blockchainMarketHeight = tweened(0, { duration: 1200, easing: cubicOut });
  const softwareMarketHeight = tweened(0, { duration: 800, easing: cubicOut });
  
  const cagrBlockchainHigh = tweened(0, { duration: 1000, easing: cubicOut });
  const cagrBlockchainLow = tweened(0, { duration: 1100, easing: cubicOut });
  const cagrBlockchainAI = tweened(0, { duration: 1200, easing: cubicOut });
  const cagrSoftware = tweened(0, { duration: 900, easing: cubicOut });
  const cagrAI = tweened(0, { duration: 800, easing: cubicOut });
  
  // Market size data (2030-2034 projections)
  const marketSizeData = [
    { label: 'AI by 2034', value: 3.68, color: 'var(--brand-cyan)' },
    { label: 'Blockchain by 2030', value: 1.43, color: 'var(--brand-orange)' },
    { label: 'Software by 2030', value: 1.04, color: 'var(--brand-blue)' }
  ];
  
  // CAGR data
  const cagrData = [
    { label: 'Blockchain (High)', value: 90.1, color: 'var(--brand-orange)' },
    { label: 'Blockchain (Low)', value: 43.6, color: 'var(--brand-orange-text)' },
    { label: 'Blockchain AI', value: 37.18, color: 'var(--brand-cyan)' },
    { label: 'Software Dev', value: 22.71, color: 'var(--brand-blue)' },
    { label: 'AI', value: 19.2, color: 'var(--brand-cyan)' }
  ];
  
  onMount(() => {
    // Ensure professional focus
    document.title = "Investment Opportunity | theBlockchain.ai";
    
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
    
    return () => clearInterval(spotsInterval);
  });
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
      <div class="chart-trinity">
        <!-- Market Size Chart -->
        <div class="chart-card">
          <h3 class="chart-title">Market Size by 2030-2034</h3>
          <div class="svelte-chart-container">
            {#each marketSizeData as item, i}
              <div class="chart-bar-horizontal">
                <div class="bar-label">{item.label}</div>
                <div class="bar-track">
                  <div 
                    class="bar-fill"
                    style="background: {item.color}; width: {i === 0 ? $aiMarketHeight : i === 1 ? $blockchainMarketHeight : $softwareMarketHeight}%"
                  ></div>
                </div>
                <div class="bar-value">${item.value}T</div>
              </div>
            {/each}
          </div>
          <p class="chart-insight">Combined $6.15T+ opportunity</p>
        </div>
        
        <!-- CAGR Chart -->
        <div class="chart-card">
          <h3 class="chart-title">Growth Rate Comparison</h3>
          <div class="svelte-chart-container">
            {#each cagrData as item, i}
              <div class="chart-bar-vertical">
                <div class="bar-track-vertical">
                  <div 
                    class="bar-fill-vertical"
                    style="background: {item.color}; height: {i === 0 ? $cagrBlockchainHigh : i === 1 ? $cagrBlockchainLow : i === 2 ? $cagrBlockchainAI : i === 3 ? $cagrSoftware : $cagrAI}%"
                  ></div>
                </div>
                <div class="bar-label-vertical">{item.label}</div>
                <div class="bar-value-vertical">{item.value}%</div>
              </div>
            {/each}
          </div>
          <p class="chart-insight">Blockchain leads at 90%+ CAGR</p>
        </div>
        
        <!-- Convergence Timeline -->
        <div class="chart-card">
          <h3 class="chart-title">Convergence Timeline</h3>
          <div class="svelte-chart-container timeline-chart">
            <div class="timeline-content">
              <div class="timeline-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h4>Market Acceleration Phase</h4>
              <div class="timeline-points">
                <p><strong>2024-2030:</strong> Critical positioning window</p>
                <p><strong>Blockchain:</strong> Growing 4x faster than AI</p>
                <p><strong>Software:</strong> Platform convergence phase</p>
                <p><strong>Opportunity:</strong> Early-stage entry point</p>
              </div>
            </div>
          </div>
          <p class="chart-insight">Exponential growth phase: 2024-2030</p>
        </div>
      </div>
      
      <!-- Hero Transition -->
      <div class="hero-transition">
        <div class="convergence-statement">
          <h2 class="transition-title">Your Position in This<br>Historic Market Shift</h2>
          <p class="transition-text">
            We're building the infrastructure that captures value from this convergence. 
            Early positioning in our platform means exposure to all three market segments simultaneously.
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
        
        <button class="hero-cta" on:click={scrollToOpportunities}>
          <span>Explore Investment Opportunities</span>
          <i class="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Investment Opportunities Section -->
<div id="investment-opportunities" class="invest-landing">
  <div class="container">
    <h1 class="invest-title">Investment Opportunity</h1>
    <p class="invest-subtitle">All code on blockchain. Every transaction. All Smart Contracts. Zero fraud, devs get paid. Trusted AI from theBlockchain.ai - the Authority in Open-Source matters on the BC.</p>

    <div class="investment-highlights">
      <div class="highlight-item">
        <div class="highlight-icon sun-bg">
          <i class="fas fa-chart-line"></i>
        </div>
        <h3>Massive Market</h3>
        <p>Multi-trillion dollar convergent economy at the intersection of AI, blockchain, and software development</p>
      </div>
      
      <div class="highlight-item">
        <div class="highlight-icon trust-bg">
          <img src="/theBlockchain-ai-logo.svg" alt="theBlockchain.ai" class="trust-logo">
        </div>
        <h3>Zero Fraud</h3>
        <p>First-ever blockchain-based development platform ensuring complete transparency and trust</p>
      </div>
      
      <div class="highlight-item">
        <div class="highlight-icon ocean-bg">
          <i class="fas fa-rocket"></i>
        </div>
        <h3>Unique Platform</h3>
        <p>Revolutionary three-pillar strategy: OUTPUT Marketplace, Code-In-Action, and theBlockchain infrastructure</p>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="two-column-layout">
      <!-- Column A: PDF Download -->
      <div class="column column-a">
        <div class="column-header">
          <h2>Professional PDF Report</h2>
          <p class="column-subtitle">For Investors, Developers, Researchers & General Interest. Students welcome!</p>
        </div>
        
        <div class="pdf-section">
          <div class="report-info">
            <h3>"The Convergent Economy" Market Research</h3>
            <p class="report-description">Comprehensive 26-page analysis of the convergent AI, Software, and Blockchain economy with professional insights and market data.</p>
            
            <div class="report-details">
              <h3>Professional Report Features:</h3>
              <ul>
                <li>Market Analysis & Projections</li>
                <li>Technology Convergence Insights</li>
                <li>Tokenization Framework</li>
                <li>Educational & Research Use</li>
              </ul>
            </div>
          </div>
          
          <div class="cta-section">
            <button class="download-cta" on:click={openReportDownload}>
              <i class="fas fa-download"></i>
              Download Professional Report
            </button>
            
            <p class="download-note">Free access with professional details</p>
          </div>
        </div>
      </div>
      
      <!-- Column B: Serious Investors -->
      <div class="column column-b">
        <div class="column-header">
          <h2>Investment Opportunities</h2>
          <p class="column-subtitle">For Companies & Individual Investors</p>
        </div>
        
        <div class="investor-section">
          <div class="investor-warning">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Capital Investment Inquiries Only</span>
          </div>
          
          <div class="investor-details">
            <h3>Investment Opportunity Details:</h3>
            <ul>
              <li>Minimum investment thresholds apply</li>
              <li>Due diligence materials provided to qualified investors</li>
              <li>Professional PDF report included with all investment inquiries</li>
              <li>Direct access to founding team and technical leadership</li>
            </ul>
          </div>
          
          <div class="cta-section">
            <button class="investor-cta" on:click={openInvestorModal}>
              <i class="fas fa-handshake"></i>
              Express Investment Interest
            </button>
            
            <p class="disclaimer">Available to accredited investors and institutional partners</p>
          </div>
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
  
  /* Svelte Chart Styling */
  .chart-trinity {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin: 4rem 0;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .chart-card {
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(51, 65, 85, 0.5);
    border-radius: 1rem;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .chart-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--brand-orange), var(--brand-cyan), var(--brand-orange));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .chart-card:hover {
    transform: translateY(-5px);
    border-color: var(--brand-cyan);
    box-shadow: 0 20px 40px rgba(12, 192, 223, 0.1);
  }
  
  .chart-card:hover::before {
    opacity: 1;
  }
  
  .chart-title {
    color: var(--brand-cyan);
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .svelte-chart-container {
    height: 250px;
    margin-bottom: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .chart-insight {
    color: var(--brand-orange-text);
    font-weight: 600;
    text-align: center;
    font-size: 0.9rem;
  }
  
  /* Horizontal Bar Chart */
  .chart-bar-horizontal {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .bar-label {
    font-size: 0.85rem;
    color: #cbd5e1;
    min-width: 100px;
    text-align: right;
  }
  
  .bar-track {
    flex: 1;
    height: 24px;
    background: rgba(51, 65, 85, 0.3);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }
  
  .bar-fill {
    height: 100%;
    border-radius: 12px;
    transition: width 1s ease;
    position: relative;
  }
  
  .bar-value {
    font-size: 0.9rem;
    color: #f8fafc;
    font-weight: 700;
    min-width: 50px;
    text-align: left;
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
  
  /* Timeline Chart */
  .timeline-chart {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .timeline-content {
    text-align: center;
  }
  
  .timeline-icon {
    font-size: 2rem;
    color: var(--brand-cyan);
    margin-bottom: 1rem;
  }
  
  .timeline-content h4 {
    color: #f8fafc;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .timeline-points {
    color: #cbd5e1;
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  .timeline-points p {
    margin-bottom: 0.5rem;
  }
  
  .timeline-points strong {
    color: var(--brand-orange);
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
    
    .two-column-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .invest-title {
      font-size: 2.5rem;
    }
    
    .investment-highlights {
      gap: 1.5rem;
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
</style>

