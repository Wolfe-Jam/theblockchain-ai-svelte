<!-- AI Tools Page - Smart Contract Generator -->
<script>
  import { onMount } from 'svelte';
  
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
        
        const response = await fetch('/.netlify/functions/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Act as an expert Solidity developer. Based on the following request, generate a complete, well-commented, and secure boilerplate smart contract using Solidity ^0.8.20. The request is: "${promptInput}". The contract should be clean, production-ready code with proper error handling and security considerations.`
          })
        });
        
        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]) {
          const responseText = data.candidates[0].content.parts[0].text;
          code = responseText.replace(/^```solidity\n|```$/g, '').trim();
        } else {
          code = 'Error generating contract. Please try again.';
        }
      }
      
      generatedCode = code || 'Error generating contract. Please try again.';
      codeEvaluation = evaluateCode(generatedCode);
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
    "An ERC-1155 contract where the minting fee is split 90% to the artist and 10% to the platform.",
    "A simple voting contract where users can vote on proposals with a deadline.",
    "An ERC20 token with built-in staking rewards for holders.",
    "A marketplace contract for buying and selling digital assets with escrow functionality.",
    "A time-locked vault contract that releases tokens after a specific date.",
    "A multi-signature wallet contract requiring 2 out of 3 signatures for transactions."
  ];
  
  function useExamplePrompt(prompt) {
    promptInput = prompt;
  }
  
  let spotsLeft = 0;
  let codeEvaluation = null;
  
  // Dynamic code evaluation function
  function evaluateCode(code) {
    if (!code || code.length < 100) return null;
    
    const evaluation = {
      productionScore: 5,
      securityScore: 5,
      goodFeatures: [],
      needsWork: [],
      devTasks: []
    };
    
    // Check for security features
    if (code.includes('@openzeppelin/contracts')) {
      evaluation.securityScore += 2;
      evaluation.goodFeatures.push('OpenZeppelin imports (industry standard)');
    }
    if (code.includes('Ownable') || code.includes('AccessControl')) {
      evaluation.securityScore += 1;
      evaluation.goodFeatures.push('Access control mechanisms');
    }
    if (code.includes('require(') && code.includes('!= address(0)')) {
      evaluation.securityScore += 1;
      evaluation.goodFeatures.push('Input validation and zero address checks');
    }
    if (code.includes('ReentrancyGuard') || code.includes('nonReentrant')) {
      evaluation.securityScore += 1;
      evaluation.goodFeatures.push('Reentrancy protection');
    }
    
    // Check for documentation
    if (code.includes('/**') || code.includes('@dev') || code.includes('@param')) {
      evaluation.productionScore += 1;
      evaluation.goodFeatures.push('Comprehensive documentation');
    }
    
    // Check for potential issues
    if (code.includes('placeholder') || code.includes('TODO') || code.includes('not implemented')) {
      evaluation.productionScore -= 2;
      evaluation.needsWork.push('Contains placeholder or unimplemented functions');
      evaluation.devTasks.push('Complete placeholder implementations');
    }
    if (!code.includes('test') && !code.includes('Test')) {
      evaluation.needsWork.push('No testing framework included');
      evaluation.devTasks.push('Write comprehensive tests');
    }
    if (code.includes('withdraw') && !code.includes('mapping')) {
      evaluation.needsWork.push('Withdrawal without proper accounting');
      evaluation.devTasks.push('Implement proper balance tracking');
    }
    
    // Ensure scores are within bounds
    evaluation.productionScore = Math.max(1, Math.min(10, evaluation.productionScore));
    evaluation.securityScore = Math.max(1, Math.min(10, evaluation.securityScore));
    
    return evaluation;
  }
  
  // Function to calculate contracts generated today (minutes since midnight EST)
  function calculateContractsGenerated() {
    // Get current time in Eastern Time (handles EST/EDT automatically)
    const easternTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    
    const now = new Date(easternTime);
    
    // Get midnight of today in Eastern Time
    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0);
    
    // Calculate minutes since midnight
    const minutesSinceMidnight = Math.floor((now.getTime() - midnight.getTime()) / (1000 * 60));
    
    return Math.max(0, minutesSinceMidnight);
  }
  
  onMount(() => {
    // Initialize the counter
    spotsLeft = calculateContractsGenerated();
    
    // Update every minute (60,000 milliseconds)
    const interval = setInterval(() => {
      spotsLeft = calculateContractsGenerated();
    }, 60000);
    
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Smart Contract Generator | theBlockchain.ai</title>
  <meta name="description" content="Generate Solidity smart contracts using AI. Describe your logic in plain English and get production-ready code." />
</svelte:head>

<!-- Main Tools Interface -->
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
          Powered by 🧠 bAI
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
          
          <!-- Code Quality Assessment -->
          {#if codeEvaluation}
          <div class="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-lg p-6 border border-slate-600/50">
            <h4 class="text-xl font-bold text-white mb-6 flex items-center">
              <i class="fas fa-chart-line text-yellow-400 mr-3"></i>
              Code Quality Assessment
            </h4>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Production Readiness Score -->
              <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-slate-300 font-semibold">Production Ready</span>
                  <span class="text-2xl font-bold text-yellow-400">{codeEvaluation.productionScore}/10</span>
                </div>
                <div class="w-full bg-slate-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style="width: {codeEvaluation.productionScore * 10}%"></div>
                </div>
                <p class="text-xs text-slate-400 mt-2">
                  {#if codeEvaluation.productionScore >= 8}Excellent foundation, minimal work needed
                  {:else if codeEvaluation.productionScore >= 6}Solid foundation, needs development work
                  {:else if codeEvaluation.productionScore >= 4}Basic structure, significant work required
                  {:else}Prototype only, major development needed{/if}
                </p>
              </div>
              
              <!-- Security Score -->
              <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-slate-300 font-semibold">Security</span>
                  <span class="text-2xl font-bold text-green-400">{codeEvaluation.securityScore}/10</span>
                </div>
                <div class="w-full bg-slate-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full" style="width: {codeEvaluation.securityScore * 10}%"></div>
                </div>
                <p class="text-xs text-slate-400 mt-2">
                  {#if codeEvaluation.securityScore >= 8}Strong security practices
                  {:else if codeEvaluation.securityScore >= 6}Good security basics
                  {:else if codeEvaluation.securityScore >= 4}Basic security, needs improvement
                  {:else}Security review required{/if}
                </p>
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6 mt-6">
              <!-- What's Good -->
              <div>
                <h5 class="text-lg font-bold text-green-400 mb-3 flex items-center">
                  <i class="fas fa-check-circle mr-2"></i>
                  What's Good
                </h5>
                <ul class="space-y-2 text-sm">
                  {#each codeEvaluation.goodFeatures as feature}
                  <li class="flex items-start gap-2 text-slate-300">
                    <i class="fas fa-check text-green-400 mt-1 text-xs"></i>
                    {feature}
                  </li>
                  {/each}
                  {#if codeEvaluation.goodFeatures.length === 0}
                  <li class="text-slate-400 italic">Basic structure in place</li>
                  {/if}
                </ul>
              </div>
              
              <!-- Needs Work -->
              <div>
                <h5 class="text-lg font-bold text-orange-400 mb-3 flex items-center">
                  <i class="fas fa-tools mr-2"></i>
                  Needs Development
                </h5>
                <ul class="space-y-2 text-sm">
                  {#each codeEvaluation.needsWork as issue}
                  <li class="flex items-start gap-2 text-slate-300">
                    <i class="fas fa-exclamation-triangle text-orange-400 mt-1 text-xs"></i>
                    {issue}
                  </li>
                  {/each}
                  {#if codeEvaluation.needsWork.length === 0}
                  <li class="text-slate-400 italic">Minimal issues detected</li>
                  {/if}
                </ul>
              </div>
            </div>
            
            <!-- Developer Next Steps -->
            <div class="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h5 class="text-lg font-bold text-blue-400 mb-3 flex items-center">
                <i class="fas fa-list-check mr-2"></i>
                Developer Checklist
              </h5>
              <div class="grid md:grid-cols-2 gap-4">
                {#each codeEvaluation.devTasks as task, index}
                  {#if index % 2 === 0}
                  <div class="space-y-2">
                    <label class="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                      <input type="checkbox" class="text-blue-400 rounded" />
                      {task}
                    </label>
                  </div>
                  {:else}
                  <div class="space-y-2">
                    <label class="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                      <input type="checkbox" class="text-blue-400 rounded" />
                      {task}
                    </label>
                  </div>
                  {/if}
                {/each}
                {#if codeEvaluation.devTasks.length === 0}
                <div class="col-span-2">
                  <label class="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" class="text-blue-400 rounded" />
                    Write comprehensive tests
                  </label>
                  <label class="flex items-center gap-2 text-sm text-slate-300 cursor-pointer mt-2">
                    <input type="checkbox" class="text-blue-400 rounded" />
                    Security audit before mainnet
                  </label>
                </div>
                {/if}
              </div>
            </div>
          </div>
          {/if}
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

    <!-- Complete 3-Step Workflow -->
    <div class="bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-slate-800/20 rounded-xl p-8 border border-cyan-400/20">
      <h3 class="text-3xl font-bold mb-8 text-center text-white">
        <i class="fas fa-rocket text-orange-500 mr-3"></i>
        What's Next? Deploy Your Contract
      </h3>
      
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-slate-800/50 rounded-lg p-6 border border-slate-600 hover:border-cyan-400 transition-colors group">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h4 class="text-xl font-bold text-cyan-400 group-hover:text-cyan-400">Copy Code</h4>
          </div>
          <p class="text-slate-300 mb-4">Use the copy button above to grab your generated contract code.</p>
          <div class="text-xs text-cyan-400 font-mono bg-slate-900/50 p-2 rounded">
            Ctrl+C / Cmd+C
          </div>
        </div>
        
        <div class="bg-slate-800/50 rounded-lg p-6 border border-slate-600 hover:border-orange-500 transition-colors group">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h4 class="text-xl font-bold text-orange-400 group-hover:text-orange-400">Open Remix IDE</h4>
          </div>
          <p class="text-slate-300 mb-4">Paste your code into the free, web-based Solidity IDE.</p>
          <a 
            href="https://remix.ethereum.org" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold transition-colors"
          >
            <i class="fas fa-external-link-alt mr-2"></i>
            Open Remix →
          </a>
        </div>
        
        <div class="bg-slate-800/50 rounded-lg p-6 border border-slate-600 hover:border-blue-400 transition-colors group">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h4 class="text-xl font-bold text-blue-400 group-hover:text-blue-400">Compile & Deploy</h4>
          </div>
          <p class="text-slate-300 mb-4">Test on Sepolia testnet before mainnet deployment.</p>
          <div class="text-xs text-blue-400 font-mono bg-slate-900/50 p-2 rounded">
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