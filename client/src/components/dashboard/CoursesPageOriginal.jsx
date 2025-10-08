'use client';
import { Box, Grid, Card, CardContent, Typography, Chip, Button, LinearProgress, CircularProgress } from '@mui/material';
import { TrendingUp, School, VerifiedUser, Schedule, Star, Warning } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import apiService from '@/services/api';

const CoursesPage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All Courses');
  const [allCourses, setAllCourses] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [outdatedCourses, setOutdatedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [coursesRes, trendingRes, outdatedRes, categoriesRes] = await Promise.all([
        apiService.getCourses(),
        apiService.getTrendingCourses(50),
        apiService.getOutdatedCourses(50),
        apiService.getCategories()
      ]);
      
      setAllCourses(coursesRes.data?.courses || []);
      setTrendingCourses(trendingRes.data?.courses || []);
      setOutdatedCourses(outdatedRes.data?.courses || []);
      setCategories(categoriesRes.data || []);
      
      console.log('📊 Data loaded:', {
        all: coursesRes.data?.courses?.length || 0,
        trending: trendingRes.data?.courses?.length || 0,
        outdated: outdatedRes.data?.courses?.length || 0
      });
      
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefreshData = async () => {
    setRefreshing(true);
    try {
      await apiService.refreshCourseData();
      await fetchData();
    } catch (err) {
      console.error('❌ Refresh failed:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const getFilteredCourses = () => {
    switch (activeFilter) {
      case 'Trending Now':
        return trendingCourses;
      case 'AI/ML':
        return allCourses.filter(course => course.courseCategory === 'AI/ML');
      case 'Blockchain':
        return allCourses.filter(course => course.courseCategory === 'Blockchain');
      case 'Web Development':
        return allCourses.filter(course => course.courseCategory === 'Web Development');
      case 'Outdated':
        return outdatedCourses;
      default:
        return allCourses; // All Courses
    }
  };

  const filteredCourses = getFilteredCourses();
  const filters = ['All Courses', 'Trending Now', 'AI/ML', 'Blockchain', 'Web Development', 'Outdated'];

  const renderCourseCard = (course, index) => (
    <Grid item xs={12} md={6} lg={4} key={course._id}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card
          elevation={0}
          sx={{
            background: activeFilter === 'Outdated' ? 'rgba(26, 26, 46, 0.4)' : 'rgba(26, 26, 46, 0.8)',
            backdropFilter: 'blur(20px)',
            border: activeFilter === 'Outdated' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(0, 245, 255, 0.2)',
            borderRadius: 3,
            height: 420,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            opacity: activeFilter === 'Outdated' ? 0.7 : 1,
            '&:hover': {
              borderColor: activeFilter === 'Outdated' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 245, 255, 0.4)',
              boxShadow: activeFilter === 'Outdated' ? '0 0 30px rgba(239, 68, 68, 0.2)' : '0 0 30px rgba(0, 245, 255, 0.2)'
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
                  background: course.trend === 'Trending' ? 'rgba(34, 197, 94, 0.2)' : 
                             course.trend === 'Outdated' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                  color: course.trend === 'Trending' ? '#22C55E' : 
                         course.trend === 'Outdated' ? '#EF4444' : '#9CA3AF',
                  fontSize: '0.7rem'
                }}
              />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 1, lineHeight: 1.3, height: 48, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {course.courseTitle || 'Untitled Course'}
            </Typography>
            
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2, lineHeight: 1.4, height: 40, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {course.courseDescription || 'No description available'}
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
  );

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
              {loading ? 'Loading...' : `${filteredCourses.length} courses available`}
            </Typography>
          </Box>
          
          {error && (
            <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', borderRadius: 2, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <Typography variant="body2" sx={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Warning fontSize="small" /> Failed to load courses: {error}
              </Typography>
            </Box>
          )}

          {/* Filter Chips and Refresh Button */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
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
            
            <Button
              variant="outlined"
              onClick={handleRefreshData}
              disabled={refreshing}
              startIcon={refreshing ? <CircularProgress size={16} /> : <TrendingUp />}
              sx={{
                borderColor: 'rgba(0, 245, 255, 0.3)',
                color: '#00F5FF',
                '&:hover': {
                  borderColor: 'rgba(0, 245, 255, 0.5)',
                  background: 'rgba(0, 245, 255, 0.1)'
                }
              }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} xl={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TrendingUp sx={{ color: '#00F5FF' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                  {activeFilter === 'Trending Now' ? '🔥 Trending Now' : 
                   activeFilter === 'AI/ML' ? '🤖 AI/ML Courses' :
                   activeFilter === 'Blockchain' ? '⛓️ Blockchain Courses' :
                   activeFilter === 'Web Development' ? '💻 Web Development' :
                   activeFilter === 'Outdated' ? '📚 Outdated Courses' : '📚 All Courses'}
                </Typography>
              </Box>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress sx={{ color: '#00F5FF' }} />
                </Box>
              ) : filteredCourses.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" sx={{ color: '#94A3B8', mb: 2 }}>
                    🔍 No courses found for {activeFilter}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
                    Try refreshing the data or check back later for new courses.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleRefreshData}
                    disabled={refreshing}
                    sx={{
                      borderColor: 'rgba(0, 245, 255, 0.3)',
                      color: '#00F5FF',
                      '&:hover': {
                        borderColor: 'rgba(0, 245, 255, 0.5)',
                        background: 'rgba(0, 245, 255, 0.1)'
                      }
                    }}
                  >
                    {refreshing ? 'Searching...' : 'Search for Courses'}
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {filteredCourses.map((course, index) => renderCourseCard(course, index))}
                </Grid>
              )}
            </Box>
          </motion.div>
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
                  
                  {categories.map((category, index) => (
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
                  ))}
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