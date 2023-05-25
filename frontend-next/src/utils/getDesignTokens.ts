import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: '#4B6BFC'
    },
    ...(mode === 'light'
    ? {
        divider: '#E8E8EA',
        text: {
          primary: '#171A2A',
          secondary: '#171A2A',
        },
      }
    : {
        divider: '#242535',
        background: {
          default: '#181A2A',
          paper: '#181A2A'
        },
        text: {
          primary: '#ffffff',
          secondary: '#5A5B67',
        },
    }),
    contrastThreshold: 4.5,
  },
  components: {
    MuiSwitch: {
      defaultProps: {
        disableRipple: true
      },
    }
  }
});