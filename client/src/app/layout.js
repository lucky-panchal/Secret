'use client';
import { CustomThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMuiTheme } from '@/theme/muiTheme';
import { useTheme } from '@/contexts/ThemeContext';
import "./globals.css";

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