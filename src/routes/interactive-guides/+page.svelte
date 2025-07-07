<!-- Interactive Guides page route -->
<script>
  import InteractiveGuidesPage from '../../pages/InteractiveGuidesPage.svelte';
  import Header from '../../components/Header.svelte';
  import Footer from '../../components/Footer.svelte';
  import AskAIModal from '../../components/AskAIModal.svelte';
  import AboutModal from '../../components/AboutModal.svelte';

  let showAskAI = false;
  let showAbout = false;
  
  function handleOpenAskAI() {
    showAskAI = true;
  }
  
  function handleOpenAbout() {
    showAbout = true;
  }
</script>

<svelte:head>
  <title>Interactive Guides - theBlockchain.ai</title>
  <meta name="description" content="Interactive guides to blockchain and AI" />
</svelte:head>

<div class="app-container">
  <Header on:openAskAI={handleOpenAskAI} on:openAbout={handleOpenAbout} />
  <main class="min-h-screen">
    <InteractiveGuidesPage />
  </main>
  <Footer />
</div>

{#if showAskAI}
  <AskAIModal on:close={() => showAskAI = false} />
{/if}

{#if showAbout}
  <AboutModal on:close={() => showAbout = false} />
{/if}

<style>
  .app-container {
    min-height: 100vh;
    background-color: #020617;
    color: #f8fafc;
  }
</style>
