<!-- src/pages/BriefingsPage.svelte -->
<script>
  import { onMount } from 'svelte';
  
  // Future: This will be populated from a data source
  const briefings = [
    {
      id: 1,
      title: "An Introduction to the Convergent Economy",
      date: "July 1, 2025",
      summary: "A new multi-trillion dollar frontier is emerging from the intersection of AI, Software, and Blockchain. This inaugural briefing explores how tokenizing is the key to unlocking unprecedented value in the convergent economy.",
      readTime: "8 min read",
      deepDiveLink: "/deep-dive/the-convergent-economy",
      featured: true,
      sections: [
        {
          heading: "Market Size & Growth Trajectory",
          content: "The convergent economy represents a multi-trillion dollar opportunity. AI markets are projected to reach $1.8T by 2030, software continues its $650B+ growth, while blockchain shows exponential CAGR of 67%. The intersection creates premium 'Trustworthy AI' markets commanding 3-5x traditional valuations."
        },
        {
          heading: "The Trust Premium",
          content: "Enterprises pay significant premiums for AI solutions with verifiable provenance. Blockchain-verified AI models command 300-500% higher prices than traditional alternatives. This trust premium creates immediate monetization opportunities for developers who tokenize their contributions."
        },
        {
          heading: "Developer Economics Transformation",
          content: "Traditional open-source models leave developers unpaid for value creation. Smart contracts embedded with automated royalties transform this dynamic - enabling developers to earn from every use of their code while maintaining open collaboration benefits."
        },
        {
          heading: "Strategic Positioning",
          content: "theBlockchain.ai's 3 Pillars strategy positions us at the convergence point: The OUTPUT Marketplace captures value creation, Code-In-Action delivers enterprise solutions, and theBlockchain provides the trust infrastructure that makes it all possible."
        }
      ]
    }
    // Future briefings will be added here
  ];
  
  // Track which briefing accordion is open
  let openBriefing = null;
  let openBriefingMain = 1; // Default to first briefing open since we're low on content
  
  function toggleBriefing(briefingId) {
    openBriefing = openBriefing === briefingId ? null : briefingId;
  }
  
  function toggleMainBriefing(briefingId) {
    openBriefingMain = openBriefingMain === briefingId ? null : briefingId;
    // Close section accordions when main briefing closes
    if (openBriefingMain !== briefingId) {
      openBriefing = null;
    }
  }
</script>

<div class="min-h-screen bg-slate-900 text-white">
  <!-- Hero Section -->
  <div class="relative bg-gradient-to-br from-cyan-900 via-slate-800 to-slate-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative max-w-6xl mx-auto px-6 py-24">
      <div class="text-center">
        <h1 class="text-5xl font-bold mb-6 text-cyan-400">
          Briefings
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Strategic insights and analysis on the convergent economy.<br>
          Concise, actionable intelligence for decision-makers.
        </p>
      </div>
    </div>
  </div>

  <!-- Briefings List -->
  <div class="max-w-4xl mx-auto px-6 py-16">
    {#each briefings as briefing}
      <article class="mb-6 last:mb-0">
        <div class="bg-slate-800 rounded-lg overflow-hidden {briefing.featured ? 'ring-2 ring-cyan-400' : ''}">
          
          <!-- Main Briefing Header - Always Visible -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            class="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-750 transition-colors duration-200"
            on:click={() => toggleMainBriefing(briefing.id)}
          >
            <div class="flex-1">
              {#if briefing.featured}
                <div class="flex items-center gap-2 mb-3">
                  <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <span class="bg-cyan-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Inaugural Briefing
                  </span>
                </div>
              {/if}
              
              <h2 class="text-2xl font-bold text-white mb-2">
                Briefing #{briefing.id}: {briefing.title}
              </h2>
              <div class="flex items-center gap-4 text-slate-400 text-sm">
                <span>{briefing.date}</span>
                <span>•</span>
                <span>{briefing.readTime}</span>
              </div>
            </div>
            
            <svg 
              class="w-6 h-6 text-slate-400 transform transition-transform duration-200 {openBriefingMain === briefing.id ? 'rotate-180' : ''}"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          
          <!-- Expanded Briefing Content -->
          {#if openBriefingMain === briefing.id}
            <div class="px-6 pb-6 border-t border-slate-700">
              <p class="text-slate-300 leading-relaxed mb-6 mt-4">
                {briefing.summary}
              </p>
              
              <!-- Accordion Sections -->
              {#if briefing.sections}
                <div class="space-y-3 mb-6">
                  {#each briefing.sections as section, index}
                    <div class="border border-slate-600 rounded-lg overflow-hidden">
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <!-- svelte-ignore a11y-no-static-element-interactions -->
                      <div 
                        class="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-650 cursor-pointer transition-colors duration-200"
                        on:click={() => toggleBriefing(`${briefing.id}-${index}`)}
                      >
                        <h4 class="text-lg font-semibold text-cyan-400">{section.heading}</h4>
                        <svg 
                          class="w-5 h-5 text-slate-400 transform transition-transform duration-200 {openBriefing === `${briefing.id}-${index}` ? 'rotate-180' : ''}"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                      
                      {#if openBriefing === `${briefing.id}-${index}`}
                        <div class="p-4 bg-slate-800 border-t border-slate-600">
                          <p class="text-slate-300 leading-relaxed">{section.content}</p>
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
              {/if}
              
              <!-- Action Buttons -->
              <div class="flex items-center justify-between">
                <a 
                  href={briefing.deepDiveLink}
                  class="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Read the Full Deep Dive
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
                
                <div class="text-slate-400 text-sm">
                  Full analysis available in Deep Dives section
                </div>
              </div>
            </div>
          {/if}
        </div>
      </article>
    {/each}
    
    <!-- Coming Soon -->
    <div class="text-center py-12">
      <div class="bg-slate-800 rounded-lg p-8 border-2 border-dashed border-slate-600">
        <h3 class="text-xl font-semibold text-slate-400 mb-2">More Briefings Coming Soon</h3>
        <p class="text-slate-500">
          Stay tuned for regular strategic insights and market analysis.
        </p>
      </div>
    </div>
  </div>
</div>
