// netlify/functions/ask-ai.js

// Import necessary modules
const { GoogleGenerativeAI } = require('@google/generative-ai'); // For interacting with Gemini API
const fetch = require('node-fetch'); // For making HTTP requests to GitHub (Node.js doesn't have native fetch before Node 18)

// Initialize the Google Generative AI client
// The API key is securely retrieved from Netlify Environment Variables
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

        // --- Fetch Knowledge Base Content from Private GitHub Repository ---
        // Retrieve GitHub details from Netlify Environment Variables
        const githubPat = process.env.GITHUB_PAT;
        const repoOwner = process.env.GITHUB_REPO_OWNER;
        const repoName = process.env.GITHUB_REPO_NAME;
        const knowledgeBasePath = 'docs/knowledge-base'; // Path to your knowledge base within the repo

        if (!githubPat || !repoOwner || !repoName) {
            console.error("Missing GitHub environment variables");
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Server configuration error: GitHub access details missing.' }),
            };
        }

        let combinedContext = "";
        let fetchedFiles = [];

        // Function to recursively fetch directory content
        async function fetchGithubDirContent(path) {
            const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
            const headers = {
                'Authorization': `token ${githubPat}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Netlify-Function-theBlockchainAI' // GitHub requires a User-Agent
            };

            const response = await fetch(url, { headers });
            if (!response.ok) {
                console.error(`Failed to fetch GitHub content from ${url}: ${response.status} ${response.statusText}`);
                throw new Error(`GitHub API error: ${response.statusText}`);
            }
            const data = await response.json();

            // Iterate over items in the directory
            for (const item of data) {
                if (item.type === 'file' && item.name.endsWith('.md')) {
                    // If it's a Markdown file, fetch its raw content
                    const fileContentResponse = await fetch(item.download_url, { headers: { 'Authorization': `token ${githubPat}` } });
                    if (!fileContentResponse.ok) {
                         console.error(`Failed to fetch raw file content from ${item.download_url}: ${fileContentResponse.status} ${fileContentResponse.statusText}`);
                         throw new Error(`GitHub API raw file error: ${fileContentResponse.statusText}`);
                    }
                    const fileContent = await fileContentResponse.text();
                    combinedContext += `\n\n--- Document: ${item.path} ---\n${fileContent}`;
                    fetchedFiles.push(item.path);
                } else if (item.type === 'dir') {
                    // If it's a directory, recursively fetch its content
                    await fetchGithubDirContent(item.path);
                }
            }
        }

        try {
            await fetchGithubDirContent(knowledgeBasePath);
            console.log(`Successfully fetched ${fetchedFiles.length} Markdown files.`);
        } catch (githubError) {
            console.error("Error fetching from GitHub:", githubError);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: `Failed to retrieve knowledge base: ${githubError.message}` }),
            };
        }
        
        // --- Construct Prompt for Gemini AI ---
        const documentTitle = "theBlockchain.ai Strategic Documents and Knowledge Base";

        const prompt = `As an AI assistant for "theBlockchain.ai" (always use the full name "theBlockchain.ai", not "Blockchain.ai"), answer the following question based on the provided content from the "${documentTitle}". Focus on accuracy and direct answers derived strictly from the text provided. If the answer is not explicitly in the text, state clearly that you cannot answer based on the provided information. Do not invent information.

Question: ${userQuestion}

Context:
${combinedContext}

Answer:`;

        // --- Call Gemini AI ---
        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(prompt);
        const responseText = await result.response.text();

        // --- Return AI Response ---
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ answer: responseText }),
        };

    } catch (error) {
        console.error("Error in Netlify function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Internal server error: ${error.message}` }),
        };
    }
};
