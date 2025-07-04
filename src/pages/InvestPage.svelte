<!-- src/pages/InvestPage.svelte -->
<script>
  import { onMount } from 'svelte';
  import InvestorModal from '../components/InvestorModal.svelte';
  import ReportDownload from '../components/ReportDownload.svelte';
  
  let showModal = false;
  let showReportDownload = false;
  
  onMount(() => {
    // Ensure professional focus
    document.title = "Investment Opportunity | theBlockchain.ai";
    // Removed auto-open modal - let users choose their action
  });
  
  function openInvestorModal() {
    showModal = true;
  }
  
  function openReportDownload() {
    showReportDownload = true;
  }
</script>

<!-- Investment Landing -->
<div class="invest-landing">
  <div class="container">
    <h1 class="invest-title">Investment Opportunity</h1>
    <p class="invest-subtitle">All code on blockchain. Every transaction. All Smart Contracts. Zero fraud, devs get paid. Trusted AI from theBlockchain.ai - the Authority in Open-Source matters on the BC.</p>

    <div class="investment-highlights">
      <div class="highlight-item">
        <div class="highlight-icon sun-bg">
          <i class="fas fa-chart-line"></i>
        </div>
        <h3>Massive Market</h3>
        <p>Multi-trillion dollar convergent economy at the intersection of AI, blockchain, and software development</p>
      </div>
      
      <div class="highlight-item">
        <div class="highlight-icon trust-bg">
          <img src="/theBlockchain-ai-logo.svg" alt="theBlockchain.ai" class="trust-logo">
        </div>
        <h3>Zero Fraud</h3>
        <p>First-ever blockchain-based development platform ensuring complete transparency and trust</p>
      </div>
      
      <div class="highlight-item">
        <div class="highlight-icon ocean-bg">
          <i class="fas fa-rocket"></i>
        </div>
        <h3>Unique Platform</h3>
        <p>Revolutionary three-pillar strategy: OUTPUT Marketplace, Code-In-Action, and theBlockchain infrastructure</p>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="two-column-layout">
      <!-- Column A: PDF Download -->
      <div class="column column-a">
        <div class="column-header">
          <h2>Professional PDF Report</h2>
          <p class="column-subtitle">For Investors, Developers, Researchers & General Interest. Students welcome!</p>
        </div>
        
        <div class="pdf-section">
          <div class="report-info">
            <h3>"The Convergent Economy" Market Research</h3>
            <p class="report-description">Comprehensive 26-page analysis of the convergent AI, Software, and Blockchain economy with professional insights and market data.</p>
            
            <div class="report-details">
              <h3>Professional Report Features:</h3>
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
              <i class="fas fa-download"></i>
              Download Professional Report
            </button>
            
            <p class="download-note">Free access with professional details</p>
          </div>
        </div>
      </div>
      
      <!-- Column B: Serious Investors -->
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
            <h3>Investment Opportunity Details:</h3>
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

<!-- Investor Modal -->
<InvestorModal bind:isOpen={showModal} />

<!-- Report Download Modal -->
<ReportDownload bind:isOpen={showReportDownload} />

<style lang="postcss">
  :root {
    --brand-sky: #17A2B8;
    --brand-ocean: #007BFF;
    --brand-sun: #FD7E14;
    --brand-trust: #28A745;
    --blockchain-blue: #004AAE;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .invest-landing {
    background: linear-gradient(135deg, var(--brand-ocean) 0%, #0f172a 50%, var(--brand-sky) 100%);
    padding: 6rem 0 4rem;
    text-align: center;
    position: relative;
  }
  
  .invest-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--brand-sky), var(--brand-ocean));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.6;
  }
  
  .invest-subtitle {
    font-size: 1.25rem;
    color: #e2e8f0;
    max-width: 800px;
    margin: 0 auto 3rem;
    line-height: 1.6;
  }
  
  .investment-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 900px;
    margin: 0 auto 4rem auto;
  }
  
  .highlight-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .highlight-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  /* Two Column Layout */
  .two-column-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 0;
    align-items: stretch; /* Equal height cards */
  }
  
  .column {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .column:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  .column-a {
    border-left: 4px solid var(--brand-sky);
  }
  
  .column-b {
    border-left: 4px solid var(--brand-sun);
  }
  
  .column-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .column-header h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .column-a .column-header h2 {
    color: var(--brand-sky);
  }
  
  .column-b .column-header h2 {
    color: var(--brand-sun);
  }
  
  .column-subtitle {
    color: #cbd5e1;
    font-size: 1rem;
    font-style: italic;
  }
  
  /* PDF Section Styles */
  .pdf-section {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between; /* Push button to bottom */
  }
  
  .report-info h3 {
    color: var(--brand-sky);
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .report-description {
    color: #e2e8f0;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .report-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem; /* Consistent spacing */
  }
  
  /* Report features now styled in .report-details */
  
  .report-details {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 2rem;
    text-align: left;
  }
  
  .report-details h3 {
    color: var(--brand-sky);
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .report-details ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .report-details li {
    color: #cbd5e1;
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .report-details li::before {
    content: "•";
    color: var(--brand-sky);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
  
  .download-cta {
    background: linear-gradient(135deg, var(--brand-sky), var(--brand-ocean));
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    margin: 0 auto 1rem;
  }
  
  .download-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
  }
  
  .download-note {
    color: #94a3b8;
    font-size: 0.875rem;
    font-style: italic;
  }
  
  /* Investor Section Styles */
  .investor-section {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between; /* Push button to bottom */
  }
  
  .investor-warning {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(253, 126, 20, 0.1);
    color: var(--brand-sun);
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(253, 126, 20, 0.3);
    margin-bottom: 2rem;
    font-weight: 600;
  }
  
  .investor-details {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 2rem;
    text-align: left;
  }
  
  .investor-details h3 {
    color: var(--brand-sun);
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .investor-details ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .investor-details li {
    color: #cbd5e1;
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .investor-details li::before {
    content: "✓";
    color: var(--brand-trust);
    font-weight: bold;
    position: absolute;
    left: 0;
  }

  /* CTA Section Alignment */
  .cta-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto; /* Push to bottom */
    min-height: 100px; /* Ensure consistent height */
    justify-content: center; /* Center button vertically in this space */
  }
  
  .investor-cta {
    background: linear-gradient(135deg, var(--blockchain-blue), var(--brand-ocean));
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    margin: 0 auto 1rem;
  }
  
  .investor-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(253, 126, 20, 0.4);
  }
  
  .disclaimer {
    color: #94a3b8;
    font-size: 0.875rem;
    font-style: italic;
  }
  
  .highlight-item h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: white;
  }
  
  .highlight-item p {
    color: #cbd5e1;
    line-height: 1.5;
  }
  
  .highlight-icon {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    color: white;
  }
  
  .ocean-bg {
    background: var(--blockchain-blue);
    color: white;
  }
  
  .sun-bg {
    background: var(--brand-sun);
    color: white;
  }
  
  .trust-bg {
    background: black;
    color: white;
    border: 2px solid black;
  }
  
  .trust-logo {
    width: 85%;
    height: 85%;
    border-radius: 50%;
  }
  
  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
    
    .invest-title {
      font-size: 2.5rem;
    }
    
    .investment-highlights {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .highlight-item {
      padding: 1.5rem;
    }
    
    .two-column-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .column {
      padding: 1.5rem;
    }
  }
</style>