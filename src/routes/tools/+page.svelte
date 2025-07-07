<!-- Simple Tools Test Page -->
<script>
  import { onMount } from 'svelte';
  import Header from '../../components/Header.svelte';
  import Footer from '../../components/Footer.svelte';
  import AskAIModal from '../../components/AskAIModal.svelte';
  import AboutModal from '../../components/AboutModal.svelte';
  
  let showAskAI = false;
  let showAbout = false;
  
  function handleOpenAskAI() {
    showAskAI = true;
  }
  
  function handleOpenAbout() {
    showAbout = true;
  }
  
  let promptInput = '';
  let generatedCode = '';
  let isGenerating = false;
  let showResult = false;
  let copyButtonText = 'Copy';
  let apiError = '';
  
  // Professional Gemini API integration with environment variables
  async function callGemini(prompt) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your environment variables.");
    }
    
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
      let code;
      try {
        code = await callGemini(promptInput);
      } catch (geminiError) {
        console.log('Gemini API failed, falling back to Netlify function:', geminiError);
        
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
  
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedCode);
      copyButtonText = 'Copied!';
      setTimeout(() => {
        copyButtonText = 'Copy';
      }, 2000);
    } catch (error) {
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
    "An ERC20 token with built-in staking rewards for holders."
  ];
  
  function useExamplePrompt(prompt) {
    promptInput = prompt;
  }
  
  let spotsLeft = 1337;
  
  onMount(() => {
    const interval = setInterval(() => {
      spotsLeft -= Math.floor(Math.random() * 3) + 1;
      if (spotsLeft < 500) spotsLeft = 1337;
    }, 2500);
    
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Smart Contract Generator | theBlockchain.ai</title>
  <meta name="description" content="Generate Solidity smart contracts using AI. Describe your logic in plain English and get production-ready code." />
</svelte:head>

<div class="app-container">
  <Header on:openAskAI={handleOpenAskAI} on:openAbout={handleOpenAbout} />
  
  <div class="min-h-screen bg-slate-900 text-white">
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
          <span class="block bg-gradient-to-r from-orange-500 to-cyan-400 bg-clip-text text-transparent">
            GENERATOR
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
          Have an idea for a protocol? Describe the logic in plain English, and let Gemini generate the Solidity boilerplate. Your next project starts here.
        </p>
        
        <div class="inline-flex items-center bg-slate-800/50 rounded-full px-6 py-3 border border-orange-500/30">
          <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-3"></div>
          <span class="text-orange-600 font-mono font-bold">{spotsLeft}</span>
          <span class="text-slate-300 ml-2">contracts generated today</span>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-5xl mx-auto px-6 py-16">
    <div class="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
      <label for="prompt-input" class="block text-xl font-bold mb-4 text-cyan-400">
        <i class="fas fa-code mr-2"></i>
        Describe your smart contract logic:
      </label>
      
      <div class="relative">
        <textarea 
          id="prompt-input"
          bind:value={promptInput}
          placeholder="e.g., An ERC721 contract where the minting fee is split 90% to the artist and 10% to the platform..."
          class="w-full h-36 bg-slate-900 border-2 border-slate-600 rounded-lg p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-none transition-all duration-300"
          disabled={isGenerating}
        ></textarea>
        
        <div class="absolute bottom-3 right-3 text-xs text-slate-500">
          {promptInput.length} characters
        </div>
      </div>
      
      <div class="flex items-center justify-between mt-6">
        <button 
          on:click={generateContract}
          disabled={isGenerating || !promptInput.trim()}
          class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
        >
          {#if isGenerating}
            <div class="flex items-center gap-3">
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

    <div class="mb-8">
      <h3 class="text-2xl font-bold mb-6 text-white flex items-center">
        <i class="fas fa-lightbulb text-yellow-400 mr-3"></i>
        Try these examples:
      </h3>
      <div class="grid md:grid-cols-2 gap-4">
        {#each examplePrompts as prompt, index}
          <button 
            on:click={() => useExamplePrompt(prompt)}
            class="text-left bg-slate-700 hover:bg-slate-600 p-4 rounded-lg transition-all duration-300 text-slate-300 hover:text-white border border-slate-600 hover:border-cyan-400 group"
          >
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 bg-cyan-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-orange-500 transition-colors">
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

    {#if showResult}
      <div class="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-cyan-400 flex items-center">
            <i class="fas fa-file-code mr-3"></i>
            Generated Smart Contract
          </h3>
          
          {#if !apiError}
            <button 
              on:click={copyToClipboard}
              class="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105"
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
          <div class="bg-slate-900 rounded-lg p-6 overflow-x-auto border border-slate-600">
            <pre class="text-green-400 text-sm leading-relaxed"><code>{generatedCode}</code></pre>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

  <Footer />
</div>

{#if showAskAI}
  <AskAIModal on:close={() => showAskAI = false} />
{/if}

{#if showAbout}
  <AboutModal on:close={() => showAbout = false} />
{/if}

<style>
  .app-container {
    min-height: 100vh;
    background-color: #020617;
    color: #f8fafc;
  }

<style>
  .loader {
    width: 20px;
    height: 20px;
    border: 2px solid #FFF;
    border-bottom-color: #ea580c;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .deep-dive-label {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #0cc0df;
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
    background: #0cc0df;
    opacity: 0.6;
  }
</style>