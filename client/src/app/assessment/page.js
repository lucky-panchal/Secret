'use client';
import { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Typography, IconButton, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowBack, Psychology, Code, Favorite, School, Assessment } from '@mui/icons-material';
import ProtectedRoute from '@/components/ProtectedRoute';
import CareerRebuildLoader from '@/components/CareerRebuildLoader';
import WelcomeStep from '@/components/assessment/WelcomeStep';
import SkillsStep from '@/components/assessment/SkillsStep';
import InterestsStep from '@/components/assessment/InterestsStep';
import EducationStep from '@/components/assessment/EducationStep';
import OverviewStep from '@/components/assessment/OverviewStep';

const AssessmentPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    skills: [],
    interests: [],
    education: '',
    experience: ''
  });
  const { isDark } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  const steps = [
    { label: 'Welcome', icon: Psychology },
    { label: 'Skills', icon: Code },
    { label: 'Interests', icon: Favorite },
    { label: 'Education', icon: School },
    { label: 'Overview', icon: Assessment }
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDataUpdate = (stepData) => {
    setAssessmentData(prev => ({ ...prev, ...stepData }));
  };

  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async () => {
    try {
      setShowLoader(true);
      
      // Save assessment data to backend
      const assessmentPayload = {
        ...assessmentData,
        userId: user?._id,
        completedAt: new Date().toISOString()
      };
      
      console.log('Assessment completed:', assessmentPayload);
      
      // Save to backend API and generate AI profile
      const apiService = (await import('@/services/api')).default;
      await apiService.saveAssessment(assessmentPayload);
      
      // Generate AI-powered profile analysis
      await apiService.generateAIProfile();
      
      // Loader will handle the redirect after animation
    } catch (error) {
      console.error('Error saving assessment:', error);
      // Still show loader and redirect even if save fails
    }
  };

  const handleLoaderComplete = () => {
    // Direct redirect without hiding loader first
    router.replace('/dashboard');
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} />;
      case 1:
        return <SkillsStep data={assessmentData} onUpdate={handleDataUpdate} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <InterestsStep data={assessmentData} onUpdate={handleDataUpdate} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <EducationStep data={assessmentData} onUpdate={handleDataUpdate} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <OverviewStep data={assessmentData} onSubmit={handleSubmit} onBack={handleBack} />;
      default:
        return null;
    }
  };

  const progress = ((activeStep + 1) / steps.length) * 100;

  if (showLoader) {
    return (
      <ProtectedRoute>
        <CareerRebuildLoader onComplete={handleLoaderComplete} />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div data-theme={isDark ? 'dark' : 'light'}>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .assessment-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, 
            var(--background) 0%, 
            rgba(0, 212, 255, 0.02) 25%,
            rgba(168, 85, 247, 0.02) 75%,
            var(--background) 100%);
          position: relative;
          overflow: hidden;
        }
        
        .assessment-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.04) 0%, transparent 30%);
          pointer-events: none;
          z-index: 0;
        }
        
        [data-theme="light"] .assessment-container::before {
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.02) 0%, transparent 30%);
        }
        
        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--primary);
          border-radius: 50%;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.7; 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.3; 
          }
        }
        
        .assessment-container {
          --primary: #00D4FF;
          --secondary: #A855F7;
          --accent: #FBBF24;
          --success: #10B981;
          --warning: #F59E0B;
          --error: #EF4444;
          --text-primary: #F8FAFC;
          --text-secondary: #94A3B8;
          --border: rgba(255, 255, 255, 0.1);
          --gradient-primary: linear-gradient(135deg, #00D4FF 0%, #A855F7 100%);
          --gradient-secondary: linear-gradient(135deg, #A855F7 0%, #EC4899 100%);
          --background: #0F172A;
        }
        
        [data-theme="light"] .assessment-container {
          --text-primary: #1E293B;
          --text-secondary: #64748B;
          --border: rgba(0, 0, 0, 0.1);
          --background: #F8FAFC;
        }
      `}</style>
      
      <Box className="assessment-container">
        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Header */}
        <Box sx={{ 
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(30px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 4 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            maxWidth: '1400px',
            mx: 'auto'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              <IconButton 
                onClick={() => router.push('/register')}
                sx={{ 
                  color: 'var(--text-secondary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': { 
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: '#00D4FF',
                    borderColor: '#00D4FF',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <ArrowBack />
              </IconButton>
              <Box>
                <Typography variant="h5" sx={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}>
                  AI Career Assessment
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  display: { xs: 'none', sm: 'block' }
                }}>
                  Discover your AI/ML career potential
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  Step {activeStep + 1} of {steps.length}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem'
                }}>
                  {Math.round(progress)}% Complete
                </Typography>
              </Box>
              <Box sx={{ width: { xs: 80, md: 140 } }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #00D4FF 0%, #A855F7 100%)',
                      borderRadius: 4,
                      boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        
        {/* Main Content */}
        <Box sx={{ 
          position: 'relative',
          zIndex: 5,
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Professional Stepper */}
          <Box sx={{ 
            py: { xs: 3, md: 5 },
            px: { xs: 2, md: 4 },
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
              <Stepper 
                activeStep={activeStep} 
                alternativeLabel 
                sx={{ 
                  '& .MuiStepConnector-line': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderTopWidth: 3,
                    borderRadius: 2
                  },
                  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                    borderImage: 'linear-gradient(90deg, #00D4FF, #A855F7) 1',
                    borderTopWidth: 3
                  },
                  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                    borderImage: 'linear-gradient(90deg, #00D4FF, #A855F7) 1',
                    borderTopWidth: 3
                  }
                }}
              >
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;
                  
                  return (
                    <Step key={step.label}>
                      <StepLabel
                        StepIconComponent={() => (
                          <Box sx={{
                            width: { xs: 45, md: 60 },
                            height: { xs: 45, md: 60 },
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isCompleted || isActive 
                              ? 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)' 
                              : 'rgba(255, 255, 255, 0.1)',
                            color: isCompleted || isActive ? 'white' : 'rgba(255, 255, 255, 0.4)',
                            border: isActive ? '3px solid rgba(255, 255, 255, 0.3)' : '2px solid transparent',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: isActive 
                              ? '0 0 30px rgba(0, 212, 255, 0.6), 0 0 60px rgba(168, 85, 247, 0.3)' 
                              : isCompleted 
                              ? '0 8px 25px rgba(0, 212, 255, 0.3)'
                              : 'none',
                            transform: isActive ? 'scale(1.1)' : 'scale(1)',
                            position: 'relative',
                            '&::before': isActive ? {
                              content: '""',
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              border: '2px solid rgba(255, 255, 255, 0.2)',
                              animation: 'pulse 2s ease-in-out infinite'
                            } : {}
                          }}>
                            <StepIcon sx={{ fontSize: { xs: 20, md: 28 } }} />
                          </Box>
                        )}
                        sx={{
                          '& .MuiStepLabel-label': {
                            color: isCompleted || isActive ? '#00D4FF' : 'rgba(255, 255, 255, 0.6)',
                            fontWeight: isCompleted || isActive ? 700 : 500,
                            mt: 2,
                            fontSize: { xs: '0.85rem', md: '1rem' },
                            textShadow: isActive ? '0 0 10px rgba(0, 212, 255, 0.5)' : 'none',
                            transition: 'all 0.3s ease'
                          }
                        }}
                      >
                        {step.label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          </Box>
          
          {/* Enhanced Step Content */}
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            px: { xs: 2, md: 4 },
            py: { xs: 3, md: 6 },
            minHeight: 'calc(100vh - 300px)'
          }}>
            <Box sx={{ 
              width: '100%',
              maxWidth: activeStep === 0 ? '1000px' : '1300px',
              mx: 'auto'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.96 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <Box sx={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)'
                  }}>
                    {renderStep()}
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
    </ProtectedRoute>
  );
};

export default AssessmentPage;