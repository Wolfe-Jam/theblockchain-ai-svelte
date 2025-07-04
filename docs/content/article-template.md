# Deep Dive Article Template

## Structure Template

### Hero Section
- **DEEP DIVE Label**: Category identification
- **Landscape Image**: Visual metaphor for the topic
- **Title**: Core concept (e.g., "The Convergent Economy")
- **Subtitle**: Specific focus area
- **Divider**: Visual separator

### Content Sections (7-section pattern)
1. **Executive Summary** - Key insights and market data
2. **Market Analysis** - Quantitative foundation  
3. **Core Concept** - Central thesis
4. **Technical Deep Dive** - Implementation details
5. **Framework/Model** - Unifying structure
6. **Evolution/Impact** - Future implications
7. **Strategic Outlook** - Actionable insights

### Interactive Components Pattern
```typescript
interface DeepDiveVisualizations {
  hero: "Metaphorical scene (e.g., Ocean of Open Source)";
  dataChart: "Market projections with controls";
  conceptDiagram: "Interactive model visualization";
  frameworkDemo: "Hands-on experience";
  strategyCards: "Actionable insights";
}
```

## Brand Integration
- **Color Assignment**: Map concepts to brand pillars
  - Blue: Trust/Infrastructure concepts
  - Cyan: Intelligence/AI concepts  
  - Orange: Output/Development concepts
- **Visual Hierarchy**: Consistent heading and spacing
- **Animation Standards**: 60fps, smooth transitions

## Content Guidelines

### Tone
- **Academic rigor** with **accessible language**
- **Data-driven** insights with **narrative flow**
- **Professional** but **engaging**

### Length
- **7,000+ words** for comprehensive coverage
- **Section balance** of 800-1,200 words each
- **Executive summary** of 200-300 words

### Data Integration
- **Market projections** with year toggles
- **Growth rates** prominently featured
- **Source attribution** for credibility

## Technical Implementation

### File Structure
```
/src/pages/deep-dive/
├── [TopicName]Page.svelte     # Main page component
└── components/
    ├── [Topic]Hero.svelte     # Hero visualization
    ├── [Topic]Chart.svelte    # Data visualization  
    ├── [Topic]Model.svelte    # Concept diagram
    └── [Topic]Strategy.svelte # Action framework
```

### Component Pattern
```svelte
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import ScrollObserver from '../../components/interactive/ScrollObserver.svelte';
  
  // Animation stores
  const animationValue = tweened(0, { duration: 1000 });
  
  // Section configuration
  const sections = [
    { id: 'executive-summary', title: 'Executive Summary' },
    // ... other sections
  ];
</script>
```

## LaTeX Template
Corresponding PDF structure:
- Professional typography
- Custom color scheme  
- TikZ visualizations
- Executive summary
- Appendices with data tables

## Distribution Strategy
1. **Web Experience**: Interactive storytelling
2. **PDF Download**: Executive distribution
3. **Social Sharing**: Key insights extraction
4. **Academic Submission**: Formatted papers

## Success Metrics
- **Engagement**: Scroll depth and time on page
- **Performance**: 60fps animations maintained
- **Accessibility**: Screen reader compatible
- **Brand Compliance**: Color system adherence

---

Use this template to maintain consistency across all deep-dive articles while allowing for topic-specific creativity and innovation.
