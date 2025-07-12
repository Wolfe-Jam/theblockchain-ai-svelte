<!-- src/components/Header.svelte -->
<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  
  const dispatch = createEventDispatcher();
  
  let showHeader = false;
  let currentPath = '';
  let sequenceTriggered = false; // Track if home page sequence completed
  let mobileMenuOpen = false; // Track mobile menu state
  let isDesktop = true; // Will be set properly in onMount
  let visionDropdownOpen = false; // Track vision dropdown state
  let visionHoverTimeout; // Track hover timeout
  let resourceDropdownOpen = false; // Track resource dropdown state
  let resourceHoverTimeout; // Track hover timeout
  let investDropdownOpen = false; // Track invest dropdown state
  let investHoverTimeout; // Track hover timeout
  
  // Check if we're on a marketplace page using reactive $page store
  $: isMarketplace = $page.url.pathname.startsWith('/marketplace');
  $: brandText = isMarketplace ? 'theMarketplace' : 'theBlockchain.ai';
  
  function showVisionDropdown() {
    clearTimeout(visionHoverTimeout);
    visionDropdownOpen = true;
  }
  
  function hideVisionDropdown() {
    visionHoverTimeout = setTimeout(() => {
      visionDropdownOpen = false;
    }, 150); // Small delay to allow mouse movement
  }
  
  function showResourceDropdown() {
    clearTimeout(resourceHoverTimeout);
    resourceDropdownOpen = true;
  }
  
  function hideResourceDropdown() {
    resourceHoverTimeout = setTimeout(() => {
      resourceDropdownOpen = false;
    }, 150); // Small delay to allow mouse movement
  }
  
  function showInvestDropdown() {
    clearTimeout(investHoverTimeout);
    investDropdownOpen = true;
  }
  
  function hideInvestDropdown() {
    investHoverTimeout = setTimeout(() => {
      investDropdownOpen = false;
    }, 150); // Small delay to allow mouse movement
  }
  
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
  
  function goHome(e) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/';
  }
  
  function openAbout(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    mobileMenuOpen = false; // Close mobile menu
    console.log('Header: dispatching openAbout event'); // Debug log
    dispatch('openAbout');
  }
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    visionDropdownOpen = false; // Close vision dropdown when opening mobile menu
    // Force header to stay visible when mobile menu is open
    if (mobileMenuOpen) {
      showHeader = true;
    }
  }
  
  function closeMobileMenu() {
    mobileMenuOpen = false;
    visionDropdownOpen = false; // Close vision dropdown too
    // On mobile, keep header visible even after closing menu
    if (!isDesktop) {
      showHeader = true;
    }
  }
  
  function toggleVisionDropdown() {
    visionDropdownOpen = !visionDropdownOpen;
  }
  
  function closeVisionDropdown() {
    visionDropdownOpen = false;
  }
  
  function closeResourceDropdown() {
    resourceDropdownOpen = false;
  }
  
  function toggleInvestDropdown() {
    investDropdownOpen = !investDropdownOpen;
  }
  
  function closeInvestDropdown() {
    investDropdownOpen = false;
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
      // CRITICAL: Only apply auto-hide logic on HOME PAGE and when mobile menu is closed
      if (!isDesktop || mobileMenuOpen) return;
      
      // NEVER hide header when any dropdown is open
      if (visionDropdownOpen || resourceDropdownOpen || investDropdownOpen) return;
      
      // Show header when mouse is in top 100px OR on content pages (always visible) OR sequence completed on home
      const contentPages = ['/report', '/vision', '/invest', '/briefings', '/tools', '/deep-dive/the-convergent-economy', '/glossary', '/faqs', '/interactive-guides', '/marketplace'];
      showHeader = e.clientY <= 100 || contentPages.includes(currentPath) || isMarketplace || (currentPath === '/' && sequenceTriggered);
    };
    
    const handleKeyDown = (e) => {
      // Toggle header on spacebar (ONLY works on home page - content pages always show header)
      const contentPages = ['/report', '/vision', '/invest', '/briefings', '/tools', '/deep-dive/the-convergent-economy', '/glossary', '/faqs', '/interactive-guides', '/marketplace'];
      if (e.key === ' ' && !contentPages.includes(currentPath) && !isMarketplace && isDesktop) {
        e.preventDefault();
        showHeader = !showHeader;
      }
      // Close mobile menu and dropdowns on Escape
      if (e.key === 'Escape') {
        mobileMenuOpen = false;
        visionDropdownOpen = false;
      }
    };
    
    const handleResize = () => {
      // Close mobile menu on resize (when switching to desktop)
      if (window.innerWidth >= 768) {
        mobileMenuOpen = false;
        visionDropdownOpen = false;
      }
      // Re-detect device type on resize
      isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    };
    
    const handleClickOutside = (e) => {
      // Close vision dropdown when clicking outside
      if (visionDropdownOpen && !e.target.closest('.dropdown')) {
        visionDropdownOpen = false;
      }
    };
    
    // Force header to always show on content pages, hide only on home page
    const contentPages = ['/report', '/vision', '/invest', '/briefings', '/tools', '/deep-dive/the-convergent-economy', '/glossary', '/faqs', '/interactive-guides', '/marketplace'];
    if (contentPages.includes(currentPath) || isMarketplace || !isDesktop) {
      showHeader = true;
    }
    
    // Always add mouse move listener but with proper guards inside the handler
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClickOutside);
    
    // Listen for path changes - force header visible on content pages
    window.addEventListener('popstate', () => {
      currentPath = window.location.pathname;
      const contentPages = ['/report', '/vision', '/invest', '/briefings', '/tools', '/deep-dive/the-convergent-economy', '/glossary', '/faqs', '/interactive-guides', '/marketplace'];
      if (contentPages.includes(currentPath) || isMarketplace || !isDesktop) {
        showHeader = true;
      } else if (currentPath !== '/') {
        sequenceTriggered = false; // Reset when leaving home page
      }
    });
    
    // Listen for show header event from home page animation sequence
    window.addEventListener('showHeader', () => {
      if (currentPath === '/' || !isDesktop) {
        showHeader = true;
        sequenceTriggered = true; // Keep header available after home page sequence
      }
    });
    
    // Listen for hide header event for manual toggle
    window.addEventListener('hideHeader', () => {
      if (currentPath === '/' && isDesktop) {
        showHeader = false;
        sequenceTriggered = false; // Reset sequence state
      }
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('showHeader', () => {});
      window.removeEventListener('hideHeader', () => {});
    };
  });
</script>

<header class="header" class:visible={showHeader}>
    <nav class="nav">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="nav-brand">
            <!-- Logo - Goes Home -->
            <a href="/" on:click={goHome} title="Go to Homepage" class="logo-link">
                <img src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" alt="Logo" class="logo">
            </a>
            <!-- Brand Text - Opens About -->
            <span 
              class="brand-text" 
              on:click={openAbout} 
              on:keydown={(e) => e.key === 'Enter' && openAbout(e)}
              title="About this Version" 
              role="button" 
              tabindex="0"
            >
              {brandText}
            </span>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="nav-links desktop-nav">
            <!-- Vision Dropdown -->
            <div class="dropdown" class:open={visionDropdownOpen}
                 on:mouseenter={showVisionDropdown}
                 on:mouseleave={hideVisionDropdown}>
              <a href="/report" class="dropdown-trigger">
                Vision 
                <svg class="dropdown-arrow" class:rotated={visionDropdownOpen} width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </a>
              
              {#if visionDropdownOpen}
                <div class="dropdown-menu">
                  <a href="/report" on:click={closeVisionDropdown}>The 3 Pillars</a>
                  <a href="/briefings" on:click={closeVisionDropdown}>Briefings</a>
                  <a href="/interactive-guides" on:click={closeVisionDropdown}>Interactive Guides</a>
                  <a href="/deep-dive/the-convergent-economy" on:click={closeVisionDropdown}>Deep Dives</a>
                </div>
              {/if}
            </div>
            
            <a href="/tools" on:click={closeMobileMenu}>Tools</a>
            
            <a href="/founders-proof" on:click={closeMobileMenu} class="founders-proof-link">Reward</a>
            
            <!-- Resource Dropdown -->
            <div class="dropdown" class:open={resourceDropdownOpen}
                 on:mouseenter={showResourceDropdown}
                 on:mouseleave={hideResourceDropdown}>
              <span class="dropdown-trigger" style="cursor: pointer;">
                Resource 
                <svg class="dropdown-arrow" class:rotated={resourceDropdownOpen} width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </span>
              
              {#if resourceDropdownOpen}
                <div class="dropdown-menu">
                  <a href="/help" on:click={closeResourceDropdown}>📚 Help - ABCs of bAI</a>
                  <a href="/download" on:click={closeResourceDropdown}>📊 Download PDF Report</a>
                  <button type="button" class="dropdown-about-btn" on:click={() => { closeResourceDropdown(); openAbout(); }}>About</button>
                  <a href="/glossary" on:click={closeResourceDropdown}>Glossary</a>
                  <a href="/faqs" on:click={closeResourceDropdown}>FAQs</a>
                </div>
              {/if}
            </div>
            
            <!-- Invest Dropdown -->
            <div class="dropdown" class:open={investDropdownOpen}
                 on:mouseenter={showInvestDropdown}
                 on:mouseleave={hideInvestDropdown}>
              <span class="dropdown-trigger" style="cursor: pointer;">
                Invest 
                <svg class="dropdown-arrow" class:rotated={investDropdownOpen} width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </span>
              
              {#if investDropdownOpen}
                <div class="dropdown-menu">
                  <a href="/invest" on:click={closeInvestDropdown}>Investment Overview</a>
                  <a href="/invest/opportunities" on:click={closeInvestDropdown}>Investment Opportunities</a>
                  <a href="/invest/dashboard" on:click={closeInvestDropdown}>Dashboard</a>
                </div>
              {/if}
            </div>
            
            <a href="/quantum-demo" class="quantum-demo-link" title="🔮 Quantum Timeline Demo">🧠</a>
            
            <button type="button" class="ask-ai-link" on:click={openAskAI} title="Joke of the DAY">Ask AI 🤖</button>
            
            <span class="nav-separator">|</span>
            
            <div class="nav-end-link">
              {#if isMarketplace}
                <a href="/" on:click={closeMobileMenu}>Home</a>
              {:else}
                <a href="/marketplace" on:click={closeMobileMenu}>Marketplace</a>
              {/if}
            </div>
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
                <!-- Vision Section -->
                <div class="mobile-section">
                  <div class="mobile-section-title">Vision</div>
                  <a href="/report" on:click={closeMobileMenu}>The 3 Pillars</a>
                  <a href="/briefings" on:click={closeMobileMenu}>Briefings</a>
                  <a href="/interactive-guides" on:click={closeMobileMenu}>Interactive Guides</a>
                  <a href="/deep-dive/the-convergent-economy" on:click={closeMobileMenu}>Deep Dives</a>
                </div>
                
                <a href="/founders-proof" on:click={closeMobileMenu} class="founders-proof-mobile">Reward</a>
                
                <a href="/tools" on:click={closeMobileMenu}>Tools</a>
                
                {#if isMarketplace}
                  <a href="/" on:click={closeMobileMenu}>Home</a>
                {:else}
                  <a href="/marketplace" on:click={closeMobileMenu}>Marketplace</a>
                {/if}
                
                <!-- Resource Section -->
                <div class="mobile-section">
                  <div class="mobile-section-title">Resource</div>
                  <a href="/help" on:click={closeMobileMenu}>📚 Help - ABCs of bAI</a>
                  <a href="/download" on:click={closeMobileMenu}>📊 Download PDF Report</a>
                  <button type="button" class="mobile-about-btn" on:click={() => { closeMobileMenu(); openAbout(); }}>About</button>
                  <a href="/glossary" on:click={closeMobileMenu}>Glossary</a>
                  <a href="/faqs" on:click={closeMobileMenu}>FAQs</a>
                </div>
                
                <!-- Invest Section -->
                <div class="mobile-section">
                  <div class="mobile-section-title">Invest</div>
                  <a href="/invest" on:click={closeMobileMenu}>Investment Overview</a>
                  <a href="/invest/opportunities" on:click={closeMobileMenu}>Investment Opportunities</a>
                  <a href="/invest/dashboard" on:click={closeMobileMenu}>Dashboard</a>
                </div>
                
                <button type="button" class="ask-ai-mobile" on:click={openAskAI} title="Joke of the DAY">Ask AI 🤖</button>
            </div>
        </div>
    {/if}
</header>

<style>
  /* CSS Variables */
  :root {
    --brand-cyan: #06b6d4;
    --brand-orange-text: #ea580c;
  }
  
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
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  /* Dark mode header background */
  :global(.dark) .header.visible {
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    min-width: 200px; /* Ensure consistent space for brand */
  }
  
  .logo-link {
    display: flex;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  
  .logo-link:hover {
    opacity: 0.8;
  }
  
  .brand-text {
    font-family: 'Roboto Mono', monospace;
    font-weight: 700;
    color: #1f2937; /* Dark gray for light mode */
    cursor: pointer;
    transition: opacity 0.3s ease;
    margin-left: 0.5rem;
    user-select: none;
    white-space: nowrap; /* Prevent text wrapping */
    min-width: 140px; /* Ensure consistent width */
  }
  
  :global(.dark) .brand-text {
    color: white;
  }
  
  .brand-text:hover {
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
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .nav-end-link {
    min-width: 90px; /* Ensure consistent width for Home/Marketplace */
    text-align: center;
  }
  
  .nav-end-link a {
    display: inline-block;
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  :global(.dark) .nav-end-link a {
    color: #cbd5e1;
  }
  
  .nav-end-link a:hover {
    color: #111827;
  }
  
  :global(.dark) .nav-end-link a:hover {
    color: white;
  }

  .nav-links a {
    color: #374151; /* Dark gray for light mode */
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  :global(.dark) .nav-links a {
    color: #cbd5e1; /* Light gray for dark mode */
  }
  
  .nav-links a:hover {
    color: #111827; /* Almost black for light mode */
  }
  
  :global(.dark) .nav-links a:hover {
    color: white;
  }

  .quantum-demo-link {
    font-size: 1.5rem;
    color: #374151 !important; /* Dark gray for light mode */
    text-decoration: none;
    transition: all 0.15s ease;
    padding: 0.5rem;
    border-radius: 0.5rem;
    position: relative;
  }
  
  :global(.dark) .quantum-demo-link {
    color: #cbd5e1 !important;
  }
  
  .quantum-demo-link:hover {
    color: #111827 !important;
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  :global(.dark) .quantum-demo-link:hover {
    color: white !important;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }

  .ask-ai-link {
    font-family: 'Roboto Mono', monospace !important;
    font-weight: 600;
    color: #374151 !important; /* Dark gray for light mode */
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  :global(.dark) .ask-ai-link {
    color: white !important;
  }
  
  .ask-ai-link:hover {
    color: #111827 !important;
  }
  
  :global(.dark) .ask-ai-link:hover {
    color: white !important;
  }
  
  .nav-separator {
    color: rgba(0, 0, 0, 0.2); /* Dark separator for light mode */
    margin: 0 0.5rem;
    font-size: 1.2rem;
    user-select: none;
  }
  
  :global(.dark) .nav-separator {
    color: rgba(255, 255, 255, 0.3);
  }

  /* Vision Dropdown Styles */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-trigger {
    color: #374151; /* Dark gray for light mode */
    font-weight: 500;
    transition: color 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  :global(.dark) .dropdown-trigger {
    color: #cbd5e1;
  }

  .dropdown-trigger:hover {
    color: #111827; /* Almost black for light mode */
  }
  
  :global(.dark) .dropdown-trigger:hover {
    color: white;
  }

  .dropdown-icon {
    display: inline-block;
    margin-left: 0.25rem;
    cursor: pointer;
    padding: 0.25rem;
  }

  .dropdown-arrow {
    transition: transform 0.2s ease;
  }

  .dropdown-arrow.rotated {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: rgba(255, 255, 255, 0.95); /* White for light mode */
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 0.5rem 0;
    min-width: 160px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    z-index: 60;
    margin-top: 0.5rem;
    animation: dropdownSlide 0.2s ease;
  }
  
  :global(.dark) .dropdown-menu {
    background-color: rgba(0, 0, 0, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .dropdown-menu a {
    display: block;
    color: #374151; /* Dark gray for light mode */
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 1rem;
    margin: 0;
    transition: color 0.3s ease, background-color 0.3s ease;
  }
  
  :global(.dark) .dropdown-menu a {
    color: #cbd5e1;
  }

  .dropdown-about-btn {
    display: block;
    color: #374151; /* Dark gray for light mode */
    background: none;
    border: none;
    font-weight: 500;
    padding: 0.75rem 1rem;
    margin: 0;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: color 0.3s ease, background-color 0.3s ease;
    font-family: inherit;
    font-size: inherit;
  }
  
  :global(.dark) .dropdown-about-btn {
    color: #cbd5e1;
  }

  .dropdown-menu a:hover,
  .dropdown-about-btn:hover {
    color: #111827; /* Almost black for light mode */
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  :global(.dark) .dropdown-menu a:hover,
  :global(.dark) .dropdown-about-btn:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  @keyframes dropdownSlide {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
    background-color: #374151; /* Dark gray for light mode */
    border-radius: 1px;
    transition: all 0.3s ease;
    transform-origin: center;
  }
  
  :global(.dark) .hamburger span {
    background-color: white;
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
    background-color: rgba(255, 255, 255, 0.95); /* White for light mode */
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    min-width: 200px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease;
  }
  
  :global(.dark) .mobile-menu {
    background-color: rgba(0, 0, 0, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .mobile-menu a,
  .ask-ai-mobile,
  .mobile-about-btn {
    display: block;
    color: #374151; /* Dark gray for light mode */
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: color 0.3s ease;
  }
  
  :global(.dark) .mobile-menu a,
  :global(.dark) .ask-ai-mobile,
  :global(.dark) .mobile-about-btn {
    color: #cbd5e1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-about-btn {
    background: none;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-family: inherit;
    font-size: inherit;
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
    color: #374151 !important; /* Dark gray for light mode */
  }
  
  :global(.dark) .ask-ai-mobile {
    color: white !important;
  }

  .mobile-menu a:hover,
  .ask-ai-mobile:hover,
  .mobile-about-btn:hover {
    color: #111827; /* Almost black for light mode */
  }
  
  :global(.dark) .mobile-menu a:hover,
  :global(.dark) .ask-ai-mobile:hover,
  :global(.dark) .mobile-about-btn:hover {
    color: white;
  }

  /* Mobile Vision Section */
  .mobile-section {
    margin: 0.5rem 0;
  }

  .mobile-section-title {
    color: #6b7280; /* Gray for light mode */
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 0.5rem;
  }
  
  :global(.dark) .mobile-section-title {
    color: #94a3b8;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-section a {
    padding-left: 1rem;
    font-size: 0.9rem;
  }
  
  /* Special styling for Founder's Proof links */
  .founders-proof-link, .founders-proof-mobile {
    background: linear-gradient(45deg, var(--brand-cyan), var(--brand-orange-text));
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 700;
    text-decoration: none;
    color: white !important;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .founders-proof-link:hover, .founders-proof-mobile:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 145, 77, 0.4);
  }
  
  .founders-proof-link::before, .founders-proof-mobile::before {
    content: '🏆';
    margin-right: 0.5rem;
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
      gap: 1.5rem;
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
