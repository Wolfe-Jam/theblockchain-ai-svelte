<!-- FAQs page route -->
<script>
  import FAQsPage from '../../pages/FAQsPage.svelte';

  
  
</script>

<svelte:head>
  <title>FAQs - theBlockchain.ai</title>
  <meta name="description" content="Frequently asked questions" />
</svelte:head>

<div class="app-container">
  <main class="min-h-screen">
    <FAQsPage />
  </main>
  <!-- Footer removed - handled by main layout -->
</div>



<style>
  .app-container {
    min-height: 100vh;
    background-color: #020617;
    color: #f8fafc;
  }
</style>
