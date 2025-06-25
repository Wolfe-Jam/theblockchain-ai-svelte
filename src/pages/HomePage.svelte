<!-- HomePage.svelte - The Masterpiece -->
<script>
  import { onMount } from 'svelte';
  import { fly, fade, scale, blur } from 'svelte/transition';
  import { spring, tweened } from 'svelte/motion';
  import { quintOut, backOut, elasticOut } from 'svelte/easing';
  
  let showModal = false;
  let showThankYou = false;
  let accordionItems = {};
  
  // Arrow position states: 'hidden' (shows white arrow), 'above-solution' (shows orange arrow)
  let arrowPosition = 'hidden';
  
  // Svelte animation stores
  const titleOpacity = tweened(0.3, {
    duration: 800,
    easing: quintOut
  });
  
  const subTitleOpacity = tweened(0, {
    duration: 600,
    easing: quintOut
  });
  
  let titleHovered = false;
  
  function handleTitleHover() {
    titleHovered = true;
    titleOpacity.set(1);
    subTitleOpacity.set(0.9);
  }
  
  function handleTitleLeave() {
    titleHovered = false;
    titleOpacity.set(0.3);
    subTitleOpacity.set(0);
  }
  
  function scrollToFacts() {
    // When arrow is clicked, scroll just enough to show Fact 3
    const sceneContainer = document.querySelector('.scene-container');
    const containerHeight = sceneContainer.offsetHeight;
    
    // Scroll to about 45% to reveal Fact 3 without showing too much more
    const targetPosition = containerHeight * 0.45;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Hide white arrow and show the new orange arrow above solution
    arrowPosition = 'above-solution';
  }
  
  function scrollToSerenity() {
    // Smooth sail back to the top - back to serenity
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset arrow position - hide the solution arrow
    arrowPosition = 'hidden';
  }
  
  function scrollToSolution() {
    // Scroll to reveal The Solution section
    const solutionTitle = document.querySelector('.solution-title');
    if (solutionTitle) {
      solutionTitle.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  function handleArrowClick() {
    if (arrowPosition === 'above-solution') {
      scrollToSolution();
    }
  }
  
  function scrollToBoats() {
    // Calculate the position to show boats AND sun in the viewport
    const sceneContainer = document.querySelector('.scene-container');
    const containerHeight = sceneContainer.offsetHeight;
    
    // Back to 30% for smooth, predictable landing
    const targetPosition = containerHeight * 0.3;
    
    // Smooth scroll with browser's native smooth behavior - no joltiness
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  function toggleAccordion(id) {
    // Close all other accordions
    Object.keys(accordionItems).forEach(key => {
      if (key !== id) {
        accordionItems[key] = false;
      }
    });
    // Toggle the clicked accordion
    accordionItems[id] = !accordionItems[id];
    
    // Only scroll if the expanded content would go off-screen
    // Don't move the accordion itself
    if (accordionItems[id]) {
      setTimeout(() => {
        const accordionElement = document.querySelector(`#${id}`);
        const rect = accordionElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only scroll if accordion + content would extend below viewport
        if (rect.bottom > windowHeight * 0.7) {
          // Gentle scroll to show more content, but keep accordion header visible
          window.scrollBy({
            top: Math.min(200, rect.bottom - windowHeight * 0.8),
            behavior: 'smooth'
          });
        }
      }, 300); // Wait for animation to complete
    }
  }
  
  function openModal() {
    showModal = true;
    showThankYou = false;
  }
  
  function closeModal() {
    showModal = false;
    showThankYou = false;
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    }).then(() => {
      showThankYou = true;
    }).catch((error) => alert(error));
  }
</script>

<!-- Hero Scene Container -->
<div class="scene-container">
  <div class="sky">
    <div class="sun-disk"></div>
    <div class="sun-glow"></div>
  </div>
  <div class="ocean"></div>
  <div class="horizon-line"></div>
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
      <div class="tooltip cyan-tooltip">Lacking</div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="boat" on:click={scrollToFacts}>
      <i class="fas fa-sailboat"></i>
      <div class="tooltip trust-tooltip">TRUST</div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="boat" on:click={scrollToFacts}>
      <i class="fas fa-sailboat"></i>
      <div class="tooltip cyan-tooltip">Broken</div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="boat" on:click={scrollToFacts}>
      <i class="fas fa-sailboat"></i>
      <div class="tooltip">Lost</div>
    </div>
  </div>
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div 
    class="title-container" 
    on:click={scrollToBoats}
    on:mouseenter={handleTitleHover}
    on:mouseleave={handleTitleLeave}
  >
    <h1 class="main-title" style="opacity: {$titleOpacity}">theBlockchain.ai</h1>
    <p class="sub-title" style="opacity: {$subTitleOpacity}">The Economic Layer for Open-Source</p>
  </div>
  
  <!-- Original White Arrow - Only visible when arrow hasn't been used -->
  {#if arrowPosition === 'hidden'}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="scroll-down" on:click={scrollToFacts}>
      <i class="fas fa-chevron-down"></i>
    </div>
  {/if}
</div>

<!-- One Pager Section -->
<div id="one-pager" class="one-pager">
  <div class="max-w-4xl mx-auto">
    
    <h1 class="group-title problem-title">The Problem</h1>
    
    <!-- Problem Fact 1 -->
    <div id="problem1" class="accordion-item problem-accordion" class:active={accordionItems['problem1']}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="accordion-header" on:click={() => toggleAccordion('problem1')}>
        <h2>Fact 1 | The Foundation of the Digital World is <span class="highlight-problem">Broken</span>.</h2>
        <i class="fas fa-chevron-down icon" class:rotated={accordionItems['problem1']}></i>
      </div>
      {#if accordionItems['problem1']}
        <div class="accordion-content" in:fly="{{ y: -20, duration: 400, easing: quintOut }}" out:fly="{{ y: -20, duration: 300 }}">
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
    <div id="problem2" class="accordion-item problem-accordion" class:active={accordionItems['problem2']}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="accordion-header" on:click={() => toggleAccordion('problem2')}>
        <h2>Fact 2 | Value is <span class="highlight-problem">Trapped</span> and Unmonetized.</h2>
        <i class="fas fa-chevron-down icon" class:rotated={accordionItems['problem2']}></i>
      </div>
      {#if accordionItems['problem2']}
        <div class="accordion-content" in:fly="{{ y: -20, duration: 400, easing: quintOut }}" out:fly="{{ y: -20, duration: 300 }}">
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
    <div id="problem3" class="accordion-item problem-accordion" class:active={accordionItems['problem3']}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="accordion-header" on:click={() => toggleAccordion('problem3')}>
        <h2>Fact 3 | Code <span class="highlight-problem">Lacks</span> Verifiable <span class="highlight-trust">Trust</span> and Ownership.</h2>
        <i class="fas fa-chevron-down icon" class:rotated={accordionItems['problem3']}></i>
      </div>
      {#if accordionItems['problem3']}
        <div class="accordion-content" in:fly="{{ y: -20, duration: 400, easing: quintOut }}" out:fly="{{ y: -20, duration: 300 }}">
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



    <!-- Arrow above solution -->
    {#if arrowPosition === 'above-solution'}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="arrow-above-solution"
           in:fly="{{ y: 20, duration: 500, delay: 200 }}" 
           out:fade="{{ duration: 200 }}"
           on:click={handleArrowClick}>
        <i class="fas fa-chevron-down"></i>
      </div>
    {/if}

    <h1 class="group-title solution-title">The Solution</h1>

    <!-- Solution Fact 1 -->
    <div id="solution1" class="accordion-item solution-accordion" class:active={accordionItems['solution1']}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="accordion-header" on:click={() => toggleAccordion('solution1')}>
        <h2>Fact 4 | A <span class="highlight-solution-cyan">Win/Win/Win</span> for the Entire Ecosystem.</h2>
        <i class="fas fa-chevron-down icon" class:rotated={accordionItems['solution1']}></i>
      </div>
      {#if accordionItems['solution1']}
        <div class="accordion-content" in:fly="{{ y: -20, duration: 400, easing: quintOut }}" out:fly="{{ y: -20, duration: 300 }}">
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

    <!-- Solution Fact 2 -->
    <div id="solution2" class="accordion-item solution-accordion" class:active={accordionItems['solution2']}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="accordion-header" on:click={() => toggleAccordion('solution2')}>
        <h2>Fact 5 | Our Unfair Advantage is <span class="highlight-solution-orange">TRUST!</span></h2>
        <i class="fas fa-chevron-down icon" class:rotated={accordionItems['solution2']}></i>
      </div>
      {#if accordionItems['solution2']}
        <div class="accordion-content" in:fly="{{ y: -20, duration: 400, easing: quintOut }}" out:fly="{{ y: -20, duration: 300 }}">
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
    <div class="text-center mt-24 cta-section">
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

<!-- Registration Modal -->
{#if showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" 
       in:fade="{{ duration: 300 }}" 
       out:fade="{{ duration: 200 }}" 
       on:click={closeModal}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-content" 
         in:scale="{{ duration: 400, easing: backOut, start: 0.7 }}" 
         out:scale="{{ duration: 200, start: 0.9 }}" 
         on:click|stopPropagation>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <button class="close-btn" on:click={closeModal}>&times;</button>
      
      {#if !showThankYou}
        <div>
          <h3 class="modal-title">Join the Founder's Program</h3>
          <p class="mb-6 text-slate-300">Get early access, claim your Founder's Stake, and help shape the future of open-source with Trusted AI.</p>
          <form name="register" method="POST" data-netlify="true" on:submit={handleSubmit}>
            <input type="hidden" name="form-name" value="register">
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input type="email" id="email" name="email" class="form-input" placeholder="you@example.com" required>
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
{/if}

<!-- Serenity Boat - Back to Top -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="serenity-boat" on:click={scrollToSerenity} title="Back to Serenity">
  <i class="fas fa-sailboat"></i>
</div>

<style>
  /* Scene Container Styles */
  .scene-container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
  }

  .sky {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, #ffffff 0%, var(--brand-cyan) 100%);
    z-index: 1;
  }

  .sun-glow {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
    background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255, 145, 77, 0.7) 0%, rgba(255, 145, 77, 0) 60%);
    z-index: 3;
  }

  .sun-disk {
    position: absolute;
    bottom: -50px;
    left: 50%;
    width: 150px;
    height: 150px;
    transform: translateX(-50%);
    background: var(--brand-orange);
    border-radius: 50%;
    box-shadow: 0 0 60px 30px var(--brand-orange), 0 0 100px 60px rgba(255, 145, 77, 0.7);
    z-index: 2;
  }

  .ocean {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, #000000 0%, var(--brand-blue) 100%);
    z-index: 2;
  }

  .horizon-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 6px;
    background: #ffffff;
    box-shadow: 0 0 10px 3px #ffffff, 0 0 20px 8px rgba(255, 255, 255, 0.7);
    z-index: 5;
    transform: translateY(-50%);
  }

  .boats-container {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    height: 40px;
    margin-top: -20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 6;
  }

  .boat {
    font-size: 1.75rem;
    cursor: pointer;
    transition: transform 0.3s ease;
    position: relative;
  }

  .boat:hover {
    transform: scale(1.2);
  }

  .boat:nth-child(1) { color: #555555; }
  .boat:nth-child(2) { color: #444444; }
  .boat:nth-child(3) { color: #333333; }
  .boat:nth-child(4) { color: #444444; }
  .boat:nth-child(5) { color: #555555; }

  .tooltip {
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(2px);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .cyan-tooltip {
    color: var(--brand-cyan) !important;
  }

  .trust-tooltip {
    background-color: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(4px) !important;
    color: var(--brand-orange) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    text-shadow: 0 0 5px rgba(255, 145, 77, 0.5) !important;
  }

  .boat:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }

  .title-container {
    position: absolute;
    top: 5.25rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    text-align: center;
    cursor: pointer;
  }

  .main-title {
    font-family: 'Roboto Mono', monospace;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: white;
    text-shadow: 0 0 8px rgba(255, 145, 77, 0.8);
  }

  .sub-title {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    text-shadow: 0 1px 5px rgba(0,0,0,0.5);
    padding-top: 0.5rem;
  }

  .scroll-down {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-20px) translateX(-50%); }
    60% { transform: translateY(-10px) translateX(-50%); }
  }

  /* Arrow Above Solution */
  .arrow-above-solution {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    color: var(--brand-orange);
    font-size: 2rem;
    cursor: pointer;
    animation: bounce 2s infinite;
    margin: 2rem 0;
    text-align: center;
    z-index: 10;
  }

  /* One Pager Section */
  .one-pager {
    padding: 2rem 2rem;
    background-color: #020617;
  }

  .group-title {
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 2rem;
    letter-spacing: -0.025em;
  }

  .problem-title {
    color: var(--brand-cyan);
  }

  .solution-title {
    color: var(--brand-orange);
    margin-top: 4rem;
  }

  .accordion-item {
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    overflow: hidden;
    border: 1px solid transparent;
  }

  .accordion-header {
    padding: 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    backdrop-filter: blur(5px);
  }

  .accordion-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
  }

  .accordion-content {
    padding: 0 1.5rem;
  }

  .accordion-content .content-wrapper {
    padding: 1.5rem 0;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #cbd5e1;
  }

  .accordion-content ul li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem;
  }

  .icon {
    transition: transform 0.3s ease;
  }

  .icon.rotated {
    transform: rotate(180deg);
  }

  /* Problem accordion styles */
  .problem-accordion {
    border-color: rgba(30, 41, 59, 0.8);
  }

  .problem-accordion .accordion-header {
    background-color: rgba(30, 41, 59, 0.8);
  }

  .problem-accordion .accordion-content {
    background-color: #0f172a;
  }

  .problem-accordion .accordion-content ul li::before {
    content: '❌';
    position: absolute;
    left: 0;
    font-size: 1.25rem;
  }

  /* Solution accordion styles */
  .solution-accordion {
    border-color: rgba(0, 74, 174, 0.8);
  }

  .solution-accordion .accordion-header {
    background-color: rgba(0, 74, 174, 0.8);
  }

  .solution-accordion .accordion-content {
    background-color: #002d6b;
  }

  .solution-accordion .accordion-content ul li::before {
    content: '✅';
    position: absolute;
    left: 0;
    font-size: 1.25rem;
  }

  /* Highlight styles */
  .highlight-problem {
    color: var(--brand-cyan);
    text-shadow: 0 0 8px rgba(12, 192, 223, 0.5);
  }

  .highlight-trust {
    color: var(--brand-orange);
    text-shadow: 0 0 8px rgba(255, 145, 77, 0.5);
  }

  .highlight-solution-cyan {
    color: var(--brand-cyan);
    text-shadow: 0 0 8px rgba(12, 192, 223, 0.6);
  }

  .highlight-solution-orange {
    color: var(--brand-orange);
    text-shadow: 0 0 8px rgba(255, 145, 77, 0.6);
  }

  .term {
    font-weight: 700;
    color: #f8fafc;
    background-color: rgba(12, 192, 223, 0.2);
    padding: 0.1rem 0.4rem;
    border-radius: 0.25rem;
    border: 1px solid rgba(12, 192, 223, 0.4);
  }

  .founder-promo-box {
    border: 2px solid var(--brand-cyan);
    background-color: rgba(12, 192, 223, 0.1);
    border-radius: 0.75rem;
    padding: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: #e0f2fe;
  }

  .founder-promo-box p {
    margin: 0.25rem 0;
  }

  .limited-spots-link {
    font-weight: 700;
    color: var(--brand-cyan);
    cursor: pointer;
    text-decoration: underline;
  }

  .cta-button {
    display: inline-block;
    color: white;
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 9999px;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    border: 2px solid transparent;
    cursor: pointer;
  }

  .cta-button-transparent {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  .cta-button-transparent.orange-border {
    border-color: var(--brand-orange);
  }

  .cta-button-transparent.orange-border:hover {
    background-color: rgba(255, 145, 77, 0.2);
  }

  .cta-button-transparent.blue-border {
    border-color: var(--brand-blue);
  }

  .cta-button-transparent.blue-border:hover {
    background-color: rgba(0, 74, 174, 0.2);
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: #1e293b;
    color: white;
    border: 1px solid var(--brand-cyan);
    border-radius: 0.5rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    position: relative;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #9ca3af;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .close-btn:hover {
    color: white;
  }

  .modal-title {
    color: var(--brand-cyan);
    font-weight: 800;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    color: #d1d5db;
  }

  .role-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    color: #d1d5db;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem;
    background-color: #0f172a;
    border: 1px solid #334155;
    border-radius: 0.375rem;
    color: white;
    transition: border-color 0.3s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--brand-cyan);
    box-shadow: 0 0 0 3px rgba(12, 192, 223, 0.1);
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .checkbox-label input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    accent-color: var(--brand-cyan);
  }

  .submit-btn {
    width: 100%;
    background-color: var(--brand-orange);
    color: white;
    border: none;
    border-radius: 9999px;
    font-weight: 600;
    padding: 0.75rem 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-btn:hover {
    background-color: color-mix(in srgb, var(--brand-orange) 80%, black);
  }

  .thank-you {
    text-align: center;
  }

  /* Serenity Boat - Back to Top */
  .serenity-boat {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s ease;
    z-index: 1000;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .serenity-boat:hover {
    opacity: 0.8;
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.7);
  }

  .serenity-boat i {
    color: white;
    font-size: 1.2rem;
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
