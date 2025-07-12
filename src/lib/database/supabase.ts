import { createClient } from '@supabase/supabase-js';
import type { Database } from '$app/types';

// These will come from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is properly configured
const isSupabaseConfigured = 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder-key' &&
  supabaseUrl !== 'your-project-url' &&
  !supabaseUrl.includes('your-project');

if (!isSupabaseConfigured) {
  console.warn('Supabase is not configured. Using mock data for development.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Export configuration status
export { isSupabaseConfigured };

// Helper to handle Supabase errors
export function handleSupabaseError(error: any): string {
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

// Type guards for our domain models
export function isComponent(obj: any): obj is Component {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}

export function isOrder(obj: any): obj is Order {
  return obj && typeof obj.id === 'string' && typeof obj.total_amount === 'number';
}

// Re-export types for convenience
export type { Database } from '$app/types';
export * from '$lib/marketplace/types';
