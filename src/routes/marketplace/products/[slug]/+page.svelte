<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { supabase, isSupabaseConfigured } from '$lib/database/supabase';
  import type { Component } from '$lib/marketplace/types';
  import NOBSPay from '$lib/components/NOBSPay';
  import type { PaymentResult } from '$lib/components/NOBSPay/types';
  
  let component: Component | null = null;
  let loading = true;
  let error: string | null = null;
  let selectedLicense: 'individual' | 'team' | 'enterprise' = 'individual';
  let showPayment = false;
  let paymentSuccess = false;
  let paymentResult: PaymentResult | null = null;
  let testMode = false; // Default to live mode for real transactions
  
  // Get mock data for development
  function getMockComponent(slug: string): Component | null {
    const mockComponents: Record<string, Component> = {
      'nobs-pay': {
        id: '1',
        name: 'NOBS Pay',
        slug: 'nobs-pay',
        tagline: 'Universal payment component for modern apps',
        description: 'The only payment component that gives your users maximum choice while giving you minimum complexity. Integrate Stripe, PayPal, and cryptocurrency payments with a single, beautiful component.',
        consumer_tagline: 'No BS pay less',
        api_name: 'Next Open Billing Software',
        formal_name: 'Neural Omni Balance System',
        fintech_name: 'Next Open Billing Stack',
        price_individual: 100,  // $1.00 for testing
        price_team: 49900,
        price_enterprise: 149900,
        category: 'payment-processing',
        tags: ['payment', 'stripe', 'paypal', 'crypto', 'checkout', 'e-commerce'],
        keywords: ['payment gateway', 'checkout', 'e-commerce'],
        tech_stack: ['svelte', 'typescript', 'stripe-api', 'paypal-sdk'],
        flip_card_theme: 'wallet',
        flip_card_size: 'standard',
        rating: 5.0,
        download_count: 0,
        featured: true,
        is_api_product: true,
        is_active: true,
        is_published: true,
        created_at: new Date().toISOString(),
        demo_url: '/marketplace/demo/nobs-pay',
        developer_features: [
          'Universal payment gateway supporting multiple processors',
          'Multi-processor support (Stripe, PayPal, Crypto)',
          'Full TypeScript definitions for type safety',
          'Customizable themes to match your brand',
          'Built-in webhook handling for payment events',
          'PCI compliant with secure tokenization',
          'Mobile-optimized responsive design',
          'Internationalization support (20+ currencies)',
          'Comprehensive error handling and recovery',
          'Real-time payment status updates'
        ]
      },
      'dataviz-pro': {
        id: '2',
        name: 'DataViz Pro',
        slug: 'dataviz-pro',
        tagline: 'Beautiful charts and graphs for your data',
        description: 'Transform your data into stunning visualizations with our professional charting library. Built on D3.js with pre-configured responsive charts, real-time updates, and seamless Svelte integration.',
        consumer_tagline: 'Visualize everything',
        api_name: 'DataViz Professional',
        formal_name: 'Data Visualization Suite',
        fintech_name: 'Analytics Display Engine',
        price_individual: 14900,
        price_team: 34900,
        price_enterprise: 99900,
        category: 'data-visualization',
        tags: ['charts', 'd3js', 'analytics', 'dashboard', 'graphs', 'visualization'],
        keywords: ['data viz', 'graphs', 'charts', 'analytics'],
        tech_stack: ['svelte', 'd3js', 'typescript', 'svg'],
        flip_card_theme: 'neon',
        flip_card_size: 'standard',
        rating: 4.8,
        download_count: 42,
        featured: false,
        is_api_product: false,
        is_active: true,
        is_published: true,
        created_at: new Date().toISOString(),
        demo_url: '/marketplace/demo/dataviz-pro',
        developer_features: [
          'Over 20 pre-built chart types',
          'Real-time data updates with smooth transitions',
          'Fully responsive design for all screen sizes',
          'Export charts as PNG, SVG, or PDF',
          'Custom theming with CSS variables',
          'Interactive tooltips and legends',
          'Zoom and pan capabilities',
          'Accessibility features (ARIA labels)',
          'Server-side rendering support',
          'Minimal bundle size with tree-shaking'
        ]
      },
      'auth-shield': {
        id: '3',
        name: 'Auth Shield',
        slug: 'auth-shield',
        tagline: 'Complete authentication solution',
        description: 'Enterprise-grade authentication system with everything you need for secure user management. Includes social login, multi-factor authentication, passwordless options, and comprehensive session management.',
        consumer_tagline: 'Login made simple',
        api_name: 'Authentication Shield',
        formal_name: 'Security Authentication Framework',
        fintech_name: 'Identity Verification System',
        price_individual: 24900,
        price_team: 59900,
        price_enterprise: 179900,
        category: 'authentication',
        tags: ['auth', 'security', 'oauth', 'mfa', 'login', 'supabase'],
        keywords: ['authentication', 'login', 'security', 'oauth'],
        tech_stack: ['svelte', 'supabase', 'oauth2', 'jwt'],
        flip_card_theme: 'gradient',
        flip_card_size: 'standard',
        rating: 4.9,
        download_count: 128,
        featured: true,
        is_api_product: true,
        is_active: true,
        is_published: true,
        created_at: new Date().toISOString(),
        demo_url: '/marketplace/demo/auth-shield',
        developer_features: [
          'Social login (Google, GitHub, Twitter, Facebook)',
          'Multi-factor authentication (SMS, Email, TOTP)',
          'Passwordless authentication (Magic links)',
          'Session management with refresh tokens',
          'Role-based access control (RBAC)',
          'User profile management',
          'Password strength requirements',
          'Account recovery flows',
          'Rate limiting and brute force protection',
          'GDPR compliant with data export/deletion'
        ]
      }
    };
    
    return mockComponents[slug] || null;
  }
  
  onMount(async () => {
    const slug = $page.params.slug;
    
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        console.log('Using mock data - Supabase not configured');
        component = getMockComponent(slug);
        if (!component) {
          error = 'Product not found';
        }
      } else {
        // Try to load from Supabase
        const { data, error: supabaseError } = await supabase
          .from('components')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (supabaseError || !data) {
          // Fall back to mock data
          console.log('Falling back to mock data');
          component = getMockComponent(slug);
          if (!component) {
            error = 'Product not found';
          }
        } else {
          component = data;
        }
      }
    } catch (err) {
      console.log('Using mock data due to error');
      component = getMockComponent(slug);
      if (!component) {
        error = 'Failed to load product';
      }
    } finally {
      loading = false;
    }
  });
  
  function formatPrice(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }
  
  function getSelectedPrice(): number {
    if (!component) return 0;
    switch (selectedLicense) {
      case 'team':
        return component.price_team;
      case 'enterprise':
        return component.price_enterprise;
      default:
        return component.price_individual;
    }
  }
  
  function handleBuyNow() {
    showPayment = true;
  }
  
  function handlePaymentSuccess(result: PaymentResult) {
    console.log('Payment successful!', result);
    paymentResult = result;
    paymentSuccess = true;
    showPayment = false;
    
    // Auto-hide success message after 10 seconds
    setTimeout(() => {
      paymentSuccess = false;
      paymentResult = null;
    }, 10000);
  }
  
  function handlePaymentError(error: Error) {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error.message}`);
  }
  
  function handlePaymentCancel() {
    console.log('Payment cancelled');
    showPayment = false;
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
  {#if loading}
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-600 dark:text-gray-300">Loading product details...</span>
        </div>
      </div>
    </div>
  {:else if error || !component}
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p class="text-red-800 dark:text-red-200">{error || 'Product not found'}</p>
      </div>
    </div>
  {:else}
    <!-- Product Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {component.name}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              {component.tagline}
            </p>
            <div class="flex items-center gap-4 mt-4">
              {#if component.featured}
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Featured
                </span>
              {/if}
              <div class="flex items-center">
                <span class="text-yellow-400 text-lg">★</span>
                <span class="ml-1 text-gray-600 dark:text-gray-400">{component.rating}</span>
              </div>
              <span class="text-gray-500 dark:text-gray-400">
                {component.download_count} downloads
              </span>
            </div>
          </div>
          
          {#if component.demo_url}
            <a 
              href={component.demo_url}
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Try Demo
            </a>
          {/if}
        </div>
      </div>
    </div>
    
    <!-- Payment Success Message -->
    {#if paymentSuccess && paymentResult}
      <div class="fixed top-4 right-4 z-50 max-w-md">
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 shadow-lg">
          <div class="flex items-start gap-3">
            <div class="text-green-400 text-2xl">✅</div>
            <div>
              <h3 class="font-semibold text-green-800 dark:text-green-200 mb-1">
                Payment Successful!
              </h3>
              <p class="text-green-700 dark:text-green-300 text-sm mb-2">
                Thank you for purchasing {component?.name}!
              </p>
              <div class="text-xs text-green-600 dark:text-green-400">
                <p>Transaction ID: {paymentResult.transactionId}</p>
                <p>Amount: ${(paymentResult.amount / 100).toFixed(2)}</p>
                <p>Method: {paymentResult.method.toUpperCase()}</p>
              </div>
              <div class="mt-3">
                <button class="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                  Download License
                </button>
              </div>
            </div>
            <button 
              on:click={() => paymentSuccess = false}
              class="text-green-400 hover:text-green-600 ml-auto"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    {/if}
    
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Description -->
          <section id="overview">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Overview
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {component.description}
            </p>
          </section>
          
          <!-- Features -->
          {#if component.developer_features && component.developer_features.length > 0}
            <section id="features">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Features
              </h2>
              <div class="grid md:grid-cols-2 gap-4">
                {#each component.developer_features as feature}
                  <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                {/each}
              </div>
            </section>
          {/if}
          
          <!-- Tech Stack -->
          <section id="tech-stack">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Tech Stack
            </h2>
            <div class="flex flex-wrap gap-2">
              {#each component.tech_stack as tech}
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                  {tech}
                </span>
              {/each}
            </div>
          </section>
          
          <!-- Tags -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Tags
            </h2>
            <div class="flex flex-wrap gap-2">
              {#each component.tags as tag}
                <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                  #{tag}
                </span>
              {/each}
            </div>
          </section>
        </div>
        
        <!-- Sidebar - Pricing -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Choose License
            </h3>
            
            <!-- License Options -->
            <div class="space-y-3 mb-6">
              <label class="block">
                <input 
                  type="radio" 
                  name="license" 
                  value="individual"
                  bind:group={selectedLicense}
                  class="sr-only peer"
                />
                <div class="p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 border-gray-200 dark:border-gray-600">
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-semibold text-gray-900 dark:text-white">Individual</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">For solo developers</div>
                    </div>
                    <div class="text-xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(component.price_individual)}
                    </div>
                  </div>
                </div>
              </label>
              
              {#if component.price_team}
                <label class="block">
                  <input 
                    type="radio" 
                    name="license" 
                    value="team"
                    bind:group={selectedLicense}
                    class="sr-only peer"
                  />
                  <div class="p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 border-gray-200 dark:border-gray-600">
                    <div class="flex justify-between items-center">
                      <div>
                        <div class="font-semibold text-gray-900 dark:text-white">Team</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Up to 10 developers</div>
                      </div>
                      <div class="text-xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(component.price_team)}
                      </div>
                    </div>
                  </div>
                </label>
              {/if}
              
              {#if component.price_enterprise}
                <label class="block">
                  <input 
                    type="radio" 
                    name="license" 
                    value="enterprise"
                    bind:group={selectedLicense}
                    class="sr-only peer"
                  />
                  <div class="p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 border-gray-200 dark:border-gray-600">
                    <div class="flex justify-between items-center">
                      <div>
                        <div class="font-semibold text-gray-900 dark:text-white">Enterprise</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Unlimited developers</div>
                      </div>
                      <div class="text-xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(component.price_enterprise)}
                      </div>
                    </div>
                  </div>
                </label>
              {/if}
            </div>
            
            <!-- Payment Mode Toggle -->
            <div class="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3">Payment Mode:</h4>
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span class="text-sm font-medium">
                  {#if testMode}
                    🧪 Test Mode
                  {:else}
                    🔴 LIVE Mode
                  {/if}
                </span>
                <button
                  class="px-3 py-1 text-xs font-medium rounded-md transition-colors
                    {testMode 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-red-500 text-white'}"
                  on:click={() => testMode = !testMode}
                >
                  {testMode ? 'Test' : 'LIVE'}
                </button>
              </div>
              {#if !testMode}
                <p class="text-xs text-red-600 dark:text-red-400 mt-2">
                  ⚠️ Real charges will be made to your card
                </p>
              {:else}
                <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                  🧪 Use card 4242 4242 4242 4242 for testing
                </p>
              {/if}
            </div>
            
            <!-- What's Included -->
            <div class="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3">What's included:</h4>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Full source code
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime updates
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Documentation
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Email support
                </li>
              </ul>
            </div>
            
            <button 
              on:click={handleBuyNow}
              class="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              disabled={paymentSuccess}
            >
              {#if paymentSuccess}
                ✅ Purchased Successfully
              {:else}
                Buy Now - {formatPrice(getSelectedPrice())}
              {/if}
            </button>
            
            <p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Payment Modal -->
  {#if showPayment && component}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Complete Your Purchase
            </h2>
            <button 
              on:click={() => showPayment = false}
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{component.name}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">{selectedLicense} License</p>
              </div>
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                {formatPrice(getSelectedPrice())}
              </p>
            </div>
          </div>
          
          <NOBSPay
            amount={getSelectedPrice()}
            productName={`${component.name} - ${selectedLicense} License`}
            productId={component.id}
            theme="brand"
            testMode={testMode}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
          />
        </div>
      </div>
    </div>
  {/if}
</div>