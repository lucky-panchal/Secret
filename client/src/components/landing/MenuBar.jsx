'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
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
    { label: 'Home', href: 'home' },
    { label: 'Features', href: 'features' },
    { label: 'Success Stories', href: 'stories' },
    { label: 'Business Model', href: 'business' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (href) => {
    const element = document.getElementById(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ 
      width: 280, 
      height: '100%', 
      bgcolor: isDark ? '#1a1a1a' : '#ffffff',
      borderLeft: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton 
          onClick={handleDrawerToggle} 
          sx={{ 
            color: isDark ? '#ffffff' : '#333333',
            '&:hover': {
              bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ px: 2 }}>
        {navigationItems.map((item, index) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleNavClick(item.href)}
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: isDark ? '#ffffff' : '#333333',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={{ mt: 3, px: 0 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push('/register')}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              bgcolor: isDark ? '#2563eb' : '#1976d2',
              '&:hover': {
                bgcolor: isDark ? '#1d4ed8' : '#1565c0',
              },
            }}
          >
            Sign In
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 2 : 0}
        sx={{
          bgcolor: isDark ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
          transition: 'all 0.3s ease-in-out',
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ 
          px: { xs: 2, sm: 3, md: 4 }, 
          py: 1,
          minHeight: { xs: 64, md: 72 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleNavClick('home')}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: isDark ? '#ffffff' : '#1976d2',
                letterSpacing: '-0.5px',
              }}
            >
              KaushalX
            </Typography>
          </Box>

          {!isMobile && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
              }}
            >
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    color: isDark ? '#ffffff' : '#333333',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    textTransform: 'none',
                    borderRadius: 1.5,
                    minWidth: 'auto',
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: isDark ? '#ffffff' : '#333333',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              {isDark ? <LightMode /> : <DarkMode />}
            </IconButton>

            {!isMobile && (
              <Button
                variant="contained"
                onClick={() => router.push('/register')}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  bgcolor: isDark ? '#2563eb' : '#1976d2',
                  '&:hover': {
                    bgcolor: isDark ? '#1d4ed8' : '#1565c0',
                  },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>

          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: isDark ? '#ffffff' : '#333333',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
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
            bgcolor: isDark ? '#1a1a1a' : '#ffffff',
            borderLeft: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
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