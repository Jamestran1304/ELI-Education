import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        light: '#d94c42',
        main: '#ac2118',
        dark: '#7a160f',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffe3d6',
        main: '#ffbe98',
        dark: '#cc8f6b',
        contrastText: '#000',
      },
      background: {
        default: '#f8f9fa',
        paper: '#ffffff',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#FFFFFF',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      },
    },
    shape: {
      borderRadius: 16,
    },
    shadows: Array(25).fill('none').map((_, i) =>
      i === 8 ? '0 8px 32px rgba(25, 118, 210, 0.12)' : 'none'),
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'secondary.light',
          },
        },
      },
    },
  });

export default getTheme;