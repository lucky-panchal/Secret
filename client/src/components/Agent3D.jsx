'use client';
import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { Pause, PlayArrow, Speed } from '@mui/icons-material';

const Agent3D = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* 3D Agent */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          animation: isPaused ? 'none' : `agentFloat ${6/speed}s ease-in-out infinite, agentRotate ${12/speed}s linear infinite`,
          '@keyframes agentFloat': {
            '0%, 100%': { transform: 'translate(-50%, -50%) translateY(0px)' },
            '50%': { transform: 'translate(-50%, -50%) translateY(-30px)' },
          },
          '@keyframes agentRotate': {
            '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
            '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
          },
        }}
      >
        {/* Main Head */}
        <Box
          sx={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #2a2a3e, #1a1a2e, #0f0f1a)',
            position: 'relative',
            margin: '0 auto',
            boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.6), inset 20px 20px 40px rgba(255,255,255,0.1), 0 0 60px rgba(0, 188, 212, 0.4)',
            animation: isPaused ? 'none' : `agentPulse ${4/speed}s ease-in-out infinite`,
            '@keyframes agentPulse': {
              '0%, 100%': { boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.6), inset 20px 20px 40px rgba(255,255,255,0.1), 0 0 60px rgba(0, 188, 212, 0.4)' },
              '50%': { boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.6), inset 20px 20px 40px rgba(255,255,255,0.1), 0 0 100px rgba(0, 188, 212, 0.6)' },
            },
          }}
        >
          {/* Eyes */}
          <Box
            sx={{
              position: 'absolute',
              top: '35%',
              left: '25%',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00f5ff, #00bcd4)',
              boxShadow: '0 0 20px #00f5ff',
              animation: isPaused ? 'none' : `eyeBlink ${5/speed}s infinite, eyeGaze ${8/speed}s ease-in-out infinite`,
              '@keyframes eyeBlink': {
                '0%, 90%, 100%': { transform: 'scaleY(1)' },
                '95%': { transform: 'scaleY(0.1)' },
              },
              '@keyframes eyeGaze': {
                '0%, 100%': { transform: 'translateX(0px)' },
                '25%': { transform: 'translateX(3px)' },
                '75%': { transform: 'translateX(-3px)' },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '35%',
              right: '25%',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00f5ff, #00bcd4)',
              boxShadow: '0 0 20px #00f5ff',
              animation: isPaused ? 'none' : `eyeBlink ${5/speed}s infinite, eyeGaze ${8/speed}s ease-in-out infinite`,
            }}
          />
          
          {/* Nose */}
          <Box
            sx={{
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#333',
            }}
          />
        </Box>
        
        {/* Glowing Aura */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, transparent 60%, rgba(0, 188, 212, 0.1) 70%, rgba(0, 188, 212, 0.3) 100%)',
            animation: isPaused ? 'none' : `auraGlow ${3/speed}s ease-in-out infinite`,
            '@keyframes auraGlow': {
              '0%, 100%': { opacity: 0.6, transform: 'translate(-50%, -50%) scale(1)' },
              '50%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1.1)' },
            },
          }}
        />
      </Box>
      
      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: `${20 + (i * 10)}%`,
            top: `${30 + (i % 3) * 20}%`,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#00bcd4',
            boxShadow: '0 0 10px #00bcd4',
            animation: isPaused ? 'none' : `particleFloat${i} ${(3 + i * 0.5)/speed}s ease-in-out infinite`,
            [`@keyframes particleFloat${i}`]: {
              '0%, 100%': { transform: 'translateY(0px)', opacity: 0.3 },
              '50%': { transform: 'translateY(-20px)', opacity: 1 },
            },
          }}
        />
      ))}
      
      {/* Accessibility Controls */}
      {showControls && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            display: 'flex',
            gap: 1,
            pointerEvents: 'auto',
            opacity: 0.7,
            '&:hover': { opacity: 1 },
          }}
        >
          <IconButton
            onClick={() => setIsPaused(!isPaused)}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
            }}
            size="small"
          >
            {isPaused ? <PlayArrow /> : <Pause />}
          </IconButton>
          
          <IconButton
            onClick={() => setSpeed(speed === 1 ? 0.5 : speed === 0.5 ? 0.2 : 1)}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
            }}
            size="small"
          >
            <Speed />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Agent3D;