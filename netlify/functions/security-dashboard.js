// Security Dashboard Netlify Function
// Provides real-time security monitoring and metrics

// Simple in-memory storage for demo (replace with Redis in production)
const securityEvents = [];
const MAX_EVENTS = 1000;

const allowedOrigins = [
  'https://theblockchain.ai',
  'https://www.theblockchain.ai'
];

if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:4173');
}

function logSecurityEvent(event) {
  const fullEvent = {
    ...event,
    timestamp: new Date().toISOString()
  };
  
  securityEvents.push(fullEvent);
  
  // Keep only recent events
  if (securityEvents.length > MAX_EVENTS) {
    securityEvents.splice(0, securityEvents.length - MAX_EVENTS);
  }
  
  console.log(`[SECURITY] ${event.type} from ${event.ip}`);
}

function getSecurityStats(timeWindow = 3600000) {
  const cutoff = Date.now() - timeWindow;
  const recentEvents = securityEvents.filter(
    event => new Date(event.timestamp).getTime() > cutoff
  );
  
  const eventsByType = {};
  const ipCounts = {};
  
  recentEvents.forEach(event => {
    eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
    ipCounts[event.ip] = (ipCounts[event.ip] || 0) + 1;
  });
  
  const topIPs = Object.entries(ipCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([ip, count]) => ({ ip, count }));
  
  return {
    totalEvents: recentEvents.length,
    eventsByType,
    topIPs
  };
}

exports.handler = async (event, context) => {
  const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
  const origin = event.headers.origin;
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : 'null',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
  };
  
  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }
  
  try {
    // Admin authentication check
    const authHeader = event.headers.authorization;
    const adminKey = process.env.ADMIN_API_KEY || process.env.INTERNAL_API_KEY;
    
    if (!authHeader || !adminKey || authHeader !== `Bearer ${adminKey}`) {
      logSecurityEvent({
        type: 'auth_failure',
        ip: clientIP,
        endpoint: '/security-dashboard',
        details: { reason: 'invalid_admin_key' }
      });
      
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }
    
    // CORS validation
    if (origin && !allowedOrigins.includes(origin)) {
      logSecurityEvent({
        type: 'cors_violation',
        ip: clientIP,
        endpoint: '/security-dashboard',
        details: { origin }
      });
      
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Origin not allowed' })
      };
    }
    
    if (event.httpMethod === 'GET') {
      // Get dashboard data
      const timeRange = event.queryStringParameters?.timeRange || '1h';
      const limit = parseInt(event.queryStringParameters?.limit || '100');
      
      const timeWindows = {
        '1h': 3600000,
        '24h': 86400000,
        '7d': 604800000,
        '30d': 2592000000
      };
      
      const timeWindow = timeWindows[timeRange] || timeWindows['1h'];
      const securityStats = getSecurityStats(timeWindow);
      const recentEvents = securityEvents.slice(-limit);
      
      // Additional metrics
      const now = Date.now();
      const cutoffTime = now - timeWindow;
      
      const recentEventsInWindow = recentEvents.filter(
        event => new Date(event.timestamp).getTime() > cutoffTime
      );
      
      // Top endpoints by security events
      const endpointStats = {};
      recentEventsInWindow.forEach(event => {
        endpointStats[event.endpoint] = (endpointStats[event.endpoint] || 0) + 1;
      });
      
      const topEndpoints = Object.entries(endpointStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([endpoint, count]) => ({ endpoint, count }));
      
      // Security event trends (hourly buckets)
      const eventTrends = {};
      recentEventsInWindow.forEach(event => {
        const hour = new Date(event.timestamp).toISOString().substring(0, 13) + ':00:00.000Z';
        eventTrends[hour] = (eventTrends[hour] || 0) + 1;
      });
      
      const trends = Object.entries(eventTrends)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([timestamp, count]) => ({ timestamp, count }));
      
      const dashboardData = {
        summary: {
          timeRange,
          totalEvents: securityStats.totalEvents,
          totalUniqueIPs: securityStats.topIPs.length,
          timestamp: new Date().toISOString()
        },
        eventsByType: securityStats.eventsByType,
        topIPs: securityStats.topIPs,
        topEndpoints,
        trends,
        recentEvents: recentEvents.slice(-50),
        healthStatus: {
          securityMonitoring: 'active',
          rateLimiting: 'memory-based',
          corsProtection: 'active',
          inputValidation: 'active'
        }
      };
      
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(dashboardData)
      };
      
    } else if (event.httpMethod === 'POST') {
      // Log a security event (from other functions)
      const { type, endpoint, details } = JSON.parse(event.body);
      
      logSecurityEvent({
        type,
        ip: clientIP,
        endpoint,
        details
      });
      
      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify({ 
          message: 'Security event logged',
          timestamp: new Date().toISOString()
        })
      };
      
    } else if (event.httpMethod === 'DELETE') {
      // Clear old security events
      const keepCount = 100;
      const removed = securityEvents.length - keepCount;
      
      if (removed > 0) {
        securityEvents.splice(0, removed);
      }
      
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ 
          message: 'Security events cleared',
          remaining: securityEvents.length,
          removed: Math.max(0, removed),
          timestamp: new Date().toISOString()
        })
      };
      
    } else {
      return {
        statusCode: 405,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }
    
  } catch (error) {
    console.error('Security dashboard error:', error);
    
    logSecurityEvent({
      type: 'suspicious_request',
      ip: clientIP,
      endpoint: '/security-dashboard',
      details: { error: error.message }
    });
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Dashboard unavailable',
        timestamp: new Date().toISOString()
      })
    };
  }
};

// Export logging function for use by other functions
exports.logSecurityEvent = logSecurityEvent;
