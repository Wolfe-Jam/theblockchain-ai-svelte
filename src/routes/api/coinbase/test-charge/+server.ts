import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
const COINBASE_API_BASE = 'https://api.beta.commerce.coinbase.com';

export const GET: RequestHandler = async ({ url }) => {
  try {
    if (!COINBASE_API_KEY) {
      return json({ error: 'COINBASE_API_KEY not found' }, { status: 500 });
    }

    // Test with minimal charge data
    const chargeData = {
      name: 'Test Charge',
      description: 'Testing Coinbase API connection',
      pricing_type: 'fixed_price',
      local_price: {
        amount: '1.00',
        currency: 'USD'
      },
      redirect_url: `${url.origin}/test-success`,
      cancel_url: `${url.origin}/test-cancel`
    };

    console.log('Testing Coinbase with:', JSON.stringify(chargeData, null, 2));

    const response = await fetch(`${COINBASE_API_BASE}/charges`, {
      method: 'POST',
      headers: {
        'X-CC-Api-Key': COINBASE_API_KEY,
        'Content-Type': 'application/json',
        'X-CC-Api-Version': '2018-03-22'
      },
      body: JSON.stringify(chargeData)
    });

    const result = await response.json();

    // Return full details for debugging
    return json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      apiKey: COINBASE_API_KEY ? `${COINBASE_API_KEY.substring(0, 8)}...` : 'none',
      apiKeyLength: COINBASE_API_KEY?.length || 0,
      requestData: chargeData,
      coinbaseResponse: result,
      headers: Object.fromEntries(response.headers.entries())
    });

  } catch (error) {
    return json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
};