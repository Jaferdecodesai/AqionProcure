/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aqion: {
          50: '#FBF9F4',
          100: '#F5EFE0',
          200: '#EADEC2',
          300: '#DECBA0',
          400: '#CFB478',
          500: '#C09F54',
          600: '#A9873E',
          700: '#86692E',
          800: '#644D22',
          900: '#463517',
          primary: '#C5A059',
          dark: '#0F172A',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -2px rgba(15, 23, 42, 0.02)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 4px 12px 0 rgba(15, 23, 42, 0.03)',
        'card-hover': '0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.03)',
      }
    },
  },
  plugins: [],
};
