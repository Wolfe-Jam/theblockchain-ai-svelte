import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		sourcemap: false,  // 🔒 Disable source maps in production
		minify: true,      // 🔒 Minify to obfuscate code
		rollupOptions: {
			output: {
				manualChunks: undefined // 🔒 Prevent chunk analysis
			}
		}
	},
	server: {
		host: false,       // 🔒 Don't expose dev server externally
		cors: false        // 🔒 Disable CORS in development
	}
});