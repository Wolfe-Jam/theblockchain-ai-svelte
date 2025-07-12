/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Error {
      message?: string;
      code?: string;
    }
    
    interface Locals {
      supabase: import('@supabase/supabase-js').SupabaseClient;
      getSession(): Promise<import('@supabase/supabase-js').Session | null>;
    }
    
    interface PageData {}
    
    interface Platform {}
  }
  
  // Database types
  interface Database {
    public: {
      Tables: {
        components: {
          Row: Component;
          Insert: Omit<Component, 'id' | 'created_at' | 'search_text'>;
          Update: Partial<Omit<Component, 'id' | 'created_at' | 'search_text'>>;
        };
        orders: {
          Row: Order;
          Insert: Omit<Order, 'id' | 'created_at'>;
          Update: Partial<Omit<Order, 'id' | 'created_at'>>;
        };
        search_analytics: {
          Row: SearchAnalytic;
          Insert: Omit<SearchAnalytic, 'id' | 'timestamp'>;
          Update: never;
        };
        ai_conversations: {
          Row: AIConversation;
          Insert: Omit<AIConversation, 'id' | 'timestamp'>;
          Update: never;
        };
      };
    };
  }
}

export {};
