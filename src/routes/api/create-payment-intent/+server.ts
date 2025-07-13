import Stripe from 'stripe';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Debug environment variables
    console.log('Environment check:', {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      keyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 8),
      nodeEnv: process.env.NODE_ENV
    });

    // Initialize Stripe - MUST use environment variable
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY environment variable not set');
      throw error(500, 'Payment system configuration error');
    }
    
    console.log('Using Stripe key prefix:', stripeKey.substring(0, 8));
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2025-06-30.basil',
    });
    const { priceId, customerEmail } = await request.json();
    
    // Validate required fields
    if (!priceId || !customerEmail) {
      throw error(400, 'Missing required fields: priceId and customerEmail');
    }
    
    // For now, we'll use your specific price ID
    // Later you can make this dynamic based on priceId parameter
    const targetPriceId = 'price_1RkSFG2KJ00ahaMqI7le9cnu'; // Your $1 price
    
    // Get price details from Stripe
    const price = await stripe.prices.retrieve(targetPriceId);
    
    if (!price.unit_amount) {
      throw error(500, 'Price amount not found');
    }
    
    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount, // 100 cents = $1
      currency: price.currency,  // 'usd'
      payment_method_types: ['card'],
      metadata: {
        product_id: price.product as string,
        customer_email: customerEmail,
        license_type: price.nickname || 'Test License',
        price_id: targetPriceId
      }
    });
    
    console.log('PaymentIntent created:', paymentIntent.id);
    
    return json({
      clientSecret: paymentIntent.client_secret,
      amount: price.unit_amount,
      currency: price.currency
    });
    
  } catch (err) {
    console.error('PaymentIntent creation failed:', err);
    
    if (err instanceof Error) {
      throw error(500, `Payment initialization failed: ${err.message}`);
    }
    
    throw error(500, 'Payment initialization failed');
  }
};
