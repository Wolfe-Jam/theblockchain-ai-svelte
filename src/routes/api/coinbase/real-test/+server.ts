import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
const COINBASE_API_BASE = 'https://api.commerce.coinbase.com';

export const GET: RequestHandler = async ({ url }) => {
  try {
    if (!COINBASE_API_KEY) {
      return json({ error: 'COINBASE_API_KEY not found' }, { status: 500 });
    }

    // Create the exact same charge as the real payment would
    const chargeData = {
      name: 'NOBS Pay Purchase',
      description: 'Payment for NOBS Pay Component via NOBS Pay',
      pricing_type: 'fixed_price',
      local_price: {
        amount: '1.00', // $1.00 test
        currency: 'USD'
      },
      metadata: {
        customer_email: 'test@example.com',
        product_name: 'NOBS Pay Component',
        payment_method: 'crypto',
        source: 'nobs_pay'
      },
      redirect_url: `${url.origin}/purchase-success?method=crypto`,
      cancel_url: `${url.origin}/marketplace`
    };

    console.log('Creating real-style charge:', JSON.stringify(chargeData, null, 2));

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

    return json({
      success: response.ok,
      status: response.status,
      chargeData,
      coinbaseResponse: result,
      apiKeyPreview: COINBASE_API_KEY ? `${COINBASE_API_KEY.substring(0, 8)}...` : 'none',
      testHostedUrl: result.data?.hosted_url || 'none'
    });

  } catch (error) {
    return json({
      error: 'Charge test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
};