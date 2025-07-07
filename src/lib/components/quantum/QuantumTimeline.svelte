<!-- QuantumTimeline.svelte - Revolutionary Investment Timeline -->
<script>
  import { onMount } from 'svelte';
  import { writable, derived } from 'svelte/store';
  import { spring, tweened } from 'svelte/motion';
  import { cubicOut, elasticOut } from 'svelte/easing';
  
  // Quantum state management
  const quantumState = writable({
    superposition: true,
    scenarios: ['conservative', 'moderate', 'aggressive'],
    collapsed: null,
    coherenceLevel: 1.0,
    observationTimestamp: null
  });
  
  // User behavioral analysis
  const userBehavior = writable({
    riskTolerance: 0.6,
    timeHorizon: 'medium',
    interactionPattern: 'explorer',
    emotionalState: 'optimistic',
    mousePosition: { x: 0, y: 0 },
    interactionHistory: [],
    movementTrail: []
  });

  // UI state management
  const uiState = writable({
    showDebug: false,
    zoomedYear: null,
    showMovementViz: false
  });
  
  // Physics-based motion systems
  const probabilityField = spring({ x: 0, y: 0, intensity: 0 }, {
    stiffness: 0.1,
    damping: 0.8
  });
  
  const timelinePhysics = spring({ scale: 1, rotation: 0, distortion: 0 }, {
    stiffness: 0.2,
    damping: 0.9
  });
  
  // AI-driven scenario adaptation
  const adaptiveScenarios = derived([userBehavior, quantumState], 
    ([behavior, quantum]) => {
      // Always generate scenarios for both superposition and collapsed states
      const riskWeight = behavior.riskTolerance;
      const scenarios = {
        moderate: {
          probability: 1.0,
          color: { hue: 45, saturation: 70, lightness: 55 },
          phases: generateModeratePhases()
        },
        conservative: {
          probability: Math.max(0.4, (1 - riskWeight) * 1.2) + 0.3,
          color: { hue: 120, saturation: 60, lightness: 50 },
          phases: generateConservativePhases()
        },
        aggressive: {
          probability: Math.max(0.4, riskWeight * 1.2) + 0.3,
          color: { hue: 280, saturation: 80, lightness: 60 },
          phases: generateAggressivePhases()
        }
      };
      
      return scenarios;
    }
  );
  
  // Generate scenario phases based on market outlook
  function generateConservativePhases() {
    return [
      { year: 2025, market: 2.1, opportunity: 100, urgency: 'maximum', emotion: 'secure' },
      { year: 2028, market: 3.8, opportunity: 75, urgency: 'good', emotion: 'steady' },
      { year: 2031, market: 6.4, opportunity: 45, urgency: 'moderate', emotion: 'cautious' },
      { year: 2034, market: 9.2, opportunity: 20, urgency: 'late', emotion: 'concerned' }
    ];
  }
  
  function generateModeratePhases() {
    return [
      { year: 2025, market: 2.8, opportunity: 100, urgency: 'critical', emotion: 'excited' },
      { year: 2028, market: 6.2, opportunity: 80, urgency: 'strong', emotion: 'confident' },
      { year: 2031, market: 11.4, opportunity: 55, urgency: 'moderate', emotion: 'strategic' },
      { year: 2034, market: 18.7, opportunity: 25, urgency: 'late', emotion: 'regretful' }
    ];
  }
  
  function generateAggressivePhases() {
    return [
      { year: 2025, market: 4.1, opportunity: 100, urgency: 'explosive', emotion: 'euphoric' },
      { year: 2028, market: 12.3, opportunity: 85, urgency: 'massive', emotion: 'ambitious' },
      { year: 2031, market: 28.9, opportunity: 60, urgency: 'substantial', emotion: 'aggressive' },
      { year: 2034, market: 67.2, opportunity: 30, urgency: 'remaining', emotion: 'desperate' }
    ];
  }
  
  // Quantum observation - collapse superposition
  function observeScenario(scenario) {
    quantumState.update(state => ({
      ...state,
      superposition: false,
      collapsed: scenario,
      observationTimestamp: Date.now()
    }));
    
    // Physics reaction to observation
    timelinePhysics.set({ scale: 1.1, rotation: 5, distortion: 0.2 });
    setTimeout(() => {
      timelinePhysics.set({ scale: 1, rotation: 0, distortion: 0 });
    }, 1000);
  }
  
  // Reset to quantum superposition
  function resetQuantumState() {
    quantumState.update(state => ({
      ...state,
      superposition: true,
      collapsed: null,
      coherenceLevel: 1.0
    }));
  }
  
  // Mouse interaction for probability field
  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    probabilityField.set({ x, y, intensity: 1 });
    
    userBehavior.update(behavior => {
      const newInteraction = { x, y, timestamp: Date.now() };
      const updatedHistory = [...behavior.interactionHistory.slice(-10), newInteraction];
      const updatedTrail = [...behavior.movementTrail.slice(-20), { x, y }];
      
      return {
        ...behavior,
        mousePosition: { x, y },
        interactionHistory: updatedHistory,
        movementTrail: updatedTrail
      };
    });
  }
  
  // Behavioral AI analysis
  function analyzeBehavior(interactions) {
    // Analyze mouse movement patterns for risk tolerance
    const movements = interactions.slice(-5);
    const volatility = calculateMovementVolatility(movements);
    const speed = calculateAverageSpeed(movements);
    const pattern = determineInteractionPattern(movements);
    
    return {
      riskTolerance: Math.min(1, volatility * 2),
      interactionPattern: pattern,
      confidence: speed > 0.5 ? 'high' : 'cautious'
    };
  }
  
  function calculateMovementVolatility(movements) {
    if (movements.length < 2) return 0.5;
    
    let totalDistance = 0;
    for (let i = 1; i < movements.length; i++) {
      const dx = movements[i].x - movements[i-1].x;
      const dy = movements[i].y - movements[i-1].y;
      totalDistance += Math.sqrt(dx * dx + dy * dy);
    }
    
    return Math.min(1, totalDistance * 5);
  }
  
  function calculateAverageSpeed(movements) {
    if (movements.length < 2) return 0;
    
    let totalSpeed = 0;
    for (let i = 1; i < movements.length; i++) {
      const dx = movements[i].x - movements[i-1].x;
      const dy = movements[i].y - movements[i-1].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const time = movements[i].timestamp - movements[i-1].timestamp;
      totalSpeed += distance / Math.max(time, 1);
    }
    
    return totalSpeed / (movements.length - 1) * 1000; // Scale to reasonable range
  }
  
  function determineInteractionPattern(movements) {
    // Simple pattern recognition
    const volatility = calculateMovementVolatility(movements);
    const speed = calculateAverageSpeed(movements);
    
    if (volatility > 0.7 && speed > 0.5) return 'aggressive';
    if (volatility < 0.3 && speed < 0.2) return 'conservative';
    return 'moderate';
  }
  
  // Continuous behavioral analysis
  onMount(() => {
    const behaviorTimer = setInterval(() => {
      userBehavior.update(behavior => {
        const analysis = analyzeBehavior(behavior.interactionHistory);
        return {
          ...behavior,
          riskTolerance: analysis.riskTolerance,
          interactionPattern: analysis.interactionPattern
        };
      });
    }, 2000);
    
    return () => clearInterval(behaviorTimer);
  });

  // Deep dive functionality
  function zoomToYear(year, scenario) {
    uiState.update(state => ({
      ...state,
      zoomedYear: { year, scenario }
    }));
  }

  function exitZoom() {
    uiState.update(state => ({
      ...state,
      zoomedYear: null
    }));
  }

  // Generate quarterly data for zoomed year
  function generateQuarterlyData(year, scenario) {
    const baseData = $adaptiveScenarios[scenario]?.phases.find(p => p.year === year);
    if (!baseData) return [];

    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const marketGrowthPerQuarter = baseData.market / 4;
    
    return quarters.map((quarter, index) => ({
      quarter,
      month: `${year}-${(index * 3 + 1).toString().padStart(2, '0')}`,
      market: (index + 1) * marketGrowthPerQuarter,
      opportunity: Math.max(baseData.opportunity - (index * 5), 0),
      events: generateQuarterlyEvents(quarter, scenario),
      sentiment: calculateQuarterlySentiment(index, scenario)
    }));
  }

  function generateQuarterlyEvents(quarter, scenario) {
    const events = {
      conservative: {
        Q1: ['Regulatory clarity', 'Enterprise adoption'],
        Q2: ['Partnership announcements', 'Security enhancements'],
        Q3: ['Market validation', 'Compliance milestones'],
        Q4: ['Year-end reporting', 'Future planning']
      },
      moderate: {
        Q1: ['Market expansion', 'Technology upgrades'],
        Q2: ['Strategic partnerships', 'User growth'],
        Q3: ['Product launches', 'Market penetration'],
        Q4: ['Platform scaling', 'Revenue milestones']
      },
      aggressive: {
        Q1: ['Explosive growth', 'Breakthrough technology'],
        Q2: ['Market disruption', 'Viral adoption'],
        Q3: ['Ecosystem expansion', 'Mass adoption'],
        Q4: ['Market dominance', 'Exponential scaling']
      }
    };
    
    return events[scenario]?.[quarter] || ['Market evolution', 'Technology advancement'];
  }

  function calculateQuarterlySentiment(quarterIndex, scenario) {
    const sentiments = {
      conservative: ['cautious', 'steady', 'confident', 'secure'],
      moderate: ['optimistic', 'strategic', 'focused', 'ambitious'],
      aggressive: ['explosive', 'euphoric', 'aggressive', 'dominant']
    };
    
    return sentiments[scenario]?.[quarterIndex] || 'positive';
  }

  // Debug panel toggle
  function toggleDebug() {
    uiState.update(state => ({
      ...state,
      showDebug: !state.showDebug
    }));
  }

  function toggleMovementViz() {
    uiState.update(state => ({
      ...state,
      showMovementViz: !state.showMovementViz
    }));
  }
</script>

<div class="quantum-timeline-container" role="application" aria-label="Quantum Investment Timeline Interactive Interface">
  <div class="quantum-header">
    <h2>🔮 Quantum Investment Timeline</h2>
    <div class="quantum-controls">
      {#if !$quantumState.superposition}
        <button class="quantum-reset" on:click={resetQuantumState}>
          🌀 Reset Superposition
        </button>
      {/if}
      <button class="debug-toggle" on:click={toggleDebug}>
        {$uiState.showDebug ? '🔍 Hide Debug' : '🔍 Show AI Work'}
      </button>
      <button class="movement-toggle" on:click={toggleMovementViz}>
        {$uiState.showMovementViz ? '🎯 Hide Trail' : '🎯 Show Trail'}
      </button>
      <div class="coherence-indicator">
        Coherence: {($quantumState.coherenceLevel * 100).toFixed(0)}%
      </div>
    </div>
  </div>
  
  <div class="behavioral-display">
    <div class="behavior-metric">
      Risk: <span class="risk-value">{($userBehavior.riskTolerance * 100).toFixed(0)}%</span>
    </div>
    <div class="behavior-metric">
      Pattern: <span class="pattern-value">{$userBehavior.interactionPattern}</span>
    </div>
    <div class="behavior-metric">
      Interactions: <span class="interaction-value">{$userBehavior.interactionHistory.length}</span>
    </div>
  </div>

  <!-- Phase 1: Debug Panel -->
  {#if $uiState.showDebug}
    <div class="debug-panel">
      <h4>🤖 Live AI Analysis</h4>
      <div class="debug-metrics">
        <div class="debug-row">
          <span class="debug-label">Mouse Volatility:</span>
          <span class="debug-value">{calculateMovementVolatility($userBehavior.interactionHistory).toFixed(3)}</span>
        </div>
        <div class="debug-row">
          <span class="debug-label">Movement Speed:</span>
          <span class="debug-value">{calculateAverageSpeed($userBehavior.interactionHistory).toFixed(3)}</span>
        </div>
        <div class="debug-row">
          <span class="debug-label">Risk Calculation:</span>
          <span class="debug-formula">
            {calculateMovementVolatility($userBehavior.interactionHistory).toFixed(3)} × 2 = {($userBehavior.riskTolerance * 100).toFixed(1)}%
          </span>
        </div>
        <div class="debug-row">
          <span class="debug-label">Last Mouse Position:</span>
          <span class="debug-value">
            ({($userBehavior.mousePosition.x * 100).toFixed(1)}%, {($userBehavior.mousePosition.y * 100).toFixed(1)}%)
          </span>
        </div>
        <div class="debug-row">
          <span class="debug-label">Scenario Probabilities:</span>
          <div class="probability-debug">
            {#each Object.entries($adaptiveScenarios) as [name, data]}
              <span class="prob-item">{name}: {(data.probability * 100).toFixed(0)}%</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Deep Dive View -->
  {#if $uiState.zoomedYear}
    <div class="zoom-container">
      <div class="zoom-header">
        <h3>🔍 Deep Dive: {$uiState.zoomedYear.year} ({$uiState.zoomedYear.scenario.toUpperCase()})</h3>
        <button class="zoom-exit" on:click={exitZoom}>
          ← Back to Timeline
        </button>
      </div>
      
      <div class="quarterly-breakdown">
        {#each generateQuarterlyData($uiState.zoomedYear.year, $uiState.zoomedYear.scenario) as quarter, index}
          <div 
            class="quarter-card"
            style="--quarter-delay: {index * 0.1}s"
          >
            <div class="quarter-header">
              <h4>{quarter.quarter} {$uiState.zoomedYear.year}</h4>
              <span class="quarter-month">{quarter.month}</span>
            </div>
            
            <div class="quarter-metrics">
              <div class="metric">
                <span class="metric-label">Market Size</span>
                <span class="metric-value">${quarter.market.toFixed(1)}T</span>
              </div>
              <div class="metric">
                <span class="metric-label">Opportunity</span>
                <span class="metric-value">{quarter.opportunity}%</span>
              </div>
              <div class="metric">
                <span class="metric-label">Sentiment</span>
                <span class="metric-value sentiment-{quarter.sentiment}">{quarter.sentiment}</span>
              </div>
            </div>
            
            <div class="quarter-events">
              <h5>Key Events:</h5>
              <ul>
                {#each quarter.events as event}
                  <li>{event}</li>
                {/each}
              </ul>
            </div>
          </div>
        {/each}
      </div>
      
      <div class="zoom-insights">
        <h4>🤖 AI Analysis for {$uiState.zoomedYear.year}</h4>
        <div class="insight-cards">
          <div class="insight-card">
            <h5>Market Dynamics</h5>
            <p>Based on your {$userBehavior.interactionPattern} pattern, this year shows {$uiState.zoomedYear.scenario === 'aggressive' ? 'explosive' : 'steady'} growth potential.</p>
          </div>
          <div class="insight-card">
            <h5>Risk Assessment</h5>
            <p>Your {($userBehavior.riskTolerance * 100).toFixed(0)}% risk tolerance aligns {$userBehavior.riskTolerance > 0.6 ? 'well' : 'moderately'} with this scenario.</p>
          </div>
          <div class="insight-card">
            <h5>Strategic Timing</h5>
            <p>Entry window: {generateQuarterlyData($uiState.zoomedYear.year, $uiState.zoomedYear.scenario)[0].opportunity}% → {generateQuarterlyData($uiState.zoomedYear.year, $uiState.zoomedYear.scenario)[3].opportunity}% remaining by year end.</p>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Original timeline content when not zoomed -->
    {#if $quantumState.superposition}
      <!-- Quantum Superposition State -->
      <div class="superposition-container">
        <h3>📊 Quantum Market Scenarios</h3>
        <p class="superposition-hint">
          🌀 Multiple realities exist simultaneously. Click to collapse wavefunction.
        </p>
        
        {#each Object.entries($adaptiveScenarios) as [scenario, data]}
          <div 
            class="scenario-pathway"
            style="opacity: {data.probability}; border-color: hsl({data.color.hue}, {data.color.saturation}%, {data.color.lightness}%)"
            on:click={() => observeScenario(scenario)}
            on:keydown={(e) => e.key === 'Enter' && observeScenario(scenario)}
            on:mousemove={handleMouseMove}
            role="button"
            tabindex="0"
            aria-label="Observe {scenario} investment scenario"
          >
            <div class="scenario-header">
              <h4>{scenario.charAt(0).toUpperCase() + scenario.slice(1)} Path</h4>
              <span class="probability">P = {(data.probability * 100).toFixed(0)}%</span>
            </div>
            
            <div class="phase-timeline">
              {#each data.phases as phase, index}
                <div 
                  class="timeline-phase" 
                  style="--phase-hue: {data.color.hue + index * 20}"
                  on:click={() => zoomToYear(phase.year, scenario)}
                  on:keydown={(e) => e.key === 'Enter' && zoomToYear(phase.year, scenario)}
                  role="button"
                  tabindex="0"
                  aria-label="Deep dive into {phase.year} analysis"
                >
                  <div class="phase-year">{phase.year}</div>
                  <div class="phase-market">${phase.market}T</div>
                  <div class="phase-opportunity">{phase.opportunity}%</div>
                  <div class="phase-emotion">{phase.emotion}</div>
                  <div class="zoom-hint">📊 Deep Dive</div>
                </div>
              {/each}
            </div>
            
            <!-- Probability field overlay -->
            <div 
              class="probability-field"
              style="
                background: radial-gradient(circle at {$probabilityField.x * 100}% {$probabilityField.y * 100}%,
                  hsla({data.color.hue}, {data.color.saturation}%, {data.color.lightness}%, {$probabilityField.intensity * 0.3}) 0%,
                  transparent 50%
                )
              "
            ></div>
          </div>
        {/each}
      </div>
    {:else if $quantumState.collapsed}
      <!-- Collapsed State - Single Reality -->
      <div class="collapsed-container">
        <h3>🎯 Observed Reality: {$quantumState.collapsed.toUpperCase()}</h3>
        <p class="collapse-timestamp">
          Wavefunction collapsed at {new Date($quantumState.observationTimestamp).toLocaleTimeString()}
        </p>
        
        <!-- Single definitive timeline -->
        <div class="definitive-timeline">
          {#if $adaptiveScenarios && $quantumState.collapsed && $adaptiveScenarios[$quantumState.collapsed]}
            {#each $adaptiveScenarios[$quantumState.collapsed].phases as phase, index}
            <div class="definitive-phase" style="--phase-delay: {index * 0.2}s">
              <div class="phase-node">
                <div class="node-year">{phase.year}</div>
                <div class="node-market">${phase.market}T</div>
                <div class="node-opportunity">{phase.opportunity}% left</div>
              </div>
              <div class="phase-details">
                <div class="detail-emotion">{phase.emotion}</div>
                <div class="detail-urgency">{phase.urgency}</div>
              </div>
            </div>
            {/each}
          {/if}
        </div>
        
        <!-- AI Recommendations -->
        <div class="ai-recommendations">
          <h4>🤖 AI Strategic Analysis</h4>
          <div class="recommendation">
            Based on your {$userBehavior.riskTolerance > 0.6 ? 'high' : 'moderate'} risk tolerance and 
            {$userBehavior.interactionPattern} interaction pattern, this scenario aligns with your profile.
          </div>
        </div>
      </div>
    {/if}

    <!-- Movement Pattern Analysis (below scenarios) -->
    {#if $uiState.showMovementViz}
      <div class="movement-visualization">
        <h4>🎯 Your Movement Pattern</h4>
        <div class="movement-canvas">
          <svg width="400" height="200" class="movement-trail">
            {#each $userBehavior.movementTrail as point, i}
              {#if i > 0}
                <line
                  x1={$userBehavior.movementTrail[i-1].x * 400}
                  y1={$userBehavior.movementTrail[i-1].y * 200}
                  x2={point.x * 400}
                  y2={point.y * 200}
                  stroke="rgba(139, 92, 246, {1 - (($userBehavior.movementTrail.length - i) / $userBehavior.movementTrail.length)})"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              {/if}
            {/each}
            {#each $userBehavior.movementTrail.slice(-5) as point, i}
              <circle
                cx={point.x * 400}
                cy={point.y * 200}
                r={3 + i}
                fill="rgba(139, 92, 246, {0.3 + (i * 0.2)})"
              />
            {/each}
          </svg>
          <div class="movement-analysis">
            <div class="analysis-item">
              Pattern: <span class="analysis-value">{$userBehavior.interactionPattern}</span>
            </div>
            <div class="analysis-item">
              Volatility: <span class="analysis-value">{calculateMovementVolatility($userBehavior.interactionHistory) > 0.5 ? 'High' : 'Low'}</span>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .quantum-timeline-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    color: white;
    border-radius: 20px;
    min-height: 600px;
    position: relative;
    overflow: hidden;
  }
  
  .quantum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .quantum-header h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .quantum-controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .quantum-reset {
    background: #8b5cf6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .quantum-reset:hover {
    background: #7c3aed;
    transform: scale(1.05);
  }
  
  .coherence-indicator {
    font-size: 0.9rem;
    color: #94a3b8;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .behavioral-display {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    padding: 16px;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .behavior-metric {
    font-size: 0.9rem;
    color: #94a3b8;
  }
  
  .risk-value {
    color: #10b981;
    font-weight: 600;
  }
  
  .pattern-value {
    color: #06b6d4;
    font-weight: 600;
    text-transform: uppercase;
  }

  .interaction-value {
    color: #f59e0b;
    font-weight: 600;
  }
  
  .superposition-container h3 {
    margin: 0 0 16px 0;
    font-size: 1.4rem;
    font-weight: 600;
  }
  
  .superposition-hint {
    margin-bottom: 24px;
    color: #94a3b8;
    font-style: italic;
  }
  
  .scenario-pathway {
    position: relative;
    background: rgba(30, 41, 59, 0.3);
    border: 2px solid transparent;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .scenario-pathway:hover {
    transform: translateY(-2px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  .scenario-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .scenario-header h4 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .probability {
    font-size: 0.9rem;
    font-weight: 600;
    color: #94a3b8;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .phase-timeline {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  
  .phase-timeline::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    z-index: 1;
  }
  
  .timeline-phase {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    z-index: 2;
    padding: 12px;
    border-radius: 8px;
    background: hsla(var(--phase-hue), 50%, 50%, 0.1);
    border: 1px solid hsla(var(--phase-hue), 50%, 50%, 0.3);
    transition: all 0.3s ease;
  }
  
  .timeline-phase:hover {
    transform: scale(1.1);
    background: hsla(var(--phase-hue), 50%, 50%, 0.2);
  }
  
  .phase-year {
    font-size: 0.8rem;
    font-weight: 600;
    color: #94a3b8;
  }
  
  .phase-market {
    font-size: 1rem;
    font-weight: 700;
    color: white;
  }
  
  .phase-opportunity {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .phase-emotion {
    font-size: 0.7rem;
    color: #94a3b8;
    text-transform: capitalize;
  }
  
  .probability-field {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  
  .collapsed-container {
    background: rgba(30, 41, 59, 0.6);
    border-radius: 20px;
    padding: 32px;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .collapsed-container h3 {
    margin: 0 0 8px 0;
    font-size: 1.6rem;
    font-weight: 700;
  }
  
  .collapse-timestamp {
    margin-bottom: 24px;
    color: #94a3b8;
    font-size: 0.9rem;
  }
  
  .definitive-timeline {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .definitive-phase {
    display: flex;
    align-items: center;
    gap: 24px;
    animation: slideIn 0.6s ease-out forwards;
    animation-delay: var(--phase-delay);
    opacity: 0;
    transform: translateX(-50px);
  }
  
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .phase-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-radius: 16px;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    min-width: 120px;
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
  }
  
  .node-year {
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
  }
  
  .node-market {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .node-opportunity {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .phase-details {
    flex: 1;
    padding: 16px;
    background: rgba(15, 23, 42, 0.4);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .detail-emotion, .detail-urgency {
    margin-bottom: 8px;
    font-size: 0.9rem;
    text-transform: capitalize;
  }
  
  .ai-recommendations {
    padding: 24px;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 16px;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }
  
  .ai-recommendations h4 {
    margin: 0 0 16px 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #60a5fa;
  }
  
  .recommendation {
    font-size: 0.9rem;
    color: #94a3b8;
    line-height: 1.5;
  }

  /* Phase 1: Debug Panel Styles */
  .debug-toggle, .movement-toggle {
    background: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.3);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .debug-toggle:hover, .movement-toggle:hover {
    background: rgba(59, 130, 246, 0.3);
    transform: scale(1.05);
  }

  .debug-panel {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    backdrop-filter: blur(10px);
  }

  .debug-panel h4 {
    margin: 0 0 16px 0;
    color: #60a5fa;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .debug-metrics {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .debug-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .debug-label {
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 500;
  }

  .debug-value {
    font-family: 'JetBrains Mono', monospace;
    color: #10b981;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .debug-formula {
    font-family: 'JetBrains Mono', monospace;
    color: #f59e0b;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .probability-debug {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .prob-item {
    background: rgba(139, 92, 246, 0.2);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #c4b5fd;
  }

  /* Movement Visualization Styles */
  .movement-visualization {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
  }

  .movement-visualization h4 {
    margin: 0 0 16px 0;
    color: #8b5cf6;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .movement-canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .movement-trail {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .movement-analysis {
    display: flex;
    gap: 24px;
  }

  .analysis-item {
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .analysis-value {
    color: #8b5cf6;
    font-weight: 600;
    text-transform: capitalize;
  }

  /* Timeline Phase Enhancements */
  .timeline-phase {
    cursor: pointer;
    position: relative;
  }

  .zoom-hint {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    margin-top: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .timeline-phase:hover .zoom-hint {
    opacity: 1;
  }

  /* Deep Dive View Styles */
  .zoom-container {
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 32px;
    margin-top: 24px;
    backdrop-filter: blur(20px);
  }

  .zoom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .zoom-header h3 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .zoom-exit {
    background: rgba(100, 116, 139, 0.2);
    color: #94a3b8;
    border: 1px solid rgba(100, 116, 139, 0.3);
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .zoom-exit:hover {
    background: rgba(100, 116, 139, 0.3);
    color: white;
  }

  .quarterly-breakdown {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }

  .quarter-card {
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    animation: slideInUp 0.6s ease-out forwards;
    animation-delay: var(--quarter-delay);
    opacity: 0;
    transform: translateY(20px);
  }

  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .quarter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .quarter-header h4 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
  }

  .quarter-month {
    font-size: 0.9rem;
    color: #94a3b8;
    font-family: 'JetBrains Mono', monospace;
  }

  .quarter-metrics {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .metric-label {
    font-size: 0.8rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .metric-value {
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }

  .sentiment-explosive,
  .sentiment-euphoric,
  .sentiment-aggressive {
    color: #f59e0b !important;
  }

  .sentiment-optimistic,
  .sentiment-confident,
  .sentiment-strategic {
    color: #10b981 !important;
  }

  .sentiment-cautious,
  .sentiment-steady,
  .sentiment-secure {
    color: #06b6d4 !important;
  }

  .quarter-events {
    margin-top: 16px;
  }

  .quarter-events h5 {
    margin: 0 0 8px 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #8b5cf6;
  }

  .quarter-events ul {
    margin: 0;
    padding-left: 20px;
    color: #94a3b8;
  }

  .quarter-events li {
    margin-bottom: 4px;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .zoom-insights {
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 16px;
    padding: 24px;
  }

  .zoom-insights h4 {
    margin: 0 0 20px 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #60a5fa;
  }

  .insight-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }

  .insight-card {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 16px;
  }

  .insight-card h5 {
    margin: 0 0 8px 0;
    font-size: 1rem;
    font-weight: 600;
    color: #10b981;
  }

  .insight-card p {
    margin: 0;
    font-size: 0.9rem;
    color: #94a3b8;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .quantum-header {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }

    .quantum-controls {
      flex-direction: column;
      gap: 8px;
    }
    
    .behavioral-display {
      flex-direction: column;
      gap: 12px;
    }

    .debug-panel {
      padding: 16px;
    }

    .debug-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .movement-analysis {
      flex-direction: column;
      gap: 12px;
    }

    .movement-trail {
      width: 100%;
      height: 150px;
    }
    
    .phase-timeline {
      flex-direction: column;
      gap: 16px;
    }
    
    .definitive-phase {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .zoom-header {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }

    .zoom-header h3 {
      font-size: 1.3rem;
    }

    .quarterly-breakdown {
      grid-template-columns: 1fr;
    }

    .quarter-metrics {
      flex-direction: column;
      gap: 12px;
    }

    .insight-cards {
      grid-template-columns: 1fr;
    }
  }
</style>