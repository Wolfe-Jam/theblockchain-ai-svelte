

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/download/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.BtIEDTKo.js","_app/immutable/chunks/wGEaMokz.js","_app/immutable/chunks/D0QH3NT1.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = ["_app/immutable/assets/8.BxKHVKXa.css"];
export const fonts = [];
