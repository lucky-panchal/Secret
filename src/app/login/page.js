'use client';
import { Box, Container, Paper, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import { Email, Lock, Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import Navigation from '@/components/ui/Navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { isDark } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - in real app, validate with backend
    if (formData.email && formData.password) {
      login({
        email: formData.email,
        name: formData.email.split('@')[0],
        id: Date.now()
      });
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Navigation />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: isDark 
            ? 'radial-gradient(ellipse at center, #1a1a2e 0%, #000000 70%)'
            : 'radial-gradient(ellipse at center, #f5f1eb 0%, #faf6f2 70%)',
          pt: 10,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: 5,
              background: isDark 
                ? 'linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(0,0,0,0.9) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,246,242,0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
              borderRadius: 3,
              boxShadow: isDark 
                ? '0 25px 50px rgba(0,0,0,0.5)'
                : '0 25px 50px rgba(44,24,16,0.15)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <LoginIcon sx={{ fontSize: 56, color: '#ff6b6b', mb: 2 }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: isDark ? '#ffffff' : '#2c1810',
                  mb: 1,
                  letterSpacing: '-0.5px'
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
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
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,24,16,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff6b6b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4ecdc4',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#ff6b6b' }} />
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
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,24,16,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff6b6b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4ecdc4',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#ff6b6b' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
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
                  background: 'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%)',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff5252 0%, #26a69a 100%)',
                    boxShadow: '0 12px 35px rgba(255, 107, 107, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Don't have an account?{' '}
                  <Link href="/signup" style={{ textDecoration: 'none' }}>
                    <Typography
                      component="span"
                      sx={{
                        color: '#ff6b6b',
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': { color: '#4ecdc4' },
                        transition: 'color 0.2s ease',
                      }}
                    >
                      Sign up here
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}