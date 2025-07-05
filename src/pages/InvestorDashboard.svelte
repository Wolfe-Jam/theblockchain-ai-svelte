
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

<style lang="postcss">
  /* Investor Dashboard Styles - Vanilla Svelte Version */
  .loading-container,
  .error-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0F172A;
    padding: 2rem;
  }

  .loading-spinner {
    text-align: center;
    color: #F8FAFC;
  }

  .loading-spinner i {
    font-size: 3rem;
    color: #0CC0DF;
    margin-bottom: 1rem;
  }

  .error-card {
    background: #1E293B;
    border: 1px solid #EF4444;
    border-radius: 1rem;
    padding: 3rem;
    text-align: center;
    max-width: 400px;
    color: #F8FAFC;
  }

  .error-card i {
    font-size: 3rem;
    color: #EF4444;
    margin-bottom: 1rem;
  }

  .retry-btn {
    background: #004AAE;
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
    background: #0CC0DF;
    transform: translateY(-1px);
  }

  /* Dashboard Layout */
  .dashboard-container {
    min-height: 100vh;
    background: #0F172A;
    color: #F8FAFC;
    font-family: 'Inter', sans-serif;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid #334155;
    background: #1E293B;
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(10px);
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .dashboard-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #F8FAFC;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
  }

  .dashboard-title i {
    color: #0CC0DF;
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
    background: #94A3B8;
    transition: background-color 0.3s ease;
  }

  .status-dot.live {
    background: #10B981;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .status-text {
    font-size: 0.875rem;
    color: #CBD5E1;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .action-btn {
    background: #004AAE;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .action-btn:hover {
    background: #0CC0DF;
    transform: translateY(-1px);
  }

  .view-selector {
    display: flex;
    background: #0F172A;
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: 1px solid #334155;
  }

  .view-btn {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    color: #CBD5E1;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-btn.active {
    background: #004AAE;
    color: white;
  }

  .view-btn:hover:not(.active) {
    background: #334155;
    color: #F8FAFC;
  }

  /* Main Dashboard */
  .dashboard-main {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
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
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .metric-card::before {
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

  .metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(12, 192, 223, 0.1);
    border-color: #0CC0DF;
  }

  .metric-card:hover::before {
    opacity: 1;
  }

  .metric-card.primary {
    background: linear-gradient(135deg, #1E293B 0%, rgba(12, 192, 223, 0.05) 100%);
    border-color: #0CC0DF;
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
    color: #CBD5E1;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .card-header i {
    color: #0CC0DF;
    font-size: 1.25rem;
  }

  .card-value {
    font-size: 2rem;
    font-weight: 700;
    color: #F8FAFC;
    margin-bottom: 0.5rem;
    font-family: 'Roboto Mono', monospace;
  }

  .card-value.gain {
    color: #10B981;
  }

  .card-value.rank {
    color: #FF914D;
  }

  .card-value.risk {
    color: #F59E0B;
  }

  .card-change {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .card-change.positive {
    color: #10B981;
  }

  .card-change.negative {
    color: #EF4444;
  }

  .card-subtitle {
    font-size: 0.875rem;
    color: #94A3B8;
  }

  /* Performance Section */
  .performance-section {
    background: #1E293B;
    border: 1px solid #334155;
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
    color: #F8FAFC;
    margin: 0;
  }

  .timeframe-selector {
    display: flex;
    background: #0F172A;
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: 1px solid #334155;
  }

  .timeframe-btn {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    color: #CBD5E1;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.875rem;
  }

  .timeframe-btn.active {
    background: #FF914D;
    color: white;
  }

  .timeframe-btn:hover:not(.active) {
    background: #334155;
    color: #F8FAFC;
  }

  .performance-display {
    text-align: center;
  }

  .performance-value {
    font-size: 3rem;
    font-weight: 700;
    color: #10B981;
    font-family: 'Roboto Mono', monospace;
    margin-bottom: 0.5rem;
  }

  .performance-period {
    font-size: 1rem;
    color: #CBD5E1;
    font-weight: 500;
  }

  /* Market Data Section */
  .market-data-section {
    margin-bottom: 3rem;
  }

  .market-data-section h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #F8FAFC;
    margin-bottom: 2rem;
  }

  .market-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .market-card {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .market-card:hover {
    transform: translateY(-2px);
    border-color: #FF914D;
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
    color: #0CC0DF;
    margin: 0;
    letter-spacing: 0.05em;
  }

  .market-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #F8FAFC;
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
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  .stat-value {
    font-size: 1rem;
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
