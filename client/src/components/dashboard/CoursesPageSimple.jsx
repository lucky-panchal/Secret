'use client';
import { Box, Grid, Card, CardContent, Typography, Chip, Button, CircularProgress } from '@mui/material';
import { TrendingUp, School, VerifiedUser, Schedule, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CoursesPageSimple = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('All Courses');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses directly from API
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all courses, trending, and outdated separately
      const [allResponse, trendingResponse, outdatedResponse] = await Promise.all([
        fetch('http://localhost:5000/api/courses?limit=50'),
        fetch('http://localhost:5000/api/courses/trending?limit=50'),
        fetch('http://localhost:5000/api/courses/outdated?limit=50')
      ]);
      
      const [allData, trendingData, outdatedData] = await Promise.all([
        allResponse.json(),
        trendingResponse.json(),
        outdatedResponse.json()
      ]);
      
      if (allData.success && trendingData.success && outdatedData.success) {
        // Combine all courses
        const allCourses = allData.data.courses || [];
        const trendingCourses = trendingData.data.courses || [];
        const outdatedCourses = outdatedData.data.courses || [];
        
        // Create a comprehensive list
        const courseMap = new Map();
        
        // Add all courses
        allCourses.forEach(course => courseMap.set(course._id, course));
        
        // Add trending courses (might have more than what's in allCourses)
        trendingCourses.forEach(course => courseMap.set(course._id, course));
        
        // Add outdated courses
        outdatedCourses.forEach(course => courseMap.set(course._id, course));
        
        const combinedCourses = Array.from(courseMap.values());
        setCourses(combinedCourses);
        
        console.log('📊 Loaded courses:', combinedCourses.length);
        console.log('📊 All API:', allCourses.length);
        console.log('📊 Trending API:', trendingCourses.length);
        console.log('📊 Outdated API:', outdatedCourses.length);
        
        // Log trend distribution for debugging
        const trendCounts = combinedCourses.reduce((acc, course) => {
          acc[course.trend] = (acc[course.trend] || 0) + 1;
          return acc;
        }, {});
        console.log('📊 Trend distribution:', trendCounts);
      } else {
        setError('Failed to load courses from one or more endpoints');
      }

    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Simple filtering logic
  const getFilteredCourses = () => {
    console.log('🔍 Filtering courses:', { activeFilter, totalCourses: courses.length });
    
    switch (activeFilter) {
      case 'Trending Now':
        const trending = courses.filter(course => course.trend === 'Trending');
        console.log('🔥 Trending courses:', trending.length);
        return trending;
        
      case 'AI/ML':
        const aiml = courses.filter(course => 
          course.courseCategory === 'AI/ML' && course.trend !== 'Outdated'
        );
        console.log('🤖 AI/ML courses:', aiml.length);
        return aiml;
        
      case 'Blockchain':
        const blockchain = courses.filter(course => 
          course.courseCategory === 'Blockchain' && course.trend !== 'Outdated'
        );
        console.log('⛓️ Blockchain courses:', blockchain.length);
        return blockchain;
        
      case 'Outdated':
        const outdated = courses.filter(course => course.trend === 'Outdated');
        console.log('📚 Outdated courses:', outdated.length);
        return outdated;
        
      default: // All Courses
        const nonOutdated = courses.filter(course => course.trend !== 'Outdated');
        console.log('📚 All courses (non-outdated):', nonOutdated.length);
        return nonOutdated;
    }
  };

  const filteredCourses = getFilteredCourses();
  const filters = ['All Courses', 'Trending Now', 'AI/ML', 'Blockchain', 'Outdated'];

  return (
    <Box sx={{ p: 3, maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8FAFC', mb: 1 }}>
            Courses & Skill Programs
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            Stay Future-Ready — AI keeps updating, so do your skills.
          </Typography>
          
          {/* Debug Info */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(0, 245, 255, 0.1)', borderRadius: 2 }}>
            <Typography variant="caption" sx={{ color: '#00F5FF' }}>
              🔍 Debug: Total DB courses: {courses.length} | Filtered: {filteredCourses.length} | Filter: {activeFilter}
            </Typography>
          </Box>
          
          {error && (
            <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', borderRadius: 2 }}>
              <Typography sx={{ color: '#EF4444' }}>Error: {error}</Typography>
            </Box>
          )}

          {/* Filter Chips */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
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
            <Button onClick={fetchCourses} variant="outlined" size="small" sx={{ color: '#00F5FF', borderColor: '#00F5FF' }}>
              Refresh
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Content */}
      <Box>
        <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 3 }}>
          {activeFilter === 'Trending Now' ? '🔥 Trending Now' : 
           activeFilter === 'AI/ML' ? '🤖 AI/ML Courses' :
           activeFilter === 'Blockchain' ? '⛓️ Blockchain Courses' :
           activeFilter === 'Outdated' ? '📚 Outdated Courses' : '📚 All Courses'}
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#00F5FF' }} />
          </Box>
        ) : filteredCourses.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#94A3B8', mb: 2 }}>
              🔍 No courses found for {activeFilter}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Total courses in database: {courses.length}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredCourses.map((course, index) => (
              <Grid item xs={12} md={6} lg={4} key={course._id}>
                <Card
                  sx={{
                    background: activeFilter === 'Outdated' ? 'rgba(26, 26, 46, 0.4)' : 'rgba(26, 26, 46, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: activeFilter === 'Outdated' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(0, 245, 255, 0.2)',
                    borderRadius: 3,
                    height: 300,
                    opacity: activeFilter === 'Outdated' ? 0.7 : 1
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={course.courseCategory || 'General'}
                        size="small"
                        sx={{
                          background: 'rgba(0, 245, 255, 0.2)',
                          color: '#00F5FF',
                          fontSize: '0.7rem'
                        }}
                      />
                      <Chip
                        label={course.trend || 'Unknown'}
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

                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 1, height: 48, overflow: 'hidden' }}>
                      {course.courseTitle || 'Untitled Course'}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2, height: 40, overflow: 'hidden' }}>
                      {course.courseDescription || 'No description'}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        {course.courseProvider || 'Online'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        ⭐ {course.starRating || 'N/A'}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CoursesPageSimple;