

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/marketplace/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/marketplace/+page.ts";
export const imports = ["_app/immutable/nodes/18.DHQsZgdf.js","_app/immutable/chunks/wGEaMokz.js","_app/immutable/chunks/ROyfO13p.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/DKl5Jh6K.js","_app/immutable/chunks/Dd42kC7b.js","_app/immutable/chunks/BSOS7gUW.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DmZ3cl-o.js","_app/immutable/chunks/3c_aVfhB.js","_app/immutable/chunks/GoZ3Soru.js"];
export const stylesheets = ["_app/immutable/assets/NOBSPay.Dy9yW3JK.css","_app/immutable/assets/18.BIsA1iBz.css"];
export const fonts = [];
