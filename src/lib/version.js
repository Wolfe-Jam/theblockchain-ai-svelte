// src/lib/version.js
// Static version info (auto-updated by scripts/update-version.js)
const packageInfo = {
  version: "1.2.0",
  name: "my-theblockchain-ai-app"
};

export const version = packageInfo.version;
export const appName = packageInfo.name;
export const fullVersion = `v${version}`;

// Helper function to get formatted version for display
export const getVersionDisplay = () => {
  return `v${version}`;
};

// Helper function to get year for copyright
export const getCopyrightYear = () => {
  return new Date().getFullYear();
};
