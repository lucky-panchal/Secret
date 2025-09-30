'use client';
import { useState, useEffect, useRef } from 'react';
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
  useMediaQuery,
  useTheme as useMuiTheme,
  Chip,
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
  RocketLaunch,
  AutoAwesome,
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MenuBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
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
            onClick={() => router.push('/register')}
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
        ref={navRef}
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? (isDark ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)') : 'transparent',
          backdropFilter: 'blur(25px) saturate(180%)',
          borderBottom: scrolled ? `1px solid ${theme.palette.divider}40` : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.12)' : 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${isDark ? '255,255,255' : '0,0,0'}, 0.06), transparent 40%)`,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}40, transparent)`,
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              '&:hover': { 
                transform: 'scale(1.05)',
                '& .logo-glow': {
                  opacity: 1,
                  transform: 'scale(1.2)',
                }
              },
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onClick={() => handleNavClick('home')}
          >
            <Box
              sx={{
                position: 'relative',
                width: 44,
                height: 44,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'logoShine 2s infinite',
                },
                '@keyframes logoShine': {
                  '0%': { left: '-100%' },
                  '100%': { left: '100%' },
                }
              }}
            >
              <Box
                className="logo-glow"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  opacity: 0,
                  filter: 'blur(8px)',
                  transform: 'scale(1)',
                  transition: 'all 0.3s ease',
                  zIndex: -1,
                }}
              />
              <RocketLaunch sx={{ color: 'white', fontSize: '1.4rem', animation: 'logoFloat 3s ease-in-out infinite' }} />
            </Box>
            <Box
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.6rem',
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' },
                letterSpacing: '-0.02em',
              }}
            >
              CareerAI
            </Box>
            <Chip
              label="AI"
              size="small"
              sx={{
                ml: 1,
                height: 20,
                fontSize: '0.7rem',
                fontWeight: 700,
                bgcolor: theme.palette.primary.main,
                color: 'white',
                animation: 'pulse 2s infinite',
                display: { xs: 'none', md: 'flex' },
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                },
                '@keyframes logoFloat': {
                  '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                  '50%': { transform: 'translateY(-3px) rotate(5deg)' },
                }
              }}
            />
          </Box>

          {!isMobile && (
            <Box 
              sx={{ 
                display: 'flex', 
                ml: 'auto', 
                mr: 4, 
                gap: 0.5,
                position: 'relative',
                padding: '8px 16px',
                borderRadius: 4,
                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}20, transparent)`,
                  animation: 'navGlow 4s infinite',
                  borderRadius: 4,
                },
                '@keyframes navGlow': {
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
                      fontWeight: 600,
                      px: 2.5,
                      py: 1.2,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        borderRadius: 3,
                      },
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 8px 25px ${theme.palette.primary.main}30`,
                        '&::before': { opacity: 1 },
                        '& .nav-icon': {
                          transform: 'scale(1.2) rotateY(360deg)',
                          color: theme.palette.primary.main,
                        },
                        '& .nav-text': {
                          transform: 'translateX(2px)',
                        }
                      },
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <IconComponent 
                      className="nav-icon"
                      sx={{
                        fontSize: '1.1rem',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 1,
                      }}
                    />
                    <Box 
                      className="nav-text"
                      sx={{
                        fontSize: '0.9rem',
                        transition: 'transform 0.3s ease',
                        zIndex: 1,
                      }}
                    >
                      {item.label}
                    </Box>
                  </Button>
                );
              })}
            </Box>
          )}

          <Box
            onClick={toggleTheme}
            sx={{
              ml: 'auto',
              mr: isMobile ? 1 : 2,
              width: 60,
              height: 32,
              borderRadius: 4,
              bgcolor: isDark ? '#1a1a2e' : '#87ceeb',
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isDark 
                ? '0 4px 15px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
                : '0 4px 15px rgba(135, 206, 235, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isDark 
                  ? 'radial-gradient(circle at 20% 50%, #2c2c54 30%, transparent 70%), radial-gradient(circle at 80% 20%, #40407a 20%, transparent 50%)'
                  : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 20%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.6) 15%, transparent 40%)',
                opacity: 1,
                transition: 'all 0.6s ease',
              },
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: isDark 
                  ? '0 6px 20px rgba(0, 0, 0, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                  : '0 6px 20px rgba(135, 206, 235, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
              }
            }}
          >
            {/* Sun/Moon Toggle */}
            <motion.div
              animate={{
                x: isDark ? 4 : 28,
                rotate: isDark ? 0 : 360,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                duration: 0.6
              }}
              style={{
                position: 'absolute',
                top: '4px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isDark 
                  ? 'linear-gradient(135deg, #f5f5dc 0%, #fffacd 50%, #f0e68c 100%)'
                  : 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #fff176 100%)',
                boxShadow: isDark
                  ? '0 0 15px rgba(245, 245, 220, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.2)'
                  : '0 0 20px rgba(255, 215, 0, 0.9), inset -2px -2px 4px rgba(255, 193, 7, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                zIndex: 2,
              }}
            >
              {isDark ? '🌙' : '☀️'}
            </motion.div>
            
            {/* Stars for night mode */}
            {isDark && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      position: 'absolute',
                      left: `${35 + i * 8}px`,
                      top: `${8 + i * 4}px`,
                      fontSize: '6px',
                      color: '#ffffff',
                      zIndex: 1,
                    }}
                  >
                    ⭐
                  </motion.div>
                ))}
              </>
            )}
            
            {/* Clouds for day mode */}
            {!isDark && (
              <>
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, 5, 0],
                      opacity: [0.6, 0.9, 0.6],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    style={{
                      position: 'absolute',
                      left: `${8 + i * 15}px`,
                      top: `${6 + i * 3}px`,
                      fontSize: '8px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      zIndex: 1,
                    }}
                  >
                    ☁️
                  </motion.div>
                ))}
              </>
            )}
          </Box>

          {!isMobile && (
            <Button
              variant="contained"
              onClick={() => router.push('/register')}
              startIcon={<AutoAwesome />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 4,
                fontWeight: 700,
                fontSize: '0.95rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover': {
                  transform: 'translateY(-3px) scale(1.05)',
                  boxShadow: `0 12px 35px ${theme.palette.primary.main}50`,
                  '&::before': { left: '100%' },
                },
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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