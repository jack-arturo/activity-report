/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        text: '#0F172A',
        muted: '#64748B',
        green: '#166534',
        red: '#991B1B',
        blue: '#3B82F6',
      }
    },
  },
  plugins: [],
}
