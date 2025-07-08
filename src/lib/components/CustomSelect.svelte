<!-- Custom Select Component - Replaces problematic browser selects -->
<script>
  export let options = [];
  export let value = '';
  export let placeholder = 'Select...';
  export let name = '';
  export let id = '';
  export let required = false;
  
  let isOpen = false;
  let selectedLabel = '';
  
  // Find selected option label
  $: {
    const selected = options.find(opt => opt.value === value);
    selectedLabel = selected ? selected.label : '';
  }
  
  function selectOption(option) {
    value = option.value;
    isOpen = false;
  }
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={() => isOpen = false} on:keydown={handleKeydown} />

<div class="custom-select" class:open={isOpen}>
  <!-- Hidden input for form submission -->
  <input type="hidden" {name} {id} bind:value />
  
  <!-- Visual dropdown -->
  <button 
    type="button"
    class="select-button"
    class:has-value={value}
    on:click|stopPropagation={toggleDropdown}
    aria-expanded={isOpen}
  >
    <span class="selected-text">
      {selectedLabel || placeholder}
    </span>
    <i class="fas fa-chevron-down arrow" class:rotated={isOpen}></i>
  </button>
  
  {#if isOpen}
    <div class="dropdown-menu" on:click|stopPropagation>
      {#each options as option}
        <button
          type="button"
          class="dropdown-item"
          class:selected={option.value === value}
          on:click={() => selectOption(option)}
        >
          {option.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .custom-select {
    position: relative;
    width: 100%;
  }
  
  .select-button {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #475569;
    border-radius: 0.5rem;
    background-color: #334155;
    color: #f1f5f9;
    font-size: 0.875rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    transition: all 0.2s;
  }
  
  .select-button:hover,
  .select-button:focus {
    border-color: #0CC0DF;
    outline: none;
  }
  
  .select-button.has-value {
    color: #f1f5f9;
  }
  
  .selected-text {
    flex: 1;
    color: inherit;
  }
  
  .arrow {
    transition: transform 0.2s;
    color: #94a3b8;
  }
  
  .arrow.rotated {
    transform: rotate(180deg);
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #334155;
    border: 1px solid #475569;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .dropdown-item {
    width: 100%;
    padding: 0.75rem;
    border: none;
    background: none;
    color: #f1f5f9;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .dropdown-item:hover {
    background-color: #475569;
  }
  
  .dropdown-item.selected {
    background-color: #0CC0DF;
    color: #0f172a;
  }
</style>
