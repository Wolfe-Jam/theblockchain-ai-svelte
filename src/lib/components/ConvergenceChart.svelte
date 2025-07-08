<!-- Convergence Market Chart - Three Pillars Visualization -->
<script>
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  
  export let marketData;
  export let selectedYear = 2025;
  
  let chartCanvas;
  let chart;
  
  Chart.register(...registerables);
  
  // Full market progression data (trillions) - matches main invest page
  const yearlyData = {
    2025: { total: 2.52, ai: 1.80, blockchain: 0.12, software: 0.60 },
    2026: { total: 3.25, ai: 2.20, blockchain: 0.30, software: 0.75 },
    2027: { total: 4.12, ai: 2.65, blockchain: 0.52, software: 0.95 },
    2028: { total: 4.85, ai: 2.85, blockchain: 0.75, software: 1.25 },
    2029: { total: 5.68, ai: 3.15, blockchain: 1.08, software: 1.45 },
    2030: { total: 6.15, ai: 3.25, blockchain: 1.43, software: 1.47 },
    2031: { total: 7.23, ai: 3.45, blockchain: 1.98, software: 1.80 },
    2032: { total: 8.41, ai: 3.55, blockchain: 2.86, software: 2.00 },
    2033: { total: 9.87, ai: 3.62, blockchain: 4.15, software: 2.10 },
    2034: { total: 11.43, ai: 3.68, blockchain: 5.85, software: 1.90 }
  };
  
  onMount(() => {
    createChart();
    return () => {
      if (chart) chart.destroy();
    };
  });
  
  function createChart() {
    if (chart) chart.destroy();
    
    const data = yearlyData[selectedYear];
    
    const ctx = chartCanvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['AI Intelligence', 'Blockchain Trust', 'Software Output'],
        datasets: [{
          data: [data.ai, data.blockchain, data.software],
          backgroundColor: [
            '#0cc0df', // Brand cyan for AI
            '#004aae', // Brand blue for Blockchain (Blockchain Blue!)
            '#ff914d'  // Brand orange for Software/Dev
          ],
          borderColor: [
            '#0cc0df',
            '#004aae', 
            '#ff914d'
          ],
          borderWidth: 3,
          hoverBorderWidth: 4,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f8fafc',
              font: {
                size: 14,
                weight: '600'
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#f8fafc',
            bodyColor: '#f8fafc',
            borderColor: '#334155',
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: $${value.toFixed(2)}T (${percentage}%)`;
              }
            }
          }
        },
        onHover: (event, activeElements) => {
          event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
        }
      }
    });
  }
  
  // Reactive update when selectedYear changes
  $: if (chart && selectedYear) {
    createChart();
  }
  
  function calculateCAGR() {
    const current = yearlyData[2025];
    const projected = yearlyData[selectedYear];
    const years = selectedYear - 2025;
    
    if (years === 0) return 0;
    
    const currentTotal = current.ai + current.blockchain + current.software;
    const projectedTotal = projected.ai + projected.blockchain + projected.software;
    
    return (Math.pow(projectedTotal / currentTotal, 1 / years) - 1) * 100;
  }
  
  function changeYear(year) {
    selectedYear = year;
  }
</script>

<div class="convergence-chart-container">
  <div class="chart-header">
    <div class="chart-title">
      <h3>Market Convergence</h3>
      <span class="chart-year">{selectedYear} Projection</span>
    </div>
    
    <div class="chart-controls">
      <button 
        class="toggle-btn"
        class:active={selectedYear === 2025}
        on:click={() => changeYear(2025)}
      >
        2025
      </button>
      <button 
        class="toggle-btn"
        class:active={selectedYear === 2030}
        on:click={() => changeYear(2030)}
      >
        2030
      </button>
      <button 
        class="toggle-btn"
        class:active={selectedYear === 2034}
        on:click={() => changeYear(2034)}
      >
        2034
      </button>
    </div>
  </div>
  
  <div class="chart-wrapper">
    <canvas bind:this={chartCanvas}></canvas>
    
    <!-- Center text showing total market -->
    <div class="center-text">
      <div class="total-value">
        ${yearlyData[selectedYear].total.toFixed(2)}T
      </div>
      <div class="total-label">Total Market</div>
      {#if selectedYear > 2025}
        <div class="cagr-display">
          {calculateCAGR().toFixed(1)}% CAGR
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .convergence-chart-container {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .chart-title h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
  }
  
  .chart-year {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .chart-controls {
    display: flex;
    background: var(--dashboard-bg);
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: 1px solid var(--border-color);
    gap: 0.25rem;
  }
  
  .toggle-btn {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    color: var(--text-secondary);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.875rem;
  }
  
  .toggle-btn.active {
    background: var(--brand-orange);
    color: white;
  }
  
  .toggle-btn:hover:not(.active) {
    background: var(--border-color);
    color: var(--text-primary);
  }
  
  .chart-wrapper {
    height: 350px;
    position: relative;
  }
  
  .center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
  }
  
  .total-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: 'Roboto Mono', monospace;
    margin-bottom: 0.25rem;
  }
  
  .total-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  .cagr-display {
    font-size: 1rem;
    color: var(--success);
    font-weight: 600;
    margin-top: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .chart-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
    
    .chart-controls {
      width: 100%;
    }
    
    .total-value {
      font-size: 1.5rem;
    }
  }
</style>
