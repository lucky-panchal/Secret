'use client';
import { useState } from 'react';
import { Box, Typography, Button, Paper, Chip, Autocomplete, TextField, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Favorite, ArrowBack, ArrowForward, TrendingUp, Business, Science, Security, Devices, Analytics } from '@mui/icons-material';

const InterestsStep = ({ data, onUpdate, onNext, onBack }) => {
  const [selectedInterests, setSelectedInterests] = useState(data.interests || []);

  const interestCategories = {
    'AI/ML Focus': {
      icon: Science,
      color: '#EC4899',
      interests: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Neural Networks', 'Robotics', 'AutoML']
    },
    'Data & Analytics': {
      icon: Analytics,
      color: '#FBBF24',
      interests: ['Data Science', 'Big Data Analytics', 'Business Intelligence', 'Data Visualization', 'Statistical Analysis', 'Predictive Analytics', 'Data Mining']
    },
    'Blockchain & Crypto': {
      icon: Security,
      color: '#8B5CF6',
      interests: ['Blockchain Technology', 'Cryptocurrency', 'Smart Contracts', 'DeFi', 'NFT', 'Web3', 'Ethereum', 'Bitcoin']
    },
    'Development': {
      icon: Devices,
      color: '#10B981',
      interests: ['Web Development', 'Mobile Development', 'Full Stack', 'Frontend', 'Backend', 'API Development', 'Microservices']
    },
    'Emerging Tech': {
      icon: TrendingUp,
      color: '#00D4FF',
      interests: ['Cloud Computing', 'DevOps', 'Cybersecurity', 'IoT', 'Augmented Reality', 'Virtual Reality', 'Quantum Computing']
    },
    'Business & Strategy': {
      icon: Business,
      color: '#A855F7',
      interests: ['Product Management', 'Digital Marketing', 'Fintech', 'Healthcare Technology', 'EdTech', 'E-commerce', 'Consulting', 'Entrepreneurship']
    }
  };

  const allInterests = Object.values(interestCategories).flatMap(category => category.interests);

  const handleInterestChange = (event, newValue) => {
    setSelectedInterests(newValue);
  };

  const handleCategoryInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNext = () => {
    onUpdate({ interests: selectedInterests });
    onNext();
  };

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
            background: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
          }}>
            <Favorite sx={{ fontSize: 40, color: 'white' }} />
          </Box>
        </motion.div>

        <Typography variant="h3" sx={{ 
          color: 'var(--text-primary)', 
          fontWeight: 800, 
          mb: 2,
          background: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          What Interests You?
        </Typography>
        
        <Typography variant="h6" sx={{ 
          color: 'var(--text-secondary)', 
          mb: 4,
          maxWidth: '700px',
          mx: 'auto'
        }}>
          Select areas that excite you and align with your career aspirations. This helps us recommend the perfect learning path.
        </Typography>

        {/* Search Autocomplete */}
        <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
          <Autocomplete
            multiple
            options={allInterests}
            value={selectedInterests}
            onChange={handleInterestChange}
            componentsProps={{
              popper: {
                sx: {
                  '& .MuiAutocomplete-paper': {
                    background: '#ffffff',
                    border: '2px solid #e0e0e0',
                    borderRadius: 3,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                  },
                  '& .MuiAutocomplete-option': {
                    color: '#1a1a1a',
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    fontWeight: 500,
                    '&:hover': {
                      background: '#f5f5f5',
                      color: '#EC4899'
                    },
                    '&[aria-selected="true"]': {
                      background: '#fce4ec',
                      color: '#EC4899',
                      fontWeight: 600
                    }
                  }
                }
              }
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  sx={{
                    background: '#EC4899',
                    color: 'white',
                    fontWeight: 600,
                    m: 0.5,
                    border: '1px solid #EC4899',
                    '& .MuiChip-deleteIcon': {
                      color: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': { color: 'white' }
                    }
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="💡 Search interests or explore categories below..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: '#ffffff',
                    borderRadius: 3,
                    border: '2px solid #e0e0e0',
                    '& fieldset': { border: 'none' },
                    '&:hover': { 
                      background: '#f5f5f5',
                      border: '2px solid #EC4899'
                    },
                    '&.Mui-focused': { 
                      background: '#f8f9fa',
                      border: '2px solid #EC4899',
                      boxShadow: '0 0 10px rgba(236, 72, 153, 0.3)'
                    }
                  },
                  '& .MuiInputBase-input': { 
                    color: '#1a1a1a', 
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&::placeholder': { color: '#666666' }
                  }
                }}
              />
            )}
          />
        </Box>
      </Paper>

      {/* Interest Categories */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(interestCategories).map(([categoryName, category], categoryIndex) => (
          <Grid item xs={12} md={6} lg={4} key={categoryName}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            >
              <Paper sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${category.color}30`,
                borderRadius: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${category.color}20`
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `${category.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <category.icon sx={{ fontSize: 20, color: category.color }} />
                  </Box>
                  <Typography variant="h6" sx={{ 
                    color: 'var(--text-primary)', 
                    fontWeight: 700
                  }}>
                    {categoryName}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {category.interests.map((interest, interestIndex) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <motion.div
                        key={interest}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: (categoryIndex * 0.1) + (interestIndex * 0.05), duration: 0.3 }}
                      >
                        <Chip
                          label={interest}
                          onClick={() => handleCategoryInterestToggle(interest)}
                          sx={{
                            background: isSelected ? category.color : 'rgba(255, 255, 255, 0.05)',
                            color: isSelected ? 'white' : 'var(--text-secondary)',
                            border: `1px solid ${isSelected ? category.color : 'var(--border)'}`,
                            fontWeight: isSelected ? 600 : 400,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: isSelected ? category.color : `${category.color}20`,
                              color: isSelected ? 'white' : category.color,
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
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
                borderColor: '#EC4899'
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
              {selectedInterests.length} Interests Selected
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              {selectedInterests.length === 0 ? 'Select at least one interest to continue' : 'Perfect! These will shape your learning journey'}
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={selectedInterests.length === 0}
            sx={{
              px: 6,
              py: 1.5,
              background: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(236, 72, 153, 0.4)'
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

export default InterestsStep;