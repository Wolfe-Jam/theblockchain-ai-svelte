/**
 * Core Search Engine
 * Handles traditional text-based component searching
 */
import type { Component } from '$lib/marketplace/types';
import type { SearchResult, SearchQuery } from './types';

export class SearchEngine {
  private components: Component[] = [];
  
  constructor(components: Component[]) {
    this.components = components;
  }
  
  /**
   * Traditional keyword search
   */
  search(query: SearchQuery): SearchResult[] {
    const searchTerm = query.query.toLowerCase().trim();
    if (!searchTerm) return [];
    
    const results: SearchResult[] = [];
    
    for (const component of this.components) {
      const relevance = this.calculateRelevance(component, searchTerm);
      
      if (relevance > 0) {
        results.push({
          id: component.id,
          name: component.name,
          description: component.description,
          relevance,
          matchType: relevance === 100 ? 'exact' : 'partial',
          highlights: this.getHighlights(component, searchTerm)
        });
      }
    }
    
    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    
    // Apply limit if specified
    if (query.limit) {
      return results.slice(0, query.limit);
    }
    
    return results;
  }
  
  /**
   * Calculate relevance score (0-100)
   */
  private calculateRelevance(component: Component, searchTerm: string): number {
    let score = 0;
    
    // Exact name match - highest score
    if (component.name.toLowerCase() === searchTerm) {
      return 100;
    }
    
    // Name contains search term
    if (component.name.toLowerCase().includes(searchTerm)) {
      score += 50;
    }
    
    // Check description
    if (component.description.toLowerCase().includes(searchTerm)) {
      score += 30;
    }
    
    // Check tags
    if (component.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
      score += 40;
    }
    
    // Check keywords
    if (component.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))) {
      score += 35;
    }
    
    // Check taglines
    if (component.tagline?.toLowerCase().includes(searchTerm)) {
      score += 25;
    }
    
    if (component.consumer_tagline?.toLowerCase().includes(searchTerm)) {
      score += 20;
    }
    
    // Check category
    if (component.category.toLowerCase().includes(searchTerm)) {
      score += 15;
    }
    
    return Math.min(score, 99); // Cap at 99 for non-exact matches
  }
  
  /**
   * Get text highlights for search results
   */
  private getHighlights(component: Component, searchTerm: string): string[] {
    const highlights: string[] = [];
    
    // Helper to extract context around match
    const extractContext = (text: string, term: string): string => {
      const index = text.toLowerCase().indexOf(term);
      if (index === -1) return '';
      
      const start = Math.max(0, index - 20);
      const end = Math.min(text.length, index + term.length + 20);
      
      return '...' + text.slice(start, end) + '...';
    };
    
    // Check various fields
    if (component.description.toLowerCase().includes(searchTerm)) {
      highlights.push(extractContext(component.description, searchTerm));
    }
    
    if (component.tagline?.toLowerCase().includes(searchTerm)) {
      highlights.push(extractContext(component.tagline, searchTerm));
    }
    
    return highlights.slice(0, 2); // Max 2 highlights
  }
  
  /**
   * Get search suggestions based on partial input
   */
  getSuggestions(partial: string, limit = 5): string[] {
    const suggestions = new Set<string>();
    const term = partial.toLowerCase();
    
    // Collect from component names
    this.components.forEach(component => {
      if (component.name.toLowerCase().startsWith(term)) {
        suggestions.add(component.name);
      }
    });
    
    // Collect from tags
    this.components.forEach(component => {
      component.tags.forEach(tag => {
        if (tag.toLowerCase().startsWith(term)) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, limit);
  }
}
