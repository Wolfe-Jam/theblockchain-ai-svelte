<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let demoComponent = null;
  let componentInfo = null;
  
  $: slug = $page.params.slug;
  
  // Demo component configurations
  const demoConfigs = {
    'bai-pay': {
      name: 'NOBS Pay - Universal Payment Component',
      description: 'Experience the revolutionary 3-in-1 payment solution',
      features: ['Stripe Integration', 'PayPal Support', 'Crypto Payments', 'Mobile Optimized'],
      demoType: 'interactive'
    },
    'nobs-pay': {
      name: 'NOBS Pay - No BS Payment Processing', 
      description: 'Clean, straightforward payment processing',
      features: ['Simple Setup', 'No Hidden Fees', 'Fast Processing', 'Clean UI'],
      demoType: 'interactive'
    },
    'dataviz-pro': {
      name: 'DataViz Pro - Advanced Chart Library',
      description: 'Professional data visualization components',
      features: ['20+ Chart Types', 'Real-time Updates', 'Beautiful Animations', 'Responsive Design'],
      demoType: 'showcase'
    },
    'auth-shield': {
      name: 'Auth Shield - Complete Authentication',
      description: 'Enterprise-grade authentication system',
      features: ['OAuth Integration', '2FA Support', 'Role Management', 'Security First'],
      demoType: 'showcase'
    }
  };
  
  onMount(() => {
    componentInfo = demoConfigs[slug] || {
      name: 'Component Demo',
      description: 'Demo not available yet',
      features: [],
      demoType: 'placeholder'
    };
  });
</script>

<svelte:head>
  <title>Demo: {componentInfo?.name || 'Component Demo'} | theBlockchain.ai</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Header -->
  <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div>
          <nav class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <a href="/marketplace" class="hover:text-blue-600">Marketplace</a>
            <span>→</span>
            <span>Demo</span>
          </nav>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {componentInfo?.name || 'Loading...'}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">
            {componentInfo?.description || ''}
          </p>
        </div>
        
        <div class="flex space-x-3">
          <a 
            href="/marketplace" 
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ← Back to Marketplace
          </a>
          <button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Purchase Component
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Demo Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if componentInfo}
      <!-- Features Overview -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {#each componentInfo.features as feature}
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Demo Area -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
        {#if componentInfo.demoType === 'interactive'}
          <!-- Interactive Demo -->
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Interactive Demo</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Experience the full functionality of {componentInfo.name}
            </p>
            
            <!-- Demo placeholder - would load actual component -->
            <div class="max-w-md mx-auto p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <p class="text-gray-500 dark:text-gray-400 mb-4">🚀 Live demo coming soon!</p>
              <p class="text-sm text-gray-400 dark:text-gray-500">
                This will showcase the actual {componentInfo.name} component with full interactivity.
              </p>
            </div>
          </div>
          
        {:else if componentInfo.demoType === 'showcase'}
          <!-- Visual Showcase Demo -->
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Visual Showcase</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              See {componentInfo.name} in action
            </p>
            
            <!-- Showcase placeholder -->
            <div class="max-w-2xl mx-auto p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <p class="text-gray-500 dark:text-gray-400 mb-4">📊 Visual demo coming soon!</p>
              <p class="text-sm text-gray-400 dark:text-gray-500">
                This will display screenshots, videos, and examples of {componentInfo.name}.
              </p>
            </div>
          </div>
          
        {:else}
          <!-- Placeholder Demo -->
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Demo Coming Soon</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              We're preparing an amazing demo experience for this component.
            </p>
            <button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Get Notified When Ready
            </button>
          </div>
        {/if}
      </div>

      <!-- Call to Action -->
      <div class="mt-8 text-center">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 border border-gray-200 dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to Get Started?</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Purchase {componentInfo.name} and integrate it into your project today.
          </p>
          <div class="flex justify-center space-x-4">
            <button class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Purchase Now
            </button>
            <a 
              href="/marketplace/products/{slug}" 
              class="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
