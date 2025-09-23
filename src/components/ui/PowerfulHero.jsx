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
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <Box sx={{ textAlign: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Typography
              sx={{
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #feca57)',
                backgroundSize: '400% 400%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'powerGradient 4s ease infinite',
                textShadow: '0 0 30px rgba(255,107,107,0.5)',
                '@keyframes powerGradient': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
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
                mb: 4,
                color: isDark ? '#ffffff' : '#2c1810',
                fontWeight: 500,
                textShadow: '0 0 20px rgba(255,255,255,0.3)',
              }}
            >
              Empowering Your Journey with Cutting-Edge AI and Expert Mentorship
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            <AnimatedButton
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #d4a574, #8b4513)',
                boxShadow: '0 0 30px rgba(255,107,107,0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #c19660, #7a3f0f)',
                  boxShadow: '0 0 50px rgba(255,107,107,0.6)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              🔥 START NOW
            </AnimatedButton>
            
            <AnimatedButton
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                borderColor: '#8b4513',
                color: '#8b4513',
                borderWidth: 2,
                boxShadow: '0 0 20px rgba(78,205,196,0.3)',
                '&:hover': {
                  borderColor: '#7a3f0f',
                  color: '#7a3f0f',
                  boxShadow: '0 0 40px rgba(78,205,196,0.5)',
                  background: 'rgba(139,69,19,0.1)',
                },
              }}
            >
              ⚡ EXPLORE SOURCES
            </AnimatedButton>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
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
                    p: 2,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    border: `1px solid ${stat.color}`,
                    boxShadow: `0 0 15px ${stat.color}30`,
                    minWidth: 120,
                  }}
                >
                  <Box sx={{ fontSize: '1.5rem', color: stat.color, mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: stat.color, mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
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