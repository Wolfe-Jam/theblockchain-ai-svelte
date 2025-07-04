<!-- src/pages/FoundersProofPage.svelte - Flagship Founder's Proof Minting Experience -->
<script>
  import { onMount } from 'svelte';
  
  // State management
  let spotsLeft = 1337;
  let isConnecting = false;
  let isConnected = false;
  let walletAddress = '';
  let isMinting = false;
  let mintSuccess = false;
  let mintError = '';
  
  // Animated counter
  onMount(() => {
    const interval = setInterval(() => {
      spotsLeft -= Math.floor(Math.random() * 3) + 1;
      if (spotsLeft < 500) spotsLeft = 1337; // reset for demo
    }, 3500);
    
    return () => clearInterval(interval);
  });
  
  // Mock wallet connection (replace with real Web3 integration)
  async function connectWallet() {
    isConnecting = true;
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock wallet address
      walletAddress = '0x' + Math.random().toString(16).substr(2, 40);
      isConnected = true;
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      isConnecting = false;
    }
  }
  
  // Mock minting process (replace with real smart contract interaction)
  async function mintFoundersProof() {
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    isMinting = true;
    mintError = '';
    
    try {
      // Simulate minting transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate success
      mintSuccess = true;
      spotsLeft -= 1;
    } catch (error) {
      mintError = 'Minting failed. Please try again.';
      console.error('Minting error:', error);
    } finally {
      isMinting = false;
    }
  }
  
  function disconnectWallet() {
    isConnected = false;
    walletAddress = '';
    mintSuccess = false;
    mintError = '';
  }
  
  // Format wallet address for display
  function formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
</script>

<svelte:head>
  <title>Mint Your Founder's Proof | theBlockchain.ai</title>
  <meta name="description" content="Mint your exclusive Founder's Proof NFT. Verifiable on-chain status, priority access, and exclusive community membership." />
</svelte:head>

<div class="min-h-screen bg-slate-900 text-white">
  
  <!-- Hero Section -->
  <section class="relative overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-slate-900 to-brand-cyan/20"></div>
    
    <!-- Animated background elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>
    
    <div class="relative max-w-6xl mx-auto px-6 py-24">
      <div class="text-center">
        <!-- Badge -->
        <div class="inline-flex items-center bg-slate-800/50 rounded-full px-6 py-3 border border-brand-orange/30 mb-8">
          <div class="w-2 h-2 bg-brand-orange rounded-full animate-pulse mr-3"></div>
          <span class="text-brand-orange-text font-mono font-bold">{spotsLeft}</span>
          <span class="text-slate-300 ml-2">Founder Proofs Remaining</span>
        </div>
        
        <!-- Main title -->
        <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span class="block text-white">EARLY IS</span>
          <span class="block bg-gradient-to-r from-brand-orange to-brand-cyan bg-clip-text text-transparent">SMART</span>
        </h1>
        
        <h2 class="text-3xl md:text-4xl font-bold text-brand-cyan-text mb-8">
          Your Stake Awaits
        </h2>
        
        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
          Mint your exclusive <strong class="text-brand-orange">Founder's Proof</strong> — 
          a non-transferable ERC-1155 token that verifies you were here first. 
          Get priority access, exclusive benefits, and join the inner circle of the convergent economy.
        </p>
        
        <!-- Primary CTA -->
        {#if mintSuccess}
          <div class="inline-flex flex-col items-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 border border-green-500/30">
            <i class="fas fa-check-circle text-4xl text-white mb-4"></i>
            <h3 class="text-2xl font-bold text-white mb-2">Founder's Proof Minted!</h3>
            <p class="text-green-100 mb-4">Welcome to the founding community</p>
            <div class="text-sm text-green-200 font-mono">
              Token ID: #{1337 - spotsLeft + 1}
            </div>
          </div>
        {:else if !isConnected}
          <button 
            on:click={connectWallet}
            disabled={isConnecting}
            class="inline-flex items-center text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50"
            style="background: linear-gradient(to right, #EA580C, #0CC0DF);"
          >
            {#if isConnecting}
              <div class="loader mr-3"></div>
              Connecting Wallet...
            {:else}
              <i class="fas fa-wallet mr-3"></i>
              Connect Wallet to Mint
            {/if}
          </button>
        {:else}
          <div class="flex flex-col items-center gap-4">
            <div class="flex items-center bg-slate-800/50 rounded-full px-6 py-3 border border-brand-cyan/30">
              <i class="fas fa-check-circle text-brand-cyan mr-3"></i>
              <span class="text-brand-cyan-text font-semibold">Connected: {formatAddress(walletAddress)}</span>
              <button on:click={disconnectWallet} class="ml-4 text-slate-400 hover:text-white transition-colors">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <button 
              on:click={mintFoundersProof}
              disabled={isMinting}
              class="inline-flex items-center text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50"
              style="background: linear-gradient(to right, #0CC0DF, #004AAE);"
            >
              {#if isMinting}
                <div class="loader mr-3"></div>
                Minting Your Proof...
              {:else}
                <i class="fas fa-certificate mr-3"></i>
                Mint My Founder's Proof
              {/if}
            </button>
            
            {#if mintError}
              <div class="text-red-400 text-center">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                {mintError}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Founder's Proof Showcase -->
  <section class="py-24 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        
        <!-- NFT Visualization -->
        <div class="relative">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-brand-orange via-brand-cyan to-brand-orange rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div class="relative bg-slate-900 rounded-2xl p-8 border border-slate-700">
              <img 
                src="https://github.com/Wolfe-Jam/theblockchain-ai/blob/main/Public/theBlockchain-ai.png?raw=true" 
                alt="Founder's Proof NFT" 
                class="w-full h-auto max-w-md mx-auto rounded-xl shadow-2xl"
              />
              <div class="mt-6 text-center">
                <h3 class="text-2xl font-bold text-white mb-2">Founder's Proof #{1337 - spotsLeft + 1}</h3>
                <p class="text-brand-cyan-text font-mono">ERC-1155 • Non-transferable • Verified</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="space-y-8">
          <div>
            <h3 class="text-3xl font-bold text-white mb-6">Exclusive Benefits</h3>
            <p class="text-xl text-slate-300 mb-8">
              Your Founder's Proof isn't just a token — it's your key to the convergent economy.
            </p>
          </div>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-brand-cyan/20">
              <div class="w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-shield-alt text-slate-900"></i>
              </div>
              <div>
                <h4 class="text-xl font-bold text-brand-cyan-text mb-2">Verifiable Status</h4>
                <p class="text-slate-300">Cryptographically signed proof you were here first. Immutable record on the blockchain.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-orange-600/20">
              <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #EA580C;">
                <i class="fas fa-rocket text-white"></i>
              </div>
              <div>
                <h4 class="text-xl font-bold mb-2" style="color: #FF914D;">Priority Access</h4>
                <p class="text-slate-300">First access to new tools, beta features, and exclusive launches. Skip the waitlist.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-blue-600/20">
              <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #004AAE;">
                <i class="fas fa-gift text-white"></i>
              </div>
              <div>
                <h4 class="text-xl font-bold text-brand-blue-text mb-2">Airdrop Eligibility</h4>
                <p class="text-slate-300">Qualify for future token airdrops and governance rights in the ecosystem.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-yellow-500/20">
              <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #EEAD1A;">
                <i class="fas fa-percentage text-slate-900"></i>
              </div>
              <div>
                <h4 class="text-xl font-bold mb-2" style="color: #EEAD1A;">Fee Multipliers</h4>
                <p class="text-slate-300">Discounted platform fees and exclusive pricing on premium services.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-slate-600/20">
              <div class="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src="/zero-fraud-icon.svg" alt="Zero Fraud Inner Circle" class="w-12 h-12" />
              </div>
              <div>
                <h4 class="text-xl font-bold text-white mb-2">Inner Circle</h4>
                <p class="text-slate-300">Join the exclusive zero-fraud community and shape the future of trust in the platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Technical Details -->
  <section class="py-24 bg-slate-800/30">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h3 class="text-3xl font-bold text-white mb-8">Technical Specifications</h3>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div class="text-brand-cyan text-4xl mb-4">
            <i class="fas fa-code"></i>
          </div>
          <h4 class="text-xl font-bold text-brand-cyan-text mb-2">ERC-1155</h4>
          <p class="text-slate-300">Multi-token standard supporting both fungible and non-fungible tokens in one contract.</p>
        </div>
        
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div class="text-brand-orange text-4xl mb-4">
            <i class="fas fa-lock"></i>
          </div>
          <h4 class="text-xl font-bold text-brand-orange-text mb-2">Non-transferable</h4>
          <p class="text-slate-300">Soulbound token that stays with your wallet forever. Cannot be sold or transferred.</p>
        </div>
        
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div class="text-brand-blue-text text-4xl mb-4">
            <i class="fas fa-infinity"></i>
          </div>
          <h4 class="text-xl font-bold text-brand-blue-text mb-2">Limited Supply</h4>
          <p class="text-slate-300">Only 1,337 Founder's Proof tokens will ever exist. Exclusive membership.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="py-24 bg-gradient-to-br from-brand-orange/10 via-slate-900 to-brand-cyan/10">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h3 class="text-4xl font-bold text-white mb-6">Ready to Claim Your Stake?</h3>
      <p class="text-xl text-slate-300 mb-8">
        Join the founding community of the convergent economy. Your future self will thank you.
      </p>
      
      {#if !mintSuccess && !isConnected}
        <button 
          on:click={connectWallet}
          disabled={isConnecting}
          class="inline-flex items-center text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          style="background: linear-gradient(to right, #EA580C, #004AAE);"
        >
          {#if isConnecting}
            <div class="loader mr-3"></div>
            Connecting...
          {:else}
            <i class="fas fa-certificate mr-3"></i>
            Mint Your Proof Now
          {/if}
        </button>
      {:else if mintSuccess}
        <div class="flex flex-col items-center gap-6">
          <div class="text-6xl text-green-400">
            <i class="fas fa-check-circle"></i>
          </div>
          <h4 class="text-2xl font-bold text-white">Welcome, Founder #{1337 - spotsLeft + 1}</h4>
          <a 
            href="/deep-dive/the-convergent-economy"
            class="inline-flex items-center bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300"
          >
            <i class="fas fa-book-open mr-3"></i>
            Explore The Convergent Economy
          </a>
        </div>
      {/if}
    </div>
  </section>
</div>

<style>
  /* Loader animation */
  .loader {
    width: 20px;
    height: 20px;
    border: 2px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Pulse animation for background elements */
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }

  /* Brand color variables */
  :global(:root) {
    --brand-orange: #FF914D;
    --brand-cyan: #0CC0DF;
    --brand-blue: #004AAE;
    --brand-blue-text: #2563EB;
    --brand-cyan-text: #06B6D4;
    --brand-orange-text: #EA580C;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .text-5xl.md\:text-7xl {
      font-size: 3rem;
    }
    
    .text-3xl.md\:text-4xl {
      font-size: 2rem;
    }
    
    .text-xl.md\:text-2xl {
      font-size: 1.125rem;
    }
    
    .grid.lg\:grid-cols-2 {
      grid-template-columns: 1fr;
    }
    
    .grid.md\:grid-cols-3 {
      grid-template-columns: 1fr;
    }
  }
</style>
