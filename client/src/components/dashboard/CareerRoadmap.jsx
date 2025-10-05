'use client';
import { Card, CardContent, Box, Typography, Button, Chip } from '@mui/material';
import { PlayArrow, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const CareerRoadmap = () => {
  const { isDark } = useTheme();

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
        return <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />;
      case 'active':
        return <PlayArrow sx={{ color: '#1976d2', fontSize: 20 }} />;
      default:
        return <RadioButtonUnchecked sx={{ color: isDark ? '#666666' : '#d1d5db', fontSize: 20 }} />;
    }
  };

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          bgcolor: isDark ? '#1e1e1e' : '#ffffff',
          border: `1px solid ${isDark ? '#333333' : '#e5e7eb'}`,
          borderRadius: 3,
          boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.07)',
          minHeight: 450
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: isDark ? '#ffffff' : '#212121'
              }}
            >
              Personalized Career Roadmap
            </Typography>
            
            <Chip 
              label="68% Complete" 
              size="small"
              sx={{
                bgcolor: isDark ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                color: '#1976d2',
                fontWeight: 600
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
                  borderBottom: index < roadmapSteps.length - 1 ? `1px solid ${isDark ? '#333333' : '#f3f4f6'}` : 'none'
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
                      color: isDark ? '#ffffff' : '#212121',
                      mb: 0.5
                    }}
                  >
                    {step.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: isDark ? '#b0b0b0' : '#6b7280',
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
                      sx={{
                        bgcolor: '#1976d2',
                        '&:hover': { bgcolor: '#1565c0' },
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