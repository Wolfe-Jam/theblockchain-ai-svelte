

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/invest/dashboard/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/invest/dashboard/+page.js";
export const imports = ["_app/immutable/nodes/16.B6o2l5pB.js","_app/immutable/chunks/CLAyuAVz.js","_app/immutable/chunks/De0ZKw95.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/BcRLPyWF.js","_app/immutable/chunks/cAYkZ4Pl.js","_app/immutable/chunks/vK_o3JBb.js","_app/immutable/chunks/GoZ3Soru.js","_app/immutable/chunks/DAnga4wU.js"];
export const stylesheets = ["_app/immutable/assets/16.CSNWQaPH.css"];
export const fonts = [];
