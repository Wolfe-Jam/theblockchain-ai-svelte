<!-- PROPOSED: src/routes/download/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let email = '';
  let isSubmitting = false;
  let showThankYou = false;
  let downloadCount = 4847; // Could be dynamic from API
  let formatChoice = 'business'; // 'business' or 'academic'
  
  // Reactive format details
  $: formatDetails = {
    business: {
      title: 'Professional Market Analysis Report',
      description: '26 pages of comprehensive analysis covering AI automation, blockchain integration, and the $5+ trillion convergent economy opportunity.',
      pages: '26',
      focus: 'Market Analysis',
      audience: 'Business Leaders',
      filename: 'convergent-economy-report.pdf',
      downloadName: 'Convergent-Economy-Business-Report-theBlockchain-ai.pdf'
    },
    academic: {
      title: 'Scholarly Research Paper',
      description: '4 pages of academic-quality research analyzing the convergent economy with proper citations and methodology.',
      pages: '4',
      focus: 'Academic Research', 
      audience: 'Researchers',
      filename: 'convergent-economy-academic.pdf',
      downloadName: 'Convergent-Economy-Academic-Paper-theBlockchain-ai.pdf'
    }
  };
  
  async function handleDownload(event) {
    event.preventDefault();
    
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    isSubmitting = true;
    
    const formData = new FormData();
    formData.append('form-name', 'convergent-economy-download');
    formData.append('email', email);
    formData.append('format', formatChoice);
    formData.append('source', 'dedicated-download-page');
    formData.append('timestamp', new Date().toISOString());
    
    try {
      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        // Trigger PDF download immediately
        triggerPDFDownload();
        showThankYou = true;
        
        // Update download count
        downloadCount += 1;
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('There was an error. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }
  
  function triggerPDFDownload() {
    const link = document.createElement('a');
    link.href = `/${formatDetails[formatChoice].filename}`;
    link.download = formatDetails[formatChoice].downloadName;
    link.click();
  }
  
  // Track page visits
  onMount(() => {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: 'Download Page',
        page_location: window.location.href
      });
    }
  });
</script>

<svelte:head>
  <title>Download: The Convergent Economy Report - theBlockchain.ai</title>
  <meta name="description" content="Get your free $5+ Trillion market analysis report on the convergent economy of AI and blockchain. Instant PDF download." />
  <meta property="og:title" content="Free $5+ Trillion Market Analysis Report" />
  <meta property="og:description" content="The Convergent Economy: How AI and Blockchain are reshaping the global economy. Professional 26-page analysis." />
  <meta property="og:image" content="/theBlockchain-ai-landscape.webp" />
</svelte:head>

<div class="download-page min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  
  {#if !showThankYou}
    <!-- Main Download Section -->
    <section class="hero-download py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        
        <!-- Headline -->
        <div class="text-center mb-12">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get Your Free
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              $5+ Trillion
            </span>
            Market Analysis
          </h1>
          <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The Convergent Economy: How AI and Blockchain are creating the largest economic transformation in history
          </p>
          
          <!-- Format Toggle -->
          <div class="format-toggle mt-8 mb-4">
            <div class="flex justify-center">
              <div class="bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-2 inline-flex">
                <button 
                  class="format-btn px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  class:active={formatChoice === 'business'}
                  on:click={() => formatChoice = 'business'}
                >
                  <span class="text-2xl">📊</span>
                  <span>Business Report</span>
                </button>
                <button 
                  class="format-btn px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  class:active={formatChoice === 'academic'}
                  on:click={() => formatChoice = 'academic'}
                >
                  <span class="text-2xl">🎓</span>
                  <span>Academic Paper</span>
                </button>
              </div>
            </div>
            <p class="text-center text-slate-400 text-sm mt-3">
              {formatChoice === 'business' ? 'Executive summary with market insights and projections' : 'Scholarly research ready for academic publication'}
            </p>
          </div>
        </div>
        
        <!-- PDF Preview Card -->
        <div class="pdf-preview-card bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-12">
          <div class="flex flex-col lg:flex-row items-center gap-8">
            
            <!-- PDF Visual -->
            <div class="pdf-visual flex-shrink-0">
              <div class="relative">
                <img 
                  src="/theBlockchain-ai-landscape.webp" 
                  alt="The Convergent Economy Report Preview" 
                  class="w-64 h-80 object-cover rounded-xl shadow-2xl border-2 border-slate-600"
                />
                <div class="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  FREE
                </div>
              </div>
            </div>
            
            <!-- Content & Stats -->
            <div class="flex-1 text-center lg:text-left">
              <h2 class="text-2xl font-bold text-white mb-4">
                {formatDetails[formatChoice].title}
              </h2>
              <p class="text-slate-300 mb-6 leading-relaxed">
                {formatDetails[formatChoice].description}
              </p>
              
              <!-- Stats Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="stat-item text-center">
                  <div class="text-2xl font-bold text-cyan-400">{formatDetails[formatChoice].pages}</div>
                  <div class="text-sm text-slate-400">Pages</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-2xl font-bold text-cyan-400">{formatDetails[formatChoice].focus}</div>
                  <div class="text-sm text-slate-400">Focus</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-2xl font-bold text-cyan-400">{downloadCount.toLocaleString()}</div>
                  <div class="text-sm text-slate-400">Downloads</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-2xl font-bold text-cyan-400">{formatDetails[formatChoice].audience}</div>
                  <div class="text-sm text-slate-400">Audience</div>
                </div>
              </div>
              
              <!-- What's Inside -->
              <div class="whats-inside mb-6">
                <h3 class="text-lg font-semibold text-white mb-3">What's Inside:</h3>
                {#if formatChoice === 'business'}
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-300">
                    <div class="flex items-center gap-2">
                      <span class="text-cyan-400">✓</span>
                      <span>AI Market Projections</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-cyan-400">✓</span>
                      <span>Blockchain Integration Trends</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-cyan-400">✓</span>
                      <span>Investment Opportunities</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-cyan-400">✓</span>
                      <span>Strategic Recommendations</span>
                    </div>
                  </div>
                {:else}
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-300">
                    <div class="flex items-center gap-2">
                      <span class="text-cyan-400">✓</span>
                      <span>Academic Abstract</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-cyan-400">✓</span>
                      <span>Research Methodology</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-cyan-400">✓</span>
                      <span>Literature Citations</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-cyan-400">✓</span>
                      <span>arXiv Ready Format</span>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Download Form - SIMPLIFIED -->
        <div class="download-form-section">
          <form on:submit={handleDownload} class="download-form max-w-md mx-auto" method="POST" data-netlify="true" name="convergent-economy-download">
            <input type="hidden" name="form-name" value="convergent-economy-download">
            
            <div class="form-container bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-white text-center mb-4">
                Download Your Free Copy
              </h3>
              
              <div class="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  bind:value={email}
                  placeholder="Enter your email address"
                  class="flex-1 px-4 py-3 bg-slate-800/50 text-white rounded-xl border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  class="download-btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {#if isSubmitting}
                    <span class="flex items-center gap-2">
                      <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Downloading...
                    </span>
                  {:else}
                    Download PDF
                  {/if}
                </button>
              </div>
              
              <!-- Trust Signals -->
              <div class="trust-signals flex justify-center items-center gap-6 mt-4 text-sm text-slate-400">
                <div class="flex items-center gap-1">
                  <span class="text-green-400">✓</span>
                  <span>Instant Download</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-green-400">✓</span>
                  <span>No Spam</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-green-400">✓</span>
                  <span>Professional PDF</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <!-- Alternative Download -->
        <div class="alternative-download text-center mt-8">
          <p class="text-slate-400 text-sm mb-2">
            Having trouble with the form?
          </p>
          <p class="text-slate-300 text-xs mb-3">
            Send us your email and we'll send you the PDF directly:
          </p>
          <div class="alternative-form flex flex-col sm:flex-row gap-2 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your.email@example.com"
              bind:value={email}
              class="flex-1 px-3 py-2 bg-slate-800/50 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none text-sm"
              required
            />
            <button 
              on:click={handleDownload}
              class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              Email Me PDF
            </button>
          </div>
          <p class="text-slate-500 text-xs mt-2">
            We'll email you the download link immediately
          </p>
        </div>
      </div>
    </section>
    
  {:else}
    <!-- Thank You Section -->
    <section class="thank-you-section py-20">
      <div class="container mx-auto px-4 text-center max-w-2xl">
        <div class="success-animation mb-8">
          <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        <h2 class="text-4xl font-bold text-white mb-4">
          Download Started!
        </h2>
        <p class="text-xl text-slate-300 mb-8">
          Your Convergent Economy report is downloading now. Check your downloads folder for the PDF.
        </p>
        
        <!-- Next Steps -->
        <div class="next-steps bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">What's Next?</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div class="step">
              <div class="text-cyan-400 font-bold mb-1">1. Read the Report</div>
              <div class="text-slate-300">Explore the $5+ trillion convergent economy</div>
            </div>
            <div class="step">
              <div class="text-cyan-400 font-bold mb-1">2. Explore Tools</div>
              <div class="text-slate-300">Check out our AI/blockchain development tools</div>
            </div>
            <div class="step">
              <div class="text-cyan-400 font-bold mb-1">3. Stay Updated</div>
              <div class="text-slate-300">We'll send you exclusive insights via email</div>
            </div>
          </div>
        </div>
        
        <!-- CTA Buttons -->
        <div class="cta-buttons flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a href="/tools" class="btn-primary">
            AI Tools & Components
          </a>
          <a href="/invest" class="btn-secondary">
            Investment Opportunities  
          </a>
          <a href="/" class="btn-tertiary">
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  {/if}
</div>

<style lang="postcss">
  .btn-primary {
    @apply bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-center;
  }
  
  .btn-secondary {
    @apply bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-center;
  }
  
  .btn-tertiary {
    @apply bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-center;
  }
  
  .download-btn {
    box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
  }
  
  .download-btn:hover {
    box-shadow: 0 8px 30px rgba(6, 182, 212, 0.4);
  }
  
  .success-animation {
    animation: bounceIn 0.6s ease-out;
  }
  
  /* Format Toggle Styles */
  .format-btn {
    @apply text-slate-400 bg-transparent;
  }
  
  .format-btn.active {
    @apply bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg;
    transform: translateY(-1px);
  }
  
  .format-btn:hover:not(.active) {
    @apply text-slate-200 bg-slate-700/50;
  }
  
  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
</style>