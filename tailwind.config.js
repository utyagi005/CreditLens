/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(83, 173, 255, 0.18)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 90px rgba(0,0,0,0.38)',
      },
    },
  },
  plugins: [],
}
