<!-- Investment Overview - Market Data Focus -->
<script>
  import { onMount } from 'svelte';
  
  // Market progression data
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
  
  onMount(() => {
    // Market progression animation
    animateMarketProgression();
    
    // Spots counter
    const spotsInterval = setInterval(() => {
      spotsLeft -= Math.floor(Math.random() * 3) + 1;
      if (spotsLeft < 500) spotsLeft = 1337;
    }, 3000);
    
    return () => clearInterval(spotsInterval);
  });
  
  function animateMarketProgression() {
    const years = Object.keys(marketData).map(Number);
    let currentIndex = 0;
    
    setInterval(() => {
      currentIndex = (currentIndex + 1) % years.length;
      currentYear = years[currentIndex];
      currentMarketValue = marketData[currentYear].total;
      
      // Smooth counter animation
      const startValue = animatedMarketValue;
      const endValue = currentMarketValue;
      const startTime = performance.now();
      const duration = 2000;
      
      function updateValue(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        animatedMarketValue = startValue + (endValue - startValue) * easeProgress;
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      }
      
      requestAnimationFrame(updateValue);
    }, 4000);
  }
  
  function resetAnimation() {
    currentYear = 2025;
    currentMarketValue = marketData[currentYear].total;
    animatedMarketValue = currentMarketValue;
  }
</script>

<svelte:head>
  <title>Investment Overview | theBlockchain.ai</title>
  <meta name="description" content="Explore the convergence of AI, Blockchain, and Software markets - a $6+ trillion opportunity." />
</svelte:head>

<div class="investment-overview">
  <div class="container">
    <!-- Market Hero Section -->
    <div class="hero-section">
      <div class="market-display">
        <div class="market-year">{currentYear}</div>
        <h1 class="market-title">
          <span class="market-value">${animatedMarketValue.toFixed(2)}</span>
          <span class="market-label">TRILLION</span>
        </h1>
        
        <button class="reset-btn" on:click={resetAnimation}>
          <i class="fas fa-redo"></i>
          Start Over
        </button>
        
        <h2 class="market-subtitle">Market Convergence Is Here</h2>
        
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
        
        <p class="market-description">
          AI, Blockchain, and Software markets are converging into the largest economic 
          opportunity of our generation. Position yourself at the intersection.
        </p>
      </div>
    </div>
    
    <!-- Navigation CTAs -->
    <div class="navigation-section">
      <div class="urgency-indicators">
        <div class="indicator">
          <div class="indicator-icon">📈</div>
          <span>Market acceleration phase</span>
        </div>
        <div class="indicator">
          <div class="indicator-icon">⏰</div>
          <span>{spotsLeft} opportunities remaining</span>
        </div>
        <div class="indicator">
          <div class="indicator-icon">🎯</div>
          <span>Early-stage positioning window</span>
        </div>
      </div>
      
      <div class="cta-group">
        <a href="/invest/opportunities" class="hero-cta primary">
          <span>Explore Investment Opportunities</span>
          <i class="fas fa-arrow-right"></i>
        </a>
        
        <a href="/invest/dashboard" class="hero-cta secondary">
          <span>View Live Dashboard</span>
          <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Investment Overview - Clean Layout */
  .investment-overview {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
    min-height: 100vh;
    padding: 6rem 0;
    position: relative;
    overflow: hidden;
  }
  
  .investment-overview::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(255, 145, 77, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 3rem;
    position: relative;
    z-index: 2;
  }
  
  /* Hero Section */
  .hero-section {
    text-align: center;
    margin-bottom: 6rem;
  }
  
  .market-display {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .market-year {
    font-size: 3rem;
    color: #EA580C;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  .market-title {
    font-size: clamp(4rem, 10vw, 10rem);
    font-weight: 900;
    line-height: 0.9;
    margin-bottom: 3rem;
    font-family: 'Roboto Mono', monospace;
  }
  
  .market-value {
    background: linear-gradient(135deg, #FF914D, #0CC0DF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    animation: glow 3s ease-in-out infinite alternate;
  }
  
  .market-label {
    color: #f8fafc;
    font-size: 0.3em;
    font-weight: 700;
    letter-spacing: 0.3em;
    display: block;
    margin-top: 1rem;
  }
  
  .reset-btn {
    background: linear-gradient(135deg, #0CC0DF, #FF914D);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    margin: 2rem 0;
    font-size: 1.1rem;
  }
  
  .reset-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(12, 192, 223, 0.4);
  }
  
  .market-subtitle {
    font-size: clamp(1.8rem, 5vw, 3.5rem);
    color: #FF914D;
    font-weight: 700;
    margin: 3rem 0;
    font-family: 'Roboto Mono', monospace;
    letter-spacing: 0.05em;
    text-align: center;
    line-height: 1.2;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .market-breakdown {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: 3rem 0;
    flex-wrap: wrap;
  }
  
  .breakdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background: rgba(15, 23, 42, 0.6);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(51, 65, 85, 0.5);
  }
  
  .breakdown-label {
    font-size: 1rem;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .breakdown-value {
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
    color: #0CC0DF;
  }
  
  .breakdown-separator {
    font-size: 3rem;
    color: #FF914D;
    font-weight: 700;
    margin: 0 1rem;
  }
  
  .market-description {
    font-size: 1.5rem;
    color: #e2e8f0;
    max-width: 800px;
    margin: 3rem auto;
    line-height: 1.7;
  }
  
  /* Navigation Section */
  .navigation-section {
    margin-top: 6rem;
    text-align: center;
  }
  
  .urgency-indicators {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    margin-bottom: 4rem;
    flex-wrap: wrap;
  }
  
  .indicator {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(15, 23, 42, 0.8);
    padding: 1.5rem 2rem;
    border-radius: 2rem;
    border: 1px solid rgba(51, 65, 85, 0.6);
    color: #e2e8f0;
    font-weight: 600;
    font-size: 1.1rem;
  }
  
  .indicator-icon {
    font-size: 2rem;
    animation: pulse 2s infinite;
  }
  
  .cta-group {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .hero-cta {
    background: linear-gradient(135deg, #004AAE, #0CC0DF);
    color: white;
    border: none;
    padding: 1.5rem 3rem;
    border-radius: 3rem;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    box-shadow: 0 6px 20px rgba(12, 192, 223, 0.4);
  }
  
  .hero-cta:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(12, 192, 223, 0.5);
  }
  
  .hero-cta.secondary {
    background: linear-gradient(135deg, #EA580C, #FF914D);
    box-shadow: 0 6px 20px rgba(234, 88, 12, 0.4);
  }
  
  .hero-cta.secondary:hover {
    box-shadow: 0 12px 30px rgba(234, 88, 12, 0.5);
  }
  
  /* Animations */
  @keyframes glow {
    from {
      text-shadow: 0 0 30px rgba(255, 145, 77, 0.4);
    }
    to {
      text-shadow: 0 0 50px rgba(255, 145, 77, 0.7), 0 0 60px rgba(12, 192, 223, 0.4);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .investment-overview {
      padding: 4rem 0;
    }
    
    .container {
      padding: 0 1.5rem;
    }
    
    .market-year {
      font-size: 2rem;
    }
    
    .market-subtitle {
      font-size: 1.8rem;
      margin: 2rem 0;
      padding: 0 1rem;
    }
    
    .market-breakdown {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .breakdown-item {
      flex-direction: row;
      gap: 1.5rem;
      padding: 1.5rem;
    }
    
    .breakdown-separator {
      display: none;
    }
    
    .urgency-indicators {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .hero-cta {
      padding: 1.25rem 2.5rem;
      font-size: 1.1rem;
    }
  }
</style>