<!-- my-theblockchain-ai-app/src/App.svelte -->
<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import AskAIModal from './components/AskAIModal.svelte';
  import AboutModal from './components/AboutModal.svelte';
  import SerenityBoat from './components/SerenityBoat.svelte';
  import HomePage from './pages/HomePage.svelte';
  import VisionPage from './pages/VisionPage.svelte';
  import ReportPage from './pages/ReportPage.svelte';
  import InvestPage from './pages/InvestPage.svelte';
  import InvestOpportunitiesPage from './pages/InvestOpportunitiesPage.svelte';
  import FAQsPage from './pages/FAQsPage.svelte';
  import BriefingsPage from './pages/BriefingsPage.svelte';
  import ToolsPage from './pages/ToolsPage.svelte';
  import ConvergentEconomyPage from './pages/deep-dive/ConvergentEconomyPage.svelte';
  import FoundersProofPage from './pages/FoundersProofPage.svelte';
  import GlossaryPage from './pages/GlossaryPage.svelte';
  import InteractiveGuidesPage from './pages/InteractiveGuidesPage.svelte';
  import InvestorDashboard from './pages/InvestorDashboard.svelte';
  
  // Basic routing logic (will be expanded later with a proper router)
  let currentPath = window.location.pathname;
  let showAskAI = false;
  let showAbout = false;
  
  // Listen for navigation changes (e.g., when user clicks a link)
  window.addEventListener('popstate', () => {
    currentPath = window.location.pathname;
  });
  
  function handleOpenAskAI() {
    showAskAI = true;
  }
  
  function handleOpenAbout() {
    console.log('handleOpenAbout called in App, setting showAbout to true'); // Debug log
    showAbout = true;
  }
</script>

<div class="app-container">
  <Header on:openAskAI={handleOpenAskAI} on:openAbout={handleOpenAbout} />
  <main class="min-h-screen">
    {#if currentPath === '/'}
      <HomePage />
    {:else if currentPath === '/vision'}
      <VisionPage />
    {:else if currentPath === '/briefings'}
      <BriefingsPage />
    {:else if currentPath === '/interactive-guides'}
      <InteractiveGuidesPage />
    {:else if currentPath === '/deep-dive/the-convergent-economy'}
      <ConvergentEconomyPage />
    {:else if currentPath === '/founders-proof'}
      <FoundersProofPage />
    {:else if currentPath === '/tools'}
      <ToolsPage />
    {:else if currentPath === '/glossary'}
      <GlossaryPage />
    {:else if currentPath === '/invest/dashboard'}
      <InvestorDashboard />
    {:else if currentPath === '/report'}
      <ReportPage />
    {:else if currentPath === '/invest'}
      <InvestPage />
    {:else if currentPath === '/invest/opportunities'}
      <InvestOpportunitiesPage />
    {:else if currentPath === '/faqs'}
      <FAQsPage />
    {:else}
      <div class="flex flex-col items-center justify-center py-20">
        <h1 class="text-4xl text-white text-center">404 - Page Not Found</h1>
        <p class="text-xl text-slate-300 text-center mt-4">Please check the URL.</p>
      </div>
    {/if}
  </main>
  <Footer on:openAbout={handleOpenAbout} />
  <AskAIModal bind:isOpen={showAskAI} />
  <AboutModal bind:isOpen={showAbout} />
  {#if currentPath !== '/deep-dive/the-convergent-economy'}
    <SerenityBoat />
  {/if}
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