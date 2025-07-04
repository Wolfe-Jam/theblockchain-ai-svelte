# Svelte Brand Colors - Quick Reference

## 🎨 Brand Colors

### Graphics & Logos (Exact Hex)
```css
--brand-blue: #004AAE     /* Blockchain Blue - Trust/BAI */
--brand-cyan: #0CC0DF     /* Digital Turquoise - Users/CIA */
--brand-orange: #FF914D   /* Creative Orange - Developers/OUTPUT */
--brand-gold: #EEAD1A     /* Premium Gold - Premium Features/Benefits */
```

### Text Colors (Both Orange Colors Used for Text)
```css
--brand-blue-text: #2563EB    /* Blue-600 - For readable blue text */
--brand-cyan-text: #06B6D4    /* Cyan-500 - For readable cyan text */
--brand-orange-text: #EA580C  /* Orange-600 - Primary orange text (most common) */
--brand-orange: #FF914D       /* Creative Orange - Secondary orange text & graphics */
--brand-gold-text: #D4A017    /* Gold-text - For readable gold text */
```

**Note**: Both orange colors (#EA580C and #FF914D) are used for text, with the lighter #EA580C being the primary choice for readability.

## 🚀 Quick Patterns

### Tailwind Classes
```html
<!-- Graphics -->
<div class="bg-brand-blue border-brand-blue">BAI Pillar</div>
<div class="bg-brand-cyan border-brand-cyan">CIA Pillar</div>
<div class="bg-brand-orange border-brand-orange">OUTPUT Pillar</div>

<!-- Text (Primary Orange Text) -->
<h1 class="text-brand-blue-text">Blue Heading</h1>
<h2 class="text-brand-cyan-text">Cyan Heading</h2>
<p class="text-brand-orange-text">Orange Body Text (Primary)</p>

<!-- Text (Secondary Orange Text) -->
<h3 style="color: var(--brand-orange)">Orange Heading (Secondary)</h3>
```
<p class="text-brand-orange-text">Orange Body Text</p>
```

### CSS Variables
```css
/* Graphics */
.pillar-bai { background: var(--brand-blue); }
.pillar-cia { background: var(--brand-cyan); }
.pillar-output { background: var(--brand-orange); }

/* Text (Primary Orange - Most Common) */
.text-blue { color: var(--brand-blue-text); }
.text-cyan { color: var(--brand-cyan-text); }
.text-orange { color: var(--brand-orange-text); }

/* Text (Secondary Orange - For Emphasis) */
.text-orange-bold { color: var(--brand-orange); }
```

### Svelte Animations
```svelte
<script>
  const pillars = {
    bai: { 
      gradient: 'linear-gradient(to top, #004AAE, #2668C7)',
      shadow: 'rgba(0, 74, 174, 0.2)'
    },
    cia: { 
      gradient: 'linear-gradient(to top, #0CC0DF, #3DD5F3)',
      shadow: 'rgba(12, 192, 223, 0.2)'
    },
    output: { 
      gradient: 'linear-gradient(to top, #FF914D, #FFB366)',
      shadow: 'rgba(255, 145, 77, 0.2)'
    }
  };
</script>

<div style="background: {pillars.bai.gradient};">
  Animated Pillar
</div>
```

## ✅ Do's
- Use exact hex codes for graphics/logos  
- Use #EA580C for primary orange text (most readable and commonly used)
- Use #FF914D for secondary orange text (emphasis, headings, highlights)
- Follow CSS custom properties pattern
- Reference `_BrandCompliantTemplate.svelte`

## ❌ Don'ts
- Don't use `blue-600` for graphics
- Don't use `#004AAE` for small text (use #2563EB instead)
- Don't hardcode approximation colors
- Don't mix brand and non-brand colors

## 🧡 Orange Text Usage Guide

### Primary Orange Text (#EA580C) - Most Common
```html
<!-- ✅ Use for body text, labels, standard orange text -->
<p class="text-brand-orange-text">Standard orange text</p>
<label class="text-brand-orange-text">Form labels</label>
<span class="text-brand-orange-text">UI elements</span>
```

### Secondary Orange Text (#FF914D) - For Emphasis  
```html
<!-- ✅ Use for headings, emphasis, highlights -->
<h3 style="color: var(--brand-orange)">Bold orange headings</h3>
<span style="color: var(--brand-orange)">Emphasized text</span>
<button style="color: var(--brand-orange)">Highlighted buttons</button>
```

## 🔧 Commands
```bash
# Check brand compliance
npm run brand:check

# Build (includes brand check)
npm run build

# Development
npm run dev
```

## 📚 Full Documentation
- `docs/SVELTE-BRAND-COMPLIANCE.md` - Complete guide
- `docs/BRAND-COLOR-COMPLIANCE.md` - Project-wide standards
- `src/components/_BrandCompliantTemplate.svelte` - Component template

## 💙 Blue Text Usage Examples

### When to Use Blue Text Color (#2563EB):
```html
<!-- ✅ Headings and important text -->
<h1 class="text-brand-blue-text">Main Headings</h1>
<h2 class="text-brand-blue-text">Section Titles</h2>

<!-- ✅ Links and interactive text -->
<a href="#" class="text-brand-blue-text hover:text-brand-blue">Click here</a>

<!-- ✅ Emphasis text -->
<p class="text-slate-300">Regular text with <span class="text-brand-blue-text">blue emphasis</span></p>

<!-- ✅ CSS Variable approach -->
<style>
  .important-text {
    color: var(--brand-blue-text);
  }
</style>
```

### Complete Color System:
- **Graphics**: #004AAE, #0CC0DF, #FF914D (exact brand colors)
- **Text**: #2563EB, #06B6D4, #EA580C (readable variants)
- **Usage**: Graphics for visual identity, text for readability
