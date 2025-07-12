<script>
  import { theme } from '$lib/marketplace/stores/theme';
</script>

<!-- Floating theme toggle - bottom left corner -->
<button
  on:click={() => theme.toggle()}
  class="theme-toggle-floating"
  aria-label="Toggle theme"
  title={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
>
  <!-- Sun icon (light mode) -->
  <svg
    class="sun-icon"
    class:active={$theme === 'light'}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"></path>
  </svg>
  
  <!-- Moon icon (dark mode) -->
  <svg
    class="moon-icon"
    class:active={$theme === 'dark'}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
  </svg>
</button>

<style>
  .theme-toggle-floating {
    position: fixed;
    bottom: 1.5rem;
    left: 1.5rem;
    z-index: 40;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  :global(.dark) .theme-toggle-floating {
    background: rgba(30, 41, 59, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .theme-toggle-floating:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  :global(.dark) .theme-toggle-floating:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
  
  .theme-toggle-floating:active {
    transform: scale(0.95);
  }
  
  .sun-icon,
  .moon-icon {
    position: absolute;
    transition: all 0.3s ease;
  }
  
  .sun-icon {
    color: #f59e0b;
    opacity: 0;
    transform: rotate(-90deg) scale(0);
  }
  
  .sun-icon.active {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  
  .moon-icon {
    color: #60a5fa;
    opacity: 0;
    transform: rotate(90deg) scale(0);
  }
  
  .moon-icon.active {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  
  /* Responsive - slightly smaller on mobile */
  @media (max-width: 640px) {
    .theme-toggle-floating {
      width: 42px;
      height: 42px;
      bottom: 1rem;
      left: 1rem;
    }
    
    .sun-icon,
    .moon-icon {
      width: 20px;
      height: 20px;
    }
  }
</style>
