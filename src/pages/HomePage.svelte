<!-- src/pages/HomePage.svelte -->
<script>
  function scrollToFacts() {
    document.getElementById('one-pager').scrollIntoView({ behavior: 'smooth' });
  }

  let accordionItems = {};
  
  function toggleAccordion(id) {
    accordionItems[id] = !accordionItems[id];
  }

  // Modal state
  let showModal = false;
  let showThankYou = false;
  
  function openModal() {
    showModal = true;
    showThankYou = false;
  }
  
  function closeModal() {
    showModal = false;
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Simulate form submission
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    }).then(() => {
      showThankYou = true;
    }).catch((error) => {
      console.error('Form submission error:', error);
    });
  }
</script>

<div class="home-page">
  <!-- Ocean Scene Container -->
  <div class="scene-container">
    <div class="sky">
      <div class="sun-disk"></div>
      <div class="sun-glow"></div>
    </div>
    <div class="ocean"></div>
    <div class="horizon-line"></div>
    
    <!-- Boats Container -->
    <div class="boats-container">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="boat" on:click={scrollToFacts}>
        <i class="fas fa-sailboat"></i>
        <div class="tooltip">Drifting</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="boat" on:click={scrollToFacts}>
        <i class="fas fa-sailboat"></i>
        <div class="tooltip cyan">Lacking</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="boat special" on:click={scrollToFacts}>
        <i class="fas fa-sailboat"></i>
        <div class="tooltip trust">TRUST</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="boat" on:click={scrollToFacts}>
        <i class="fas fa-sailboat"></i>
        <div class="tooltip cyan">Broken</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="boat" on:click={scrollToFacts}>
        <i class="fas fa-sailboat"></i>
        <div class="tooltip">Lost</div>
      </div>
    </div>
    
    <!-- Title Container -->
    <div class="title-container">
      <h1 class="main-title">theBlockchain.ai</h1>
      <p class="sub-title">The Economic Layer for Open-Source</p>
    </div>
    
    <!-- Scroll Down Indicator -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="scroll-down" on:click={scrollToFacts}>
      <i class="fas fa-chevron-down"></i>
    </div>
  </div>

  <!-- One Pager Section -->
  <div id="one-pager" class="one-pager">
    <div class="max-w-4xl mx-auto">
      
      <h1 class="group-title problem-title">The Problem</h1>
      
      <!-- Problem Fact 1 -->
      <div class="accordion-item problem-accordion">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="accordion-header" on:click={() => toggleAccordion('problem1')}>
          <h2>Fact 1 | The Foundation of the Digital World is <span class="highlight-problem">Broken</span>.</h2>
          <i class="fas fa-chevron-down icon" class:rotated={accordionItems['problem1']}></i>
        </div>
        {#if accordionItems['problem1']}
          <div class="accordion-content">
            <div class="content-wrapper">
              <ul>
                <li>The global economy runs on open-source, yet its creators aren't paid for its value.</li>
                <li>This creates massive risk in our digital supply chain.</li>
                <li>Innovation is throttled by a broken, patronage-based funding model.</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>

      <!-- Problem Fact 2 -->
      <div class="accordion-item problem-accordion">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="accordion-header" on:click={() => toggleAccordion('problem2')}>
          <h2>Fact 2 | Value is <span class="highlight-problem">Trapped</span> and Unmonetized.</h2>
          <i class="fas fa-chevron-down icon" class:rotated={accordionItems['problem2']}></i>
        </div>
        {#if accordionItems['problem2']}
          <div class="accordion-content">
            <div class="content-wrapper">
              <ul>
                <li>The world's code sits in passive, isolated silos (GitHub, etc.).</li>
                <li>There is no native economic layer to make this code a liquid, tradable asset.</li>
                <li>Trillions in potential value are locked away, creating a market vacuum.</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>

      <!-- Problem Fact 3 -->
      <div class="accordion-item problem-accordion">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="accordion-header" on:click={() => toggleAccordion('problem3')}>
          <h2>Fact 3 | Code <span class="highlight-problem">Lacks</span> Verifiable <span class="highlight-trust">Trust</span> and Ownership.</h2>
          <i class="fas fa-chevron-down icon" class:rotated={accordionItems['problem3']}></i>
        </div>
        {#if accordionItems['problem3']}
          <div class="accordion-content">
            <div class="content-wrapper">
              <ul>
                <li>AI models and automation tools are often "black boxes" with no verifiable origin or audit trail.</li>
                <li>This creates huge compliance and security risks for businesses.</li>
                <li>Developers cannot truly prove ownership, leaving their intellectual property vulnerable.</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>

      <h1 class="group-title solution-title">The Solution</h1>

      <!-- Solution Fact 4 -->
      <div class="accordion-item solution-accordion">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="accordion-header" on:click={() => toggleAccordion('solution1')}>
          <h2>Fact 4 | A <span class="highlight-solution-cyan">Win/Win/Win</span> for the Entire Ecosystem.</h2>
          <i class="fas fa-chevron-down icon" class:rotated={accordionItems['solution1']}></i>
        </div>
        {#if accordionItems['solution1']}
          <div class="accordion-content">
            <div class="content-wrapper">
              <ul>
                <li><strong>Developers Win:</strong> Get paid directly for your code <span class="term">OUTPUT</span>.</li>
                <li><strong>Businesses Win:</strong> Access a marketplace of secure, auditable AI <span class="term">Code-In-Action</span>.</li>
                <li><strong>Data Owners Win:</strong> Monetize your data with guaranteed privacy through <span class="term">TOKENIZING</span>.</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>

      <!-- Solution Fact 5 -->
      <div class="accordion-item solution-accordion">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="accordion-header" on:click={() => toggleAccordion('solution2')}>
          <h2>Fact 5 | Our Unfair Advantage is <span class="highlight-solution-orange">TRUST!</span></h2>
          <i class="fas fa-chevron-down icon" class:rotated={accordionItems['solution2']}></i>
        </div>
        {#if accordionItems['solution2']}
          <div class="accordion-content">
            <div class="content-wrapper">
              <ul>
                <li><strong>Immutable Trust:</strong> Transactions and code history are permanent and cannot be altered.</li>
                <li><strong>Direct Monetization:</strong> Value flows from user to creator with no intermediaries.</li>
                <li><strong>Absolute Security:</strong> The origin and history of every single component are mathematically verifiable.</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-24">
        <h2 class="text-3xl font-extrabold text-center mb-6 text-white">Ready to Build the Future of Trusted AI?</h2>
        
        <div class="founder-promo-box my-8">
          <p class="font-bold text-lg"><i class="fas fa-rocket mr-2"></i>Founder's Program: to claim your Founder's Stake.</p>
          <p class="mt-2">Onboard before <strong>July 31st, 2025</strong></p>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <p class="text-sm mt-1"><span class="limited-spots-link" on:click={openModal}>Spots are limited.</span></p>
        </div>
        
        <div class="flex justify-center items-center space-x-4">
          <a href="/report" class="cta-button cta-button-transparent blue-border">Deep Dive</a>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <span class="cta-button cta-button-transparent orange-border" on:click={openModal}>Register Interest</span>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- Registration Modal -->
{#if showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" on:click={closeModal}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-content" on:click|stopPropagation>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <button class="close-btn" on:click={closeModal}>&times;</button>
      
      {#if !showThankYou}
        <div class="register-form">
          <h3 class="modal-title">Join the Founder's Program</h3>
          <p class="mb-6 text-slate-300">Get early access, claim your Founder's Stake, and help shape the future of open-source with Trusted AI.</p>
          
          <form on:submit={handleSubmit}>
            <input type="hidden" name="form-name" value="register">
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required>
            </div>
            
            <div class="form-group">
              <label class="role-label">I am a... (Tick all that apply)</label>
              <div class="checkbox-group">
                <label class="checkbox-label"><input type="checkbox" name="role" value="developer"><span>Developer</span></label>
                <label class="checkbox-label"><input type="checkbox" name="role" value="business"><span>Business / Enterprise</span></label>
                <label class="checkbox-label"><input type="checkbox" name="role" value="data-research"><span>Data Owner / Researcher</span></label>
                <label class="checkbox-label"><input type="checkbox" name="role" value="other"><span>Other</span></label>
              </div>
            </div>
            
            <button type="submit" class="submit-btn">Claim My Spot</button>
          </form>
        </div>
      {:else}
        <div class="thank-you">
          <h3 class="modal-title">Thank You!</h3>
          <p class="text-slate-300">You're on the list. We'll be in touch soon with next steps.</p>
        </div>
      {/if}
    </div>
  </div>
{/if}    background-color: var(--brand-orange);
    color: white;
    border: none;
    border-radius: 9999px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-btn:hover {
    background-color: color-mix(in srgb, var(--brand-orange) 80%, black);
  }

  .thank-you {
    text-align: center;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .main-title {
      font-size: 2rem;
    }
    
    .scene-container {
      height: 80vh;
    }
    
    .accordion-header h2 {
      font-size: 1rem;
    }
    
    .group-title {
      font-size: 2rem;
    }
  }
</style>