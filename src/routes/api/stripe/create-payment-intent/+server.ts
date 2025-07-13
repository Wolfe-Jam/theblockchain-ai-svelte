import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return json({ message: 'API route is working!', timestamp: new Date().toISOString() });
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    console.log('=== STRIPE DEBUG ===');
    console.log('Request received at:', new Date().toISOString());
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { amount, currency = 'usd', productName, email, liveMode = false } = body;
    
    // Debug logging
    console.log('API called with:', { amount, currency, productName, email, liveMode });
    console.log('Environment variables available:', {
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      nodeEnv: process.env.NODE_ENV
    });
    
    // Validate required fields
    if (!amount || amount < 50) { // Stripe minimum is $0.50
      return json({ error: 'Amount must be at least $0.50' }, { status: 400 });
    }
    
    if (!email) {
      return json({ error: 'Email is required' }, { status: 400 });
    }
    
    // Get appropriate Stripe secret key based on mode
    const stripeSecretKey = liveMode 
      ? process.env.STRIPE_SECRET_KEY  // Live key from Netlify environment
      : (process.env.STRIPE_TEST_SECRET_KEY || process.env.STRIPE_SECRET_KEY); // Test key fallback
    
    if (!stripeSecretKey) {
      console.error('❌ STRIPE KEY MISSING');
      console.error('Environment variables available:', Object.keys(process.env).filter(k => k.includes('STRIPE')));
      console.error('Looking for:', liveMode ? 'STRIPE_SECRET_KEY' : 'STRIPE_TEST_SECRET_KEY');
      return json({ 
        error: 'Payment processing not configured',
        debug: 'Stripe keys missing from environment'
      }, { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    console.log(`Creating payment intent in ${liveMode ? 'LIVE' : 'TEST'} mode`);
    
    // Dynamically import Stripe
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20'
    });
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure integer
      currency: currency.toLowerCase(),
      metadata: {
        productName: productName || 'NOBS Pay Purchase',
        customerEmail: email,
        source: 'theblockchain.ai'
      },
      receipt_email: email,
      description: `Purchase: ${productName || 'NOBS Pay License'}`
    });
    
    console.log('Payment Intent created:', paymentIntent.id);
    
    // Return client secret for frontend
    return json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
    
  } catch (error: any) {
    console.error('Stripe payment intent creation failed:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return json({ error: error.message }, { status: 400 });
    }
    
    return json({ 
      error: 'Payment processing failed. Please try again.',
      details: error.message 
    }, { status: 500 });
  }
};