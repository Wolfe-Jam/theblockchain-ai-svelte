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
    const { orderID } = await request.json();

    if (!orderID) {
      return json({ error: 'Order ID required' }, { status: 400 });
    }

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      return json({ error: 'PayPal configuration missing' }, { status: 500 });
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    const captureData = await response.json();

    if (!response.ok) {
      console.error('PayPal capture failed:', captureData);
      return json({ error: 'Failed to capture PayPal payment' }, { status: 500 });
    }

    // Extract transaction details
    const purchase_unit = captureData.purchase_units?.[0];
    const capture = purchase_unit?.payments?.captures?.[0];

    if (capture?.status === 'COMPLETED') {
      return json({
        success: true,
        transactionId: capture.id,
        status: capture.status,
        amount: capture.amount,
        payerInfo: captureData.payer
      });
    } else {
      return json({ error: 'Payment capture not completed' }, { status: 400 });
    }

  } catch (error) {
    console.error('PayPal capture error:', error);
    return json({ error: 'Failed to capture PayPal payment' }, { status: 500 });
  }
};