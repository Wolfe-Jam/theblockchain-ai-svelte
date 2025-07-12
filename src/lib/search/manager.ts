/**
 * Unified Search Manager
 * Combines traditional search with Claude AI capabilities
 */
import { SearchEngine } from './engine';
import { ClaudeSearch } from './claude';
import type { Component } from '$lib/marketplace/types';
import type { SearchQuery, SearchResult, ClaudeSearchResponse, SearchMode } from './types';

export class SearchManager {
  private searchEngine: SearchEngine;
  private claudeSearch: ClaudeSearch;
  
  constructor(components: Component[]) {
    this.searchEngine = new SearchEngine(components);
    this.claudeSearch = new ClaudeSearch(components);
  }
  
  /**
   * Main search method - routes to appropriate search type
   */
  async search(query: SearchQuery): Promise<{
    traditional: SearchResult[];
    claude?: ClaudeSearchResponse;
    combined: SearchResult[];
    mode: SearchMode;
  }> {
    const mode = query.mode || 'hybrid';
    
    switch (mode) {
      case 'traditional':
        const traditional = this.searchEngine.search(query);
        return {
          traditional,
          combined: traditional,
          mode: 'traditional'
        };
        
      case 'claude':
        const claudeResponse = await this.claudeSearch.searchWithClaude(query.query);
        return {
          traditional: [],
          claude: claudeResponse,
          combined: claudeResponse.results,
          mode: 'claude'
        };
        
      case 'hybrid':
      default:
        // Run both searches in parallel
        const [tradResults, aiResults] = await Promise.all([
          Promise.resolve(this.searchEngine.search(query)),
          this.claudeSearch.searchWithClaude(query.query)
        ]);
        
        // Combine and deduplicate results
        const combined = this.combineResults(tradResults, aiResults.results);
        
        return {
          traditional: tradResults,
          claude: aiResults,
          combined,
          mode: 'hybrid'
        };
    }
  }
  
  /**
   * Get search suggestions for autocomplete
   */
  getSuggestions(partial: string): string[] {
    return this.searchEngine.getSuggestions(partial);
  }
  
  /**
   * Combine traditional and AI results intelligently
   */
  private combineResults(traditional: SearchResult[], ai: SearchResult[]): SearchResult[] {
    const resultMap = new Map<string, SearchResult>();
    
    // Add traditional results first (they're more precise)
    traditional.forEach(result => {
      resultMap.set(result.id, result);
    });
    
    // Add AI results, boosting if already present
    ai.forEach(aiResult => {
      if (resultMap.has(aiResult.id)) {
        // Boost relevance if found by both methods
        const existing = resultMap.get(aiResult.id)!;
        existing.relevance = Math.min(100, existing.relevance + 10);
        existing.matchType = 'exact'; // Upgrade match type
        if (aiResult.reason) {
          existing.reason = aiResult.reason;
        }
      } else {
        resultMap.set(aiResult.id, aiResult);
      }
    });
    
    // Convert to array and sort by relevance
    return Array.from(resultMap.values())
      .sort((a, b) => b.relevance - a.relevance);
  }
}

/**
 * Create a search manager instance with current components
 */
export function createSearchManager(components: Component[]): SearchManager {
  return new SearchManager(components);
}
