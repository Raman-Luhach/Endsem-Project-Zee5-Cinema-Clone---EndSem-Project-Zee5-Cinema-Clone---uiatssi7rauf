/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color:{
        customPurple: '#9900CE',
      },
      borderColor: {
        customPurple: '#9900CE',
      },
      backgroundColor: {
        customPurple: '#9900CE',
      },
    },
  },
  plugins: [],
}
