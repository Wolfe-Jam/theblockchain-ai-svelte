<!-- Vanilla Svelte Investor Dashboard Component -->
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  // Simulate the same functionality as SvelteKit version
  let marketData = null;
  let portfolioData = null;
  let analyticsData = null;
  let error = null;
  let loading = true;
  
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
  let notifications = [];
  
  onMount(async () => {
    await loadData();
    
    // Start animations
    if (portfolioData) {
      portfolioValue.set(portfolioData.currentValue);
      gainLoss.set(portfolioData.gainLoss);
    }
    
    // Set up real-time updates
    setupRealTimeUpdates();
    
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  });
  
  async function loadData() {
    try {
      // Simulate API calls with static data
      marketData = {
        timestamp: new Date().toISOString(),
        data: {
          ai: { current: 3.68, change: 0.12, changePercent: 3.37, volume: '2.1B' },
          blockchain: { current: 5.85, change: 0.45, changePercent: 8.33, volume: '890M' },
          software: { current: 1.90, change: -0.05, changePercent: -2.56, volume: '1.5B' },
          convergence: { total: 11.43, growth: 847.2, projectedCAGR: 67.8, opportunity: 'Historic' }
        }
      };
      
      portfolioData = {
        totalInvestment: 250000,
        currentValue: 347500,
        gainLoss: 97500,
        gainLossPercent: 39.0,
        positions: [
          {
            symbol: 'BLOCKCHAIN-AI',
            name: 'Blockchain AI Convergence',
            investment: 150000,
            currentValue: 217500,
            shares: 15000,
            pricePerShare: 14.50,
            gainLoss: 67500,
            gainLossPercent: 45.0,
            sector: 'Blockchain'
          },
          {
            symbol: 'OUTPUT-MKT',
            name: 'OUTPUT Marketplace',
            investment: 75000,
            currentValue: 97500,
            shares: 7500,
            pricePerShare: 13.00,
            gainLoss: 22500,
            gainLossPercent: 30.0,
            sector: 'Software'
          }
        ],
        performance: {
          '1D': 2.3, '1W': 8.7, '1M': 15.2, '3M': 28.5, '6M': 39.0, '1Y': 39.0
        },
        alerts: [
          {
            type: 'opportunity',
            title: 'Blockchain Sector Surge',
            message: 'Blockchain market showing 90%+ CAGR acceleration',
            timestamp: new Date().toISOString(),
            priority: 'high'
          }
        ]
      };
      
      analyticsData = {
        riskScore: 'Medium-High',
        diversificationScore: 85,
        performanceRank: 12
      };
      
      notifications = portfolioData.alerts;
      loading = false;
      
    } catch (err) {
      error = 'Unable to load dashboard data';
      loading = false;
    }
  }
  
  function setupRealTimeUpdates() {
    refreshInterval = setInterval(async () => {
      if (isLive) {
        // Simulate data updates
        lastUpdate = new Date();
        // Add small random variations to market data
        if (marketData?.data) {
          Object.keys(marketData.data).forEach(key => {
            if (marketData.data[key].current) {
              const fluctuation = (Math.random() - 0.5) * 0.02;
              marketData.data[key].current *= (1 + fluctuation);
            }
          });
          marketData = { ...marketData }; // Trigger reactivity
        }
      }
    }, 30000);
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

{#if loading}
  <div class="loading-container">
    <div class="loading-spinner">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading Dashboard...</p>
    </div>
  </div>
{:else if error}
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
            on:click={() => changeView('markets')}
          >
            Markets
          </button>
        </div>
      </div>
    </header>

    <!-- Main Dashboard Content -->
    <main class="dashboard-main">
      {#if selectedView === 'overview'}
        <!-- Portfolio Overview -->
        <section class="portfolio-overview">
          <div class="overview-cards">
            <div class="metric-card primary">
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
            
            <div class="metric-card">
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

        <!-- Performance Section -->
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
        </section>
      {/if}

      {#if selectedView === 'markets'}
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
  </div>
{/if}
: 1rem;
    font-weight: 600;
    color: #F8FAFC;
  }

  .stat-value.positive {
    color: #10B981;
  }

  .stat-value.negative {
    color: #EF4444;
  }

  .stat-value.primary {
    color: #0CC0DF;
  }

  .stat-value.gain {
    color: #10B981;
  }

  .stat-value.opportunity {
    color: #FF914D;
    font-weight: 700;
  }

  /* Convergence Card */
  .convergence-card {
    background: linear-gradient(135deg, #1E293B 0%, rgba(255, 145, 77, 0.05) 100%);
    border: 1px solid #FF914D;
    border-radius: 1rem;
    padding: 2rem;
    margin-top: 2rem;
  }

  .convergence-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #FF914D;
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
    color: #CBD5E1;
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
    color: #F8FAFC;
    margin-bottom: 2rem;
  }

  .positions-table {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 1rem;
    overflow: hidden;
  }

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #0F172A;
    border-bottom: 1px solid #334155;
  }

  .th {
    font-size: 0.75rem;
    font-weight: 700;
    color: #CBD5E1;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #334155;
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
    color: #F8FAFC;
  }

  .td.symbol {
    flex-direction: column;
    align-items: flex-start;
  }

  .position-name strong {
    font-weight: 700;
    color: #0CC0DF;
    margin-bottom: 0.25rem;
    display: block;
  }

  .position-name span {
    font-size: 0.75rem;
    color: #94A3B8;
  }

  .td.gain {
    color: #10B981;
    font-weight: 600;
  }

  .td.percent.positive {
    color: #10B981;
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
    color: #FF914D;
  }

  .sector-badge.software {
    background: rgba(0, 74, 174, 0.2);
    color: #004AAE;
  }

  .sector-badge.ai {
    background: rgba(12, 192, 223, 0.2);
    color: #0CC0DF;
  }

  /* Notifications */
  .notifications-section {
    margin-bottom: 3rem;
  }

  .notifications-section h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #F8FAFC;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .notifications-section h2 i {
    color: #F59E0B;
  }

  .notifications-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .notification-card {
    background: #1E293B;
    border: 1px solid #334155;
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
    border-left: 4px solid #10B981;
  }

  .notification-card.milestone {
    border-left: 4px solid #FF914D;
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
    color: #10B981;
  }

  .notification-card.milestone .notification-icon {
    background: rgba(255, 145, 77, 0.2);
    color: #FF914D;
  }

  .notification-content {
    flex: 1;
  }

  .notification-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #F8FAFC;
    margin: 0 0 0.5rem 0;
  }

  .notification-content p {
    font-size: 0.875rem;
    color: #CBD5E1;
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
  }

  .notification-time {
    font-size: 0.75rem;
    color: #94A3B8;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .dashboard-header {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .header-actions {
      width: 100%;
      justify-content: space-between;
    }

    .dashboard-main {
      padding: 1rem;
    }

    .overview-cards {
      grid-template-columns: 1fr;
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

    .view-selector {
      width: 100%;
    }
  }

  /* Focus States */
  .action-btn:focus,
  .view-btn:focus,
  .timeframe-btn:focus,
  .retry-btn:focus {
    outline: 2px solid #0CC0DF;
    outline-offset: 2px;
  }
</style>
