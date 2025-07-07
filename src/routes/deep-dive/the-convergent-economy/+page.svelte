<!-- The Convergent Economy deep dive page route -->
<script>
  import ConvergentEconomyPage from '../../../pages/deep-dive/ConvergentEconomyPage.svelte';
  import Header from '../../../components/Header.svelte';
  import Footer from '../../../components/Footer.svelte';
  import AskAIModal from '../../../components/AskAIModal.svelte';
  import AboutModal from '../../../components/AboutModal.svelte';

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
  <title>The Convergent Economy - theBlockchain.ai</title>
  <meta name="description" content="Deep dive into the convergent economy model" />
</svelte:head>

<div class="app-container">
  <Header on:openAskAI={handleOpenAskAI} on:openAbout={handleOpenAbout} />
  <main class="min-h-screen">
    <ConvergentEconomyPage />
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
