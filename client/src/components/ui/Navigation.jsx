'use client';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Menu, Close, School, Dashboard, Person, Login, PersonAdd, Home, Info, AttachMoney, ContactMail } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDark } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const publicMenuItems = [
    { text: 'Home', icon: <Home />, href: '/' },
  ];

  const authMenuItems = [
    { text: 'Login', icon: <Login />, href: '/login' },
    { text: 'Signup', icon: <PersonAdd />, href: '/signup' },
  ];

  const protectedMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, href: '/dashboard' },
    { text: 'Courses', icon: <School />, href: '/courses' },
    { text: 'Profile', icon: <Person />, href: '/profile' },
  ];

  const menuItems = isAuthenticated ? protectedMenuItems : [...publicMenuItems, ...authMenuItems];

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: isDark ? 'rgba(10,10,10,0.9)' : 'rgba(250,246,242,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(44,24,16,0.1)',
        }}
      >
        <Toolbar>
          <Link href="/" passHref>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              style={{ cursor: 'pointer' }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontFamily: '"Orbitron", "Exo 2", "Rajdhani", sans-serif',
                  fontWeight: 900,
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  color: isDark ? '#ffffff' : '#2c1810',
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',

                  filter: 'contrast(1.2) saturate(1.3) brightness(1.1)',
                  letterSpacing: '1px',
                  transform: 'perspective(800px) rotateX(12deg) translateZ(20px)',
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                  imageRendering: 'crisp-edges',

                  '&:hover': {
                    transform: 'perspective(800px) rotateX(8deg) translateY(-3px) translateZ(25px)',

                    filter: 'contrast(1.3) saturate(1.4) brightness(1.2)',
                  },
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                KauShalX
              </Typography>
            </motion.div>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.href} passHref>
                  <Button
                    startIcon={item.icon}
                    sx={{
                      color: isDark ? 'white' : '#2c1810',
                      '&:hover': {
                        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(44,24,16,0.1)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                </Link>
              </motion.div>
            ))}
            {isAuthenticated && (
              <Button
                onClick={logout}
                sx={{
                  color: '#ff6b6b',
                  '&:hover': {
                    background: 'rgba(255,107,107,0.1)',
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
          
          <ThemeToggle />
          
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}
            onClick={() => setDrawerOpen(true)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <AnimatePresence>
        {drawerOpen && (
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                background: isDark ? 'rgba(26,26,26,0.95)' : 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                width: 280,
              },
            }}
          >
            <motion.div
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Menu</Typography>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
              <List>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href} passHref>
                      <ListItem button onClick={() => setDrawerOpen(false)}>
                        {item.icon}
                        <ListItemText primary={item.text} sx={{ ml: 2 }} />
                      </ListItem>
                    </Link>
                  </motion.div>
                ))}
              </List>
            </motion.div>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;