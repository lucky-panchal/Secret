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
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

const MenuBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Login
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
            <Box sx={{ display: 'flex', ml: 'auto', mr: 4, gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.label}
                </Button>
              ))}
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
              Login
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