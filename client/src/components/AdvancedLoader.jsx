'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const AdvancedLoader = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const phases = [
    { text: "Initializing AI Engine", duration: 1000, color: "#00F5FF" },
    { text: "Analyzing Your Profile", duration: 1500, color: "#A855F7" },
    { text: "Processing Market Data", duration: 1200, color: "#FBBF24" },
    { text: "Generating Recommendations", duration: 1800, color: "#10B981" },
    { text: "Building Career Roadmap", duration: 1500, color: "#EC4899" },
    { text: "Finalizing Your Journey", duration: 1000, color: "#00F5FF" }
  ];

  useEffect(() => {
    const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current phase
      let phaseElapsed = 0;
      for (let i = 0; i < phases.length; i++) {
        phaseElapsed += phases[i].duration;
        if (elapsed <= phaseElapsed) {
          setCurrentPhase(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      {/* Matrix Rain Effect */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: window.innerHeight + 100,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            width: 2,
            height: 20,
            background: `linear-gradient(to bottom, transparent, ${phases[currentPhase]?.color}80, transparent)`,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Central Loader */}
      <Box sx={{ textAlign: 'center', zIndex: 10 }}>
        {/* Spinning Rings */}
        <Box sx={{ position: 'relative', mb: 4 }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 80 + i * 40,
                height: 80 + i * 40,
                border: `2px solid ${phases[currentPhase]?.color}${60 - i * 20}`,
                borderTop: `2px solid ${phases[currentPhase]?.color}`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {/* Center Pulse */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 60,
              height: 60,
              background: `radial-gradient(circle, ${phases[currentPhase]?.color}60 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </Box>

        {/* Phase Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                color: phases[currentPhase]?.color,
                fontWeight: 700,
                mb: 2,
                textShadow: `0 0 20px ${phases[currentPhase]?.color}60`
              }}
            >
              {phases[currentPhase]?.text}
            </Typography>
          </motion.div>
        </AnimatePresence>

        {/* Progress */}
        <Typography variant="h6" sx={{ color: '#64748b', mb: 2 }}>
          {Math.round(progress)}% Complete
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ width: 300, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${phases[currentPhase]?.color} 0%, #ffffff 100%)`,
              boxShadow: `0 0 20px ${phases[currentPhase]?.color}80`
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdvancedLoader;