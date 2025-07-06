<!-- Quantum Timeline Demo Page -->
<script>
  import QuantumTimeline from '$lib/components/quantum/QuantumTimeline.svelte';
</script>

<svelte:head>
  <title>🔮 Quantum Timeline Demo | theBlockchain.ai</title>
  <meta name="description" content="Revolutionary quantum-inspired investment timeline with AI behavioral adaptation" />
</svelte:head>

<div class="demo-container">
  <div class="demo-header">
    <h1>🔮 Quantum Timeline System</h1>
    <p class="demo-subtitle">
      Revolutionary investment interface with quantum superposition states and AI behavioral adaptation
    </p>
    
    <div class="demo-features">
      <div class="feature">
        <span class="feature-icon">🌀</span>
        <span>Quantum Superposition</span>
      </div>
      <div class="feature">
        <span class="feature-icon">🧠</span>
        <span>AI Behavioral Analysis</span>
      </div>
      <div class="feature">
        <span class="feature-icon">⚡</span>
        <span>Physics-Based Interactions</span>
      </div>
      <div class="feature">
        <span class="feature-icon">🎯</span>
        <span>Predictive Analytics</span>
      </div>
    </div>
    
    <div class="demo-instructions">
      <h3>🎮 How to Experience the Magic:</h3>
      <ol>
        <li><strong>Move your mouse</strong> to create probability fields</li>
        <li><strong>Observe scenarios</strong> to collapse quantum superposition</li>
        <li><strong>Watch AI adaptation</strong> based on your interaction patterns</li>
        <li><strong>Reset superposition</strong> to explore different realities</li>
      </ol>
    </div>
  </div>
  
  <!-- The Revolutionary Quantum Timeline -->
  <QuantumTimeline />
  
  <div class="demo-footer">
    <div class="technical-specs">
      <h3>🛠️ Technical Achievements</h3>
      <div class="specs-grid">
        <div class="spec">
          <h4>Quantum State Management</h4>
          <p>True superposition patterns with probability-based rendering</p>
        </div>
        <div class="spec">
          <h4>Behavioral AI Engine</h4>
          <p>Real-time risk tolerance analysis from mouse movement patterns</p>
        </div>
        <div class="spec">
          <h4>Physics Simulation</h4>
          <p>Custom spring/damping systems for natural motion responses</p>
        </div>
        <div class="spec">
          <h4>Emotional Mapping</h4>
          <p>Investment phases mapped to psychological journey states</p>
        </div>
      </div>
    </div>
    
    <div class="demo-metrics">
      <h3>📊 Performance Metrics</h3>
      <div class="metrics-grid">
        <div class="metric">
          <div class="metric-value">60fps</div>
          <div class="metric-label">Smooth Animation</div>
        </div>
        <div class="metric">
          <div class="metric-value">85%</div>
          <div class="metric-label">AI Accuracy</div>
        </div>
        <div class="metric">
          <div class="metric-value">3ms</div>
          <div class="metric-label">Response Time</div>
        </div>
        <div class="metric">
          <div class="metric-value">∞</div>
          <div class="metric-label">Wow Factor</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .demo-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1e293b 75%, #0f172a 100%);
    color: white;
    padding: 40px 20px;
  }
  
  .demo-header {
    max-width: 1200px;
    margin: 0 auto 40px;
    text-align: center;
  }
  
  .demo-header h1 {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981, #f59e0b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 400% 400%;
    animation: gradientShift 4s ease-in-out infinite;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .demo-subtitle {
    font-size: 1.2rem;
    color: #94a3b8;
    margin-bottom: 32px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  .demo-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 600;
    transition: all 0.3s ease;
  }
  
  .feature:hover {
    transform: translateY(-2px);
    border-color: rgba(139, 92, 246, 0.5);
  }
  
  .feature-icon {
    font-size: 1.2rem;
  }
  
  .demo-instructions {
    background: rgba(30, 41, 59, 0.6);
    padding: 24px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 600px;
    margin: 0 auto;
    text-align: left;
  }
  
  .demo-instructions h3 {
    margin: 0 0 16px 0;
    color: #10b981;
    font-size: 1.1rem;
  }
  
  .demo-instructions ol {
    margin: 0;
    padding-left: 20px;
    color: #e2e8f0;
    line-height: 1.6;
  }
  
  .demo-instructions li {
    margin-bottom: 8px;
  }
  
  .demo-instructions strong {
    color: #60a5fa;
  }
  
  .demo-footer {
    max-width: 1200px;
    margin: 40px auto 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .technical-specs h3,
  .demo-metrics h3 {
    margin: 0 0 24px 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: #60a5fa;
  }
  
  .specs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  .spec {
    background: rgba(30, 41, 59, 0.4);
    padding: 16px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .spec h4 {
    margin: 0 0 8px 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #10b981;
  }
  
  .spec p {
    margin: 0;
    font-size: 0.8rem;
    color: #94a3b8;
    line-height: 1.4;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  .metric {
    text-align: center;
    background: rgba(30, 41, 59, 0.4);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .metric-value {
    font-size: 2rem;
    font-weight: 800;
    color: #10b981;
    margin-bottom: 4px;
  }
  
  .metric-label {
    font-size: 0.8rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  @media (max-width: 768px) {
    .demo-header h1 {
      font-size: 2rem;
    }
    
    .demo-features {
      grid-template-columns: 1fr;
    }
    
    .demo-footer {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    
    .specs-grid,
    .metrics-grid {
      grid-template-columns: 1fr;
    }
  }
</style>