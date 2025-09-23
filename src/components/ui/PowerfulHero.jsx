'use client';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp, Psychology, EmojiObjects, Rocket, Star, FlashOn } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import MotivationalBackground from '../3d/MotivationalBackground';
import ParticleBackground from './ParticleBackground';
import AnimatedButton from './AnimatedButton';

const PowerfulHero = () => {
  const { isDark } = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: isDark ? 'radial-gradient(ellipse at center, #1a1a2e 0%, #000000 70%)' : 'radial-gradient(ellipse at center, #f5f1eb 0%, #faf6f2 70%)',
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
                fontFamily: '"Spectral SC", serif',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                fontWeight: 700,
                mb: { xs: 2, md: 3 },
                color: isDark ? '#ffffff' : '#1a1a1a',
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
                fontFamily: '"Lora", serif',
                mb: { xs: 3, md: 5 },
                color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.8)',
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
            <AnimatedButton
              size="large"
              sx={{
                px: { xs: 3, md: 5 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.2rem' },
                background: 'linear-gradient(45deg, #d4a574, #8b4513)',
                color: isDark ? '#f5f5dc' : '#2c2c2c',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #c19660, #7a3f0f)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              START NOW
            </AnimatedButton>
            
            <AnimatedButton
              variant="outlined"
              size="large"
              sx={{
                px: { xs: 3, md: 5 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.2rem' },
                borderColor: isDark ? '#f5f5dc' : '#555555',
                color: isDark ? '#f5f5dc' : '#555555',
                borderWidth: 2,
                fontWeight: 600,
                '&:hover': {
                  borderColor: isDark ? '#e6e6d4' : '#333333',
                  color: isDark ? '#e6e6d4' : '#333333',
                  background: isDark ? 'rgba(245,245,220,0.1)' : 'rgba(85,85,85,0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              EXPLORE COURSES
            </AnimatedButton>
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
              { icon: <Rocket />, number: '50K+', label: 'Success Stories', color: '#ff6b6b' },
              { icon: <Star />, number: '98%', label: 'Job Placement', color: '#feca57' },
              { icon: <FlashOn />, number: '24/7', label: 'AI Support', color: '#4ecdc4' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.2 + index * 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    p: { xs: 2, md: 3 },
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)',
                    minWidth: { xs: 100, md: 140 },
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <Box sx={{ 
                    fontSize: { xs: '1.2rem', md: '1.5rem' }, 
                    color: isDark ? '#ffffff' : '#1976d2', 
                    mb: 1 
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      color: isDark ? '#ffffff' : '#1976d2', 
                      mb: 1,
                      fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(26,26,26,0.7)', 
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
  );
};

export default PowerfulHero;