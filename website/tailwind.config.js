/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: '#090909',
        surface: '#0f0f0f',
        'surface-2': '#141414',
        border: '#1e1e1e',
        'border-2': '#2a2a2a',
        ink: '#f2f2f0',
        muted: '#777',
        'muted-2': '#444',
        explore: '#38BDF8',
        solidify: '#A78BFA',
        build: '#FB923C',
        ship: '#4ADE80',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
        wide: '0.08em',
        widest: '0.16em',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(120deg, #38BDF8 0%, #A78BFA 50%, #FB923C 100%)',
        'gradient-brand-v': 'linear-gradient(180deg, #38BDF8 0%, #A78BFA 50%, #FB923C 100%)',
        'gradient-aurora': 'radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.15) 0%, rgba(167,139,250,0.12) 35%, rgba(251,146,60,0.06) 65%, transparent 80%)',
        'gradient-card': 'linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(56,189,248,0.04) 100%)',
        'gradient-card-pro': 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(56,189,248,0.08) 100%)',
      },
      animation: {
        'pearl-pulse': 'pearl-pulse 4s ease-in-out infinite',
        'pearl-flash': 'pearl-flash 2.5s ease-out forwards',
        'aurora-drift': 'aurora-drift 8s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
}
