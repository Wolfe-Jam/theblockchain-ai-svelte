<!-- FAQsPage.svelte -->
<script>
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  let activeAccordion = 'faq1'; // First FAQ open by default
  let showModal = false;
  let modalTitle = '';
  let modalContent = '';
  let aiQuestion = '';
  let isLoading = false;
  
  function toggleAccordion(id) {
    activeAccordion = activeAccordion === id ? null : id;
  }
  
  function openAiModal() {
    showModal = true;
    modalTitle = "Ask AI a Question";
    modalContent = '';
    aiQuestion = '';
  }
  
  function closeModal() {
    showModal = false;
    aiQuestion = '';
    modalContent = '';
    isLoading = false;
  }
  
  async function submitAiQuestion() {
    if (!aiQuestion.trim()) {
      modalContent = '<p style="color:var(--brand-orange)">Please enter a question.</p>';
      return;
    }
    
    modalTitle = `AI Insights for: "${aiQuestion}"`;
    modalContent = '';
    isLoading = true;
    
    try {
      const response = await fetch('/.netlify/functions/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuestion: aiQuestion })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error (${response.status}): ${errorData.message || 'Unknown error'}`);
      }
      
      const result = await response.json();
      modalContent = result.answer ? result.answer.replace(/\n/g, '<br>') : 
        '<p style="color:var(--brand-orange)">Error: No answer received from AI. Please try a different question.</p>';
    } catch (error) {
      modalContent = `<p style="color:var(--brand-orange)">Error: ${error.message}. Please check your Netlify function logs.</p>`;
    } finally {
      isLoading = false;
    }
  }
</script>

<main class="container mx-auto p-8 md:p-16 pt-20">
  <section class="my-16">
    <h1 class="text-4xl md:text-5xl font-extrabold text-center mb-12" style="color: var(--brand-cyan);">
      Frequently Asked Questions
    </h1>

    <div class="max-w-3xl mx-auto">
      <!-- Group: General & Core Vision -->
      <div class="faq-group group-general mb-8">
        <h2 class="faq-group-title text-2xl font-bold mb-6 text-center" style="color: var(--brand-blue-text);">
          General & Core Vision
        </h2>
        
        <!-- FAQ Item 1 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-blue);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq1')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq1')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">What is the core mission of theBlockchain.ai?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq1'}></i>
          </div>
          {#if activeAccordion === 'faq1'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                The core mission of theBlockchain.ai is to build the economic layer for open-source and trusted AI, 
                fostering a transparent, secure, and collaborative ecosystem where AI's true potential is unlocked on 
                the blockchain. We aim for a Win/Win/Win for developers, businesses, and data owners.
              </p>
            </div>
          {/if}
        </div>

        <!-- FAQ Item 2 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-blue);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq2')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq2')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">How does theBlockchain.ai ensure trust in AI models and data?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq2'}></i>
          </div>
          {#if activeAccordion === 'faq2'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                theBlockchain.ai ensures trust through the integration of blockchain technology, which provides verifiable 
                provenance, immutability, transparency, and auditability for AI models, their lifecycle, and data usage. 
                This creates an unchangeable record that mitigates risks and builds confidence.
              </p>
            </div>
          {/if}
        </div>

        <!-- FAQ Item 7 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-blue);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq7')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq7')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">How does theBlockchain.ai address challenges like data silos and "black box" AI models?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq7'}></i>
          </div>
          {#if activeAccordion === 'faq7'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                theBlockchain.ai addresses data silos by enabling secure federated learning, allowing collaborative 
                intelligence without centralized data pooling. It tackles "black box" AI concerns by providing verifiable 
                and auditable AI through blockchain's immutable records, ensuring transparency of model provenance and usage.
              </p>
            </div>
          {/if}
        </div>

        <!-- FAQ Item 9 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-blue);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq9')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq9')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">What is Federated Learning and how does it relate to theBlockchain.ai?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq9'}></i>
          </div>
          {#if activeAccordion === 'faq9'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                Federated Learning is a machine learning technique that trains algorithms across multiple decentralized 
                edge devices or servers, keeping data local and private. theBlockchain.ai incorporates Secure Federated 
                Learning as part of its core vision to enable collaborative AI development while guaranteeing privacy and data security.
              </p>
            </div>
          {/if}
        </div>

        <!-- FAQ Item 10 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-blue);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq10')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq10')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">How is theBlockchain.ai positioned competitively against existing AI or blockchain platforms?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq10'}></i>
          </div>
          {#if activeAccordion === 'faq10'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                theBlockchain.ai establishes an unassailable strategic position by uniquely integrating blockchain's trust 
                and auditability with a dynamic AI marketplace and custom automation solutions. This convergence creates 
                powerful network effects, a data advantage, and high barriers to entry that differentiate it from fragmented 
                centralized AI platforms and general blockchain solutions.
              </p>
            </div>
          {/if}
        </div>
        
        <!-- Additional FAQ items would continue here... -->
      </div>

      <!-- Group: For Developers -->
      <div class="faq-group group-devs mb-8 mt-12">
        <h2 class="faq-group-title text-2xl font-bold mb-6 text-center" style="color: var(--brand-orange);">
          For Developers
        </h2>
        
        <!-- FAQ Item 4 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-orange);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq4')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq4')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">How do developers get paid for their code on your platform?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq4'}></i>
          </div>
          {#if activeAccordion === 'faq4'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                Developers get paid directly for their code "OUTPUT" through automated smart contracts on the platform. 
                This ensures fair and prompt compensation as their AI modules are utilized, eliminating intermediaries.
              </p>
            </div>
          {/if}
        </div>

        <!-- FAQ Item 8 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-orange);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq8')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq8')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">Is the intellectual property (IP) of AI models protected on the platform?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq8'}></i>
          </div>
          {#if activeAccordion === 'faq8'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                Yes, robust IP protection mechanisms are a core feature. Blockchain technology provides an indelible, 
                timestamped record of authorship for software and digital assets, and smart contracts facilitate secure 
                intellectual property management, including copyrights and automated licensing.
              </p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Group: For Businesses & Commerce -->
      <div class="faq-group group-commerce mb-8 mt-12">
        <h2 class="faq-group-title text-2xl font-bold mb-6 text-center" style="color: var(--brand-cyan);">
          For Businesses & Commerce
        </h2>
        
        <!-- FAQ Item 3 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-cyan);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq3')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq3')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">What is 'The OUTPUT Marketplace' and who is it for?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq3'}></i>
          </div>
          {#if activeAccordion === 'faq3'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                'The OUTPUT Marketplace' is a unified developer marketplace designed to foster a vibrant AI ecosystem. 
                It's for developers to efficiently publish and monetize their AI automation modules, and for businesses 
                and researchers to easily discover, evaluate, and integrate trustworthy AI solutions.
              </p>
            </div>
          {/if}
        </div>

        <!-- FAQ Item 5 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-cyan);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq5')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq5')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">What are 'Code-In-Action (CIA)' solutions?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq5'}></i>
          </div>
          {#if activeAccordion === 'faq5'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                'Code-In-Action (CIA)' refers to our A La Carte model for <strong>C</strong>ustom, <strong>I</strong>ntelligent 
                <strong>A</strong>utomation (CIA). These solutions leverage vetted modules available from The OUTPUT Marketplace 
                to address specific and complex business needs.
              </p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Group: For Token & Investors -->
      <div class="faq-group group-token-investors mb-8 mt-12">
        <h2 class="faq-group-title text-2xl font-bold mb-6 text-center" style="color: var(--brand-blue-text);">
          For Token & Investors
        </h2>
        
        <!-- FAQ Item 6 -->
        <div class="faq-accordion-item mb-4 bg-slate-800 rounded-xl border-l-4" style="border-left-color: var(--brand-blue);">
          <div class="faq-accordion-header p-6 cursor-pointer flex justify-between items-center" 
               on:click={() => toggleAccordion('faq6')}
               on:keydown={(e) => e.key === 'Enter' && toggleAccordion('faq6')}
               role="button"
               tabindex="0">
            <h3 class="text-lg font-semibold text-white">How does the $BAI Token fit into the ecosystem?</h3>
            <i class="fas fa-chevron-down transition-transform duration-300" 
               class:rotate-180={activeAccordion === 'faq6'}></i>
          </div>
          {#if activeAccordion === 'faq6'}
            <div class="faq-accordion-content bg-slate-900 p-6" 
                 in:fly="{{ y: -20, duration: 400, easing: quintOut }}" 
                 out:fly="{{ y: -20, duration: 300 }}">
              <p class="text-slate-300 leading-relaxed">
                The $BAI Token is the native token that underpins the entire economic ecosystem of theBlockchain.ai. 
                It is designed to be used for transactions, staking, and governance within The OUTPUT Marketplace, 
                creating a deep economic moat.
              </p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Ask AI Button -->
      <div class="flex justify-center mt-16 mb-8">
        <button class="btn-base btn-accent px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                on:click={openAiModal}>
          Ask AI about FAQs
        </button>
      </div>
    </div>
  </section>
</main>

<!-- AI Modal -->
{#if showModal}
  <div class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" 
       in:fade="{{ duration: 300 }}" 
       out:fade="{{ duration: 200 }}"
       on:click={closeModal}
       role="dialog"
       aria-modal="true">
    <div class="modal-content bg-slate-800 p-6 rounded-xl max-w-2xl w-11/12 shadow-2xl" 
         on:click|stopPropagation>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold" style="color: var(--brand-cyan);">{modalTitle}</h3>
        <button class="text-slate-400 hover:text-white text-2xl" on:click={closeModal}>&times;</button>
      </div>
      
      {#if !isLoading && !modalContent}
        <div class="mb-4">
          <textarea 
            bind:value={aiQuestion}
            rows="3" 
            class="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500" 
            placeholder="Type your question about the FAQs or anything else...">
          </textarea>
          <button class="mt-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors" 
                  on:click={submitAiQuestion}>
            Submit Question
          </button>
        </div>
      {/if}
      
      {#if isLoading}
        <div class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      {/if}
      
      {#if modalContent}
        <div class="prose prose-slate prose-invert">
          {@html modalContent}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .btn-base {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: background-color 0.3s, color 0.3s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
  }
  
  .faq-group-title {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
  }
</style>
