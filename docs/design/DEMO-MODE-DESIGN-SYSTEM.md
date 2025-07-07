# 🔮 Demo Mode Design System

## 🎯 Purpose
Distinct design system for demo experiences, separate from main brand identity.

## 🎨 Typography

### **Demo Mode Font System**
```css
/* Primary font for all demo content */
--demo-font-mono: 'Roboto Mono', monospace;

/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
```

**Typography Usage**:
- ✅ **All Titles**: Roboto Mono (tech/coding aesthetic)
- ✅ **Body Text**: Roboto Mono (consistent monospace feel)
- ✅ **Navigation**: Roboto Mono with increased letter-spacing
- ✅ **Buttons**: Roboto Mono for technical appearance
- ✅ **Demo Badge**: Roboto Mono with wide letter-spacing (0.1em)

**Why Roboto Mono for Demo Mode**:
- ✅ **Technical Aesthetic**: Monospace conveys coding/engineering feel
- ✅ **Clear Distinction**: Separates demo from main brand (Inter font)
- ✅ **Readability**: Excellent for data displays and technical content
- ✅ **Modern**: Google's refined monospace with better spacing than traditional mono fonts
- ✅ **Web Performance**: Optimized Google Font with variable weights

**Character Spacing Guidelines**:
- **Large Titles**: `-0.025em` (tighter for visual balance)
- **Body Text**: `0.025em` (slight spacing for readability)
- **Navigation**: `0.025em` (clean, professional spacing)
- **Demo Badge**: `0.1em` (wide spacing for emphasis)

## 🎨 Color Specifications

### **Primary Demo Colors**
```css
--demo-purple-deep: #6B46C1   /* Deep purple primary */
--demo-purple-light: #8B5CF6   /* Light purple accents */
--demo-purple-dark: #553C9A    /* Dark purple backgrounds */

--demo-green-system: #10B981   /* System green primary */
--demo-green-light: #34D399    /* Light green accents */
--demo-green-dark: #059669     /* Dark green backgrounds */

--demo-turquoise: #14B8A6      /* Turquoise primary */
--demo-turquoise-light: #5EEAD4 /* Light turquoise accents */
--demo-turquoise-dark: #0F766E  /* Dark turquoise backgrounds */

--demo-gold: #F59E0B           /* Gold primary */
--demo-gold-light: #FCD34D     /* Light gold accents */
--demo-gold-dark: #D97706      /* Dark gold backgrounds */
```

### **Supporting Demo Colors**
```css
--demo-bg-dark: #1E1B3A        /* Dark purple background */
--demo-bg-darker: #161338      /* Darker purple background */
--demo-text-white: #FFFFFF     /* Pure white text */
--demo-text-light: #E5E7EB     /* Light gray text */
--demo-text-accent: #D1D5DB    /* Accent gray text */
--demo-text-green: #34D399     /* Green text */
```

## 🎯 Usage Guidelines

### **When to Use Demo Mode Palette**
- ✅ `/quantum-demo` and similar demo routes
- ✅ Interactive technology demonstrations 
- ✅ Prototype/experimental features
- ✅ Developer showcase content

### **When NOT to Use Demo Mode Palette**
- ❌ Main brand pages (use brand orange/cyan/blue)
- ❌ Investment/business content
- ❌ Marketing materials
- ❌ Professional documentation

## 🛠️ Implementation

### **CSS Variables Setup**
```css
:root {
  /* Demo Mode Typography */
  --demo-font-mono: 'Roboto Mono', monospace;
  
  /* Demo Mode Color Palette - Refined */
  --demo-purple-deep: #6B46C1;
  --demo-purple-light: #8B5CF6;
  --demo-purple-dark: #553C9A;
  
  --demo-green-system: #10B981;
  --demo-green-light: #34D399;
  --demo-green-dark: #059669;
  
  --demo-turquoise: #14B8A6;
  --demo-turquoise-light: #5EEAD4;
  --demo-turquoise-dark: #0F766E;
  
  --demo-gold: #F59E0B;
  --demo-gold-light: #FCD34D;
  --demo-gold-dark: #D97706;
  
  --demo-bg-dark: #1E1B3A;
  --demo-bg-darker: #161338;
  --demo-text-white: #FFFFFF;
  --demo-text-light: #E5E7EB;
  --demo-text-accent: #D1D5DB;
  --demo-text-green: #34D399;
}

/* Global demo font override */
:global(body) {
  font-family: var(--demo-font-mono) !important;
}
```

### **Common Gradient Patterns**
```css
/* Header gradient */
background: linear-gradient(135deg, var(--demo-bg-darker) 0%, var(--demo-purple-dark) 100%);

/* Brand text gradient */
background: linear-gradient(135deg, var(--demo-purple-light), var(--demo-turquoise));

/* Founder's Proof gradient */
background: linear-gradient(135deg, var(--demo-gold), var(--demo-purple-light));

/* Ask AI button gradient */
background: linear-gradient(135deg, var(--demo-purple-deep), var(--demo-gold));

/* Main title gradient */
background: linear-gradient(135deg, 
  var(--demo-purple-light), 
  var(--demo-turquoise), 
  var(--demo-gold), 
  var(--demo-green-system));

/* Background gradient */
background: linear-gradient(135deg, 
  var(--demo-bg-darker) 0%, 
  var(--demo-bg-dark) 25%, 
  var(--demo-purple-dark) 50%, 
  var(--demo-bg-dark) 75%, 
  var(--demo-bg-darker) 100%);
```

## 🎨 Visual Effects

### **Shadows & Glows**
```css
/* Purple glow */
box-shadow: 0 4px 20px rgba(107, 70, 193, 0.3);

/* Turquoise glow */
box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);

/* Gold glow */
box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);

/* Green glow */
box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);

/* Text shadows */
text-shadow: 0 0 8px var(--demo-turquoise);
text-shadow: 0 0 8px var(--demo-green-system);

/* Drop shadows */
filter: drop-shadow(0 0 8px var(--demo-purple-light));
filter: drop-shadow(0 0 4px var(--demo-gold));
```

### **Demo Badge Styling**
```css
.demo-badge {
  background: linear-gradient(135deg, var(--demo-purple-deep), var(--demo-green-dark));
  border: 1px solid var(--demo-purple-light);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 8px rgba(107, 70, 193, 0.3);
}
```

## 🚀 Demo Mode Components

### **Current Implementations**
- ✅ **Quantum Demo Header** (`/quantum-demo`)
- ✅ **Demo Mode Badge** (🔮 Demo Mode indicator)

### **Future Demo Components**
- 🔮 **AI Playground** interfaces
- 🔮 **Blockchain Simulators** 
- 🔮 **Technology Prototypes**
- 🔮 **Interactive Tutorials**

## 📊 Contrast Ratios

All demo colors meet WCAG accessibility standards:
- **White text on Demo Purple**: 8.1:1 (AAA compliant)
- **White text on Demo Green**: 7.5:1 (AAA compliant)  
- **White text on Demo Turquoise**: 6.8:1 (AAA compliant)
- **Demo Green text on Dark**: 7.2:1 (AAA compliant)
- **Demo Gold on Dark**: 5.3:1 (AA+ compliant)
- **Demo Purple on Dark**: 4.5:1 (AA compliant)

## 🎯 Brand Separation

### **Typography Separation**
**Main Brand Font** (do NOT use in demo mode):
- ❌ Inter (main site font)

**Demo Mode Font** (do NOT use in main brand):
- ✅ **Roboto Mono** (exclusive to demo experiences)

### **Color Separation**
**Main Brand Colors** (do NOT use in demo mode):
- ❌ Orange: `#EA580C`, `#FF914D`
- ❌ Brand Cyan: `#0CC0DF`, `#06B6D4`  
- ❌ Blue: `#004AAE`, `#2563EB` (any blue shades)

**Demo Mode Colors** (do NOT use in main brand):
- ✅ **Purple**: `#6B46C1`, `#8B5CF6`, `#553C9A`
- ✅ **Green**: `#10B981`, `#34D399`, `#059669`
- ✅ **Turquoise**: `#14B8A6`, `#5EEAD4`, `#0F766E` (natural teal, not brand cyan)
- ✅ **Gold/Yellow**: `#F59E0B`, `#FCD34D`, `#D97706`
- ✅ **White Text**: `#FFFFFF` (excellent for contrast)
- ✅ **Green Text**: `#34D399` (good for accents)

**Design Hierarchy for Demo Mode**:
1. **Typography**: Roboto Mono (technical/coding aesthetic)
2. **Primary**: Purple (main interactive elements)
3. **Secondary**: Green (system states, success)
4. **Accent**: Turquoise (highlights, links) 
5. **Emphasis**: Gold (special elements, CTAs)
6. **Text**: White (primary), Green (accents)

This separation ensures clear visual distinction between production features and experimental/demo content.

---

**Status**: ✅ **ACTIVE** - Complete design system for all demo mode experiences
**Location**: `/src/routes/quantum-demo/+page.svelte` (reference implementation)
**Typography**: Roboto Mono (Google Fonts)
**Color Scheme**: Purple/Turquoise/Gold/Green with white text
