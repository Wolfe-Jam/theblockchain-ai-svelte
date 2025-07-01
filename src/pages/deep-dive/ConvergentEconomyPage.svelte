<!-- src/pages/deep-dive/ConvergentEconomyPage.svelte -->
<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
</script>

<div class="min-h-screen bg-slate-900 text-white">
  <!-- Hero Section -->
  <div class="relative bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative max-w-4xl mx-auto px-6 py-24">
      <div class="text-center">
        <h1 class="text-5xl font-bold mb-6 text-center">
          <span class="block text-blue-500">DEEP Dives:</span>
          <span class="block text-blue-400">The CONVERGENT Economy</span>
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          A new multi-trillion dollar frontier is emerging from the intersection of AI, Software, and Blockchain. 
          Tokenizing is the key to unlocking its value.
        </p>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-4xl mx-auto px-6 py-16">
    
    <!-- The Trillion-Dollar Triumvirate -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6 text-cyan-400">The Trillion-Dollar Triumvirate</h2>
      <p class="text-lg text-slate-300 mb-8 leading-relaxed">
        AI, Software, and Blockchain are independently massive markets. Their convergence creates an unprecedented economic force.
      </p>
      
      <div class="bg-slate-800 rounded-lg p-8 mb-8">
        <h3 class="text-2xl font-semibold mb-4 text-white">Market Size Forecasts (2030-2034)</h3>
        <p class="text-slate-300 leading-relaxed">
          Projections show these sectors commanding a multi-trillion dollar combined value within the next decade.
        </p>
      </div>
      
      <div class="bg-slate-800 rounded-lg p-8">
        <h3 class="text-2xl font-semibold mb-4 text-white">Compound Annual Growth Rate (CAGR)</h3>
        <p class="text-slate-300 leading-relaxed">
          Blockchain's exponential growth rate signals its early-stage, high-potential status compared to the more mature AI and Software markets.
        </p>
      </div>
    </section>

    <hr class="border-slate-700 mb-16">

    <!-- The Convergence Catalyst -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6 text-cyan-400">The Convergence Catalyst</h2>
      <p class="text-lg text-slate-300 mb-8 leading-relaxed">
        AI and Blockchain are not just coexisting; they are symbiotically enhancing each other, creating a premium market for "Trustworthy AI".
      </p>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-slate-800 rounded-lg p-8">
          <h3 class="text-2xl font-semibold mb-6 text-cyan-400">AI Enhances Blockchain</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="text-2xl">🧠</span>
              <span class="text-slate-300">Intelligent Oracles & Data Verification</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-2xl">🛡️</span>
              <span class="text-slate-300">Enhanced Network Security & Anomaly Detection</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-2xl">⚙️</span>
              <span class="text-slate-300">Predictive Network Optimization</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-slate-800 rounded-lg p-8">
          <h3 class="text-2xl font-semibold mb-6 text-orange-400">Blockchain Enhances AI</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="text-2xl">🔎</span>
              <span class="text-slate-300">Solves "Black Box" with Verifiable Data Provenance</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-2xl">🔒</span>
              <span class="text-slate-300">Creates Immutable Audit Trails for AI Models</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-2xl">🌐</span>
              <span class="text-slate-300">Democratizes Access to Data & Compute Power</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <hr class="border-slate-700 mb-16">

    <!-- The Smart Contract Revolution -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6 text-cyan-400">The Smart Contract Revolution</h2>
      <p class="text-lg text-slate-300 mb-8 leading-relaxed">
        You've heard the hype, but the real revolution isn't about collectibles. It's about using Smart Contracts to create a new economic layer for software.
      </p>
      
      <div class="space-y-6">
        <div class="bg-slate-800 rounded-lg p-6">
          <h4 class="text-xl font-semibold mb-3 text-orange-400">Automated Royalties</h4>
          <p class="text-slate-300">
            Embed your payment terms directly into your code. Get paid for every use, automatically and transparently, without intermediaries.
          </p>
        </div>
        
        <div class="bg-slate-800 rounded-lg p-6">
          <h4 class="text-xl font-semibold mb-3 text-orange-400">Verifiable IP Protection</h4>
          <p class="text-slate-300">
            Your contribution is cryptographically signed and recorded on-chain, creating an immutable proof of ownership and provenance.
          </p>
        </div>
        
        <div class="bg-slate-800 rounded-lg p-6">
          <h4 class="text-xl font-semibold mb-3 text-orange-400">Open Ownership Protocol</h4>
          <p class="text-slate-300">
            Enable fractional ownership of software projects, allowing teams and communities to build, govern, and profit together.
          </p>
        </div>
      </div>
    </section>

    <hr class="border-slate-700 mb-16">

    <!-- The Delivery Mechanism: ERC-1155 -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6 text-cyan-400">The Delivery Mechanism: ERC-1155</h2>
      <p class="text-lg text-slate-300 mb-8 leading-relaxed">
        The ERC-1155 Multi-Token Standard is the key. Unlike older standards that handle only one type of asset, 
        ERC-1155 allows a single smart contract to manage everything a project needs. This means unparalleled efficiency and interoperability.
      </p>
      
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-slate-800 rounded-lg p-6 text-center">
          <h4 class="text-xl font-semibold mb-3 text-cyan-400">FUNGIBLE</h4>
          <p class="text-slate-300">Royalties, API credits, governance votes.</p>
        </div>
        
        <div class="bg-slate-800 rounded-lg p-6 text-center">
          <h4 class="text-xl font-semibold mb-3 text-orange-400">NON-FUNGIBLE</h4>
          <p class="text-slate-300">Unique IP ownership, access keys.</p>
        </div>
        
        <div class="bg-slate-800 rounded-lg p-6 text-center">
          <h4 class="text-xl font-semibold mb-3 text-blue-400">ALL-IN-ONE</h4>
          <p class="text-slate-300">One contract to rule them all.</p>
        </div>
      </div>
      
      <div class="bg-slate-900 rounded-lg p-6 overflow-x-auto">
        <pre class="text-green-400 text-sm"><code>{`interface ERC1155 {
  // Get the balance of a specific token
  function balanceOf(
    address account, 
    uint256 id
  ) external view returns (uint256);
  
  // Transfer multiple token types
  function safeBatchTransferFrom(
    address from, 
    address to, 
    uint256[] calldata ids, 
    uint256[] calldata amounts, 
    bytes calldata data
  ) external;
}`}</code></pre>
      </div>
    </section>

    <hr class="border-slate-700 mb-16">

    <!-- The Developer Economy -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6 text-cyan-400">The Developer Economy: From Coder to Capitalist</h2>
      <p class="text-lg text-slate-300 mb-8 leading-relaxed">
        Our platform transforms your code from a static asset into a dynamic, revenue-generating machine. 
        You don't just write code; you create capital.
      </p>
      
      <div class="bg-slate-800 rounded-lg p-8 mb-8">
        <h3 class="text-2xl font-semibold mb-6 text-orange-400">Your Code, Tokenizing.</h3>
        <p class="text-slate-300 mb-6 leading-relaxed">
          We represent your open-source contribution as a unique on-chain asset. This isn't just a record; 
          it's a liquid, tradable stake in your own work.
        </p>
        
        <div class="bg-slate-900 rounded-lg p-6 overflow-x-auto">
          <pre class="text-green-400 text-sm"><code>{`contract DeveloperStake {
  address public owner;
  string public repoUrl;
  uint256 public revenueShare;
  
  constructor() {
    owner = msg.sender;
  }
}`}</code></pre>
        </div>
      </div>
    </section>

    <hr class="border-slate-700 mb-16">

    <!-- Call to Action -->
    <section class="text-center bg-gradient-to-r from-cyan-900 to-blue-900 rounded-lg p-12">
      <h2 class="text-3xl font-bold mb-6 text-white">See the Vision in Action</h2>
      <p class="text-xl text-slate-300 mb-8 leading-relaxed">
        Explore our interactive tools to experience the power of Code-In-Action firsthand.
      </p>
      <a 
        href="/tools" 
        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
      >
        Try the Smart Contract Generator
      </a>
    </section>
  </div>
</div>

<style>
  /* Additional component-specific styles */
  pre {
    font-family: 'Fira Code', 'Courier New', monospace;
    line-height: 1.5;
  }
  
  code {
    font-family: 'Fira Code', 'Courier New', monospace;
  }
</style>
