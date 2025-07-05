import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-static configuration for static site generation
		adapter: adapter({
			// default options
			pages: 'dist',
			assets: 'dist',
			fallback: null,
			precompress: false,
			strict: true
		}),
		
		// Configure routing
		files: {
			routes: 'src/routes'
		},
		
		// Prerender all routes for static deployment
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: 'warn'
		}
	}
};

export default config;
