'use client';
import { Card, CardContent, Box, Typography, Button, Chip } from '@mui/material';
import { PlayArrow, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const CareerRoadmap = ({ onNavigate }) => {
  const { isDark } = useTheme();

  const handleContinueLearning = () => {
    if (onNavigate) {
      onNavigate('courses');
    }
  };

  const handleRoadmapClick = () => {
    if (onNavigate) {
      onNavigate('roadmap');
    }
  };

  const roadmapSteps = [
    {
      title: 'JavaScript Fundamentals',
      status: 'completed',
      description: 'Master core JavaScript concepts and ES6+ features'
    },
    {
      title: 'React Development',
      status: 'completed',
      description: 'Build modern web applications with React'
    },
    {
      title: 'Advanced React & State Management',
      status: 'active',
      description: 'Redux, Context API, and advanced patterns'
    },
    {
      title: 'Full-Stack Development',
      status: 'upcoming',
      description: 'Node.js, Express, and database integration'
    },
    {
      title: 'DevOps & Deployment',
      status: 'upcoming',
      description: 'CI/CD, Docker, and cloud deployment'
    }
  ];

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: '#34D399', fontSize: 20 }} />;
      case 'active':
        return <PlayArrow sx={{ color: '#00F5FF', fontSize: 20 }} />;
      default:
        return <RadioButtonUnchecked sx={{ color: '#64748B', fontSize: 20 }} />;
    }
  };

  return (
    <Box>
      <Card 
        elevation={0}
        onClick={handleRoadmapClick}
        sx={{ 
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.15), 0 0 60px rgba(0, 245, 255, 0.1)',
          minHeight: 450,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.25), 0 0 80px rgba(0, 245, 255, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.4)'
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#F8FAFC'
              }}
            >
              Personalized Career Roadmap
            </Typography>
            
            <Chip 
              label="68% Complete" 
              size="small"
              sx={{
                background: 'rgba(168, 85, 247, 0.2)',
                color: '#A855F7',
                fontWeight: 600,
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}
            />
          </Box>

          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {roadmapSteps.map((step, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: index < roadmapSteps.length - 1 ? 3 : 0,
                  pb: index < roadmapSteps.length - 1 ? 2 : 0,
                  borderBottom: index < roadmapSteps.length - 1 ? '1px solid rgba(168, 85, 247, 0.2)' : 'none'
                }}
              >
                <Box sx={{ mt: 0.5, flexShrink: 0 }}>
                  {getStepIcon(step.status)}
                </Box>
                
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#F8FAFC',
                      mb: 0.5
                    }}
                  >
                    {step.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#94A3B8',
                      mb: step.status === 'active' ? 1.5 : 0,
                      lineHeight: 1.4
                    }}
                  >
                    {step.description}
                  </Typography>
                  
                  {step.status === 'active' && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<PlayArrow />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueLearning();
                      }}
                      sx={{
                        background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                          boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
                          transform: 'translateY(-1px)'
                        },
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Continue Learning
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CareerRoadmap;