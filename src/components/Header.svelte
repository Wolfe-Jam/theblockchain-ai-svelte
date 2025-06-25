<!-- src/components/Header.svelte -->
<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let showHeader = false;
  let currentPath = '';
  let sequenceTriggered = false; // Track if home page sequence completed
  
  function openAskAI(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch('openAskAI');
  }
  
  function openAbout(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch('openAbout');
  }
  
  onMount(() => {
    // Get current path
    currentPath = window.location.pathname;
    
    // Ensure page has focus for keyboard events
    if (typeof window !== 'undefined') {
      window.focus();
      document.body.focus();
    }
    
    const handleMouseMove = (e) => {
      // Show header when mouse is in top 100px of screen OR on content pages OR sequence completed on home
      const contentPages = ['/report', '/vision', '/invest'];
      showHeader = e.clientY <= 100 || contentPages.includes(currentPath) || (currentPath === '/' && sequenceTriggered);
    };
    
    const handleKeyDown = (e) => {
      // Toggle header on spacebar (except on content pages where it should stay visible)
      const contentPages = ['/report', '/vision', '/invest'];
      if (e.key === ' ' && !contentPages.includes(currentPath)) {
        e.preventDefault();
        showHeader = !showHeader;
      }
    };
    
    // Always show header on content pages
    const contentPages = ['/report', '/vision', '/invest'];
    if (contentPages.includes(currentPath)) {
      showHeader = true;
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    
    // Listen for path changes
    window.addEventListener('popstate', () => {
      currentPath = window.location.pathname;
      const contentPages = ['/report', '/vision', '/invest'];
      if (contentPages.includes(currentPath)) {
        showHeader = true;
      } else if (currentPath !== '/') {
        sequenceTriggered = false; // Reset when leaving home page
      }
    });
    
    // Listen for show header event from home page sequence
    window.addEventListener('showHeader', () => {
      if (currentPath === '/') {
        showHeader = true;
        sequenceTriggered = true; // Keep header available after sequence
      }
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<header class="header" class:visible={showHeader}>
    <nav class="nav">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="nav-brand" on:click={openAbout}>
            <img src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" alt="Logo" class="h-8 w-auto mr-3">
            <span>theBlockchain.ai</span>
        </div>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/vision">Vision</a>
            <a href="/report">Deep Dive</a>
            <a href="/invest">Invest</a>
            <button type="button" class="ask-ai-link" on:click={openAskAI}>Ask AI 🤖</button>
        </div>
    </nav>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    transition: opacity 0.4s ease, background-color 0.4s ease;
    opacity: 0;
    visibility: hidden;
  }
  
  .header.visible {
    opacity: 1;
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1280px;
    margin: 0 auto;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    font-family: 'Roboto Mono', monospace;
    font-weight: 700;
    font-size: 1.25rem;
    color: white;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .nav-brand:hover {
    opacity: 0.8;
  }

  .nav-links a {
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 500;
    margin-left: 2rem;
    transition: color 0.3s ease;
  }

  .ask-ai-link {
    font-family: 'Roboto Mono', monospace !important;
    font-weight: 600;
    color: white !important;
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 2rem;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: white;
  }

  .ask-ai-link:hover {
    color: white !important;
  }
</style>
