const colors = require('./node_modules/tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        lime: colors.lime,
        orange: colors.orange,
        violet: colors.violet,
        amber: colors.amber,
      },
    },
  },
  variants: {
    extend: {},
    borderWidth: ['first', 'last'],
  },
  plugins: [],
}
