/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-kr)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#0070f3',
        secondary: '#1a202c',
        hyperithm: {
          blue: '#0070f3',
          dark: '#1a202c',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            img: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            video: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            pre: {
              backgroundColor: '#1a202c',
              color: '#e2e8f0',
              padding: '1em',
              borderRadius: '0.5em',
              overflow: 'auto',
            },
            code: {
              backgroundColor: '#1a202c',
              color: '#e2e8f0',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};