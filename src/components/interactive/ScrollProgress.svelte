<!-- ScrollProgress.svelte - Reading progress indicator -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  export let showPercentage = false;
  export let height = '4px';
  
  const progress = tweened(0, {
    duration: 150,
    easing: cubicOut
  });
  
  let scrollY = 0;
  let windowHeight = 0;
  let documentHeight = 0;
  
  function updateProgress() {
    if (typeof window !== 'undefined') {
      scrollY = window.scrollY;
      windowHeight = window.innerHeight;
      documentHeight = document.documentElement.scrollHeight;
      
      const maxScroll = documentHeight - windowHeight;
      const currentProgress = (scrollY / maxScroll) * 100;
      progress.set(Math.min(currentProgress, 100));
    }
  }
  
  onMount(() => {
    updateProgress();
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
  });
  
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    }
  });
</script>

<div class="scroll-progress-container" style="height: {height}">
  <div 
    class="scroll-progress-bar" 
    style="width: {$progress}%"
  ></div>
  {#if showPercentage}
    <span class="scroll-progress-text">
      {Math.round($progress)}%
    </span>
  {/if}
</div>

<style>
  .scroll-progress-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(4px);
  }
  
  .scroll-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--brand-cyan), var(--brand-blue));
    transition: none;
    box-shadow: 0 0 10px rgba(12, 192, 223, 0.4);
  }
  
  .scroll-progress-text {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--brand-cyan-text);
  }
</style>
