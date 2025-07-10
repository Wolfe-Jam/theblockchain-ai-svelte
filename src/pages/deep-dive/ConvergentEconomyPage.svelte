<!-- ConvergentEconomyPage.svelte - Premium scrollytelling experience -->
<script>
  import { onMount } from 'svelte';
  import ScrollProgress from '../../components/interactive/ScrollProgress.svelte';
  import NavigationSidebar from '../../components/interactive/NavigationSidebar.svelte';
  import DocumentSection from '../../components/interactive/DocumentSection.svelte';
  import OceanOfOpenSource from '../../components/interactive/OceanOfOpenSource.svelte';
  import TrillionDollarChart from '../../components/interactive/TrillionDollarChart.svelte';
  import AIBlockchainFlywheel from '../../components/interactive/AIBlockchainFlywheel.svelte';
  import ERC1155Visualization from '../../components/interactive/ERC1155Visualization.svelte';
  import StrategicOutlook from '../../components/interactive/StrategicOutlook.svelte';
  import SceneOverlay from '../../components/SceneOverlay.svelte';
  
  // Document sections for navigation
  const sections = [
    { id: 'executive-summary', title: 'Executive Summary' },
    { id: 'trillion-dollar-triumvirate', title: 'Trillion-Dollar Markets' },
    { id: 'convergence-catalyst', title: 'The Convergence' },
    { id: 'trust-revolution', title: 'Trust Revolution' },
    { id: 'tokenization-framework', title: 'Tokenization' },
    { id: 'evolving-developer', title: 'Developer Evolution' },
    { id: 'strategic-outlook', title: 'Strategic Outlook' }
  ];
  
  let currentSection = '';
  
  // Scene overlay control
  let isOverlayVisible = false;
  
  function toggleOverlay() {
    isOverlayVisible = !isOverlayVisible;
  }
  
  onMount(() => {
    // Initialize smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  });
</script>

<svelte:head>
  <title>The Convergent Economy | theBlockchain.ai</title>
  <meta name="description" content="A deep dive into the multi-trillion dollar frontier emerging from the intersection of AI, Software, and Blockchain." />
</svelte:head>

<div class="convergent-economy-page">
  <ScrollProgress showPercentage={true} />
  <NavigationSidebar {sections} bind:currentSection />
  
  <!-- Hero Section -->
  <section class="hero-section">
    <!-- DEEP DIVE Label at the very top -->
    <div class="deep-dive-label">DEEP DIVE</div>
    
    <!-- Landscape Image with Overlay -->
    <div class="landscape-container">
      <img 
        src="/theBlockchain-ai-landscape.webp" 
        alt="The Convergent Economy: AI, Software, and Blockchain Intersection" 
        class="landscape-image" 
      />
      
      <!-- Scene overlay and trigger boat icon -->
      <div class="scene-boat-wrapper">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
          class="scene-boat-trigger" 
          class:active={isOverlayVisible}
          on:click={toggleOverlay}
          role="button"
          tabindex="0"
          on:keydown={e => e.key === 'Enter' && toggleOverlay()}
        >
          <i class="fas fa-sailboat"></i>
        </div>
        <SceneOverlay bind:visible={isOverlayVisible} />
      </div>
    </div>
    
    <!-- Title -->
    <h1 class="page-title">The Convergent Economy</h1>
    
    <!-- Subtitle -->
    <p class="page-subtitle">
      Market Analysis of AI, Software, and Blockchain<br/>
      and the Unifying Role of Tokenization
    </p>
    
    <!-- Divider -->
    <div class="divider"></div>
  </section>

  <!-- Executive Summary -->
  <DocumentSection 
    id="executive-summary"
    title="Executive Summary"
    subtitle="The global technology landscape is on the cusp of a paradigm shift"
    background="gradient"
  >
    <div class="executive-content">
      <p class="lead-paragraph">
        The convergence of three powerful forces—Artificial Intelligence, Software Development, 
        and Blockchain Technology—is creating a novel economic frontier. While each market 
        represents a trillion-dollar opportunity individually, their intersection creates 
        unprecedented value through intelligent, autonomous systems and new models of value 
        creation and exchange.
      </p>
      
      <div class="key-insights">
        <div class="insight-card">
          <h3>$5+ Trillion Combined Market</h3>
          <p>AI, software, and blockchain markets projected to command massive value by early 2030s</p>
        </div>
        <div class="insight-card">
          <h3>40.0% CAGR for Blockchain AI</h3>
          <p>The convergent market shows exponential growth, outpacing individual sectors</p>
        </div>
        <div class="insight-card">
          <h3>Tokenization as Infrastructure</h3>
          <p>ERC-1155 enables fractionalization, liquidity, and automated governance</p>
        </div>
      </div>
    </div>
  </DocumentSection>

  <!-- The Trillion-Dollar Triumvirate -->
  <DocumentSection 
    id="trillion-dollar-triumvirate"
    title="The Trillion-Dollar Triumvirate"
    subtitle="Sizing the Foundational Markets"
  >
    <p class="section-intro">
      To comprehend the magnitude of the convergent opportunity, we must first establish 
      the immense, independent scale of the three core technology pillars. Each represents 
      massive global markets with distinct growth dynamics.
    </p>
    
    <TrillionDollarChart showCallouts={true} />
    
    <div class="market-analysis">
      <h3 class="ai-market-title">The Artificial Intelligence Market</h3>
      <p class="ai-market-text">
        The global AI market is undergoing explosive growth, transforming virtually every 
        industry. Precedence Research estimates the AI market at <strong>$757.6 billion 
        in 2025</strong>, projecting it will soar to <strong>$3.7 trillion by 2034</strong>, 
        reflecting a robust CAGR of 19.2%.
      </p>
      
      <h3 class="software-market-title">The Software Development Engine</h3>
      <p class="software-market-text">
        The software development market is a mature cornerstone of the global economy. 
        Valued at <strong>$570 billion in 2025</strong>, it's forecast to reach 
        <strong>$1.0 trillion by 2030</strong> at a steady CAGR of 12.9%. The custom 
        software segment shows particularly rapid growth at 22.7% CAGR.
      </p>
      
      <h3 class="blockchain-market-title">The Blockchain Infrastructure Market</h3>
      <p class="blockchain-market-text">
        While the smallest in absolute terms, blockchain shows exponential growth rates. 
        The market will grow from <strong>$31.2 billion in 2025</strong> to 
        <strong>$393.4 billion by 2032</strong>, exhibiting a powerful CAGR of 43.6%.
      </p>
    </div>
  </DocumentSection>

  <!-- The Convergence Catalyst -->
  <DocumentSection 
    id="convergence-catalyst"
    title="The Convergence Catalyst"
    subtitle="A New Economic Frontier"
    background="dark"
  >
    <p class="section-intro">
      The true transformative potential lies not within individual silos, but at their 
      intersection. This convergence creates a new economic frontier where technologies 
      symbiotically enhance one another to create novel forms of value.
    </p>
    
    <AIBlockchainFlywheel />
    
    <div class="convergence-analysis">
      <h3>Quantifying the Blockchain AI Market</h3>
      <p>
        The specific "Blockchain AI" market shows hyper-growth, expanding from 
        <strong>$1.1 billion in 2025</strong> to <strong>$5.4 billion by 2030</strong> 
        at a CAGR of 37.2%. This growth rate exceeds standalone AI markets, suggesting 
        a significant "value-add" premium for trustworthy, verifiable AI.
      </p>
      
      <div class="synergy-grid">
        <div class="synergy-box">
          <h4>AI → Blockchain</h4>
          <ul>
            <li>Intelligent oracles verify off-chain data</li>
            <li>AI monitors for security vulnerabilities</li>
            <li>Predictive optimization of network operations</li>
          </ul>
        </div>
        <div class="synergy-box">
          <h4>Blockchain → AI</h4>
          <ul>
            <li>Verifiable data provenance for training</li>
            <li>Immutable audit trails for models</li>
            <li>Decentralized marketplaces for resources</li>
          </ul>
        </div>
      </div>
    </div>
  </DocumentSection>

  <!-- The Trust Revolution -->
  <DocumentSection 
    id="trust-revolution"
    title="The Trust Revolution"
    subtitle="Blockchain as the Foundational Layer"
  >
    <p class="section-intro">
      In an increasingly digital world fraught with data breaches and opaque algorithms, 
      blockchain offers a new paradigm for establishing trust—not as a replacement for 
      AI or software, but as the foundational layer for a more secure digital economy.
    </p>
    

    
    <div class="trust-principles">
      <div class="principle-card">
        <div class="principle-icon">🔒</div>
        <h3>Immutability</h3>
        <p>
          Transactions are cryptographically linked in a tamper-evident chain. 
          Once recorded, data becomes permanent and unchangeable, providing a 
          single source of truth.
        </p>
      </div>
      
      <div class="principle-card">
        <div class="principle-icon">🔍</div>
        <h3>Transparency</h3>
        <p>
          Distributed ledgers ensure all participants see the same version of 
          the record simultaneously, eliminating reconciliation needs and creating 
          verifiable audit trails.
        </p>
      </div>
      
      <div class="principle-card">
        <div class="principle-icon">🌐</div>
        <h3>Decentralization</h3>
        <p>
          No single point of failure or control. Trust is placed in cryptographic 
          certainty and consensus mechanisms rather than central authorities.
        </p>
      </div>
    </div>
    
    <div class="trust-applications">
      <h3>Addressing the AI "Black Box"</h3>
      <p>
        Blockchain provides practical solutions to AI's transparency challenges:
      </p>
      <ul class="feature-list">
        <li>
          <strong>Verifiable Data Provenance:</strong> Record data sources and usage 
          rights on-chain, proving what data trained each model
        </li>
        <li>
          <strong>Model Integrity:</strong> Cryptographic hashes create permanent 
          records of model versions, preventing unauthorized tampering
        </li>
        <li>
          <strong>IP Protection:</strong> Time-stamped proof of existence for 
          AI-generated code and creative works
        </li>
      </ul>
    </div>
  </DocumentSection>

  <!-- Tokenization Framework -->
  <DocumentSection 
    id="tokenization-framework"
    title="Tokenization: The Unifying Framework"
    subtitle="Monetization and Governance for the New Economy"
    background="gradient"
  >
    <p class="section-intro">
      If blockchain provides the "why" for the convergent economy—the foundation of trust—then 
      tokenization provides the "how." It's the technical and economic framework that allows 
      novel forms of value to be defined, owned, governed, and traded.
    </p>
    
    <div class="tokenization-stats">
      <div class="stat-card">
        <h3>$16.1 Trillion</h3>
        <p>Projected value of tokenized assets by 2030 (10.0% of global GDP)</p>
      </div>
      <div class="stat-card">
        <h3>26.8% CAGR</h3>
        <p>Growth rate of the tokenization market through 2029</p>
      </div>
    </div>
    
    <ERC1155Visualization />
    
    <div class="tokenization-benefits">
      <h3>New Business Models Unlocked</h3>
      
      <div class="model-grid">
        <div class="model-card ai-agents-card">
          <h4>🤖 Tokenizing AI Agents</h4>
          <p>
            Ownership and revenue streams of autonomous AI agents encapsulated in 
            tokens. As agents learn and improve, token values appreciate.
          </p>
        </div>
        
        <div class="model-card software-ip-card">
          <h4>💻 Software IP Markets</h4>
          <p>
            Individual modules and algorithms become tradable assets. Developers 
            realize continuous value through liquid secondary markets.
          </p>
        </div>
        
        <div class="model-card automated-royalties-card">
          <h4>⚙️ Automated Royalties</h4>
          <p>
            Smart contracts track usage and distribute payments in real-time, 
            eliminating intermediaries and ensuring fair compensation.
          </p>
        </div>
        
        <div class="model-card token-governance-card">
          <h4>🏛️ Token Governance</h4>
          <p>
            Communities participate directly in project evolution through voting 
            tokens, transforming users into active stakeholders.
          </p>
        </div>
      </div>
    </div>
  </DocumentSection>

  <!-- The Evolving Developer -->
  <DocumentSection 
    id="evolving-developer"
    title="The Evolving Developer"
    subtitle="AI's Transformation of Software Creation and Value"
    background="dark"
  >
    <p class="section-intro">
      The technological shifts driven by AI are profoundly reshaping software development. 
      As AI changes what developers create, tokenization provides the framework for how 
      that new form of value is owned and monetized.
    </p>
    
    <div class="developer-evolution">
      <div class="evolution-stage">
        <h3>From Coder to Conductor</h3>
        <p>
          AI-powered tools now generate 25-30% of code at major tech companies. 
          Developers report 55% faster development cycles and 88% productivity increases. 
          The role evolves from writing code to:
        </p>
        <ul class="evolution-list">
          <li>Problem framing and system architecture</li>
          <li>Code review and quality assurance</li>
          <li>Strategic decision-making and trade-offs</li>
        </ul>
      </div>
      
      <div class="code-example">
        <h4>The New Output: Dynamic AI Assets</h4>
        <pre class="code-block"><code>{`// Traditional static license
const license = {
  type: "perpetual",
  price: 999,
  owner: "company"
};

// Tokenized dynamic asset
const aiAgentToken = {
  type: "ERC-1155",
  utilityRights: "API access",
  revenueShare: "5% of usage fees",
  governance: "voting power",
  value: "increases with agent learning"
};`}</code></pre>
      </div>
      
      <div class="incentive-loop">
        <h3>The Open-Source Incentive Loop</h3>
        <p>
          Token governance transforms open-source from altruistic endeavor to viable 
          economic engine. Contributors receive tokens for improvements, creating 
          direct alignment between individual contributions and collective success.
        </p>
      </div>
    </div>
  </DocumentSection>

  <!-- Strategic Outlook -->
  <DocumentSection 
    id="strategic-outlook"
    title="Strategic Outlook"
    subtitle="Identifying High-Growth Opportunities"
  >
    <p class="section-intro">
      The convergence of AI, software, and blockchain represents one of the most significant 
      investment opportunities of the next decade. Here's where the smart money is focusing.
    </p>
    
    <StrategicOutlook />
    
    <div class="risk-analysis">
      <h3>Navigating the Headwinds</h3>
      
      <div class="risk-grid">
        <div class="risk-card">
          <h4>⚖️ Regulatory Uncertainty</h4>
          <p>
            Legal classification of tokens remains ambiguous. Navigate complex 
            KYC/AML requirements while building for multiple jurisdictions.
          </p>
        </div>
        
        <div class="risk-card">
          <h4>🔧 Technical Complexity</h4>
          <p>
            Smart contract vulnerabilities pose constant threats. Critical shortage 
            of developers with expertise in both blockchain and AI.
          </p>
        </div>
        
        <div class="risk-card">
          <h4>💧 Market Liquidity</h4>
          <p>
            Early-stage marketplaces struggle with low volumes. Critical mass of 
            buyers and sellers needed to deliver on liquidity promise.
          </p>
        </div>
      </div>
    </div>
    
    <div class="conclusion">
      <h3>The Path Forward</h3>
      <p class="conclusion-text">
        The convergence of AI, software, and blockchain is not incremental evolution—it's 
        a fundamental re-architecting of how digital value is created, owned, and exchanged. 
        The building blocks are being laid today by financial incumbents, nimble startups, 
        and decentralized communities. Tokenization stands at the heart of this transformation, 
        providing the essential framework to bring trust to AI, liquidity to software IP, 
        and automated governance to digital ecosystems.
      </p>
      <p class="conclusion-cta">
        The destination is a more transparent, efficient, and accessible global economy 
        for digital assets—a paradigm shift that will define the next generation of 
        technology and finance.
      </p>
    </div>
  </DocumentSection>

  <!-- Call to Action -->
  <section class="cta-section">
    <div class="cta-content">
      <h2>Ready to Build the Convergent Economy?</h2>
      <p>Experience the power of tokenized software development firsthand.</p>
      <div class="cta-buttons">
        <a href="/download" class="btn-primary">
          📊 Download Full PDF Report
        </a>
        <a href="/tools" class="btn-secondary">
          Try Smart Contract Generator
        </a>
        <a href="/invest" class="btn-secondary">
          Investment Opportunities
        </a>
      </div>
      <p class="pdf-note">
        Get the complete 42-page analysis including market projections, 
        investment strategies, and technical deep dives.
      </p>
    </div>
  </section>
</div>

<style>
  .convergent-economy-page {
    min-height: 100vh;
    background: var(--color-background-dark);
    color: var(--color-text-light);
    padding-left: 280px; /* Add space for sidebar */
  }
  
  @media (max-width: 1024px) {
    .convergent-economy-page {
      padding-left: 0; /* Remove padding on mobile */
    }
  }
  
  /* Hero Section */
  .hero-section {
    position: relative;
    text-align: center;
    padding: 2rem 1rem;
    background: linear-gradient(to bottom, #001a3d, var(--color-background-dark));
    margin-top: 60px;
  }
  
  .deep-dive-label {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brand-cyan);
    margin: 0 0 1.5rem 0;
    padding: 0.5rem 0;
    position: relative;
    display: inline-block;
  }
  
  .deep-dive-label::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: var(--brand-cyan);
    opacity: 0.6;
  }
  
  .deep-dive-label::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: var(--brand-cyan);
    opacity: 0.6;
  }
  
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin: 2rem 0 1rem;
    line-height: 1.1;
    background: linear-gradient(90deg, #00c0df, #6e45e2);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    display: inline-block;
  }
  
  .page-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 700px;
    margin: 0 auto 3rem;
    line-height: 1.6;
  }
  
  .divider {
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #00c0df, #6e45e2);
    margin: 2rem auto 4rem;
    border-radius: 2px;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }
  

  .landscape-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 2rem;
    border-radius: 1rem;
    overflow: visible;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  .landscape-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }
  
  .landscape-image:hover {
    transform: scale(1.02);
  }
  
  /* Executive Summary */
  .executive-content {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .lead-paragraph {
    font-size: 1.25rem;
    line-height: 1.8;
    margin-bottom: 3rem;
    color: var(--color-text-light);
  }
  
  .key-insights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .insight-card {
    background: rgba(30, 41, 59, 0.8);
    border-left: 4px solid var(--brand-cyan);
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
  
  .insight-card h3 {
    margin: 0 0 0.5rem 0;
    color: var(--brand-cyan);
    font-size: 1.25rem;
  }
  
  .insight-card p {
    margin: 0;
    color: rgba(255, 255, 255, 0.85);
  }
  
  /* Section Styling */
  .section-intro {
    font-size: 1.25rem;
    line-height: 1.8;
    margin-bottom: 3rem;
    max-width: 800px;
  }
  
  /* Market Analysis */
  .market-analysis h3 {
    margin: 3rem 0 1rem 0;
    color: var(--brand-cyan);
    font-size: 1.75rem;
  }
  
  .market-analysis p {
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
  
  .market-analysis strong {
    color: var(--brand-orange);
    font-weight: 700;
  }
  
  /* AI Market - Orange title, Cyan highlights */
  .ai-market-title {
    color: var(--brand-orange) !important;
  }
  
  .ai-market-text strong {
    color: var(--brand-cyan) !important;
  }
  
  /* Software Market - Cyan title, Orange highlights (default - already correct) */
  .software-market-title {
    color: var(--brand-cyan);
  }
  
  .software-market-text strong {
    color: var(--brand-orange);
  }
  
  /* Blockchain Market - Blue title, Cyan highlights */
  .blockchain-market-title {
    color: var(--brand-blue-text) !important;
  }
  
  .blockchain-market-text strong {
    color: var(--brand-cyan) !important;
  }
  
  /* Convergence Analysis */
  .convergence-analysis {
    margin-top: 3rem;
  }
  
  .synergy-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .synergy-box {
    background: rgba(30, 41, 59, 0.8);
    border-radius: 0.5rem;
    padding: 2rem;
  }
  
  .synergy-box h4 {
    margin: 0 0 1rem 0;
    color: var(--brand-cyan);
    font-size: 1.25rem;
  }
  
  .synergy-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .synergy-box li {
    padding: 0.5rem 0;
    color: rgba(255, 255, 255, 0.85);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .synergy-box li:last-child {
    border-bottom: none;
  }
  
  /* Trust Principles */
  .trust-principles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
  }
  
  .principle-card {
    text-align: center;
    padding: 2rem;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 1rem;
    transition: transform 0.3s ease;
  }
  
  .principle-card:hover {
    transform: translateY(-5px);
  }
  
  .principle-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .principle-card h3 {
    margin: 0 0 1rem 0;
    color: var(--brand-cyan);
    font-size: 1.5rem;
  }
  
  .principle-card p {
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.6;
  }
  
  /* Trust Applications */
  .trust-applications {
    margin-top: 3rem;
  }
  
  .trust-applications h3 {
    color: var(--brand-cyan);
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
  }
  
  .feature-list li {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .feature-list strong {
    color: var(--brand-orange);
    display: block;
    margin-bottom: 0.5rem;
  }
  
  /* Tokenization Stats */
  .tokenization-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
  }
  
  .stat-card {
    background: linear-gradient(135deg, rgba(12, 192, 223, 0.1), rgba(0, 74, 174, 0.1));
    border: 2px solid var(--brand-cyan);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
  }
  
  .stat-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    color: var(--brand-cyan);
  }
  
  .stat-card p {
    margin: 0;
    color: rgba(255, 255, 255, 0.85);
  }
  
  /* Model Grid */
  .model-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .model-card {
    background: rgba(30, 41, 59, 0.8);
    border-radius: 0.5rem;
    padding: 1.5rem;
    border-top: 3px solid var(--brand-orange);
  }
  
  .model-card h4 {
    margin: 0 0 1rem 0;
    color: var(--brand-orange);
    font-size: 1.25rem;
  }
  
  /* Specific card color overrides */
  .ai-agents-card {
    border-top: 3px solid var(--brand-cyan);
  }
  
  .ai-agents-card h4 {
    color: var(--brand-cyan);
  }
  
  .automated-royalties-card {
    border-top: 3px solid var(--brand-blue);
  }
  
  .automated-royalties-card h4 {
    color: var(--brand-blue-text);
  }
  
  .token-governance-card {
    border-top: 3px solid #EEAD1A;
  }
  
  .token-governance-card h4 {
    color: #EEAD1A;
  }
  
  .model-card p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
  
  /* Developer Evolution */
  .developer-evolution {
    margin-top: 2rem;
  }
  
  .evolution-stage {
    margin-bottom: 3rem;
  }
  
  .evolution-stage h3 {
    color: var(--brand-cyan);
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  .evolution-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }
  
  .evolution-list li {
    padding: 0.5rem 0 0.5rem 2rem;
    position: relative;
    color: var(--color-text-muted);
  }
  
  .evolution-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--brand-orange);
  }
  
  .code-example {
    margin: 3rem 0;
  }
  
  .code-example h4 {
    color: var(--brand-cyan);
    margin-bottom: 1rem;
  }
  
  .code-block {
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(12, 192, 223, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
    overflow-x: auto;
  }
  
  .code-block code {
    color: #a5f3fc;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
  }
  
  .incentive-loop {
    background: rgba(30, 41, 59, 0.5);
    border-left: 4px solid var(--brand-orange);
    padding: 2rem;
    border-radius: 0.5rem;
    margin-top: 3rem;
  }
  
  .incentive-loop h3 {
    margin: 0 0 1rem 0;
    color: var(--brand-orange);
  }
  
  /* Risk Analysis */
  .risk-analysis {
    margin-top: 3rem;
  }
  
  .risk-analysis h3 {
    color: var(--brand-cyan);
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
  
  .risk-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .risk-card {
    background: rgba(234, 88, 12, 0.1);
    border: 2px solid rgba(234, 88, 12, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
  }
  
  .risk-card h4 {
    margin: 0 0 1rem 0;
    color: var(--brand-orange);
    font-size: 1.25rem;
  }
  
  .risk-card p {
    margin: 0;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.6;
  }
  
  /* Conclusion */
  .conclusion {
    margin-top: 4rem;
    padding: 3rem;
    background: linear-gradient(135deg, rgba(12, 192, 223, 0.1), rgba(0, 74, 174, 0.1));
    border-radius: 1rem;
    border: 1px solid rgba(12, 192, 223, 0.3);
  }
  
  .conclusion h3 {
    color: var(--brand-cyan);
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .conclusion-text {
    font-size: 1.25rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .conclusion-cta {
    font-size: 1.125rem;
    color: var(--brand-cyan);
    text-align: center;
    font-weight: 600;
  }
  
  /* CTA Section */
  .cta-section {
    background: linear-gradient(135deg, rgba(255, 145, 77, 0.1), rgba(12, 192, 223, 0.1));
    padding: 6rem 2rem;
    text-align: center;
    margin-top: 6rem;
  }
  
  .cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-text-light);
  }
  
  .cta-content p {
    font-size: 1.25rem;
    color: var(--color-text-muted);
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .pdf-note {
    font-size: 1rem;
    color: var(--color-text-muted);
    margin-top: 1.5rem;
    font-style: italic;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .btn-primary, .btn-secondary {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    font-weight: 600;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
  }
  
  .btn-primary {
    background: var(--brand-orange);
    color: white;
  }
  
  .btn-primary:hover {
    background: #FF7A2D;
    transform: translateY(-2px);
  }
  
  .btn-secondary {
    background: transparent;
    color: var(--brand-cyan);
    border: 2px solid var(--brand-cyan);
  }
  
  .btn-secondary:hover {
    background: rgba(12, 192, 223, 0.1);
    transform: translateY(-2px);
  }
  
  /* Scene Boat Trigger - positioned over the landscape image */
  .placeholder-container {
    position: relative;
  }
  
  .scene-boat-wrapper {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 50;
    height: 0; /* Take no space in document flow */
  }
  
  .scene-boat-trigger {
    width: 3rem;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s ease;
    z-index: 1000;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    outline: none;
  }
  
  .scene-boat-trigger:hover,
  .scene-boat-trigger:focus {
    opacity: 0.8;
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .scene-boat-trigger i {
    color: white !important;
    font-size: 1.2rem !important;
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
    font-family: "Font Awesome 6 Free" !important;
    font-weight: 900 !important;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
      line-height: 1.2;
      padding: 0 1rem;
    }
    
    .hero-subtitle {
      font-size: 1.125rem;
      padding: 0 1rem;
      line-height: 1.5;
    }
    
    .key-insights {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 0 1rem;
    }
    
    .trust-principles {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .model-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .synergy-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .risk-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .cta-buttons {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .btn-primary, .btn-secondary {
      width: 100%;
      max-width: 300px;
      min-height: 48px; /* Touch-friendly height */
      font-size: 1rem;
    }
    
    .placeholder-container {
      margin: 1rem;
      padding: 1rem;
    }
  }
  
  /* Extra small screens */
  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem;
      padding: 0 0.5rem;
    }
    
    .hero-subtitle {
      font-size: 1rem;
      padding: 0 0.5rem;
    }
    
    .key-insights {
      padding: 0 0.5rem;
      gap: 1rem;
    }
    
    .insight-card, .principle-card, .model-card, .synergy-box, .risk-card {
      padding: 1rem;
    }
    
    .btn-primary, .btn-secondary {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }
  }
</style>
