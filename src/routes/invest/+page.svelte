<!-- SvelteKit Investment Hub - Integration Demo -->
<script>
  import { onMount } from 'svelte';
  
  let marketData = null;
  let loading = true;
  
  onMount(async () => {
    try {
      // Demonstrate SvelteKit API integration
      const response = await fetch('/api/market-data');
      marketData = await response.json();
    } catch (error) {
      console.error('Failed to load market data:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>SvelteKit Investment Hub | theBlockchain.ai</title>
  <meta name="description" content="Professional investment platform powered by SvelteKit with real-time market data and advanced analytics." />
</svelte:head>

<div class="investment-hub">
  <div class="hub-container">
    <header class="hub-header">
      <h1 class="hub-title">
        <i class="fas fa-rocket"></i>
        SvelteKit Investment Platform
      </h1>
      <p class="hub-subtitle">
        Professional-grade investment tools powered by SvelteKit's full-stack capabilities
      </p>
    </header>

    <div class="feature-showcase">
      <div class="feature-grid">
        <!-- Real-time Market Data -->
        <div class="feature-card primary">
          <div class="feature-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <h3>Real-Time Market Data</h3>
          <p>Live market feeds with server-side APIs and automatic updates</p>
          
          {#if loading}
            <div class="loading-indicator">
              <i class="fas fa-spinner fa-spin"></i>
              Loading market data...
            </div>
          {:else if marketData}
            <div class="data-preview">
              <div class="data-point">
                <span class="label">Total Market</span>
                <span class="value">${marketData.data?.convergence?.total || 'N/A'}T</span>
              </div>
              <div class="data-point">
                <span class="label">Last Updated</span>
                <span class="value">{new Date(marketData.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          {:else}
            <div class="error-state">
              <i class="fas fa-exclamation-triangle"></i>
              Failed to load data
            </div>
          {/if}
        </div>

        <!-- Professional Dashboard -->
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-tachometer-alt"></i>
          </div>
          <h3>Professional Dashboard</h3>
          <p>Advanced analytics, portfolio management, and investor tools</p>
          <a href="/invest/dashboard" class="feature-cta">
            <span>Launch Dashboard</span>
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>

        <!-- SvelteKit Architecture -->
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-cogs"></i>
          </div>
          <h3>SvelteKit Architecture</h3>
          <p>Server-side rendering, API routes, and advanced routing capabilities</p>
          <div class="tech-badges">
            <span class="badge">SSR</span>
            <span class="badge">API Routes</span>
            <span class="badge">Real-time</span>
            <span class="badge">TypeScript</span>
          </div>
        </div>
      </div>
    </div>

    <section class="capabilities-section">
      <h2>SvelteKit Capabilities Demonstrated</h2>
      <div class="capabilities-grid">
        <div class="capability">
          <div class="capability-header">
            <i class="fas fa-server"></i>
            <h4>Server-Side APIs</h4>
          </div>
          <ul>
            <li>Real-time market data endpoints</li>
            <li>Portfolio management APIs</li>
            <li>Authentication & authorization</li>
            <li>Data validation & processing</li>
          </ul>
        </div>

        <div class="capability">
          <div class="capability-header">
            <i class="fas fa-route"></i>
            <h4>Advanced Routing</h4>
          </div>
          <ul>
            <li>File-based routing system</li>
            <li>Dynamic route parameters</li>
            <li>Layout inheritance</li>
            <li>Nested route structures</li>
          </ul>
        </div>

        <div class="capability">
          <div class="capability-header">
            <i class="fas fa-database"></i>
            <h4>Data Loading</h4>
          </div>
          <ul>
            <li>Server-side data fetching</li>
            <li>Progressive enhancement</li>
            <li>Error boundary handling</li>
            <li>Reactive data updates</li>
          </ul>
        </div>

        <div class="capability">
          <div class="capability-header">
            <i class="fas fa-bolt"></i>
            <h4>Performance</h4>
          </div>
          <ul>
            <li>Static site generation</li>
            <li>Code splitting</li>
            <li>Optimized bundles</li>
            <li>Fast navigation</li>
          </ul>
        </div>
      </div>
    </section>

    <div class="navigation-section">
      <h2>Explore Investment Platform</h2>
      <div class="nav-cards">
        <a href="/invest/dashboard" class="nav-card primary">
          <i class="fas fa-chart-bar"></i>
          <h3>Investor Dashboard</h3>
          <p>Professional portfolio management and real-time analytics</p>
          <span class="nav-arrow">→</span>
        </a>

        <a href="/invest" class="nav-card">
          <i class="fas fa-home"></i>
          <h3>Main Investment Page</h3>
          <p>Return to the main investment opportunity presentation</p>
          <span class="nav-arrow">→</span>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .investment-hub {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 2rem 0;
  }

  .hub-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hub-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .hub-title {
    font-size: 3rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .hub-title i {
    color: #0CC0DF;
  }

  .hub-subtitle {
    font-size: 1.25rem;
    color: #cbd5e1;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .feature-showcase {
    margin-bottom: 4rem;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 1rem;
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #FF914D, #0CC0DF);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    border-color: #0CC0DF;
    box-shadow: 0 20px 40px rgba(12, 192, 223, 0.1);
  }

  .feature-card:hover::before {
    opacity: 1;
  }

  .feature-card.primary {
    background: linear-gradient(135deg, #1e293b 0%, rgba(12, 192, 223, 0.05) 100%);
    border-color: #0CC0DF;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #FF914D, #0CC0DF);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1.5rem;
  }

  .feature-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 1rem;
  }

  .feature-card p {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .loading-indicator,
  .error-state {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 0.875rem;
  }

  .data-preview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .data-point {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .data-point .label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .data-point .value {
    font-size: 1rem;
    font-weight: 700;
    color: #0CC0DF;
    font-family: 'Roboto Mono', monospace;
  }

  .feature-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #004AAE;
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .feature-cta:hover {
    background: #0CC0DF;
    transform: translateY(-1px);
  }

  .tech-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .badge {
    background: rgba(12, 192, 223, 0.2);
    color: #0CC0DF;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .capabilities-section {
    margin-bottom: 4rem;
  }

  .capabilities-section h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #f8fafc;
    text-align: center;
    margin-bottom: 3rem;
  }

  .capabilities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .capability {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 1rem;
    padding: 1.5rem;
  }

  .capability-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .capability-header i {
    color: #FF914D;
    font-size: 1.25rem;
  }

  .capability-header h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0;
  }

  .capability ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .capability li {
    color: #cbd5e1;
    padding: 0.5rem 0;
    border-bottom: 1px solid #334155;
    position: relative;
    padding-left: 1.5rem;
  }

  .capability li:last-child {
    border-bottom: none;
  }

  .capability li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: 700;
  }

  .navigation-section h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #f8fafc;
    text-align: center;
    margin-bottom: 3rem;
  }

  .nav-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }

  .nav-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 1rem;
    padding: 2rem;
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
  }

  .nav-card:hover {
    transform: translateY(-3px);
    border-color: #0CC0DF;
    box-shadow: 0 15px 30px rgba(12, 192, 223, 0.1);
  }

  .nav-card.primary {
    background: linear-gradient(135deg, #1e293b 0%, rgba(255, 145, 77, 0.05) 100%);
    border-color: #FF914D;
  }

  .nav-card.primary:hover {
    border-color: #FF914D;
    box-shadow: 0 15px 30px rgba(255, 145, 77, 0.1);
  }

  .nav-card i {
    font-size: 2rem;
    color: #0CC0DF;
  }

  .nav-card.primary i {
    color: #FF914D;
  }

  .nav-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0;
  }

  .nav-card p {
    color: #cbd5e1;
    line-height: 1.6;
    margin: 0;
    flex: 1;
  }

  .nav-arrow {
    font-size: 1.5rem;
    color: #0CC0DF;
    font-weight: 700;
    align-self: flex-end;
    transition: transform 0.3s ease;
  }

  .nav-card:hover .nav-arrow {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    .hub-title {
      font-size: 2rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .capabilities-grid {
      grid-template-columns: 1fr;
    }

    .nav-cards {
      grid-template-columns: 1fr;
    }

    .data-preview {
      grid-template-columns: 1fr;
    }
  }
</style>
