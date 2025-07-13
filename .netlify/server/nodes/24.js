import * as universal from '../entries/pages/tools/_page.js';

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tools/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/tools/+page.js";
export const imports = ["_app/immutable/nodes/24.BcbeiQVI.js","_app/immutable/chunks/CLAyuAVz.js","_app/immutable/chunks/D0QH3NT1.js","_app/immutable/chunks/De0ZKw95.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = ["_app/immutable/assets/24.Q4UCSHPa.css"];
export const fonts = [];
