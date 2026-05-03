/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  safelist: [
    'bg-ds-explore', 'bg-ds-solidify', 'bg-ds-build', 'bg-ds-ship',
  ],
  theme: {
    extend: {
      colors: {
        ds: {
          bg:             'rgb(var(--ds-bg) / <alpha-value>)',
          surface:        'rgb(var(--ds-surface) / <alpha-value>)',
          elevated:       'rgb(var(--ds-elevated) / <alpha-value>)',
          border:         'rgb(var(--ds-border) / <alpha-value>)',
          'border-light': 'rgb(var(--ds-border-light) / <alpha-value>)',
          accent:         'rgb(var(--ds-accent) / <alpha-value>)',
          'accent-dim':   'rgb(var(--ds-accent-dim) / <alpha-value>)',
          text:           'rgb(var(--ds-text) / <alpha-value>)',
          'text-secondary':'rgb(var(--ds-text-secondary) / <alpha-value>)',
          'text-dim':     'rgb(var(--ds-text-dim) / <alpha-value>)',
          explore:        'rgb(var(--ds-explore) / <alpha-value>)',
          solidify:       'rgb(var(--ds-solidify) / <alpha-value>)',
          build:          'rgb(var(--ds-build) / <alpha-value>)',
          ship:           'rgb(var(--ds-ship) / <alpha-value>)',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'Menlo', 'monospace'],
      },
      borderRadius: { pill: '999px' }
    }
  }
}
