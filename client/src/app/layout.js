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
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Outfit:wght@300;400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Landing Page Color Scheme */
            :root {
              --deep-black: #000000;
              --charcoal: #1A1A1A;
              --charcoal-alt: #1C1C1C;
              --gunmetal: #4A4A4A;
              --primary-text: #D0D0D0;
              --secondary-text: #B0B0B0;
              --white: #FFFFFF;
            }
            [data-theme="dark"] {
              --deep-black: #000000;
              --charcoal: #1A1A1A;
              --charcoal-alt: #1C1C1C;
              --gunmetal: #4A4A4A;
              --primary-text: #D0D0D0;
              --secondary-text: #B0B0B0;
              --white: #FFFFFF;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            * { font-family: 'Jost', sans-serif !important; }
            h1, h2, h3, h4, h5, h6 { font-family: 'Oswald', sans-serif !important; }
            body {
              font-family: 'Jost', sans-serif;
              color: var(--primary-text);
              background-color: var(--deep-black);
              transition: all 0.3s ease;
              -webkit-font-smoothing: antialiased;
            }
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: var(--deep-black);
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
          <div style={{color: 'var(--primary-text)', fontSize: '18px'}}>Loading...</div>
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