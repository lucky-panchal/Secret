'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Card, LinearProgress } from '@mui/material';
import { Rocket, Timeline, School, Work, CheckCircle } from '@mui/icons-material';

const NavothhanLanding = () => {
  const [showPortal, setShowPortal] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const steps = [
    { id: 1, title: 'Personalized Roadmap', icon: Timeline, progress: 0, color: '#00D4FF' },
    { id: 2, title: 'Learning Phase', icon: School, progress: 0, color: '#A855F7' },
    { id: 3, title: 'Certification', icon: CheckCircle, progress: 0, color: '#FBBF24' },
    { id: 4, title: 'Job Placement', icon: Work, progress: 0, color: '#10B981' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowPortal(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      {/* Portal Entry Animation */}
      <AnimatePresence>
        {showPortal && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 20, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, #00D4FF 0%, #A855F7 50%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 9999,
              boxShadow: '0 0 100px #00D4FF, inset 0 0 50px #A855F7'
            }}
          />
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
        `,
        zIndex: 0
      }} />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showPortal ? 0 : 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        {/* Header */}
        <Box sx={{ 
          position: 'relative', 
          zIndex: 10, 
          pt: 4, 
          px: 4,
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <Box sx={{ maxWidth: '1400px', mx: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ 
              color: '#00D4FF', 
              fontWeight: 800,
              background: 'linear-gradient(45deg, #00D4FF, #A855F7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              NAVOTHHAN
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {steps.map((step, index) => (
                <Box key={step.id} sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: index <= currentStep ? step.color : 'rgba(255,255,255,0.2)',
                  boxShadow: index <= currentStep ? `0 0 10px ${step.color}` : 'none'
                }} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Hero Section */}
        <Box sx={{ position: 'relative', zIndex: 5, px: 4, py: 8 }}>
          <Box sx={{ maxWidth: '1400px', mx: 'auto', textAlign: 'center' }}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <Typography variant="h1" sx={{
                fontSize: { xs: '3rem', md: '5rem' },
                fontWeight: 900,
                background: 'linear-gradient(45deg, #00D4FF, #A855F7, #FBBF24)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3
              }}>
                Rebuild Your Career
              </Typography>
              <Typography variant="h3" sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 6,
                fontWeight: 300
              }}>
                with AI-Powered Reskilling
              </Typography>
              <Typography variant="h6" sx={{
                color: 'rgba(255,255,255,0.6)',
                mb: 8,
                maxWidth: '800px',
                mx: 'auto'
              }}>
                Welcome! Your personalized reskilling journey starts here. Transform your career with cutting-edge AI, ML, and Blockchain technologies.
              </Typography>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <Box sx={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(0, 212, 255, 0.3)',
                p: 4,
                mb: 6
              }}>
                <Typography variant="h5" sx={{ color: '#fff', mb: 4, fontWeight: 600 }}>
                  Your Reskilling Dashboard
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={25} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(45deg, #00D4FF, #A855F7)',
                        borderRadius: 4
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1 }}>
                    Step 1 of 4 - Ready to Begin
                  </Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                  {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <motion.div
                        key={step.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card sx={{
                          background: `rgba(${step.color === '#00D4FF' ? '0,212,255' : step.color === '#A855F7' ? '168,85,247' : step.color === '#FBBF24' ? '251,191,36' : '16,185,129'},0.1)`,
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${step.color}40`,
                          borderRadius: 3,
                          p: 3,
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            border: `1px solid ${step.color}`,
                            boxShadow: `0 10px 30px ${step.color}30`
                          }
                        }}>
                          <Box sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: `${step.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2
                          }}>
                            <StepIcon sx={{ fontSize: 30, color: step.color }} />
                          </Box>
                          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                            Step {step.id}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {step.title}
                          </Typography>
                        </Card>
                      </motion.div>
                    );
                  })}
                </Box>
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/navothhan/roadmap')}
                sx={{
                  px: 8,
                  py: 3,
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #00D4FF, #A855F7)',
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 40px rgba(0, 212, 255, 0.4)'
                  }
                }}
              >
                🚀 Start Your Roadmap
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default NavothhanLanding;