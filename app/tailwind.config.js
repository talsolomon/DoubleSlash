/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/src/**/*.{ts,tsx}', './src/renderer/*.html'],
  theme: {
    extend: {
      colors: {
        ds: {
          bg: '#080808',
          surface: '#111111',
          elevated: '#1c1c1c',
          border: '#1e1e1e',
          'border-light': '#2a2a2a',
          accent: '#4ADE80',
          'accent-dim': '#166534',
          text: '#F0F0F0',
          'text-secondary': '#888888',
          'text-dim': '#444444',
          explore: '#38BDF8',
          solidify: '#A78BFA',
          build: '#FB923C',
          ship: '#4ADE80',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        pill: '999px',
      }
    }
  }
}
