// Netlify function to handle form submissions and send email notifications
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { formName, ...formData } = body;

    // Email content based on form type
    let emailSubject, emailBody, recipientList;

    if (formName === 'founder-registration') {
      emailSubject = 'New Founder Program Registration';
      emailBody = `
        New founder registration received:
        
        Email: ${formData.email}
        Roles: ${formData.role ? formData.role.join(', ') : 'Not specified'}
        
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
        
        Submitted at: ${new Date().toISOString()}
      `;
      recipientList = process.env.INVESTOR_EMAIL || 'invest@theblockchain.ai';
    } else {
      throw new Error('Unknown form type');
    }

    // For now, we'll just log the data since you mentioned Netlify handles the emails
    // In production, you could integrate with SendGrid, Mailgun, or other email services
    console.log('Form submission received:', {
      formName,
      data: formData,
      timestamp: new Date().toISOString()
    });

    // You can add actual email sending logic here if needed
    // Example with SendGrid or similar service:
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
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully' 
      })
    };

  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};