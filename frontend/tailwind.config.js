/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0B2545',
          navyDark: '#07162C',
          blue: '#134074',
          blueLight: '#EEF4F8',
          saffron: '#D97706',
          saffronLight: '#FEF3C7',
          green: '#15803D',
          greenLight: '#DCFCE7',
          gray: '#F8FAFC',
          border: '#CBD5E1',
          gold: '#B45309',
          tirangaOrange: '#FF671F',
          tirangaGreen: '#046A38',
          ashokaNavy: '#000080',
          portalCyan: '#0284C7',
          portalPurple: '#7C3AED',
          portalRose: '#E11D48',
          portalAmber: '#F59E0B'
        }
      }
    },
  },
  plugins: [],
}
