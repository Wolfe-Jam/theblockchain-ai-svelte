<!-- Privacy Policy Page -->
<script>
  import { onMount } from 'svelte';
  
  let showLegalDetails = false;
  
  function toggleLegalDetails() {
    showLegalDetails = !showLegalDetails;
  }
</script>

<svelte:head>
  <title>Privacy Policy | theBlockchain.ai</title>
  <meta name="description" content="Our privacy policy - simple, honest, and transparent. We collect only what we need and protect your data." />
</svelte:head>

<!-- Main Privacy Policy -->
<div class="min-h-screen bg-slate-900 text-white">
  <!-- Header -->
  <div class="relative bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative max-w-4xl mx-auto px-6 py-16">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
          <span class="block text-white">PRIVACY</span>
          <span class="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            POLICY
          </span>
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          We believe in privacy. Here's exactly what we do with your data - no BS, just facts.
        </p>
        <div class="mt-6 text-sm text-slate-400">
          <strong>Effective Date:</strong> July 14, 2025 | 
          <strong>Entity:</strong> Wolfe James LLC
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-6 py-16">
    
    <!-- NoBS Privacy Policy -->
    <div class="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <h2 class="text-2xl font-bold text-green-400">We Keep It Simple</h2>
      </div>

      <div class="space-y-6 text-slate-300">
        <div>
          <h3 class="text-lg font-semibold text-white mb-3">What we collect:</h3>
          <ul class="space-y-2 ml-4">
            <li>• Your email when you sign up or buy something</li>
            <li>• Payment info (but Stripe handles that, not us)</li>
            <li>• Which components you look at (to make better recommendations)</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3">What we don't do:</h3>
          <ul class="space-y-2 ml-4">
            <li>• Track you around the web</li>
            <li>• Sell your email to anyone</li>
            <li>• Spam you with marketing BS</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3">What we do:</h3>
          <ul class="space-y-2 ml-4">
            <li>• Send purchase confirmations (obviously)</li>
            <li>• Notify you about major updates (rarely)</li>
            <li>• Keep your data secure and private</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3">Your control:</h3>
          <ul class="space-y-2 ml-4">
            <li>• Delete your account anytime → email us</li>
            <li>• Download your purchase history → email us</li>
            <li>• Stop emails → click unsubscribe</li>
          </ul>
        </div>

        <div class="mt-8 p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg">
          <p class="text-blue-300">
            <strong>Questions?</strong> Email us at 
            <a href="mailto:support@theblockchain.ai" class="text-blue-400 hover:text-blue-300">
              support@theblockchain.ai
            </a>. We're humans, not robots.
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
          <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
          <h2 class="text-xl font-bold text-orange-400">Legal Details & Compliance</h2>
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
              For lawyers, compliance teams, and the truly curious - comprehensive legal coverage.
            </p>

            <div class="space-y-6 text-sm text-slate-300">
              
              <div>
                <h4 class="text-base font-semibold text-orange-400 mb-3">Data Collection & Processing</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Personal Data:</strong> Email, name, billing address, payment details (processed via Stripe)</li>
                  <li>• <strong>Usage Data:</strong> Page views, component interactions, purchase history</li>
                  <li>• <strong>Technical Data:</strong> IP address, browser type, device info (minimal logging)</li>
                  <li>• <strong>Legal Basis:</strong> Contract performance (purchases), legitimate interest (service improvement), consent (marketing)</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-orange-400 mb-3">Third-Party Processors</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Stripe:</strong> Payment processing (PCI DSS compliant, data processor agreement in place)</li>
                  <li>• <strong>Supabase:</strong> Database hosting (GDPR compliant, EU data residency available)</li>
                  <li>• <strong>Netlify:</strong> Website hosting (SOC 2 compliant, privacy shield certified)</li>
                  <li>• <strong>Analytics:</strong> Minimal, privacy-focused tracking (no third-party cookies)</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-orange-400 mb-3">International Compliance</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>GDPR (EU):</strong> Full rights compliance - access, deletion, portability, objection</li>
                  <li>• <strong>CCPA (California):</strong> Consumer privacy rights honored</li>
                  <li>• <strong>Data Transfers:</strong> Standard contractual clauses for non-EU processors</li>
                  <li>• <strong>Retention:</strong> Personal data deleted within 30 days of account closure request</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-orange-400 mb-3">Security Measures</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Encryption:</strong> TLS 1.3 in transit, AES-256 at rest</li>
                  <li>• <strong>Access Controls:</strong> Role-based access, 2FA for admin accounts</li>
                  <li>• <strong>Data Minimization:</strong> Collect only necessary data for service provision</li>
                  <li>• <strong>Breach Response:</strong> 72-hour notification procedures per GDPR Article 33</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-orange-400 mb-3">User Rights</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Access:</strong> Full data export in machine-readable format</li>
                  <li>• <strong>Deletion:</strong> Complete erasure within 30 days (except legal retention requirements)</li>
                  <li>• <strong>Correction:</strong> Account data editable via user dashboard</li>
                  <li>• <strong>Objection:</strong> Marketing opt-out, data processing objection rights</li>
                  <li>• <strong>Portability:</strong> JSON export of all user data available</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-orange-400 mb-3">Business Operations</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Data Controller:</strong> Wolfe James LLC, 722 Ridgecrest Road, Lagrange, GA 30240</li>
                  <li>• <strong>DPO Contact:</strong> support@theblockchain.ai</li>
                  <li>• <strong>Jurisdiction:</strong> Georgia law governs, except where EU law applies</li>
                  <li>• <strong>Updates:</strong> Users notified 30 days before material privacy changes</li>
                </ul>
              </div>

              <div>
                <h4 class="text-base font-semibold text-orange-400 mb-3">Cookie Policy</h4>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>Essential Only:</strong> Session management, security, payment processing</li>
                  <li>• <strong>No Tracking:</strong> No advertising cookies, social media pixels, or cross-site tracking</li>
                  <li>• <strong>Consent:</strong> Banner displayed for EU users per GDPR requirements</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Contact Section -->
    <div class="mt-12 text-center">
      <div class="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 border border-slate-600">
        <h3 class="text-2xl font-bold text-white mb-4">Questions About Your Privacy?</h3>
        <p class="text-slate-300 mb-6">
          We're committed to transparency. Reach out anytime with privacy questions or data requests.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="mailto:support@theblockchain.ai" 
            class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            Contact Privacy Team
          </a>
          <div class="text-sm text-slate-400">
            <strong>Business Address:</strong><br>
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