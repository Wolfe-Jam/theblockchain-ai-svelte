// netlify/functions/ask-ai.js

// Import necessary modules
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2); 
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Main handler for the Netlify Function
exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        // Parse the request body to get the user's question
        const { userQuestion } = JSON.parse(event.body);

        if (!userQuestion) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing userQuestion in request body' }),
            };
        }

        // --- Read Knowledge Base Content from Local Files ---
        const knowledgeBasePath = path.join(__dirname, '../../docs/knowledge-base');
        let combinedContext = "";
        let fetchedFiles = [];

        try {
            // Read all markdown files from the knowledge base directory
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
            // Continue with empty context if files can't be read
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

User Question: ${userQuestion}

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
            body: JSON.stringify({ 
                answer: formattedResponse,
                filesUsed: fetchedFiles 
            }),
        };
    } catch (error) {
        console.error('Error in ask-ai function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: 'An error occurred while processing your request.',
                error: error.message 
            }),
        };
    }
};