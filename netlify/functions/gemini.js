// This function lives on Netlify's servers. It's the secure "clerk".
exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        
        // Get the secret API key from Netlify's secure environment
        const apiKey = process.env.GEMINI_API_KEY2;

        if (!apiKey) {
             throw new Error("API key is not set.");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            // If Google's response is not OK, forward the error
            const errorBody = await response.text();
            return {
                statusCode: response.status,
                body: `Error from Google API: ${errorBody}`
            };
        }

        const result = await response.json();

        // Send the result back to your webpage
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };

    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
