module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ede9fe', // soft purple
          DEFAULT: '#a78bfa', // accent purple
          dark: '#7c3aed', // deep accent
        },
        accent: {
          light: '#f0fdfa', // soft teal
          DEFAULT: '#2dd4bf', // accent teal
          dark: '#0d9488',
        },
        background: '#f8f7fc', // very light background
        surface: '#ffffff',
        muted: '#a1a1aa',
      },
      fontFamily: {
        sans: ['Poppins', 'Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 