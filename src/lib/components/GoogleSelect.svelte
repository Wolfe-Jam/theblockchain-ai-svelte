<!-- Google-Style Searchable Dropdown -->
<script>
  export let options = [];
  export let value = '';
  export let placeholder = 'Select...';
  export let name = '';
  export let id = '';
  export let required = false;
  
  let isOpen = false;
  let searchTerm = '';
  let selectedLabel = '';
  let inputElement;
  let dropdownElement;
  
  // Filter options based on search
  $: filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Find selected option label
  $: {
    const selected = options.find(opt => opt.value === value);
    selectedLabel = selected ? selected.label : '';
    // Update search term to show selected value when closed
    if (!isOpen && selectedLabel) {
      searchTerm = selectedLabel;
    }
  }
  
  function openDropdown() {
    isOpen = true;
    searchTerm = ''; // Clear for searching
    setTimeout(() => inputElement?.focus(), 0);
  }
  
  function closeDropdown() {
    isOpen = false;
    searchTerm = selectedLabel; // Restore selected value
  }
  
  function selectOption(option) {
    value = option.value;
    selectedLabel = option.label;
    searchTerm = option.label;
    isOpen = false;
    inputElement?.blur();
  }
  
  function handleInputClick() {
    if (!isOpen) {
      openDropdown();
    }
  }
  
  function handleInputFocus() {
    openDropdown();
  }
  
  function handleInputBlur() {
    // Delay to allow option click
    setTimeout(() => {
      closeDropdown();
    }, 150);
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeDropdown();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (filteredOptions.length > 0) {
        selectOption(filteredOptions[0]);
      }
    }
  }
  
  // Click outside to close
  function handleOutsideClick(event) {
    if (dropdownElement && !dropdownElement.contains(event.target)) {
      closeDropdown();
    }
  }
</script>

<svelte:window on:click={handleOutsideClick} />

<div class="google-select" bind:this={dropdownElement}>
  <!-- Hidden input for form submission -->
  <input type="hidden" {name} {id} bind:value />
  
  <!-- Search input (looks like dropdown) -->
  <div class="select-container" class:open={isOpen} class:has-value={value}>
    <input
      bind:this={inputElement}
      bind:value={searchTerm}
      class="select-input"
      class:placeholder-style={!value}
      {placeholder}
      readonly={!isOpen}
      on:click={handleInputClick}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur}
      on:keydown={handleKeydown}
      autocomplete="off"
    />
    <div class="select-arrow" class:rotated={isOpen}>
      <i class="fas fa-chevron-down"></i>
    </div>
  </div>
  
  <!-- Dropdown options -->
  {#if isOpen && filteredOptions.length > 0}
    <div class="dropdown-menu">
      {#each filteredOptions as option}
        <button
          type="button"
          class="dropdown-option"
          class:selected={option.value === value}
          on:mousedown={() => selectOption(option)}
        >
          <span class="option-text">{option.label}</span>
          {#if option.value === value}
            <i class="fas fa-check option-check"></i>
          {/if}
        </button>
      {/each}
    </div>
  {:else if isOpen && searchTerm && filteredOptions.length === 0}
    <div class="dropdown-menu">
      <div class="no-results">No results found</div>
    </div>
  {/if}
</div>

<style>
  .google-select {
    position: relative;
    width: 100%;
  }
  
  .select-container {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #475569;
    border-radius: 0.5rem;
    background-color: #334155;
    transition: all 0.2s ease;
    overflow: hidden;
  }
  
  .select-container:hover {
    border-color: #64748b;
  }
  
  .select-container.open {
    border-color: #0CC0DF;
    box-shadow: 0 0 0 3px rgba(12, 192, 223, 0.1);
  }
  
  .select-input {
    flex: 1;
    padding: 0.75rem;
    border: none;
    background: transparent;
    color: #f1f5f9;
    font-size: 0.875rem;
    outline: none;
    cursor: pointer;
  }
  
  .select-input.placeholder-style {
    color: #94a3b8;
  }
  
  .select-input:focus {
    cursor: text;
  }
  
  .select-input[readonly] {
    cursor: pointer;
  }
  
  .select-arrow {
    padding: 0.75rem;
    color: #94a3b8;
    transition: transform 0.2s ease;
    pointer-events: none;
  }
  
  .select-arrow.rotated {
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 2px;
  }
  
  .dropdown-option {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border: none;
    background: none;
    color: #f1f5f9;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .dropdown-option:hover {
    background-color: #475569;
  }
  
  .dropdown-option.selected {
    background-color: rgba(12, 192, 223, 0.1);
    color: #0CC0DF;
  }
  
  .option-text {
    flex: 1;
  }
  
  .option-check {
    color: #0CC0DF;
    font-size: 0.875rem;
  }
  
  .no-results {
    padding: 0.75rem;
    color: #94a3b8;
    font-style: italic;
    text-align: center;
  }
  
  /* Scrollbar styling */
  .dropdown-menu::-webkit-scrollbar {
    width: 6px;
  }
  
  .dropdown-menu::-webkit-scrollbar-track {
    background: #334155;
  }
  
  .dropdown-menu::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 3px;
  }
  
  .dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }
</style>
