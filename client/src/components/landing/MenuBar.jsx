'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home,
  Star,
  TrendingUp,
  Business,
  ContactMail,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const MenuBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', href: 'home', icon: Home },
    { label: 'Features', href: 'features', icon: Star },
    { label: 'Success Stories', href: 'stories', icon: TrendingUp },
    { label: 'Business Model', href: 'business', icon: Business },
    { label: 'Contact', href: 'contact', icon: ContactMail },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (href) => {
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%', background: isDark ? 'linear-gradient(180deg, #0A0A0F 0%, #1A1A2E 50%, #16213E 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 50%, #F5F5F5 100%)', position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: isDark ? '#F8FAFC' : '#222222' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <AnimatePresence>
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.08, duration: 0.25 }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    py: 2,
                    px: 3,
                    borderRadius: 1,
                    mx: 1,
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(0, 245, 255, 0.1)' : 'rgba(0, 212, 255, 0.1)',
                      border: isDark ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid rgba(0, 212, 255, 0.3)',
                      '& .MuiListItemText-primary': {
                        color: isDark ? '#00F5FF' : '#00D4FF',
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: '1rem',
                      color: isDark ? '#F8FAFC' : '#222222',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
        <ListItem sx={{ mt: 2, px: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push('/register')}
            sx={{
              py: 1.5,
              borderRadius: 2.5,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              background: isDark ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 50%, #FBBF24 100%)' : 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 50%, #F59E0B 100%)',
              border: isDark ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(0,0,0,0.1)',
              boxShadow: isDark ? '0 4px 20px rgba(0, 245, 255, 0.3)' : '0 4px 20px rgba(0, 212, 255, 0.3)',
            }}
          >
            Register
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isDark ? 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 25%, #16213E 50%, #0F1419 100%)' : 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 25%, #F8F8F8 50%, #F5F5F5 100%)',
          borderBottom: isDark ? '1px solid rgba(0, 245, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? (isDark ? '0 8px 32px rgba(0, 245, 255, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.1)') : (isDark ? '0 4px 20px rgba(0, 245, 255, 0.1)' : '0 4px 20px rgba(0, 0, 0, 0.05)'),
          backdropFilter: 'blur(20px)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark ? 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.05), transparent)' : 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.03), transparent)',
            animation: 'circuitFlow 4s linear infinite',
          },
          '@keyframes circuitFlow': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleNavClick('home')}
          >
            <Box
              sx={{
                fontSize: '1.4rem',
                fontWeight: 700,
                background: isDark ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 50%, #FBBF24 100%)' : 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 50%, #F59E0B 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.01em',
                filter: isDark ? 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.5))' : 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  right: '-8px',
                  width: '4px',
                  height: '4px',
                  background: isDark ? '#00F5FF' : '#00D4FF',
                  borderRadius: '50%',
                  boxShadow: isDark ? '0 0 8px #00F5FF' : '0 0 8px #00D4FF',
                  animation: 'pulse 2s infinite',
                },
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1, transform: 'translateY(-50%) scale(1)' },
                  '50%': { opacity: 0.5, transform: 'translateY(-50%) scale(1.2)' },
                },
              }}
            >
              CareerAI
            </Box>
          </Box>

          {!isMobile && (
            <Box 
              sx={{ 
                display: 'flex', 
                ml: 'auto', 
                mr: 3, 
                gap: 0.5,
              }}
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      color: isDark ? 'rgba(255,255,255,0.9)' : '#222222',
                      fontWeight: 500,
                      px: 2.5,
                      py: 1.2,
                      position: 'relative',
                      textTransform: 'none',
                      borderRadius: 2,
                      background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                      border: isDark ? '1px solid rgba(0, 245, 255, 0.1)' : '1px solid rgba(0, 212, 255, 0.1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: isDark ? 'linear-gradient(45deg, transparent 30%, rgba(0, 245, 255, 0.1) 50%, transparent 70%)' : 'linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.1) 50%, transparent 70%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: 0,
                        height: 2,
                        background: isDark ? 'linear-gradient(90deg, #00F5FF, #A855F7)' : 'linear-gradient(90deg, #00D4FF, #7C3AED)',
                        borderRadius: 1,
                        boxShadow: isDark ? '0 0 10px rgba(0,245,255,0.8)' : '0 0 10px rgba(0,212,255,0.8)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translateX(-50%)',
                      },
                      '&:hover': {
                        color: isDark ? '#00F5FF' : '#00D4FF',
                        border: isDark ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid rgba(0, 212, 255, 0.3)',
                        '&::before': { opacity: 1 },
                        '&::after': { width: '80%' },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                onClick={toggleTheme}
                sx={{
                  width: 48,
                  height: 48,
                  background: isDark ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(168, 85, 247, 0.1))' : 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1))',
                  border: isDark ? '2px solid rgba(0, 245, 255, 0.3)' : '2px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '50%',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isDark ? 'conic-gradient(from 0deg, transparent, rgba(0, 245, 255, 0.3), transparent)' : 'conic-gradient(from 0deg, transparent, rgba(0, 212, 255, 0.3), transparent)',
                    animation: 'rotate 3s linear infinite',
                  },
                  '&:hover': {
                    border: isDark ? '2px solid rgba(0, 245, 255, 0.6)' : '2px solid rgba(0, 212, 255, 0.6)',
                    boxShadow: isDark ? '0 0 20px rgba(0, 245, 255, 0.4)' : '0 0 20px rgba(0, 212, 255, 0.4)',
                  },
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {isDark ? (
                    <LightMode sx={{ color: '#FBBF24', fontSize: '1.2rem' }} />
                  ) : (
                    <DarkMode sx={{ color: '#00D4FF', fontSize: '1.2rem' }} />
                  )}
                </Box>
              </IconButton>
            </motion.div>

            {!isMobile && (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  onClick={() => router.push('/register')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    background: isDark ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 50%, #FBBF24 100%)' : 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 50%, #F59E0B 100%)',
                    border: isDark ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(0,0,0,0.1)',
                    boxShadow: isDark ? '0 8px 25px rgba(0, 245, 255, 0.3), 0 0 20px rgba(168, 85, 247, 0.2)' : '0 8px 25px rgba(0, 212, 255, 0.3), 0 0 20px rgba(124, 58, 237, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      transition: 'left 0.6s ease',
                    },
                    '&:hover': {
                      boxShadow: isDark ? '0 12px 35px rgba(0, 245, 255, 0.4), 0 0 30px rgba(168, 85, 247, 0.3)' : '0 12px 35px rgba(0, 212, 255, 0.4), 0 0 30px rgba(124, 58, 237, 0.3)',
                      border: isDark ? '2px solid rgba(255,255,255,0.4)' : '2px solid rgba(0,0,0,0.2)',
                      '&::before': { left: '100%' },
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Register
                </Button>
              </motion.div>
            )}
          </Box>

          {isMobile && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: isDark ? '#00F5FF' : '#222222',
                  border: isDark ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: 2,
                  '&:hover': {
                    color: isDark ? '#00F5FF' : '#00D4FF',
                    background: isDark ? 'rgba(0, 245, 255, 0.1)' : 'rgba(0, 212, 255, 0.1)',
                    boxShadow: isDark ? '0 0 15px rgba(0,245,255,0.4)' : '0 0 15px rgba(0,212,255,0.4)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </motion.div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            background: isDark ? 'linear-gradient(180deg, #0A0A0F 0%, #1A1A2E 50%, #16213E 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 50%, #F5F5F5 100%)',
            boxShadow: isDark ? '-4px 0 20px rgba(0, 245, 255, 0.3)' : '-4px 0 20px rgba(0, 0, 0, 0.1)',
            border: isDark ? '1px solid rgba(0, 245, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Toolbar />
    </>
  );
};

export default MenuBar;