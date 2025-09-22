'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward, PlayArrow } from '@mui/icons-material';
import FloatingShapes from '../3d/FloatingShapes';

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        overflow: 'hidden',
      }}
    >
      <FloatingShapes />
      
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradienReskillt(45deg, #ffffff 30%, #cccccc 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
             for the
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Future
            </motion.span>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: 'text.secondary',
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            Transform your career with cutting-edge skills. Join thousands of professionals 
            who've successfully transitioned to high-demand roles.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                color: '#0a0a0a',
                '&:hover': {
                  background: 'linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)',
                  boxShadow: '0 12px 40px rgba(255,255,255,0.2)',
                },
              }}
            >
              Start Learning
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.6)',
                  background: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Box
          sx={{
            width: 2,
            height: 40,
            background: 'linear-gradient(to bottom, transparent, white, transparent)',
            borderRadius: 1,
          }}
        />
      </motion.div>
    </Box>
  );
};

export default HeroSection;