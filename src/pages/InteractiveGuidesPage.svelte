<!-- src/pages/InteractiveGuidesPage.svelte -->
<script>
  // Future: This will be populated with interactive content
  const guides = [
    {
      id: 1,
      title: "The Convergent Economy Explorer",
      description: "Interactive visualization of AI, Software, and Blockchain market convergence with live data charts and Smart Contract Generator.",
      type: "Market Analysis",
      features: ["Live Market Data", "Interactive Charts", "AI Contract Generator", "Founder Proof Minting"],
      status: "Coming Soon",
      estimatedLaunch: "Q2 2025"
    }
    // Future interactive guides will be added here
  ];
</script>

<div class="min-h-screen bg-slate-900 text-white">
  <!-- Hero Section -->
  <div class="relative bg-gradient-to-br from-orange-900 via-slate-800 to-slate-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative max-w-6xl mx-auto px-6 py-24">
      <div class="text-center">
        <h1 class="text-5xl font-bold mb-6 text-orange-400">
          Interactive Guides
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Hands-on exploration tools for the convergent economy.<br>
          Experience the concepts through interactive data, tools, and simulations.
        </p>
      </div>
    </div>
  </div>

  <!-- Guides Content -->
  <div class="max-w-4xl mx-auto px-6 py-16">
    
    {#each guides as guide}
      <article class="mb-12 last:mb-0">
        <div class="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <div class="flex items-start justify-between mb-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {guide.type}
                </span>
                <span class="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm font-semibold">
                  {guide.status}
                </span>
              </div>
              
              <h2 class="text-2xl font-bold text-white mb-3">
                {guide.title}
              </h2>
              
              <p class="text-slate-300 leading-relaxed mb-4">
                {guide.description}
              </p>
              
              <!-- Features List -->
              <div class="mb-4">
                <h4 class="text-lg font-semibold text-orange-400 mb-2">Features:</h4>
                <div class="flex flex-wrap gap-2">
                  {#each guide.features as feature}
                    <span class="bg-slate-700 text-cyan-400 px-3 py-1 rounded-lg text-sm">
                      {feature}
                    </span>
                  {/each}
                </div>
              </div>
              
              {#if guide.estimatedLaunch}
                <p class="text-slate-400 text-sm">
                  <strong>Estimated Launch:</strong> {guide.estimatedLaunch}
                </p>
              {/if}
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              {#if guide.status === "Coming Soon"}
                <button 
                  disabled
                  class="bg-slate-600 text-slate-400 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>
              {:else}
                <a 
                  href="/interactive-guides/{guide.id}"
                  class="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Launch Guide
                </a>
              {/if}
              
              <a 
                href="/briefings"
                class="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Read the Briefing
              </a>
            </div>
            
            <div class="text-slate-400 text-sm">
              Interactive experience with tools and data
            </div>
          </div>
        </div>
      </article>
    {/each}
    
    <!-- Preview Content -->
    <div class="bg-gradient-to-r from-orange-900 to-slate-900 rounded-lg p-8 mt-12">
      <h3 class="text-2xl font-bold mb-4 text-white">What Makes Our Interactive Guides Different?</h3>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h4 class="text-lg font-semibold text-orange-400 mb-3">🛠️ Hands-On Tools</h4>
          <p class="text-slate-300 mb-4">
            Generate real smart contracts, explore live market data, and interact with working examples of our technology stack.
          </p>
          
          <h4 class="text-lg font-semibold text-orange-400 mb-3">📊 Live Data Integration</h4>
          <p class="text-slate-300">
            Real-time market information, dynamic charts, and current metrics that update as the convergent economy evolves.
          </p>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold text-orange-400 mb-3">🎯 Strategic Context</h4>
          <p class="text-slate-300 mb-4">
            Every interactive element ties back to strategic business decisions and real-world implementation scenarios.
          </p>
          
          <h4 class="text-lg font-semibold text-orange-400 mb-3">🚀 Actionable Outcomes</h4>
          <p class="text-slate-300">
            Leave with concrete next steps, generated code, and clear understanding of how to implement concepts in your own projects.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Call to Action -->
    <div class="text-center bg-slate-800 rounded-lg p-8 mt-12">
      <h3 class="text-2xl font-bold mb-4 text-white">Ready to Build?</h3>
      <p class="text-slate-300 mb-6">
        While our Interactive Guides are in development, explore our current tools and resources.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a 
          href="/tools" 
          class="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Try Smart Contract Generator
        </a>
        <a 
          href="/deep-dive/the-convergent-economy" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Read Deep Dive Analysis
        </a>
      </div>
    </div>
  </div>
</div>
