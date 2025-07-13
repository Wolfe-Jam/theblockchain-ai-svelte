import Stripe from 'stripe';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  console.log('Webhook received at:', new Date().toISOString());
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      console.error('Missing Stripe signature');
      throw error(400, 'Missing webhook signature');
    }
    
    // Initialize Stripe - MUST use environment variable
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY environment variable not set');
      throw error(500, 'Payment system configuration error');
    }
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2024-06-20'
    });
    
    // Get webhook secret - REQUIRED for signature verification
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET environment variable not set');
      throw error(500, 'Webhook configuration error');
    }
    
    // Verify webhook signature for security
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ Webhook signature verified:', event.type);
    } catch (webhookErr: any) {
      console.error('❌ Webhook signature verification failed:', webhookErr.message);
      throw error(400, 'Invalid webhook signature');
    }
    
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handleSuccessfulPayment(event.data.object as Stripe.PaymentIntent);
        break;
        
      case 'payment_intent.payment_failed':
        await handleFailedPayment(event.data.object as Stripe.PaymentIntent);
        break;
        
      case 'payment_intent.created':
        console.log('PaymentIntent created:', event.data.object.id);
        break;
        
      default:
        console.log('Unhandled event type:', event.type);
    }
    
    return json({ received: true });
    
  } catch (err) {
    console.error('Webhook processing failed:', err);
    
    if (err instanceof Error) {
      throw error(500, `Webhook failed: ${err.message}`);
    }
    
    throw error(500, 'Webhook processing failed');
  }
};

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  const { customer_email, license_type, product_id, price_id } = paymentIntent.metadata;
  
  console.log('🎉 Payment succeeded!', {
    paymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount,
    customer: customer_email,
    license: license_type,
    product: product_id
  });
  
  // TODO: Implement your business logic here
  // 1. Grant access to NOBS Pay download
  // 2. Generate and send license key via email
  // 3. Update customer database
  // 4. Send confirmation email
  
  // For now, just log the success
  console.log('✅ NOBS Pay license granted to:', customer_email);
  console.log('📧 License key email would be sent here');
  console.log('💾 Customer database would be updated here');
  
  // Example: You could call an email service here
  // await sendLicenseEmail(customer_email, generateLicenseKey());
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const { customer_email, license_type } = paymentIntent.metadata;
  
  console.log('❌ Payment failed:', {
    paymentIntentId: paymentIntent.id,
    customer: customer_email,
    license: license_type,
    failureReason: paymentIntent.last_payment_error?.message
  });
  
  // TODO: Implement failure handling
  // 1. Log failure reason
  // 2. Send failure notification email
  // 3. Update customer records
  // 4. Maybe retry logic for certain failure types
  
  console.log('📧 Payment failure email would be sent to:', customer_email);
}
