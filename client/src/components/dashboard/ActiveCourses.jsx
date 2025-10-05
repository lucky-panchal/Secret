'use client';
import { Card, CardContent, Box, Typography, Grid, LinearProgress, Button, Chip } from '@mui/material';
import { PlayArrow, Schedule } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ActiveCourses = ({ onNavigate }) => {
  const { isDark } = useTheme();

  const handleViewAllCourses = () => {
    if (onNavigate) {
      onNavigate('courses');
    }
  };

  const handleCourseAction = (courseId, action) => {
    console.log(`${action} course ${courseId}`);
    // Here you would typically update course progress or navigate to course detail
    if (onNavigate) {
      onNavigate('courses');
    }
  };

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
        return '#34D399';
      case 'Intermediate':
        return '#FBBF24';
      case 'Advanced':
        return '#A855F7';
      default:
        return '#1976d2';
    }
  };

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)'
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
              Active Learning Courses
            </Typography>
            
            <Button
              variant="text"
              size="small"
              onClick={handleViewAllCourses}
              sx={{ 
                color: '#FBBF24',
                textTransform: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(251, 191, 36, 0.1)'
                }
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
                      background: 'rgba(15, 15, 35, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(251, 191, 36, 0.2)',
                      borderRadius: 2
                    }}
                  >
                    <Box 
                      sx={{ 
                        height: 100,
                        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
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
                          color: '#F8FAFC',
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
                          color: '#F8FAFC',
                          mb: 1,
                          fontSize: '0.9rem',
                          lineHeight: 1.3
                        }}
                      >
                        {course.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Schedule sx={{ fontSize: 16, color: '#94A3B8' }} />
                        <Typography 
                          variant="caption" 
                          sx={{ color: '#94A3B8' }}
                        >
                          {course.duration}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#94A3B8',
                              fontWeight: 600
                            }}
                          >
                            Progress
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#94A3B8',
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
                            bgcolor: 'rgba(15, 15, 35, 0.6)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #FBBF24 0%, #A855F7 100%)',
                              borderRadius: 3,
                              boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)'
                            }
                          }}
                        />
                      </Box>
                      
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        startIcon={<PlayArrow />}
                        onClick={() => handleCourseAction(course.id, course.status)}
                        sx={{
                          background: 'linear-gradient(135deg, #FBBF24 0%, #A855F7 100%)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            background: 'linear-gradient(135deg, #FBBF24 0%, #A855F7 100%)',
                            boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)',
                            transform: 'translateY(-1px)'
                          },
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