<!-- Compact FlipCard Preferences Modal -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { flipcardPreferences, flipcardPreferencesActions } from '$lib/stores/flipcardPreferences';
  
  export let isOpen = false;
  
  const dispatch = createEventDispatcher();
  
  function closeModal() {
    isOpen = false;
    dispatch('close');
  }
  
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
  function togglePreference(key: keyof typeof $flipcardPreferences) {
    flipcardPreferencesActions.toggle(key);
  }
  
  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- Modal Backdrop -->
  <div 
    class="modal-backdrop" 
    on:click={handleBackdropClick}
    role="button"
    tabindex="-1"
  >
    <!-- Compact Modal Content -->
    <div class="modal-content" role="dialog" aria-modal="true">
      <!-- Header -->
      <div class="modal-header">
        <h3>FlipCard Display</h3>
        <button 
          class="close-button" 
          on:click={closeModal}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      
      <!-- Compact Toggles -->
      <div class="toggles">
        <!-- Color Palette -->
        <div class="toggle-row">
          <span class="toggle-label">🎨 Palette</span>
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              bind:checked={$flipcardPreferences.showPalette}
              on:change={() => togglePreference('showPalette')}
            />
            <span class="slider"></span>
          </label>
        </div>
        
        <!-- Tags -->
        <div class="toggle-row">
          <span class="toggle-label">#️⃣ Tags</span>
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              bind:checked={$flipcardPreferences.showTags}
              on:change={() => togglePreference('showTags')}
            />
            <span class="slider"></span>
          </label>
        </div>
        
        <!-- Toolbar -->
        <div class="toggle-row">
          <span class="toggle-label">🔧 Toolbar</span>
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              bind:checked={$flipcardPreferences.showToolbar}
              on:change={() => togglePreference('showToolbar')}
            />
            <span class="slider"></span>
          </label>
        </div>
        
        <!-- Buy Button -->
        <div class="toggle-row">
          <span class="toggle-label">💳 Buy</span>
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              bind:checked={$flipcardPreferences.showBuyButton}
              on:change={() => togglePreference('showBuyButton')}
            />
            <span class="slider"></span>
          </label>
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
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }
  
  .modal-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    width: 300px;
    max-width: 90vw;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
  }
  
  .close-button {
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background: transparent;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.875rem;
    color: #6b7280;
    transition: all 0.2s;
  }
  
  .close-button:hover {
    background: #e5e7eb;
    color: #374151;
  }
  
  .toggles {
    padding: 1rem 1.25rem 1.25rem;
  }
  
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
  
  .toggle-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  /* Compact Toggle Switch */
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 2.5rem;
    height: 1.25rem;
    cursor: pointer;
  }
  
  .toggle-switch input {
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
    background: #d1d5db;
    border-radius: 1.25rem;
    transition: 0.3s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 1rem;
    width: 1rem;
    left: 0.125rem;
    bottom: 0.125rem;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  input:checked + .slider {
    background: #3b82f6;
  }
  
  input:checked + .slider:before {
    transform: translateX(1.25rem);
  }
  
  .slider:hover {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  /* Dark mode support */
  :global(.dark) .modal-content {
    background: #1f2937;
  }
  
  :global(.dark) .modal-header {
    border-color: #374151;
  }
  
  :global(.dark) .modal-header h3 {
    color: white;
  }
  
  :global(.dark) .close-button {
    color: #9ca3af;
  }
  
  :global(.dark) .close-button:hover {
    background: #374151;
    color: #d1d5db;
  }
  
  :global(.dark) .toggle-label {
    color: #d1d5db;
  }
  
  /* Mobile responsive */
  @media (max-width: 640px) {
    .modal-content {
      width: 280px;
    }
    
    .modal-header,
    .toggles {
      padding: 0.75rem 1rem;
    }
    
    .toggle-row {
      padding: 0.375rem 0;
    }
  }
</style>