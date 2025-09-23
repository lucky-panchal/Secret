'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();

  // Memoized animation variants for performance
  const slideVariants = useMemo(() => ({
    enter: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.9,
      y: shouldReduceMotion ? 0 : 20
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.1,
      y: shouldReduceMotion ? 0 : -20
    }
  }), [shouldReduceMotion]);

  const iconVariants = useMemo(() => ({
    initial: { y: shouldReduceMotion ? 0 : -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.1, duration: shouldReduceMotion ? 0.2 : 0.4, ease: "easeOut" }
  }), [shouldReduceMotion]);

  const textVariants = useMemo(() => ({
    initial: { y: shouldReduceMotion ? 0 : 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.2, duration: shouldReduceMotion ? 0.2 : 0.5, ease: "easeOut" }
  }), [shouldReduceMotion]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <Box
      sx={{
        position: 'relative',
        height: 400,
        borderRadius: 4,
        overflow: 'hidden',
        background: currentSlideData.bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'background',
        transform: 'translateZ(0)', // Hardware acceleration
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.5,
            ease: "easeInOut"
          }}
          style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'white',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
        >
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            <Box
              sx={{
                fontSize: '4rem',
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                willChange: 'transform'
              }}
            >
              {currentSlideData.icon}
            </Box>
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                mb: 1, 
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                willChange: 'transform'
              }}
            >
              {currentSlideData.title}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                opacity: 0.9,
                willChange: 'transform'
              }}
            >
              {currentSlideData.subtitle}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: 500, 
                mx: 'auto', 
                lineHeight: 1.6,
                willChange: 'transform'
              }}
            >
              {currentSlideData.description}
            </Typography>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: 16,
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            '&:hover': { 
              background: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowBack />
        </IconButton>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: 16,
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            '&:hover': { 
              background: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowForward />
        </IconButton>
      </motion.div>

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
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              onClick={() => goToSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.8)'
                }
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default LearningSlideshow;