<!-- Quantum Demo with Fixed Navigation -->
<script>
  import QuantumTimeline from '$lib/components/quantum/QuantumTimeline.svelte';
  import AskAIModal from '../../components/AskAIModal.svelte';
  
  let showAskAI = false;
  
  function handleOpenAskAI() {
    showAskAI = true;
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
      <div class="nav-brand" on:click={goToHome}>
        <img src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" alt="Logo" class="logo">
        <span class="brand-text">theBlockchain.ai</span>
      </div>
      
      <div class="nav-links">
        <button on:click={goToHome} class="nav-link">Home</button>
        <button on:click={goToVision} class="nav-link">Vision</button>
        <button on:click={goToFoundersProof} class="nav-link founders-proof-link">Founder's Proof</button>
        <button on:click={goToTools} class="nav-link">Tools</button>
        <button on:click={goToInvest} class="nav-link">Invest</button>
        <button type="button" class="ask-ai-link" on:click={handleOpenAskAI}>Ask AI 🤖</button>
      </div>
      
      <div class="quantum-badge">
        <span>🔮 DEMO MODE</span>
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
    
    .quantum-demo-container .quantum-badge {
      display: block;
      font-size: 0.7rem;
      padding: 0.25rem 0.5rem;
    }
  }
</style>
