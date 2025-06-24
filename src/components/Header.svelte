<!-- src/components/Header.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let showHeader = false;
  
  onMount(() => {
    const handleMouseMove = (e) => {
      // Show header when mouse is in top 100px of screen
      showHeader = e.clientY <= 100;
    };
    
    const handleKeyDown = (e) => {
      // Show header on safe keyboard keys
      const safeKeys = [' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Escape'];
      if (safeKeys.includes(e.key)) {
        showHeader = true;
        // Hide after 3 seconds of no mouse movement in banner area
        setTimeout(() => {
          if (showHeader) {
            showHeader = false;
          }
        }, 3000);
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
    <nav class="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <a href="/" class="flex items-center font-['Roboto_Mono'] font-bold text-xl text-white">
            <img src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" alt="Logo" class="h-8 w-auto mr-3">
            <span>theBlockchain.ai</span>
        </a>
        <div class="flex space-x-8">
            <a href="/" class="text-slate-300 font-medium hover:text-white transition-colors duration-300">Home</a>
            <a href="/vision" class="text-slate-300 font-medium hover:text-white transition-colors duration-300">Vision</a>
            <a href="/report" class="text-slate-300 font-medium hover:text-white transition-colors duration-300">Deep Dive</a>
            <a href="/faqs" class="text-slate-300 font-medium hover:text-white transition-colors duration-300">FAQs</a>
            <a href="/invest" class="text-slate-300 font-medium hover:text-white transition-colors duration-300">Invest</a>
        </div>
    </nav>
</header>

<style lang="postcss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    transition: opacity 0.4s ease, background-color 0.4s ease, transform 0.4s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-100%);
  }
  
  .header.visible {
    opacity: 1;
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(51, 65, 85, 0.5);
    transform: translateY(0);
  }
</style>
