<!-- src/components/AskAIModal.svelte -->
<script>
  import { fade, scale } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  export let isOpen = false;
  
  let userQuestion = '';
  let isLoading = false;
  let modalContent = '';
  let searchInput;
  let dailyJoke = '';
  let jokeRating = null;
  
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
    const today = new Date().toDateString();
    const jokeIndex = Math.abs(today.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0)) % jokes.length;
    return jokes[jokeIndex];
  }
  
  function rateJoke(rating) {
    jokeRating = rating;
    console.log(`Joke rated: ${rating} - "${dailyJoke}"`);
    // Close modal after rating
    setTimeout(() => {
      closeModal();
    }, 1500);
  }
  
  function closeModal() {
    isOpen = false;
    userQuestion = '';
    modalContent = '';
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
  async function submitQuestion() {
    if (!userQuestion.trim()) {
      modalContent = '<p style="color:var(--brand-orange)">Please enter a question.</p>';
      return;
    }
    
    modalContent = '';
    isLoading = true;
    
    const netlifyFunctionUrl = '/.netlify/functions/ask-ai';
    
    try {
      const response = await fetch(netlifyFunctionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuestion: userQuestion })
      });
      
      if (!response.ok) {
        throw new Error(`Server error (${response.status}): ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.answer) {
        modalContent = result.answer.replace(/\n/g, '<br>');
      } else {
        modalContent = '<p style="color:var(--brand-orange)">No answer received. Please try again.</p>';
      }
    } catch (error) {
      console.error('AI query error:', error);
      modalContent = `<p style="color:var(--brand-orange)">Error: ${error.message}</p>`;
    } finally {
      isLoading = false;
    }
  }
  
  // Auto-focus and load joke when modal opens
  $: if (isOpen) {
    dailyJoke = getDailyJoke();
    jokeRating = null;
    setTimeout(() => {
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={handleBackdropClick} 
       transition:fade={{ duration: 400, easing: 'ease-out' }}>
    <div class="modal-content" 
         transition:scale={{ duration: 400, start: 0.9, easing: 'ease-out' }}>
      
      {#if !modalContent}
        <!-- Search Interface FIRST -->
        <div class="search-container">
          <div class="search-box">
            <input 
              type="text"
              value={userQuestion}
              bind:this={searchInput}
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
                  e.stopPropagation();
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  submitQuestion();
                }
              }}
            />
            <button class="search-button" on:click={submitQuestion}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Joke THEN Exit at bottom -->
        <div class="joke-section">
          <h3 class="joke-title">🤣 Joke of the Day</h3>
          <div class="joke-container">
            <span class="joke-text">"{dailyJoke}"</span>
            <div class="joke-prompt">
              <span class="joke-label">Make you laugh?</span>
              <span class="vote-label">Vote to exit:</span>
            </div>
            <div class="joke-rating">
              {#if jokeRating === null}
                <button class="rating-btn" on:click={() => rateJoke('up')}>👍</button>
                <button class="rating-btn" on:click={() => rateJoke('down')}>👎</button>
              {:else if jokeRating === 'up'}
                <span class="rating-feedback">Thanks! 😄 Closing...</span>
              {:else}
                <span class="rating-feedback">Noted! 😅 We'll do better! Closing...</span>
              {/if}
            </div>
          </div>
        </div>
      {/if}
      
      {#if isLoading}
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Thinking...</p>
        </div>
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
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(6px);
  }

  .modal-content {
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 2rem;
    margin: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    background-color: #1e293b;
    border: 2px solid var(--brand-cyan);
    color: white;
    max-height: 90vh;
    overflow-y: auto;
  }

  /* Search Styles */
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

  /* Joke Styles */
  .joke-section {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .joke-title {
    font-family: 'Roboto Mono', monospace;
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--brand-orange);
    margin-bottom: 1rem;
    text-align: center;
  }

  .joke-container {
    max-width: 500px;
    background-color: rgba(255, 145, 77, 0.1);
    border: 1px solid rgba(255, 145, 77, 0.3);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
  }

  .joke-text {
    display: block;
    margin-bottom: 1rem;
    color: white;
    font-style: italic;
    line-height: 1.4;
    font-size: 1.1rem;
  }

  .joke-prompt {
    margin-bottom: 1rem;
  }

  .joke-label {
    font-family: 'Roboto Mono', monospace;
    font-weight: 600;
    color: var(--brand-orange);
    font-size: 1rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  .vote-label {
    font-family: 'Roboto Mono', monospace;
    font-weight: 700;
    color: white;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
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

  /* Loading and Response Styles */
  .loading-spinner {
    text-align: center;
    padding: 2rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #374151;
    border-top: 4px solid var(--brand-cyan);
    border-radius: 50%;
    margin: 0 auto 1rem auto;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .modal-response {
    background-color: #0f172a;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border-left: 4px solid var(--brand-cyan);
    margin-top: 1rem;
    line-height: 1.6;
  }
</style>
