<script>
  // Import global styles and components
  import '../app.css';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
  import AboutModal from '../components/AboutModal.svelte';
  import AskAIModal from '../components/AskAIModal.svelte';
  import SerenityBoat from '../components/SerenityBoat.svelte';
  
  // Modal state management
  let showAskAI = false;
  let showAbout = false;
  
  function handleOpenAskAI() {
    showAskAI = true;
  }
  
  function handleOpenAbout() {
    console.log('SvelteKit Layout: received openAbout event'); // Debug log
    showAbout = true;
  }
</script>

<!-- SvelteKit Layout with Header and Modals -->
<div class="app-container">
  <Header on:openAskAI={handleOpenAskAI} on:openAbout={handleOpenAbout} />
  
  <!-- Main content slot -->
  <main class="main-content">
    <slot />
  </main>
  
  <Footer on:openAbout={handleOpenAbout} />
  
  <!-- Modals -->
  <AskAIModal bind:isOpen={showAskAI} />
  <AboutModal bind:isOpen={showAbout} />
  
  <!-- Serenity Boat Animation -->
  <SerenityBoat />
</div>

<style>
  :global(html) {
    font-family: 'Inter', sans-serif;
  }
  
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #020617;
    color: #f8fafc;
  }
  
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex: 1;
    min-height: calc(100vh - 200px); /* Account for header/footer */
  }
</style>
