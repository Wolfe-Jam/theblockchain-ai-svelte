/**
 * Search Store
 * Manages search state and results
 */
import { writable, derived } from 'svelte/store';
import type { SearchResult, SearchMode, ClaudeSearchResponse } from './types';

interface SearchState {
  query: string;
  mode: SearchMode;
  isSearching: boolean;
  results: SearchResult[];
  claudeResponse?: ClaudeSearchResponse;
  error?: string;
  showClaudeInsight: boolean;
}

function createSearchStore() {
  const { subscribe, set, update } = writable<SearchState>({
    query: '',
    mode: 'hybrid',
    isSearching: false,
    results: [],
    showClaudeInsight: false
  });
  
  return {
    subscribe,
    setQuery: (query: string) => update(state => ({ ...state, query })),
    setMode: (mode: SearchMode) => update(state => ({ ...state, mode })),
    setSearching: (isSearching: boolean) => update(state => ({ ...state, isSearching })),
    setResults: (results: SearchResult[], claudeResponse?: ClaudeSearchResponse) => 
      update(state => ({ 
        ...state, 
        results, 
        claudeResponse,
        error: undefined 
      })),
    setError: (error: string) => update(state => ({ ...state, error, results: [] })),
    toggleClaudeInsight: () => update(state => ({ 
      ...state, 
      showClaudeInsight: !state.showClaudeInsight 
    })),
    reset: () => set({
      query: '',
      mode: 'hybrid',
      isSearching: false,
      results: [],
      showClaudeInsight: false
    })
  };
}

export const searchStore = createSearchStore();

// Derived stores for convenience
export const searchQuery = derived(searchStore, $store => $store.query);
export const searchResults = derived(searchStore, $store => $store.results);
export const isSearching = derived(searchStore, $store => $store.isSearching);
export const hasResults = derived(searchStore, $store => $store.results.length > 0);
