// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' for media-query based dark mode

  content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.{js,ts,jsx,tsx}',
],
  theme: {
    extend: {
      colors: {
        white : '#ffffff',
        gray:{
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            500: '#6b7280',
            700: '#374151',
            800: '#1f2937',
        },
        blue:{
            200: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
        },
        "dark-bg": "#101214",
        "dark-secondary": "#1d1f21",
        "dark-tertiary": "#3b3d40",
        "blue-primary": "#0275ff",
        "stroke-dark": "#2d3135",
      },
    },
  },
  plugins: [],
}

export default config
