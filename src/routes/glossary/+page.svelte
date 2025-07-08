<!-- Glossary page route -->
<script>
  import GlossaryPage from '../../pages/GlossaryPage.svelte';

  
  
</script>

<svelte:head>
  <title>Glossary - theBlockchain.ai</title>
  <meta name="description" content="Blockchain and AI terminology glossary" />
</svelte:head>

<div class="app-container">
  <main class="min-h-screen">
    <GlossaryPage />
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
