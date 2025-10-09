'use client';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMuiTheme } from '@/theme/muiTheme';
import { useTheme } from '@/contexts/ThemeContext';
import Dashboard from '@/components/dashboard/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const { isDark } = useTheme();
  const theme = createMuiTheme(isDark);

  return (
    <ProtectedRoute>
      <div data-theme={isDark ? 'dark' : 'light'}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ 
            minHeight: '100vh',
            bgcolor: isDark ? '#121212' : '#f9f9f9',
          }}>
            <Dashboard />
          </Box>
        </ThemeProvider>
      </div>
    </ProtectedRoute>
  );
}