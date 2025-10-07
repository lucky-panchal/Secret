'use client';
import { Box, Grid, Card, CardContent, Typography, Chip, Button, LinearProgress, CircularProgress } from '@mui/material';
import { TrendingUp, School, VerifiedUser, PlayArrow, Schedule, Star, Warning } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { useCourses, useTrendingCourses, useCategories } from '@/hooks/useApi';
import apiService from '@/services/api';

const CoursesPage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All Courses');
  const [outdatedCourses, setOutdatedCourses] = useState([]);
  const [loadingOutdated, setLoadingOutdated] = useState(false);
  
  const { data: coursesData, loading: coursesLoading, error: coursesError } = useCourses();
  const { data: trendingData, loading: trendingLoading } = useTrendingCourses(20);
  const { data: categoriesData, loading: categoriesLoading } = useCategories();

  useEffect(() => {
    const fetchOutdatedCourses = async () => {
      if (activeFilter === 'Outdated' || activeFilter === 'All Courses') {
        setLoadingOutdated(true);
        try {
          const result = await apiService.getOutdatedCourses(20);
          setOutdatedCourses(result.data?.courses || []);
        } catch (error) {
          console.error('Failed to fetch outdated courses:', error);
        } finally {
          setLoadingOutdated(false);
        }
      }
    };
    fetchOutdatedCourses();
  }, [activeFilter]);

  const handleCourseAction = async (courseId, action) => {
    try {
      await apiService.trackCourseView(courseId);
      console.log(`${action} course ${courseId}`);
    } catch (error) {
      console.error('Failed to track course action:', error);
    }
  };

  const filters = ['All Courses', 'Trending Now', 'AI/ML', 'Blockchain', 'Transferable Skills', 'Outdated'];
  
  const allCourses = coursesData?.data?.courses || [];
  const trendingCourses = trendingData?.data?.courses || [];
  const categories = categoriesData?.data || [];

  const getFilteredCourses = () => {
    switch (activeFilter) {
      case 'Trending Now':
        return trendingCourses;
      case 'AI/ML':
        return allCourses.filter(course => 
          course.courseCategory?.includes('AI') || 
          course.courseCategory?.includes('ML')
        );
      case 'Blockchain':
        return allCourses.filter(course => 
          course.courseCategory?.includes('Blockchain')
        );
      case 'Transferable Skills':
        return allCourses.filter(course => 
          course.courseCategory?.includes('Soft') || 
          course.courseCategory?.includes('Management')
        );
      case 'Outdated':
        return [];
      default:
        return allCourses;
    }
  };

  const filteredCourses = getFilteredCourses();
  const showOutdated = activeFilter === 'Outdated' || activeFilter === 'All Courses';
  const isLoading = coursesLoading || trendingLoading || categoriesLoading;

  return (
    <Box sx={{ p: 3, maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8FAFC', mb: 1 }}>
            Courses & Skill Programs
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            Stay Future-Ready — AI keeps updating, so do your skills.
          </Typography>
          
          {/* Course Count */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
              {isLoading ? 'Loading...' : 
               activeFilter === 'All Courses' ? (filteredCourses.length + outdatedCourses.length) : 
               activeFilter === 'Outdated' ? outdatedCourses.length : filteredCourses.length} courses available
            </Typography>
          </Box>
          
          {coursesError && (
            <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', borderRadius: 2, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <Typography variant="body2" sx={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Warning fontSize="small" /> Failed to load courses: {coursesError}
              </Typography>
            </Box>
          )}

          {/* Filter Chips */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onClick={() => setActiveFilter(filter)}
                sx={{
                  background: activeFilter === filter ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)' : 'rgba(26, 26, 46, 0.6)',
                  color: activeFilter === filter ? '#ffffff' : '#94A3B8',
                  border: `1px solid ${activeFilter === filter ? 'rgba(0, 245, 255, 0.3)' : 'rgba(0, 245, 255, 0.2)'}`,
                  '&:hover': {
                    background: activeFilter === filter ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)' : 'rgba(0, 245, 255, 0.1)',
                    borderColor: 'rgba(0, 245, 255, 0.4)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} xl={8}>
          {/* Courses */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TrendingUp sx={{ color: '#00F5FF' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                  {activeFilter === 'Trending Now' ? '🔥 Trending Now' : 
                   activeFilter === 'AI/ML' ? '🤖 AI/ML Courses' :
                   activeFilter === 'Blockchain' ? '⛓️ Blockchain Courses' :
                   activeFilter === 'Transferable Skills' ? '🔄 Transferable Skills' : '📚 All Courses'}
                </Typography>
              </Box>
              
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress sx={{ color: '#00F5FF' }} />
                </Box>
              ) : (
              <Grid container spacing={3}>
                {filteredCourses.map((course, index) => (
                  <Grid item xs={12} md={6} lg={4} key={course._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          background: 'rgba(26, 26, 46, 0.8)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(0, 245, 255, 0.2)',
                          borderRadius: 3,
                          height: 420,
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            borderColor: 'rgba(0, 245, 255, 0.4)',
                            boxShadow: '0 0 30px rgba(0, 245, 255, 0.2)'
                          }
                        }}
                      >
                        {/* Thumbnail */}
                        <Box
                          sx={{
                            height: 120,
                            background: `linear-gradient(135deg, ${course.courseCategory?.includes('AI') ? '#00F5FF' : course.courseCategory?.includes('Blockchain') ? '#A855F7' : '#FBBF24'}20 0%, ${course.courseCategory?.includes('AI') ? '#A855F7' : course.courseCategory?.includes('Blockchain') ? '#FBBF24' : '#00F5FF'}20 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                          }}
                        >
                          <School sx={{ fontSize: 40, color: '#F8FAFC', opacity: 0.8 }} />
                          <Chip
                            icon={<VerifiedUser />}
                            label="Verified"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              background: 'rgba(251, 191, 36, 0.2)',
                              color: '#FBBF24',
                              border: '1px solid rgba(251, 191, 36, 0.3)'
                            }}
                          />
                        </Box>

                        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip
                              label={course.courseCategory || 'General'}
                              size="small"
                              sx={{
                                background: `${course.courseCategory?.includes('AI') ? '#00F5FF' : course.courseCategory?.includes('Blockchain') ? '#A855F7' : '#FBBF24'}20`,
                                color: course.courseCategory?.includes('AI') ? '#00F5FF' : course.courseCategory?.includes('Blockchain') ? '#A855F7' : '#FBBF24',
                                fontSize: '0.7rem'
                              }}
                            />
                            <Chip
                              label={course.trend || 'Stable'}
                              size="small"
                              sx={{
                                background: course.trend === 'Trending' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                                color: course.trend === 'Trending' ? '#22C55E' : '#9CA3AF',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Box>

                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 1, lineHeight: 1.3, height: 48, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {course.courseTitle}
                          </Typography>
                          
                          <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2, lineHeight: 1.4, height: 40, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {course.courseDescription}
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Schedule sx={{ fontSize: 16, color: '#94A3B8' }} />
                              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                {course.courseProvider || 'Online'}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Star sx={{ fontSize: 16, color: '#FBBF24' }} />
                              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                {course.starRating || 'N/A'}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mt: 'auto' }}>
                            <Button
                              variant="contained"
                              fullWidth
                              startIcon={<School />}
                              onClick={() => handleCourseAction(course._id, 'View')}
                              sx={{
                                background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                                  transform: 'scale(1.02)',
                                  boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)'
                                },
                                textTransform: 'none',
                                fontWeight: 600
                              }}
                            >
                              View Course
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              )}
            </Box>
          </motion.div>

          {/* Outdated Courses */}
          {showOutdated && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                📚 Outdated / Removed Courses
              </Typography>
              
              {loadingOutdated ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress sx={{ color: '#EF4444' }} />
                </Box>
              ) : (
              <Grid container spacing={2}>
                {outdatedCourses.map((course) => (
                  <Grid item xs={12} md={6} key={course._id}>
                    <Card
                      elevation={0}
                      sx={{
                        background: 'rgba(26, 26, 46, 0.4)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(156, 163, 175, 0.2)',
                        borderRadius: 3,
                        opacity: 0.7
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#CBD5E1', mb: 1 }}>
                          {course.courseTitle}
                        </Typography>
                        <Chip
                          label={course.trend || 'Outdated'}
                          size="small"
                          sx={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            color: '#EF4444',
                            mb: 2
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                          Last Updated: {new Date(course.lastUpdated).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                          Demand: {course.courseDemand}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              )}
              </Box>
            </motion.div>
          )}
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} xl={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Categories */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(26, 26, 46, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  borderRadius: 3,
                  mb: 3
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                    Course Categories
                  </Typography>
                  
                  {categoriesLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                      <CircularProgress size={24} sx={{ color: '#A855F7' }} />
                    </Box>
                  ) : (
                  categories.map((category, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                          {category._id}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                          {category.count} courses
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((category.trending / category.count) * 100, 100)}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'rgba(15, 15, 35, 0.6)',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #A855F7 0%, #FBBF24 100%)',
                            borderRadius: 3
                          }
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#A855F7', mt: 0.5, display: 'block' }}>
                        {category.trending} trending • Avg: {category.avgRating?.toFixed(1) || 'N/A'} ⭐
                      </Typography>
                    </Box>
                  ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(26, 26, 46, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  borderRadius: 3
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                    🤖 AI Future Skills Prediction
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#F8FAFC' }}>
                        AI Prompt Engineering
                      </Typography>
                      <Chip
                        label="↑ +38%"
                        size="small"
                        sx={{
                          background: 'rgba(34, 197, 94, 0.2)',
                          color: '#22C55E'
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#F8FAFC' }}>
                        Quantum Computing
                      </Typography>
                      <Chip
                        label="↑ Emerging"
                        size="small"
                        sx={{
                          background: 'rgba(0, 245, 255, 0.2)',
                          color: '#00F5FF'
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#F8FAFC' }}>
                        Web3 Development
                      </Typography>
                      <Chip
                        label="↑ +42%"
                        size="small"
                        sx={{
                          background: 'rgba(168, 85, 247, 0.2)',
                          color: '#A855F7'
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoursesPage;