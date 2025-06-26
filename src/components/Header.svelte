<!-- src/components/Header.svelte -->
<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let showHeader = false;
  let currentPath = '';
  let sequenceTriggered = false; // Track if home page sequence completed
  let mobileMenuOpen = false; // Track mobile menu state
  let isDesktop = true; // Will be set properly in onMount
  
  // Reactive: Ensure header stays visible on mobile or when mobile menu is open
  $: if (!isDesktop || mobileMenuOpen) {
    showHeader = true;
  }
  
  function openAskAI(e) {
    e.preventDefault();
    e.stopPropagation();
    mobileMenuOpen = false; // Close mobile menu
    dispatch('openAskAI');
  }
  
  function openAbout(e) {
    e.preventDefault();
    e.stopPropagation();
    mobileMenuOpen = false; // Close mobile menu
    dispatch('openAbout');
  }
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    // Force header to stay visible when mobile menu is open
    if (mobileMenuOpen) {
      showHeader = true;
    }
  }
  
  function closeMobileMenu() {
    mobileMenuOpen = false;
    // On mobile, keep header visible even after closing menu
    if (!isDesktop) {
      showHeader = true;
    }
  }
  
  onMount(() => {
    // Get current path
    currentPath = window.location.pathname;
    
    // Detect if device supports hover (desktop) vs touch-only (mobile)
    isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    // Ensure page has focus for keyboard events
    if (typeof window !== 'undefined') {
      window.focus();
      document.body.focus();
    }
    
    const handleMouseMove = (e) => {
      // CRITICAL: Only apply auto-hide logic on desktop AND when mobile menu is closed
      if (!isDesktop || mobileMenuOpen) return;
      
      // Show header when mouse is in top 100px of screen OR on content pages OR sequence completed on home
      const contentPages = ['/report', '/vision', '/invest'];
      showHeader = e.clientY <= 100 || contentPages.includes(currentPath) || (currentPath === '/' && sequenceTriggered);
    };
    
    const handleKeyDown = (e) => {
      // Toggle header on spacebar (except on content pages where it should stay visible)
      const contentPages = ['/report', '/vision', '/invest'];
      if (e.key === ' ' && !contentPages.includes(currentPath) && isDesktop) {
        e.preventDefault();
        showHeader = !showHeader;
      }
      // Close mobile menu on Escape
      if (e.key === 'Escape') {
        mobileMenuOpen = false;
      }
    };
    
    const handleResize = () => {
      // Close mobile menu on resize (when switching to desktop)
      if (window.innerWidth >= 768) {
        mobileMenuOpen = false;
      }
      // Re-detect device type on resize
      isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    };
    
    // Always show header on content pages OR on mobile devices
    const contentPages = ['/report', '/vision', '/invest'];
    if (contentPages.includes(currentPath) || !isDesktop) {
      showHeader = true;
    }
    
    // Always add mouse move listener but with proper guards inside the handler
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    
    // Listen for path changes
    window.addEventListener('popstate', () => {
      currentPath = window.location.pathname;
      const contentPages = ['/report', '/vision', '/invest'];
      if (contentPages.includes(currentPath) || !isDesktop) {
        showHeader = true;
      } else if (currentPath !== '/') {
        sequenceTriggered = false; // Reset when leaving home page
      }
    });
    
    // Listen for show header event from home page sequence
    window.addEventListener('showHeader', () => {
      if (currentPath === '/' || !isDesktop) {
        showHeader = true;
        sequenceTriggered = true; // Keep header available after sequence
      }
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<header class="header" class:visible={showHeader}>
    <nav class="nav">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="nav-brand" on:click={openAbout}>
            <img src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" alt="Logo" class="logo">
            <span class="brand-text">theBlockchain.ai</span>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="nav-links desktop-nav">
            <a href="/" on:click={closeMobileMenu}>Home</a>
            <a href="/vision" on:click={closeMobileMenu}>Vision</a>
            <a href="/report" on:click={closeMobileMenu}>Deep Dive</a>
            <a href="/invest" on:click={closeMobileMenu}>Invest</a>
            <button type="button" class="ask-ai-link" on:click={openAskAI}>Ask AI 🤖</button>
        </div>
        
        <!-- Mobile Menu Button -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="mobile-menu-button" on:click={toggleMobileMenu}>
            <div class="hamburger" class:open={mobileMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    
    <!-- Mobile Navigation Menu -->
    {#if mobileMenuOpen}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="mobile-menu-overlay" on:click={closeMobileMenu}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="mobile-menu" on:click|stopPropagation>
                <a href="/" on:click={closeMobileMenu}>Home</a>
                <a href="/vision" on:click={closeMobileMenu}>Vision</a>
                <a href="/report" on:click={closeMobileMenu}>Deep Dive</a>
                <a href="/invest" on:click={closeMobileMenu}>Invest</a>
                <button type="button" class="ask-ai-mobile" on:click={openAskAI}>Ask AI 🤖</button>
            </div>
        </div>
    {/if}
</header>

<style>
  /* Mobile-first responsive header */
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
    padding: 0.75rem 1rem;
    max-width: 1280px;
    margin: 0 auto;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    font-family: 'Roboto Mono', monospace;
    font-weight: 700;
    color: white;
    cursor: pointer;
    transition: opacity 0.3s ease;
    flex-shrink: 0;
  }

  .nav-brand:hover {
    opacity: 0.8;
  }

  .logo {
    height: 1.75rem;
    width: auto;
    margin-right: 0.5rem;
  }

  .brand-text {
    font-size: 1rem;
  }

  /* Desktop Navigation - Hidden on mobile */
  .desktop-nav {
    display: none;
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

  .nav-links a:hover,
  .ask-ai-link:hover {
    color: white;
  }

  /* Mobile Menu Button */
  .mobile-menu-button {
    display: block;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 60;
  }

  /* Hamburger Animation */
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 18px;
  }

  .hamburger span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: white;
    border-radius: 1px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  /* Mobile Menu Overlay */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    z-index: 55;
    animation: fadeIn 0.3s ease;
  }

  .mobile-menu {
    position: absolute;
    top: 4rem;
    right: 1rem;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 12px;
    padding: 1.5rem;
    min-width: 200px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease;
  }

  .mobile-menu a,
  .ask-ai-mobile {
    display: block;
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: color 0.3s ease;
  }

  .mobile-menu a:last-child,
  .ask-ai-mobile {
    border-bottom: none;
  }

  .ask-ai-mobile {
    font-family: 'Roboto Mono', monospace !important;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    color: white !important;
  }

  .mobile-menu a:hover,
  .ask-ai-mobile:hover {
    color: white;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateY(-10px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Tablet and Desktop Styles */
  @media (min-width: 768px) {
    .nav {
      padding: 1rem 2rem;
    }

    .logo {
      height: 2rem;
      margin-right: 0.75rem;
    }

    .brand-text {
      font-size: 1.25rem;
    }

    /* Show desktop nav, hide mobile menu button */
    .desktop-nav {
      display: flex;
      align-items: center;
    }

    .mobile-menu-button {
      display: none;
    }
  }

  /* Large Desktop */
  @media (min-width: 1024px) {
    .nav {
      padding: 1rem 2rem;
    }
  }
</style>
