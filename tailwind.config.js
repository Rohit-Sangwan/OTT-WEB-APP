/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'netflix-black': '#141414',
        'netflix-dark': '#181818',
        'netflix-gray': '#808080',
        'netflix-light-gray': '#E5E5E5',
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)',
      },
    },
  },
  plugins: [],
} 