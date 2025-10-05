import { createTheme } from '@mui/material/styles';

// Function to get CSS variable value
const getCSSVariable = (variable) => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  }
  return '';
};

export const createMuiTheme = (isDark) => {
  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? '#2563EB' : '#1E3A8A',
      },
      secondary: {
        main: isDark ? '#1D4ED8' : '#2563EB',
      },
      background: {
        default: isDark ? '#111827' : '#F9FAFB',
        paper: isDark ? '#1F2937' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F9FAFB' : '#111827',
        secondary: isDark ? '#9CA3AF' : '#6B7280',
      },
      error: {
        main: isDark ? '#F87171' : '#EF4444',
      },
      warning: {
        main: isDark ? '#FBBF24' : '#F59E0B',
      },
      info: {
        main: isDark ? '#60A5FA' : '#3B82F6',
      },
      success: {
        main: isDark ? '#34D399' : '#10B981',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
      h1: {
        fontFamily: '"Merriweather", "Lora", serif',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: '"Merriweather", "Lora", serif',
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontFamily: '"Merriweather", "Lora", serif',
        fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h4: {
        fontFamily: '"Merriweather", "Lora", serif',
        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h6: {
        fontFamily: '"Merriweather", "Lora", serif',
        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      body1: {
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
        lineHeight: 1.5,
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
          },
          html: {
            scrollBehavior: 'smooth',
          },
          body: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            minHeight: 44,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            },
          },
          contained: {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
  });
};