

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Bxj0Jmwz.js","_app/immutable/chunks/CLAyuAVz.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/Bf5y6M9l.js","_app/immutable/chunks/D4fAQNn_.js","_app/immutable/chunks/DAnga4wU.js","_app/immutable/chunks/cAYkZ4Pl.js","_app/immutable/chunks/BUxJ48J1.js","_app/immutable/chunks/De0ZKw95.js","_app/immutable/chunks/BGnBwZ9t.js","_app/immutable/chunks/GoZ3Soru.js","_app/immutable/chunks/BzyiNlg9.js","_app/immutable/chunks/vK_o3JBb.js","_app/immutable/chunks/BcRLPyWF.js","_app/immutable/chunks/DuC6Oml-.js"];
export const stylesheets = ["_app/immutable/assets/Header.B7rB7rKb.css","_app/immutable/assets/SerenityBoat.CwNT3NFK.css","_app/immutable/assets/AskAIModal.CP2O72Cg.css","_app/immutable/assets/0.uY3ed6kg.css"];
export const fonts = [];
