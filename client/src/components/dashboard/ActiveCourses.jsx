'use client';
import { Card, CardContent, Box, Typography, Grid, LinearProgress, Button, Chip } from '@mui/material';
import { PlayArrow, Schedule } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ActiveCourses = () => {
  const { isDark } = useTheme();

  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      progress: 75,
      level: 'Advanced',
      duration: '4h 30m',
      status: 'resume'
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      progress: 45,
      level: 'Intermediate',
      duration: '6h 15m',
      status: 'resume'
    },
    {
      id: 3,
      title: 'TypeScript Fundamentals',
      progress: 0,
      level: 'Beginner',
      duration: '3h 45m',
      status: 'start'
    },
    {
      id: 4,
      title: 'GraphQL & Apollo Client',
      progress: 20,
      level: 'Intermediate',
      duration: '5h 20m',
      status: 'resume'
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return '#4caf50';
      case 'Intermediate':
        return '#ff9800';
      case 'Advanced':
        return '#f44336';
      default:
        return '#1976d2';
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
          boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.07)'
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
              Active Learning Courses
            </Typography>
            
            <Button
              variant="text"
              size="small"
              sx={{ 
                color: '#1976d2',
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              View All
            </Button>
          </Box>

          <Grid container spacing={2.5}>
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} lg={3} key={course.id}>
                <Box>
                  <Card 
                    elevation={0}
                    sx={{ 
                      bgcolor: isDark ? '#2a2a2a' : '#f8f9fa',
                      border: `1px solid ${isDark ? '#444444' : '#e5e7eb'}`,
                      borderRadius: 2
                    }}
                  >
                    <Box 
                      sx={{ 
                        height: 100,
                        bgcolor: isDark ? '#333333' : '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        borderRadius: '8px 8px 0 0'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: isDark ? '#b0b0b0' : '#6b7280',
                          textAlign: 'center',
                          px: 2,
                          fontWeight: 600
                        }}
                      >
                        {course.title.split(' ')[0]}
                      </Typography>
                      
                      <Chip 
                        label={course.level}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: getLevelColor(course.level),
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    
                    <CardContent sx={{ p: 2 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 600,
                          color: isDark ? '#ffffff' : '#212121',
                          mb: 1,
                          fontSize: '0.9rem',
                          lineHeight: 1.3
                        }}
                      >
                        {course.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Schedule sx={{ fontSize: 16, color: isDark ? '#b0b0b0' : '#6b7280' }} />
                        <Typography 
                          variant="caption" 
                          sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}
                        >
                          {course.duration}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: isDark ? '#b0b0b0' : '#6b7280',
                              fontWeight: 600
                            }}
                          >
                            Progress
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: isDark ? '#b0b0b0' : '#6b7280',
                              fontWeight: 600
                            }}
                          >
                            {course.progress}%
                          </Typography>
                        </Box>
                        
                        <LinearProgress 
                          variant="determinate" 
                          value={course.progress} 
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: isDark ? '#444444' : '#f3f4f6',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#1976d2',
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                      
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        startIcon={<PlayArrow />}
                        sx={{
                          bgcolor: '#1976d2',
                          '&:hover': { bgcolor: '#1565c0' },
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                      >
                        {course.status === 'start' ? 'Start' : 'Resume'}
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActiveCourses;