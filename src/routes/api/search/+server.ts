import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { SearchEngine } from '$lib/search/engine';
import { ClaudeSmarts } from '$lib/search/claude-smarts';
import type { Component } from '$lib/marketplace/types';

// 🔒 Simple in-memory rate limiting (replace with Redis in production)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute

function isRequestAllowed(clientIP: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIP);
  
  if (!clientData || now - clientData.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(clientIP, { count: 1, timestamp: now });
    return true;
  }
  
  if (clientData.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  clientData.count++;
  return true;
}

// Mock components for now (would come from database)
const mockComponents: Component[] = [{
  id: '1',
  name: 'NOBS Pay',
  slug: 'nobs-pay',
  tagline: 'Universal payment component for modern apps',
  description: 'The only payment component that gives your users maximum choice while giving you minimum complexity. Accept credit cards, PayPal, and cryptocurrency with one simple integration.',
  consumer_tagline: 'No BS payment solution',
  api_name: 'Next Open Billing Software',
  formal_name: 'Neural Omni Balance System',
  fintech_name: 'Next Open Billing Stack',
  price_individual: 19900,
  price_team: 49900,
  price_enterprise: 149900,
  category: 'payment-processing',
  tags: ['payment', 'stripe', 'paypal', 'crypto', 'checkout', 'e-commerce'],
  keywords: ['payment gateway', 'checkout', 'e-commerce', 'billing', 'transactions'],
  tech_stack: ['svelte', 'typescript', 'stripe-api'],
  flip_card_theme: 'wallet',
  flip_card_size: 'standard',
  rating: 5.0,
  download_count: 0,
  featured: true,
  is_api_product: true,
  is_active: true,
  is_published: true,
  created_at: new Date().toISOString(),
  demo_url: '/marketplace/demo/nobs-pay',
  developer_features: ['Universal payment gateway', 'Multi-processor support', 'TypeScript definitions']
}];

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  try {
    // 🔒 Basic rate limiting check (in-memory for now)
    const clientIP = getClientAddress();
    if (!isRequestAllowed(clientIP)) {
      return json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    
    const body = await request.json();
    const { query, mode = 'hybrid' } = body;
    
    // 🔒 Input validation
    if (!query || typeof query !== 'string') {
      return json({ error: 'Invalid query' }, { status: 400 });
    }
    
    // 🔒 Size limits
    if (query.length > 500) {
      return json({ error: 'Query too long' }, { status: 400 });
    }
    
    // 🔒 Content filtering
    if (query.includes('<script') || query.includes('javascript:')) {
      return json({ error: 'Invalid query content' }, { status: 400 });
    }
    
    if (!query || query.trim().length === 0) {
      return json({ results: [], error: 'Query is required' }, { status: 400 });
    }
    
    // Initialize search engine
    const searchEngine = new SearchEngine(mockComponents);
    const claudeSmarts = new ClaudeSmarts(mockComponents);
    
    let results = [];
    
    // Perform search based on mode
    if (mode === 'claude-smarts') {
      // Pure AI search
      results = await claudeSmarts.getSmartResults(query);
    } else if (mode === 'traditional') {
      // Keyword search only
      results = searchEngine.traditionalSearch(query);
    } else {
      // Hybrid mode - combine both
      const traditionalResults = searchEngine.traditionalSearch(query);
      
      // If query seems complex or conversational, also use Claude
      const needsAI = query.split(' ').length > 3 || 
                      query.includes('how') || 
                      query.includes('need') ||
                      query.includes('want');
      
      if (needsAI && traditionalResults.length < 3) {
        const aiResults = await claudeSmarts.getSmartResults(query);
        
        // Merge results intelligently
        const mergedMap = new Map();
        traditionalResults.forEach(r => mergedMap.set(r.id, r));
        aiResults.forEach(r => {
          if (!mergedMap.has(r.id)) {
            mergedMap.set(r.id, r);
          } else {
            // Boost score if found by both methods
            const existing = mergedMap.get(r.id);
            existing.relevanceScore = Math.min(1, existing.relevanceScore * 1.5);
            existing.matchType = 'semantic';
            if (r.explanation) existing.explanation = r.explanation;
          }
        });
        
        results = Array.from(mergedMap.values())
          .sort((a, b) => b.relevanceScore - a.relevanceScore);
      } else {
        results = traditionalResults;
      }
    }
    
    // Log search for analytics (internal only)
    if (typeof window === 'undefined') { // Server-side only
      console.log(`Search: "${query.substring(0, 50)}" | Mode: ${mode} | Results: ${results.length}`);
    }
    
    return json({ 
      results,
      query,
      mode,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    // 🔒 Security: Log internally but don't expose details to client
    if (typeof window === 'undefined') {
      console.error('Search error:', error);
    }
    return json({ 
      error: 'Search failed' // 🔒 Generic error message only
    }, { status: 500 });
  }
};

// GET endpoint for search suggestions
export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('q') || '';
  
  if (query.length < 2) {
    return json({ suggestions: [] });
  }
  
  const claudeSmarts = new ClaudeSmarts(mockComponents);
  const suggestions = await claudeSmarts.generateSuggestions(query);
  
  return json({ suggestions });
};
