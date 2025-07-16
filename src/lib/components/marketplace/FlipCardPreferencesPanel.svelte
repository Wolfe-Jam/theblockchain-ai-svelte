<!-- Creative FlipCard-Style Preferences Panel -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { flipcardPreferences, flipcardPreferencesActions } from '$lib/stores/flipcardPreferences';
  
  export let isOpen = false;
  export let anchorX = 0; // X position of the "i" button
  export let anchorY = 0; // Y position of the "i" button
  
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
  
  // Calculate panel position based on anchor point
  $: panelStyle = `
    transform-origin: ${anchorX}px ${anchorY}px;
    left: ${Math.max(10, anchorX - 150)}px;
    top: ${Math.max(10, anchorY + 10)}px;
  `;
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- Backdrop -->
  <div 
    class="panel-backdrop" 
    on:click={handleBackdropClick}
    role="button"
    tabindex="-1"
  >
    <!-- FlipCard-Style Preferences Panel -->
    <div 
      class="preferences-panel"
      class:open={isOpen}
      style={panelStyle}
      role="dialog" 
      aria-modal="true"
    >
      <!-- Panel Header -->
      <div class="panel-header">
        <h3>Display Settings</h3>
        <button 
          class="close-btn" 
          on:click={closePanel}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      
      <!-- Preferences Grid -->
      <div class="preferences-grid">
        <!-- Palette Toggle -->
        <div class="pref-item">
          <span class="pref-icon">🎨</span>
          <span class="pref-label">Palette</span>
          <label class="toggle">
            <input 
              type="checkbox" 
              bind:checked={$flipcardPreferences.showPalette}
              on:change={() => togglePreference('showPalette')}
            />
            <span class="slider"></span>
          </label>
        </div>
        
        <!-- Tags Toggle -->
        <div class="pref-item">
          <span class="pref-icon">#️⃣</span>
          <span class="pref-label">Tags</span>
          <label class="toggle">
            <input 
              type="checkbox" 
              bind:checked={$flipcardPreferences.showTags}
              on:change={() => togglePreference('showTags')}
            />
            <span class="slider"></span>
          </label>
        </div>
        
        <!-- Toolbar Toggle -->
        <div class="pref-item">
          <span class="pref-icon">🔧</span>
          <span class="pref-label">Toolbar</span>
          <label class="toggle">
            <input 
              type="checkbox" 
              bind:checked={$flipcardPreferences.showToolbar}
              on:change={() => togglePreference('showToolbar')}
            />
            <span class="slider"></span>
          </label>
        </div>
        
        <!-- Buy Toggle -->
        <div class="pref-item">
          <span class="pref-icon">💳</span>
          <span class="pref-label">Buy</span>
          <label class="toggle">
            <input 
              type="checkbox" 
              bind:checked={$flipcardPreferences.showBuyButton}
              on:change={() => togglePreference('showBuyButton')}
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>
      
      <!-- Live Preview Indicator -->
      <div class="live-indicator">
        <div class="pulse-dot"></div>
        <span>Live updates across all FlipCards</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .panel-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1000;
    pointer-events: all;
  }
  
  .preferences-panel {
    position: absolute;
    width: 280px;
    background: white;
    border-radius: 16px;
    box-shadow: 
      0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 20px 25px -5px rgba(0, 0, 0, 0.04),
      0 0 0 1px rgba(0, 0, 0, 0.05);
    transform: scale(0.8) translateY(-10px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: auto;
    border: 2px solid #e5e7eb;
  }
  
  .preferences-panel.open {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 14px 14px 0 0;
  }
  
  .panel-header h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: -0.01em;
  }
  
  .close-btn {
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.75rem;
    color: #64748b;
    transition: all 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
  
  .close-btn:hover {
    background: white;
    color: #374151;
    transform: scale(1.1);
  }
  
  .preferences-grid {
    padding: 1rem 1.25rem 0.75rem;
    display: grid;
    gap: 0.75rem;
  }
  
  .pref-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
  
  .pref-icon {
    font-size: 1.1rem;
    width: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pref-label {
    flex: 1;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  /* Mini Toggle Switch */
  .toggle {
    position: relative;
    display: inline-block;
    width: 2.25rem;
    height: 1.125rem;
    cursor: pointer;
  }
  
  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #cbd5e1;
    border-radius: 1.125rem;
    transition: 0.25s;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 0.875rem;
    width: 0.875rem;
    left: 0.125rem;
    bottom: 0.125rem;
    background: white;
    border-radius: 50%;
    transition: 0.25s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  input:checked + .slider {
    background: #3b82f6;
    border-color: #2563eb;
  }
  
  input:checked + .slider:before {
    transform: translateX(1.125rem);
  }
  
  .slider:hover {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .live-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem 1rem;
    font-size: 0.75rem;
    color: #6b7280;
    border-top: 1px solid #f1f5f9;
    background: #fafbfc;
    border-radius: 0 0 14px 14px;
  }
  
  .pulse-dot {
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.2);
    }
  }
  
  /* Dark mode support */
  :global(.dark) .preferences-panel {
    background: #1f2937;
    border-color: #374151;
  }
  
  :global(.dark) .panel-header {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    border-color: #374151;
  }
  
  :global(.dark) .panel-header h3 {
    color: white;
  }
  
  :global(.dark) .close-btn {
    background: rgba(255, 255, 255, 0.1);
    color: #9ca3af;
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  :global(.dark) .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  :global(.dark) .pref-label {
    color: #d1d5db;
  }
  
  :global(.dark) .live-indicator {
    background: #111827;
    border-color: #374151;
    color: #9ca3af;
  }
  
  /* Mobile responsive */
  @media (max-width: 640px) {
    .preferences-panel {
      width: 260px;
      left: 10px !important;
    }
    
    .panel-header,
    .preferences-grid,
    .live-indicator {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>