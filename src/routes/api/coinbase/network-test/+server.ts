import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const apiKey = process.env.COINBASE_API_KEY;
  
  try {
    // Simple test: Try to reach Coinbase API
    const response = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'X-CC-Api-Key': apiKey || 'test',
        'Content-Type': 'application/json',
        'X-CC-Api-Version': '2018-03-22'
      },
      body: JSON.stringify({
        name: 'Network Test',
        description: 'Testing network connectivity',
        pricing_type: 'fixed_price',
        local_price: { amount: '1.00', currency: 'USD' }
      })
    });

    const result = await response.json();

    return json({
      success: true,
      canReachCoinbase: true,
      status: response.status,
      apiKeyPresent: !!apiKey,
      coinbaseResponse: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return json({
      success: false,
      canReachCoinbase: false,
      error: error instanceof Error ? error.message : 'Unknown network error',
      apiKeyPresent: !!apiKey,
      timestamp: new Date().toISOString()
    });
  }
};