'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Card, 
  TextField, 
  Button, 
  Typography, 
  ToggleButton, 
  ToggleButtonGroup,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import Link from 'next/link';

const oceanTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4' },
    secondary: { main: '#4fc3f7' },
    background: { 
      default: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #42a5f5 100%)',
      paper: 'rgba(13, 71, 161, 0.2)'
    },
    text: { primary: '#ffffff', secondary: '#b3e5fc' }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'linear-gradient(45deg, rgba(0, 188, 212, 0.2) 25%, transparent 25%), linear-gradient(-45deg, rgba(79, 195, 247, 0.2) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0, 188, 212, 0.2) 75%), linear-gradient(-45deg, transparent 75%, rgba(79, 195, 247, 0.2) 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
            transform: 'translateZ(0)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { 
              background: 'linear-gradient(45deg, rgba(0, 188, 212, 0.4) 25%, transparent 25%), linear-gradient(-45deg, rgba(79, 195, 247, 0.4) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0, 188, 212, 0.4) 75%), linear-gradient(-45deg, transparent 75%, rgba(79, 195, 247, 0.4) 75%)',
              backgroundSize: '15px 15px',
              transform: 'translateY(-2px) translateZ(10px) rotateX(5deg)',
              boxShadow: '0 12px 24px rgba(0, 188, 212, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
            },
            '&.Mui-focused': { 
              background: 'linear-gradient(45deg, rgba(0, 188, 212, 0.6) 25%, transparent 25%), linear-gradient(-45deg, rgba(79, 195, 247, 0.6) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0, 188, 212, 0.6) 75%), linear-gradient(-45deg, transparent 75%, rgba(79, 195, 247, 0.6) 75%)',
              backgroundSize: '10px 10px',
              transform: 'translateY(-4px) translateZ(20px) rotateX(10deg)',
              boxShadow: '0 16px 32px rgba(0, 188, 212, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
            }
          }
        }
      }
    }
  }
});

const forestTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4caf50' },
    secondary: { main: '#8bc34a' },
    background: { 
      default: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 50%, #66bb6a 100%)',
      paper: 'rgba(27, 94, 32, 0.2)'
    },
    text: { primary: '#ffffff', secondary: '#c8e6c9' }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'radial-gradient(circle at 25% 25%, rgba(76, 175, 80, 0.3) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(139, 195, 74, 0.3) 2px, transparent 2px), linear-gradient(45deg, rgba(76, 175, 80, 0.1) 25%, transparent 25%)',
            backgroundSize: '16px 16px, 16px 16px, 32px 32px',
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
            transform: 'translateZ(0)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& input': { color: '#ffffff' },
            '&:hover': { 
              background: 'radial-gradient(circle at 25% 25%, rgba(76, 175, 80, 0.5) 3px, transparent 3px), radial-gradient(circle at 75% 75%, rgba(139, 195, 74, 0.5) 3px, transparent 3px), linear-gradient(45deg, rgba(76, 175, 80, 0.2) 25%, transparent 25%)',
              backgroundSize: '12px 12px, 12px 12px, 24px 24px',
              transform: 'translateY(-2px) translateZ(10px) rotateX(5deg)',
              boxShadow: '0 12px 24px rgba(76, 175, 80, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
            },
            '&.Mui-focused': { 
              background: 'radial-gradient(circle at 25% 25%, rgba(76, 175, 80, 0.7) 4px, transparent 4px), radial-gradient(circle at 75% 75%, rgba(139, 195, 74, 0.7) 4px, transparent 4px), linear-gradient(45deg, rgba(76, 175, 80, 0.3) 25%, transparent 25%)',
              backgroundSize: '8px 8px, 8px 8px, 16px 16px',
              transform: 'translateY(-4px) translateZ(20px) rotateX(10deg)',
              boxShadow: '0 16px 32px rgba(76, 175, 80, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
            }
          }
        }
      }
    }
  }
});

export default function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const currentTheme = isLogin ? oceanTheme : forestTheme;

  const containerVariants = {
    login: {
      x: 0,
      background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #42a5f5 100%)',
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    signup: {
      x: 0,
      background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 50%, #66bb6a 100%)',
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const formVariants = {
    hidden: { x: isLogin ? -300 : 300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      x: isLogin ? 300 : -300, 
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  const FloatingElements = ({ theme }) => (
    <>
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0%' : '20%',
            background: theme === 'ocean' 
              ? `rgba(0, 188, 212, ${Math.random() * 0.3 + 0.1})`
              : `rgba(76, 175, 80, ${Math.random() * 0.3 + 0.1})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );

  const OceanBackground = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      <FloatingElements theme="ocean" />
      {/* Animated Waves */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '120%',
          height: '200px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 188, 212, 0.3) 100%)',
          borderRadius: '50% 50% 0 0',
        }}
        animate={{
          x: [-50, 50, -50],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Shark SVG */}
      <motion.div
        style={{
          position: 'absolute',
          right: '10%',
          top: '20%',
          fontSize: '60px',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🦈
      </motion.div>
    </motion.div>
  );

  const ForestBackground = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      <FloatingElements theme="forest" />
      {/* Trees */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          fontSize: '80px',
        }}
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌲
      </motion.div>
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          right: '15%',
          fontSize: '70px',
        }}
        animate={{
          rotate: [1, -1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌳
      </motion.div>
      {/* Birds */}
      <motion.div
        style={{
          position: 'absolute',
          left: '20%',
          top: '15%',
          fontSize: '30px',
        }}
        animate={{
          x: [0, 100, 200],
          y: [0, -20, -10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🐦
      </motion.div>
    </motion.div>
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <motion.div
        variants={containerVariants}
        animate={isLogin ? 'login' : 'signup'}
        style={{
          minHeight: '100vh',
          width: '100vw',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px',
        }}
      >
        {/* Back Button */}
        <Link href="/" style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000 }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
            }}
          >
            ← Back
          </Button>
        </Link>

        {/* Animated Backgrounds */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <OceanBackground key="ocean" />
          ) : (
            <ForestBackground key="forest" />
          )}
        </AnimatePresence>

        {/* Main Form Container */}
        <motion.div
          style={{
            width: 'min(90vw, 500px)',
            zIndex: 100,
          }}
          animate={{
            rotateX: 0,
            rotateY: 0,
          }}
          transition={{ duration: 0.8 }}
        >
          <Card
            sx={{
              p: 4,
              backgroundColor: 'background.paper',
              backdropFilter: 'blur(20px)',
              borderRadius: 0,
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Toggle Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <ToggleButtonGroup
                value={isLogin ? 'login' : 'signup'}
                exclusive
                onChange={(_, value) => value && setIsLogin(value === 'login')}
                sx={{
                  '& .MuiToggleButton-root': {
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    color: 'text.primary',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    }
                  }
                }}
              >
                <ToggleButton value="login" aria-label="login">
                  Login
                </ToggleButton>
                <ToggleButton value="signup" aria-label="signup">
                  Sign Up
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Forms */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login-form' : 'signup-form'}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ mb: 4, fontWeight: 300, color: 'text.primary' }}
                >
                  {isLogin ? 'Welcome Back' : 'Join Us'}
                </Typography>

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {!isLogin && (
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                    />
                  )}
                  
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                  />
                  
                  {!isLogin && (
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                    />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${currentTheme.palette.primary.main}, ${currentTheme.palette.secondary.main})`,
                        boxShadow: `0 8px 25px ${currentTheme.palette.primary.main}40`,
                        '&:hover': {
                          boxShadow: `0 12px 35px ${currentTheme.palette.primary.main}60`,
                        }
                      }}
                    >
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </Button>
                  </motion.div>

                  {isLogin && (
                    <Typography
                      align="center"
                      sx={{ 
                        color: 'text.secondary', 
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  )}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>
      </motion.div>
    </ThemeProvider>
  );
}