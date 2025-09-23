'use client';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Rocket, Star, FlashOn } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import MotivationalBackground from '../3d/MotivationalBackground';
import ParticleBackground from './ParticleBackground';
import AnimatedButton from './AnimatedButton';
import Link from 'next/link';

const PowerfulHero = () => {
  const { isDark } = useTheme();
  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--background)',
          overflow: 'hidden',
        }}
      >
        <ParticleBackground />
        <MotivationalBackground />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: { xs: 2, md: 3 }, pt: { xs: 8, md: 10 } }}>
          <Box sx={{ textAlign: 'center', maxWidth: '1000px', mx: 'auto' }}>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Typography
                sx={{
                  fontFamily: '"Merriweather", serif',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  textAlign: 'center'
                }}
              >
                YOUR FUTURE IS OUR MISSION
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  mb: { xs: 3, md: 5 },
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.5,
                  px: { xs: 2, md: 0 }
                }}
              >
                Empowering Your Journey with Cutting-Edge AI and Expert Mentorship
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap', 
                marginBottom: '4rem',
                alignItems: 'center'
              }}
            >
              <Link href="/signup">
                <AnimatedButton
                  size="large"
                  className="btn btn-primary"
                  sx={{
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    fontWeight: 600,
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.02)',
                      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  START NOW
                </AnimatedButton>
              </Link>
              
              <Link href="/courses">
                <AnimatedButton
                  variant="outlined"
                  size="large"
                  className="btn btn-secondary"
                  sx={{
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                    borderWidth: 2,
                    fontWeight: 600,
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderColor: 'var(--primary)',
                      color: 'var(--primary)',
                      background: 'rgba(0,0,0,0.05)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  EXPLORE COURSES
                </AnimatedButton>
              </Link>
            </motion.div>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: { xs: 2, md: 4 }, 
              flexWrap: 'wrap',
              maxWidth: '800px',
              mx: 'auto'
            }}>
              {[
                { icon: <Rocket />, number: '50K+', label: 'Success Stories' },
                { icon: <Star />, number: '98%', label: 'Job Placement' },
                { icon: <FlashOn />, number: '24/7', label: 'AI Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 1.2 + index * 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Box
                    className="card"
                    sx={{
                      textAlign: 'center',
                      p: { xs: 2, md: 3 },
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 2,
                      minWidth: { xs: 100, md: 140 },
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    <Box sx={{ 
                      fontSize: { xs: '1.2rem', md: '1.5rem' }, 
                      color: 'var(--primary)', 
                      mb: 1 
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'var(--primary)', 
                        mb: 1,
                        fontSize: { xs: '1.2rem', md: '1.5rem' }
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'var(--text-secondary)', 
                        fontWeight: 500,
                        fontSize: { xs: '0.8rem', md: '0.9rem' }
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default PowerfulHero;