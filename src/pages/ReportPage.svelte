<!-- src/pages/ReportPage.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let showModal = false;
  let modalTitle = '';
  let modalContent = '';
  let userQuestion = '';
  let isLoading = false;
  let searchInput; // Reference to the input element
  let dailyJoke = '';
  let jokeRating = null; // null, 'up', or 'down'
  
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
    // TODO: Send rating data to analytics/database
    console.log(`Joke rated: ${rating} - "${dailyJoke}"`);
    
    // Show brief feedback
    setTimeout(() => {
      jokeRating = null;
    }, 2000);
  }
  
  onMount(() => {
    document.title = "TheBlockchain.AI: Strategic Deep Dive";
    dailyJoke = getDailyJoke();
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
    <img 
      src="https://github.com/Wolfe-Jam/theblockchain-ai/blob/main/Public/theBlockchain-ai.png?raw=true" 
      alt="theBlockchain.ai Logo" 
      class="logo"
      on:error={(e) => {
        e.target.src = 'https://placehold.co/200x200/1E293B/FFFFFF?text=Logo+Not+Found';
        e.target.onerror = null;
      }}
    >
    
    <h2 class="main-headline">
      Building an <br><span class="highlight-orange">Unassailable Position</span>
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
      <h2>The Three Strategic Pillars</h2>
      <p>These three foundational pillars–<span class="highlight-blue">The Blockchain</span>, The <span class="highlight-cyan">OUTPUT</span> Marketplace, and <span class="highlight-orange">Code-In-Action (CIA)</span>: Custom, Intelligent Automation–converge to create our unassailable strategic position, represented by our logo.</p>
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
                console.log('Input changed:', JSON.stringify(e.target.value));
              }}
              on:keydown={(e) => {
                console.log('Key pressed:', e.key);
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
    --brand-blue: #004AAE;
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

  .logo {
    height: 12rem;
    width: auto;
    margin: 2rem auto;
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
  }

  .highlight-blue {
    color: var(--brand-blue);
    font-weight: 700;
  }

  .highlight-cyan {
    color: var(--brand-cyan);
    font-weight: 700;
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
    color: var(--brand-blue);
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
    color: var(--brand-blue);
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