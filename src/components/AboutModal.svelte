<!-- src/components/AboutModal.svelte -->
<script>
  import { fade, scale } from 'svelte/transition';
  import { spring, tweened } from 'svelte/motion';
  import { quintOut } from 'svelte/easing';
  import { writable } from 'svelte/store';
  
  export let isOpen = false;
  
  // 🎆 MINI MAGIC: Svelte Logo Animation (inspired by ReportPage)
  const logoScale = spring(1, {
    stiffness: 0.3,
    damping: 0.6
  });
  
  const logoGlow = tweened(0, {
    duration: 600,
    easing: quintOut
  });
  
  const logoRotation = spring(0, {
    stiffness: 0.2,
    damping: 0.7
  });
  
  // Mini particle system
  const particles = writable([]);
  let logoHovered = false;
  
  function createMiniParticle() {
    return {
      id: Math.random(),
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      size: Math.random() * 4 + 2,
      opacity: 0.8,
      velocityX: (Math.random() - 0.5) * 1.5,
      velocityY: (Math.random() - 0.5) * 1.5,
      color: ['#FF914D', '#0CC0DF', '#2563EB'][Math.floor(Math.random() * 3)]
    };
  }
  
  function animateMiniParticles() {
    particles.update(current => {
      const newParticles = [];
      
      if (logoHovered && current.length < 8) {
        newParticles.push(createMiniParticle());
      }
      
      return [...current, ...newParticles].map(particle => ({
        ...particle,
        x: particle.x + particle.velocityX,
        y: particle.y + particle.velocityY,
        opacity: particle.opacity - 0.02,
        size: particle.size * 0.98
      })).filter(particle => particle.opacity > 0 && particle.size > 1);
    });
    
    if (logoHovered || $particles.length > 0) {
      requestAnimationFrame(animateMiniParticles);
    }
  }
  
  function handleLogoHover() {
    logoHovered = true;
    logoScale.set(1.15);
    logoRotation.set(3);
    logoGlow.set(1);
    animateMiniParticles();
    
    // Mini sequence
    setTimeout(() => {
      logoScale.set(1.1);
      logoRotation.set(-1);
    }, 150);
    
    setTimeout(() => {
      logoScale.set(1.05);
      logoRotation.set(0);
    }, 300);
  }
  
  function handleLogoLeave() {
    logoHovered = false;
    logoScale.set(1);
    logoRotation.set(0);
    logoGlow.set(0);
  }
  
  // Entry animation when modal opens
  $: if (isOpen) {
    setTimeout(() => {
      logoGlow.set(0.3);
      setTimeout(() => logoGlow.set(0), 2000);
    }, 300);
  }
  
  function closeModal() {
    isOpen = false;
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-backdrop" 
       on:click={handleBackdropClick} 
       transition:fade={{ duration: 300 }}>
    <div class="modal-content" 
         transition:scale={{ duration: 300, start: 0.9 }}
         on:click|stopPropagation>
      
      <!-- Close Button -->
      <button class="close-button" on:click={closeModal} aria-label="Close About modal">
        <i class="fas fa-times"></i>
      </button>
      
      <!-- About Content -->
      <div class="about-content">
        <!-- Animated Logo Container -->
        <div class="logo-container">
          <!-- Mini Particle System -->
          <div class="mini-particles">
            {#each $particles as particle (particle.id)}
              <div 
                class="mini-particle"
                style="
                  left: calc(50% + {particle.x}px);
                  top: calc(50% + {particle.y}px);
                  width: {particle.size}px;
                  height: {particle.size}px;
                  opacity: {particle.opacity};
                  background-color: {particle.color};
                  box-shadow: 0 0 {particle.size * 2}px {particle.color};
                "
              ></div>
            {/each}
          </div>
          
          <!-- Magical Logo -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <img 
            src="https://github.com/Wolfe-Jam/theblockchain-ai/blob/main/Public/theBlockchain-ai.png?raw=true" 
            alt="theBlockchain.ai Logo" 
            class="about-logo"
            style="
              transform: scale({$logoScale}) rotate({$logoRotation}deg);
              filter: 
                drop-shadow(0 4px 12px rgba(255, 145, 77, 0.3))
                drop-shadow(0 0 {$logoGlow * 20}px rgba(255, 145, 77, {$logoGlow * 0.7}))
                drop-shadow(0 0 {$logoGlow * 40}px rgba(12, 192, 223, {$logoGlow * 0.4}));
            "
            on:mouseenter={handleLogoHover}
            on:mouseleave={handleLogoLeave}
            on:error={(e) => {
              e.target.src = 'https://placehold.co/120x120/1E293B/FFFFFF?text=Logo';
              e.target.onerror = null;
            }}
          >
        </div>
        
        <h2 class="about-title">theBlockchain.ai</h2>
        <p class="about-subtitle">Building the Future of Trusted AI</p>
        
        <div class="version-info">
          <span class="version-label">Version</span>
          <span class="version-number">1.1.0</span>
        </div>
        
        <div class="about-description">
          <p class="economic-layer">The Economic Layer for Open-Source</p>
          
          <div class="features-grid">
            <div class="feature-row">
              <img 
                src="https://raw.githubusercontent.com/Wolfe-Jam/theblockchain-ai/main/Public/theBlockchain-ai-crop-sml.svg" 
                alt="theBlockchain.ai" 
                class="feature-logo"
                on:error={(e) => {
                  e.target.src = 'https://placehold.co/20x20/1E293B/FFFFFF?text=Logo';
                  e.target.onerror = null;
                }}
              >
              <span class="feature-text">Verifiable Trust</span>
            </div>
            <div class="feature-row">
              <span class="feature-text">AI Automation</span>
              <span class="feature-separator">|</span>
              <span class="feature-text">Developer Monetization</span>
            </div>
          </div>
        </div>
        
        <div class="about-footer">
          <p>&copy; 2025 theBlockchain.ai</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background-color: #1E293B;
    border-radius: 1rem;
    padding: 2.5rem;
    max-width: 400px;
    width: 100%;
    position: relative;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #94A3B8;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    color: #F8FAFC;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .about-content {
    text-align: center;
  }

  /* 🎆 MINI MAGIC: Logo Animation Container */
  .logo-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    margin-bottom: 1.5rem;
  }

  .mini-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .mini-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: miniFloat 1.5s ease-in-out infinite;
  }

  @keyframes miniFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(180deg); }
  }

  .about-logo {
    width: 80px;
    height: 80px;
    cursor: pointer;
    z-index: 10;
    position: relative;
    transition: none; /* Pure Svelte animations */
  }

  .about-title {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.75rem;
    font-weight: 700;
    color: #F8FAFC;
    margin-bottom: 0.5rem;
  }

  .about-subtitle {
    font-size: 1rem;
    color: #94A3B8;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .version-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: rgba(255, 145, 77, 0.1);
    border: 1px solid rgba(255, 145, 77, 0.3);
    border-radius: 0.5rem;
  }

  .version-label {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.875rem;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .version-number {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.125rem;
    font-weight: 700;
    color: #FF914D;
  }

  .about-description {
    margin-bottom: 2rem;
  }

  .economic-layer {
    font-weight: 600;
    color: #F8FAFC;
    margin: 0 0 1rem 0;
    text-align: center;
  }

  .features-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .feature-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #CBD5E1;
  }

  .feature-logo {
    width: 28px;
    height: 28px;
    filter: drop-shadow(0 2px 4px rgba(255, 145, 77, 0.3));
  }

  .feature-text {
    font-size: 0.95rem;
  }

  .feature-separator {
    color: #64748B;
    margin: 0 0.25rem;
  }

  .about-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .about-footer p {
    color: #64748B;
    font-size: 0.875rem;
    margin: 0;
  }

  @media (max-width: 640px) {
    .modal-content {
      padding: 2rem;
      margin: 1rem;
    }
    
    .about-title {
      font-size: 1.5rem;
    }
  }
</style>