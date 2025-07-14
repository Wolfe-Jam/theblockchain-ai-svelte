import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const results = [];
  
  // Test 1: Basic connectivity
  try {
    const response = await fetch('https://api.commerce.coinbase.com/ping', {
      method: 'GET',
      headers: { 'User-Agent': 'NOBS-Pay-Test' }
    });
    results.push({
      test: 'Coinbase Ping',
      success: true,
      status: response.status,
      statusText: response.statusText
    });
  } catch (error) {
    results.push({
      test: 'Coinbase Ping',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }

  // Test 2: Basic HTTP test
  try {
    const response = await fetch('https://httpbin.org/get');
    results.push({
      test: 'Basic HTTP',
      success: response.ok,
      status: response.status
    });
  } catch (error) {
    results.push({
      test: 'Basic HTTP',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }

  // Test 3: DNS resolution
  try {
    const response = await fetch('https://api.commerce.coinbase.com', {
      method: 'HEAD'
    });
    results.push({
      test: 'Coinbase DNS/SSL',
      success: true,
      status: response.status
    });
  } catch (error) {
    results.push({
      test: 'Coinbase DNS/SSL',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }

  return json({
    timestamp: new Date().toISOString(),
    netlifyRegion: process.env.AWS_REGION || 'unknown',
    results,
    environment: process.env.NODE_ENV || 'unknown'
  });
};