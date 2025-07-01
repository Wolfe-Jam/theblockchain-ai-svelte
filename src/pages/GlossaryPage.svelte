<!-- src/pages/GlossaryPage.svelte -->
<script>
  import { onMount } from 'svelte';
  import { spring, tweened } from 'svelte/motion';
  import { quintOut, elasticOut } from 'svelte/easing';
  
  // Animation stores for each pillar
  const outputHeight = spring(0, { stiffness: 0.1, damping: 0.8 });
  const ciaHeight = spring(0, { stiffness: 0.1, damping: 0.8 });
  const baiHeight = spring(0, { stiffness: 0.1, damping: 0.8 });
  
  const outputScale = spring(1, { stiffness: 0.3, damping: 0.6 });
  const ciaScale = spring(1, { stiffness: 0.3, damping: 0.6 });
  const baiScale = spring(1, { stiffness: 0.3, damping: 0.6 });
  
  // Glow animation stores
  const outputGlow = spring(0, { stiffness: 0.2, damping: 0.7 });
  const ciaGlow = spring(0, { stiffness: 0.2, damping: 0.7 });
  const baiGlow = spring(0, { stiffness: 0.2, damping: 0.7 });
  
  let pillarsVisible = false;
  let sequenceComplete = false;
  
  // Staggered pillar growth animation
  async function growPillars() {
    if (sequenceComplete) return;
    
    pillarsVisible = true;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Pillars grow with staggered timing
    outputHeight.set(128); // 32 * 4 = 128px (h-32 in Tailwind)
    outputGlow.set(1);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    ciaHeight.set(128);
    ciaGlow.set(1);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    baiHeight.set(128);
    baiGlow.set(1);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Gentle bounce effect at the end
    outputScale.set(1.05);
    ciaScale.set(1.05);
    baiScale.set(1.05);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    outputScale.set(1);
    ciaScale.set(1);
    baiScale.set(1);
    
    sequenceComplete = true;
  }
  
  // Scroll to pillar definition when clicked
  function scrollToPillar(pillar) {
    let targetId = '';
    switch(pillar) {
      case 'output':
        targetId = 'output-definition';
        break;
      case 'cia':
        targetId = 'cia-definition';
        break;
      case 'bai':
        targetId = 'bai-definition';
        break;
    }
    
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a subtle highlight effect
      target.classList.add('highlight-flash');
      setTimeout(() => target.classList.remove('highlight-flash'), 2000);
    }
  }
  
  // Individual pillar hover effects
  function handlePillarHover(pillar) {
    if (!sequenceComplete) return;
    
    switch(pillar) {
      case 'output':
        outputScale.set(1.1);
        break;
      case 'cia':
        ciaScale.set(1.1);
        break;
      case 'bai':
        baiScale.set(1.1);
        break;
    }
  }
  
  function handlePillarLeave(pillar) {
    if (!sequenceComplete) return;
    
    switch(pillar) {
      case 'output':
        outputScale.set(1);
        break;
      case 'cia':
        ciaScale.set(1);
        break;
      case 'bai':
        baiScale.set(1);
        break;
    }
  }
  
  // Intersection Observer for triggering animation
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !sequenceComplete) {
          growPillars();
        }
      });
    }, { threshold: 0.3 });
    
    const pillarsElement = document.querySelector('.pillars-container');
    if (pillarsElement) {
      observer.observe(pillarsElement);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    return () => observer.disconnect();
  });
  
  // Glossary terms organized by category
  const glossaryTerms = [
    {
      category: "The 3 Strategic Pillars",
      terms: [
        {
          term: "The OUTPUT Marketplace",
          definition: "A vibrant, decentralized ecosystem for discovering and deploying trusted AI automation modules. The marketplace where developers monetize their contributions and enterprises find proven solutions.",
          example: "The OUTPUT marketplace transforms your code into tradable, revenue-generating assets."
        },
        {
          term: "Code-In-Action (CIA)",
          definition: "Custom, intelligent automation solutions that leverage marketplace modules to solve high-value enterprise problems. The bridge between static code and dynamic capital.",
          example: "CIA solutions turn your development work into scalable business automation."
        },
        {
          term: "theBlockchain",
          definition: "The foundational layer of verifiable trust that underpins the entire ecosystem, ensuring IP protection, transparent monetization, and immutable proof of ownership.",
          example: "theBlockchain provides cryptographic proof of your contributions and automates royalty distribution."
        }
      ]
    },
    {
      category: "theBlockchain.ai Framework", 
      terms: [
        {
          term: "Developer Stake",
          definition: "A unique on-chain asset representing your open-source contribution - not just a record, but a liquid, tradable stake in your own work.",
          example: "Your developer stake generates revenue every time your code is used."
        },
        {
          term: "Automated Royalties", 
          definition: "Payment terms embedded directly into code that execute automatically and transparently without intermediaries.",
          example: "Automated royalties ensure you get paid for every use of your code."
        },
        {
          term: "ERC-1155",
          definition: "The multi-token standard that allows a single smart contract to manage both fungible and non-fungible assets with unparalleled efficiency and interoperability.",
          example: "ERC-1155 enables royalties, access keys, and governance votes in one contract."
        }
      ]
    },
    {
      category: "Core Concepts",
      terms: [
        {
          term: "Tokenizing",
          definition: "The active process of converting code, assets, or intellectual property into tradable, revenue-generating digital tokens. We use the verb form to emphasize this as an ongoing capability, not a static concept.",
          example: "Tokenizing your open-source contributions creates liquid stakes in your own work."
        },
        {
          term: "Smart Contracts",
          definition: "Self-executing contracts with terms directly written into code, enabling automated royalties, verifiable IP protection, and transparent monetization without intermediaries.",
          example: "Smart contracts embed your payment terms directly into your code."
        }
      ]
    },
    {
      category: "Our Strategic Advantage",
      terms: [
        {
          term: "The Convergent Economy",
          definition: "The multi-trillion dollar economic frontier emerging from the intersection of AI, Software, and Blockchain technologies, where tokenizing unlocks unprecedented value.",
          example: "The convergent economy transforms developers from coders into capitalists."
        },
        {
          term: "Immutable Trust",
          definition: "Our foundational competitive advantage: verifiable, unchangeable records of ownership, provenance, and transactions that create unprecedented transparency and accountability in AI development.",
          example: "Immutable trust eliminates the need for intermediaries and creates unshakeable confidence in AI systems."
        }
      ]
    }
  ];
  
  onMount(() => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
</script>

<div class="min-h-screen bg-slate-900 text-white">
  <!-- Hero Section -->
  <div class="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative max-w-4xl mx-auto px-6 py-24">
      <div class="text-center">
        <h1 class="text-5xl font-bold mb-6 text-slate-200">
          Glossary
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Key terms and concepts that define the convergent economy.<br>
          The language of transformation from static code to dynamic capital.
        </p>
      </div>
    </div>
  </div>

  <!-- Glossary Content -->
  <div class="max-w-4xl mx-auto px-6 py-16">
    
    <!-- 3 Pillars Animated Visual -->
    <div class="mb-16 pillars-container">
      <div class="flex justify-center items-end gap-8 mb-8">
        <!-- OUTPUT Pillar -->
        <div class="text-center">
          <p class="text-orange-300 font-semibold text-sm mb-3 uppercase tracking-wide opacity-0"
             class:opacity-100={pillarsVisible}>devs</p>
          
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            class="relative cursor-pointer"
            on:mouseenter={() => handlePillarHover('output')}
            on:mouseleave={() => handlePillarLeave('output')}
            on:click={() => scrollToPillar('output')}
            style="transform: scale({$outputScale});"
          >
            <!-- Pillar with animated height -->
            <div 
              class="rounded-t-lg w-20 mx-auto mb-4 shadow-lg transition-all duration-300 overflow-hidden"
              style="
                height: {$outputHeight}px;
                background: linear-gradient(to top, #FF914D, #FFB366);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(255, 145, 77, 0.2);
              "
            >
              <div class="flex items-center justify-center h-full">
                <span class="text-white font-bold text-sm transform -rotate-90 whitespace-nowrap">OUTPUT</span>
              </div>
            </div>
            
            <!-- Base -->
            <div class="bg-slate-700 w-24 h-6 rounded-b-lg mx-auto"></div>
          </div>
          
          <h3 class="text-orange-400 font-bold mt-3 text-lg opacity-0 transition-opacity duration-500"
              class:opacity-100={pillarsVisible}>OUTPUT</h3>
          <p class="text-slate-400 text-sm mt-1 opacity-0 transition-opacity duration-500 delay-300"
             class:opacity-100={pillarsVisible}>Marketplace</p>
        </div>
        
        <!-- CIA Pillar -->
        <div class="text-center">
          <p class="text-cyan-300 font-semibold text-sm mb-3 uppercase tracking-wide opacity-0 transition-opacity duration-500 delay-200"
             class:opacity-100={pillarsVisible}>users</p>
          
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            class="relative cursor-pointer"
            on:mouseenter={() => handlePillarHover('cia')}
            on:mouseleave={() => handlePillarLeave('cia')}
            on:click={() => scrollToPillar('cia')}
            style="transform: scale({$ciaScale});"
          >
            <!-- Pillar with animated height -->
            <div 
              class="rounded-t-lg w-20 mx-auto mb-4 shadow-lg transition-all duration-300 overflow-hidden"
              style="
                height: {$ciaHeight}px;
                background: linear-gradient(to top, #0CC0DF, #3DD5F3);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(12, 192, 223, 0.2);
              "
            >
              <div class="flex items-center justify-center h-full">
                <span class="text-white font-bold text-sm transform -rotate-90 whitespace-nowrap">CIA</span>
              </div>
            </div>
            
            <!-- Base -->
            <div class="bg-slate-700 w-24 h-6 rounded-b-lg mx-auto"></div>
          </div>
          
          <h3 class="text-cyan-400 font-bold mt-3 text-lg opacity-0 transition-opacity duration-500 delay-200"
              class:opacity-100={pillarsVisible}>CIA</h3>
          <p class="text-slate-400 text-sm mt-1 opacity-0 transition-opacity duration-500 delay-500"
             class:opacity-100={pillarsVisible}>Code-In-Action</p>
        </div>
        
        <!-- BAI Pillar -->
        <div class="text-center">
          <p class="text-blue-300 font-semibold text-sm mb-3 uppercase tracking-wide opacity-0 transition-opacity duration-500 delay-400"
             class:opacity-100={pillarsVisible}>trust</p>
          
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            class="relative cursor-pointer"
            on:mouseenter={() => handlePillarHover('bai')}
            on:mouseleave={() => handlePillarLeave('bai')}
            on:click={() => scrollToPillar('bai')}
            style="transform: scale({$baiScale});"
          >
            <!-- Pillar with animated height -->
            <div 
              class="rounded-t-lg w-20 mx-auto mb-4 shadow-lg transition-all duration-300 overflow-hidden"
              style="
                height: {$baiHeight}px;
                background: linear-gradient(to top, #004AAE, #2668C7);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 74, 174, 0.2);
              "
            >
              <div class="flex items-center justify-center h-full">
                <span class="text-white font-bold text-sm transform -rotate-90 whitespace-nowrap">BAI</span>
              </div>
            </div>
            
            <!-- Base -->
            <div class="bg-slate-700 w-24 h-6 rounded-b-lg mx-auto"></div>
          </div>
          
          <h3 class="text-blue-400 font-bold mt-3 text-lg opacity-0 transition-opacity duration-500 delay-400"
              class:opacity-100={pillarsVisible}>BAI</h3>
          <p class="text-slate-400 text-sm mt-1 opacity-0 transition-opacity duration-500 delay-700"
             class:opacity-100={pillarsVisible}>Blockchain AI</p>
        </div>
      </div>
    </div>
    
    <!-- Logo positioned between pillars and title -->
    <div class="flex justify-center mb-12">
      <div class="relative w-16 h-16 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg">
        <img 
          src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" 
          alt="theBlockchain.ai Logo" 
          class="w-8 h-8"
          on:error={(e) => {
            e.target.src = 'https://placehold.co/32x32/1E293B/FFFFFF?text=Logo';
            e.target.onerror = null;
          }}
        />
      </div>
    </div>
    
    {#each glossaryTerms as category}
      <section class="mb-16">
        {#if category.category === "The 3 Strategic Pillars"}
          <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--brand-blue);">
            {category.category}
          </h2>
        {:else if category.category === "theBlockchain.ai Framework"}
          <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--brand-orange);">
            {category.category}
          </h2>
        {:else if category.category === "Core Concepts"}
          <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--brand-cyan);">
            {category.category}
          </h2>
        {:else if category.category === "Our Strategic Advantage"}
          <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--brand-blue);">
            {category.category}
          </h2>
        {:else}
          <h2 class="text-3xl font-bold mb-8 text-center text-slate-200">
            {category.category}
          </h2>
        {/if}
        
        <div class="space-y-8">
          {#each category.terms as item}
            {#if category.category === "The 3 Strategic Pillars"}
              <!-- Strategic Pillars with individual colors -->
              {#if item.term.includes('OUTPUT')}
                <!-- OUTPUT - Orange for Developers -->
                <div class="bg-slate-800 rounded-xl p-8 border-l-4" 
                     style="border-left-color: var(--brand-orange);"
                     id="output-definition">
                  <h3 class="text-2xl font-semibold mb-4" style="color: var(--brand-orange);">
                    {item.term}
                  </h3>
                  
                  <p class="text-slate-300 leading-relaxed mb-4">
                    {item.definition}
                  </p>
                  
                  {#if item.example}
                    <div class="bg-slate-900 rounded-lg p-4 border-l-4" style="border-left-color: var(--brand-orange);">
                      <p class="text-orange-200 text-sm font-medium mb-1">Example:</p>
                      <p class="text-slate-300 italic">"{item.example}"</p>
                    </div>
                  {/if}
                </div>
              {:else if item.term.includes('CIA')}
                <!-- CIA - Cyan for Users -->
                <div class="bg-slate-800 rounded-xl p-8 border-l-4" 
                     style="border-left-color: var(--brand-cyan);"
                     id="cia-definition">
                  <h3 class="text-2xl font-semibold mb-4" style="color: var(--brand-cyan);">
                    {item.term}
                  </h3>
                  
                  <p class="text-slate-300 leading-relaxed mb-4">
                    {item.definition}
                  </p>
                  
                  {#if item.example}
                    <div class="bg-slate-900 rounded-lg p-4 border-l-4" style="border-left-color: var(--brand-cyan);">
                      <p class="text-cyan-200 text-sm font-medium mb-1">Example:</p>
                      <p class="text-slate-300 italic">"{item.example}"</p>
                    </div>
                  {/if}
                </div>
              {:else if item.term.includes('theBlockchain')}
                <!-- theBlockchain - Blue for Trust -->
                <div class="bg-slate-800 rounded-xl p-8 border-l-4" 
                     style="border-left-color: var(--brand-blue);"
                     id="bai-definition">
                  <h3 class="text-2xl font-semibold mb-4" style="color: var(--brand-blue);">
                    {item.term}
                  </h3>
                  
                  <p class="text-slate-300 leading-relaxed mb-4">
                    {item.definition}
                  </p>
                  
                  {#if item.example}
                    <div class="bg-slate-900 rounded-lg p-4 border-l-4" style="border-left-color: var(--brand-blue);">
                      <p class="text-blue-200 text-sm font-medium mb-1">Example:</p>
                      <p class="text-slate-300 italic">"{item.example}"</p>
                    </div>
                  {/if}
                </div>
              {/if}
            {:else if category.category === "theBlockchain.ai Framework"}
              <!-- Framework with orange theme -->
              <div class="bg-slate-800 rounded-xl p-8 border-l-4" 
                   style="border-left-color: var(--brand-orange);">
                <h3 class="text-2xl font-semibold mb-4" style="color: var(--brand-orange);">
                  {item.term}
                </h3>
                
                <p class="text-slate-300 leading-relaxed mb-4">
                  {item.definition}
                </p>
                
                {#if item.example}
                  <div class="bg-slate-900 rounded-lg p-4 border-l-4" style="border-left-color: var(--brand-orange);">
                    <p class="text-orange-200 text-sm font-medium mb-1">Example:</p>
                    <p class="text-slate-300 italic">"{item.example}"</p>
                  </div>
                {/if}
              </div>
            {:else if category.category === "Core Concepts"}
              <!-- Core Concepts with cyan theme -->
              <div class="bg-slate-800 rounded-xl p-8 border-l-4" 
                   style="border-left-color: var(--brand-cyan);">
                <h3 class="text-2xl font-semibold mb-4" style="color: var(--brand-cyan);">
                  {item.term}
                </h3>
                
                <p class="text-slate-300 leading-relaxed mb-4">
                  {item.definition}
                </p>
                
                {#if item.example}
                  <div class="bg-slate-900 rounded-lg p-4 border-l-4" style="border-left-color: var(--brand-cyan);">
                    <p class="text-cyan-200 text-sm font-medium mb-1">Example:</p>
                    <p class="text-slate-300 italic">"{item.example}"</p>
                  </div>
                {/if}
              </div>
            {:else if category.category === "Our Strategic Advantage"}
              <!-- Strategic Advantage with blue theme -->
              <div class="bg-slate-800 rounded-xl p-8 border-l-4" 
                   style="border-left-color: var(--brand-blue);">
                <h3 class="text-2xl font-semibold mb-4" style="color: var(--brand-blue);">
                  {item.term}
                </h3>
                
                <p class="text-slate-300 leading-relaxed mb-4">
                  {item.definition}
                </p>
                
                {#if item.example}
                  <div class="bg-slate-900 rounded-lg p-4 border-l-4" style="border-left-color: var(--brand-blue);">
                    <p class="text-blue-200 text-sm font-medium mb-1">Example:</p>
                    <p class="text-slate-300 italic">"{item.example}"</p>
                  </div>
                {/if}
              </div>
            {:else}
              <!-- Default styling for other categories -->
              <div class="bg-slate-800 rounded-lg p-8">
                <h3 class="text-2xl font-semibold mb-4 text-cyan-400">
                  {item.term}
                </h3>
                
                <p class="text-slate-300 leading-relaxed mb-4">
                  {item.definition}
                </p>
                
                {#if item.example}
                  <div class="bg-slate-700 rounded-lg p-4 border-l-4 border-orange-500">
                    <p class="text-orange-200 text-sm font-medium mb-1">Example:</p>
                    <p class="text-slate-300 italic">"{item.example}"</p>
                  </div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      </section>
    {/each}
    
    <!-- Call to Action -->
    <div class="text-center bg-gradient-to-r from-blue-900 to-slate-900 rounded-lg p-12 mt-16">
      <h2 class="text-3xl font-bold mb-6 text-white">Ready to Explore?</h2>
      <p class="text-xl text-slate-300 mb-8 leading-relaxed">
        See these concepts in action across our platform.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a 
          href="/tools" 
          class="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Try Tools
        </a>
        <a 
          href="/briefings" 
          class="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Read Briefings
        </a>
        <a 
          href="/deep-dive/the-convergent-economy" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Deep Dive
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Brand Colors */
  :root {
    --brand-orange: #FF914D;
    --brand-cyan: #0CC0DF;
    --brand-blue: #004AAE;
  }

  /* Highlight flash animation for clicked pillars */
  :global(.highlight-flash) {
    animation: highlightFlash 2s ease-out;
  }
  
  @keyframes highlightFlash {
    0% { 
      background-color: rgba(59, 130, 246, 0.3);
      transform: scale(1.02);
    }
    50% { 
      background-color: rgba(59, 130, 246, 0.1);
    }
    100% { 
      background-color: transparent;
      transform: scale(1);
    }
  }
</style>
