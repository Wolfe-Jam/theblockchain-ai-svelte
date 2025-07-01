import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  
  // Component development guidelines for brand compliance:
  // - Use exact brand hex codes for graphics: #004AAE, #0CC0DF, #FF914D
  // - Use Tailwind text variants for typography readability
  // - Reference _BrandCompliantTemplate.svelte for new components
  // - See docs/SVELTE-BRAND-COMPLIANCE.md for full guidelines
}
