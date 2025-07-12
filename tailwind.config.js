/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode via class strategy
  darkMode: 'class',
  // Crucial: Tell Tailwind where your Svelte files are located
  content: ['./index.html', './src/**/*.{svelte,js,ts}'], 
  theme: {
    extend: {
      colors: {
        // Official Brand Colors - Use these for all graphics and brand elements
        'brand-blue': '#004AAE',      // Blockchain Blue - for trust/blockchain elements
        'brand-cyan': '#0CC0DF',      // Digital Turquoise - for users/CIA elements  
        'brand-orange': '#FF914D',    // Creative Orange - for developers/OUTPUT elements
        
        // Text Colors (Tailwind variants for readability)
        'brand-blue-text': '#2563EB',  // Blue-600 for readable text
        'brand-cyan-text': '#06B6D4',  // Cyan-500 for readable text
        'brand-orange-text': '#EA580C', // Orange-600 for readable text
      }
    },
  },
  plugins: [],
}
