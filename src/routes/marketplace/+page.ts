import type { PageLoad } from './$types';

// This file enables TypeScript type checking for the page
export const load: PageLoad = async () => {
  // Data loading happens in the component for now
  // Will move to server-side when Supabase is configured
  return {
    title: 'bAI Marketplace - The Google of Digital Components'
  };
};
