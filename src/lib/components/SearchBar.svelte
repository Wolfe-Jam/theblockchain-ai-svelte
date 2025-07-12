<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { searchStore } from '$lib/search/store';
  import { createMockClaudeResponse } from '$lib/search/claude';
  import type { SearchMode } from '$lib/search/types';
  
  export let placeholder = "Search components or describe what you need...";
  export let showModeToggle = true;
  
  const dispatch = createEventDispatcher();
  
  let inputElement: HTMLInputElement;
  let showSuggestions = false;
  let suggestions: string[] = [];
  let selectedSuggestion = -1;
  
  $: query = $searchStore.query;
  $: mode = $searchStore.mode;
  $: isSearching = $searchStore.isSearching;
  
  // Example suggestions
  const exampleQueries = [
    "payment component",
    "data visualization",
    "authentication system",
    "form builder",
    "api integration"
  ];
  
  function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    searchStore.setQuery(value);
    
    // Show suggestions if input is focused and has value
    if (value.length > 0) {
      // Filter example queries based on input
      suggestions = exampleQueries.filter(q => 
        q.toLowerCase().includes(value.toLowerCase())
      );
      showSuggestions = suggestions.length > 0;
    } else {
      showSuggestions = false;
    }
  }
  
  function handleSearch() {
    if (query.trim()) {
      dispatch('search', { query, mode });
      showSuggestions = false;
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && selectedSuggestion === -1) {
      handleSearch();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedSuggestion = Math.min(selectedSuggestion + 1, suggestions.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedSuggestion = Math.max(selectedSuggestion - 1, -1);
    } else if (event.key === 'Enter' && selectedSuggestion >= 0) {
      selectSuggestion(suggestions[selectedSuggestion]);
    } else if (event.key === 'Escape') {
      showSuggestions = false;
      selectedSuggestion = -1;
    }
  }
  
  function selectSuggestion(suggestion: string) {
    searchStore.setQuery(suggestion);
    showSuggestions = false;
    selectedSuggestion = -1;
    handleSearch();
  }
  
  function setMode(newMode: SearchMode) {
    searchStore.setMode(newMode);
  }
  
  function handleFocus() {
    if (query.length > 0 && suggestions.length > 0) {
      showSuggestions = true;
    }
  }
  
  function handleBlur() {
    // Delay to allow click on suggestions
    setTimeout(() => {
      showSuggestions = false;
      selectedSuggestion = -1;
    }, 200);
  }
  
  // Focus input on mount
  onMount(() => {
    inputElement?.focus();
  });
</script>

<div class="search-container">
  <div class="search-wrapper">
    <!-- Search Input -->
    <div class="search-box">
      <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      <input
        bind:this={inputElement}
        type="text"
        value={query}
        {placeholder}
        on:input={handleInput}
        on:keydown={handleKeydown}
        on:focus={handleFocus}
        on:blur={handleBlur}
        class="search-input"
        class:searching={isSearching}
      />
      
      {#if query}
        <button 
          class="clear-button"
          on:click={() => searchStore.reset()}
          aria-label="Clear search"
        >
          ✕
        </button>
      {/if}
      
      <button 
        class="search-button"
        on:click={handleSearch}
        disabled={!query.trim() || isSearching}
      >
        {#if isSearching}
          <span class="spinner"></span>
        {:else}
          Search
        {/if}
      </button>
    </div>
    
    <!-- Suggestions Dropdown -->
    {#if showSuggestions}
      <div class="suggestions" transition:slide={{ duration: 200 }}>
        {#each suggestions as suggestion, i}
          <button
            class="suggestion"
            class:selected={i === selectedSuggestion}
            on:click={() => selectSuggestion(suggestion)}
          >
            <svg class="suggestion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {suggestion}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  
  <!-- Mode Toggle -->
  {#if showModeToggle}
    <div class="mode-toggle" transition:fade>
      <button
        class="mode-button"
        class:active={mode === 'traditional'}
        on:click={() => setMode('traditional')}
        title="Traditional keyword search"
      >
        <span class="mode-icon">🔍</span>
        Traditional
      </button>
      
      <button
        class="mode-button claude"
        class:active={mode === 'claude'}
        on:click={() => setMode('claude')}
        title="AI-powered semantic search"
      >
        <span class="mode-icon">🤖</span>
        Claude Smarts
      </button>
      
      <button
        class="mode-button"
        class:active={mode === 'hybrid'}
        on:click={() => setMode('hybrid')}
        title="Best of both search methods"
      >
        <span class="mode-icon">⚡</span>
        Hybrid
      </button>
    </div>
  {/if}
  
  <!-- Claude Insight (if in Claude mode) -->
  {#if mode === 'claude' && query}
    <div class="claude-insight" transition:slide>
      <div class="insight-header">
        <span class="claude-icon">🤖</span>
        <span>Claude understands:</span>
      </div>
      <p class="insight-text">
        {createMockClaudeResponse(query)}
      </p>
    </div>
  {/if}
</div>

<style>
  .search-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .search-wrapper {
    position: relative;
    width: 100%;
  }
  
  .search-box {
    display: flex;
    align-items: center;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    transition: all 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  :global(.dark) .search-box {
    background: #1a1a1a;
    border-color: #374151;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  
  .search-box:focus-within {
    border-color: #06b6d4; /* Cyan border on focus */
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
  
  .search-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #6b7280; /* Medium gray */
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
  
  :global(.dark) .search-icon {
    color: #9ca3af;
  }
  
  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #1f2937; /* Dark gray for light mode */
  }
  
  :global(.dark) .search-input {
    color: #f3f4f6; /* Light gray for dark mode */
  }
  
  .search-input::placeholder {
    color: #9ca3af; /* Medium gray for placeholders */
  }
  
  :global(.dark) .search-input::placeholder {
    color: #6b7280;
  }
  
  .search-input.searching {
    color: #9ca3af; /* Light gray when searching */
  }
  
  :global(.dark) .search-input.searching {
    color: #6b7280;
  }
  
  .clear-button {
    padding: 0.25rem;
    margin: 0 0.5rem;
    background: transparent;
    border: none;
    color: #6b7280; /* Medium gray for light mode */
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1;
    transition: color 0.2s;
  }
  
  :global(.dark) .clear-button {
    color: #9ca3af;
  }
  
  .clear-button:hover {
    color: #1f2937; /* Dark gray on hover */
  }
  
  :global(.dark) .clear-button:hover {
    color: #f3f4f6;
  }
  
  .search-button {
    padding: 0.5rem 1.5rem;
    background: #06b6d4; /* Cyan background */
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .search-button:hover:not(:disabled) {
    background: #0891b2; /* Darker cyan on hover */
    transform: translateY(-1px);
  }
  
  .search-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Suggestions dropdown */
  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 50;
  }
  
  :global(.dark) .suggestions {
    background: #1a1a1a;
    border-color: #374151;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }
  
  .suggestion {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background 0.1s;
    color: #1f2937; /* Dark gray text */
  }
  
  :global(.dark) .suggestion {
    color: #f3f4f6;
  }
  
  .suggestion:hover,
  .suggestion.selected {
    background: #f3f4f6;
  }
  
  :global(.dark) .suggestion:hover,
  :global(.dark) .suggestion.selected {
    background: #374151;
  }
  
  .suggestion-icon {
    width: 1rem;
    height: 1rem;
    color: #6b7280; /* Medium gray */
  }
  
  :global(.dark) .suggestion-icon {
    color: #9ca3af;
  }
  
  /* Mode Toggle */
  .mode-toggle {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: center;
  }
  
  .mode-button {
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280; /* Medium gray text */
  }
  
  :global(.dark) .mode-button {
    background: #1a1a1a;
    border-color: #374151;
    color: #9ca3af;
  }
  
  .mode-button:hover {
    background: #f3f4f6;
    border-color: #06b6d4;
    color: #1f2937;
  }
  
  :global(.dark) .mode-button:hover {
    background: #374151;
    border-color: #06b6d4;
    color: #f3f4f6;
  }
  
  .mode-button.active {
    background: #06b6d4;
    color: white;
    border-color: #06b6d4;
  }
  
  .mode-button.claude.active {
    background: #ea580c;
    border-color: #ea580c;
  }
  
  .mode-icon {
    font-size: 1rem;
  }
  
  /* Claude Insight */
  .claude-insight {
    margin-top: 1rem;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(234, 88, 12, 0.05), rgba(6, 182, 212, 0.05));
    border: 1px solid #ea580c;
    border-radius: 0.5rem;
  }
  
  .insight-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: #ea580c;
    margin-bottom: 0.5rem;
  }
  
  .claude-icon {
    font-size: 1.25rem;
  }
  
  .insight-text {
    color: #1f2937; /* Dark gray text */
    line-height: 1.6;
    margin: 0;
  }
  
  :global(.dark) .insight-text {
    color: #f3f4f6;
  }
  
  /* Mobile responsive */
  @media (max-width: 640px) {
    .search-box {
      padding: 0.5rem 0.75rem;
    }
    
    .search-button {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
    
    .mode-toggle {
      flex-wrap: wrap;
    }
    
    .mode-button {
      font-size: 0.75rem;
      padding: 0.375rem 0.75rem;
    }
  }
</style>