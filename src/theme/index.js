'use client';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      dark: '#f5f5f5',
    },
    secondary: {
      main: '#666666',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Georgia", serif',
    h1: {
      fontFamily: '"Georgia", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Georgia", serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 25px rgba(255,255,255,0.15)',
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c1810',
      light: '#8b4513',
    },
    secondary: {
      main: '#d2b48c',
    },
    background: {
      default: '#faf6f2',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c1810',
      secondary: '#8b4513',
    },
  },
  typography: {
    fontFamily: '"Inter", "Georgia", serif',
    h1: {
      fontFamily: '"Georgia", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Georgia", serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 25px rgba(44,24,16,0.15)',
          },
        },
      },
    },
  },
});