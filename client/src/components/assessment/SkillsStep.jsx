'use client';
import { useState } from 'react';
import { Box, Typography, Button, Paper, Chip, Autocomplete, TextField, Grid, Fade } from '@mui/material';
import { motion } from 'framer-motion';
import { Code, ArrowBack, ArrowForward, Psychology, Memory, Cloud, Security } from '@mui/icons-material';

const SkillsStep = ({ data, onUpdate, onNext, onBack }) => {
  const [selectedSkills, setSelectedSkills] = useState(data.skills || []);

  const skillCategories = {
    'AI/ML': {
      icon: Psychology,
      color: '#00D4FF',
      skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Artificial Intelligence', 'Neural Networks', 'Natural Language Processing', 'Computer Vision', 'Scikit-learn', 'Keras', 'OpenCV', 'Hugging Face']
    },
    'Programming': {
      icon: Code,
      color: '#A855F7',
      skills: ['Python', 'JavaScript', 'Java', 'C++', 'R Programming', 'Go', 'Rust', 'TypeScript', 'Swift', 'Kotlin']
    },
    'Data Science': {
      icon: Memory,
      color: '#FBBF24',
      skills: ['Data Science', 'Data Analysis', 'Statistics', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter', 'Apache Spark', 'Tableau', 'Power BI']
    },
    'Web/Mobile': {
      icon: Code,
      color: '#EC4899',
      skills: ['React', 'Node.js', 'Angular', 'Vue.js', 'React Native', 'Flutter', 'Django', 'Flask', 'Express.js', 'Next.js']
    },
    'Cloud/DevOps': {
      icon: Cloud,
      color: '#10B981',
      skills: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD', 'Jenkins', 'Terraform', 'Linux']
    },
    'Blockchain': {
      icon: Security,
      color: '#8B5CF6',
      skills: ['Blockchain', 'Solidity', 'Web3', 'Smart Contracts', 'Ethereum', 'DeFi', 'NFT', 'Cryptocurrency', 'Hyperledger']
    },
    'Database': {
      icon: Memory,
      color: '#F59E0B',
      skills: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Neo4j', 'Cassandra']
    }
  };

  const allSkills = Object.values(skillCategories).flatMap(category => category.skills);

  const handleSkillChange = (event, newValue) => {
    setSelectedSkills(newValue);
  };

  const handleCategorySkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleNext = () => {
    onUpdate({ skills: selectedSkills });
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
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)'
          }}>
            <Code sx={{ fontSize: 40, color: 'white' }} />
          </Box>
        </motion.div>

        <Typography variant="h3" sx={{ 
          color: 'var(--text-primary)', 
          fontWeight: 800, 
          mb: 2,
          background: 'var(--gradient-primary)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Select Your Skills
        </Typography>
        
        <Typography variant="h6" sx={{ 
          color: 'var(--text-secondary)', 
          mb: 4,
          maxWidth: '600px',
          mx: 'auto'
        }}>
          Choose technologies and skills you're familiar with. This helps us create your personalized learning path.
        </Typography>

        {/* Search Autocomplete */}
        <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
          <Autocomplete
            multiple
            options={allSkills}
            value={selectedSkills}
            onChange={handleSkillChange}
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
                      color: '#00D4FF'
                    },
                    '&[aria-selected="true"]': {
                      background: '#e3f2fd',
                      color: '#00D4FF',
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
                    background: '#00D4FF',
                    color: 'white',
                    fontWeight: 600,
                    m: 0.5,
                    border: '1px solid #00D4FF',
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
                placeholder="🔍 Search skills or browse categories below..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: '#ffffff',
                    borderRadius: 3,
                    border: '2px solid #e0e0e0',
                    '& fieldset': { border: 'none' },
                    '&:hover': { 
                      background: '#f5f5f5',
                      border: '2px solid #00D4FF'
                    },
                    '&.Mui-focused': { 
                      background: '#f8f9fa',
                      border: '2px solid #00D4FF',
                      boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)'
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

      {/* Skill Categories */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(skillCategories).map(([categoryName, category], categoryIndex) => (
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
                  {category.skills.map((skill, skillIndex) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <motion.div
                        key={skill}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05), duration: 0.3 }}
                      >
                        <Chip
                          label={skill}
                          onClick={() => handleCategorySkillToggle(skill)}
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
                borderColor: 'var(--primary)'
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
              {selectedSkills.length} Skills Selected
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              {selectedSkills.length === 0 ? 'Select at least one skill to continue' : 'Great! You can always add more later'}
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={selectedSkills.length === 0}
            sx={{
              px: 6,
              py: 1.5,
              background: 'var(--gradient-primary)',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(0, 212, 255, 0.4)'
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

export default SkillsStep;