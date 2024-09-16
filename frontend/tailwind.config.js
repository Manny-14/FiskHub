/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fiskBlue: '#102F68',
        lightFiskBlue: '#1A4A8C',
        gold: '#ffc72c',
        goldGray: '#d8b96f',
        teal: '#008080',
        softPurple: '#8a2be2',
        lightGray: '#f5f5f5',
        coral: '#ff6f61',
        loginGreen: '#30cccb',
      },
    },
  },
  plugins: [],
}

