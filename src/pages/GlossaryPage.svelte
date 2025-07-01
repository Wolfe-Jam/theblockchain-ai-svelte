<!-- src/pages/GlossaryPage.svelte -->
<script>
  import { onMount } from 'svelte';
  
  // Glossary terms organized by category
  const glossaryTerms = [
    {
      category: "The 3 Strategic Pillars",
      terms: [
        {
          term: "🌐 The OUTPUT Marketplace",
          definition: "A vibrant, decentralized ecosystem for discovering and deploying trusted AI automation modules. The marketplace where developers monetize their contributions and enterprises find proven solutions.",
          example: "The OUTPUT marketplace transforms your code into tradable, revenue-generating assets."
        },
        {
          term: "⚙️ Code-In-Action (CIA)",
          definition: "Custom, intelligent automation solutions that leverage marketplace modules to solve high-value enterprise problems. The bridge between static code and dynamic capital.",
          example: "CIA solutions turn your development work into scalable business automation."
        },
        {
          term: "🛡️ theBlockchain",
          definition: "The foundational layer of verifiable trust that underpins the entire ecosystem, ensuring IP protection, transparent monetization, and immutable proof of ownership.",
          example: "theBlockchain provides cryptographic proof of your contributions and automates royalty distribution."
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
          term: "The Convergent Economy",
          definition: "The multi-trillion dollar economic frontier emerging from the intersection of AI, Software, and Blockchain technologies, where tokenizing unlocks unprecedented value.",
          example: "The convergent economy transforms developers from coders into capitalists."
        },
        {
          term: "Smart Contracts",
          definition: "Self-executing contracts with terms directly written into code, enabling automated royalties, verifiable IP protection, and transparent monetization without intermediaries.",
          example: "Smart contracts embed your payment terms directly into your code."
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
    
    {#each glossaryTerms as category}
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center text-slate-200">
          {category.category}
        </h2>
        
        <div class="space-y-8">
          {#each category.terms as item}
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
          href="/briefings" 
          class="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Read Briefings
        </a>
        <a 
          href="/tools" 
          class="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Try Tools
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
