/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{html,html.erb}', './client/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['OpenSans-Light', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/typography'),
  ],
};
