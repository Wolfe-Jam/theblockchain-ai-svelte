# SvelteKit Components Library

## 📁 Component Organization

### `/lib/components/` - Marketplace-Ready Components
Production-quality components built for distribution and reuse.

#### DataBox.svelte
**Purpose**: Flexible data visualization with perfect alignment
**Props**: 
- `title: string` - Box title
- `bars: Array<{label, value, color, unit}>` - Data array
- `totalLabel: string` - Total/average label
- `totalValue: string` - Calculated total
- `marketOutlook: string` - Theme toggle
- `maxBars: number` - Alignment control

**Usage**:
```svelte
<DataBox 
  title="Market Data"
  bars={dataArray}
  totalLabel="TOTAL"
  totalValue="$11.43T"
  marketOutlook="highly-likely"
  maxBars={4}
/>
```

#### TimelineBox.svelte
**Purpose**: Investment urgency visualization with timeline progression
**Props**:
- `marketOutlook: string` - Conservative vs Highly Likely mode

**Features**:
- NOW → 3 → 6 → 9 year progression
- Color-coded urgency (Green = GO, Red = TOO LATE)
- Responsive opportunity bars
- Dynamic stats integration

### `/components/` - Legacy Svelte Classic Components
Maintained for stability, feature-frozen for new development.

#### Core Components:
- `Header.svelte` - Site navigation with dropdowns
- `Footer.svelte` - Site footer
- `InvestorModal.svelte` - Investment forms
- `RegistrationModal.svelte` - PDF download forms
- Modal and utility components

## 🚀 Development Guidelines

### New Components:
- **Build in**: `/lib/components/` 
- **Standards**: TypeScript, JSDoc, prop validation
- **Quality**: Marketplace-ready with documentation

### Legacy Components:
- **Maintain**: Bug fixes and security updates only
- **No new features**: Use SvelteKit components instead
- **Migration**: Move to `/lib/` when major updates needed

## 📦 Import Patterns

### SvelteKit Components:
```svelte
import DataBox from '$lib/components/DataBox.svelte';
import TimelineBox from '$lib/components/TimelineBox.svelte';
```

### Legacy Components:
```svelte
import Header from '../components/Header.svelte';
import InvestorModal from '../components/InvestorModal.svelte';
```
