

export const index = 21;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/purchase-success/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/purchase-success/+page.ts";
export const imports = ["_app/immutable/nodes/21.3fk2XTEh.js","_app/immutable/chunks/CLAyuAVz.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/D4fAQNn_.js","_app/immutable/chunks/DAnga4wU.js","_app/immutable/chunks/cAYkZ4Pl.js","_app/immutable/chunks/BGnBwZ9t.js","_app/immutable/chunks/GoZ3Soru.js"];
export const stylesheets = ["_app/immutable/assets/21.CrTqzrYL.css"];
export const fonts = [];
