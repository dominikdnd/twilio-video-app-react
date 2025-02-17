module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: '#E60037',
        grayish: '#F5F7FB',
        purple: "#821B82",
        orange: "#F7A70A",
        green: "#25BA0E",
        "dark-blue": "#354052",
      },
    },
    variants: {
      extend: {
        scale: ['group-focus']
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
}
