<!-- src/pages/FoundersProofPage.svelte - Flagship Founder's Proof Minting Experience -->
<script>
  import { onMount } from 'svelte';
  import WaitingListModal from '../components/WaitingListModal.svelte';
  
  // State management
  let spotsLeft = 1337;
  let isConnecting = false;
  let isConnected = false;
  let walletAddress = '';
  let isMinting = false;
  let mintSuccess = false;
  let mintError = '';
  
  // Waiting list modal state
  let showWaitingListModal = false;
  
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
            <h3 class="text-2xl font-bold text-white mb-2">Welcome, Founder!</h3>
            <p class="text-green-100 mb-4">Your Founder's Proof has been minted successfully.</p>
            <div class="flex items-center text-green-100">
              <i class="fas fa-wallet mr-2"></i>
              <span class="font-mono">{formatAddress(walletAddress)}</span>
            </div>
          </div>
        {:else if isConnected}
          <div class="flex flex-col items-center gap-4">
            <button 
              on:click={mintFoundersProof}
              disabled={isMinting}
              class="inline-flex flex-col items-center bg-gradient-to-r from-brand-orange to-brand-cyan hover:from-brand-orange/90 hover:to-brand-cyan/90 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              {#if isMinting}
                <div class="flex items-center mb-1">
                  <div class="loader mr-3"></div>
                  <span>Minting Your Proof...</span>
                </div>
                <span class="text-sm font-normal opacity-75">Simulation Mode</span>
              {:else}
                <div class="flex items-center mb-1">
                  <i class="fas fa-certificate mr-3"></i>
                  <span>Mint Founder's Proof</span>
                </div>
                <span class="text-sm font-normal opacity-75">Simulation Mode</span>
              {/if}
            </button>
            
            <!-- Secondary CTA: Join Waiting List -->
            <button 
              on:click={() => showWaitingListModal = true}
              class="inline-flex items-center bg-slate-800/50 hover:bg-slate-700/50 border border-brand-cyan/30 hover:border-brand-cyan/50 text-brand-cyan-text font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-300"
            >
              <i class="fas fa-bell mr-3"></i>
              Join the Waiting List
            </button>
            
            {#if mintError}
              <div class="text-red-400 text-center">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                {mintError}
              </div>
            {/if}
          </div>
        {:else}
          <div class="flex flex-col items-center gap-4">
            <button 
              on:click={connectWallet}
              disabled={isConnecting}
              class="inline-flex flex-col items-center bg-gradient-to-r from-brand-orange to-brand-cyan hover:from-brand-orange/90 hover:to-brand-cyan/90 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              {#if isConnecting}
                <div class="flex items-center mb-1">
                  <div class="loader mr-3"></div>
                  <span>Connecting Wallet...</span>
                </div>
                <span class="text-sm font-normal opacity-75">Simulation Mode</span>
              {:else}
                <div class="flex items-center mb-1">
                  <i class="fas fa-wallet mr-3"></i>
                  <span>Connect Wallet to Mint</span>
                </div>
                <span class="text-sm font-normal opacity-75">Simulation Mode</span>
              {/if}
            </button>
            
            <!-- Secondary CTA: Join Waiting List -->
            <button 
              on:click={() => showWaitingListModal = true}
              class="inline-flex items-center bg-slate-800/50 hover:bg-slate-700/50 border border-brand-cyan/30 hover:border-brand-cyan/50 text-brand-cyan-text font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-300"
            >
              <i class="fas fa-bell mr-3"></i>
              Join the Waiting List
            </button>
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
      
      {#if mintSuccess}
        <!-- Success State: Show next steps -->
        <div class="flex flex-col items-center gap-6">
          <div class="text-6xl text-green-400 mb-4">
            <i class="fas fa-check-circle"></i>
          </div>
          <h4 class="text-2xl font-bold text-white mb-6">Welcome, Founder #{1337 - spotsLeft + 1}</h4>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <a 
              href="/deep-dive/the-convergent-economy"
              class="inline-flex items-center bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-cyan/90 hover:to-brand-blue/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <i class="fas fa-book-open mr-3"></i>
              Explore The Convergent Economy
            </a>
            
            <a 
              href="/invest"
              class="inline-flex items-center bg-gradient-to-r from-brand-orange to-orange-600 hover:from-brand-orange/90 hover:to-orange-600/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <i class="fas fa-chart-line mr-3"></i>
              View Investment Opportunities
            </a>
          </div>
        </div>
      {:else if isConnected}
        <!-- Connected State: Show minting or waiting list options -->
        <div class="flex flex-col items-center gap-6">
          <button 
            on:click={mintFoundersProof}
            disabled={isMinting}
            class="inline-flex items-center bg-gradient-to-r from-brand-orange to-brand-cyan hover:from-brand-orange/90 hover:to-brand-cyan/90 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isMinting}
              <div class="loader mr-3"></div>
              Minting Your Proof...
            {:else}
              <i class="fas fa-certificate mr-3"></i>
              Mint Your Founder's Proof
            {/if}
          </button>
          
          <p class="text-sm text-slate-400 italic">Simulation Mode - Real minting coming soon</p>
          
          {#if mintError}
            <div class="text-red-400 text-center bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <i class="fas fa-exclamation-triangle mr-2"></i>
              {mintError}
            </div>
          {/if}
        </div>
      {:else}
        <!-- Not Connected State: Show connection and alternative options -->
        <div class="flex flex-col items-center gap-6">
          <button 
            on:click={connectWallet}
            disabled={isConnecting}
            class="inline-flex items-center bg-gradient-to-r from-brand-orange to-brand-cyan hover:from-brand-orange/90 hover:to-brand-cyan/90 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isConnecting}
              <div class="loader mr-3"></div>
              Connecting Wallet...
            {:else}
              <i class="fas fa-wallet mr-3"></i>
              Connect Wallet to Mint
            {/if}
          </button>
          
          <p class="text-sm text-slate-400 italic">Simulation Mode - Real wallet integration coming soon</p>
          
          <!-- Alternative: Join Waiting List -->
          <div class="mt-4">
            <p class="text-slate-300 mb-4">Don't have a wallet yet?</p>
            <button 
              on:click={() => showWaitingListModal = true}
              class="inline-flex items-center bg-slate-800/50 hover:bg-slate-700/50 border border-brand-cyan/30 hover:border-brand-cyan/50 text-brand-cyan-text font-semibold py-3 px-8 rounded-xl transition-all duration-300"
            >
              <i class="fas fa-bell mr-3"></i>
              Join the Waiting List Instead
            </button>
          </div>
        </div>
      {/if}
    </div>
  </section>
  
  <!-- Waiting List Modal -->
  <WaitingListModal 
    bind:isOpen={showWaitingListModal} 
    on:close={() => showWaitingListModal = false} 
  />
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
