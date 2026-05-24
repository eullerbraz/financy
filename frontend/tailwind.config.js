/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        /* Palette from image mapped to CSS variables */
        brand: {
          dark: 'var(--brand-dark)',
          DEFAULT: 'var(--brand-base)',
        },
        gray: {
          800: 'var(--gray-800)',
          700: 'var(--gray-700)',
          600: 'var(--gray-600)',
          500: 'var(--gray-500)',
          400: 'var(--gray-400)',
          300: 'var(--gray-300)',
          200: 'var(--gray-200)',
          100: 'var(--gray-100)',
        },
        neutral: {
          black: 'var(--black)',
          white: 'var(--white)',
        },
        feedback: {
          danger: 'var(--danger)',
          success: 'var(--success)',
        },
        blue: {
          dark: 'var(--blue-dark)',
          DEFAULT: 'var(--blue-base)',
          light: 'var(--blue-light)',
        },
        purple: {
          dark: 'var(--purple-dark)',
          DEFAULT: 'var(--purple-base)',
          light: 'var(--purple-light)',
        },
        pink: {
          dark: 'var(--pink-dark)',
          DEFAULT: 'var(--pink-base)',
          light: 'var(--pink-light)',
        },
        red: {
          dark: 'var(--red-dark)',
          DEFAULT: 'var(--red-base)',
          light: 'var(--red-light)',
        },
        orange: {
          dark: 'var(--orange-dark)',
          DEFAULT: 'var(--orange-base)',
          light: 'var(--orange-light)',
        },
        yellow: {
          dark: 'var(--yellow-dark)',
          DEFAULT: 'var(--yellow-base)',
          light: 'var(--yellow-light)',
        },
        green: {
          dark: 'var(--green-dark)',
          DEFAULT: 'var(--green-base)',
          light: 'var(--green-light)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate, require('tailwindcss-animate')],
};
