<!-- my-theblockchain-ai-app/src/App.svelte -->
<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import HomePage from './pages/HomePage.svelte';
  import VisionPage from './pages/VisionPage.svelte';
  import ReportPage from './pages/ReportPage.svelte';
  import InvestPage from './pages/InvestPage.svelte';
  import FAQsPage from './pages/FAQsPage.svelte';
  
  // Basic routing logic (will be expanded later with a proper router)
  let currentPath = window.location.pathname;
  
  // Listen for navigation changes (e.g., when user clicks a link)
  window.addEventListener('popstate', () => {
    currentPath = window.location.pathname;
  });
</script>

<div class="app-container">
  <Header />
  <main class="min-h-screen">
    {#if currentPath === '/'}
      <HomePage />
    {:else if currentPath === '/vision'}
      <VisionPage />
    {:else if currentPath === '/report'}
      <ReportPage />
    {:else if currentPath === '/invest'}
      <InvestPage />
    {:else if currentPath === '/faqs'}
      <FAQsPage />
    {:else}
      <div class="flex flex-col items-center justify-center py-20">
        <h1 class="text-4xl text-white text-center">404 - Page Not Found</h1>
        <p class="text-xl text-slate-300 text-center mt-4">Please check the URL.</p>
      </div>
    {/if}
  </main>
  <Footer />
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