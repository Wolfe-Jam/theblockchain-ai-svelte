<!-- Investment Opportunities - Original Beautiful Design -->
<script>
  import { onMount } from 'svelte';
  import InvestorModal from '../../../components/InvestorModal.svelte';
  import ReportDownload from '../../../components/ReportDownload.svelte';
  
  let showModal = false;
  let showReportDownload = false;
  
  onMount(() => {
    document.title = "Investment Opportunities | theBlockchain.ai";
  });
  
  function openInvestorModal() {
    showModal = true;
  }
  
  function openReportDownload() {
    showReportDownload = true;
  }
</script>

<svelte:head>
  <title>Investment Opportunities | theBlockchain.ai</title>
  <meta name="description" content="Professional investment opportunities in the convergent economy. Zero fraud, complete transparency." />
</svelte:head>

<!-- Investment Opportunities Landing -->
<div class="invest-landing">
  <div class="container">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="invest-title">Investment Opportunity</h1>
      <p class="invest-subtitle">
        All code on blockchain. Every transaction. All Smart Contracts. Zero fraud, devs get paid. 
        Trusted AI from theBlockchain.ai - the Authority in Open-Source matters on the BC.
      </p>
    </div>

    <!-- Investment Highlights -->
    <div class="investment-highlights">
      <div class="highlight-item">
        <div class="highlight-icon massive-market">
          <i class="fas fa-chart-line"></i>
        </div>
        <h3>Massive Market</h3>
        <p>Multi-trillion dollar convergent economy at the intersection of AI, blockchain, and software development</p>
      </div>
      
      <div class="highlight-item">
        <div class="highlight-icon zero-fraud">
          <img src="/zero-fraud-icon.svg" alt="Zero Fraud - theBlockchain.ai Trust Guarantee" class="trust-logo">
        </div>
        <h3>Zero Fraud</h3>
        <p>First-ever blockchain-based development platform ensuring complete transparency and trust</p>
      </div>
      
      <div class="highlight-item">
        <div class="highlight-icon unique-platform">
          <i class="fas fa-rocket"></i>
        </div>
        <h3>Unique Platform</h3>
        <p>Revolutionary three-pillar strategy: OUTPUT Marketplace, Code-In-Action, and theBlockchain infrastructure</p>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="two-column-layout">
      <!-- Column A: Professional PDF Report -->
      <div class="column column-a">
        <div class="column-header">
          <h2>Professional PDF Report</h2>
          <p class="column-subtitle">For Investors, Developers, Researchers & General Interest. Students welcome!</p>
        </div>
        
        <div class="pdf-section">
          <div class="report-info">
            <h3>"The Convergent Economy" Market Research</h3>
            <p class="report-description">
              Comprehensive 26-page analysis of the convergent AI, Software, and Blockchain economy 
              with professional insights and market data.
            </p>
            
            <div class="report-features">
              <h4>Professional Report Features:</h4>
              <ul>
                <li>Market Analysis & Projections</li>
                <li>Technology Convergence Insights</li>
                <li>Tokenization Framework</li>
                <li>Educational & Research Use</li>
              </ul>
            </div>
          </div>
          
          <div class="cta-section">
            <button class="download-cta" on:click={openReportDownload}>
              <i class="fas fa-file-pdf"></i>
              Download PDF Report
            </button>
            
            <p class="download-note">Comprehensive Market Analysis PDF - Free with professional details</p>
          </div>
        </div>
      </div>
      
      <!-- Column B: Investment Opportunities -->
      <div class="column column-b">
        <div class="column-header">
          <h2>Investment Opportunities</h2>
          <p class="column-subtitle">For Companies & Individual Investors</p>
        </div>
        
        <div class="investor-section">
          <div class="investor-warning">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Capital Investment Inquiries Only</span>
          </div>
          
          <div class="investor-details">
            <h4>Investment Opportunity Details:</h4>
            <ul>
              <li>Minimum investment thresholds apply</li>
              <li>Due diligence materials provided to qualified investors</li>
              <li>Professional PDF report included with all investment inquiries</li>
              <li>Direct access to founding team and technical leadership</li>
            </ul>
          </div>
          
          <div class="cta-section">
            <button class="investor-cta" on:click={openInvestorModal}>
              <i class="fas fa-handshake"></i>
              Express Investment Interest
            </button>
            
            <p class="disclaimer">Available to accredited investors and institutional partners</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modals -->
<InvestorModal bind:isOpen={showModal} />
<ReportDownload bind:isOpen={showReportDownload} />

<style>
  :root {
    --brand-blue: #004AAE;
    --brand-cyan: #0CC0DF;
    --brand-orange: #FF914D;
    --brand-orange-text: #EA580C;
    --brand-blue-text: #2563EB;
    --brand-cyan-text: #06B6D4;
  }

  /* Investment Landing */
  .invest-landing {
    background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 25%, #1e293b 50%, #0f172a 100%);
    min-height: 100vh;
    padding: 8rem 0 6rem;
    position: relative;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 3rem;
  }

  /* Hero Section */
  .hero-section {
    text-align: center;
    margin-bottom: 6rem;
  }

  .invest-title {
    font-size: clamp(3rem, 8vw, 5rem);
    color: var(--brand-cyan);
    font-weight: 900;
    margin-bottom: 2rem;
    text-shadow: 0 0 20px rgba(12, 192, 223, 0.3);
  }

  .invest-subtitle {
    font-size: 1.4rem;
    color: #e2e8f0;
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.7;
    font-weight: 400;
  }

  /* Investment Highlights */
  .investment-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 3rem;
    margin: 6rem 0;
  }

  .highlight-item {
    background: rgba(15, 23, 42, 0.8);
    border: 2px solid rgba(51, 65, 85, 0.6);
    border-radius: 1.5rem;
    padding: 3rem 2rem;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .highlight-item:hover {
    transform: translateY(-5px);
    border-color: var(--brand-cyan);
    box-shadow: 0 15px 40px rgba(12, 192, 223, 0.2);
  }

  .highlight-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    font-size: 2rem;
  }

  .highlight-icon.massive-market {
    background: linear-gradient(135deg, var(--brand-orange), #fbbf24);
    color: white;
  }

  .highlight-icon.zero-fraud {
    background: linear-gradient(135deg, var(--brand-blue), var(--brand-cyan));
    padding: 15px;
  }

  .highlight-icon.unique-platform {
    background: linear-gradient(135deg, var(--brand-cyan), #38bdf8);
    color: white;
  }

  .trust-logo {
    width: 50px;
    height: 50px;
    filter: brightness(0) invert(1);
  }

  .highlight-item h3 {
    color: #f8fafc;
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .highlight-item p {
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  /* Two Column Layout */
  .two-column-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 6rem auto 0;
  }

  .column {
    background: rgba(15, 23, 42, 0.9);
    border-radius: 2rem;
    padding: 2rem 2rem 1.5rem 2rem;
    backdrop-filter: blur(15px);
    border: 2px solid rgba(51, 65, 85, 0.5);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .column:hover {
    border-color: var(--brand-cyan);
    box-shadow: 0 20px 50px rgba(12, 192, 223, 0.1);
  }

  .column-a {
    border-top: 4px solid var(--brand-cyan);
  }

  .column-b {
    border-top: 4px solid var(--brand-orange);
  }

  .column-header {
    margin-bottom: 3rem;
    text-align: center;
  }

  .column-header h2 {
    color: var(--brand-cyan);
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .column-b .column-header h2 {
    color: var(--brand-orange);
  }

  .column-subtitle {
    color: #94a3b8;
    font-size: 1.1rem;
    font-weight: 500;
  }

  /* Report Section */
  .pdf-section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .report-info {
    flex: 1;
    margin-bottom: 3rem;
  }

  .report-info h3 {
    color: #f8fafc;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .report-description {
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .report-features h4 {
    color: var(--brand-cyan);
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .report-features ul {
    list-style: none;
    padding: 0;
  }

  .report-features li {
    color: #e2e8f0;
    font-size: 1rem;
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .report-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--brand-cyan);
    font-weight: bold;
  }

  /* Investor Section */
  .investor-section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .investor-warning {
    background: rgba(234, 88, 12, 0.1);
    border: 1px solid var(--brand-orange);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--brand-orange);
    font-weight: 600;
  }

  .investor-warning i {
    font-size: 1.25rem;
  }

  .investor-details {
    flex: 1;
    margin-bottom: 3rem;
  }

  .investor-details h4 {
    color: var(--brand-orange);
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .investor-details ul {
    list-style: none;
    padding: 0;
  }

  .investor-details li {
    color: #e2e8f0;
    font-size: 1rem;
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .investor-details li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--brand-orange);
    font-weight: bold;
  }

  /* CTA Sections */
  .cta-section {
    text-align: center;
    margin-top: auto;
    padding-top: 1rem;
  }

  .download-note,
  .disclaimer {
    font-size: 0.875rem;
    color: #94a3b8;
    margin-top: 0.75rem;
    margin-bottom: 0;
    line-height: 1.4;
  }

  .download-cta,
  .investor-cta {
    background: linear-gradient(135deg, var(--brand-cyan), var(--brand-blue));
    color: white;
    border: none;
    padding: 0.875rem 2rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 4px 15px rgba(12, 192, 223, 0.3);
    margin-bottom: 1rem;
    min-height: 3rem;
  }

  .investor-cta {
    background: linear-gradient(135deg, var(--brand-orange), #f59e0b);
    box-shadow: 0 4px 15px rgba(255, 145, 77, 0.3);
  }

  .download-cta:hover,
  .investor-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(12, 192, 223, 0.4);
  }

  .investor-cta:hover {
    box-shadow: 0 12px 35px rgba(255, 145, 77, 0.4);
  }

  .download-note,
  .disclaimer {
    color: #94a3b8;
    font-size: 0.95rem;
    font-style: italic;
    margin-top: 1rem;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .two-column-layout {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }

    .invest-landing {
      padding: 6rem 0 4rem;
    }

    .invest-title {
      font-size: 3rem;
    }

    .invest-subtitle {
      font-size: 1.2rem;
    }

    .investment-highlights {
      grid-template-columns: 1fr;
      gap: 2rem;
      margin: 4rem 0;
    }

    .highlight-item {
      padding: 2rem 1.5rem;
    }

    .column {
      padding: 2rem;
    }

    .column-header h2 {
      font-size: 1.875rem;
    }

    .download-cta,
    .investor-cta {
      padding: 1.25rem 2.5rem;
      font-size: 1.1rem;
    }
  }
</style>