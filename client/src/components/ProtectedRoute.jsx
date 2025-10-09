'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children, redirectTo = '/register' }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
      } else {
        setIsChecking(false);
      }
    }
  }, [user, loading, router, redirectTo]);

  if (loading || isChecking) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          color: '#ffffff'
        }}
      >
        <CircularProgress 
          sx={{ 
            color: '#00f5ff',
            mb: 2
          }} 
        />
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Verifying authentication...
        </Typography>
      </Box>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;