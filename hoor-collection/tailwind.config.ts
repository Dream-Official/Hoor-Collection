import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#1a1a1a',
        surface: '#141414',
        border: '#D4AF37',
        primary: {
          DEFAULT: '#D4AF37',
          foreground: '#0a0a0a',
        },
        gold: {
          50: '#fdf9ef',
          100: '#faf0d7',
          200: '#f4e0ae', // Light Gold
          300: '#eccb7b',
          400: '#e3b64a',
          500: '#D4AF37', // Pure Royal Gold
          600: '#b89424',
          700: '#96751e',
          800: '#785d1f',
          900: '#544012',
        },
        dark: {
          950: '#050505',
          900: '#0a0a0a', // Primary Background
          850: '#121212',
          800: '#1a1a1a', // Card Background
          700: '#262626',
          600: '#333333',
        },
        text: {
          primary: '#ffffff',
          secondary: '#cccccc',
          muted: '#888888',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 15px -3px rgba(212, 175, 55, 0.25)',
        'gold-md': '0 0 25px -5px rgba(212, 175, 55, 0.35)',
        'gold-lg': '0 0 40px -5px rgba(212, 175, 55, 0.45)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
      },
      animation: {
        pulseSlow: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
