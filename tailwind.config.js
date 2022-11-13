module.exports = {
  content: [    "./index.html",    "./src/**/*.{vue,js,ts,jsx,tsx}",  ],
  darkMode: 'class', // enabled
  theme: {
    extend: {
      colors: {
        void: {
          100: '#afc0d5',
          200: '#9bacc1',
          300: '#8798ad',
          400: '#738499',
          500: '#5f7085',
          600: '#4b5c71',
          700: '#37485d',
          800: '#233449',
          900: '#0f2035'
        },
        azshara: {
          100: '#aecfd5',
          200: '#9abbc1',
          300: '#86a7ad',
          400: '#729399',
          500: '#5e7f85',
          600: '#4a6b71',
          700: '#36575d',
          800: '#224349',
          900: '#0e2f35'
        }
      }
    },
  },
  plugins: [],
}
