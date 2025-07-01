# Svelte Brand Color Compliance Guide

## Overview
This guide ensures consistent brand color usage across all Svelte components in the theBlockchain.ai application.

## Brand Color Implementation in Svelte

### CSS Custom Properties (Recommended)
Use CSS custom properties defined in `src/app.css`:

```svelte
<style>
  /* ✅ Correct - Graphics/Brand Elements */
  .pillar-output {
    background: var(--brand-orange);
    border-color: var(--brand-orange);
  }
  
  .pillar-cia {
    background: var(--brand-cyan);
    border-color: var(--brand-cyan);
  }
  
  .pillar-bai {
    background: var(--brand-blue);
    border-color: var(--brand-blue);
  }
  
  /* ✅ Correct - Text Elements */
  .text-primary {
    color: var(--brand-cyan-text);
  }
  
  .text-secondary {
    color: var(--brand-orange-text);
  }
</style>
```

### Tailwind Classes in Svelte
Use the configured Tailwind brand classes:

```svelte
<!-- ✅ Graphics/Brand Elements -->
<div class="bg-brand-orange border-brand-orange">
  OUTPUT Pillar
</div>

<div class="bg-brand-cyan border-brand-cyan">
  CIA Pillar  
</div>

<div class="bg-brand-blue border-brand-blue">
  BAI Pillar
</div>

<!-- ✅ Text Elements -->
<h1 class="text-brand-blue-text">Heading</h1>
<p class="text-brand-cyan-text">Body text</p>
```

### Inline Styles in Svelte (When Dynamic)
For animations and reactive styles:

```svelte
<script>
  import { spring } from 'svelte/motion';
  
  const pillarHeight = spring(0);
  
  // ✅ Brand compliant hex codes for graphics
  const brandColors = {
    output: '#FF914D',
    cia: '#0CC0DF', 
    bai: '#004AAE'
  };
</script>

<div 
  class="pillar"
  style="
    height: {$pillarHeight}px;
    background: linear-gradient(to top, {brandColors.output}, #FFB366);
  "
>
  OUTPUT
</div>
```

## Component-Specific Guidelines

### Interactive Components
For buttons, modals, and interactive elements:

```svelte
<!-- ✅ Primary Actions -->
<button class="bg-brand-cyan hover:bg-brand-cyan/80 text-white">
  Primary Action
</button>

<!-- ✅ Secondary Actions -->  
<button class="border-brand-orange text-brand-orange-text hover:bg-brand-orange/10">
  Secondary Action
</button>

<!-- ✅ Destructive Actions -->
<button class="border-red-500 text-red-400 hover:bg-red-500/10">
  Delete
</button>
```

### Animations & Motion
For Svelte animations using the motion stores:

```svelte
<script>
  import { spring, tweened } from 'svelte/motion';
  
  // Animation stores
  const outputGlow = spring(0);
  const ciaScale = spring(1);
  
  // Brand-compliant gradients for animations
  const pillars = {
    output: {
      gradient: 'linear-gradient(to top, #FF914D, #FFB366)',
      shadow: 'rgba(255, 145, 77, 0.2)'
    },
    cia: {
      gradient: 'linear-gradient(to top, #0CC0DF, #3DD5F3)',
      shadow: 'rgba(12, 192, 223, 0.2)'
    },
    bai: {
      gradient: 'linear-gradient(to top, #004AAE, #2668C7)',
      shadow: 'rgba(0, 74, 174, 0.2)'
    }
  };
</script>

<div 
  style="
    background: {pillars.output.gradient};
    box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 2px 4px {pillars.output.shadow};
    transform: scale({$ciaScale});
  "
>
  Animated Pillar
</div>
```

## Svelte-Specific Anti-Patterns

### ❌ What NOT to Do

```svelte
<!-- ❌ Wrong - Using Tailwind approximations for brand graphics -->
<div class="bg-blue-600">Brand Element</div>

<!-- ❌ Wrong - Hardcoded non-brand colors -->
<div style="background: #2563EB;">Logo</div>

<!-- ❌ Wrong - Using brand colors for small text (readability issue) -->
<small style="color: #004AAE;">Fine print</small>

<!-- ❌ Wrong - Inconsistent color variables -->
<style>
  .custom {
    color: #0891B2; /* Should use --brand-cyan */
  }
</style>
```

## Component Audit Checklist

### Before Committing Svelte Components:

- [ ] **Graphics use exact brand hex codes**: `#004AAE`, `#0CC0DF`, `#FF914D`
- [ ] **Text uses readable variants**: Tailwind text classes or CSS text variables
- [ ] **Animations use brand-compliant gradients**
- [ ] **Interactive states maintain brand consistency**
- [ ] **No hardcoded approximation colors** in brand elements

### Automated Checks
Add this to your component review process:

```bash
# Search for non-compliant colors in Svelte files
grep -r "blue-600\|cyan-600\|orange-600" src/components/
grep -r "#2563EB\|#0891B2\|#EA580C" src/components/ | grep -v "text\|readable"
```

## Common Svelte Color Patterns

### Modal Components
```svelte
<div class="modal-overlay bg-black/50">
  <div class="modal bg-slate-800 border border-brand-cyan/20">
    <h2 class="text-brand-cyan-text">Modal Title</h2>
    <p class="text-slate-300">Modal content</p>
    <button class="bg-brand-cyan hover:bg-brand-cyan/80">
      Confirm
    </button>
  </div>
</div>
```

### Card Components
```svelte
<div class="card bg-slate-800 border-l-4 border-brand-orange">
  <h3 class="text-brand-orange">Card Title</h3>
  <p class="text-slate-300">Card content</p>
</div>
```

### Navigation Components
```svelte
<nav class="bg-slate-900 border-b border-slate-700">
  <a href="/" class="text-brand-cyan-text hover:text-brand-cyan">
    Home
  </a>
  <a href="/about" class="text-slate-300 hover:text-brand-cyan-text">
    About
  </a>
</nav>
```

## Integration with Existing Components

### Updating Legacy Components
When updating existing components:

1. **Identify brand elements** vs text elements
2. **Replace hardcoded hex** with CSS variables or Tailwind classes
3. **Test readability** of text color changes
4. **Verify animation** color compliance

### Example Migration
```svelte
<!-- Before -->
<div style="background: #2563EB; color: #0891B2;">
  Old styling
</div>

<!-- After -->
<div class="bg-brand-blue text-brand-cyan-text">
  Brand compliant styling
</div>
```

## Performance Considerations

### CSS Custom Properties vs Tailwind
- **CSS Variables**: Better for dynamic/animated colors
- **Tailwind Classes**: Better for static styling and build optimization

### Recommended Pattern
```svelte
<script>
  // Use for animations and reactive styling
  const brandBlue = '#004AAE';
</script>

<!-- Use for static styling -->
<div class="bg-brand-cyan text-white">
  Static content
</div>

<!-- Use for dynamic styling -->
<div style="background: {isActive ? brandBlue : 'transparent'}">
  Dynamic content
</div>
```

## Developer Workflow

### Component Development Checklist
1. **Start with brand requirements**: What role does this component play?
2. **Choose appropriate color system**: Graphics vs text
3. **Use CSS variables or Tailwind**: Based on static vs dynamic needs
4. **Test across all states**: Hover, active, disabled
5. **Verify accessibility**: Color contrast for text elements
6. **Review in context**: How does it look with other components?

### Code Review Questions
- Are brand elements using exact hex codes?
- Is text using readable color variants?
- Do animations maintain brand consistency?
- Are there any hardcoded non-brand colors?

This ensures your Svelte components maintain perfect brand alignment while following best practices for maintainability and performance.
