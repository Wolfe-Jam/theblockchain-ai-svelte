/**
 * Search Engine Types
 * Defines the structure for both traditional and AI-powered search
 */

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  relevance: number;
  matchType: 'exact' | 'partial' | 'ai-suggested' | 'semantic';
  highlights?: string[];
  reason?: string; // Why Claude thinks this matches
}

export interface SearchQuery {
  query: string;
  mode: 'traditional' | 'claude' | 'hybrid';
  filters?: {
    category?: string;
    priceRange?: [number, number];
    tags?: string[];
  };
  limit?: number;
}

export interface ClaudeSearchResponse {
  results: SearchResult[];
  interpretation: string; // What Claude understood
  suggestions?: string[]; // Alternative queries
  confidence: number;
}

export type SearchMode = 'traditional' | 'claude' | 'hybrid';
