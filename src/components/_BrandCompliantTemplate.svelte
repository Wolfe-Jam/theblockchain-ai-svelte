<!-- 
  Brand Compliant Svelte Component Template
  Use this as a starting point for new components
-->
<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { spring, tweened } from 'svelte/motion';
  
  // Component props
  export let variant = 'primary'; // 'primary', 'secondary', 'accent'
  export let size = 'medium'; // 'small', 'medium', 'large'
  export let disabled = false;
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Animation stores (if needed)
  const scale = spring(1, { stiffness: 0.3, damping: 0.6 });
  const opacity = tweened(1, { duration: 200 });
  
  // Brand-compliant color mappings
  const variantStyles = {
    primary: {
      bg: 'bg-brand-cyan',
      text: 'text-white',
      border: 'border-brand-cyan',
      hover: 'hover:bg-brand-cyan/80'
    },
    secondary: {
      bg: 'bg-transparent',
      text: 'text-brand-cyan-text',
      border: 'border-brand-cyan',
      hover: 'hover:bg-brand-cyan/10'
    },
    accent: {
      bg: 'bg-brand-orange',
      text: 'text-white', 
      border: 'border-brand-orange',
      hover: 'hover:bg-brand-orange/80'
    }
  };
  
  // Size mappings
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  // Reactive styles
  $: componentStyles = variantStyles[variant];
  $: componentSize = sizeStyles[size];
  
  // Event handlers
  function handleClick(e) {
    if (disabled) return;
    
    // Visual feedback
    scale.set(0.95);
    setTimeout(() => scale.set(1), 100);
    
    dispatch('click', { event: e });
  }
  
  onMount(() => {
    // Component initialization
  });
</script>

<!-- 
  Component markup with brand-compliant classes
  Note: Using Tailwind classes for static styling
-->
<button
  class="
    {componentStyles.bg} 
    {componentStyles.text} 
    {componentStyles.border} 
    {componentStyles.hover}
    {componentSize}
    border rounded-lg font-semibold transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-brand-cyan/50
    disabled:opacity-50 disabled:cursor-not-allowed
  "
  class:opacity-50={disabled}
  style="transform: scale({$scale}); opacity: {$opacity};"
  {disabled}
  on:click={handleClick}
  on:mouseenter={() => !disabled && scale.set(1.02)}
  on:mouseleave={() => !disabled && scale.set(1)}
>
  <slot>Button Text</slot>
</button>

<style>
  /* 
    Component-specific styles using CSS custom properties
    Use this section for:
    - Complex animations requiring exact brand colors
    - Dynamic styling that can't be achieved with Tailwind
    - Custom graphics/illustrations
  */
  
  /* Example: Custom focus ring with brand colors */
  button:focus-visible {
    outline: 2px solid var(--brand-cyan);
    outline-offset: 2px;
  }
  
  /* Example: Custom gradient background for special variants */
  button.gradient-bg {
    background: linear-gradient(135deg, var(--brand-cyan), var(--brand-blue));
  }
  
  /* Example: Brand-compliant glow effect */
  button.glow {
    box-shadow: 
      0 0 20px rgba(12, 192, 223, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  /* 
    ❌ Avoid hardcoded colors that don't match brand palette
    ❌ Don't use: background: #2563EB; (use var(--brand-blue) instead)
    ❌ Don't use: color: #0891B2; (use var(--brand-cyan) instead)
  */
</style>
