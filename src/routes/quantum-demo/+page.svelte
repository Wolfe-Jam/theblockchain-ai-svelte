<!-- Quantum Demo with Fixed Navigation -->
<script>
  import QuantumTimeline from '$lib/components/quantum/QuantumTimeline.svelte';
  import AskAIModal from '../../components/AskAIModal.svelte';
  
  let showAskAI = false;
  let showDemoInfo = false;
  
  function handleOpenAskAI() {
    showAskAI = true;
  }
  
  function handleOpenDemoInfo() {
    showDemoInfo = true;
  }
  
  function handleOpenAbout() {
    // Navigate to main site About
    window.location.href = '/';
    setTimeout(() => {
      // Trigger about modal on main site
      window.dispatchEvent(new CustomEvent('openAbout'));
    }, 100);
  }
  
  // Navigation handlers to properly exit demo mode
  function goToHome() {
    window.location.href = '/';
  }
  
  function goToVision() {
    window.location.href = '/report';
  }
  
  function goToFoundersProof() {
    window.location.href = '/founders-proof';
  }
  
  function goToTools() {
    window.location.href = '/tools';
  }
  
  function goToInvest() {
    window.location.href = '/invest';
  }
  
  console.log('Quantum demo loading...');
</script>

<svelte:head>
  <title>🔮 Quantum Timeline Demo | theBlockchain.ai</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
</svelte:head>

<!-- Demo mode container - scoped styling -->
<div class="quantum-demo-container">
  <!-- Custom header for quantum demo -->
  <header class="quantum-header">
    <nav class="quantum-nav">
      <button class="nav-brand" on:click={goToHome} on:keydown={(e) => e.key === 'Enter' && goToHome()} role="button" tabindex="0" title="About this Version">
        <img src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" alt="Logo" class="logo">
        <span class="brand-text">theBlockchain.ai</span>
      </button>
      
      <div class="nav-links">
        <button on:click={goToHome} class="nav-link">Home</button>
        <button on:click={goToVision} class="nav-link">Vision</button>
        <button on:click={goToFoundersProof} class="nav-link founders-proof-link">Founder's Proof</button>
        <button on:click={goToTools} class="nav-link">Tools</button>
        <button on:click={goToInvest} class="nav-link">Invest</button>
        <button type="button" class="ask-ai-link" on:click={handleOpenAskAI} title="Joke of the DAY">Ask AI 🤖</button>
      </div>
      
      <div class="quantum-controls">
        <button 
          class="demo-info-btn"
          on:click={handleOpenDemoInfo}
          title="About this Demo"
        >
          ℹ️
        </button>
        
        <div class="quantum-badge">
          <span>🔮 DEMO MODE</span>
          <button 
            on:click={goToHome} 
            class="exit-demo-btn"
            title="Return to Main Site"
          >
            ✕
          </button>
        </div>
      </div>
    </nav>
  </header>

  <main class="quantum-demo-main">
    <div class="demo-container">
      <div class="demo-header">
        <h1 class="quantum-title">
          <span class="title-line-1">🔮 Quantum AI</span>
          <span class="title-line-2">Investment Toolbox</span>
        </h1>
        <p class="demo-subtitle">
          Revolutionary investment interface with quantum superposition states and AI behavioral adaptation
        </p>
        
        <div class="demo-navigation-info">
          <strong>Navigation:</strong> Use the header above to return to main site
        </div>
      </div>
      
      <!-- The Revolutionary Quantum Timeline -->
      <QuantumTimeline />
    </div>
  </main>

  <!-- Working Modal -->
  <AskAIModal bind:isOpen={showAskAI} />
  
  <!-- Demo Info Modal -->
  {#if showDemoInfo}
    <div class="demo-info-backdrop" on:click|self={() => showDemoInfo = false}>
      <div class="demo-info-modal">
        <div class="demo-info-header">
          <h2 class="demo-info-title">🔮 Quantum AI Investment Toolbox</h2>
          <button 
            class="demo-info-close"
            on:click={() => showDemoInfo = false}
            title="Close"
          >
            ✕
          </button>
        </div>
        
        <div class="demo-info-content">
          <!-- Top Psychological Hook -->
          <div class="demo-info-intro">
            <p class="demo-info-question">
              <span class="accent-green">></span> Does this demo represent the future of financial interfaces?
              <span class="accent-green">&lt;</span>
            </p>
          </div>
          
          <div class="demo-info-section">
            <h3 class="section-title">// PIONEERING ARCHITECTURE</h3>
            <ul class="feature-list">
              <li><span class="feature-label">Framework:</span> Pure SvelteKit with reactive stores & motion physics</li>
              <li><span class="feature-label">State Management:</span> Quantum superposition using Svelte writable stores</li>
              <li><span class="feature-label">Animation Engine:</span> Spring physics with custom easing functions</li>
              <li><span class="feature-label">Real-time Adaptation:</span> AI behavioral analysis via mouse tracking</li>
            </ul>
          </div>
          
          <div class="demo-info-section">
            <h3 class="section-title">// QUANTUM FEATURES</h3>
            <ul class="feature-list">
              <li><span class="feature-label">Superposition States:</span> Multiple investment scenarios exist simultaneously</li>
              <li><span class="feature-label">Wave Function Collapse:</span> User observation determines reality</li>
              <li><span class="feature-label">Coherence Tracking:</span> Maintains quantum state integrity</li>
              <li><span class="feature-label">Probability Fields:</span> Dynamic risk visualization with physics</li>
            </ul>
          </div>
          
          <div class="demo-info-section">
            <h3 class="section-title">// AI BEHAVIORAL ADAPTATION</h3>
            <ul class="feature-list">
              <li><span class="feature-label">Risk Profiling:</span> Real-time analysis of user interaction patterns</li>
              <li><span class="feature-label">Emotional Detection:</span> Mouse movement reveals investment psychology</li>
              <li><span class="feature-label">Dynamic Scenarios:</span> AI adjusts projections based on user behavior</li>
              <li><span class="feature-label">Session Analytics:</span> Comprehensive behavioral data collection</li>
            </ul>
          </div>
          
          <div class="demo-info-section">
            <h3 class="section-title">// TECHNICAL IMPLEMENTATION</h3>
            <ul class="feature-list">
              <li><span class="feature-label">PDF Generation:</span> Dynamic reports via html2canvas + jsPDF</li>
              <li><span class="feature-label">Motion System:</span> Spring physics with tweened interpolation</li>
              <li><span class="feature-label">Data Visualization:</span> Custom SVG charts with reactive updates</li>
              <li><span class="feature-label">Performance:</span> Optimized for 60fps with efficient DOM updates</li>
            </ul>
          </div>
          
          <div class="demo-info-section">
            <h3 class="section-title">// REVOLUTIONARY CONCEPTS</h3>
            <ul class="feature-list">
              <li><span class="feature-label">Quantum UI:</span> First investment interface using quantum mechanics</li>
              <li><span class="feature-label">Behavioral Finance:</span> Psychology-driven scenario adaptation</li>
              <li><span class="feature-label">Probabilistic Modeling:</span> Multiple futures rendered simultaneously</li>
              <li><span class="feature-label">Interactive Physics:</span> User actions create ripple effects in data</li>
            </ul>
          </div>
          
          <div class="demo-info-footer">
            <p class="demo-info-celebration">
              <span class="accent-green">></span> Congrats! You made it here 🎉
            </p>
            <p class="demo-info-revelation">
              <span class="accent-green">></span> Now you know about the future of AI fintech interfaces!
              <span class="accent-green">&lt;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* DEMO MODE ONLY - No global overrides */
  .quantum-demo-container {
    font-family: 'Roboto Mono', monospace;
  }
  
  /* Demo Mode Color Palette - LOCAL ONLY */
  .quantum-demo-container {
    --demo-purple-deep: #6B46C1;
    --demo-purple-light: #8B5CF6;
    --demo-purple-dark: #553C9A;
    
    --demo-green-system: #10B981;
    --demo-green-light: #34D399;
    --demo-green-dark: #059669;
    
    --demo-turquoise: #14B8A6;
    --demo-turquoise-light: #5EEAD4;
    --demo-turquoise-dark: #0F766E;
    
    --demo-gold: #F59E0B;
    --demo-gold-light: #FCD34D;
    --demo-gold-dark: #D97706;
    
    --demo-bg-dark: #1E1B3A;
    --demo-bg-darker: #161338;
    --demo-text-white: #FFFFFF;
    --demo-text-light: #E5E7EB;
    --demo-text-accent: #D1D5DB;
    --demo-text-green: #34D399;
  }

  /* Quantum Header Styles - Scoped to demo container */
  .quantum-demo-container .quantum-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: linear-gradient(135deg, var(--demo-bg-darker) 0%, var(--demo-purple-dark) 100%);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--demo-purple-light);
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(107, 70, 193, 0.3);
  }
  
  .quantum-demo-container .quantum-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .quantum-demo-container .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .quantum-demo-container .nav-brand:hover {
    transform: scale(1.05);
  }
  
  .quantum-demo-container .logo {
    height: 32px;
    width: auto;
    filter: drop-shadow(0 0 8px var(--demo-purple-light));
  }
  
  .quantum-demo-container .brand-text {
    font-size: 1.2rem;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
    background: linear-gradient(135deg, var(--demo-purple-light), var(--demo-turquoise));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.025em;
  }
  
  .quantum-demo-container .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .quantum-demo-container .nav-link {
    background: none;
    border: none;
    color: var(--demo-text-white);
    text-decoration: none;
    font-weight: 500;
    font-family: 'Roboto Mono', monospace;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;
    letter-spacing: 0.025em;
    cursor: pointer;
  }
  
  .quantum-demo-container .nav-link:hover {
    color: var(--demo-turquoise-light);
    transform: translateY(-1px);
    text-shadow: 0 0 8px var(--demo-turquoise);
  }
  
  .quantum-demo-container .founders-proof-link {
    background: linear-gradient(135deg, var(--demo-gold), var(--demo-purple-light)) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    font-weight: 700 !important;
    font-family: 'Roboto Mono', monospace !important;
    position: relative;
  }
  
  .quantum-demo-container .founders-proof-link::before {
    content: '🏆';
    margin-right: 0.5rem;
    filter: drop-shadow(0 0 4px var(--demo-gold));
  }
  
  .quantum-demo-container .ask-ai-link {
    background: linear-gradient(135deg, var(--demo-purple-deep), var(--demo-gold));
    color: var(--demo-text-white);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-family: 'Roboto Mono', monospace;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(107, 70, 193, 0.3);
    letter-spacing: 0.025em;
  }
  
  .quantum-demo-container .ask-ai-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
    background: linear-gradient(135deg, var(--demo-purple-light), var(--demo-gold-light));
  }
  
  .quantum-demo-container .quantum-badge {
    background: linear-gradient(135deg, var(--demo-purple-deep), var(--demo-green-dark));
    border: 1px solid var(--demo-purple-light);
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: 'Roboto Mono', monospace;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 8px rgba(107, 70, 193, 0.3);
    animation: demoPulse 3s ease-in-out infinite;
    letter-spacing: 0.1em;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .quantum-demo-container .exit-demo-btn {
    background: rgba(239, 68, 68, 0.8);
    border: 1px solid rgba(239, 68, 68, 0.6);
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
    line-height: 1;
  }
  
  .quantum-demo-container .exit-demo-btn:hover {
    background: rgba(239, 68, 68, 1);
    border-color: rgba(239, 68, 68, 0.8);
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
  }
  
  /* Quantum Controls Container */
  .quantum-demo-container .quantum-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .quantum-demo-container .demo-info-btn {
    background: rgba(34, 197, 94, 0.8);
    border: 1px solid rgba(34, 197, 94, 0.6);
    color: white;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
    line-height: 1;
    font-family: 'Roboto Mono', monospace;
  }
  
  .quantum-demo-container .demo-info-btn:hover {
    background: rgba(34, 197, 94, 1);
    border-color: rgba(34, 197, 94, 0.8);
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
  }
  
  @keyframes demoPulse {
    0%, 100% { 
      box-shadow: 0 2px 8px rgba(107, 70, 193, 0.3);
      transform: scale(1);
    }
    50% { 
      box-shadow: 0 4px 16px rgba(107, 70, 193, 0.5);
      transform: scale(1.02);
    }
  }
  
  /* Main Content - Scoped to demo container */
  .quantum-demo-container .quantum-demo-main {
    padding-top: 80px; /* Space for fixed header */
    font-family: 'Roboto Mono', monospace;
  }
  
  .quantum-demo-container .demo-container {
    min-height: calc(100vh - 80px);
    background: linear-gradient(135deg, 
      var(--demo-bg-darker) 0%, 
      var(--demo-bg-dark) 25%, 
      var(--demo-purple-dark) 50%, 
      var(--demo-bg-dark) 75%, 
      var(--demo-bg-darker) 100%);
    color: var(--demo-text-light);
    padding: 40px 20px;
  }
  
  .quantum-demo-container .demo-header {
    max-width: 1200px;
    margin: 0 auto 40px;
    text-align: center;
  }
  
  .quantum-demo-container .demo-header h1 {
    font-size: 3rem;
    font-weight: 800;
    font-family: 'Roboto Mono', monospace;
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, 
      var(--demo-purple-light), 
      var(--demo-turquoise), 
      var(--demo-gold), 
      var(--demo-green-system));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 400% 400%;
    animation: demoGradientShift 4s ease-in-out infinite;
    filter: drop-shadow(0 2px 4px rgba(107, 70, 193, 0.3));
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  .quantum-demo-container .quantum-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .quantum-demo-container .title-line-1 {
    display: block;
    font-size: 3rem;
    line-height: 1;
  }

  .quantum-demo-container .title-line-2 {
    display: block;
    font-size: 2.5rem;
    line-height: 1;
    margin-left: 2.5rem; /* Offset to clear the 🔮 icon */
    font-weight: 700;
  }
  
  .quantum-demo-container .demo-subtitle {
    font-size: 1.2rem;
    font-family: 'Roboto Mono', monospace;
    font-weight: 400;
    color: var(--demo-text-accent);
    margin-bottom: 32px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    letter-spacing: 0.025em;
  }
  
  .quantum-demo-container .demo-navigation-info {
    background: linear-gradient(135deg, 
      rgba(107, 70, 193, 0.15), 
      rgba(20, 184, 166, 0.15));
    border: 1px solid var(--demo-turquoise);
    padding: 1rem;
    border-radius: 0.75rem;
    margin: 20px auto;
    max-width: 500px;
    color: var(--demo-text-green);
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
    letter-spacing: 0.025em;
  }
  
  /* Animations for demo mode */
  @keyframes demoGradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes demoPulse {
    0%, 100% { 
      box-shadow: 0 2px 8px rgba(107, 70, 193, 0.3);
      transform: scale(1);
    }
    50% { 
      box-shadow: 0 4px 16px rgba(107, 70, 193, 0.5);
      transform: scale(1.02);
    }
  }
  
  /* Responsive Design - Scoped to demo container */
  @media (max-width: 768px) {
    .quantum-demo-container .quantum-nav {
      padding: 1rem;
    }
    
    .quantum-demo-container .nav-links {
      gap: 1rem;
      font-size: 0.9rem;
    }
    
    .quantum-demo-container .quantum-controls {
      gap: 0.5rem; /* Reduce gap on mobile */
    }
    
    .quantum-demo-container .demo-info-btn {
      width: 28px;
      height: 28px;
      font-size: 14px;
    }
    
    .quantum-demo-container .quantum-badge {
      display: none; /* Hide badge on very small screens */
    }
    
    .quantum-demo-container .demo-header h1 {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 640px) {
    .quantum-demo-container .nav-links {
      display: none; /* Hide navigation on mobile - show only brand and badge */
    }
    
    .quantum-demo-container .quantum-controls {
      gap: 0.5rem;
    }
    
    .quantum-demo-container .quantum-badge {
      display: block;
      font-size: 0.7rem;
      padding: 0.25rem 0.5rem;
    }
  }
  
  /* Demo Info Modal Styles */
  .demo-info-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    animation: fadeIn 0.3s ease-out;
  }
  
  .demo-info-modal {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
    border: 2px solid rgba(34, 197, 94, 0.3);
    border-radius: 16px;
    max-width: 900px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.5),
      0 0 40px rgba(34, 197, 94, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: slideIn 0.4s ease-out;
    position: relative;
  }
  
  .demo-info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem 1rem;
    border-bottom: 1px solid rgba(34, 197, 94, 0.2);
  }
  
  .demo-info-title {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    color: #22c55e;
    margin: 0;
    text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
  }
  
  .demo-info-close {
    background: rgba(239, 68, 68, 0.8);
    border: 1px solid rgba(239, 68, 68, 0.6);
    color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
    line-height: 1;
  }
  
  .demo-info-close:hover {
    background: rgba(239, 68, 68, 1);
    transform: scale(1.1);
  }
  
  .demo-info-content {
    padding: 1.5rem 2rem 2rem;
  }
  
  .demo-info-section {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    font-weight: 600;
    color: #22c55e;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-left: 3px solid #22c55e;
    padding-left: 0.75rem;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .feature-list li {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9rem;
    color: #e2e8f0;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.5;
  }
  
  .feature-list li::before {
    content: '>';
    position: absolute;
    left: 0;
    color: #22c55e;
    font-weight: bold;
  }
  
  .feature-label {
    color: #60a5fa;
    font-weight: 600;
  }
  
  .demo-info-footer {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(34, 197, 94, 0.2);
  }
  
  .demo-info-intro {
    text-align: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(34, 197, 94, 0.2);
    margin-bottom: 2rem;
  }
  
  .demo-info-question {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.1rem;
    color: #22c55e;
    margin: 0;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
  }
  
  .demo-info-celebration {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.1rem;
    color: #fbbf24;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }
  
  .demo-info-revelation {
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    color: #e2e8f0;
    margin: 0;
    font-style: italic;
  }
  
  .accent-green {
    color: #22c55e;
    font-weight: bold;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  /* Mobile responsiveness for modal */
  @media (max-width: 768px) {
    .demo-info-backdrop {
      padding: 1rem;
    }
    
    .demo-info-modal {
      max-height: 85vh;
    }
    
    .demo-info-header {
      padding: 1rem 1.5rem 0.75rem;
    }
    
    .demo-info-title {
      font-size: 1.25rem;
    }
    
    .demo-info-content {
      padding: 1rem 1.5rem 1.5rem;
    }
    
    .feature-list li {
      font-size: 0.85rem;
    }
  }
</style>
