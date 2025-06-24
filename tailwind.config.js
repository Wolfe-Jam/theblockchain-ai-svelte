/** @type {import('tailwindcss').Config} */
module.exports = {
  // Crucial: Tell Tailwind where your Svelte files are located
  content: ['./index.html', './src/**/*.{svelte,js,ts}'], 
  theme: {
    extend: {
      colors: {
        // Define your brand colors directly in Tailwind config for easy use
        'brand-blue': '#004AAE',
        'brand-cyan': '#0CC0DF',
        'brand-orange': '#FF914D',
      }
    },
  },
  plugins: [],
}
