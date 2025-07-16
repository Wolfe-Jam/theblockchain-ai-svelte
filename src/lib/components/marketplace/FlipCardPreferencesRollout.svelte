<!-- Sexy Svelte-Animated Preferences Rollout -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly, scale, slide } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';
  import { flipcardPreferences, flipcardPreferencesActions } from '$lib/stores/flipcardPreferences';
  
  export let isOpen = false;
  export let anchorX = 0;
  export let anchorY = 0;
  
  const dispatch = createEventDispatcher();
  
  function closePanel() {
    isOpen = false;
    dispatch('close');
  }
  
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closePanel();
    }
  }
  
  function togglePreference(key: keyof typeof $flipcardPreferences) {
    flipcardPreferencesActions.toggle(key);
  }
  
  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closePanel();
    }
  }
  
  // Calculate panel position from anchor
  $: panelLeft = Math.max(10, Math.min(window.innerWidth - 320, anchorX - 50));
  $: panelTop = Math.max(10, anchorY + 40);
  
  // Custom spring transition parameters
  const springParams = {
    delay: 0,
    duration: 600,
    easing: elasticOut
  };
  
  const flyParams = {
    delay: 100,
    duration: 500,
    easing: quintOut
  };
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- Backdrop with blur -->
  <div 
    class="backdrop" 
    on:click={handleBackdropClick}
    role="button"
    tabindex="-1"
    transition:fly={{ y: -20, duration: 300, opacity: 0.3 }}
  >
    <!-- Main Panel with Sexy Animation -->
    <div 
      class="preferences-rollout"
      style="left: {panelLeft}px; top: {panelTop}px;"
      in:scale={{ ...springParams, start: 0.3 }}
      out:scale={{ duration: 300, start: 0.8 }}
      role="dialog" 
      aria-modal="true"
    >
      <!-- Animated Header -->
      <div 
        class="panel-header"
        in:slide={{ ...flyParams, axis: 'y' }}
      >
        <div class="header-content">
          <div class="icon-badge">⚙️</div>
          <h3>Display Preferences</h3>
          <button 
            class="close-btn" 
            on:click={closePanel}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="connection-line"></div>
      </div>
      
      <!-- Animated Preferences List -->
      <div class="preferences-list">
        {#each [
          { key: 'showPalette', icon: '🎨', label: 'Color Palette', delay: 0 },
          { key: 'showTags', icon: '#️⃣', label: 'Tags', delay: 100 },
          { key: 'showToolbar', icon: '🔧', label: 'Toolbar', delay: 200 },
          { key: 'showBuyButton', icon: '💳', label: 'Buy Button', delay: 300 }
        ] as pref, i}
          <div 
            class="pref-row"
            in:fly={{ x: -30, delay: 200 + pref.delay, ...flyParams }}
            out:fly={{ x: 30, duration: 200 }}
          >
            <div class="pref-info">
              <span class="pref-icon">{pref.icon}</span>
              <span class="pref-label">{pref.label}</span>
            </div>
            
            <!-- Sexy Toggle Switch -->
            <label class="sexy-toggle">
              <input 
                type="checkbox" 
                bind:checked={$flipcardPreferences[pref.key]}
                on:change={() => togglePreference(pref.key)}
              />
              <span class="toggle-track">
                <span class="toggle-thumb"></span>
                <span class="toggle-glow"></span>
              </span>
            </label>
          </div>
        {/each}
      </div>
      
      <!-- Animated Footer -->
      <div 
        class="panel-footer"
        in:fly={{ y: 20, delay: 600, ...flyParams }}
      >
        <div class="live-status">
          <div class="pulse-ring"></div>
          <div class="pulse-dot"></div>
          <span>Live sync across all FlipCards</span>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="glow-effect"></div>
      <div class="corner-accent"></div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px) saturate(1.2);
    z-index: 1000;
    pointer-events: all;
  }
  
  .preferences-rollout {
    position: absolute;
    width: 300px;
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 20px;
    box-shadow: 
      0 20px 40px -10px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.9),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    pointer-events: auto;
    overflow: hidden;
    border: 2px solid rgba(59, 130, 246, 0.1);
    position: relative;
  }
  
  .panel-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }
  
  .header-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    position: relative;
    z-index: 2;
  }
  
  .icon-badge {
    width: 2rem;
    height: 2rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .panel-header h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    flex: 1;
    letter-spacing: -0.01em;
  }
  
  .close-btn {
    width: 1.75rem;
    height: 1.75rem;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }
  
  .close-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1) rotate(90deg);
    color: white;
  }
  
  .close-btn svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .connection-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.6) 20%, 
      rgba(255, 255, 255, 0.8) 50%, 
      rgba(255, 255, 255, 0.6) 80%, 
      transparent 100%
    );
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { opacity: 0.6; transform: scaleX(1); }
    50% { opacity: 1; transform: scaleX(1.1); }
  }
  
  .preferences-list {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .pref-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    border: 1px solid rgba(59, 130, 246, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .pref-row:hover {
    background: rgba(255, 255, 255, 0.8);
    border-color: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }
  
  .pref-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .pref-icon {
    font-size: 1.125rem;
    width: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pref-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    letter-spacing: -0.01em;
  }
  
  /* Sexy Toggle Switch */
  .sexy-toggle {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  .sexy-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-track {
    position: relative;
    display: block;
    width: 2.75rem;
    height: 1.5rem;
    background: linear-gradient(145deg, #e2e8f0, #cbd5e1);
    border-radius: 1.5rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .toggle-thumb {
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    width: 1.25rem;
    height: 1.25rem;
    background: linear-gradient(145deg, #ffffff, #f1f5f9);
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.8);
  }
  
  .toggle-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: #3b82f6;
    transform: translate(-50%, -50%) scale(0);
    transition: all 0.3s ease;
    opacity: 0;
  }
  
  input:checked + .toggle-track {
    background: linear-gradient(145deg, #3b82f6, #2563eb);
    border-color: #1d4ed8;
    box-shadow: 
      inset 0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(59, 130, 246, 0.4);
  }
  
  input:checked + .toggle-track .toggle-thumb {
    transform: translateX(1.25rem);
    background: linear-gradient(145deg, #ffffff, #f8fafc);
    box-shadow: 
      0 2px 8px rgba(59, 130, 246, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.9);
  }
  
  input:checked + .toggle-track .toggle-glow {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  
  .toggle-track:hover {
    transform: scale(1.05);
  }
  
  .panel-footer {
    padding: 1rem 1.25rem;
    background: linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%);
    border-top: 1px solid rgba(59, 130, 246, 0.1);
  }
  
  .live-status {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 500;
  }
  
  .pulse-ring {
    position: relative;
    width: 12px;
    height: 12px;
  }
  
  .pulse-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    animation: pulse-dot 2s infinite;
  }
  
  .pulse-ring::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid #10b981;
    border-radius: 50%;
    animation: pulse-ring 2s infinite;
    opacity: 0.6;
  }
  
  @keyframes pulse-dot {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
  
  @keyframes pulse-ring {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }
  
  /* Decorative Effects */
  .glow-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: glow-rotate 8s linear infinite;
  }
  
  @keyframes glow-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .corner-accent {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: linear-gradient(225deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  /* Dark mode support */
  :global(.dark) .preferences-rollout {
    background: linear-gradient(145deg, #1f2937 0%, #111827 100%);
    border-color: rgba(59, 130, 246, 0.2);
  }
  
  :global(.dark) .pref-row {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(59, 130, 246, 0.2);
  }
  
  :global(.dark) .pref-row:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  :global(.dark) .pref-label {
    color: #d1d5db;
  }
  
  :global(.dark) .panel-footer {
    background: linear-gradient(145deg, #111827 0%, #0f172a 100%);
  }
  
  :global(.dark) .live-status {
    color: #9ca3af;
  }
  
  /* Mobile responsive */
  @media (max-width: 640px) {
    .preferences-rollout {
      width: 280px;
      left: 10px !important;
    }
  }
</style>