<!-- SvelteKit Layout for Investment Routes -->
<script>
  import { page } from '$app/stores';
  import Header from '../../components/Header.svelte';
  
  let pageTitle = 'Investment Overview';
  
  // Reactive page title based on route
  $: {
    if ($page.route.id?.includes('dashboard')) {
      pageTitle = 'Investor Dashboard';
    } else if ($page.route.id?.includes('opportunities')) {
      pageTitle = 'Investment Opportunities';
    } else {
      pageTitle = 'Investment Overview';
    }
  }
</script>

<svelte:head>
  <title>{pageTitle} | theBlockchain.ai</title>
</svelte:head>

<div class="sveltekit-layout">
  <Header />
  
  <main class="sveltekit-main">
    <slot />
  </main>
  
  <!-- Footer removed - handled by main layout -->
</div>

<style>
  .sveltekit-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0F172A;
  }
  
  .sveltekit-main {
    flex: 1;
    padding-top: 0; /* Header handles its own spacing */
  }
  
  /* Ensure SvelteKit routes have proper styling inheritance */
  :global(.sveltekit-main) {
    color: #F8FAFC;
    font-family: 'Inter', sans-serif;
  }
</style>
