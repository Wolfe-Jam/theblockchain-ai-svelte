import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Using Netlify adapter for proper deployment v3
		adapter: adapter({
			// Use edge functions for better routing
			edge: false,
			// Split into individual functions for better debugging
			split: false
		})
	}
};

export default config;