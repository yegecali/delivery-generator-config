/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          50: '#f0f9fa',
          100: '#e0f2f6',
          200: '#b3e5ed',
          300: '#80d7e4',
          400: '#4dc9db',
          500: '#22b8cc',
          600: '#1ca0b8',
          700: '#16879f',
          800: '#126f86',
          900: '#0e576d',
        },
        orange: {
          50: '#fff7ed',
          100: '#feed00',
          200: '#fedcbd',
          300: '#fdc993',
          400: '#fcb76a',
          500: '#fa9041',
          600: '#f77f3f',
          700: '#db5a2c',
          800: '#b84621',
          900: '#93341b',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}
