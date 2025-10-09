'use client';
import { Box, Container, Paper, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { Email, Lock, Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';
import SecureAuthModal from '@/components/auth/SecureAuthModal';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSecureAuth, setShowSecureAuth] = useState(false);
  const [tempUserData, setTempUserData] = useState(null);
  
  const { isDark } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email && formData.password) {
      // Store user data temporarily
      setTempUserData({
        email: formData.email,
        name: formData.email.split('@')[0],
        id: Date.now()
      });
      
      // Show secure authentication modal
      setShowSecureAuth(true);
    }
  };

  const handleSecureAuthSuccess = (authData) => {
    console.log('Secure authentication successful:', authData);
    
    // Complete login with verified user data
    login(tempUserData);
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const handleSecureAuthClose = () => {
    setShowSecureAuth(false);
  };

  if (!isLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background)',
        color: 'var(--text-primary)'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.push('/')}
        sx={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          borderRadius: 2,
          fontWeight: 600,
          backdropFilter: 'blur(20px)',
          '&:hover': {
            background: 'var(--primary)',
            color: 'white'
          }
        }}
      >
        Back to Home
      </Button>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--background)',
          pt: 10,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: 5,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 3,
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <LoginIcon sx={{ fontSize: 56, color: 'var(--primary)', mb: 2 }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  mb: 1,
                  letterSpacing: '-0.5px'
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                Sign in to continue your learning journey
              </Typography>
            </Box>

            <Box component="form" sx={{ mt: 4 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    background: 'var(--surface)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'var(--border)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--primary)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary)',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: 'var(--text-primary)',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'var(--primary)' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    background: 'var(--surface)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'var(--border)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--primary)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary)',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: 'var(--text-primary)',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'var(--primary)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'var(--text-secondary)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  py: 2,
                  mb: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  minHeight: 48,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'var(--primary)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
                  },
                }}
              >
                Sign In
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
                  Don't have an account?{' '}
                  <Typography
                    component="span"
                    onClick={() => router.push('/register')}
                    sx={{
                      color: 'var(--primary)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': { color: 'var(--secondary)' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Sign up here
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Secure Authentication Modal */}
      <SecureAuthModal
        open={showSecureAuth}
        onClose={handleSecureAuthClose}
        onSuccess={handleSecureAuthSuccess}
        userEmail={tempUserData?.email}
        userId={tempUserData?.id}
      />
    </div>
  );
}