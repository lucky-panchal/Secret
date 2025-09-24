'use client';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMuiTheme } from '@/theme/muiTheme';
import { useTheme } from '@/contexts/ThemeContext';

import MenuBar from './MenuBar';
import HeroSection from './sections/Hero';
import FeaturesSection from './sections/Features';
import SuccessStoriesSection from './sections/SuccessStories';
import BusinessModelSection from './sections/BusinessModel';
import FooterSection from './sections/Footer';

const LandingPage = () => {
  const { isDark } = useTheme();
  const theme = createMuiTheme(isDark);

  useEffect(() => {
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
          <HeroSection />
          <FeaturesSection />
          <SuccessStoriesSection />
          <BusinessModelSection />
          <FooterSection />
        </main>
      </ThemeProvider>
    </div>
  );
};

export default LandingPage;