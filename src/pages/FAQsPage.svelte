<!-- src/pages/FAQsPage.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let showModal = false;
  let modalTitle = '';
  let modalContent = '';
  let userQuestion = '';
  let isLoading = false;
  
  onMount(() => {
    document.title = "TheBlockchain.ai - FAQs";
  });
  
  function closeModal() {
    showModal = false;
    userQuestion = '';
    modalContent = '';
  }
  
  function openAskAI() {
    modalTitle = "Ask AI a Question";
    modalContent = '';
    showModal = true;
  }
  
  async function submitQuestion() {
    if (!userQuestion.trim()) {
      modalContent = '<p style="color:var(--brand-orange)">Please enter a question.</p>';
      return;
    }
    
    modalTitle = `AI Insights for: "${userQuestion}"`;
    modalContent = '';
    isLoading = true;
    
    const netlifyFunctionUrl = '/.netlify/functions/ask-ai';
    
    try {
      const response = await fetch(netlifyFunctionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuestion: userQuestion })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error (${response.status}): ${errorData.message || 'Unknown error'}`);
      }
      
      const result = await response.json();
      
      if (result.answer) {
        modalContent = result.answer.replace(/\n/g, '<br>');
      } else {
        modalContent = '<p style="color:var(--brand-orange)">Error: No answer received from AI. Please try a different question.</p>';
      }
    } catch (error) {
      modalContent = `<p style="color:var(--brand-orange)">Error: ${error.message}. Please check your Netlify function logs.</p>`;
    } finally {
      isLoading = false;
    }
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
  function toggleAccordion(event) {
    const header = event.currentTarget;
    const accordionItem = header.parentElement;
    const wasActive = accordionItem.classList.contains('active');
    
    // Close all other accordions
    document.querySelectorAll('.faq-accordion-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // If it wasn't active, open the clicked one
    if (!wasActive) {
      accordionItem.classList.add('active');
    }
  }
</script>

<main class="container">
  <section class="faq-section">
    <h1 class="page-title">Frequently Asked Questions</h1>

    <div class="faq-container">
      
      <!-- Group: General & Core Vision -->
      <div class="faq-group group-general">
        <h2 class="faq-group-title">General & Core Vision</h2>
        
        <!-- FAQ Item 1 - Active by default -->
        <div class="faq-accordion-item active">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>1. What is the core mission of theBlockchain.ai?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>The core mission of theBlockchain.ai is to build the economic layer for open-source and trusted AI, fostering a transparent, secure, and collaborative ecosystem where AI's true potential is unlocked on the blockchain. We aim for a Win/Win/Win for developers, businesses, and data owners.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Item 2 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>2. How does theBlockchain.ai ensure trust in AI models and data?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>theBlockchain.ai ensures trust through the integration of blockchain technology, which provides verifiable provenance, immutability, transparency, and auditability for AI models, their lifecycle, and data usage. This creates an unchangeable record that mitigates risks and builds confidence.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Item 7 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>7. How does theBlockchain.ai address challenges like data silos and "black box" AI models?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>theBlockchain.ai addresses data silos by enabling secure federated learning, allowing collaborative intelligence without centralized data pooling. It tackles "black box" AI concerns by providing verifiable and auditable AI through blockchain's immutable records, ensuring transparency of model provenance and usage.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Item 9 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>9. What is Federated Learning and how does it relate to theBlockchain.ai?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>Federated Learning is a machine learning technique that trains algorithms across multiple decentralized edge devices or servers, keeping data local and private. theBlockchain.ai incorporates Secure Federated Learning as part of its core vision to enable collaborative AI development while guaranteeing privacy and data security.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Item 10 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>10. How is theBlockchain.ai positioned competitively against existing AI or blockchain platforms?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>theBlockchain.ai establishes an unassailable strategic position by uniquely integrating blockchain's trust and auditability with a dynamic AI marketplace and custom automation solutions. This convergence creates powerful network effects, a data advantage, and high barriers to entry that differentiate it from fragmented centralized AI platforms and general blockchain solutions.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Group: For Developers -->
      <div class="faq-group group-devs">
        <h2 class="faq-group-title">For Developers</h2>
        
        <!-- FAQ Item 4 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>4. How do developers get paid for their code on your platform?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>Developers get paid directly for their code "OUTPUT" through automated smart contracts on the platform. This ensures fair and prompt compensation as their AI modules are utilized, eliminating intermediaries.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Item 8 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>8. Is the intellectual property (IP) of AI models protected on the platform?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>Yes, robust IP protection mechanisms are a core feature. Blockchain technology provides an indelible, timestamped record of authorship for software and digital assets, and smart contracts facilitate secure intellectual property management, including copyrights and automated licensing.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Group: For Businesses & Commerce -->
      <div class="faq-group group-commerce">
        <h2 class="faq-group-title">For Businesses & Commerce</h2>
        
        <!-- FAQ Item 3 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>3. What is 'The OUTPUT Marketplace' and who is it for?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>'The OUTPUT Marketplace' is a unified developer marketplace designed to foster a vibrant AI ecosystem. It's for developers to efficiently publish and monetize their AI automation modules, and for businesses and researchers to easily discover, evaluate, and integrate trustworthy AI solutions.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Item 5 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>5. What are 'Code-In-Action (CIA)' solutions?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>'Code-In-Action (CIA)' refers to our A La Carte model for <strong>C</strong>ustom, <strong>I</strong>ntelligent <strong>A</strong>utomation (CIA). These solutions leverage vetted modules available from The OUTPUT Marketplace to address specific and complex business needs.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Group: For Token & Investors -->
      <div class="faq-group group-token-investors">
        <h2 class="faq-group-title">For Token & Investors</h2>
        
        <!-- FAQ Item 6 -->
        <div class="faq-accordion-item">
          <div class="faq-accordion-header" on:click={toggleAccordion}>
            <h3>6. How does the $BAI Token fit into the ecosystem?</h3>
            <i class="fas fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-accordion-content">
            <div class="content-wrapper">
              <p>The $BAI Token is the native token that underpins the entire economic ecosystem of theBlockchain.ai. It is designed to be used for transactions, staking, and governance within The OUTPUT Marketplace, creating a deep economic moat.</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Ask AI Button -->
    <div class="ask-ai-section">
      <button class="ask-ai-button" on:click={openAskAI}>
        Ask AI about FAQs
      </button>
    </div>

  </section>
</main>

<!-- AI Modal -->
{#if showModal}
  <div class="modal" on:click={handleBackdropClick}>
    <div class="modal-content">
      <button class="close-button" on:click={closeModal}>&times;</button>
      
      <h3 class="modal-title">{modalTitle}</h3>
      
      {#if !modalContent}
        <div class="question-input">
          <textarea 
            bind:value={userQuestion}
            rows="3" 
            class="question-textarea"
            placeholder="Type your question about the FAQs or anything else..."
          ></textarea>
          <button class="submit-button" on:click={submitQuestion}>Submit Question</button>
        </div>
      {/if}
      
      {#if isLoading}
        <div class="loading-spinner"></div>
      {/if}
      
      {#if modalContent}
        <div class="modal-response">
          {@html modalContent}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="postcss">
  :root {
    --brand-orange: #FF914D;
    --brand-cyan: #0CC0DF;
    --brand-blue: #004AAE;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    padding-top: 6rem;
  }

  .faq-section {
    margin: 2rem 0;
  }

  .page-title {
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--brand-cyan);
  }

  .faq-container {
    max-width: 48rem;
    margin: 0 auto;
  }

  /* FAQ Group Styles */
  .faq-group {
    margin-bottom: 2rem;
  }

  .faq-group-title {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .group-general .faq-group-title {
    color: var(--brand-blue);
  }

  .group-devs .faq-group-title {
    color: var(--brand-orange);
  }

  .group-commerce .faq-group-title {
    color: var(--brand-cyan);
  }

  .group-token-investors .faq-group-title {
    color: var(--brand-blue);
  }

  /* Accordion Styles */
  .faq-accordion-item {
    background-color: #1E293B;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    overflow: hidden;
    border: 1px solid rgba(51, 65, 85, 0.5);
    border-left-width: 4px;
    transition: all 0.3s ease;
  }

  .group-general .faq-accordion-item {
    border-left-color: var(--brand-blue);
  }

  .group-devs .faq-accordion-item {
    border-left-color: var(--brand-orange);
  }

  .group-commerce .faq-accordion-item {
    border-left-color: var(--brand-cyan);
  }

  .group-token-investors .faq-accordion-item {
    border-left-color: var(--brand-blue);
  }

  .faq-accordion-header {
    padding: 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-weight: 600;
    background-color: #1E293B;
    transition: background-color 0.3s ease;
  }

  .faq-accordion-header:hover {
    background-color: rgba(30, 41, 59, 0.8);
  }

  .faq-accordion-header h3 {
    font-size: 1.25rem;
    margin: 0;
    color: #F8FAFC;
    line-height: 1.4;
  }

  .faq-accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out, padding 0.5s ease-out;
    padding: 0 1.5rem;
    background-color: #0F172A;
    color: #CBD5E1;
  }

  .content-wrapper {
    padding: 1.5rem 0;
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .content-wrapper p {
    margin: 0;
  }

  /* Active State */
  :global(.faq-accordion-item.active) .faq-accordion-content {
    max-height: 500px;
    padding-bottom: 1.5rem;
  }

  :global(.faq-accordion-item.active) .faq-icon {
    transform: rotate(180deg);
  }

  .faq-icon {
    transition: transform 0.3s ease;
    color: #94a3b8;
  }

  /* Ask AI Section */
  .ask-ai-section {
    display: flex;
    justify-content: center;
    margin: 4rem 0 2rem 0;
  }

  .ask-ai-button {
    background-color: var(--brand-blue);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
  }

  .ask-ai-button:hover {
    filter: brightness(1.2);
    transform: translateY(-1px);
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background-color: #1E293B;
    color: #F8FAFC;
    padding: 2rem;
    border-radius: 0.75rem;
    width: 90%;
    max-width: 700px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 16px rgba(0,0,0,0.4);
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #CBD5E1;
    font-size: 1.75rem;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .close-button:hover {
    color: #F8FAFC;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--brand-cyan);
    margin-bottom: 1.5rem;
    padding-right: 2rem;
  }

  .question-input {
    margin-bottom: 1rem;
  }

  .question-textarea {
    width: 100%;
    padding: 0.75rem;
    background-color: #374151;
    border: 1px solid #4b5563;
    border-radius: 0.375rem;
    color: white;
    resize: vertical;
    font-family: inherit;
  }

  .question-textarea::placeholder {
    color: #9ca3af;
  }

  .question-textarea:focus {
    outline: none;
    border-color: var(--brand-cyan);
  }

  .submit-button {
    background-color: var(--brand-cyan);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: all 0.3s ease;
  }

  .submit-button:hover {
    filter: brightness(1.1);
  }

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--brand-cyan);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin: 2rem auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .modal-response {
    margin-top: 1.5rem;
    line-height: 1.6;
    color: #cbd5e1;
  }

  @media (max-width: 768px) {
    .page-title {
      font-size: 2.5rem;
    }

    .faq-group-title {
      font-size: 1.875rem;
    }

    .faq-accordion-header h3 {
      font-size: 1.125rem;
    }

    .container {
      padding: 1rem;
      padding-top: 5rem;
    }

    .faq-container {
      max-width: none;
    }
  }
</style>