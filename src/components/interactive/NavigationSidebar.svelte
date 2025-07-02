<!-- NavigationSidebar.svelte - Document navigation -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  export let sections = [];
  export let currentSection = '';
  
  let activeIndex = 0;
  let sidebarElement;
  
  const indicatorPosition = tweened(0, {
    duration: 300,
    easing: cubicOut
  });
  
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function updateActiveSection() {
    const scrollY = window.scrollY + window.innerHeight / 2; // Center of viewport
    
    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (element) {
        const { top } = element.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        
        if (scrollY >= elementTop) {
          activeIndex = index;
          currentSection = section.id;
        }
      }
    });
    
    // Calculate evenly spaced indicator positions - mathematical approach
    const navItems = sidebarElement?.querySelectorAll('.nav-item');
    if (navItems && navItems.length >= 2) {
      const firstItem = navItems[0];
      const lastItem = navItems[navItems.length - 1];
      
      const firstRect = firstItem.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();
      const sidebarRect = sidebarElement.getBoundingClientRect();
      
      // Find centers of first and last items
      const firstCenter = (firstRect.top - sidebarRect.top) + (firstRect.height / 2);
      const lastCenter = (lastRect.top - sidebarRect.top) + (lastRect.height / 2);
      
      // Apply significant upward adjustment to raise all indicators
      const paddingAdjustment = 20; // Raise everything up by 20px
      
      // Calculate total distance and interval spacing
      const totalDistance = lastCenter - firstCenter;
      const intervalSpacing = totalDistance / (navItems.length - 1); // Divide by 6 for 7 items
      
      // Position indicator at the calculated interval for active item
      const targetPosition = (firstCenter + (activeIndex * intervalSpacing)) - 22 - paddingAdjustment;
      indicatorPosition.set(targetPosition);
    }
  }
  
  onMount(() => {
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
  });
  
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', updateActiveSection);
    }
  });
</script>

<nav bind:this={sidebarElement} class="navigation-sidebar">
  <div class="indicator" style="transform: translateY({$indicatorPosition}px)"></div>
  <ul class="nav-list">
    {#each sections as section, index}
      <li class="nav-item">
        <button
          class="nav-link"
          class:active={activeIndex === index}
          on:click={() => scrollToSection(section.id)}
          aria-label="Navigate to {section.title}"
        >
          <span class="nav-number">{String(index + 1).padStart(2, '0')}</span>
          <span class="nav-title">{section.title}</span>
        </button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .navigation-sidebar {
    position: fixed;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 40;
    width: 240px;
    background: rgba(15, 23, 42, 0.95);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
  
  .indicator {
    position: absolute;
    left: -1.5rem;
    width: 3px;
    height: 44px;
    background: var(--brand-cyan);
    border-radius: 0 3px 3px 0;
    transition: transform 0.3s ease;
  }
  
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-item {
    margin: 0;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    font-size: 0.875rem;
  }
  
  .nav-link:hover {
    color: var(--brand-cyan-text);
  }
  
  .nav-link.active {
    color: var(--color-text-light);
  }
  
  .nav-number {
    font-family: 'Roboto Mono', monospace;
    font-weight: 700;
    font-size: 0.75rem;
    opacity: 0.5;
  }
  
  .nav-link.active .nav-number {
    opacity: 1;
    color: var(--brand-cyan);
  }
  
  .nav-title {
    font-weight: 500;
  }
  
  /* Hide on mobile */
  @media (max-width: 1024px) {
    .navigation-sidebar {
      display: none;
    }
  }
</style>
