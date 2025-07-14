import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const apiKey = process.env.COINBASE_API_KEY;
  
  return json({
    hasApiKey: !!apiKey,
    keyPreview: apiKey ? apiKey.substring(0, 8) + '...' : 'No key found',
    keyLength: apiKey ? apiKey.length : 0,
    environment: process.env.NODE_ENV || 'unknown'
  });
};