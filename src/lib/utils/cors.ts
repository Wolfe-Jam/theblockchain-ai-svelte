/**
 * Enhanced CORS Configuration
 * Provides secure, environment-aware CORS headers
 */

const isDevelopment = process.env.NODE_ENV === 'development';

const allowedOrigins = [
  'https://theblockchain.ai',
  'https://www.theblockchain.ai',
  ...(isDevelopment ? [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:5173'
  ] : [])
];

/**
 * Get CORS headers based on origin validation
 */
export function getCorsHeaders(origin?: string): Record<string, string> {
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);
  
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'null',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'false',
    'Access-Control-Max-Age': '86400',
    // Security headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
}

/**
 * Legacy CORS headers for backward compatibility
 * @deprecated Use getCorsHeaders() instead
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://theblockchain.ai',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
};

/**
 * Add CORS headers to existing response
 */
export function addCorsHeaders(response: Response, origin?: string): Response {
  const headers = getCorsHeaders(origin);
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

/**
 * Validate if origin is allowed
 */
export function isOriginAllowed(origin?: string): boolean {
  if (!origin) return false;
  return allowedOrigins.includes(origin);
}

/**
 * Create OPTIONS response for CORS preflight
 */
export function createOptionsResponse(origin?: string): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin)
  });
}
