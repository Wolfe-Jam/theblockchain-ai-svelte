# theBlockchain.ai Brand Color Compliance Guide

## Official Brand Colors

### Primary Brand Palette
Use these **exact hex values** for all graphics, logos, and brand elements:

- **#004AAE** - Blockchain Blue (Trust/BAI elements)
- **#0CC0DF** - Digital Turquoise (Users/CIA elements)  
- **#FF914D** - Creative Orange (Developers/OUTPUT elements)

### Text-Readable Variants
Use these Tailwind variants for **text readability** (not graphics):

- **#2563EB** - Blue-600 (readable blue text)
- **#06B6D4** - Cyan-500 (readable cyan text)
- **#EA580C** - Orange-600 (readable orange text)

## Implementation Guidelines

### 🎨 Graphics & Brand Elements
**Always use exact brand hex codes:**
```css
/* ✅ Correct for graphics */
background: #004AAE;
fill: #0CC0DF;
border-color: #FF914D;
```

### 📝 Text Elements  
**Use Tailwind text variants for readability:**
```html
<!-- ✅ Correct for text -->
<h1 class="text-brand-blue-text">Heading</h1>
<p class="text-brand-cyan-text">Body text</p>
```

### 🚫 What NOT to Do
```css
/* ❌ Wrong - using Tailwind approximations for graphics */
.pillar { background: theme('colors.blue.600'); }

/* ❌ Wrong - using brand colors for small text */
.small-text { color: #004AAE; } /* Too dark for readability */
```

## Project Configuration

### Tailwind Config
Brand colors are defined in `tailwind.config.js`:

```javascript
colors: {
  // Graphics & Brand Elements
  'brand-blue': '#004AAE',
  'brand-cyan': '#0CC0DF', 
  'brand-orange': '#FF914D',
  
  // Text Variants
  'brand-blue-text': '#2563EB',
  'brand-cyan-text': '#06B6D4',
  'brand-orange-text': '#EA580C',
}
```

### SVG Assets
All SVG files in `/public` use exact brand colors:
- `three-pillars-graphic.svg` ✅ Updated to brand compliance

## Usage Examples

### Domain Model Approach
Think of it as **two color systems working together**:

1. **Brand Identity System**: Exact hex codes for visual recognition
2. **Readability System**: Tailwind variants for optimal text contrast

### When to Use Which

| Element Type | Color System | Example |
|--------------|-------------|---------|
| Logo/Graphics | Brand Identity | `#004AAE` |
| Pillar animations | Brand Identity | `#FF914D` |
| Buttons/CTAs | Brand Identity | `#0CC0DF` |
| Body text | Readability | `text-brand-blue-text` |
| Small text | Readability | `text-slate-600` |

## Quality Assurance

### Before Deployment Checklist
- [ ] All graphics use exact brand hex codes
- [ ] Text uses readable variants
- [ ] SVG assets match brand colors
- [ ] Animation colors are brand compliant
- [ ] No Tailwind approximations in brand elements

### Tools for Verification
```bash
# Search for non-compliant colors in graphics
grep -r "blue-600\|cyan-600\|orange-600" src/components/
grep -r "#2563EB\|#0891B2\|#EA580C" public/
```

## Analogy
Think of brand colors like a **dress code at a formal event**:
- **Graphics/Logos**: Must wear the exact uniform (brand hex codes)
- **Text Content**: Can wear business appropriate variants (readable colors)

Both serve the brand, but each has its proper context and requirements.
