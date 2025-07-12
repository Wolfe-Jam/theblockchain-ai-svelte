

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/invest/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/15.BL7e_GiS.js","_app/immutable/chunks/wGEaMokz.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = ["_app/immutable/assets/15.B_ydE7R3.css"];
export const fonts = [];
