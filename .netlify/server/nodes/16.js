

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/invest/dashboard/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/invest/dashboard/+page.js";
export const imports = ["_app/immutable/nodes/16.DweXeRC4.js","_app/immutable/chunks/wGEaMokz.js","_app/immutable/chunks/ROyfO13p.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/ChmBSD1t.js","_app/immutable/chunks/Dd42kC7b.js","_app/immutable/chunks/vK_o3JBb.js","_app/immutable/chunks/GoZ3Soru.js","_app/immutable/chunks/DKl5Jh6K.js"];
export const stylesheets = ["_app/immutable/assets/16.CSNWQaPH.css"];
export const fonts = [];
