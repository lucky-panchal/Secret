'use client';
import { useState } from 'react';
import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, Grid, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { School, ArrowBack, ArrowForward, WorkOutline, EmojiEvents, AutoStories } from '@mui/icons-material';

const EducationStep = ({ data, onUpdate, onNext, onBack }) => {
  const [education, setEducation] = useState(data.education || '');
  const [experience, setExperience] = useState(data.experience || '');

  const educationOptions = [
    { value: 'High School', icon: '🎓', desc: 'High school diploma or equivalent' },
    { value: 'Associate Degree', icon: '📚', desc: '2-year college degree' },
    { value: 'Bachelor\'s Degree', icon: '🎓', desc: '4-year undergraduate degree' },
    { value: 'Master\'s Degree', icon: '🎯', desc: 'Graduate level education' },
    { value: 'PhD/Doctorate', icon: '👨‍🎓', desc: 'Highest academic degree' },
    { value: 'Professional Certification', icon: '🏆', desc: 'Industry certifications' },
    { value: 'Bootcamp Graduate', icon: '💻', desc: 'Intensive coding bootcamp' },
    { value: 'Self-Taught', icon: '📖', desc: 'Independent learning' }
  ];

  const experienceOptions = [
    { value: '0-1 years', icon: '🌱', desc: 'Just starting your career', color: '#10B981' },
    { value: '1-3 years', icon: '🚀', desc: 'Building foundational skills', color: '#3B82F6' },
    { value: '3-5 years', icon: '⭐', desc: 'Developing expertise', color: '#FBBF24' },
    { value: '5-10 years', icon: '🎯', desc: 'Experienced professional', color: '#A855F7' },
    { value: '10+ years', icon: '👑', desc: 'Senior level expertise', color: '#EC4899' }
  ];

  const handleNext = () => {
    onUpdate({ education, experience });
    onNext();
  };

  const isValid = education && experience;

  return (
    <Box sx={{ width: '100%', minHeight: '70vh' }}>
      {/* Header */}
      <Paper sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        borderRadius: 4,
        p: { xs: 4, md: 6 },
        textAlign: 'center',
        mb: 4
      }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)'
          }}>
            <School sx={{ fontSize: 40, color: 'white' }} />
          </Box>
        </motion.div>

        <Typography variant="h3" sx={{ 
          color: 'var(--text-primary)', 
          fontWeight: 800, 
          mb: 2,
          background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Education & Experience
        </Typography>
        
        <Typography variant="h6" sx={{ 
          color: 'var(--text-secondary)', 
          mb: 4,
          maxWidth: '700px',
          mx: 'auto'
        }}>
          Help us understand your background so we can tailor the perfect learning experience for your level.
        </Typography>
      </Paper>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Education Section */}
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)',
              borderRadius: 3,
              height: '100%'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AutoStories sx={{ fontSize: 28, color: '#FBBF24', mr: 2 }} />
                <Typography variant="h5" sx={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: 700
                }}>
                  Education Level
                </Typography>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ color: 'var(--text-secondary)' }}>
                  Select your highest education level
                </InputLabel>
                <Select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  label="Select your highest education level"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: '#ffffff',
                        border: '2px solid #e0e0e0',
                        borderRadius: 3,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                        '& .MuiMenuItem-root': {
                          color: '#1a1a1a',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f0f0f0',
                          fontWeight: 500,
                          '&:hover': {
                            background: '#f5f5f5',
                            color: '#FBBF24'
                          },
                          '&.Mui-selected': {
                            background: '#fff3cd',
                            color: '#FBBF24',
                            fontWeight: 600,
                            '&:hover': {
                              background: '#ffecb3'
                            }
                          }
                        }
                      }
                    }
                  }}
                  sx={{
                    background: '#ffffff',
                    borderRadius: 2,
                    border: '2px solid #e0e0e0',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '&:hover': {
                      background: '#f5f5f5',
                      border: '2px solid #FBBF24'
                    },
                    '&.Mui-focused': {
                      background: '#f8f9fa',
                      border: '2px solid #FBBF24',
                      boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)'
                    },
                    '& .MuiSelect-select': {
                      color: '#1a1a1a',
                      fontWeight: 600
                    },
                    '& .MuiSelect-icon': {
                      color: '#FBBF24'
                    }
                  }}
                >
                  {educationOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: '1.2rem', mr: 2 }}>
                          {option.icon}
                        </Typography>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {option.value}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            {option.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {education && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card sx={{
                    p: 2,
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)'
                  }}>
                    <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                      ✅ Selected: <strong>{education}</strong>
                    </Typography>
                  </Card>
                </motion.div>
              )}
            </Paper>
          </motion.div>
        </Grid>

        {/* Experience Section */}
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)',
              borderRadius: 3,
              height: '100%'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <WorkOutline sx={{ fontSize: 28, color: '#A855F7', mr: 2 }} />
                <Typography variant="h5" sx={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: 700
                }}>
                  Experience Level
                </Typography>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ color: 'var(--text-secondary)' }}>
                  Years of professional experience
                </InputLabel>
                <Select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  label="Years of professional experience"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: '#ffffff',
                        border: '2px solid #e0e0e0',
                        borderRadius: 3,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                        '& .MuiMenuItem-root': {
                          color: '#1a1a1a',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f0f0f0',
                          fontWeight: 500,
                          '&:hover': {
                            background: '#f5f5f5',
                            color: '#A855F7'
                          },
                          '&.Mui-selected': {
                            background: '#f3e8ff',
                            color: '#A855F7',
                            fontWeight: 600,
                            '&:hover': {
                              background: '#e9d5ff'
                            }
                          }
                        }
                      }
                    }
                  }}
                  sx={{
                    background: '#ffffff',
                    borderRadius: 2,
                    border: '2px solid #e0e0e0',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '&:hover': {
                      background: '#f5f5f5',
                      border: '2px solid #A855F7'
                    },
                    '&.Mui-focused': {
                      background: '#f8f9fa',
                      border: '2px solid #A855F7',
                      boxShadow: '0 0 10px rgba(168, 85, 247, 0.3)'
                    },
                    '& .MuiSelect-select': {
                      color: '#1a1a1a',
                      fontWeight: 600
                    },
                    '& .MuiSelect-icon': {
                      color: '#A855F7'
                    }
                  }}
                >
                  {experienceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: '1.2rem', mr: 2 }}>
                          {option.icon}
                        </Typography>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {option.value}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            {option.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {experience && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card sx={{
                    p: 2,
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.3)'
                  }}>
                    <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                      ✅ Selected: <strong>{experience}</strong>
                    </Typography>
                  </Card>
                </motion.div>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Navigation */}
      <Paper sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        borderRadius: 3,
        p: 3
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3
        }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{
              px: 4,
              py: 1.5,
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 2,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: '#FBBF24'
              }
            }}
          >
            Back
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ 
              color: 'var(--text-primary)',
              fontWeight: 600,
              mb: 1
            }}>
              {isValid ? 'Profile Complete!' : 'Complete Your Profile'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              {isValid ? 'Ready to generate your personalized assessment' : 'Please select both education and experience level'}
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={!isValid}
            sx={{
              px: 6,
              py: 1.5,
              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: '0 8px 25px rgba(251, 191, 36, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(251, 191, 36, 0.4)'
              },
              '&:disabled': {
                background: 'var(--border)',
                color: 'var(--text-secondary)'
              }
            }}
          >
            Continue
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EducationStep;