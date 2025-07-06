<!-- DataBox.svelte - Reusable Box Component -->
<script>
  export let title = '';
  export let bars = []; // Array of bar data
  export let totalLabel = 'TOTAL';
  export let totalValue = '';
  export let marketOutlook = 'highly-likely';
  export let maxBars = 4; // Maximum bars for consistent sizing
  
  // Fill empty slots to maintain consistent height
  $: filledBars = [...bars];
  $: spacerCount = Math.max(0, maxBars - bars.length);
</script>

<div class="data-box">
  <!-- Title with consistent padding -->
  <div class="box-header">
    <h3 class="box-title">{title}</h3>
    <slot name="controls"></slot>
  </div>
  
  <!-- Data bars container -->
  <div class="bars-container">
    <!-- Actual data bars -->
    {#each filledBars as bar, i}
      <div class="data-bar">
        <div class="bar-label">{bar.label}</div>
        <div class="bar-track">
          <div 
            class="bar-fill"
            style="background: {bar.color}; width: {bar.unit === '%' ? Math.min(bar.value, 100) : (bar.value / Math.max(...bars.filter(b => b.value).map(b => b.value))) * 100}%"
          ></div>
        </div>
        <div class="bar-value">{bar.value}{bar.unit || ''}</div>
      </div>
      <div class="bar-padding"></div>
    {/each}
    
    <!-- Spacers to maintain consistent height -->
    {#each Array(spacerCount) as _, i}
      <div class="data-bar spacer-bar">
        <div class="bar-label spacer-label"></div>
        <div class="bar-track spacer-track"></div>
        <div class="bar-value spacer-value"></div>
      </div>
      <div class="bar-padding"></div>
    {/each}
    
    <!-- Separator line -->
    <div class="separator-line"></div>
    
    <!-- Total gradient bar -->
    <div class="data-bar total-bar">
      <div class="bar-label total-label">{totalLabel}</div>
      <div class="bar-track">
        <div 
          class="bar-fill total-gradient"
          class:conservative-gradient={marketOutlook === 'conservative'}
          class:highly-likely-gradient={marketOutlook === 'highly-likely'}
          style="width: 100%"
        ></div>
      </div>
      <div class="bar-value total-value">{totalValue}</div>
    </div>
  </div>
</div>

<style>
  .data-box {
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(51, 65, 85, 0.5);
    border-radius: 1rem;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
  }
  
  .data-box:hover {
    border-color: rgba(255, 145, 77, 0.3);
    box-shadow: 0 8px 25px rgba(255, 145, 77, 0.15);
  }
  
  .box-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Changed from center to handle different heights */
    margin-bottom: 1.5rem;
    min-height: 60px; /* Fixed height to align titles */
  }
  
  .box-title {
    color: var(--brand-cyan);
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.4;
    padding-top: 8px; /* Center title vertically in fixed header */
  }
  
  .bars-container {
    display: flex;
    flex-direction: column;
  }
  
  .data-bar {
    display: grid;
    grid-template-columns: 1fr 2fr auto;
    align-items: center;
    gap: 1rem;
    width: 100%;
    min-height: 32px; /* Fixed minimum height */
  }
  
  .bar-padding {
    height: 0.75rem; /* Reduced for tighter spacing */
  }
  
  .bar-label {
    font-size: 0.85rem;
    color: #cbd5e1;
    text-align: right;
    padding-right: 0.5rem;
    line-height: 1.2;
    min-height: 32px; /* Fixed height for labels */
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  .bar-track {
    height: 32px;
    background: rgba(51, 65, 85, 0.3);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }
  
  .bar-fill {
    height: 100%;
    border-radius: 16px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    min-width: 8px;
  }
  
  .bar-value {
    font-size: 1rem;
    color: #f8fafc;
    font-weight: 700;
    text-align: left;
    padding-left: 0.5rem;
  }
  
  /* Spacer styling */
  .spacer-bar {
    opacity: 0;
    pointer-events: none;
  }
  
  .spacer-bar .spacer-track {
    background: transparent;
  }
  
  .spacer-label,
  .spacer-value {
    color: transparent;
  }
  
  /* Separator line */
  .separator-line {
    height: 2px; /* More visible separator */
    background: linear-gradient(90deg, transparent, rgba(51, 65, 85, 0.8), transparent);
    margin: 1.5rem 0 1rem 0; /* More space above and below */
    border-radius: 1px;
  }
  
  /* Total bar styling */
  .total-bar {
    min-height: 40px; /* Slightly larger for emphasis */
    margin-top: 0.5rem; /* Consistent spacing after separator */
  }
  
  .total-bar .bar-label.total-label {
    color: var(--brand-orange);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    min-height: 40px; /* Match total bar height */
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  .total-bar .bar-value.total-value {
    color: var(--brand-orange);
    font-weight: 700;
    font-size: 1.1rem;
    min-height: 40px; /* Match total bar height */
    display: flex;
    align-items: center;
  }
  
  .total-bar .bar-track {
    height: 40px; /* Larger total bar */
  }
  
  /* Gradient styles */
  .total-gradient.conservative-gradient {
    background: linear-gradient(90deg, var(--brand-blue), var(--brand-orange)) !important;
  }
  
  .total-gradient.highly-likely-gradient {
    background: linear-gradient(90deg, var(--brand-blue), var(--brand-orange-text)) !important;
  }
</style>
