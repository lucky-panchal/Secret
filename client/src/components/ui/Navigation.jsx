'use client';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Menu, Close, School, Dashboard, Person, Login, PersonAdd, Home } from '@mui/icons-material';
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
    <div data-theme={isDark ? 'dark' : 'light'}>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'var(--surface)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
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
                  fontFamily: '"Merriweather", serif',
                  fontWeight: 700,
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  color: 'var(--text-primary)',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    color: 'var(--primary)',
                  },
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
                    className="btn btn-secondary"
                    sx={{
                      color: 'var(--text-primary)',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        background: 'var(--primary)',
                        color: 'white',
                        transform: 'translateY(-2px)',
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
                  color: 'var(--error)',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'var(--error)',
                    color: 'white',
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
          
          <ThemeToggle />
          
          <IconButton
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              ml: 1,
              color: 'var(--text-primary)',
            }}
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
                background: 'var(--surface)',
                backdropFilter: 'blur(20px)',
                width: 280,
                border: '1px solid var(--border)',
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
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>Menu</Typography>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'var(--text-primary)' }}>
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
                      <ListItem 
                        button 
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          color: 'var(--text-primary)',
                          borderRadius: 2,
                          mx: 1,
                          mb: 1,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            background: 'var(--primary)',
                            color: 'white',
                          },
                        }}
                      >
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
    </div>
  );
};

export default Navigation;