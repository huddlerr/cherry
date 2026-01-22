/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9fafb',
        'card-bg': '#ffffff',
        'text-primary': '#1f2937',
        'text-secondary': '#6b7280',
        'text-muted': '#9ca3af',
        'week-past': '#e5e7eb',
        'week-current': '#f97316',
        'week-future': '#f3f4f6',
        accent: '#f97316',
        'accent-hover': '#ea580c',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
