'use client';
import { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Typography, IconButton, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowBack, Psychology, Code, Favorite, School, Assessment } from '@mui/icons-material';
import SecureAuthModal from '@/components/auth/SecureAuthModal';
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
  const [showSecureAuth, setShowSecureAuth] = useState(false);
  const [isSecureAuthVerified, setIsSecureAuthVerified] = useState(false);
  const [particles, setParticles] = useState([]);
  const { isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setParticles([...Array(8)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4
    })));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (!user?.secureAuth && !isSecureAuthVerified) {
      setShowSecureAuth(true);
    }
  }, [isAuthenticated, user, isSecureAuthVerified, router]);

  const handleSecureAuthSuccess = async (authData) => {
    setIsSecureAuthVerified(true);
    setShowSecureAuth(false);
    // Update user with secure auth status if needed
    if (authData?.user) {
      // User data is already updated via AuthContext
    }
  };

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

  const handleSubmit = () => {
    console.log('Assessment Data:', assessmentData);
    router.push('/dashboard');
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

  return (
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
      `}</style>
      
      <Box className="assessment-container">
        {/* Floating Particles */}
        {particles.length > 0 && (
          <div className="floating-particles">
            {particles.map((p, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Header */}
        <Box sx={{ 
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          py: 2,
          px: 3
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            maxWidth: '1400px',
            mx: 'auto'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton 
                onClick={() => router.push('/register')}
                sx={{ 
                  color: 'var(--text-secondary)',
                  '&:hover': { 
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: 'var(--primary)'
                  }
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" sx={{ 
                color: 'var(--text-primary)', 
                fontWeight: 700,
                background: 'var(--gradient-primary)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                AI/ML Career Assessment
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                Step {activeStep + 1} of {steps.length}
              </Typography>
              <Box sx={{ width: 120 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    background: 'var(--border)',
                    '& .MuiLinearProgress-bar': {
                      background: 'var(--gradient-primary)',
                      borderRadius: 3
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
          {/* Enhanced Stepper */}
          <Box sx={{ 
            py: 4,
            px: 3,
            background: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(10px)'
          }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
              <Stepper 
                activeStep={activeStep} 
                alternativeLabel 
                sx={{ 
                  '& .MuiStepConnector-line': {
                    borderColor: 'var(--border)',
                    borderTopWidth: 2
                  },
                  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                    borderColor: 'var(--primary)'
                  },
                  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                    borderColor: 'var(--primary)'
                  }
                }}
              >
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <Step key={step.label}>
                      <StepLabel
                        StepIconComponent={() => (
                          <Box sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: index <= activeStep ? 'var(--gradient-primary)' : 'var(--border)',
                            color: index <= activeStep ? 'white' : 'var(--text-secondary)',
                            transition: 'all 0.3s ease',
                            boxShadow: index === activeStep ? '0 0 20px rgba(0, 212, 255, 0.4)' : 'none'
                          }}>
                            <StepIcon sx={{ fontSize: 24 }} />
                          </Box>
                        )}
                        sx={{
                          '& .MuiStepLabel-label': {
                            color: 'var(--text-secondary)',
                            fontWeight: 500,
                            mt: 1,
                            '&.Mui-active': {
                              color: 'var(--primary)',
                              fontWeight: 600
                            },
                            '&.Mui-completed': {
                              color: 'var(--primary)',
                              fontWeight: 600
                            }
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
          
          {/* Step Content */}
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 3,
            py: 4
          }}>
            <Box sx={{ 
              width: '100%',
              maxWidth: activeStep === 0 ? '900px' : '1200px',
              mx: 'auto'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </Box>

        <SecureAuthModal
          open={showSecureAuth}
          onClose={() => router.push('/dashboard')}
          onSuccess={handleSecureAuthSuccess}
          userEmail={user?.email || ''}
          userId={user?.id || user?.email || ''}
        />
      </Box>
    </div>
  );
};

export default AssessmentPage;