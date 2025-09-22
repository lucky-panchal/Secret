'use client';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp, Psychology, EmojiObjects } from '@mui/icons-material';
import MotivationalBackground from '../3d/MotivationalBackground';
import ParticleBackground from './ParticleBackground';
import AnimatedButton from './AnimatedButton';

const UniqueHero = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%)',
        overflow: 'hidden',
      }}
    >
      <ParticleBackground />
      <MotivationalBackground />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient 3s ease infinite',
                  '@keyframes gradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                  },
                }}
              >
                Transform
                <br />
                Your Mind
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: 500,
                  lineHeight: 1.8,
                }}
              >
                Unlock your potential with AI-powered learning paths designed for the future workforce
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <AnimatedButton
                size="large"
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff5252, #26c6da)',
                  },
                }}
              >
                Begin Journey
              </AnimatedButton>
              
              <AnimatedButton
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.2rem',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                }}
              >
                Explore Paths
              </AnimatedButton>
            </motion.div>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              { icon: <Psychology />, title: 'AI-Powered Learning', desc: 'Personalized curriculum adapts to your pace' },
              { icon: <TrendingUp />, title: 'Career Growth', desc: 'Track progress with real-time analytics' },
              { icon: <EmojiObjects />, title: 'Innovation Focus', desc: 'Learn cutting-edge technologies' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UniqueHero;