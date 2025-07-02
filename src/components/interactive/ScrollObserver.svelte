<!-- ScrollObserver.svelte - Core scrollytelling observer component -->
<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  
  export let threshold = 0.5;
  export let rootMargin = '0px';
  export let once = false;
  
  let element;
  let observer;
  let isIntersecting = false;
  let hasIntersected = false;
  
  const dispatch = createEventDispatcher();
  
  function handleIntersection(entries) {
    entries.forEach(entry => {
      const wasIntersecting = isIntersecting;
      isIntersecting = entry.isIntersecting;
      
      if (isIntersecting && !hasIntersected) {
        hasIntersected = true;
      }
      
      // Dispatch events
      if (isIntersecting && !wasIntersecting) {
        dispatch('enter', { entry });
      } else if (!isIntersecting && wasIntersecting) {
        dispatch('leave', { entry });
      }
      
      dispatch('intersect', { 
        isIntersecting, 
        entry,
        ratio: entry.intersectionRatio 
      });
      
      // Disconnect if once is true and element has been seen
      if (once && isIntersecting) {
        observer.disconnect();
      }
    });
  }
  
  onMount(() => {
    observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });
    
    if (element) {
      observer.observe(element);
    }
  });
  
  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<div bind:this={element} class="scroll-observer">
  <slot {isIntersecting} {hasIntersected} />
</div>

<style>
  .scroll-observer {
    position: relative;
  }
</style>
