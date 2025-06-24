<!-- src/components/Header.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let showHeader = false;
  
  onMount(() => {
    // Ensure page has focus for keyboard events
    if (typeof window !== 'undefined') {
      window.focus();
      document.body.focus();
    }
    
    const handleMouseMove = (e) => {
      // Show header when mouse is in top 100px of screen
      showHeader = e.clientY <= 100;
    };
    
    const handleKeyDown = (e) => {
      // Toggle header on spacebar
      if (e.key === ' ') {
        e.preventDefault();
        showHeader = !showHeader;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<header class="header" class:visible={showHeader}>
    <nav class="nav">
        <a href="/" class="nav-brand">
            <img src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" alt="Logo" class="h-8 w-auto mr-3">
            <span>theBlockchain.ai</span>
        </a>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/vision">Vision</a>
            <a href="/report">Deep Dive</a>
            <a href="/faqs">FAQs</a>
            <a href="mailto:invest@theblockchain.ai">Invest</a>
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
    text-decoration: none;
    color: white;
  }

  .nav-links a {
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 500;
    margin-left: 2rem;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: white;
  }
</style>
