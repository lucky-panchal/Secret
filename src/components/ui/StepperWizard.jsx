'use client';
import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material';

const steps = ['Profile Setup', 'Skill Assessment', 'Learning Path', 'Get Started'];

const StepperWizard = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const stepContent = {
    0: 'Tell us about your background and career goals.',
    1: 'Take a quick assessment to identify your current skill level.',
    2: 'We\'ll create a personalized learning path just for you.',
    3: 'You\'re all set! Start your reskilling journey today.',
  };

  return (
    <Paper
      sx={{
        p: 4,
        background: 'rgba(26,26,26,0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
      }}
    >
      <Stepper 
        activeStep={activeStep} 
        sx={{
          mb: 4,
          '& .MuiStepIcon-root': {
            color: 'rgba(255,255,255,0.3)',
            '&.Mui-active': {
              color: '#ffffff',
            },
            '&.Mui-completed': {
              color: '#4caf50',
            },
          },
          '& .MuiStepLabel-label': {
            color: 'rgba(255,255,255,0.7)',
            '&.Mui-active': {
              color: '#ffffff',
            },
            '&.Mui-completed': {
              color: '#4caf50',
            },
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={({ active, completed }) => (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: completed 
                        ? '#4caf50' 
                        : active 
                        ? 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)'
                        : 'rgba(255,255,255,0.1)',
                      color: completed || active ? '#0a0a0a' : '#ffffff',
                      border: `2px solid ${completed ? '#4caf50' : active ? '#ffffff' : 'rgba(255,255,255,0.3)'}`,
                    }}
                  >
                    {completed ? <CheckCircle /> : index + 1}
                  </Box>
                </motion.div>
              )}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            {steps[activeStep]}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            {stepContent[activeStep]}
          </Typography>
        </motion.div>
      </AnimatePresence>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<ArrowBack />}
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.6)',
                background: 'rgba(255,255,255,0.05)',
              },
            }}
            variant="outlined"
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            endIcon={<ArrowForward />}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
              color: '#0a0a0a',
              '&:hover': {
                background: 'linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)',
              },
            }}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </motion.div>
      </Box>
    </Paper>
  );
};

export default StepperWizard;