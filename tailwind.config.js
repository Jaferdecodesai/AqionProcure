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
          primary: '#E0B75C',
          dark: '#0F172A',
          surface: '#0F172A',
          base: '#020617',
        },
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 4px 12px 0 rgba(0, 0, 0, 0.35), inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
        'card-hover': '0 10px 30px -6px rgba(0, 0, 0, 0.6), 0 4px 10px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.07)',
      }
    },
  },
  plugins: [],
};
