'use client';
import { Card, CardContent, Box, Typography, Grid, LinearProgress, Button, Chip, CircularProgress } from '@mui/material';
import { PlayArrow, Schedule } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useTrendingCourses } from '@/hooks/useApi';

const ActiveCourses = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const { data: coursesData, loading, error } = useTrendingCourses(4);

  const handleViewAllCourses = () => {
    if (onNavigate) {
      onNavigate('courses');
    }
  };

  const handleCourseAction = (courseId, action) => {
    console.log(`${action} course ${courseId}`);
    if (onNavigate) {
      onNavigate('courses');
    }
  };

  const courses = coursesData?.data?.courses || [];

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
              Trending Courses
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

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#FBBF24' }} />
            </Box>
          ) : (
          <Grid container spacing={2.5}>
            {courses.slice(0, 4).map((course, index) => (
              <Grid item xs={12} sm={6} lg={3} key={course._id}>
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
                        {course.courseTitle?.split(' ')[0] || 'Course'}
                      </Typography>
                      
                      <Chip 
                        label={course.trend || 'Active'}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: course.trend === 'Trending' ? '#34D399' : '#FBBF24',
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
                        {course.courseTitle}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Schedule sx={{ fontSize: 16, color: '#94A3B8' }} />
                        <Typography 
                          variant="caption" 
                          sx={{ color: '#94A3B8' }}
                        >
                          {course.courseProvider || 'Online'}
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
                            Rating
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#94A3B8',
                              fontWeight: 600
                            }}
                          >
                            {course.starRating || 'N/A'} ⭐
                          </Typography>
                        </Box>
                        
                        <LinearProgress 
                          variant="determinate" 
                          value={(course.starRating / 5) * 100 || 0} 
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
                        onClick={() => handleCourseAction(course._id, 'view')}
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
                        View Course
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActiveCourses;