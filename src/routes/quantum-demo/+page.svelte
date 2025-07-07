<!-- Step 3: Add QuantumTimeline (Skip AboutModal) -->
<script>
  import Header from '../../components/Header.svelte';
  import AskAIModal from '../../components/AskAIModal.svelte';
  import QuantumTimeline from '$lib/components/quantum/QuantumTimeline.svelte';
  // Note: AboutModal causes 500 error - skipping for now
  
  let showAskAI = false;
  
  function handleOpenAskAI() {
    showAskAI = true;
  }
  
  function handleOpenAbout() {
    // AboutModal disabled - could implement simple alert or redirect
    alert('About functionality temporarily disabled');
  }
  
  console.log('Quantum demo loading with QuantumTimeline...');
</script>

<svelte:head>
  <title>🔮 Quantum Timeline Demo | theBlockchain.ai</title>
</svelte:head>

<div class="app-container">
  <Header on:openAskAI={handleOpenAskAI} on:openAbout={handleOpenAbout} />
  
  <main class="quantum-demo-main">
    <div class="demo-container">
      <div class="demo-header">
        <h1>🔮 Quantum Timeline System</h1>
        <p class="demo-subtitle">
          Revolutionary investment interface with quantum superposition states and AI behavioral adaptation
        </p>
        
        <div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px; font-size: 0.9rem;">
          <strong>Navigation:</strong> Move mouse to top of page for site navigation
        </div>
      </div>
      
      <!-- The Revolutionary Quantum Timeline -->
      <QuantumTimeline />
    </div>
  </main>
  
  <!-- Working Modal Only -->
  <AskAIModal bind:isOpen={showAskAI} />
</div>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    background-color: #0F172A;
    color: #F8FAFC;
  }
  
  .quantum-demo-main {
    flex: 1;
    padding-top: 80px; /* Space for header */
  }
  
  .demo-container {
    min-height: calc(100vh - 80px);
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1e293b 75%, #0f172a 100%);
    color: white;
    padding: 40px 20px;
  }
  
  .demo-header {
    max-width: 1200px;
    margin: 0 auto 40px;
    text-align: center;
  }
  
  .demo-header h1 {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981, #f59e0b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 400% 400%;
    animation: gradientShift 4s ease-in-out infinite;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .demo-subtitle {
    font-size: 1.2rem;
    color: #94a3b8;
    margin-bottom: 32px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .quantum-demo-main {
      padding-top: 60px;
    }
    
    .demo-header h1 {
      font-size: 2rem;
    }
  }
</style>
