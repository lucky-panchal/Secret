'use client';
import { Box, Grid, Card, CardContent, Typography, Chip, Button, LinearProgress, Avatar } from '@mui/material';
import { TrendingUp, School, VerifiedUser, PlayArrow, Schedule, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const CoursesPage = () => {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All Courses');

  const filters = ['All Courses', 'Trending Now', 'AI/ML', 'Blockchain', 'Transferable Skills', 'Outdated'];
  
  const allCourses = [
    {
      id: 1,
      title: 'Advanced React Patterns & Performance',
      category: 'AI/ML',
      description: 'Master modern React with AI-powered optimization techniques',
      progress: 65,
      enrolled: true,
      trending: '+42% Demand',
      verified: true,
      duration: '8 weeks',
      rating: 4.9,
      isTrending: true
    },
    {
      id: 2,
      title: 'Blockchain Smart Contracts Development',
      category: 'Blockchain',
      description: 'Build secure DeFi applications with Solidity and Web3',
      progress: 0,
      enrolled: false,
      trending: '+38% Growth',
      verified: true,
      duration: '12 weeks',
      rating: 4.8,
      isTrending: true
    },
    {
      id: 3,
      title: 'AI Prompt Engineering Mastery',
      category: 'AI/ML',
      description: 'Create powerful AI prompts for business automation',
      progress: 25,
      enrolled: true,
      trending: '+55% Demand',
      verified: true,
      duration: '6 weeks',
      rating: 4.9,
      isTrending: true
    },
    {
      id: 6,
      title: 'Machine Learning Fundamentals',
      category: 'AI/ML',
      description: 'Learn core ML algorithms and data science principles',
      progress: 0,
      enrolled: false,
      trending: '+28% Growth',
      verified: true,
      duration: '10 weeks',
      rating: 4.7,
      isTrending: false
    },
    {
      id: 7,
      title: 'Deep Learning with TensorFlow',
      category: 'AI/ML',
      description: 'Build neural networks and deep learning models',
      progress: 45,
      enrolled: true,
      trending: '+35% Demand',
      verified: true,
      duration: '14 weeks',
      rating: 4.8,
      isTrending: true
    },
    {
      id: 8,
      title: 'Web3 DApp Development',
      category: 'Blockchain',
      description: 'Create decentralized applications on Ethereum',
      progress: 0,
      enrolled: false,
      trending: '+45% Growth',
      verified: true,
      duration: '16 weeks',
      rating: 4.6,
      isTrending: true
    },
    {
      id: 9,
      title: 'NFT Marketplace Creation',
      category: 'Blockchain',
      description: 'Build and deploy your own NFT trading platform',
      progress: 20,
      enrolled: true,
      trending: '+32% Demand',
      verified: true,
      duration: '8 weeks',
      rating: 4.5,
      isTrending: false
    },
    {
      id: 10,
      title: 'Computer Vision with OpenCV',
      category: 'AI/ML',
      description: 'Process images and videos using AI techniques',
      progress: 0,
      enrolled: false,
      trending: '+40% Demand',
      verified: true,
      duration: '10 weeks',
      rating: 4.7,
      isTrending: true
    },
    {
      id: 11,
      title: 'Leadership & Team Management',
      category: 'Transferable Skills',
      description: 'Essential leadership skills for any industry',
      progress: 80,
      enrolled: true,
      trending: '+22% Demand',
      verified: true,
      duration: '6 weeks',
      rating: 4.6,
      isTrending: false
    },
    {
      id: 12,
      title: 'Project Management Fundamentals',
      category: 'Transferable Skills',
      description: 'Master project planning and execution across domains',
      progress: 0,
      enrolled: false,
      trending: '+18% Growth',
      verified: true,
      duration: '8 weeks',
      rating: 4.5,
      isTrending: false
    },
    {
      id: 13,
      title: 'Data Analysis & Visualization',
      category: 'Transferable Skills',
      description: 'Analyze data and create insights for any business',
      progress: 35,
      enrolled: true,
      trending: '+30% Demand',
      verified: true,
      duration: '10 weeks',
      rating: 4.8,
      isTrending: true
    },
    {
      id: 14,
      title: 'Digital Marketing Strategy',
      category: 'Transferable Skills',
      description: 'Marketing skills applicable across all industries',
      progress: 0,
      enrolled: false,
      trending: '+25% Growth',
      verified: true,
      duration: '12 weeks',
      rating: 4.4,
      isTrending: false
    },
    {
      id: 15,
      title: 'Communication & Presentation Skills',
      category: 'Transferable Skills',
      description: 'Master professional communication for any career',
      progress: 60,
      enrolled: true,
      trending: '+15% Demand',
      verified: true,
      duration: '4 weeks',
      rating: 4.7,
      isTrending: false
    }
  ];

  const outdatedCourses = [
    {
      id: 4,
      title: 'jQuery Fundamentals',
      reason: 'Replaced by Modern JavaScript',
      replacement: 'Modern JavaScript & ES6+',
      removedDate: '2024-01-15'
    },
    {
      id: 5,
      title: 'Flash Animation',
      reason: 'Technology Deprecated',
      replacement: 'CSS Animations & WebGL',
      removedDate: '2023-12-01'
    },
    {
      id: 16,
      title: 'AngularJS (v1.x)',
      reason: 'Framework Outdated',
      replacement: 'Angular (Latest Version)',
      removedDate: '2023-11-20'
    },
    {
      id: 17,
      title: 'PHP 5.x Development',
      reason: 'Version No Longer Supported',
      replacement: 'PHP 8.x Modern Development',
      removedDate: '2023-10-15'
    }
  ];

  const getFilteredCourses = () => {
    switch (activeFilter) {
      case 'Trending Now':
        return allCourses.filter(course => course.isTrending);
      case 'AI/ML':
        return allCourses.filter(course => course.category === 'AI/ML');
      case 'Blockchain':
        return allCourses.filter(course => course.category === 'Blockchain');
      case 'Transferable Skills':
        return allCourses.filter(course => course.category === 'Transferable Skills');
      case 'Outdated':
        return [];
      default:
        return allCourses;
    }
  };

  const filteredCourses = getFilteredCourses();
  const showOutdated = activeFilter === 'Outdated' || activeFilter === 'All Courses';

  const categories = [
    { name: 'AI & Machine Learning', count: 24, progress: 68 },
    { name: 'Blockchain & Web3', count: 18, progress: 45 },
    { name: 'Data Analytics', count: 32, progress: 72 },
    { name: 'Cloud Automation', count: 16, progress: 38 },
    { name: 'Soft Skills', count: 12, progress: 85 }
  ];

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
              {activeFilter === 'All Courses' ? allCourses.length + outdatedCourses.length : 
               activeFilter === 'Outdated' ? outdatedCourses.length : filteredCourses.length} courses available
            </Typography>
          </Box>

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
          {/* Trending Courses */}
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
              
              <Grid container spacing={3}>
                {filteredCourses.map((course, index) => (
                  <Grid item xs={12} md={6} lg={4} key={course.id}>
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
                            background: `linear-gradient(135deg, ${course.category === 'AI/ML' ? '#00F5FF' : course.category === 'Blockchain' ? '#A855F7' : '#FBBF24'}20 0%, ${course.category === 'AI/ML' ? '#A855F7' : course.category === 'Blockchain' ? '#FBBF24' : '#00F5FF'}20 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                          }}
                        >
                          <School sx={{ fontSize: 40, color: '#F8FAFC', opacity: 0.8 }} />
                          {course.verified && (
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
                          )}
                        </Box>

                        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip
                              label={course.category}
                              size="small"
                              sx={{
                                background: `${course.category === 'AI/ML' ? '#00F5FF' : course.category === 'Blockchain' ? '#A855F7' : '#FBBF24'}20`,
                                color: course.category === 'AI/ML' ? '#00F5FF' : course.category === 'Blockchain' ? '#A855F7' : '#FBBF24',
                                fontSize: '0.7rem'
                              }}
                            />
                            <Chip
                              label={course.trending}
                              size="small"
                              sx={{
                                background: 'rgba(34, 197, 94, 0.2)',
                                color: '#22C55E',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Box>

                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 1, lineHeight: 1.3, height: 48, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {course.title}
                          </Typography>
                          
                          <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2, lineHeight: 1.4, height: 40, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {course.description}
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Schedule sx={{ fontSize: 16, color: '#94A3B8' }} />
                              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                {course.duration}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Star sx={{ fontSize: 16, color: '#FBBF24' }} />
                              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                {course.rating}
                              </Typography>
                            </Box>
                          </Box>

                          {course.enrolled ? (
                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                  Progress
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#00F5FF' }}>
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
                                    background: 'linear-gradient(90deg, #00F5FF 0%, #A855F7 100%)',
                                    borderRadius: 3
                                  }
                                }}
                              />
                            </Box>
                          ) : null}

                          <Box sx={{ mt: 'auto' }}>
                            <Button
                              variant="contained"
                              fullWidth
                              startIcon={course.enrolled ? <PlayArrow /> : <School />}
                              sx={{
                                background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                                  transform: 'scale(1.02)',
                                  boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)'
                                },
                                textTransform: 'none',
                                fontWeight: 600
                              }}
                            >
                              {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* Outdated Courses */}
          {showOutdated && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                📚 Outdated / Removed Courses
              </Typography>
              
              <Grid container spacing={2}>
                {outdatedCourses.map((course) => (
                  <Grid item xs={12} md={6} key={course.id}>
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
                          {course.title}
                        </Typography>
                        <Chip
                          label={course.reason}
                          size="small"
                          sx={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            color: '#EF4444',
                            mb: 2
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                          Removed: {course.removedDate}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: 'rgba(0, 245, 255, 0.3)',
                            color: '#00F5FF',
                            '&:hover': {
                              borderColor: '#00F5FF',
                              background: 'rgba(0, 245, 255, 0.1)'
                            }
                          }}
                        >
                          View Replacement: {course.replacement}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
                  
                  {categories.map((category, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                          {category.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                          {category.count} courses
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={category.progress}
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
                        {category.progress}% completed
                      </Typography>
                    </Box>
                  ))}
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