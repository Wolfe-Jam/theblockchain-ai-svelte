import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Test endpoint to verify Stripe configuration
export const GET: RequestHandler = async () => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    endpoint: '/api/stripe/test',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      hasStripeTest: !!process.env.STRIPE_TEST_SECRET_KEY,
      hasStripePublic: !!process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY,
      availableStripeVars: Object.keys(process.env).filter(k => k.includes('STRIPE'))
    },
    netlifyContext: {
      context: process.env.CONTEXT || 'unknown',
      deployId: process.env.DEPLOY_ID || 'unknown',
      site: process.env.SITE_NAME || 'unknown'
    }
  };
  
  return json(diagnostics);
};