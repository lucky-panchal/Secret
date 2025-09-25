'use client';
import { useState } from 'react';
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
  LightMode,
  DarkMode,
  Home,
  Star,
  TrendingUp,
  Business,
  ContactMail,
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

const MenuBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(item.href)}
              sx={{
                py: 2,
                px: 3,
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateX(8px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: '1.1rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={{ mt: 2, px: 3 }}>
          <Button
            variant="contained"
            fullWidth
            href="/register"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
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
          bgcolor: 'transparent',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.palette.divider}20`,
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { transform: 'scale(1.05)' },
              transition: 'transform 0.2s ease',
            }}
            onClick={() => handleNavClick('home')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: 'white',
                  borderRadius: 1,
                }}
              />
            </Box>
            <Box
              sx={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'text.primary',
                display: { xs: 'none', sm: 'block' },
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
                mr: 4, 
                gap: 1,
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  animation: 'infinitySlide 3s infinite',
                },
                '@keyframes infinitySlide': {
                  '0%': { left: '-100%' },
                  '100%': { left: '100%' },
                }
              }}
            >
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': {
                        bgcolor: 'action.hover',
                        transform: 'translateY(-2px) scale(1.05)',
                        '& .nav-icon': {
                          transform: 'rotateY(360deg) rotateX(360deg)',
                        }
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconComponent 
                      className="nav-icon"
                      sx={{
                        fontSize: '1.2rem',
                        animation: `rotate3d${index} 4s infinite linear`,
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s ease',
                        '@keyframes rotate3d0': {
                          '0%': { transform: 'rotateY(0deg) rotateX(0deg)' },
                          '100%': { transform: 'rotateY(360deg) rotateX(360deg)' },
                        },
                        '@keyframes rotate3d1': {
                          '0%': { transform: 'rotateX(0deg) rotateZ(0deg)' },
                          '100%': { transform: 'rotateX(360deg) rotateZ(360deg)' },
                        },
                        '@keyframes rotate3d2': {
                          '0%': { transform: 'rotateY(0deg) rotateZ(0deg)' },
                          '100%': { transform: 'rotateY(360deg) rotateZ(360deg)' },
                        },
                        '@keyframes rotate3d3': {
                          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
                          '100%': { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)' },
                        },
                        '@keyframes rotate3d4': {
                          '0%': { transform: 'rotateZ(0deg) rotateY(0deg)' },
                          '100%': { transform: 'rotateZ(360deg) rotateY(360deg)' },
                        },
                      }}
                    />
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}

          <IconButton
            onClick={toggleTheme}
            sx={{
              ml: 'auto',
              mr: isMobile ? 1 : 2,
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'action.selected',
                transform: 'rotate(180deg)',
              },
              transition: 'all 0.4s ease',
            }}
          >
            {isDark ? <DarkMode /> : <LightMode />}
          </IconButton>

          {!isMobile && (
            <Button
              variant="contained"
              href="/register"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                },
              }}
            >
              Register
            </Button>
          )}

          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                ml: 1,
                '&:hover': { transform: 'scale(1.1)' },
                transition: 'transform 0.2s ease',
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
            backdropFilter: 'blur(20px)',
            bgcolor: 'background.paper',
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