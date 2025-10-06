'use client';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMuiTheme } from '@/theme/muiTheme';
import { useTheme } from '@/contexts/ThemeContext';
import Script from 'next/script';

import MenuBar from './MenuBar';
import PremiumAnimations from '../PremiumAnimations';
import Agent3D from '../Agent3D';
import AgentInteractiveEffects from '../AgentInteractiveEffects';
import HeroSection from './sections/Hero';
import FeaturesSection from './sections/Features';
import SuccessStoriesSection from './sections/SuccessStories';
import BusinessModelSection from './sections/BusinessModel';
import FooterSection from './sections/Footer';

const LandingPage = () => {
  const { isDark } = useTheme();
  const theme = createMuiTheme(isDark);

  useEffect(() => {
    let lenis = null;
    let rafId = null;

    const initLenis = () => {
      if (typeof window !== 'undefined' && window.Lenis) {
        lenis = new window.Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      }
    };

    // Wait for Lenis to load
    if (typeof window !== 'undefined' && window.Lenis) {
      initLenis();
    } else if (typeof window !== 'undefined') {
      window.addEventListener('lenisLoaded', initLenis);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('lenisLoaded', initLenis);
      }
    };
  }, []);

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.34/dist/lenis.min.js"
        onLoad={() => {
          window.dispatchEvent(new Event('lenisLoaded'));
        }}
      />
      <div data-theme={isDark ? 'dark' : 'light'}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Agent3D />
          <AgentInteractiveEffects />
          <main>
            <PremiumAnimations />
            <MenuBar />
            <HeroSection />
            <FeaturesSection />
            <SuccessStoriesSection />
            <BusinessModelSection />
            <FooterSection />
          </main>
        </ThemeProvider>
      </div>
    </>
  );
};

export default LandingPage;