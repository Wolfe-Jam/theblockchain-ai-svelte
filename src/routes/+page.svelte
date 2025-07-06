<!-- Root page - redirect to main site or showcase -->
<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // For now, redirect to quantum demo as showcase
    // Later can be changed to main homepage
    window.location.href = '/quantum-demo';
  });
</script>

<svelte:head>
  <title>theBlockchain.ai - Revolutionary Fintech Platform</title>
  <meta name="description" content="AI-powered blockchain investment platform with quantum-inspired interfaces" />
</svelte:head>

<div class="min-h-screen bg-slate-900 text-white flex items-center justify-center">
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">🚀 theBlockchain.ai</h1>
    <p class="text-xl text-slate-300 mb-8">Loading revolutionary interface...</p>
    <div class="loader mx-auto"></div>
  </div>
</div>

<style>
  .loader {
    width: 40px;
    height: 40px;
    border: 4px solid #1e293b;
    border-top: 4px solid #0cc0df;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>