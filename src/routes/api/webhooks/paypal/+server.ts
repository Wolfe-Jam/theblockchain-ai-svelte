import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.text();
    const headers = request.headers;
    
    // In production, you should verify the webhook signature
    // const signature = headers.get('paypal-signature');
    // const webhookId = headers.get('paypal-webhook-id');
    
    const event = JSON.parse(body);
    
    console.log('PayPal webhook received:', event.event_type);
    
    // Handle different PayPal webhook events
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentCompleted(event);
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        await handlePaymentDenied(event);
        break;
      case 'PAYMENT.CAPTURE.REFUNDED':
        await handlePaymentRefunded(event);
        break;
      default:
        console.log('Unhandled PayPal webhook event:', event.event_type);
    }
    
    return json({ received: true });
    
  } catch (error) {
    console.error('PayPal webhook error:', error);
    return json({ error: 'Webhook processing failed' }, { status: 500 });
  }
};

async function handlePaymentCompleted(event: any) {
  const resource = event.resource;
  const transactionId = resource.id;
  const amount = resource.amount;
  
  console.log('Payment completed:', {
    transactionId,
    amount: amount.value,
    currency: amount.currency_code
  });
  
  // Here you would:
  // 1. Update your database with the successful payment
  // 2. Send confirmation email to customer
  // 3. Fulfill the order/grant access to product
  // 4. Update any internal systems
}

async function handlePaymentDenied(event: any) {
  const resource = event.resource;
  const transactionId = resource.id;
  
  console.log('Payment denied:', transactionId);
  
  // Handle payment denial
  // 1. Update order status
  // 2. Notify customer if needed
}

async function handlePaymentRefunded(event: any) {
  const resource = event.resource;
  const transactionId = resource.id;
  
  console.log('Payment refunded:', transactionId);
  
  // Handle refund
  // 1. Update order status
  // 2. Revoke access to product if applicable
  // 3. Update accounting records
}