<!-- src/pages/ToolsPage.svelte - Enhanced with HTML features -->
<script>
  import { onMount } from 'svelte';
  
  let promptInput = '';
  let generatedCode = '';
  let isGenerating = false;
  let showResult = false;
  let copyButtonText = 'Copy';
  let apiError = '';
  
  // Professional Gemini API integration (extracted from HTML)
  async function callGemini(prompt) {
    const apiKey = ""; // You'll need to add your Gemini API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ 
        role: "user", 
        parts: [{ 
          text: `Act as an expert Solidity developer. Based on the following request, generate a complete, well-commented, and secure boilerplate smart contract using Solidity ^0.8.20. The request is: "${prompt}". The contract should be clean, production-ready code with proper error handling and security considerations.`
        }] 
      }]
    };
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]) {
      const responseText = result.candidates[0].content.parts[0].text;
      // Clean the response to remove markdown code blocks
      return responseText.replace(/^```solidity\n|```$/g, '').trim();
    }
    
    throw new Error("Invalid response structure from API.");
  }
  
  // Enhanced generate function with better error handling
  async function generateContract() {
    if (!promptInput.trim()) return;
    
    isGenerating = true;
    showResult = false;
    apiError = '';
    
    try {
      // Try Gemini API first (more reliable), fallback to Netlify function
      let code;
      try {
        code = await callGemini(promptInput);
      } catch (geminiError) {
        console.log('Gemini API failed, falling back to Netlify function:', geminiError);
        
        // Fallback to your existing Netlify function
        const response = await fetch('/.netlify/functions/ask-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userQuestion: `Generate a Solidity smart contract based on this description: ${promptInput}. 
            Please provide clean, commented Solidity code that implements the described functionality. 
            Include relevant imports and basic security considerations.`
          })
        });
        
        const data = await response.json();
        code = data.answer;
      }
      
      generatedCode = code || 'Error generating contract. Please try again.';
      showResult = true;
      
    } catch (error) {
      console.error('Contract generation error:', error);
      apiError = 'Sorry, an error occurred while generating the contract. Please check your internet connection and try again.';
      showResult = true;
    } finally {
      isGenerating = false;
    }
  }
  
  // Enhanced copy functionality with user feedback
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedCode);
      copyButtonText = 'Copied!';
      setTimeout(() => {
        copyButtonText = 'Copy';
      }, 2000);
    } catch (error) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = generatedCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copyButtonText = 'Copied!';
      setTimeout(() => {
        copyButtonText = 'Copy';
      }, 2000);
    }
  }
  
  const examplePrompts = [
    "An ERC721 contract where the minting fee is split 90% to the artist and 10% to the platform.",
    "A simple voting contract where users can vote on proposals with a deadline.",
    "An ERC20 token with built-in staking rewards for holders.",
    "A marketplace contract for buying and selling digital assets with escrow.",
    "An ERC1155 multi-token contract with batch transfer capabilities.",
    "A simple DAO governance contract with proposal voting and execution."
  ];
  
  function useExamplePrompt(prompt) {
    promptInput = prompt;
  }
  
  // Spots countdown animation (from HTML)
  let spotsLeft = 1337;
  
  onMount(() => {
    const interval = setInterval(() => {
      spotsLeft -= Math.floor(Math.random() * 3) + 1;
      if (spotsLeft < 500) spotsLeft = 1337; // reset
    }, 2500);
    
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Smart Contract Generator | theBlockchain.ai</title>
  <meta name="description" content="Generate Solidity smart contracts using AI. Describe your logic in plain English and get production-ready code." />
</svelte:head>

<div class="min-h-screen bg-slate-900 text-white">
  <!-- Enhanced Hero Section -->
  <div class="relative bg-gradient-to-br from-orange-900 via-slate-800 to-slate-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative max-w-5xl mx-auto px-6 py-24">
      <div class="text-center">
        <div class="deep-dive-label mb-6">
          ✨ AI-POWERED TOOLS
        </div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 leading-tight">
          <span class="block text-white">
            SMART CONTRACT
          </span>
          <span class="block bg-gradient-to-r from-brand-orange to-brand-cyan bg-clip-text text-transparent">
            GENERATOR
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
          Have an idea for a protocol? Describe the logic in plain English, and let Gemini generate the Solidity boilerplate. Your next project starts here.
        </p>
        
        <!-- Live counter -->
        <div class="inline-flex items-center bg-slate-800/50 rounded-full px-6 py-3 border border-brand-orange/30">
          <div class="w-2 h-2 bg-brand-orange rounded-full animate-pulse mr-3"></div>
          <span class="text-brand-orange-text font-mono font-bold">{spotsLeft}</span>
          <span class="text-slate-300 ml-2">contracts generated today</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Tool Interface -->
  <div class="max-w-5xl mx-auto px-6 py-16">
    
    <!-- Enhanced Input Section -->
    <div class="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
      <label for="prompt-input" class="block text-xl font-bold mb-4 text-brand-cyan-text">
        <i class="fas fa-code mr-2"></i>
        Describe your smart contract logic:
      </label>
      
      <div class="relative">
        <textarea 
          id="prompt-input"
          bind:value={promptInput}
          placeholder="e.g., An ERC721 contract where the minting fee is split 90% to the artist and 10% to the platform..."
          class="w-full h-36 bg-slate-900 border-2 border-slate-600 rounded-lg p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan resize-none transition-all duration-300"
          disabled={isGenerating}
        ></textarea>
        
        <!-- Character counter -->
        <div class="absolute bottom-3 right-3 text-xs text-slate-500">
          {promptInput.length} characters
        </div>
      </div>
      
      <div class="flex items-center justify-between mt-6">
        <button 
          on:click={generateContract}
          disabled={isGenerating || !promptInput.trim()}
          class="bg-gradient-to-r from-brand-orange to-brand-orange hover:from-brand-orange hover:to-brand-orange disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
        >
          {#if isGenerating}
            <div class="flex items-center gap-3">
              <!-- Professional loader (from HTML) -->
              <div class="loader"></div>
              <span>Generating with Gemini...</span>
            </div>
          {:else}
            <i class="fas fa-magic mr-2"></i>
            Generate Solidity Contract
          {/if}
        </button>
        
        <div class="flex items-center text-slate-400 text-sm">
          <img src="https://ai.google.dev/static/site-assets/images/gemini-favicon.svg" alt="Gemini" class="w-5 h-5 mr-2" />
          Powered by Gemini 2.0 Flash
        </div>
      </div>
    </div>

    <!-- Enhanced Example Prompts -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold mb-6 text-white flex items-center">
        <i class="fas fa-lightbulb text-yellow-400 mr-3"></i>
        Try these examples:
      </h3>
      <div class="grid md:grid-cols-2 gap-4">
        {#each examplePrompts as prompt, index}
          <button 
            on:click={() => useExamplePrompt(prompt)}
            class="text-left bg-slate-700 hover:bg-slate-600 p-4 rounded-lg transition-all duration-300 text-slate-300 hover:text-white border border-slate-600 hover:border-brand-cyan group"
          >
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 bg-brand-cyan text-slate-900 rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-brand-orange transition-colors">
                {index + 1}
              </div>
              <div class="flex-1">
                <p class="text-sm leading-relaxed">"{prompt}"</p>
              </div>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Enhanced Generated Code Section -->
    {#if showResult}
      <div class="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-brand-cyan-text flex items-center">
            <i class="fas fa-file-code mr-3"></i>
            Generated Smart Contract
          </h3>
          
          {#if !apiError}
            <button 
              on:click={copyToClipboard}
              class="bg-brand-cyan hover:bg-brand-cyan text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105"
              class:bg-green-500={copyButtonText === 'Copied!'}
              class:hover:bg-green-600={copyButtonText === 'Copied!'}
            >
              {#if copyButtonText === 'Copied!'}
                <i class="fas fa-check"></i>
              {:else}
                <i class="fas fa-copy"></i>
              {/if}
              {copyButtonText}
            </button>
          {/if}
        </div>
        
        {#if apiError}
          <!-- Error state -->
          <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <i class="fas fa-exclamation-triangle text-red-400 text-3xl mb-4"></i>
            <p class="text-red-300 text-lg mb-4">{apiError}</p>
            <button 
              on:click={generateContract}
              class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <i class="fas fa-redo mr-2"></i>
              Try Again
            </button>
          </div>
        {:else}
          <!-- Code display with enhanced styling -->
          <div class="code-container bg-slate-900 rounded-lg p-6 overflow-x-auto border border-slate-600">
            <pre class="text-green-400 text-sm leading-relaxed"><code>{generatedCode}</code></pre>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Professional divider -->
    <div class="flex items-center my-12">
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
      <div class="px-4">
        <i class="fas fa-chevron-down text-slate-500"></i>
      </div>
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
    </div>

    <!-- Enhanced What's Next Section -->
    <div class="bg-gradient-to-br from-brand-cyan/20 via-brand-blue/20 to-slate-800/20 rounded-xl p-8 border border-brand-cyan/20">
      <h3 class="text-3xl font-bold mb-8 text-center text-white">
        <i class="fas fa-rocket text-brand-orange mr-3"></i>
        What's Next? Deploy Your Contract
      </h3>
      
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-slate-800/50 rounded-lg p-6 border border-slate-600 hover:border-brand-cyan transition-colors group">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-brand-cyan to-brand-cyan text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h4 class="text-xl font-bold text-brand-cyan-text group-hover:text-brand-cyan-text">Copy Code</h4>
          </div>
          <p class="text-slate-300 mb-4">Use the copy button above to grab your generated contract code.</p>
          <div class="text-xs text-brand-cyan-text font-mono bg-slate-900/50 p-2 rounded">
            Ctrl+C / Cmd+C
          </div>
        </div>
        
        <div class="bg-slate-800/50 rounded-lg p-6 border border-slate-600 hover:border-brand-orange transition-colors group">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-orange text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h4 class="text-xl font-bold text-brand-orange-text group-hover:text-brand-orange">Open Remix IDE</h4>
          </div>
          <p class="text-slate-300 mb-4">Paste your code into the free, web-based Solidity IDE.</p>
          <a 
            href="https://remix.ethereum.org" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center text-brand-orange-text hover:text-brand-orange font-semibold transition-colors"
          >
            <i class="fas fa-external-link-alt mr-2"></i>
            Open Remix →
          </a>
        </div>
        
        <div class="bg-slate-800/50 rounded-lg p-6 border border-slate-600 hover:border-brand-blue-text transition-colors group">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-brand-blue-text to-brand-blue-text text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h4 class="text-xl font-bold text-brand-blue-text group-hover:text-brand-blue-text">Compile & Deploy</h4>
          </div>
          <p class="text-slate-300 mb-4">Test on Sepolia testnet before mainnet deployment.</p>
          <div class="text-xs text-brand-blue-text font-mono bg-slate-900/50 p-2 rounded">
            Solidity ^0.8.20
          </div>
        </div>
      </div>
      
      <!-- Call to action -->
      <div class="text-center">
        <div class="mb-4">
          <span class="text-slate-400">Want to learn more about our vision?</span>
        </div>
        <a 
          href="/deep-dive/the-convergent-economy" 
          class="inline-flex items-center bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <i class="fas fa-book-open mr-3"></i>
          Explore The Convergent Economy
          <i class="fas fa-arrow-right ml-3"></i>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Professional loader animation (extracted from HTML) */
  .loader {
    width: 20px;
    height: 20px;
    border: 2px solid #FFF;
    border-bottom-color: var(--brand-orange, #FF914D);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Deep dive label styling */
  .deep-dive-label {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brand-cyan, #0CC0DF);
    position: relative;
    display: inline-block;
  }

  .deep-dive-label::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: var(--brand-cyan, #0CC0DF);
    opacity: 0.6;
  }

  /* Enhanced code container */
  .code-container {
    position: relative;
  }

  .code-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--brand-cyan, #0CC0DF), transparent);
  }

  /* Code styling */
  pre {
    font-family: 'Fira Code', 'Roboto Mono', 'Courier New', monospace;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0;
  }

  code {
    font-family: 'Fira Code', 'Roboto Mono', 'Courier New', monospace;
  }

  /* Responsive improvements */
  @media (max-width: 768px) {
    .grid.md\:grid-cols-2 {
      grid-template-columns: 1fr;
    }
    
    .grid.md\:grid-cols-3 {
      grid-template-columns: 1fr;
    }
    
    .text-4xl.md\:text-6xl {
      font-size: 2.5rem;
    }
    
    .text-xl.md\:text-2xl {
      font-size: 1.125rem;
    }
  }

  /* Brand color variables for consistency */
  :global(:root) {
    --brand-orange: #FF914D;
    --brand-cyan: #0CC0DF;
    --brand-blue: #004AAE;
    --brand-blue-text: #2563EB;
    --brand-cyan-text: #06B6D4;
    --brand-orange-text: #EA580C;
  }
</style>
