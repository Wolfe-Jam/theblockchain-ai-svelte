<!-- src/pages/ReportPage.svelte -->
<script>
  import { onMount } from 'svelte';
  import { spring, tweened } from 'svelte/motion';
  import { quintOut, elasticOut, backOut } from 'svelte/easing';
  import { writable } from 'svelte/store';
  
  let showModal = false;
  let modalTitle = '';
  let modalContent = '';
  let userQuestion = '';
  let isLoading = false;
  let searchInput; // Reference to the input element
  let dailyJoke = '';
  let jokeRating = null; // null, 'up', or 'down'
  
  // 🚀 SVELTE SHOWCASE ANIMATIONS - Next Level Logo Effects
  const logoScale = spring(0, { // Start invisible
    stiffness: 0.2,
    damping: 0.4
  });
  
  const logoRotation = spring(0, {
    stiffness: 0.1,
    damping: 0.8
  });
  
  const logoGlow = tweened(0, {
    duration: 800,
    easing: quintOut
  });
  
  const logoFloat = tweened(0, {
    duration: 2000,
    easing: quintOut
  });
  
  const logoOpacity = tweened(0, { // Control visibility
    duration: 600,
    easing: quintOut
  });
  
  // Advanced: Particle system for logo
  const particles = writable([]);
  let particleTimer;
  
  // Logo state management
  let logoHovered = false;
  let logoElement;
  let animationPhase = 'hidden'; // hidden, entrance, magic, settling, idle  
  // Joke database - mixed humor types
  const jokes = [
    "Why did the robot cross the road? He was crash testing!",
    "Why did the smart contract break up? It had trust issues!",
    "Why don't VCs make good comedians? Their jokes never scale!",
    "There are only 10 types of people: those who understand binary and those who don't.",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "What do you call a blockchain that tells jokes? A laugh-chain!",
    "Why did the AI go to therapy? It had deep learning issues!",
    "How do you make a cryptocurrency laugh? Tell it a bit-coin joke!",
    "Why don't robots ever panic? They always keep their cool circuits!",
    "What's a blockchain developer's favorite type of music? Crypto-punk!"
  ];
  
  function getDailyJoke() {
    // Get today's date as seed for consistent daily joke
    const today = new Date().toDateString();
    const jokeIndex = Math.abs(today.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0)) % jokes.length;
    return jokes[jokeIndex];
  }
  
  function rateJoke(rating) {
    jokeRating = rating;
    // Analytics: Track joke engagement for future improvements
    
    // Show brief feedback
    setTimeout(() => {
      jokeRating = null;
    }, 2000);
  }
  
  // 🎆 SVELTE SHOWCASE: Advanced Logo Animations
  function createParticle() {
    return {
      id: Math.random(),
      x: Math.random() * 200 - 100, // Smaller spread
      y: Math.random() * 200 - 100,
      size: Math.random() * 6 + 3, // Smaller particles
      opacity: 0.9,
      velocityX: (Math.random() - 0.5) * 2, // Slower velocity
      velocityY: (Math.random() - 0.5) * 2,
      color: ['#FF914D', '#0CC0DF', '#004AAE'][Math.floor(Math.random() * 3)]
    };
  }
  
  function animateParticles() {
    particles.update(current => {
      const newParticles = [];
      
      // Add fewer, more controlled particles
      if (logoHovered && current.length < 12) {
        newParticles.push(createParticle());
      }
      
      // Update existing particles with smoother movement
      return [...current, ...newParticles].map(particle => ({
        ...particle,
        x: particle.x + particle.velocityX * 0.8, // Slower movement
        y: particle.y + particle.velocityY * 0.8,
        opacity: particle.opacity - 0.015, // Slower fade
        size: particle.size * 0.995 // Slower shrink
      })).filter(particle => particle.opacity > 0 && particle.size > 1);
    });
    
    if (logoHovered || $particles.length > 0) {
      requestAnimationFrame(animateParticles);
    }
  }
  
  function handleLogoHover() {
    console.log('🎆 Replaying the MAGIC!');
    playMagicalAnimation();
  }
  
  function handleLogoLeave() {
    console.log('✨ Ready for next replay');
    // Just let the animation finish naturally - no jarring resets
  }
  
  function playMagicalAnimation() {
    logoHovered = true;
    animationPhase = 'magic';
    
    // THE MAGICAL SEQUENCE - Multi-stage perfection
    logoScale.set(1.2);
    logoRotation.set(5);
    logoGlow.set(1);
    logoFloat.set(-10);
    
    // Start particle explosion
    animateParticles();
    
    // Stage 2: Gentle oscillation
    setTimeout(() => {
      logoScale.set(1.15);
      logoRotation.set(-2);
    }, 200);
    
    // Stage 3: Final settle
    setTimeout(() => {
      logoScale.set(1.1);
      logoRotation.set(0);
    }, 400);
    
    // Stage 4: Begin gentle settling (no jolts!)
    setTimeout(() => {
      animationPhase = 'settling';
      logoHovered = false; // Stop new particles
      
      // Gentle scale return
      logoScale.set(1, {
        duration: 800,
        easing: quintOut
      });
      
      // Gentle float return  
      logoFloat.set(0, {
        duration: 1000,
        easing: quintOut
      });
    }, 1200);
    
    // Stage 5: Final glow tick and fade
    setTimeout(() => {
      // Little glow tick before finishing
      logoGlow.set(0.3, {
        duration: 200,
        easing: quintOut
      });
      
      setTimeout(() => {
        logoGlow.set(0, {
          duration: 1000,
          easing: quintOut
        });
        
        setTimeout(() => {
          animationPhase = 'idle';
        }, 1000);
      }, 300);
    }, 2200);
  }
  
  function logoEntranceAnimation() {
    console.log('🚀 ENTRANCE: Starting from blank space!');
    
    // Start completely hidden
    animationPhase = 'entrance';
    logoOpacity.set(1); // Make visible but start the magic
    
    setTimeout(() => {
      playMagicalAnimation();
    }, 1000);
  }
  
  onMount(() => {
    document.title = "TheBlockchain.AI: Strategic Deep Dive";
    dailyJoke = getDailyJoke();
    
    // 🚀 SVELTE SHOWCASE: Epic Logo Entrance
    logoEntranceAnimation();
  });
  
  function closeModal() {
    showModal = false;
    userQuestion = '';
    modalContent = '';
  }
  
  function openAskAI() {
    modalTitle = "Ask AI a Question";
    modalContent = '';
    showModal = true;
    // Auto-focus the input after modal opens
    setTimeout(() => {
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  }
  
  async function submitQuestion() {
    if (!userQuestion.trim()) {
      modalContent = '<p style="color:var(--brand-orange)">Please enter a question.</p>';
      return;
    }
    
    modalTitle = `AI Insights for: "${userQuestion}"`;
    modalContent = '';
    isLoading = true;
    
    // Netlify Function endpoint
    const netlifyFunctionUrl = '/.netlify/functions/ask-ai';
    
    try {
      const response = await fetch(netlifyFunctionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuestion: userQuestion })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error (${response.status}): ${errorData.message || 'Unknown error'}`);
      }
      
      const result = await response.json();
      
      if (result.answer) {
        modalContent = result.answer.replace(/\n/g, '<br>');
      } else {
        modalContent = '<p style="color:var(--brand-orange)">Error: No answer received from AI. Please try a different question.</p>';
      }
    } catch (error) {
      modalContent = `<p style="color:var(--brand-orange)">Error: ${error.message}. Please check your Netlify function logs.</p>`;
    } finally {
      isLoading = false;
    }
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

<!-- Report Page Content -->
<main class="container">
  
  <!-- Intro Section -->
  <section class="intro-section">
    <!-- 🚀 SVELTE SHOWCASE: Advanced Logo with Particle System -->
    <div class="logo-container">
      <!-- Particle System -->
      <div class="particles-container">
        {#each $particles as particle (particle.id)}
          <div 
            class="particle"
            style="
              left: calc(50% + {particle.x}px);
              top: calc(50% + {particle.y}px);
              width: {particle.size}px;
              height: {particle.size}px;
              opacity: {particle.opacity};
              background-color: {particle.color};
              box-shadow: 0 0 {particle.size * 2}px {particle.color};
            "
          ></div>
        {/each}
      </div>
      
      <!-- Main Logo with Svelte Animations -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <img 
        bind:this={logoElement}
        src="https://github.com/Wolfe-Jam/theblockchain-ai/blob/main/Public/theBlockchain-ai.png?raw=true" 
        alt="theBlockchain.ai Logo" 
        class="logo svelte-showcase-logo"
        style="
          opacity: {$logoOpacity};
          transform: 
            scale({$logoScale}) 
            rotate({$logoRotation}deg) 
            translateY({$logoFloat}px);
          filter: 
            drop-shadow(0 0 {$logoGlow * 30}px rgba(255, 145, 77, {$logoGlow * 0.8}))
            drop-shadow(0 0 {$logoGlow * 60}px rgba(12, 192, 223, {$logoGlow * 0.4}))
            brightness({1 + $logoGlow * 0.2});
        "
        on:mouseenter={handleLogoHover}
        on:mouseleave={handleLogoLeave}
        on:error={(e) => {
          e.target.src = 'https://placehold.co/200x200/1E293B/FFFFFF?text=Svelte+Logo';
          e.target.onerror = null;
        }}
      />
      
      <!-- Animated Ring Effects -->
      {#if animationPhase === 'magic' || animationPhase === 'settling'}
        <div class="logo-ring ring-1"></div>
        <div class="logo-ring ring-2"></div>
        <div class="logo-ring ring-3"></div>
      {/if}
    </div>
    
    <h2 class="main-headline">
      Building an <br><span class="highlight-orange">Unassailable Position</span><br>
      <span class="highlight-cyan">with the 3 PILLARS</span>
    </h2>
    
    <ul class="intro-list">
      <li>
        <i class="fas fa-check-circle icon-blue"></i> 
        Discover how <span class="highlight-blue">theBlockchain.AI</span> ensures verifiable trust.
      </li>
      <li>
        <i class="fas fa-globe icon-cyan"></i> 
        Explore <span class="highlight-cyan">The OUTPUT Marketplace</span> for a vibrant AI ecosystem.
      </li>
      <li>
        <i class="fas fa-cogs icon-orange"></i> 
        Understand <span class="highlight-orange">Code-In-Action (CIA)</span>: Custom, Intelligent Automation.
      </li>
    </ul>
  </section>

  <!-- Deep Dive Section -->
  <section class="deep-dive-section">
    <div class="section-header">
      <h2>Strategic Blueprint: The Deep Dive</h2>
      <p>This report details the strategic blueprint enabling theBlockchain.ai to <strong>define a New Trusted-AI and Automation market.</strong> Our integration of cutting-edge blockchain technology, a dynamic developer OUTPUT marketplace, and tailored Code-In-Action AI solutions creates a powerful, defensible and unique market advantage.</p>
    </div>
    
    <div class="mission-card">
      <h3>A Win/Win/Win for the Entire Ecosystem.</h3>
      <div class="mission-content">
        <p><strong>Developers Win:</strong> Get paid directly for your code OUTPUT.</p>
        <p><strong>Businesses Win:</strong> Access a marketplace of secure, auditable AI Code-In-Action.</p>
        <p><strong>Data Owners Win:</strong> Monetize your data with guaranteed privacy through TOKENIZING.</p>
      </div>
    </div>
  </section>

  <!-- Three Pillars Section -->
  <section class="pillars-section">
    <div class="section-header">
      <h2>The 3 Strategic Pillars</h2>
      <p>These three foundational pillars–<span class="highlight-blue">The Blockchain</span>, The <span class="highlight-cyan">OUTPUT</span> Marketplace, and <span class="highlight-orange">Code-In-Action (CIA)</span>: Custom, Intelligent Automation–converge to create our unassailable strategic position, represented by our logo.</p>
      
      <!-- Strategic Pillars Logo -->
      <img 
        src="https://github.com/Wolfe-Jam/theblockchain-ai/blob/main/Public/theBlockchain-ai.png?raw=true" 
        alt="theBlockchain.ai Strategic Position" 
        class="pillars-logo"
        on:error={(e) => {
          e.target.src = 'https://placehold.co/180x180/1E293B/FFFFFF?text=Logo';
          e.target.onerror = null;
        }}
      >
    </div>

    <div class="pillars-grid">
      <div class="pillar-card pillar-blue">
        <h3>Pillar 1:<br>The Blockchain</h3>
        <ul>
          <li>Architecting trust, auditability, and trackable monetization.</li>
          <li>The blockchain layer provides a verifiable foundation for every module and transaction.</li>
        </ul>
      </div>

      <div class="pillar-card pillar-cyan">
        <h3>Pillar 2:<br>The OUTPUT</h3>
        <ul>
          <li>A unified developer marketplace fostering a vibrant AI ecosystem.</li>
          <li>For discovering, distributing, and monetizing AI automation modules.</li>
        </ul>
      </div>

      <div class="pillar-card pillar-orange">
        <h3>Pillar 3:<br>Code-In-Action (CIA)</h3>
        <ul>
          <li>An A La Carte model for custom, intelligent automation for high-value enterprise clients.</li>
          <li>Leveraging modules from The OUTPUT marketplace.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Ask AI Button -->
  <div class="ask-ai-section">
    <button class="ask-ai-button" on:click={openAskAI}>
      Ask AI
    </button>
  </div>

</main>

<!-- AI Modal -->
{#if showModal}
  <div class="modal" on:click={handleBackdropClick}>
    <div class="modal-content">
      <button class="close-button" on:click={closeModal}>&times;</button>
      
      <h3 class="modal-title">{modalTitle}</h3>
      
      {#if !modalContent}
        <div class="search-container">
          <div class="search-box">
            <input 
              type="text"
              value={userQuestion}
              class="search-input"
              placeholder="Ask anything about theBlockchain.ai..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              inputmode="text"
              on:input={(e) => {
                userQuestion = e.target.value;
              }}
              on:keydown={(e) => {
                if (e.key === ' ') {
                  // Stop the space from triggering menu banner toggle
                  e.stopPropagation();
                  // Let the default space behavior happen in the input
                  // Don't prevent default - we want the space to work normally
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  submitQuestion();
                }
              }}
              bind:this={searchInput}
            />
            <button class="search-button" on:click={submitQuestion}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Joke of the Day -->
        <div class="joke-section">
          <div class="joke-container">
            <span class="joke-label">🤣 Joke of the Day:</span>
            <span class="joke-text">"{dailyJoke}"</span>
            <div class="joke-rating">
              {#if jokeRating === null}
                <button class="rating-btn" on:click={() => rateJoke('up')}>👍</button>
                <button class="rating-btn" on:click={() => rateJoke('down')}>👎</button>
              {:else if jokeRating === 'up'}
                <span class="rating-feedback">Thanks! 😄</span>
              {:else}
                <span class="rating-feedback">Noted! 😅 We'll do better!</span>
              {/if}
            </div>
          </div>
        </div>
      {/if}
      
      {#if isLoading}
        <div class="loading-spinner"></div>
      {/if}
      
      {#if modalContent}
        <div class="modal-response">
          {@html modalContent}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="postcss">
  :root {
    --brand-orange: #FF914D;
    --brand-cyan: #0CC0DF;
    --brand-blue: #004AAE;      /* Blockchain Blue - exact brand color */
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    padding-top: 6rem;
  }

  /* Intro Section */
  .intro-section {
    text-align: center;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 6rem;
  }

  /* 🚀 SVELTE SHOWCASE: Advanced Logo Animation System */
  .logo-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14rem;
    margin: 2rem auto 2rem auto;
    overflow: visible;
  }
  
  .svelte-showcase-logo {
    height: 12rem;
    width: auto;
    cursor: pointer;
    z-index: 10;
    position: relative;
    transition: none; /* Pure Svelte animations */
  }
  
  /* Particle System */
  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
  }
  
  .particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: float 2s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }
  
  /* Animated Ring Effects */
  .logo-ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid;
    pointer-events: none;
    animation: ring-expand 1.5s ease-out infinite;
  }
  
  .ring-1 {
    width: 200px;
    height: 200px;
    border-color: rgba(255, 145, 77, 0.6);
    animation-delay: 0s;
  }
  
  .ring-2 {
    width: 250px;
    height: 250px;
    border-color: rgba(12, 192, 223, 0.4);
    animation-delay: 0.3s;
  }
  
  .ring-3 {
    width: 300px;
    height: 300px;
    border-color: rgba(0, 74, 174, 0.3);
    animation-delay: 0.6s;
  }
  
  @keyframes ring-expand {
    0% {
      transform: scale(0.5);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  .pillars-logo {
    height: 140px;
    width: auto;
    margin: 2rem auto;
    display: block;
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }
  
  .pillars-logo:hover {
    opacity: 1;
  }

  .main-headline {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 2rem;
    color: #F8FAFC;
  }

  .highlight-orange {
    color: var(--brand-orange);
    padding: 0 0.2em;
  }

  .highlight-blue {
    color: var(--brand-blue-text); /* Universal readable blue */
    font-weight: 700;
    padding: 0 0.2em;
  }

  .highlight-cyan {
    color: var(--brand-cyan);
    font-weight: 700;
    padding: 0 0.2em;
  }

  .intro-list {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    max-width: 4xl;
  }

  .intro-list li {
    position: relative;
    padding-left: 3rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 1.25rem;
    color: #cbd5e1;
  }

  .intro-list li i {
    position: absolute;
    left: 0;
    font-size: 2rem;
    width: 2.5rem;
    text-align: center;
  }

  .icon-blue {
    color: var(--brand-blue-text);
  }

  .icon-cyan {
    color: var(--brand-cyan);
  }

  .icon-orange {
    color: var(--brand-orange);
  }

  /* Section Styles */
  .deep-dive-section,
  .pillars-section {
    margin: 6rem 0;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #F8FAFC;
  }

  .section-header p {
    font-size: 1.125rem;
    color: #cbd5e1;
    max-width: 3xl;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* Mission Card */
  .mission-card {
    background-color: #1E293B;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s, box-shadow 0.3s;
    text-align: center;
  }

  .mission-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.5);
  }

  .mission-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--brand-cyan);
  }

  .mission-content p {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #F8FAFC;
  }

  /* Pillars Grid */
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .pillar-card {
    background-color: #1E293B;
    border-radius: 0.75rem;
    padding: 1.5rem;
    border-top: 4px solid;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .pillar-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.5);
  }

  .pillar-blue {
    border-top-color: var(--brand-blue);
  }

  .pillar-cyan {
    border-top-color: var(--brand-cyan);
  }

  .pillar-orange {
    border-top-color: var(--brand-orange);
  }

  .pillar-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .pillar-blue h3 {
    color: var(--brand-blue-text); /* Universal readable blue */
  }

  .pillar-cyan h3 {
    color: var(--brand-cyan);
  }

  .pillar-orange h3 {
    color: var(--brand-orange);
  }

  .pillar-card ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  .pillar-card li {
    position: relative;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    line-height: 1.5;
    color: #cbd5e1;
  }

  .pillar-card li::before {
    content: '•';
    color: var(--brand-cyan);
    position: absolute;
    left: 0;
    font-weight: bold;
  }

  /* Ask AI Section */
  .ask-ai-section {
    display: flex;
    justify-content: center;
    margin: 4rem 0 2rem 0;
  }

  .ask-ai-button {
    background-color: var(--brand-blue);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
  }

  .ask-ai-button:hover {
    filter: brightness(1.2);
    transform: translateY(-1px);
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background-color: #1E293B;
    color: #F8FAFC;
    padding: 2rem;
    border-radius: 0.75rem;
    width: 90%;
    max-width: 700px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 16px rgba(0,0,0,0.4);
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #CBD5E1;
    font-size: 1.75rem;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .close-button:hover {
    color: #F8FAFC;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--brand-cyan);
    margin-bottom: 1.5rem;
    padding-right: 2rem;
  }

  .question-input {
    margin-bottom: 1rem;
  }

  .search-container {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }

  .search-box {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 500px;
    background-color: #374151;
    border: 1px solid #4b5563;
    border-radius: 24px;
    padding: 12px 16px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .search-box:hover {
    border-color: var(--brand-cyan);
    box-shadow: 0 4px 12px rgba(12, 192, 223, 0.2);
  }

  .search-box:focus-within {
    border-color: var(--brand-cyan);
    box-shadow: 0 4px 12px rgba(12, 192, 223, 0.3);
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    color: white;
    font-size: 16px;
    font-family: 'Roboto Mono', monospace;
    font-weight: 400;
    letter-spacing: 0.5px;
    outline: none;
    padding: 0;
    margin-right: 12px;
  }

  .search-input::placeholder {
    color: #9ca3af;
  }

  .search-button {
    background: none;
    border: none;
    color: var(--brand-cyan);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .search-button:hover {
    background-color: rgba(12, 192, 223, 0.1);
    transform: scale(1.05);
  }

  /* Joke of the Day Styles */
  .joke-section {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
  }

  .joke-container {
    max-width: 500px;
    background-color: rgba(255, 145, 77, 0.1);
    border: 1px solid rgba(255, 145, 77, 0.3);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
  }

  .joke-label {
    font-family: 'Roboto Mono', monospace;
    font-weight: 600;
    color: var(--brand-orange);
    font-size: 0.9rem;
  }

  .joke-text {
    display: block;
    margin: 0.5rem 0;
    color: white;
    font-style: italic;
    line-height: 1.4;
  }

  .joke-rating {
    margin-top: 0.75rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .rating-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .rating-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  .rating-feedback {
    color: var(--brand-cyan);
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .submit-button {
    background-color: var(--brand-cyan);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: all 0.3s ease;
  }

  .submit-button:hover {
    filter: brightness(1.1);
  }

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--brand-cyan);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin: 2rem auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .modal-response {
    margin-top: 1.5rem;
    line-height: 1.6;
    color: #cbd5e1;
  }

  @media (max-width: 768px) {
    .main-headline {
      font-size: 2rem;
    }

    .intro-list li {
      font-size: 1rem;
    }

    .section-header h2 {
      font-size: 2rem;
    }

    .pillars-grid {
      grid-template-columns: 1fr;
    }

    .container {
      padding: 1rem;
      padding-top: 5rem;
    }
  }
</style>