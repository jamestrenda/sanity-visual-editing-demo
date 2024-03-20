/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // tailwind colors using #1D35B4 as the 500 variant
        'primary-blue': {
          50: '#f0f2ff',
          100: '#d9dbff',
          200: '#b3b7ff',
          300: '#8d93ff',
          400: '#4d56ff',
          500: '#1D35B4',
          600: '#1a309e',
          700: '#162885',
          800: '#121e6b',
          900: '#0f1858',
        },
        // tailwind colors using #FF8F00 as the 500 variant
        'primary-orange': {
          50: '#fffaf3',
          100: '#fff2d9',
          200: '#ffdfb3',
          300: '#ffcc8d',
          400: '#ffa14d',
          500: '#FF8F00',
          600: '#e67f00',
          700: '#cc6f00',
          800: '#b35f00',
          900: '#994f00',
        },
        // tailwind colors using #1C2226 as the 500 variant
        'primary-dark': {
          50: '#f2f4f5',
          100: '#e6e9eb',
          200: '#bfbfbf',
          300: '#999999',
          400: '#4d4d4d',
          500: '#1C2226',
          600: '#1a1f23',
          700: '#16191c',
          800: '#131517',
          900: '#101214',
        },
        // tailnd colors using ##11E45E as the 500 variant
        'secondary-green': {
          50: '#f0fff4',
          100: '#ccf9e1',
          200: '#99f2c2',
          300: '#5de49e',
          400: '#2ee680',
          500: '#11E45E',
          600: '#0fd94d',
          700: '#0ccf3d',
          800: '#0ac52d',
          900: '#08b822',
        },
        // tailwind colors using #FFBB00 as the 500 variant
        'secondary-yellow': {
          50: '#fffdf0',
          100: '#fff8cc',
          200: '#fff299',
          300: '#ffed66',
          400: '#ffe933',
          500: '#FFBB00',
          600: '#e6a900',
          700: '#cc9900',
          800: '#b38a00',
          900: '#997b00',
        },
        ...defaultTheme.colors,
      },
      fontFamily: {
        montserrat: [
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
