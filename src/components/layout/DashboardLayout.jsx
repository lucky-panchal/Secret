import { Box, CssBaseline, ThemeProvider, Fade } from '@mui/material';
import { lightTheme } from '../../theme/muiTheme';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useState, useEffect } from 'react';

const DRAWER_WIDTH = 240;

export default function DashboardLayout({ children, loading = false }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setFadeIn(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            minHeight: '100vh',
            backgroundColor: 'background.default',
          }}
        >
          <Topbar />
          <Box
            sx={{
              mt: 8,
              p: 3,
            }}
          >
            <Fade in={!loading || fadeIn} timeout={500}>
              <div>
                {children}
              </div>
            </Fade>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}