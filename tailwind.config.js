/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#141414',
        'surface-raised': '#1C1C1C',
        border: '#2A2A2A',
        'border-subtle': '#1F1F1F',
        primary: '#F5F5F5',
        secondary: '#888888',
        muted: '#555555',
        accent: '#FFFFFF',
        'accent-subtle': '#1A1A1A',
        error: '#FF4444',
        success: '#3ECF8E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
