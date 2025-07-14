import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';

const PAYPAL_API_BASE = PAYPAL_MODE === 'live' 
  ? 'https://api.paypal.com'
  : 'https://api.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { amount, currency = 'USD', productName, email } = await request.json();

    if (!amount || amount <= 0) {
      return json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      return json({ error: 'PayPal configuration missing' }, { status: 500 });
    }

    const accessToken = await getPayPalAccessToken();    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: `nobs_pay_${Date.now()}`,
        amount: {
          currency_code: currency,
          value: (amount / 100).toFixed(2) // Convert from cents to dollars
        },
        description: productName || 'NOBS Pay Purchase',
        payee: {
          email_address: email
        }
      }],
      application_context: {
        brand_name: 'theBlockchain.ai',
        landing_page: 'LOGIN',
        user_action: 'PAY_NOW',
        return_url: `${new URL(request.url).origin}/purchase-success?method=paypal`,
        cancel_url: `${new URL(request.url).origin}/marketplace`
      }
    };

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('PayPal order creation failed:', order);
      return json({ error: 'Failed to create PayPal order' }, { status: 500 });
    }

    return json({
      orderID: order.id,
      status: order.status
    });

  } catch (error) {
    console.error('PayPal order creation error:', error);
    return json({ error: 'Failed to create PayPal order' }, { status: 500 });
  }
};