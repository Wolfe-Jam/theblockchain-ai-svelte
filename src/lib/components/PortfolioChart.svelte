<!-- Enhanced Portfolio Performance Chart Component -->
<script>
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  
  export let portfolioData;
  export let timeframe = '1M';
  
  let chartCanvas;
  let chart;
  
  // Register Chart.js components
  Chart.register(...registerables);
  
  // Generate sample performance data based on timeframe
  function generatePerformanceData(timeframe) {
    const periods = {
      '1D': { points: 24, label: 'Hour', baseValue: 347500 },
      '1W': { points: 7, label: 'Day', baseValue: 347500 },
      '1M': { points: 30, label: 'Day', baseValue: 347500 },
      '3M': { points: 90, label: 'Day', baseValue: 347500 },
      '6M': { points: 180, label: 'Day', baseValue: 347500 },
      '1Y': { points: 365, label: 'Day', baseValue: 347500 }
    };
    
    const config = periods[timeframe];
    const data = [];
    const labels = [];
    let currentValue = config.baseValue * 0.72; // Start lower to show growth
    
    for (let i = 0; i < config.points; i++) {
      // Simulate realistic growth with some volatility
      const growthFactor = 1 + (Math.random() * 0.02 - 0.01) + (0.0008); // Slight upward trend
      currentValue *= growthFactor;
      
      data.push(Math.round(currentValue));
      
      const date = new Date();
      date.setDate(date.getDate() - (config.points - i));
      labels.push(date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }));
    }
    
    return { data, labels };
  }
  
  onMount(() => {
    createChart();
    return () => {
      if (chart) chart.destroy();
    };
  });
  
  function createChart() {
    if (chart) chart.destroy();
    
    const { data, labels } = generatePerformanceData(timeframe);
    
    const ctx = chartCanvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Portfolio Value',
          data: data,
          borderColor: '#0cc0df', // Brand cyan
          backgroundColor: 'rgba(12, 192, 223, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#0cc0df',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#f8fafc',
            bodyColor: '#f8fafc',
            borderColor: '#334155',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `$${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(51, 65, 85, 0.3)',
              drawBorder: false
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(51, 65, 85, 0.3)',
              drawBorder: false
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12
              },
              callback: function(value) {
                return '$' + (value / 1000).toFixed(0) + 'K';
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }
  
  // Reactive update when timeframe changes
  $: if (chart && timeframe) {
    createChart();
  }
</script>

<div class="portfolio-chart-container">
  <canvas bind:this={chartCanvas}></canvas>
</div>

<style>
  .portfolio-chart-container {
    height: 300px;
    width: 100%;
    position: relative;
  }
</style>
