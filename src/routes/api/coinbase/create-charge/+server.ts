import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
const COINBASE_API_BASE = 'https://api.commerce.coinbase.com';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { amount, currency = 'USD', productName, email } = await request.json();

    if (!amount || amount <= 0) {
      return json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!COINBASE_API_KEY) {
      return json({ error: 'Coinbase configuration missing' }, { status: 500 });
    }

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

    if (!response.ok) {
      console.error('Coinbase charge creation failed:', charge);
      return json({ error: 'Failed to create Coinbase charge' }, { status: 500 });
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
    return json({ error: 'Failed to create Coinbase charge' }, { status: 500 });
  }
};