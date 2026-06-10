import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1020',
        surface: '#111827',
        panel: '#182033',
        accent: '#10b981',
        accentSoft: '#34d399',
        warning: '#f59e0b',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(16, 185, 129, 0.18)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
