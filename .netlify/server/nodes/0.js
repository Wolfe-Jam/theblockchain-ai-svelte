

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BlQ1JOm0.js","_app/immutable/chunks/wGEaMokz.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/biZ6NcfX.js","_app/immutable/chunks/BrDW2tfU.js","_app/immutable/chunks/DKl5Jh6K.js","_app/immutable/chunks/Dd42kC7b.js","_app/immutable/chunks/CXK6gqZ_.js","_app/immutable/chunks/ROyfO13p.js","_app/immutable/chunks/3c_aVfhB.js","_app/immutable/chunks/GoZ3Soru.js","_app/immutable/chunks/DkBJzAqR.js","_app/immutable/chunks/vK_o3JBb.js","_app/immutable/chunks/ChmBSD1t.js","_app/immutable/chunks/CxciCft3.js"];
export const stylesheets = ["_app/immutable/assets/Header.B7rB7rKb.css","_app/immutable/assets/SerenityBoat.CwNT3NFK.css","_app/immutable/assets/AskAIModal.CP2O72Cg.css","_app/immutable/assets/0.LCaG0zL-.css"];
export const fonts = [];
