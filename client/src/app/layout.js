'use client';
import { CustomThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMuiTheme } from '@/theme/muiTheme';
import { useTheme } from '@/contexts/ThemeContext';
import "./globals.css";
import "../styles/professional-saas-theme.css";

function MuiThemeWrapper({ children }) {
  const { isDark } = useTheme();
  const theme = createMuiTheme(isDark);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <CustomThemeProvider>
            <MuiThemeWrapper>
              {children}
            </MuiThemeWrapper>
          </CustomThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}