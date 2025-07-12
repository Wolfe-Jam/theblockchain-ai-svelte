// Health Check Netlify Function
// Provides system health monitoring and status checks

const allowedOrigins = [
  'https://theblockchain.ai',
  'https://www.theblockchain.ai'
];

if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:4173');
}

async function checkDatabaseHealth() {
  try {
    // Basic check - if Supabase URL is configured
    if (!process.env.VITE_SUPABASE_URL) {
      return { status: 'error', message: 'Database URL not configured' };
    }
    
    // In a real implementation, you'd make a simple query to test connection
    return { status: 'healthy', message: 'Database connection configured' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkAIServices() {
  const services = {};
  
  // Check Gemini API
  if (process.env.GEMINI_API_KEY2) {
    services.gemini = { status: 'configured', message: 'API key present' };
  } else {
    services.gemini = { status: 'error', message: 'API key missing' };
  }
  
  // Check Claude API
  if (process.env.CLAUDE_API_KEY) {
    services.claude = { status: 'configured', message: 'API key present' };
  } else {
    services.claude = { status: 'warning', message: 'API key missing' };
  }
  
  return services;
}

async function checkSecurityConfig() {
  const checks = {};
  
  // Internal API key
  checks.internalApiKey = process.env.INTERNAL_API_KEY ? 
    { status: 'configured' } : 
    { status: 'error', message: 'Internal API key missing' };
  
  // Admin API key
  checks.adminApiKey = process.env.ADMIN_API_KEY ? 
    { status: 'configured' } : 
    { status: 'warning', message: 'Admin API key missing' };
  
  // Redis configuration
  checks.redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ? 
    { status: 'configured', message: 'Redis configured for production' } : 
    { status: 'warning', message: 'Redis not configured, using memory storage' };
  
  return checks;
}

function getSystemInfo() {
  return {
    environment: process.env.NODE_ENV || 'unknown',
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? `${Math.floor(process.uptime())}s` : 'unknown',
    version: process.env.npm_package_version || 'unknown'
  };
}

exports.handler = async (event, context) => {
  const origin = event.headers.origin;
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : 'null',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  };
  
  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }
  
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    const startTime = Date.now();
    
    // Run health checks
    const [database, aiServices, security] = await Promise.all([
      checkDatabaseHealth(),
      checkAIServices(),
      checkSecurityConfig()
    ]);
    
    const systemInfo = getSystemInfo();
    const responseTime = Date.now() - startTime;
    
    // Determine overall health status
    let overallStatus = 'healthy';
    
    // Check for critical errors
    if (database.status === 'error' || 
        security.internalApiKey.status === 'error' ||
        (aiServices.gemini.status === 'error' && aiServices.claude.status === 'error')) {
      overallStatus = 'unhealthy';
    }
    // Check for warnings
    else if (database.status === 'warning' || 
             security.adminApiKey.status === 'warning' ||
             security.redis.status === 'warning' ||
             aiServices.claude.status === 'warning') {
      overallStatus = 'degraded';
    }
    
    const healthData = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      system: systemInfo,
      checks: {
        database,
        aiServices,
        security
      },
      services: {
        rateLimiting: security.redis.status === 'configured' ? 'redis' : 'memory',
        cors: 'active',
        inputValidation: 'active',
        securityMonitoring: 'active'
      }
    };
    
    // Set appropriate HTTP status based on health
    let httpStatus = 200;
    if (overallStatus === 'unhealthy') httpStatus = 503;
    else if (overallStatus === 'degraded') httpStatus = 200; // Still operational
    
    return {
      statusCode: httpStatus,
      headers: {
        ...corsHeaders,
        'X-Health-Status': overallStatus,
        'X-Response-Time': `${responseTime}ms`
      },
      body: JSON.stringify(healthData, null, 2)
    };
    
  } catch (error) {
    console.error('Health check error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        status: 'error',
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      })
    };
  }
};
