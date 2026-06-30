/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0D1B2A', 800: '#1A2B3C', 700: '#2E4057' },
        ocean: { 600: '#1B4332', 500: '#2D6A4F', 400: '#40916C' },
        grade: {
          a: '#0CA30C', ab: '#1BAF7A', b: '#1BAF7A',
          c: '#C9A800', d: '#EB6834', e: '#E34948'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
