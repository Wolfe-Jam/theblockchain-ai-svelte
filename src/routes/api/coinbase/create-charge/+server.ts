import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
const COINBASE_API_BASE = 'https://api.commerce.coinbase.com';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { amount, currency = 'USD', productName, email } = await request.json();

    console.log('Coinbase charge request:', { amount, currency, productName, email });

    if (!amount || amount <= 0) {
      return json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!COINBASE_API_KEY) {
      console.error('COINBASE_API_KEY not found in environment variables');
      return json({ error: 'Coinbase configuration missing' }, { status: 500 });
    }

    console.log('COINBASE_API_KEY present:', COINBASE_API_KEY ? 'Yes' : 'No');
    console.log('API Key starts with:', COINBASE_API_KEY ? COINBASE_API_KEY.substring(0, 8) + '...' : 'No key');

    const chargeData = {
      name: productName || 'NOBS Pay Purchase',
      description: `Payment for ${productName || 'digital product'} via NOBS Pay`,
      pricing_type: 'fixed_price',
      local_price: {
        amount: (amount / 100).toFixed(2), // Convert from cents to dollars
        currency: currency
      },
      metadata: {
        customer_email: email,
        product_name: productName,
        payment_method: 'crypto',
        source: 'nobs_pay'
      },
      redirect_url: `${new URL(request.url).origin}/purchase-success?method=crypto`,
      cancel_url: `${new URL(request.url).origin}/marketplace`
    };

    console.log('Sending to Coinbase:', JSON.stringify(chargeData, null, 2));

    const response = await fetch(`${COINBASE_API_BASE}/charges`, {
      method: 'POST',
      headers: {
        'X-CC-Api-Key': COINBASE_API_KEY,
        'Content-Type': 'application/json',
        'X-CC-Api-Version': '2018-03-22'
      },
      body: JSON.stringify(chargeData)
    });

    const charge = await response.json();
    
    console.log('Coinbase response status:', response.status);
    console.log('Coinbase response:', JSON.stringify(charge, null, 2));

    if (!response.ok) {
      console.error('Coinbase charge creation failed:', charge);
      return json({ 
        error: 'Failed to create Coinbase charge', 
        details: charge,
        status: response.status 
      }, { status: 500 });
    }

    return json({
      chargeId: charge.data.id,
      hostedUrl: charge.data.hosted_url,
      status: charge.data.timeline[0]?.status || 'NEW',
      addresses: charge.data.addresses,
      pricing: charge.data.pricing
    });

  } catch (error) {
    console.error('Coinbase charge creation error:', error);
    return json({ 
      error: 'Failed to create Coinbase charge', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
};