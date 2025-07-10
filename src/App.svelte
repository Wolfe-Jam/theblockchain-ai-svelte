<!-- my-theblockchain-ai-app/src/App.svelte -->
<script>
  import HomePage from './pages/HomePage.svelte';
  import AskAIModal from './components/AskAIModal.svelte';
  import AboutModal from './components/AboutModal.svelte';
  import SerenityBoat from './components/SerenityBoat.svelte';
  
  // SvelteKit imports for proper routing
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  // Basic state management
  let currentPath = '/';
  let showAskAI = false;
  let showAbout = false;
  
  // Subscribe to page store for routing
  $: currentPath = $page.url.pathname;
  
  // Browser-specific code should run in onMount
  onMount(() => {
    if (browser) {
      console.log('App mounted in browser');
    }
  });
  
  function handleOpenAskAI() {
    showAskAI = true;
  }
  
  function handleOpenAbout() {
    console.log('App.svelte: received openAbout event');
    showAbout = true;
  }
</script>

<!-- Clean Homepage Container - No Header (handled by SvelteKit layout) -->
<div class="app-container">
  <main class="min-h-screen">
    <!-- Only render HomePage - all other routes handled by SvelteKit -->
    <HomePage />
  </main>
  
  <!-- Modals and animations -->
  <AskAIModal bind:isOpen={showAskAI} />
  <AboutModal bind:isOpen={showAbout} />
  
  <!-- SerenityBoat only on homepage -->
  <SerenityBoat />
</div>

<style lang="postcss">
  /* Global styles for the Svelte app */
  :global(body) {
    font-family: 'Inter', sans-serif;
    background-color: #0F172A; /* Consistent dark background */
    color: #F8FAFC;
    margin: 0;
    line-height: 1.7;
    @apply text-base; /* Tailwind default body text size */
  }
  :global(h1, h2, h3, h4) {
    color: #F8FAFC;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
  }
  
  /* Global Tailwind imports go in src/app.css, not here directly */
</style>