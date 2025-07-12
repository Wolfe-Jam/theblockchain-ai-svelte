<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let loaded = false;
  
  onMount(() => {
    loaded = true;
  });
</script>

<svelte:head>
  <title>Help - The ABCs of bAI | theBlockchain.ai</title>
</svelte:head>

<div class="help-page" in:fade={{ duration: 300 }}>
  <div class="container">
    <header class="page-header">
      <h1 class="page-title">
        <span class="title-icon">📚</span>
        The ABCs of theBlockchain.ai
      </h1>
      <p class="subtitle">Understanding the new digital economy is simple</p>
    </header>

    <!-- Quick Overview Section -->
    <section class="quick-overview">
      <div class="overview-card">
        <h2>Quick Overview</h2>
        <div class="abc-summary">
          <div class="summary-item asset-item">
            <strong>A)</strong> <span class="highlight">The Asset (The Problem):</span> Your code is a valuable asset, but its ownership is broken.
          </div>
          <div class="summary-item blockchain-item">
            <strong>B)</strong> <span class="highlight">The Blockchain (The Solution):</span> We use the blockchain to give you an unbreakable "digital deed" for your code, proving ownership.
          </div>
          <div class="summary-item platform-item">
            <strong>C)</strong> <span class="highlight">The 3 C's (Our Platform):</span> We connect <strong>The Company</strong>, <strong>The Code</strong>, and <strong>The Customers</strong>.
          </div>
          <div class="summary-item people-item">
            <strong>D)</strong> <span class="highlight">The People (Who It's For):</span> D is for the <strong>Devs</strong>, the <strong>Designers</strong>, the <strong>Decision-Makers</strong>—the folks who dream, build, and actually use this stuff!
          </div>
          <div class="summary-item commerce-item">
            <strong>E)</strong> <span class="highlight">The e-Commerce (The bAI Credits):</span> Our economy is powered by bAI Credits—a simple and secure way to transact.
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Sections -->
    <section class="detailed-content">
      <h2 class="section-title">The ABCs of bAI Extended</h2>
      
      <!-- A is for Asset -->
      <div class="abc-card asset-card" data-letter="A">
        <div class="card-header">
          <span class="letter">A</span>
          <h3>is for Asset (The Problem) 💽</h3>
        </div>
        <div class="card-content">
          <p>Imagine you're a developer who writes a brilliant piece of code. 💻</p>
          <p>That code gets used in projects all over the world, but you struggle to track it, get credit, or get paid. <strong>Your digital asset isn't truly yours.</strong></p>
        </div>
      </div>

      <!-- B is for Blockchain -->
      <div class="abc-card blockchain-card" data-letter="B">
        <div class="card-header">
          <span class="letter">B</span>
          <h3>is for Blockchain (The Solution) 🔗</h3>
        </div>
        <div class="card-content">
          <p><strong>Tokenizing</strong> your code on the blockchain is like getting a <strong>digital deed</strong> for your work. It's an unbreakable, public record that proves you are the owner. 📜</p>
          <p>This digital deed allows your code to be bought, sold, and licensed automatically and transparently, ensuring you are always compensated.</p>
        </div>
      </div>

      <!-- C is for The 3 C's -->
      <div class="abc-card platform-card" data-letter="C">
        <div class="card-header">
          <span class="letter">C</span>
          <h3>is for The 3 C's (Our Platform) 🏢</h3>
        </div>
        <div class="card-content">
          <p>Our platform connects the three critical parts of the ecosystem:</p>
          <ul class="three-cs">
            <li><strong>The Company (theBlockchain.ai):</strong> Provides the foundational trust layer and the marketplace.</li>
            <li><strong>The Code (Code-In-Action):</strong> The powerful tools and custom solutions built on the platform.</li>
            <li><strong>The Customers:</strong> The developers and decision-makers who use the platform to create and manage value.</li>
          </ul>
        </div>
      </div>

      <!-- D is for The People -->
      <div class="abc-card people-card" data-letter="D">
        <div class="card-header">
          <span class="letter">D</span>
          <h3>is for The People (Who It's For) 🎯</h3>
        </div>
        <div class="card-content">
          <p>D is for the <strong>Devs</strong>, the <strong>Designers</strong>, the <strong>Decision-Makers</strong>—the folks who dream, build, and actually use this stuff!</p>
        </div>
      </div>

      <!-- E is for e-Commerce -->
      <div class="abc-card commerce-card" data-letter="E">
        <div class="card-header">
          <span class="letter">E</span>
          <h3>is for e-Commerce (Powered by bAI Credits) 🛒</h3>
        </div>
        <div class="card-content">
          <p>Think of our platform like a modern e-commerce site for digital assets.</p>
          <div class="steps">
            <div class="step">
              <span class="step-number">Step 1:</span>
              <p>You add <strong>bAI Credits</strong> to your account, giving you a balance to spend.</p>
            </div>
            <div class="step">
              <span class="step-number">Step 2:</span>
              <p>You use your credit balance to acquire any service, tool, or digital asset from <strong>The OUTPUT Marketplace</strong>—just like adding items to a shopping cart.</p>
            </div>
            <div class="step">
              <span class="step-number">Step 3:</span>
              <p>The blockchain acts as your secure and transparent receipt, providing an unbreakable record of every transaction you make.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-card">
        <h3>Ready to Get Started?</h3>
        <p>Join the new digital economy where your code is truly yours.</p>
        <div class="cta-buttons">
          <a href="/marketplace" class="cta-button primary">Explore Marketplace</a>
          <a href="/invest" class="cta-button secondary">Learn About Investing</a>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .help-page {
    min-height: 100vh;
    padding: 80px 0 2rem;
    background: var(--bai-bg-dark);
    color: var(--bai-text-light);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-top: 5rem;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 0;
    background: linear-gradient(135deg, var(--brand-cyan), var(--brand-cyan-text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .title-icon {
    font-size: 2.5rem;
    filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.5));
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--bai-text-secondary);
    font-style: italic;
    margin-top: 0.5rem;
  }

  /* Quick Overview Section */
  .quick-overview {
    margin-bottom: 4rem;
  }

  .overview-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
  }

  .overview-card h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: var(--brand-cyan-text);
  }

  .abc-summary {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .summary-item {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  /* Color-coded summary items */
  .asset-item {
    border-left: 3px solid var(--brand-orange);
  }
  
  .blockchain-item {
    border-left: 3px solid var(--brand-blue);
  }
  
  .platform-item {
    border-left: 3px solid var(--brand-cyan);
  }
  
  .people-item {
    border-left: 3px solid var(--brand-orange);
  }
  
  .commerce-item {
    border-left: 3px solid var(--brand-cyan);
  }

  .summary-item:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateX(5px);
  }

  .summary-item strong {
    color: var(--brand-cyan-text);
    margin-right: 0.5rem;
  }

  .asset-item strong {
    color: var(--brand-orange-text);
  }
  
  .blockchain-item strong {
    color: var(--brand-blue-text);
  }
  
  .people-item strong {
    color: var(--brand-orange-text);
  }

  .highlight {
    font-weight: 600;
  }

  /* Detailed Content */
  .detailed-content {
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--brand-cyan-text);
  }

  .abc-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  /* Color-coded cards */
  .asset-card {
    border: 1px solid rgba(234, 88, 12, 0.3);
    border-left: 4px solid var(--brand-orange);
  }
  
  .blockchain-card {
    border: 1px solid rgba(37, 99, 235, 0.3);
    border-left: 4px solid var(--brand-blue);
  }
  
  .platform-card {
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-left: 4px solid var(--brand-cyan);
  }
  
  .people-card {
    border: 1px solid rgba(234, 88, 12, 0.3);
    border-left: 4px solid var(--brand-orange);
  }
  
  .commerce-card {
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-left: 4px solid var(--brand-cyan);
  }

  .abc-card::before {
    content: attr(data-letter);
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 8rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.05);
    z-index: 0;
  }

  .asset-card::before {
    color: rgba(234, 88, 12, 0.1);
  }
  
  .blockchain-card::before {
    color: rgba(37, 99, 235, 0.1);
  }
  
  .platform-card::before {
    color: rgba(6, 182, 212, 0.1);
  }
  
  .people-card::before {
    color: rgba(234, 88, 12, 0.1);
  }
  
  .commerce-card::before {
    color: rgba(6, 182, 212, 0.1);
  }

  .abc-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .asset-card:hover {
    border-color: var(--brand-orange);
    box-shadow: 0 10px 30px rgba(234, 88, 12, 0.2);
  }
  
  .blockchain-card:hover {
    border-color: var(--brand-blue);
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
  }
  
  .platform-card:hover {
    border-color: var(--brand-cyan);
    box-shadow: 0 10px 30px rgba(6, 182, 212, 0.2);
  }
  
  .people-card:hover {
    border-color: var(--brand-orange);
    box-shadow: 0 10px 30px rgba(234, 88, 12, 0.2);
  }
  
  .commerce-card:hover {
    border-color: var(--brand-cyan);
    box-shadow: 0 10px 30px rgba(6, 182, 212, 0.2);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .letter {
    font-size: 3rem;
    font-weight: bold;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .asset-card .letter {
    background: linear-gradient(135deg, var(--brand-orange), var(--brand-orange-text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    border: 2px solid var(--brand-orange-text);
  }
  
  .blockchain-card .letter {
    background: linear-gradient(135deg, var(--brand-blue), var(--brand-blue-text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    border: 2px solid var(--brand-blue-text);
  }
  
  .platform-card .letter {
    background: linear-gradient(135deg, var(--brand-cyan), var(--brand-cyan-text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    border: 2px solid var(--brand-cyan-text);
  }
  
  .people-card .letter {
    background: linear-gradient(135deg, var(--brand-orange), var(--brand-orange-text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    border: 2px solid var(--brand-orange-text);
  }
  
  .commerce-card .letter {
    background: linear-gradient(135deg, var(--brand-cyan), var(--brand-cyan-text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    border: 2px solid var(--brand-cyan-text);
  }

  .card-header h3 {
    font-size: 1.5rem;
    color: var(--bai-text-light);
    flex: 1;
  }

  .card-content {
    position: relative;
    z-index: 1;
    line-height: 1.8;
  }

  .card-content p {
    margin-bottom: 1rem;
    color: var(--bai-text-secondary);
  }

  .asset-card .card-content strong {
    color: var(--brand-orange-text);
  }
  
  .blockchain-card .card-content strong {
    color: var(--brand-blue-text);
  }
  
  .platform-card .card-content strong {
    color: var(--brand-cyan-text);
  }
  
  .people-card .card-content strong {
    color: var(--brand-orange-text);
  }
  
  .commerce-card .card-content strong {
    color: var(--brand-cyan-text);
  }

  .three-cs {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }

  .three-cs li {
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
    color: var(--bai-text-secondary);
  }

  .three-cs li::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: var(--brand-cyan-text);
    font-size: 1.5rem;
  }

  .three-cs li strong {
    color: var(--brand-cyan-text);
  }

  /* Steps */
  .steps {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .step {
    background: rgba(6, 182, 212, 0.05);
    padding: 1rem;
    border-radius: 0.5rem;
    border-left: 3px solid var(--brand-cyan-text);
  }

  .step-number {
    display: inline-block;
    background: var(--brand-cyan-text);
    color: var(--bai-bg-dark);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-weight: bold;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .step p {
    margin: 0.5rem 0 0 0;
  }

  /* CTA Section */
  .cta-section {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }

  .cta-card {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(37, 99, 235, 0.1));
    border: 2px solid var(--brand-cyan-text);
    border-radius: 1rem;
    padding: 3rem;
    text-align: center;
  }

  .cta-card h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--brand-cyan-text);
  }

  .cta-card p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: var(--bai-text-secondary);
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-button {
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .cta-button.primary {
    background: var(--brand-cyan-text);
    color: var(--bai-bg-dark);
  }

  .cta-button.primary:hover {
    background: var(--brand-blue-text);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(6, 182, 212, 0.5);
  }

  .cta-button.secondary {
    background: transparent;
    color: var(--brand-orange-text);
    border: 2px solid var(--brand-orange);
  }

  .cta-button.secondary:hover {
    background: rgba(234, 88, 12, 0.1);
    transform: translateY(-2px);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .page-title {
      font-size: 2rem;
      flex-direction: column;
    }

    .title-icon {
      font-size: 2rem;
    }

    .abc-card {
      padding: 1.5rem;
    }

    .letter {
      font-size: 2rem;
      width: 45px;
      height: 45px;
    }

    .card-header h3 {
      font-size: 1.25rem;
    }

    .abc-card::before {
      font-size: 5rem;
      top: -10px;
      right: -10px;
    }
  }
</style>