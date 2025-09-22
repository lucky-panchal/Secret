'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBack, ArrowForward, Code, DataObject, Cloud, Security } from '@mui/icons-material';

const slides = [
  {
    icon: <Code />,
    title: 'Full-Stack Development',
    subtitle: 'Master Modern Web Technologies',
    description: 'Build scalable applications with React, Node.js, and cloud platforms',
    color: '#61dafb',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    icon: <DataObject />,
    title: 'Data Science & AI',
    subtitle: 'Unlock the Power of Data',
    description: 'Transform data into insights with Python, ML, and deep learning',
    color: '#ff6b6b',
    bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    icon: <Cloud />,
    title: 'Cloud Architecture',
    subtitle: 'Scale to the Future',
    description: 'Design resilient systems with AWS, Azure, and DevOps practices',
    color: '#4ecdc4',
    bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    icon: <Security />,
    title: 'Cybersecurity',
    subtitle: 'Protect Digital Assets',
    description: 'Secure systems with ethical hacking and security frameworks',
    color: '#feca57',
    bgGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
];

const LearningSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Box
      sx={{
        position: 'relative',
        height: 400,
        borderRadius: 4,
        overflow: 'hidden',
        background: slides[currentSlide].bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'white',
          }}
        >
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Box
              sx={{
                fontSize: '4rem',
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            >
              {slides[currentSlide].icon}
            </Box>
          </motion.div>

          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              {slides[currentSlide].title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
              {slides[currentSlide].subtitle}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 500, mx: 'auto', lineHeight: 1.6 }}>
              {slides[currentSlide].description}
            </Typography>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: 16,
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          '&:hover': { background: 'rgba(255,255,255,0.3)' },
        }}
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: 16,
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          '&:hover': { background: 'rgba(255,255,255,0.3)' },
        }}
      >
        <ArrowForward />
      </IconButton>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LearningSlideshow;