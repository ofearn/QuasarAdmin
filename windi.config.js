import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  mode: 'jit',
  darkMode: false,
  prefix: 't-',
  theme: {
    rotate: {
      '-360': '-360deg',
      '-270': '-270deg',
      '-180': '-180deg',
      '-135': '-1350deg',
      '-90': '-90deg',
      '-45': '-45deg',
      0: '0',
      45: '45deg',
      90: '90deg',
      135: '135deg',
      180: '180deg',
      270: '270deg',
      360: '360deg',
    },
    extend: {
      zIndex: {
        '-1': '-1',
      },
      screens: {
        xs: '599px',
        sm: '1023x',
        md: '1439px',
        lg: '1919px',
        xl: '2560px',
      },
      spacing: {
        100: '25rem',
        101: '25.25rem',
        102: '25.5rem',
        103: '25.75rem',
        104: '26rem',
      },
      letterSpacing: {
        fullbutton: '0.5em',
      },
      maxWidth: {
        '9rem': '9rem',
      },
      transitionDuration: {
        800: '800ms',
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('dark', ({ modifySelectors }) => modifySelectors(({ className }) => `.body--dark .${className}`))
    }),
  ],
})
