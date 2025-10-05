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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS to prevent FOUC - AI/ML Theme */
            :root {
              --primary: #00D4FF;
              --secondary: #7C3AED;
              --background: #FAFBFF;
              --surface: #FFFFFF;
              --text-primary: #0F0F23;
              --text-secondary: #4A5568;
              --border: #E2E8F0;
            }
            [data-theme="dark"] {
              --primary: #00F5FF;
              --secondary: #A855F7;
              --background: #0A0A0F;
              --surface: #1A1A2E;
              --text-primary: #F8FAFC;
              --text-secondary: #CBD5E1;
              --border: #334155;
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