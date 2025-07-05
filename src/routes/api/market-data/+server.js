// API Route: Real-time market data for investor dashboard
// Demonstrates SvelteKit server-side capabilities

import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  // Simulate real-time market data fetching
  // In production, this would connect to actual market APIs
  
  const marketSegment = url.searchParams.get('segment') || 'all';
  
  // Realistic market data with slight variations
  const baseData = {
    ai: {
      current: 3.68,
      change: 0.12,
      changePercent: 3.37,
      volume: '2.1B',
      marketCap: '3.68T',
      high52Week: 3.85,
      low52Week: 2.45
    },
    blockchain: {
      current: 5.85,
      change: 0.45,
      changePercent: 8.33,
      volume: '890M',
      marketCap: '5.85T',
      high52Week: 6.12,
      low52Week: 0.75
    },
    software: {
      current: 1.90,
      change: -0.05,
      changePercent: -2.56,
      volume: '1.5B',
      marketCap: '1.90T',
      high52Week: 2.15,
      low52Week: 1.65
    },
    convergence: {
      total: 11.43,
      growth: 847.2,
      projectedCAGR: 67.8,
      riskScore: 'Medium-High',
      opportunity: 'Historic'
    }
  };
  
  // Add realistic time-based fluctuations
  const now = new Date();
  const fluctuation = Math.sin(now.getMinutes() / 10) * 0.02;
  
  Object.keys(baseData).forEach(key => {
    if (baseData[key].current) {
      baseData[key].current *= (1 + fluctuation);
      baseData[key].change *= (1 + fluctuation * 0.5);
    }
  });
  
  const response = {
    timestamp: now.toISOString(),
    marketSegment,
    data: marketSegment === 'all' ? baseData : { [marketSegment]: baseData[marketSegment] },
    metadata: {
      source: 'theBlockchain.ai Market Intelligence',
      accuracy: '99.7%',
      latency: '< 100ms',
      nextUpdate: new Date(now.getTime() + 30000).toISOString()
    }
  };
  
  return json(response);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { investorId, preferences } = await request.json();
  
  // Save investor market preferences
  // In production: database operations
  
  return json({
    success: true,
    message: 'Market preferences updated',
    investorId,
    preferences
  });
}
