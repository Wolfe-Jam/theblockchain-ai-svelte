<script lang="ts">
  import PersonalCatalog from '$lib/components/marketplace/PersonalCatalog.svelte';
  import type { FlipCardExport } from '$lib/types/flipcard';
  
  let userId = 'current-user'; // TODO: Get from auth system
  let personalCatalogRef: PersonalCatalog;
  
  // Handle exports from FlipCard Designer
  function handleDesignerExport(event: CustomEvent<FlipCardExport>) {
    if (personalCatalogRef) {
      personalCatalogRef.addProductToCatalog(event.detail);
    }
  }
</script>

<svelte:head>
  <title>My FlipCard Catalog - theBlockchain.ai</title>
  <meta name="description" content="Manage your FlipCard product collection. Create, organize, and publish your software components to the marketplace." />
</svelte:head>

<!-- 📦 PERSONAL CATALOG PAGE -->
<div class="catalog-page">
  <PersonalCatalog 
    bind:this={personalCatalogRef}
    {userId} 
    on:export={handleDesignerExport}
  />
</div>

<style>
  .catalog-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
    padding: 2rem 0;
  }
  
  @media (max-width: 640px) {
    .catalog-page {
      padding: 1rem 0;
    }
  }
</style>