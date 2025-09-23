'use client';
import { Box, Container, Paper, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import { Email, Lock, Person, Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import Navigation from '@/components/ui/Navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const { isDark } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password && formData.password === formData.confirmPassword) {
      login({
        email: formData.email,
        name: formData.name,
        id: Date.now()
      });
      router.push('/dashboard');
    }
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Navigation />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--background)',
          pt: 10,
          pb: 4,
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
              <PersonAdd sx={{ fontSize: 56, color: 'var(--primary)', mb: 2 }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  mb: 1,
                  letterSpacing: '-0.5px'
                }}
              >
                Join KauShalX
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                Create your account and start learning today
              </Typography>
            </Box>

            <Box component="form" sx={{ mt: 4 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleChange('name')}
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
                      <Person sx={{ color: 'var(--primary)' }} />
                    </InputAdornment>
                  ),
                }}
              />

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

              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: 'var(--text-secondary)' }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                Create Account
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
                  Already have an account?{' '}
                  <Link href="/login" style={{ textDecoration: 'none' }}>
                    <Typography
                      component="span"
                      sx={{
                        color: 'var(--primary)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': { color: 'var(--secondary)' },
                        transition: 'color 0.2s ease',
                      }}
                    >
                      Sign in here
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}