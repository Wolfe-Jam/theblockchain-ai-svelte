<!-- src/pages/VisionPage.svelte -->
<script>
  import { onMount } from 'svelte';
  import InvestorModal from '../components/InvestorModal.svelte';
  
  let showInvestorModal = false;
  
  onMount(() => {
    document.title = "The Future of Open Source is Trusted AI | theBlockchain.ai";
  });
  
  function openInvestorModal() {
    showInvestorModal = true;
  }
</script>

<!-- Vision Hero -->
<div class="vision-hero">
  <div class="container">
    <h2>Where Open Source meets Trusted AI<br>- the Win/Win/Win</h2>
    <p>A transparent, secure, and collaborative ecosystem where<br>AI's true potential is unlocked on the blockchain.</p>
  </div>
</div>

<!-- Marketplace Section -->
<section class="vision-section">
  <div class="container">
    <h2 class="section-title">A Decentralized Marketplace for AI</h2>
    <div class="feature-grid">
      <div class="feature-card card-red">
        <div class="icon-container"><i class="fa-solid fa-code icon-red"></i></div>
        <h3>For Developers</h3>
        <p><strong>Value:</strong> Direct monetization and control over your intellectual property.</p>
        <p><strong>Benefit:</strong> Set your own prices and automate payments with smart contracts.</p>
        <span class="usp">"Your AI, your rules, your revenue."</span>
      </div>
      <div class="feature-card card-green">
        <div class="icon-container"><i class="fa-solid fa-chart-line icon-green"></i></div>
        <h3>For Commerce</h3>
        <p><strong>Value:</strong> Access a diverse and validated pool of AI Automation and talented resources.</p>
        <p><strong>Benefit:</strong> Acquire trustworthy AI models with clear performance history.</p>
        <span class="usp">"Trustworthy AI Automation<br>on-demand."</span>
      </div>
      <div class="feature-card card-blue data-owners-card">
        <div class="icon-container"><i class="fa-solid fa-database icon-blue"></i></div>
        <h3>For Data Owners</h3>
        <p><strong>Value:</strong> Monetize your data securely and with guaranteed privacy.</p>
        <p><strong>Benefit:</strong> Earn passive income while your data remains private.</p>
        <span class="usp">"Monetize your data without compromising it."</span>
      </div>
    </div>
  </div>
</section>

<!-- Core Vision Section -->
<section class="vision-section">
  <div class="container">
    <h2 class="section-title">The Core Vision</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="icon-container"><i class="fa-solid fa-file-contract" style="color: #004AAE;"></i></div>
        <h3>Verifiable & Auditable AI</h3>
        <p>Establish the gold standard for ethical AI with an unchangeable record of any model's lifecycle.</p>
      </div>
      <div class="feature-card">
        <div class="icon-container"><i class="fa-solid fa-share-nodes" style="color: #0CC0DF;"></i></div>
        <h3>Secure Federated Learning</h3>
        <p>Enable collaborative intelligence without centralized data pooling to build powerful models.</p>
      </div>
    </div>
  </div>
</section>

<!-- Roadmap Section -->
<section class="vision-section">
  <div class="container">
    <h2 class="section-title">Public Roadmap</h2>
    <div class="rollout-timeline">
      <div class="rollout-phase card-red">
        <h4>Phase 1: Foundation</h4>
        <p>Launch the core platform in a controlled environment with vetted developers to prove the technology.</p>
      </div>
      <div class="rollout-phase card-green">
        <h4>Phase 2: Growth</h4>
        <p>Open the platform to the public, launch transaction fees, and begin wider marketing.</p>
      </div>
      <div class="rollout-phase card-blue">
        <h4>Phase 3: Ecosystem</h4>
        <p>Introduce the governance token and launch the full data marketplace to scale and decentralize.</p>
      </div>
    </div>
  </div>
</section>

<!-- Investors Section -->
<section class="vision-section investors-section">
  <div class="container">
    <h2 class="section-title investors-title">For Our Future Partners & Investors</h2>
    
    <h3 class="opportunity-header">The Opportunity: A Broken, Centralized AI Market</h3>
    <p class="opportunity-desc">The rapid growth of AI is built on a fragile foundation, presenting a massive market opportunity for a decentralized alternative.</p>
    
    <div class="vertical-container">
      <div class="problem-box card-red">
        <p><span class="problem-red">CRITICAL PROBLEM #1:</span></p>
        <p>Data is siloed, insecure, and inaccessible, stalling innovation.</p>
      </div>
      <div class="problem-box card-green">
        <p><span class="problem-green">CRITICAL PROBLEM #2:</span></p>
        <p>AI models are "black boxes," creating enormous compliance and ethical risks.</p>
      </div>
      <div class="problem-box card-blue">
        <p><span class="problem-blue">CRITICAL PROBLEM #3:</span></p>
        <p>Developers lack IP protection and are subject to unfair platform fees.</p>
      </div>
    </div>

    <h4 class="opportunity-knocks">OPPORTUNITY KNOCKS...</h4>

    <h3 class="strategic-advantage">Our Strategic Advantage (The Moat)</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="icon-container"><i class="fa-solid fa-magnet icon-red" style="color: #FF4D4D;"></i></div>
        <h4>Powerful<br>Network Effects</h4>
        <p>More developers attract more businesses, which require more data—creating a self-reinforcing flywheel.</p>
      </div>
      <div class="feature-card">
        <div class="icon-container"><i class="fa-solid fa-coins icon-gold"></i></div>
        <h4>The $BAI<br>Token Ecosystem</h4>
        <p>Our native token underpins the entire economy, creating a deep economic moat that cannot be easily replicated.</p>
      </div>
      <div class="feature-card trust-feature">
        <div class="icon-container"><i class="fa-solid fa-shield-halved icon-blue"></i></div>
        <h4>TRUST is<br>the Core Feature</h4>
        <p>Our platform is built on verifiable trust from the ground up. This is our foundational, defensible brand.</p>
      </div>
    </div>

    <div class="call-to-action">
      <h3>Join Us in Building the Future</h3>
      <p>We are currently raising our seed round to accelerate development and capture the first-mover advantage. For a detailed prospectus and to speak with the founders, please contact us.</p>
      <button class="contact-button" on:click={openInvestorModal}>Express Investment Interest</button>
    </div>
  </div>
</section>

<!-- Investor Modal -->
<InvestorModal bind:isOpen={showInvestorModal} />

<style lang="postcss">
  /* Brand Colors */
  :root {
    --brand-orange: #FF914D;
    --brand-cyan: #0CC0DF;
    --brand-blue: #004AAE;      /* Blockchain Blue - exact brand color */
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    padding-top: 6rem; /* Space for fixed header */
  }

  .vision-hero {
    text-align: center;
    padding: 6rem 1rem 4rem 1rem;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  .vision-hero h2 {
    font-size: 3rem;
    color: #ffffff;
    margin-bottom: 2rem;
    font-weight: 700;
    line-height: 1.4;
  }

  .vision-hero p {
    font-size: 1.25rem;
    color: #06B6D4;  /* Cyan-500 for readable text */
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }

  .vision-section {
    background-color: #020617;
    padding: 4rem 0;
  }

  .vision-section:nth-child(even) {
    background-color: #0f172a;
  }

  .section-title {
    font-size: 2.25rem;
    color: #F8FAFC;
    margin-bottom: 3rem;
    text-align: center;
    font-weight: 600;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    justify-items: center;
    align-items: start;
  }

  .feature-card {
    background-color: #1e293b;
    padding: 2rem;
    border-radius: 0.75rem;
    border: 1px solid #334155;
    border-left-width: 4px;
    text-align: center;
    width: 100%;
    max-width: 350px;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.5);
  }

  .feature-card h3,
  .feature-card h4 {
    margin-top: 0;
    font-size: 1.5rem;
    color: #F8FAFC;
    margin-bottom: 1.5rem;
  }

  .feature-card p {
    text-align: left;
    color: #CBD5E1;
    line-height: 1.6;
  }

  .feature-card strong {
    color: #E2E8F0;
  }

  .icon-container {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  /* Card Color Themes */
  .card-red {
    border-left-color: var(--brand-orange);
  }
  .card-red h3,
  .card-red h4,
  .problem-red,
  .icon-red {
    color: var(--brand-orange);
  }

  .card-green {
    border-left-color: var(--brand-cyan);
  }
  .card-green h3,
  .card-green h4,
  .problem-green,
  .icon-green {
    color: var(--brand-cyan);
  }

  .card-blue {
    border-left-color: var(--brand-blue);
  }
  .card-blue h3,
  .card-blue h4,
  .problem-blue,
  .icon-blue {
    color: var(--brand-blue); /* Universal readable blue */
  }

  .icon-gold {
    color: #FFD700;
  }

  .usp {
    font-style: italic;
    display: block;
    margin-top: 1rem;
    border-left-width: 3px;
    border-left-style: solid;
    padding-left: 1rem;
    text-align: left;
    font-weight: 500;
  }

  .card-red .usp {
    color: var(--brand-orange);
    border-left-color: var(--brand-orange);
  }

  .card-green .usp {
    color: var(--brand-cyan);
    border-left-color: var(--brand-cyan);
  }

  .card-blue .usp {
    color: var(--brand-blue);
    border-left-color: var(--brand-blue);
  }

  .rollout-timeline,
  .vertical-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .rollout-phase,
  .problem-box {
    background-color: #1e293b;
    padding: 1.5rem;
    border-radius: 0.75rem;
    border-left-width: 4px;
    border-left-style: solid;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .rollout-phase h4,
  .problem-box p {
    margin-top: 0;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .problem-box p {
    color: #F8FAFC;
  }

  .rollout-phase p {
    margin: 0;
    text-align: left;
    color: #CBD5E1;
  }

  /* Investors Section Specific */
  .investors-section {
    background-color: #0d1117;
  }

  .investors-title {
    color: var(--brand-cyan);
  }

  .opportunity-header {
    text-align: center;
    color: #ffffff;
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .opportunity-desc {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 2rem auto;
    color: #94a3b8;
    font-size: 1.125rem;
  }

  .opportunity-knocks {
    text-align: center;
    font-size: 1.75rem;
    color: var(--brand-cyan);
    font-weight: 600;
    margin: 4rem 0 1rem 0;
    letter-spacing: 0.1em;
  }

  .strategic-advantage {
    text-align: center;
    color: #ffffff;
    margin: 1rem 0 3rem 0;
    font-size: 1.75rem;
  }

  .call-to-action {
    margin-top: 3rem;
    background-color: #0d1117;
    border: 2px solid var(--brand-cyan);
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px rgba(12, 192, 223, 0.2);
    text-align: center;
  }

  .call-to-action h3 {
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .call-to-action p {
    color: #CBD5E1;
    margin-bottom: 1rem;
  }

  .contact-email {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1rem;
  }

  .contact-email a {
    color: var(--brand-cyan);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .contact-email a:hover {
    color: #ffffff;
  }

  .contact-button {
    background: linear-gradient(135deg, #0CC0DF 0%, #0891b2 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.125rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(12, 192, 223, 0.3);
  }

  .contact-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(12, 192, 223, 0.4);
  }

  .trust-feature {
    grid-column: 1 / -1;
    max-width: 350px;
    margin: 1.5rem auto 0 auto;
  }

  .data-owners-card {
    grid-column: 1 / -1;
    max-width: 350px;
    margin: 2rem auto 0 auto;
    justify-self: center;
    align-self: center;
  }

  @media (max-width: 768px) {
    .vision-hero h2 {
      font-size: 2rem;
    }

    .section-title {
      font-size: 1.875rem;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .container {
      padding: 1rem;
    }
  }
</style>