<!-- src/pages/InvestPage.svelte -->
<script>
  import { onMount } from 'svelte';
  import InvestorModal from '../components/InvestorModal.svelte';
  
  let showModal = false;
  
  onMount(() => {
    // Ensure professional focus
    document.title = "Investment Opportunity | theBlockchain.ai";
    // Auto-open modal for direct investor interest capture
    showModal = true;
  });
  
  function openInvestorModal() {
    showModal = true;
  }
</script>

<!-- Investment Landing -->
<div class="invest-landing">
  <div class="max-w-4xl mx-auto px-6 py-24 text-center">
    <h1 class="invest-title">Investment Opportunity</h1>
    <p class="invest-subtitle">All code on blockchain. Every transaction. All Smart Contracts. Zero fraud, devs get paid. Trusted AI from theBlockchain.ai - the Authority in Open-Source matters on the BC.</p>
    
    <div class="investment-highlights">
      <div class="highlight">
        <span class="highlight-number">Zero</span>
        <span class="highlight-label">Fraud</span>
      </div>
      <div class="highlight">
        <span class="highlight-number">BC</span>
        <span class="highlight-label">Authority</span>
      </div>
      <div class="highlight">
        <span class="highlight-number">100%</span>
        <span class="highlight-label">Trusted AI</span>
      </div>
    </div>
    
    <div class="cta-section">
      <h2>Join Leading Investors</h2>
      <p>Building the future of trusted AI requires visionary capital partners.</p>
      <button class="investor-cta" on:click={openInvestorModal}>
        Express Investment Interest
      </button>
      <p class="disclaimer">Available to accredited investors only</p>
    </div>
  </div>
</div>

<!-- Investor Modal -->
<InvestorModal bind:isOpen={showModal} />

<style lang="postcss">
  .invest-landing {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    display: flex;
    align-items: center;
    padding-top: 5rem; /* Account for fixed header */
  }

  .invest-title {
    font-size: 3.5rem;
    font-weight: 800;
    color: white;
    margin-bottom: 1.5rem;
    letter-spacing: -0.025em;
  }

  .invest-subtitle {
    font-size: 1.375rem;
    color: #cbd5e1;
    margin-bottom: 4rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  .investment-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto 4rem auto;
  }

  .highlight {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .highlight-number {
    display: block;
    font-size: 3rem;
    font-weight: 800;
    color: #0CC0DF;
    margin-bottom: 0.5rem;
  }

  .highlight-label {
    font-size: 1rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  .cta-section {
    margin-top: 4rem;
  }

  .cta-section h2 {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }

  .cta-section p {
    font-size: 1.125rem;
    color: #cbd5e1;
    margin-bottom: 2rem;
  }

  .investor-cta {
    background: linear-gradient(135deg, #0CC0DF 0%, #0891b2 100%);
    color: white;
    padding: 1.25rem 3rem;
    border-radius: 0.75rem;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.125rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(12, 192, 223, 0.3);
  }

  .investor-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(12, 192, 223, 0.4);
  }

  .disclaimer {
    font-size: 0.875rem;
    color: #64748b;
    font-style: italic;
    margin-top: 1.5rem;
  }

  @media (max-width: 768px) {
    .invest-title {
      font-size: 2.5rem;
    }
    
    .invest-subtitle {
      font-size: 1.125rem;
    }
    
    .investment-highlights {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .investor-cta {
      padding: 1rem 2rem;
      font-size: 1rem;
    }
  }
</style>