/**
 * Search state management
 */

import { writable, derived } from 'svelte/store';
import type { SearchResult, SearchQuery, SearchSuggestion } from './types';

// Current search query
export const searchQuery = writable<string>('');

// Search mode (traditional, claude-smarts, hybrid)
export const searchMode = writable<SearchQuery['mode']>('hybrid');

// Search results
export const searchResults = writable<SearchResult[]>([]);

// Loading state
export const searchLoading = writable<boolean>(false);

// Error state
export const searchError = writable<string | null>(null);

// Search suggestions
export const searchSuggestions = writable<SearchSuggestion[]>([]);

// Recent searches (stored in localStorage)
export const recentSearches = writable<string[]>([]);

// Popular searches
export const popularSearches = writable<string[]>([
  'payment component',
  'authentication',
  'smart contracts',
  'blockchain tools',
  'AI integration'
]);

// Claude is thinking indicator
export const claudeThinking = writable<boolean>(false);

// Derived store for showing Claude explanation
export const showClaudeInsight = derived(
  [searchMode, searchResults],
  ([$mode, $results]) => {
    return $mode !== 'traditional' && $results.some(r => r.matchType === 'semantic');
  }
);

// Helper functions
export function clearSearch() {
  searchQuery.set('');
  searchResults.set([]);
  searchError.set(null);
  searchSuggestions.set([]);
}

export function addToRecentSearches(query: string) {
  recentSearches.update(searches => {
    const updated = [query, ...searches.filter(s => s !== query)].slice(0, 5);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
    return updated;
  });
}

// Load recent searches from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('recentSearches');
  if (saved) {
    recentSearches.set(JSON.parse(saved));
  }
}
