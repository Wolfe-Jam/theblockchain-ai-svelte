<script>
  import { onMount } from 'svelte';
  
  let availableDemos = [
    {
      slug: 'bai-pay',
      name: 'bAI-Pay Universal Payment Component',
      description: 'Revolutionary 3-in-1 payment solution',
      type: 'Interactive Demo'
    },
    {
      slug: 'nobs-pay', 
      name: 'NOBS Pay - No BS Payment Processing',
      description: 'Clean, straightforward payment processing',
      type: 'Interactive Demo'
    },
    {
      slug: 'dataviz-pro',
      name: 'DataViz Pro - Advanced Chart Library',
      description: 'Professional data visualization components',
      type: 'Visual Showcase'
    },
    {
      slug: 'auth-shield',
      name: 'Auth Shield - Complete Authentication', 
      description: 'Enterprise-grade authentication system',
      type: 'Visual Showcase'
    }
  ];
</script>

<svelte:head>
  <title>Component Demos | theBlockchain.ai</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Header -->
  <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Component Demos
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Experience our marketplace components in action. Try interactive demos and see real examples.
        </p>
      </div>
    </div>
  </div>

  <!-- Demo Grid -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each availableDemos as demo}
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {demo.name}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-3">
                {demo.description}
              </p>
              <span class="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {demo.type}
              </span>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <a 
              href="/demo/{demo.slug}"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded font-medium transition-colors"
            >
              View Demo
            </a>
            <a 
              href="/marketplace/products/{demo.slug}"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Details
            </a>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Back to Marketplace -->
    <div class="text-center mt-12">
      <a 
        href="/marketplace"
        class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        ← Back to Marketplace
      </a>
    </div>
  </div>
</div>
