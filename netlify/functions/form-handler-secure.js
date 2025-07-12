// Enhanced form-handler.js with Security
// Adds CORS, rate limiting, input validation, and sanitization

// Rate limiting storage
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 300000; // 5 minutes
const RATE_LIMIT_MAX = 3; // 3 form submissions per 5 minutes per IP

// CORS configuration
const allowedOrigins = [
  'https://theblockchain.ai',
  'https://www.theblockchain.ai'
];

if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:4173');
}

function isRateLimited(ip) {
  const now = Date.now();
  const key = `form:${ip}`;
  
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

function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return 'Email is required';
  }
  
  if (email.length > 254) {
    return 'Email too long';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  
  // Check for suspicious patterns
  if (/<script|javascript:|on\w+=/i.test(email)) {
    return 'Invalid characters in email';
  }
  
  return null;
}

function validateFormData(formName, formData) {
  const errors = [];
  
  // Common validations
  if (formData.email) {
    const emailError = validateEmail(formData.email);
    if (emailError) errors.push(emailError);
  }
  
  // Form-specific validations
  if (formName === 'founder-registration') {
    if (!formData.email) {
      errors.push('Email is required for founder registration');
    }
    
    if (formData.role && Array.isArray(formData.role)) {
      if (formData.role.length === 0) {
        errors.push('At least one role must be selected');
      }
      
      const validRoles = ['developer', 'designer', 'entrepreneur', 'investor', 'other'];
      for (const role of formData.role) {
        if (!validRoles.includes(role)) {
          errors.push(`Invalid role: ${role}`);
        }
      }
    }
  } else if (formName === 'investor-interest') {
    if (!formData.name || typeof formData.name !== 'string') {
      errors.push('Name is required for investor interest');
    }
    
    if (!formData.email) {
      errors.push('Email is required for investor interest');
    }
    
    if (formData.name && formData.name.length > 100) {
      errors.push('Name too long (max 100 characters)');
    }
    
    if (formData.organization && formData.organization.length > 200) {
      errors.push('Organization name too long (max 200 characters)');
    }
  }
  
  return errors;
}

function sanitizeText(text, maxLength = 500) {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .trim()
    .replace(/[<>]/g, '')
    .replace(/[^\w\s\-.,!?@]/g, '')
    .substring(0, maxLength);
}

function sanitizeFormData(formData) {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (Array.isArray(value)) {
      sanitized[key] = value.map(v => sanitizeText(v, 50));
    } else if (typeof value === 'string') {
      if (key === 'email') {
        sanitized[key] = value.trim().toLowerCase().substring(0, 254);
      } else {
        sanitized[key] = sanitizeText(value, key === 'name' ? 100 : 500);
      }
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
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
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // CORS validation
    if (origin && !allowedOrigins.includes(origin)) {
      console.warn(`[SECURITY] CORS violation from ${clientIP}, origin: ${origin}`);
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Origin not allowed' })
      };
    }
    
    // Rate limiting
    if (isRateLimited(clientIP)) {
      console.warn(`[SECURITY] Rate limit exceeded for ${clientIP}`);
      return {
        statusCode: 429,
        headers: {
          ...corsHeaders,
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Window': String(RATE_LIMIT_WINDOW / 1000),
          'Retry-After': '300'
        },
        body: JSON.stringify({ error: 'Rate limit exceeded. Please wait before submitting another form.' })
      };
    }

    // Parse and validate input
    const body = JSON.parse(event.body);
    const { formName, ...rawFormData } = body;
    
    if (!formName || typeof formName !== 'string') {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Form name is required' })
      };
    }
    
    const validFormNames = ['founder-registration', 'investor-interest'];
    if (!validFormNames.includes(formName)) {
      console.warn(`[SECURITY] Invalid form name from ${clientIP}: ${formName}`);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid form type' })
      };
    }
    
    // Sanitize form data
    const formData = sanitizeFormData(rawFormData);
    
    // Validate form data
    const validationErrors = validateFormData(formName, formData);
    if (validationErrors.length > 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Validation failed',
          details: validationErrors
        })
      };
    }

    // Email content based on form type
    let emailSubject, emailBody, recipientList;

    if (formName === 'founder-registration') {
      emailSubject = 'New Founder Program Registration';
      emailBody = `
        New founder registration received:
        
        Email: ${formData.email}
        Roles: ${formData.role ? formData.role.join(', ') : 'Not specified'}
        
        IP Address: ${clientIP}
        Submitted at: ${new Date().toISOString()}
      `;
      recipientList = process.env.FOUNDER_EMAIL || 'founders@theblockchain.ai';
    } else if (formName === 'investor-interest') {
      emailSubject = 'New Investor Interest Submission';
      emailBody = `
        New investor interest received:
        
        Name: ${formData.name}
        Email: ${formData.email}
        Organization: ${formData.organization || 'Not specified'}
        Investment Interests: ${formData.interest ? formData.interest.join(', ') : 'Not specified'}
        Investment Range: ${formData['investment-range'] || 'Not specified'}
        
        IP Address: ${clientIP}
        Submitted at: ${new Date().toISOString()}
      `;
      recipientList = process.env.INVESTOR_EMAIL || 'invest@theblockchain.ai';
    }

    // Log successful submission
    console.log('Secure form submission received:', {
      formName,
      email: formData.email,
      ip: clientIP,
      timestamp: new Date().toISOString()
    });

    // TODO: Add actual email sending logic here
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: recipientList,
      from: process.env.FROM_EMAIL,
      subject: emailSubject,
      text: emailBody,
    };
    
    await sgMail.send(msg);
    */

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
        'X-RateLimit-Remaining': String(Math.max(0, RATE_LIMIT_MAX - (rateLimitStore.get(`form:${clientIP}`)?.count || 0)))
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Secure form submission error:', error);
    console.warn(`[SECURITY] Form handler error from ${clientIP}: ${error.message}`);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      })
    };
  }
};
