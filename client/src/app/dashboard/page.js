'use client';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMuiTheme } from '@/theme/muiTheme';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/dashboard/Dashboard';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {

  const { isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const theme = createMuiTheme(isDark);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);



  return (
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
  );
}