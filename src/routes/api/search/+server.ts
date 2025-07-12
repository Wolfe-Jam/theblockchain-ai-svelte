import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { SearchEngine } from '$lib/search/engine';
import { ClaudeSmarts } from '$lib/search/claude-smarts';
import { getCorsHeaders, createOptionsResponse } from '$lib/utils/cors';
import { InputValidator } from '$lib/security/input-validator';
import { SecurityMonitor } from '$lib/security/security-monitor';
import { rateLimiter } from '$lib/security/rate-limiter';
import type { Component } from '$lib/marketplace/types';

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
  const clientIP = getClientAddress();
  const origin = request.headers.get('origin');
  const userAgent = request.headers.get('user-agent');
  const corsHeaders = getCorsHeaders(origin);
  
  try {
    // 1. Check if IP should be blocked
    if (SecurityMonitor.shouldBlockIP(clientIP)) {
      SecurityMonitor.logSecurityEvent({
        type: 'suspicious_request',
        ip: clientIP,
        userAgent,
        endpoint: '/api/search',
        details: { reason: 'blocked_ip' }
      });
      
      return json({ error: 'Access denied' }, { 
        status: 403,
        headers: corsHeaders
      });
    }
    
    // 2. Rate limiting check with progressive penalties
    const penalty = SecurityMonitor.getProgressivePenalty(clientIP);
    const rateLimitKey = `search:${clientIP}`;
    const rateLimit = await rateLimiter.checkLimit(rateLimitKey, 10, Math.max(60, penalty));
    
    if (!rateLimit.allowed) {
      SecurityMonitor.logSecurityEvent({
        type: 'rate_limit',
        ip: clientIP,
        userAgent,
        endpoint: '/api/search',
        details: { 
          limit: 10, 
          window: 60,
          penalty: penalty,
          retryAfter: rateLimit.retryAfter
        }
      });
      
      return json({ error: 'Rate limit exceeded' }, { 
        status: 429,
        headers: {
          ...corsHeaders,
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.resetTime),
          'Retry-After': String(rateLimit.retryAfter || 60)
        }
      });
    }    
    // 3. Input validation
    const body = await request.json();
    const { query, mode = 'hybrid' } = body;
    
    // Validate query
    const queryError = InputValidator.validateSearchQuery(query);
    if (queryError) {
      SecurityMonitor.logSecurityEvent({
        type: 'invalid_input',
        ip: clientIP,
        userAgent,
        endpoint: '/api/search',
        details: { 
          error: queryError, 
          query: typeof query === 'string' ? query.substring(0, 50) : 'invalid_type',
          queryLength: typeof query === 'string' ? query.length : 0
        }
      });
      
      return json({ error: queryError }, { 
        status: 400,
        headers: corsHeaders
      });
    }
    
    // Validate mode
    const modeError = InputValidator.validateMode(mode);
    if (modeError) {
      SecurityMonitor.logSecurityEvent({
        type: 'invalid_input',
        ip: clientIP,
        userAgent,
        endpoint: '/api/search',
        details: { error: modeError, mode }
      });
      
      return json({ error: modeError }, { 
        status: 400,
        headers: corsHeaders
      });
    }
    
    const sanitizedQuery = InputValidator.sanitizeQuery(query);
    
    // 4. Check for suspicious activity patterns
    const isSuspicious = await SecurityMonitor.checkForSuspiciousActivity(clientIP);
    if (isSuspicious) {
      SecurityMonitor.logSecurityEvent({
        type: 'suspicious_request',
        ip: clientIP,
        userAgent,
        endpoint: '/api/search',
        details: { reason: 'suspicious_activity_pattern' }
      });
      
      return json({ error: 'Request blocked due to suspicious activity' }, { 
        status: 403,
        headers: corsHeaders
      });
    }
    
    // 5. Perform search
    const searchEngine = new SearchEngine(mockComponents);
    const claudeSmarts = new ClaudeSmarts(mockComponents);
    
    let results = [];
    let searchTime = Date.now();
    
    try {
      if (mode === 'claude-smarts') {
        results = await claudeSmarts.getSmartResults(sanitizedQuery);
      } else if (mode === 'traditional') {
        results = searchEngine.traditionalSearch(sanitizedQuery);
      } else {
        // Hybrid mode
        const traditionalResults = searchEngine.traditionalSearch(sanitizedQuery);
        
        const needsAI = sanitizedQuery.split(' ').length > 3 || 
                        sanitizedQuery.includes('how') || 
                        sanitizedQuery.includes('need') ||
                        sanitizedQuery.includes('want');
        
        if (needsAI && traditionalResults.length < 3) {
          const aiResults = await claudeSmarts.getSmartResults(sanitizedQuery);
          
          const mergedMap = new Map();
          traditionalResults.forEach(r => mergedMap.set(r.id, r));
          aiResults.forEach(r => {
            if (!mergedMap.has(r.id)) {
              mergedMap.set(r.id, r);
            } else {
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
      
      searchTime = Date.now() - searchTime;
      
    } catch (searchError) {
      console.error('Search execution error:', searchError);
      
      SecurityMonitor.logSecurityEvent({
        type: 'suspicious_request',
        ip: clientIP,
        userAgent,
        endpoint: '/api/search',
        details: { 
          error: 'search_execution_failed',
          query: sanitizedQuery.substring(0, 50)
        }
      });
      
      return json({ error: 'Search failed' }, { 
        status: 500,
        headers: corsHeaders
      });
    }
    
    // 6. Success response with security headers
    return json({ 
      results,
      query: sanitizedQuery,
      mode,
      searchTime,
      timestamp: new Date().toISOString()
    }, { 
      headers: {
        ...corsHeaders,
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(rateLimit.resetTime),
        'X-Response-Time': `${searchTime}ms`
      }
    });
    
  } catch (error) {
    // 7. Error handling with security logging
    SecurityMonitor.logSecurityEvent({
      type: 'suspicious_request',
      ip: clientIP,
      userAgent,
      endpoint: '/api/search',
      details: { 
        error: 'unexpected_error',
        message: error instanceof Error ? error.message : 'unknown_error'
      }
    });
    
    return json({ error: 'Search failed' }, { 
      status: 500,
      headers: corsHeaders
    });
  }
};

// Handle OPTIONS for CORS preflight
export const OPTIONS: RequestHandler = async ({ request }) => {
  return createOptionsResponse(request.headers.get('origin'));
};

// Secure GET endpoint for suggestions
export const GET: RequestHandler = async ({ url, getClientAddress }) => {
  const clientIP = getClientAddress();
  const query = url.searchParams.get('q') || '';
  
  // Rate limit suggestions too
  const rateLimitKey = `suggestions:${clientIP}`;
  const rateLimit = await rateLimiter.checkLimit(rateLimitKey, 20, 60); // Higher limit for suggestions
  
  if (!rateLimit.allowed) {
    return json({ suggestions: [] }, { 
      status: 429,
      headers: {
        'X-RateLimit-Limit': '20',
        'X-RateLimit-Remaining': '0'
      }
    });
  }
  
  if (query.length < 2 || query.length > 100) {
    return json({ suggestions: [] });
  }
  
  const sanitizedQuery = InputValidator.sanitizeQuery(query);
  const claudeSmarts = new ClaudeSmarts(mockComponents);
  const suggestions = await claudeSmarts.generateSuggestions(sanitizedQuery);
  
  return json({ 
    suggestions,
    query: sanitizedQuery
  }, {
    headers: {
      'X-RateLimit-Limit': '20',
      'X-RateLimit-Remaining': String(rateLimit.remaining)
    }
  });
};
