import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET;

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-cc-webhook-signature');
    
    // Verify webhook signature in production
    if (COINBASE_WEBHOOK_SECRET && signature) {
      const computedSignature = crypto
        .createHmac('sha256', COINBASE_WEBHOOK_SECRET)
        .update(body)
        .digest('hex');
      
      if (signature !== computedSignature) {
        console.error('Invalid Coinbase webhook signature');
        return json({ error: 'Invalid signature' }, { status: 401 });
      }
    }
    
    const event = JSON.parse(body);
    
    console.log('Coinbase webhook received:', event.type);
    
    // Handle different Coinbase webhook events
    switch (event.type) {
      case 'charge:confirmed':
        await handleChargeConfirmed(event);
        break;
      case 'charge:failed':
        await handleChargeFailed(event);
        break;
      case 'charge:delayed':
        await handleChargeDelayed(event);
        break;
      case 'charge:pending':
        await handleChargePending(event);
        break;
      case 'charge:resolved':
        await handleChargeResolved(event);
        break;
      default:
        console.log('Unhandled Coinbase webhook event:', event.type);
    }
    
    return json({ received: true });
    
  } catch (error) {
    console.error('Coinbase webhook error:', error);
    return json({ error: 'Webhook processing failed' }, { status: 500 });
  }
};

async function handleChargeConfirmed(event: any) {
  const charge = event.data;
  const chargeId = charge.id;
  const amount = charge.pricing.local.amount;
  const currency = charge.pricing.local.currency;
  
  console.log('Crypto payment confirmed:', {
    chargeId,
    amount,
    currency,
    customerEmail: charge.metadata?.customer_email
  });
  
  // Here you would:
  // 1. Update your database with the successful payment
  // 2. Send confirmation email to customer
  // 3. Fulfill the order/grant access to product
  // 4. Update any internal systems
}

async function handleChargeFailed(event: any) {
  const charge = event.data;
  const chargeId = charge.id;
  
  console.log('Crypto payment failed:', chargeId);
  
  // Handle payment failure
  // 1. Update order status
  // 2. Notify customer if needed
  // 3. Clean up any pending processes
}

async function handleChargeDelayed(event: any) {
  const charge = event.data;
  const chargeId = charge.id;
  
  console.log('Crypto payment delayed:', chargeId);
  
  // Handle delayed payment (waiting for confirmations)
  // 1. Update order status to pending
  // 2. Optionally notify customer about delay
}

async function handleChargePending(event: any) {
  const charge = event.data;
  const chargeId = charge.id;
  
  console.log('Crypto payment pending:', chargeId);
  
  // Handle pending payment (transaction detected but not confirmed)
  // 1. Update order status
  // 2. Show pending status to customer
}

async function handleChargeResolved(event: any) {
  const charge = event.data;
  const chargeId = charge.id;
  
  console.log('Crypto payment resolved:', chargeId);
  
  // Handle resolved payment (final status)
  // This fires after confirmed for successful payments
  // or after failed for unsuccessful payments
}