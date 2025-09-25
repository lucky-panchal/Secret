'use client';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMuiTheme } from '@/theme/muiTheme';
import { useTheme } from '@/contexts/ThemeContext';

import { MenuBar } from '@/components/landing';
import Hero from '@/components/landing/sections/Hero';
import Features from '@/components/landing/sections/Features';
import SuccessStories from '@/components/landing/sections/SuccessStories';
import BusinessModel from '@/components/landing/sections/BusinessModel';
import Footer from '@/components/landing/sections/Footer';

const LandingPage = () => {
  const { isDark } = useTheme();
  const theme = createMuiTheme(isDark);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <MenuBar />
          <Hero />
          <Features />
          <SuccessStories />
          <BusinessModel />
          <Footer />
        </main>
      </ThemeProvider>
    </div>
  );
};

export default LandingPage;