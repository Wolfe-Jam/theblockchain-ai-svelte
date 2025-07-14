// Development-only form handler for local testing
// This mimics the Netlify function for development purposes

import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { formName, ...formData } = body;

    // Log the form submission for development
    console.log('📧 Development Form Submission:', {
      formName,
      email: formData.email,
      format: formData.format,
      source: formData.source,
      timestamp: formData.timestamp
    });

    // Simulate different form types
    if (formName === 'convergent-economy-download') {
      console.log('✅ PDF Download Request:', {
        email: formData.email,
        format: formData.format || 'business',
        source: formData.source
      });
    }

    // Simulate successful response (like the Netlify function would)
    return json({
      success: true,
      message: 'Form submitted successfully (development mode)',
      dev: true
    });

  } catch (error) {
    console.error('❌ Development form handler error:', error);
    
    return json({
      error: 'Development form handler error',
      message: error.message
    }, { status: 500 });
  }
}