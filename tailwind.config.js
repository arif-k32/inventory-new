/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}",  'node_modules/preline/dist/*.js',],
  theme: {
    extend: {
        backgroundImage:{
          "login":"url('/assets/login.jpg')",
          "register":"url('/assets/register.jpg')",
          "dashboard":"url('/assets/dashboard.avif')",
          "notFound":"url('/assets/404.jpg')"
        }
    },
  },
  plugins: [require('preline/plugin'),],
}
