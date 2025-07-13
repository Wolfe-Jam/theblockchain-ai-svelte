

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/marketplace/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/marketplace/+page.ts";
export const imports = ["_app/immutable/nodes/18.BIsI3JuZ.js","_app/immutable/chunks/CLAyuAVz.js","_app/immutable/chunks/De0ZKw95.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/DAnga4wU.js","_app/immutable/chunks/cAYkZ4Pl.js","_app/immutable/chunks/D1A_43Wc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BGnBwZ9t.js","_app/immutable/chunks/GoZ3Soru.js","_app/immutable/chunks/BujhXouE.js"];
export const stylesheets = ["_app/immutable/assets/NOBSPayCompact.Debh-Mug.css","_app/immutable/assets/NOBSPay.QVCnqMvR.css","_app/immutable/assets/18.Bz5VfK53.css"];
export const fonts = [];
