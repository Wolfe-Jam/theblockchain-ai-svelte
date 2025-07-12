

export const index = 21;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/purchase-success/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/purchase-success/+page.ts";
export const imports = ["_app/immutable/nodes/21.MO23-99a.js","_app/immutable/chunks/wGEaMokz.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/BrDW2tfU.js","_app/immutable/chunks/DKl5Jh6K.js","_app/immutable/chunks/Dd42kC7b.js","_app/immutable/chunks/3c_aVfhB.js","_app/immutable/chunks/GoZ3Soru.js"];
export const stylesheets = ["_app/immutable/assets/21.CrTqzrYL.css"];
export const fonts = [];
