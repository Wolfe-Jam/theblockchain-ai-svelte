<!-- SvelteKit Investor Dashboard - Professional Grade -->
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import PortfolioChart from '../../../lib/components/PortfolioChart.svelte';
  import ConvergenceChart from '../../../lib/components/ConvergenceChart.svelte';
  import LiveCAGR from '../../../lib/components/LiveCAGR.svelte';
  import DataSourcesTab from '../../../lib/components/DataSourcesTab.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;
  
  // Extract data with fallbacks
  $: ({ marketData, portfolioData, analyticsData, error } = data || {});
  
  // Real-time data state
  let lastUpdate = new Date();
  let isLive = true;
  let refreshInterval;
  
  // Animation stores
  const portfolioValue = tweened(0, { duration: 1500, easing: cubicOut });
  const gainLoss = tweened(0, { duration: 1200, easing: cubicOut });
  
  // Dashboard state
  let selectedTimeframe = '1M';
  let selectedView = 'overview';
  let selectedChartYear = 2025;
  let notifications = [];
  
  onMount(() => {
    // Start animations
    if (portfolioData) {
      portfolioValue.set(portfolioData.currentValue);
      gainLoss.set(portfolioData.gainLoss);
    }
    
    // Set up real-time updates
    setupRealTimeUpdates();
    
    // Load notifications
    loadNotifications();
    
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  });
  
  function setupRealTimeUpdates() {
    refreshInterval = setInterval(async () => {
      if (isLive) {
        try {
          const response = await fetch('/api/market-data');
          const newData = await response.json();
          // Update market data reactively
          marketData = newData;
          lastUpdate = new Date();
        } catch (err) {
          console.error('Real-time update failed:', err);
        }
      }
    }, 30000); // Update every 30 seconds
  }
  
  function loadNotifications() {
    notifications = portfolioData?.alerts || [];
  }
  
  function toggleLiveUpdates() {
    isLive = !isLive;
  }
  
  function changeTimeframe(timeframe) {
    selectedTimeframe = timeframe;
  }
  
  function changeView(view) {
    selectedView = view;
  }
  
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  function formatPercent(percent) {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(percent / 100);
    
    return percent >= 0 ? `+${formatted}` : formatted;
  }
</script>

<svelte:head>
  <title>Investor Dashboard | theBlockchain.ai</title>
  <meta name="description" content="Professional investor dashboard with real-time market data, portfolio analytics, and convergence economy insights." />
</svelte:head>

<div class="app-container">
{#if error}
  <div class="error-container">
    <div class="error-card">
      <i class="fas fa-exclamation-triangle"></i>
      <h2>Dashboard Unavailable</h2>
      <p>{error}</p>
      <button on:click={() => window.location.reload()} class="retry-btn">
        <i class="fas fa-redo"></i>
        Retry
      </button>
    </div>
  </div>
{:else}
  <div class="dashboard-container">
    <div class="container">
      <!-- Dashboard Header -->
      <header class="dashboard-header">
      <div class="header-left">
        <h1 class="dashboard-title">
          <i class="fas fa-chart-line"></i>
          Investor Dashboard
        </h1>
        <div class="status-indicator">
          <div class="status-dot" class:live={isLive}></div>
          <span class="status-text">
            {isLive ? 'Live Data' : 'Paused'} • Updated {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      <div class="header-actions">
        <button class="action-btn" on:click={toggleLiveUpdates}>
          <i class="fas {isLive ? 'fa-pause' : 'fa-play'}"></i>
          {isLive ? 'Pause' : 'Resume'}
        </button>
        
        <div class="view-selector">
          <button 
            class="view-btn" 
            class:active={selectedView === 'overview'}
            on:click={() => changeView('overview')}
          >
            Overview
          </button>
          <button 
            class="view-btn" 
            class:active={selectedView === 'analytics'}
            on:click={() => changeView('analytics')}
          >
            Analytics
          </button>
          <button 
            class="view-btn" 
            class:active={selectedView === 'markets'}
            data-view="markets"
            on:click={() => changeView('markets')}
          >
            Markets
          </button>
          <button 
            class="view-btn" 
            class:active={selectedView === 'sources'}
            data-view="sources"
            on:click={() => changeView('sources')}
          >
            Data Sources
          </button>
        </div>
      </div>
    </header>

    <!-- Main Dashboard Content -->
    <main class="dashboard-main">
      <!-- Live CAGR Analysis - Always Visible -->
      <LiveCAGR />
      
      {#if selectedView === 'overview'}
        <!-- Portfolio Overview -->
        <section class="portfolio-overview">
          <div class="overview-cards">
            <div class="metric-card primary portfolio">
              <div class="card-header">
                <h3>Portfolio Value</h3>
                <i class="fas fa-wallet"></i>
              </div>
              <div class="card-value">
                {formatCurrency($portfolioValue)}
              </div>
              <div class="card-change positive">
                <i class="fas fa-arrow-up"></i>
                {formatPercent(portfolioData?.gainLossPercent || 0)}
              </div>
            </div>
            
            <div class="metric-card gain-loss">
              <div class="card-header">
                <h3>Total Gain/Loss</h3>
                <i class="fas fa-chart-bar"></i>
              </div>
              <div class="card-value gain">
                {formatCurrency($gainLoss)}
              </div>
              <div class="card-subtitle">
                Since inception
              </div>
            </div>
            
            <div class="metric-card">
              <div class="card-header">
                <h3>Performance Rank</h3>
                <i class="fas fa-trophy"></i>
              </div>
              <div class="card-value rank">
                Top {analyticsData?.performanceRank || 0}%
              </div>
              <div class="card-subtitle">
                Among all investors
              </div>
            </div>
            
            <div class="metric-card">
              <div class="card-header">
                <h3>Risk Score</h3>
                <i class="fas fa-shield-alt"></i>
              </div>
              <div class="card-value risk">
                {analyticsData?.riskScore || 'N/A'}
              </div>
              <div class="card-subtitle">
                Diversification: {analyticsData?.diversificationScore || 0}%
              </div>
            </div>
          </div>
        </section>

        <!-- Performance Timeframe Selector -->
        <section class="performance-section">
          <div class="section-header">
            <h2>Performance</h2>
            <div class="timeframe-selector">
              {#each ['1D', '1W', '1M', '3M', '6M', '1Y'] as timeframe}
                <button 
                  class="timeframe-btn"
                  class:active={selectedTimeframe === timeframe}
                  on:click={() => changeTimeframe(timeframe)}
                >
                  {timeframe}
                </button>
              {/each}
            </div>
          </div>
          
          <div class="performance-display">
            <div class="performance-value">
              {formatPercent(portfolioData?.performance?.[selectedTimeframe] || 0)}
            </div>
            <div class="performance-period">
              {selectedTimeframe} Performance
            </div>
          </div>
          
          <!-- Enhanced Portfolio Performance Chart -->
          <PortfolioChart {portfolioData} timeframe={selectedTimeframe} />
        </section>
      {/if}

      {#if selectedView === 'markets'}
        <!-- Enhanced Convergence Market Visualization -->
        <ConvergenceChart {marketData} selectedYear={selectedChartYear} />
        
        <!-- Real-Time Market Data -->
        <section class="market-data-section">
          <h2>Market Intelligence</h2>
          
          {#if marketData?.data}
            <div class="market-grid">
              {#each Object.entries(marketData.data) as [segment, data]}
                {#if segment !== 'convergence'}
                  <div class="market-card">
                    <div class="market-header">
                      <h3>{segment.toUpperCase()}</h3>
                      <div class="market-value">
                        ${data.current?.toFixed(2)}T
                      </div>
                    </div>
                    
                    <div class="market-stats">
                      <div class="stat">
                        <span class="stat-label">Change</span>
                        <span class="stat-value" class:positive={data.change > 0} class:negative={data.change < 0}>
                          {data.change > 0 ? '+' : ''}{data.change?.toFixed(2)}T
                        </span>
                      </div>
                      
                      <div class="stat">
                        <span class="stat-label">% Change</span>
                        <span class="stat-value" class:positive={data.changePercent > 0} class:negative={data.changePercent < 0}>
                          {formatPercent(data.changePercent)}
                        </span>
                      </div>
                      
                      <div class="stat">
                        <span class="stat-label">Volume</span>
                        <span class="stat-value">{data.volume}</span>
                      </div>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
            
            <!-- Convergence Overview -->
            {#if marketData.data.convergence}
              <div class="convergence-card">
                <h2>Convergence Economy</h2>
                <div class="convergence-stats">
                  <div class="convergence-stat">
                    <span class="stat-label">Total Market</span>
                    <span class="stat-value primary">${marketData.data.convergence.total}T</span>
                  </div>
                  <div class="convergence-stat">
                    <span class="stat-label">Growth Multiple</span>
                    <span class="stat-value gain">{marketData.data.convergence.growth}x</span>
                  </div>
                  <div class="convergence-stat">
                    <span class="stat-label">Projected CAGR</span>
                    <span class="stat-value">{marketData.data.convergence.projectedCAGR}%</span>
                  </div>
                  <div class="convergence-stat">
                    <span class="stat-label">Opportunity</span>
                    <span class="stat-value opportunity">{marketData.data.convergence.opportunity}</span>
                  </div>
                </div>
              </div>
            {/if}
          {/if}
        </section>
      {/if}

      {#if selectedView === 'analytics'}
        <!-- Portfolio Positions -->
        <section class="positions-section">
          <h2>Portfolio Positions</h2>
          
          {#if portfolioData?.positions}
            <div class="positions-table">
              <div class="table-header">
                <div class="th">Symbol</div>
                <div class="th">Investment</div>
                <div class="th">Current Value</div>
                <div class="th">Gain/Loss</div>
                <div class="th">% Return</div>
                <div class="th">Sector</div>
              </div>
              
              {#each portfolioData.positions as position}
                <div class="table-row">
                  <div class="td symbol">
                    <div class="position-name">
                      <strong>{position.symbol}</strong>
                      <span>{position.name}</span>
                    </div>
                  </div>
                  <div class="td">{formatCurrency(position.investment)}</div>
                  <div class="td">{formatCurrency(position.currentValue)}</div>
                  <div class="td gain">{formatCurrency(position.gainLoss)}</div>
                  <div class="td percent positive">{formatPercent(position.gainLossPercent)}</div>
                  <div class="td sector">
                    <span class="sector-badge {position.sector.toLowerCase()}">{position.sector}</span>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </section>
      {/if}

      {#if selectedView === 'sources'}
        <!-- Data Sources & Methodology -->
        <DataSourcesTab />
      {/if}

      <!-- Notifications Panel -->
      {#if notifications?.length > 0}
        <section class="notifications-section">
          <h2>
            <i class="fas fa-bell"></i>
            Alerts & Updates
          </h2>
          
          <div class="notifications-list">
            {#each notifications as notification}
              <div class="notification-card {notification.type}">
                <div class="notification-icon">
                  {#if notification.type === 'opportunity'}
                    <i class="fas fa-chart-line"></i>
                  {:else if notification.type === 'milestone'}
                    <i class="fas fa-trophy"></i>
                  {:else}
                    <i class="fas fa-info-circle"></i>
                  {/if}
                </div>
                
                <div class="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span class="notification-time">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/if}
    </main>
    </div> <!-- End container -->
  </div>
{/if}

  <!-- Footer removed - handled by main layout -->
</div>

<style>
  .app-container {
    min-height: 100vh;
    background-color: #020617;
    color: #f8fafc;
  }

  /* CSS Variables for Dashboard */
  :global(:root) {
    --dashboard-bg: #0f172a;
    --card-bg: #1e293b;
    --border-color: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #64748b;
    --brand-orange: #ff914d;
    --brand-cyan: #0cc0df;
    --brand-blue: #004aae;
    --success: #10b981;
    --danger: #ef4444;
    --warning: #f59e0b;
    --convergence-green: #10b981; /* Positive "GO" green for convergence */
  }

  /* Override dashboard background for integration */
  :global(.dashboard-container) {
    background: transparent !important;
  }

  /* Container for proper centering and max-width */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
  }

  /* Dashboard Layout */
  .dashboard-container {
    min-height: 100vh;
    padding: 2rem 0;
    background: var(--dashboard-bg);
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
  }

  .dashboard-main {
    max-width: 100%;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .dashboard-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .dashboard-title i {
    color: var(--brand-cyan);
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    transition: background-color 0.3s ease;
  }

  .status-dot.live {
    background: var(--success);
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  }

  .status-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .action-btn {
    background: var(--brand-orange);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .action-btn:hover {
    background: var(--brand-cyan);
    transform: translateY(-1px);
  }

  .view-selector {
    display: flex;
    background: var(--dashboard-bg);
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: 1px solid var(--border-color);
    min-width: 350px; /* Accommodate four buttons */
  }

  .view-btn {
    background: none;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    color: var(--text-secondary);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.875rem;
  }

  .view-btn.active {
    background: var(--brand-cyan);
    color: white;
  }

  /* Special convergence tab styling */
  .view-btn[data-view="convergence"].active {
    background: var(--convergence-green);
    color: white;
  }

  .view-btn:hover:not(.active) {
    background: var(--border-color);
    color: var(--text-primary);
  }

  /* Portfolio Overview */
  .portfolio-overview {
    margin-bottom: 3rem;
  }

  .overview-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .metric-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.5rem;
    position: relative;
    transition: all 0.3s ease;
  }

  .metric-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--brand-orange), var(--brand-cyan));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(12, 192, 223, 0.1);
    border-color: var(--brand-cyan);
  }

  .metric-card:hover::before {
    opacity: 1;
  }

  .metric-card.primary.portfolio {
    background: linear-gradient(135deg, var(--card-bg) 0%, rgba(16, 185, 129, 0.05) 100%);
    border-color: var(--success);
  }

  .metric-card.primary.portfolio .card-header i {
    color: var(--success);
  }

  .metric-card.gain-loss {
    border: 1px solid var(--success);
    background: linear-gradient(135deg, var(--card-bg) 0%, rgba(16, 185, 129, 0.03) 100%);
  }

  .metric-card.gain-loss .card-header i {
    color: var(--success);
  }

  .metric-card.primary {
    background: linear-gradient(135deg, var(--card-bg) 0%, rgba(12, 192, 223, 0.05) 100%);
    border-color: var(--brand-cyan);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .card-header h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .card-header i {
    color: var(--brand-cyan);
    font-size: 1.25rem;
  }

  .card-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-family: 'Roboto Mono', monospace;
  }

  .card-value.gain {
    color: var(--success);
  }

  .card-value.rank {
    color: var(--brand-orange);
  }

  .card-value.risk {
    color: var(--warning);
  }

  .card-change {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .card-change.positive {
    color: var(--success);
  }

  .card-change.negative {
    color: var(--danger);
  }

  .card-subtitle {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  /* Performance Section */
  .performance-section {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 3rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .timeframe-selector {
    display: flex;
    background: var(--dashboard-bg);
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: 1px solid var(--border-color);
  }

  .timeframe-btn {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    color: var(--text-secondary);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.875rem;
  }

  .timeframe-btn.active {
    background: var(--brand-orange);
    color: white;
  }

  .timeframe-btn:hover:not(.active) {
    background: var(--border-color);
    color: var(--text-primary);
  }

  .performance-display {
    text-align: center;
  }

  .performance-value {
    font-size: 3rem;
    font-weight: 700;
    color: var(--success);
    font-family: 'Roboto Mono', monospace;
    margin-bottom: 0.5rem;
  }

  .performance-period {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  /* Market Data Section */
  .market-data-section {
    margin-bottom: 3rem;
  }

  .market-data-section h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .market-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .market-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .market-card:hover {
    transform: translateY(-2px);
    border-color: var(--brand-orange);
    box-shadow: 0 10px 30px rgba(255, 145, 77, 0.1);
  }

  .market-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .market-header h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--brand-cyan);
    margin: 0;
    letter-spacing: 0.05em;
  }

  .market-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: 'Roboto Mono', monospace;
  }

  .market-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  .stat-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .stat-value.positive {
    color: var(--success);
  }

  .stat-value.negative {
    color: var(--danger);
  }

  .stat-value.primary {
    color: var(--brand-cyan);
  }

  .stat-value.gain {
    color: var(--success);
  }

  .stat-value.opportunity {
    color: var(--convergence-green);
    font-weight: 700;
  }

  /* Convergence Card */
  .convergence-card {
    background: linear-gradient(135deg, var(--card-bg) 0%, rgba(16, 185, 129, 0.05) 100%);
    border: 1px solid var(--convergence-green);
    border-radius: 1rem;
    padding: 2rem;
    margin-top: 2rem;
  }

  .convergence-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--convergence-green);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .convergence-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .convergence-stat {
    text-align: center;
  }

  .convergence-stat .stat-label {
    display: block;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .convergence-stat .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
  }

  /* Positions Table */
  .positions-section {
    margin-bottom: 3rem;
  }

  .positions-section h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 2rem;
  }

  .positions-table {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    overflow: hidden;
  }

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--dashboard-bg);
    border-bottom: 1px solid var(--border-color);
  }

  .th {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.3s ease;
  }

  .table-row:hover {
    background: rgba(12, 192, 223, 0.05);
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .td {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: var(--text-primary);
  }

  .td.symbol {
    flex-direction: column;
    align-items: flex-start;
  }

  .position-name strong {
    font-weight: 700;
    color: var(--brand-cyan);
    margin-bottom: 0.25rem;
    display: block;
  }

  .position-name span {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .td.gain {
    color: var(--success);
    font-weight: 600;
  }

  .td.percent.positive {
    color: var(--success);
    font-weight: 600;
  }

  .sector-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sector-badge.blockchain {
    background: rgba(255, 145, 77, 0.2);
    color: var(--brand-orange);
  }

  .sector-badge.software {
    background: rgba(0, 74, 174, 0.2);
    color: var(--brand-blue);
  }

  .sector-badge.ai {
    background: rgba(12, 192, 223, 0.2);
    color: var(--brand-cyan);
  }

  /* Notifications */
  .notifications-section {
    margin-bottom: 3rem;
  }

  .notifications-section h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .notifications-section h2 i {
    color: var(--warning);
  }

  .notifications-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .notification-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  .notification-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .notification-card.opportunity {
    border-left: 4px solid var(--success);
  }

  .notification-card.milestone {
    border-left: 4px solid var(--brand-orange);
  }

  .notification-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }

  .notification-card.opportunity .notification-icon {
    background: rgba(16, 185, 129, 0.2);
    color: var(--success);
  }

  .notification-card.milestone .notification-icon {
    background: rgba(255, 145, 77, 0.2);
    color: var(--brand-orange);
  }

  .notification-content {
    flex: 1;
  }

  .notification-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
  }

  .notification-content p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
  }

  .notification-time {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  /* Error State */
  .error-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--dashboard-bg);
    padding: 2rem;
  }

  .error-card {
    background: var(--card-bg);
    border: 1px solid var(--danger);
    border-radius: 1rem;
    padding: 3rem;
    text-align: center;
    max-width: 400px;
  }

  .error-card i {
    font-size: 3rem;
    color: var(--danger);
    margin-bottom: 1rem;
  }

  .error-card h2 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .error-card p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .retry-btn {
    background: var(--brand-blue);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 auto;
  }

  .retry-btn:hover {
    background: var(--brand-cyan);
    transform: translateY(-1px);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }

    .dashboard-container {
      padding: 1rem 0;
    }

    .dashboard-header {
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .header-actions {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .view-selector {
      width: 100%;
    }

    .overview-cards {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .market-grid {
      grid-template-columns: 1fr;
    }

    .convergence-stats {
      grid-template-columns: 1fr 1fr;
    }

    .table-header,
    .table-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .th,
    .td {
      text-align: left;
    }

    .section-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .timeframe-selector {
      width: 100%;
      justify-content: space-between;
    }

    .dashboard-title {
      font-size: 1.5rem;
    }
  }

  /* Performance Optimizations */
  .metric-card,
  .market-card,
  .notification-card {
    will-change: transform;
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Focus States */
  .action-btn:focus,
  .view-btn:focus,
  .timeframe-btn:focus,
  .retry-btn:focus {
    outline: 2px solid var(--brand-cyan);
    outline-offset: 2px;
  }

  /* Print Styles */
  @media print {
    .dashboard-header,
    .header-actions,
    .action-btn {
      display: none;
    }

    .dashboard-container {
      background: white;
      color: black;
    }

    .metric-card,
    .market-card,
    .convergence-card,
    .positions-table {
      border: 1px solid #000;
      box-shadow: none;
    }
  }
</style>
