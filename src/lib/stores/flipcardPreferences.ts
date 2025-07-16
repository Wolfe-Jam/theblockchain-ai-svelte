import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// FlipCard global preferences interface
export interface FlipCardPreferences {
  showPalette: boolean;
  showTags: boolean;
  showToolbar: boolean;
  showBuyButton: boolean;
}

// Default preferences
const defaultPreferences: FlipCardPreferences = {
  showPalette: true,
  showTags: true,
  showToolbar: true,
  showBuyButton: true
};

// Load preferences from localStorage
function loadPreferences(): FlipCardPreferences {
  if (!browser) return defaultPreferences;
  
  try {
    const saved = localStorage.getItem('flipcard-global-preferences');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultPreferences, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load FlipCard preferences:', error);
  }
  
  return defaultPreferences;
}

// Save preferences to localStorage
function savePreferences(preferences: FlipCardPreferences) {
  if (!browser) return;
  
  try {
    localStorage.setItem('flipcard-global-preferences', JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save FlipCard preferences:', error);
  }
}

// Create the store
export const flipcardPreferences = writable<FlipCardPreferences>(loadPreferences());

// Auto-save when preferences change
flipcardPreferences.subscribe((preferences) => {
  savePreferences(preferences);
});

// Helper functions
export const flipcardPreferencesActions = {
  toggle: (key: keyof FlipCardPreferences) => {
    flipcardPreferences.update(prefs => ({
      ...prefs,
      [key]: !prefs[key]
    }));
  },
  
  set: (key: keyof FlipCardPreferences, value: boolean) => {
    flipcardPreferences.update(prefs => ({
      ...prefs,
      [key]: value
    }));
  },
  
  reset: () => {
    flipcardPreferences.set(defaultPreferences);
  }
};
