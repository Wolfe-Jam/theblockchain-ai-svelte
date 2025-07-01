// src/lib/version.js
import packageJson from '../../package.json';

export const version = packageJson.version;
export const appName = packageJson.name;
export const fullVersion = `v${version}`;

// Helper function to get formatted version for display
export const getVersionDisplay = () => {
  return `v${version}`;
};

// Helper function to get year for copyright
export const getCopyrightYear = () => {
  return new Date().getFullYear();
};
