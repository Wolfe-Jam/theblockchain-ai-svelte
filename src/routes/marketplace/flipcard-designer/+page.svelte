<script lang="ts">
  import FlipCardDesignerEnhanced from '$lib/components/marketplace/FlipCardDesignerEnhanced.svelte';
  import { goto } from '$app/navigation';
  
  // Handle export from designer
  function handleExport(event: CustomEvent) {
    console.log('FlipCard exported:', event.detail);
    // Could save to personal catalog or redirect
  }
</script>

<svelte:head>
  <title>FlipCard Designer - Create Professional Software Packaging | theBlockchain.ai</title>
  <meta name="description" content="Design album covers for software components. Master SIZE-5 (333px) with automatic scaling from 88px to 999px." />
</svelte:head>

<!-- Clean page with just the designer -->
<FlipCardDesignerEnhanced on:export={handleExport} />

<style>
  /* Page takes full height */
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
</style>