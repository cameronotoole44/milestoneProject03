/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bona-nova-sc': ['"Bona Nova SC"', 'serif'],
      },
      colors: {
        'background': '#181D27',
        'palette-1': {
          yellow: '#FFFD98',
          lightGreen: '#BDE4A7',
          green: '#B3D2B2',
          lightBlue: '#9FBBCC',
          blue: '#7A9CC6',
        },
        'palette-2': {
          orange: '#F06543',
          lightGray: '#E8E9EB',
          beige: '#E0DFD5',
          darkGray: '#313638',
          lightOrange: '#F09D51',
        },
        'palette-3': {
          darkBlue: '#0B2027',
          blue: '#40798C',
          teal: '#70A9A1',
          lightGreen: '#CFD7C7',
          cream: '#F6F1D1',
        },
        'palette-4': {
          peach: '#FFEAD0',
          pink: '#F76F8E',
          mauve: '#96616B',
          slate: '#37505C',
          darkTeal: '#113537',
        },
        'palette-5': {
          navy: '#052F5F',
          darkBlue: '#005377',
          teal: '#06A77D',
          gold: '#D5C67A',
          orange: '#F1A208',
        },
        'palette-6': {
          lightGreen: '#D0DB97',
          green: '#69B578',
          darkGreen: '#3A7D44',
          darkerGreen: '#254D32',
          darkBackground: '#181D27',
        },
      },
    },
  },
  plugins: [],
}