/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    '!duration-0',
    '!delay-0',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ],
  content: { 
    transform: (content) => ["../{remix,ui}/**/*.{js,ts,jsx,tsx}", content.replace(/taos:/g, '')] },
  theme: {
    extend: {},
  },
  plugins: [
    require('taos/plugin')
  ],
};
