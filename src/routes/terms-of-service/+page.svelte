<!-- Terms of Service Page -->
<script>
  import { onMount } from 'svelte';
  
  let showLegalDetails = false;
  
  function toggleLegalDetails() {
    showLegalDetails = !showLegalDetails;
  }
</script>

<svelte:head>
  <title>Terms of Service | theBlockchain.ai</title>
  <meta name="description" content="Our terms of service - clear expectations for using our marketplace, buying components, and using our tools." />
</svelte:head>

<!-- Main Terms of Service -->
<div class="min-h-screen bg-slate-900 text-white">
  <!-- Header -->
  <div class="relative bg-gradient-to-br from-orange-900 via-slate-800 to-slate-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative max-w-4xl mx-auto px-6 py-16">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
          <span class="block text-white">TERMS OF</span>
          <span class="block bg-gradient-to-r from-orange-500 to-cyan-400 bg-clip-text text-transparent">
            SERVICE
          </span>
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Here's the deal - clear expectations for using our marketplace, no legal BS.
        </p>
        <div class="mt-6 text-sm text-slate-400">
          <strong>Effective Date:</strong> July 14, 2025 | 
          <strong>Governed by:</strong> Georgia Law
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-6 py-16">
    
    <!-- NoBS Terms of Service -->
    <div class="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <h2 class="text-2xl font-bold text-green-400">The Deal</h2>
      </div>

      <div class="space-y-6 text-slate-300">
        <div>
          <h3 class="text-lg font-semibold text-white mb-3">What we offer:</h3>
          <ul class="space-y-2 ml-4">
            <li>• Digital components that actually work</li>
            <li>• Secure payment processing (Stripe handles the money stuff)</li>
            <li>• AI tools for smart contract generation</li>
            <li>• Professional developer resources</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3">What you do:</h3>
          <ul class="space-y-2 ml-4">
            <li>• Pay for what you buy (obviously)</li>
            <li>• Don't try to hack our stuff</li>
            <li>• Use components professionally, not maliciously</li>
            <li>• Keep your account info accurate</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3">Money stuff:</h3>
          <ul class="space-y-2 ml-4">
            <li>• All sales final (unless the component is broken)</li>
            <li>• Refunds within 30 days if something's actually wrong</li>
            <li>• We process payments through Stripe (they're the pros)</li>
            <li>• Prices in USD, taxes calculated at checkout</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3">What you can't do:</h3>
          <ul class="space-y-2 ml-4">
            <li>• Resell our components without proper licensing</li>
            <li>• Use our AI to generate illegal/harmful code</li>
            <li>• Share your account login</li>
            <li>• Be a jerk to other users</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3">If things go wrong:</h3>
          <ul class="space-y-2 ml-4">
            <li>• Email us first - we're reasonable humans</li>
            <li>• 30-day refund window for defective products</li>
            <li>• We'll fix legitimate problems quickly</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3">The fine print:</h3>
          <ul class="space-y-2 ml-4">
            <li>• We own our brand and platform</li>
            <li>• You own your code and data</li>
            <li>• Don't sue us for your business decisions</li>
            <li>• Use common sense</li>
          </ul>
        </div>

        <div class="mt-8 p-4 bg-orange-900/20 border border-orange-400/30 rounded-lg">
          <p class="text-orange-300">
            <strong>Questions?</strong> Email us at 
            <a href="mailto:support@theblockchain.ai" class="text-orange-400 hover:text-orange-300">
              support@theblockchain.ai
            </a>. We speak human, not lawyer.
          </p>
        </div>
      </div>
    </div>

    <!-- Legal Details Toggle -->
    <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <button 
        on:click={toggleLegalDetails}
        class="w-full p-6 text-left hover:bg-slate-700 transition-colors flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 bg-cyan-500 rounded-full"></div>
          <h2 class="text-xl font-bold text-cyan-400">Legal Details & Compliance</h2>
        </div>
        <div class="text-slate-400 transform transition-transform {showLegalDetails ? 'rotate-180' : ''}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </button>

      {#if showLegalDetails}
        <div class="px-6 pb-6 border-t border-slate-600">
          <div class="prose prose-invert max-w-none">
            <p class="text-sm text-slate-400 mb-6">
              Comprehensive legal terms for marketplace operations, payments, and business protection.
            </p>

            <div class="space-y-6 text-sm text-slate-300">
              
              <div>
                <h4 class="text-base font-semibold text-cyan-400 mb-3">Service Agreement</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Effective Date:</strong> July 14, 2025</li>
                  <li>• <strong>Governing Law:</strong> Georgia jurisdiction, federal law where applicable</li>
                  <li>• <strong>Agreement Type:</strong> Terms of service for digital marketplace and SaaS tools</li>
                  <li>• <strong>User Types:</strong> Individual developers, businesses, enterprise customers</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-cyan-400 mb-3">Platform Services</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Digital Marketplace:</strong> Component sales, licensing, distribution platform</li>
                  <li>• <strong>Payment Processing:</strong> Third-party integration (Stripe, PayPal, Coinbase Commerce)</li>
                  <li>• <strong>AI Services:</strong> Smart contract generation, code analysis tools</li>
                  <li>• <strong>User Accounts:</strong> Profile management, purchase history, download access</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-cyan-400 mb-3">Commercial Terms</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Purchase Terms:</strong> All sales final except defective products (30-day warranty)</li>
                  <li>• <strong>Pricing:</strong> USD displayed, inclusive of platform fees, exclusive of applicable taxes</li>
                  <li>• <strong>Payment Processing:</strong> PCI DSS compliant via Stripe (processor agreement governs)</li>
                  <li>• <strong>Refund Policy:</strong> 30-day window for non-conforming digital goods</li>
                  <li>• <strong>License Grant:</strong> Component usage rights per individual product licensing</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-cyan-400 mb-3">User Obligations</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Account Security:</strong> User responsible for credential protection, authorized use only</li>
                  <li>• <strong>Accurate Information:</strong> Billing, contact, business details must be current and truthful</li>
                  <li>• <strong>Prohibited Uses:</strong> No illegal activity, malicious code, trademark infringement, platform abuse</li>
                  <li>• <strong>Usage Compliance:</strong> Respect component licensing, intellectual property rights</li>
                  <li>• <strong>Payment Obligations:</strong> Timely payment, dispute resolution through proper channels</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-cyan-400 mb-3">Intellectual Property</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Platform IP:</strong> All trademarks, design, proprietary technology owned by Wolfe James LLC</li>
                  <li>• <strong>User Content:</strong> Users retain ownership of uploaded content, grant platform usage license</li>
                  <li>• <strong>Component Licensing:</strong> Individual license terms govern usage rights (standard commercial license)</li>
                  <li>• <strong>DMCA Compliance:</strong> Takedown procedures per 17 U.S.C. § 512</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-cyan-400 mb-3">Liability & Risk Allocation</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Limitation of Liability:</strong> Total liability capped at amount paid in preceding 12 months</li>
                  <li>• <strong>Disclaimer of Warranties:</strong> Service provided "as is" except express warranties</li>
                  <li>• <strong>Indemnification:</strong> Users indemnify platform for unauthorized use, IP violations</li>
                  <li>• <strong>Force Majeure:</strong> Standard exclusions for acts beyond reasonable control</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-cyan-400 mb-3">Dispute Resolution</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Governing Jurisdiction:</strong> Georgia state courts, federal courts where applicable</li>
                  <li>• <strong>Arbitration:</strong> Binding arbitration for disputes >$10,000 (AAA Commercial Rules)</li>
                  <li>• <strong>Class Action Waiver:</strong> Individual disputes only, no class action participation</li>
                  <li>• <strong>Injunctive Relief:</strong> Platform retains right to seek equitable remedies</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-cyan-400 mb-3">Business Operations</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Service Provider:</strong> Wolfe James LLC, 722 Ridgecrest Road, Lagrange, GA 30240</li>
                  <li>• <strong>Customer Support:</strong> support@theblockchain.ai</li>
                  <li>• <strong>Legal Contact:</strong> support@theblockchain.ai</li>
                  <li>• <strong>Business Registration:</strong> Georgia LLC, registration #23200618</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Refund Policy Section -->
    <div class="mt-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-8 border border-green-500/30">
      <h3 class="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        Refund Policy
      </h3>
      <div class="space-y-4 text-slate-300">
        <div>
          <h4 class="font-semibold text-white mb-2">Digital Components</h4>
          <ul class="space-y-1 ml-4 text-sm">
            <li>• <strong>30-day refund</strong> for components that don't work as described</li>
            <li>• <strong>No refunds</strong> for change of mind or compatibility issues clearly stated in product descriptions</li>
            <li>• <strong>Immediate refunds</strong> for duplicate purchases or technical errors</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-2">Process</h4>
          <ol class="space-y-1 ml-4 text-sm">
            <li>1. Email us with your order number and issue description</li>
            <li>2. We'll investigate within 2 business days</li>
            <li>3. Approved refunds processed within 5-7 business days</li>
          </ol>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-2">Contact</h4>
          <p class="text-sm">
            Email: <a href="mailto:support@theblockchain.ai" class="text-green-400 hover:text-green-300">support@theblockchain.ai</a> for refund requests
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="mt-12 text-center">
      <div class="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 border border-slate-600">
        <h3 class="text-2xl font-bold text-white mb-4">Questions About These Terms?</h3>
        <p class="text-slate-300 mb-6">
          We're here to help. Contact us with any questions about using our marketplace or services.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="mailto:support@theblockchain.ai" 
            class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            Contact Support Team
          </a>
          <div class="text-sm text-slate-400">
            <strong>Wolfe James LLC</strong><br>
            722 Ridgecrest Road, Lagrange, GA 30240
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<style>
  .prose ul {
    list-style: none;
    padding-left: 0;
  }
</style>