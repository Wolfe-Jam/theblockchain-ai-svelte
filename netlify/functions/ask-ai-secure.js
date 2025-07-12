// Enhanced ask-ai.js with Security
// Adds CORS, rate limiting, and input validation

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');

// Rate limiting storage (in-memory for simplicity)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

// CORS configuration
const allowedOrigins = [
  'https://theblockchain.ai',
  'https://www.theblockchain.ai'
];

// Add localhost for development
if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:4173');
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2); 
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function isRateLimited(ip) {
  const now = Date.now();
  const key = `askai:${ip}`;
  
  // Clean old entries
  for (const [k, data] of rateLimitStore.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(k);
    }
  }
  
  const existing = rateLimitStore.get(key);
  if (!existing) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return false;
  }
  
  if (now - existing.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return false;
  }
  
  existing.count++;
  return existing.count > RATE_LIMIT_MAX;
}

function validateInput(userQuestion) {
  if (!userQuestion || typeof userQuestion !== 'string') {
    return 'Question must be a string';
  }
  
  if (userQuestion.length === 0) {
    return 'Question cannot be empty';
  }
  
  if (userQuestion.length > 2000) {
    return 'Question too long (max 2000 characters)';
  }
  
  // XSS prevention
  if (/<script[^>]*>|javascript:|on\w+\s*=/i.test(userQuestion)) {
    return 'Invalid characters detected in question';
  }
  
  return null;
}

function sanitizeInput(text) {
  return text
    .trim()
    .replace(/[<>]/g, '')
    .replace(/[^\w\s\-.,!?@]/g, '')
    .substring(0, 2000);
}

exports.handler = async (event, context) => {
  const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
  const origin = event.headers.origin;
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  };
  
  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
  
  try {
    // CORS validation
    if (origin && !allowedOrigins.includes(origin)) {
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Origin not allowed' })
      };
    }
    
    // Rate limiting
    if (isRateLimited(clientIP)) {
      return {
        statusCode: 429,
        headers: {
          ...corsHeaders,
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Window': String(RATE_LIMIT_WINDOW / 1000),
          'Retry-After': '60'
        },
        body: JSON.stringify({ error: 'Rate limit exceeded. Please wait before asking another question.' })
      };
    }
    
    // Parse and validate input
    const { userQuestion } = JSON.parse(event.body);
    
    const validationError = validateInput(userQuestion);
    if (validationError) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: validationError })
      };
    }
    
    const sanitizedQuestion = sanitizeInput(userQuestion);
    
    // --- Read Knowledge Base Content from Local Files ---
    const knowledgeBasePath = path.join(__dirname, '../../docs/knowledge-base');
    let combinedContext = "";
    let fetchedFiles = [];

    try {
      const files = await fs.readdir(knowledgeBasePath);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(knowledgeBasePath, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          combinedContext += `\n\n--- Document: ${file} ---\n${fileContent}`;
          fetchedFiles.push(file);
        }
      }
      
      console.log(`Successfully loaded ${fetchedFiles.length} knowledge base files.`);
    } catch (error) {
      console.error("Error reading knowledge base files:", error);
      combinedContext = "";
    }
    
    // --- Construct Prompt for Gemini AI ---
    const documentTitle = "theBlockchain.ai Knowledge Base";

    const prompt = `As an AI assistant for "theBlockchain.ai" (always use the full name "theBlockchain.ai", not "Blockchain.ai"), answer the following question based on the provided content from the "${documentTitle}". 

Key points to remember:
- theBlockchain.ai is a revolutionary marketplace for digital assets, specifically code components and AI-powered solutions
- The platform uses blockchain technology to enable true code ownership
- bAI Credits are the platform's native currency
- The "ABCs of bAI" explain the core concepts: Asset, Blockchain, The 3 C's (Company, Code, Customers), People (Devs, Designers, Decision-Makers), and e-Commerce
- The OUTPUT Marketplace is where components are bought and sold
- Features include advanced search (standard and AI-powered), code tokenization, and comprehensive developer tools

Focus on accuracy and direct answers. If the information isn't in the knowledge base, you can provide general helpful information about the platform based on the context provided.

Context from Knowledge Base:
${combinedContext}

User Question: ${sanitizedQuestion}

Provide a helpful, informative response:`;

    // --- Query Gemini AI ---
    const generationResult = await model.generateContent(prompt);
    const responseText = generationResult.response.text();

    // --- Format the response ---
    const formattedResponse = responseText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      .replace(/\n- /g, '</p><ul><li>')
      .replace(/\n\d+\. /g, '</p><ol><li>')
      .replace(/<\/li>\n/g, '</li><li>')
      .replace(/<li>(.*?)<\/p>/g, '<li>$1</li></ul><p>')
      .replace(/<\/ul><p><ul>/g, '')
      .replace(/<\/ol><p><ol>/g, '');

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
        'X-RateLimit-Remaining': String(Math.max(0, RATE_LIMIT_MAX - (rateLimitStore.get(`askai:${clientIP}`)?.count || 0)))
      },
      body: JSON.stringify({ 
        answer: formattedResponse,
        filesUsed: fetchedFiles,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('Error in ask-ai function:', error);
    
    // Log security event
    console.warn(`[SECURITY] ask-ai error from ${clientIP}: ${error.message}`);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'An error occurred while processing your request.',
        timestamp: new Date().toISOString()
      })
    };
  }
};
