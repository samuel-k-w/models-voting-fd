import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Neutral palette */
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        'background-tertiary': 'var(--background-tertiary)',
        
        foreground: 'var(--foreground)',
        'foreground-secondary': 'var(--foreground-secondary)',
        'foreground-tertiary': 'var(--foreground-tertiary)',
        
        /* Borders */
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        'border-hover': 'var(--border-hover)',
        
        /* Muted states */
        muted: 'var(--muted)',
        'muted-hover': 'var(--muted-hover)',
        'muted-foreground': 'var(--muted-foreground)',
        
        /* Primary brand scale - blue */
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary)',
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        
        /* Secondary accent - cyan */
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: 'var(--secondary-light)',
          hover: 'var(--secondary-hover)',
        },
        
        /* Success - green */
        success: {
          DEFAULT: 'var(--success)',
          light: 'var(--success-light)',
          hover: 'var(--success-hover)',
          text: 'var(--success-text)',
        },
        
        /* Error - red */
        error: {
          DEFAULT: 'var(--error)',
          light: 'var(--error-light)',
          hover: 'var(--error-hover)',
          text: 'var(--error-text)',
        },
        
        /* Warning - orange */
        warning: {
          DEFAULT: 'var(--warning)',
          light: 'var(--warning-light)',
          hover: 'var(--warning-hover)',
          text: 'var(--warning-text)',
        },
        
        /* Info - blue variant */
        info: {
          DEFAULT: 'var(--info)',
          light: 'var(--info-light)',
          hover: 'var(--info-hover)',
          text: 'var(--info-text)',
        },
        
        /* Leaderboard medals */
        'rank-1': {
          gold: 'var(--rank-1-gold)',
          'gold-light': 'var(--rank-1-gold-light)',
        },
        'rank-2': {
          silver: 'var(--rank-2-silver)',
          'silver-light': 'var(--rank-2-silver-light)',
        },
        'rank-3': {
          bronze: 'var(--rank-3-bronze)',
          'bronze-light': 'var(--rank-3-bronze-light)',
        },
        
        /* Skeleton loading */
        skeleton: {
          base: 'var(--skeleton-base)',
          shine: 'var(--skeleton-shine)',
        },
      },
      
      boxShadow: {
        none: 'var(--shadow-none)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'glow-sm': 'var(--glow-sm)',
        'glow-md': 'var(--glow-md)',
        'glow-lg': 'var(--glow-lg)',
      },
      
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      keyframes: {
        'skeleton-shine': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'glow': {
          '0%, 100%': { 
            boxShadow: '0 0 8px rgba(37, 99, 235, 0.1)',
          },
          '50%': { 
            boxShadow: '0 0 16px rgba(37, 99, 235, 0.2)',
          },
        },
        'slide-in-from-bottom': {
          from: {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      
      animation: {
        'skeleton-shine': 'skeleton-shine 2s infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in': 'slide-in-from-bottom 300ms ease-out',
      },
      
      spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
      
      fontSize: {
        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.5' }],
        lg: ['18px', { lineHeight: '1.6' }],
        xl: ['20px', { lineHeight: '1.6' }],
        '2xl': ['24px', { lineHeight: '1.6' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
        '4xl': ['36px', { lineHeight: '1.2' }],
        '5xl': ['48px', { lineHeight: '1.1' }],
        '6xl': ['60px', { lineHeight: '1' }],
        '7xl': ['72px', { lineHeight: '1' }],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
      });
    },
  ],
};

export default config;
