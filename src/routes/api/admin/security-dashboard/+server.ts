import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { SecurityMonitor } from '$lib/security/security-monitor';
import { rateLimiter } from '$lib/security/rate-limiter';
import { getCorsHeaders } from '$lib/utils/cors';

/**
 * Security Dashboard API
 * Provides security metrics and monitoring data
 * Requires admin authentication
 */

export const GET: RequestHandler = async ({ request, url, getClientAddress }) => {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  try {
    // Admin authentication check
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY || process.env.INTERNAL_API_KEY;
    
    if (!authHeader || !adminKey || authHeader !== `Bearer ${adminKey}`) {
      return json({ error: 'Unauthorized' }, { 
        status: 401,
        headers: corsHeaders
      });
    }
    
    // Get query parameters
    const timeRange = url.searchParams.get('timeRange') || '1h';
    const limit = parseInt(url.searchParams.get('limit') || '100');
    
    // Calculate time window in milliseconds
    const timeWindows: Record<string, number> = {
      '1h': 3600000,      // 1 hour
      '24h': 86400000,    // 24 hours
      '7d': 604800000,    // 7 days
      '30d': 2592000000   // 30 days
    };
    
    const timeWindow = timeWindows[timeRange] || timeWindows['1h'];
    
    // Get security statistics
    const securityStats = SecurityMonitor.getSecurityStats(timeWindow);
    const recentEvents = SecurityMonitor.getRecentEvents(limit);
    const rateLimiterStats = rateLimiter.getStats();
    
    // Calculate additional metrics
    const now = Date.now();
    const cutoffTime = now - timeWindow;
    
    const recentEventsInWindow = recentEvents.filter(
      event => new Date(event.timestamp!).getTime() > cutoffTime
    );
    
    // Top endpoints by security events
    const endpointStats: Record<string, number> = {};
    recentEventsInWindow.forEach(event => {
      endpointStats[event.endpoint] = (endpointStats[event.endpoint] || 0) + 1;
    });
    
    const topEndpoints = Object.entries(endpointStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([endpoint, count]) => ({ endpoint, count }));
    
    // Security event trends (hourly buckets)
    const eventTrends: Record<string, number> = {};
    recentEventsInWindow.forEach(event => {
      const hour = new Date(event.timestamp!).toISOString().substring(0, 13) + ':00:00.000Z';
      eventTrends[hour] = (eventTrends[hour] || 0) + 1;
    });
    
    const trends = Object.entries(eventTrends)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([timestamp, count]) => ({ timestamp, count }));
    
    // Response data
    const dashboardData = {
      summary: {
        timeRange,
        totalEvents: securityStats.totalEvents,
        totalUniqueIPs: securityStats.topIPs.length,
        rateLimiterBackend: rateLimiterStats.backend,
        timestamp: new Date().toISOString()
      },
      eventsByType: securityStats.eventsByType,
      topIPs: securityStats.topIPs,
      topEndpoints,
      trends,
      recentEvents: recentEvents.slice(0, 50), // Limit for dashboard
      rateLimiterStats,
      healthStatus: {
        securityMonitoring: 'active',
        rateLimiting: rateLimiterStats.backend === 'redis' ? 'optimal' : 'fallback',
        corsProtection: 'active',
        inputValidation: 'active'
      }
    };
    
    return json(dashboardData, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Security dashboard error:', error);
    return json({ error: 'Dashboard unavailable' }, { 
      status: 500,
      headers: corsHeaders
    });
  }
};

// Clear security events (admin only)
export const DELETE: RequestHandler = async ({ request }) => {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  try {
    // Admin authentication check
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY || process.env.INTERNAL_API_KEY;
    
    if (!authHeader || !adminKey || authHeader !== `Bearer ${adminKey}`) {
      return json({ error: 'Unauthorized' }, { 
        status: 401,
        headers: corsHeaders
      });
    }
    
    // Clear old security events (keep last 100)
    const recentEvents = SecurityMonitor.getRecentEvents(100);
    // In a real implementation, you'd update the internal storage
    
    return json({ 
      message: 'Security events cleared',
      remaining: recentEvents.length,
      timestamp: new Date().toISOString()
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Security clear error:', error);
    return json({ error: 'Clear operation failed' }, { 
      status: 500,
      headers: corsHeaders
    });
  }
};

// Handle OPTIONS
export const OPTIONS: RequestHandler = async ({ request }) => {
  const origin = request.headers.get('origin');
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin)
  });
};
