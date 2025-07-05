<!-- src/components/icons/ZeroFraudIcon.svelte - Reusable Zero Fraud Icon -->
<script>
  export let size = '4rem'; // Default size, can be customized
  export let className = ''; // Additional classes
</script>

<div 
  class="zero-fraud-icon {className}" 
  style="width: {size}; height: {size};"
>
  <img 
    src="/zero-fraud-icon.svg" 
    alt="Zero Fraud - theBlockchain.ai" 
    class="zero-fraud-logo"
  />
</div>

<style>
  .zero-fraud-icon {
    /* Base circle styling - exactly from invest page */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Trust background - black circle with border */
    background: black;
    color: white;
    border: 2px solid black;
    
    /* Flex properties for centering */
    flex-shrink: 0;
    
    /* Transition for hover effects */
    transition: all 0.3s ease;
  }
  
  .zero-fraud-logo {
    /* Logo sizing - exactly from invest page */
    width: 85%;
    height: 85%;
    border-radius: 50%;
    
    /* Ensure crisp rendering */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
  
  /* Hover effect for interactive use */
  .zero-fraud-icon:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  /* Size variants */
  .zero-fraud-icon.small {
    width: 2rem;
    height: 2rem;
  }
  
  .zero-fraud-icon.medium {
    width: 3rem;
    height: 3rem;
  }
  
  .zero-fraud-icon.large {
    width: 5rem;
    height: 5rem;
  }
  
  .zero-fraud-icon.xl {
    width: 6rem;
    height: 6rem;
  }
</style>
