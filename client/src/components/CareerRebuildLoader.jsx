'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Psychology, 
  AutoAwesome, 
  TrendingUp, 
  School, 
  WorkOutline,
  Rocket,
  EmojiEvents,
  Analytics
} from '@mui/icons-material';

const CareerRebuildLoader = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { 
      icon: Psychology, 
      title: "Analyzing Your Profile", 
      subtitle: "Processing your skills and interests",
      color: "#00F5FF",
      duration: 1500
    },
    { 
      icon: AutoAwesome, 
      title: "AI Magic in Progress", 
      subtitle: "Generating personalized recommendations",
      color: "#A855F7",
      duration: 2000
    },
    { 
      icon: TrendingUp, 
      title: "Market Analysis", 
      subtitle: "Identifying trending opportunities",
      color: "#FBBF24",
      duration: 1500
    },
    { 
      icon: School, 
      title: "Course Matching", 
      subtitle: "Finding perfect learning paths",
      color: "#10B981",
      duration: 1500
    },
    { 
      icon: WorkOutline, 
      title: "Career Roadmap", 
      subtitle: "Building your success pathway",
      color: "#EC4899",
      duration: 1500
    },
    { 
      icon: Rocket, 
      title: "Launch Ready!", 
      subtitle: "Your new career awaits",
      color: "#00F5FF",
      duration: 1000
    }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step based on elapsed time
      let stepElapsed = 0;
      for (let i = 0; i < steps.length; i++) {
        stepElapsed += steps[i].duration;
        if (elapsed <= stepElapsed) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(progressInterval);
        // Immediate completion without delay
        onComplete();
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  const currentStepData = steps[currentStep];

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: isDark 
            ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          overflow: 'hidden'
        }}
      >
      {/* Animated Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 20%, ${currentStepData?.color}${isDark ? '15' : '08'} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${currentStepData?.color}${isDark ? '10' : '05'} 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, ${currentStepData?.color}${isDark ? '08' : '03'} 0%, transparent 50%)
          `,
          transition: 'background 0.8s ease'
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: 4 + Math.random() * 4,
            height: 4 + Math.random() * 4,
            background: currentStepData?.color || '#00F5FF',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Main Content */}
      <Box
        sx={{
          textAlign: 'center',
          zIndex: 10,
          maxWidth: '600px',
          px: 4
        }}
      >
        {/* Central Icon Animation */}
        <Box sx={{ mb: 6 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${currentStepData?.color}40 0%, ${currentStepData?.color}20 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  position: 'relative',
                  boxShadow: `0 0 60px ${currentStepData?.color}40`,
                  border: `2px solid ${currentStepData?.color}60`
                }}
              >
                {currentStepData && (
                  <currentStepData.icon 
                    sx={{ 
                      fontSize: 60, 
                      color: currentStepData.color 
                    }} 
                  />
                )}
                
                {/* Rotating Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    position: 'absolute',
                    width: '140px',
                    height: '140px',
                    border: `3px solid ${currentStepData?.color}30`,
                    borderTop: `3px solid ${currentStepData?.color}`,
                    borderRadius: '50%'
                  }}
                />
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Step Title and Subtitle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              sx={{
                color: isDark ? '#ffffff' : '#0f0f23',
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                background: `linear-gradient(135deg, ${currentStepData?.color} 0%, ${isDark ? '#ffffff' : '#0f0f23'} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {currentStepData?.title}
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: isDark ? '#94a3b8' : '#64748b',
                mb: 4,
                fontWeight: 400
              }}
            >
              {currentStepData?.subtitle}
            </Typography>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: isDark ? '#64748b' : '#475569' }}>
              Step {currentStep + 1} of {steps.length}
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? '#64748b' : '#475569' }}>
              {Math.round(progress)}%
            </Typography>
          </Box>
          
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${currentStepData?.color} 0%, ${isDark ? '#ffffff' : '#0f0f23'} 100%)`,
                borderRadius: 4,
                boxShadow: `0 0 20px ${currentStepData?.color}60`
              }
            }}
          />
        </Box>

        {/* Step Indicators */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              animate={{
                scale: index === currentStep ? 1.2 : 1,
                opacity: index <= currentStep ? 1 : 0.3
              }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: index <= currentStep 
                    ? `linear-gradient(135deg, ${step.color} 0%, #ffffff 100%)`
                    : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: index === currentStep 
                    ? `0 0 20px ${step.color}80` 
                    : 'none'
                }}
              />
            </motion.div>
          ))}
        </Box>

        {/* Loading Animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: currentStepData?.color,
              fontWeight: 600,
              letterSpacing: 1,
              textShadow: `0 0 10px ${currentStepData?.color}40`
            }}
          >
            🚀 Building Your Future...
          </Typography>
        </motion.div>

        {/* DNA Helix Animation */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            pointerEvents: 'none',
            zIndex: -1
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                rotate: {
                  duration: 15 + i * 3,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 30 + i * 15,
                height: 30 + i * 15,
                border: `2px solid ${currentStepData?.color}${Math.max(15, 60 - i * 4)}`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                borderStyle: i % 2 === 0 ? 'solid' : 'dashed'
              }}
            />
          ))}
        </Box>

        {/* Quantum Particles */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: 3 + Math.random() * 3,
                height: 3 + Math.random() * 3,
                background: currentStepData?.color,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${currentStepData?.color}`
              }}
            />
          ))}
        </Box>
      </Box>
      </Box>
    </div>
  );
};

export default CareerRebuildLoader;