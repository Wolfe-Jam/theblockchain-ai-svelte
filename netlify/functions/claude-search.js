// Secure Claude API Function
// Replaces client-side API key exposure with server-side proxy

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
  
  try {
    // 1. CORS validation
    const origin = event.headers.origin;
    const allowedOrigins = [
      'https://theblockchain.ai',
      'https://www.theblockchain.ai'
    ];
    
    // Add localhost for development
    if (process.env.NODE_ENV === 'development') {
      allowedOrigins.push('http://localhost:5173', 'http://localhost:4173');
    }
    
    if (origin && !allowedOrigins.includes(origin)) {
      return { 
        statusCode: 403, 
        body: JSON.stringify({ error: 'Origin not allowed' }),
        headers: {
          'Access-Control-Allow-Origin': 'null',
          'Content-Type': 'application/json'
        }
      };
    }
    
    // 2. Authentication check (internal API key)
    const authHeader = event.headers.authorization;
    const expectedAuth = `Bearer ${process.env.INTERNAL_API_KEY}`;
    
    if (!authHeader || authHeader !== expectedAuth) {
      return { 
        statusCode: 401, 
        body: JSON.stringify({ error: 'Unauthorized' }),
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://theblockchain.ai',
          'Content-Type': 'application/json'
        }
      };
    }
    
    // 3. Input validation
    const body = JSON.parse(event.body);
    const { query, mode = 'search' } = body;
    
    if (!query || typeof query !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid query' }),
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://theblockchain.ai',
          'Content-Type': 'application/json'
        }
      };
    }
    
    if (query.length > 1000) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Query too long' }),
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://theblockchain.ai',
          'Content-Type': 'application/json'
        }
      };
    }
    
    // 4. Get Claude API key from secure environment
    const claudeApiKey = process.env.CLAUDE_API_KEY;
    
    if (!claudeApiKey) {
      console.error('Claude API key not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Service configuration error' }),
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://theblockchain.ai',
          'Content-Type': 'application/json'
        }
      };
    }
    
    // 5. Prepare Claude request based on mode
    let claudePrompt;
    let maxTokens = 1000;
    
    if (mode === 'search') {
      claudePrompt = `You are helping users find components in a developer marketplace for theblockchain.ai.

User query: "${query}"

Analyze the user's intent and provide helpful search guidance. Consider:
1. What problem are they trying to solve?
2. What type of component might they need?
3. Suggest relevant search terms

Respond in a helpful, concise manner (max 200 words).`;
    } else {
      claudePrompt = query;
      maxTokens = 2000;
    }
    
    // 6. Make Claude API call
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: maxTokens,
        messages: [{ 
          role: 'user', 
          content: claudePrompt 
        }]
      })
    });
    
    if (!claudeResponse.ok) {
      console.error('Claude API error:', claudeResponse.status, claudeResponse.statusText);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'AI service temporarily unavailable' }),
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://theblockchain.ai',
          'Content-Type': 'application/json'
        }
      };
    }
    
    const claudeResult = await claudeResponse.json();
    
    // 7. Success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin || 'https://theblockchain.ai',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      },
      body: JSON.stringify({
        success: true,
        data: claudeResult,
        mode,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('Claude function error:', error);
    
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      }),
      headers: {
        'Access-Control-Allow-Origin': event.headers.origin || 'https://theblockchain.ai',
        'Content-Type': 'application/json'
      }
    };
  }
};
