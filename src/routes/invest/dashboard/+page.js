// SvelteKit data loader for investor dashboard
// Demonstrates server-side data fetching and SEO optimization

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params, url }) {
  try {
    // Fetch real-time market data
    const marketResponse = await fetch('/api/market-data');
    const marketData = await marketResponse.json();
    
    // Simulate investor portfolio data
    // In production: authenticated data fetching
    const portfolioData = {
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
        },
        {
          symbol: 'CODE-ACTION',
          name: 'Code-In-Action Platform',
          investment: 25000,
          currentValue: 32500,
          shares: 2500,
          pricePerShare: 13.00,
          gainLoss: 7500,
          gainLossPercent: 30.0,
          sector: 'AI'
        }
      ],
      performance: {
        '1D': 2.3,
        '1W': 8.7,
        '1M': 15.2,
        '3M': 28.5,
        '6M': 39.0,
        '1Y': 39.0
      },
      alerts: [
        {
          type: 'opportunity',
          title: 'Blockchain Sector Surge',
          message: 'Blockchain market showing 90%+ CAGR acceleration',
          timestamp: new Date().toISOString(),
          priority: 'high'
        },
        {
          type: 'milestone',
          title: 'Portfolio Milestone',
          message: 'Your portfolio has crossed $300K threshold',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          priority: 'medium'
        }
      ]
    };
    
    // Analytics data
    const analyticsData = {
      riskScore: 'Medium-High',
      diversificationScore: 85,
      performanceRank: 12, // Top 12% of investors
      projectedReturn: {
        conservative: 125000,
        moderate: 187500,
        aggressive: 312500
      }
    };
    
    return {
      marketData,
      portfolioData,
      analyticsData,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Dashboard data loading error:', error);
    
    return {
      marketData: null,
      portfolioData: null,
      analyticsData: null,
      error: 'Unable to load dashboard data'
    };
  }
}
