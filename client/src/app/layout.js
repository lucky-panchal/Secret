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
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS to prevent FOUC */
            :root {
              --primary: #1E3A8A;
              --secondary: #2563EB;
              --background: #F9FAFB;
              --surface: #FFFFFF;
              --text-primary: #111827;
              --text-secondary: #6B7280;
              --border: #E5E7EB;
            }
            [data-theme="dark"] {
              --primary: #2563EB;
              --secondary: #1D4ED8;
              --background: #111827;
              --surface: #1F2937;
              --text-primary: #F9FAFB;
              --text-secondary: #9CA3AF;
              --border: #374151;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Inter', sans-serif;
              color: var(--text-primary);
              background-color: var(--background);
              transition: all 0.3s ease;
              -webkit-font-smoothing: antialiased;
            }
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: var(--background);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
            }
          `
        }} />
      </head>
      <body>
        <div id="loading-screen" className="loading-screen" style={{display: 'none'}}>
          <div style={{color: 'var(--primary)', fontSize: '18px'}}>Loading...</div>
        </div>
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