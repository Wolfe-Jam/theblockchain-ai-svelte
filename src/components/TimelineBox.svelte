<!-- TimelineBox.svelte - Investment Window Tracker -->
<script>
  export let marketOutlook = 'highly-likely';
  
  // Timeline data based on market outlook
  $: timelineData = marketOutlook === 'conservative' ? {
    cagr: '45%',
    totalMarket: '6.4',
    phases: [
      { year: 'NOW', label: '2025', advantage: 100, status: 'maximum', color: '#10b981', message: 'GET IN NOW!' },
      { year: '3', label: '2028', advantage: 65, status: 'good', color: '#f59e0b', message: 'Still Good' },
      { year: '6', label: '2031', advantage: 30, status: 'late', color: '#f97316', message: 'Late Entry' },
      { year: '9', label: '2034', advantage: 0, status: 'mature', color: '#ef4444', message: 'TOO LATE!' }
    ]
  } : {
    cagr: '90%',
    totalMarket: '11.43',
    phases: [
      { year: 'NOW', label: '2025', advantage: 100, status: 'maximum', color: '#10b981', message: 'GET IN NOW!' },
      { year: '3', label: '2028', advantage: 70, status: 'good', color: '#f59e0b', message: 'Still Strong' },
      { year: '6', label: '2031', advantage: 35, status: 'late', color: '#f97316', message: 'Late Entry' },
      { year: '9', label: '2034', advantage: 0, status: 'mature', color: '#ef4444', message: 'TOO LATE!' }
    ]
  };
  
  let hoveredPhase = null;
</script>

<div class="timeline-box">
  <!-- Header -->
  <div class="timeline-header">
    <h3 class="timeline-title">🚀 Market Explosion Timeline</h3>
    <div class="timeline-subtitle">Critical Investment Window Analysis</div>
  </div>
  
  <!-- Time Progression Bar -->
  <div class="time-progression">
    {#each timelineData.phases as phase, i}
      <div 
        class="time-phase"
        class:hovered={hoveredPhase === i}
        on:mouseenter={() => hoveredPhase = i}
        on:mouseleave={() => hoveredPhase = null}
        style="--phase-color: {phase.color}"
      >
        <!-- Year Label -->
        <div class="phase-year">{phase.year}</div>
        <div class="phase-label">{phase.label}</div>
        
        <!-- Connection Line -->
        {#if i < timelineData.phases.length - 1}
          <div class="connection-line"></div>
        {/if}
        
        <!-- Opportunity Indicator -->
        <div class="opportunity-bar">
          <div 
            class="opportunity-fill" 
            style="width: {phase.advantage}%; background: {phase.color}"
          ></div>
        </div>
        
        <!-- Status Message -->
        <div class="phase-message" style="color: {phase.color}">
          {phase.message}
        </div>
        
        <!-- Advantage Percentage -->
        <div class="advantage-text">
          {phase.advantage}% Advantage
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Supporting Stats -->
  <div class="timeline-stats">
    <div class="stat-item pulse">
      <span class="stat-icon">⚡</span>
      <span class="stat-text">CRITICAL WINDOW: GET IN!</span>
    </div>
    <div class="stat-item pulse">
      <span class="stat-icon">🔥</span>
      <span class="stat-text">Blockchain: {timelineData.cagr} CAGR</span>
    </div>
    <div class="stat-item pulse">
      <span class="stat-icon">💎</span>
      <span class="stat-text">Early Entry Advantage</span>
    </div>
  </div>
  
  <!-- Bottom CTA -->
  <div class="timeline-cta">
    <div class="urgency-text">
      Window closes as market matures → 
      <span class="total-opportunity">${timelineData.totalMarket}T opportunity</span>
    </div>
  </div>
</div>

<style>
  .timeline-box {
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(51, 65, 85, 0.5);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
  }
  
  .timeline-box:hover {
    border-color: rgba(255, 145, 77, 0.3);
    box-shadow: 0 8px 25px rgba(255, 145, 77, 0.15);
  }
  
  .timeline-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .timeline-title {
    color: var(--brand-cyan);
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }
  
  .timeline-subtitle {
    color: #94a3b8;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  /* Time Progression */
  .time-progression {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .time-phase {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .time-phase:hover {
    transform: translateY(-2px);
  }
  
  .phase-year {
    font-size: 1.8rem;
    font-weight: 900;
    font-family: 'Roboto Mono', monospace;
    color: var(--phase-color);
    margin-bottom: 0.25rem;
    text-shadow: 0 2px 8px rgba(255, 145, 77, 0.3);
  }
  
  .phase-label {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .connection-line {
    position: absolute;
    top: 1rem;
    left: 60%;
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, var(--phase-color), rgba(148, 163, 184, 0.3));
    opacity: 0.6;
  }
  
  /* Opportunity Bars */
  .opportunity-bar {
    width: 100%;
    height: 8px;
    background: rgba(51, 65, 85, 0.3);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  
  .opportunity-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 8px rgba(255, 145, 77, 0.4);
  }
  
  .phase-message {
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .advantage-text {
    font-size: 0.75rem;
    color: #cbd5e1;
    text-align: center;
  }
  
  /* Supporting Stats */
  .timeline-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 1.5rem;
    padding: 1rem 0;
    border-top: 1px solid rgba(51, 65, 85, 0.3);
    border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .stat-item.pulse {
    animation: pulse-glow 2s ease-in-out infinite alternate;
  }
  
  .stat-icon {
    font-size: 1.1rem;
  }
  
  .stat-text {
    font-size: 0.9rem;
    color: #e2e8f0;
    font-weight: 600;
  }
  
  /* Bottom CTA */
  .timeline-cta {
    text-align: center;
  }
  
  .urgency-text {
    font-size: 1rem;
    color: #94a3b8;
    font-weight: 500;
  }
  
  .total-opportunity {
    color: var(--brand-orange);
    font-weight: 700;
    font-size: 1.1rem;
  }
  
  /* Animations */
  @keyframes pulse-glow {
    0% { opacity: 0.8; }
    100% { opacity: 1; text-shadow: 0 0 8px rgba(255, 145, 77, 0.5); }
  }
  
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .time-progression {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    
    .timeline-stats {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    
    .phase-year {
      font-size: 1.5rem;
    }
    
    .connection-line {
      display: none;
    }
  }
</style>
