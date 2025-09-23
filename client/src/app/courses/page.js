'use client';
import { Box, Container, Typography, Grid, TextField, InputAdornment, Chip, Card, CardContent, Avatar, Rating, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, PlayArrow, Schedule, Person } from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/ui/Navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

const courses = [
  {
    title: 'Advanced React Development',
    description: 'Master React hooks, context, and performance optimization techniques for modern web applications',
    duration: '8 weeks',
    rating: 4.8,
    level: 'Advanced',
    category: 'Frontend',
    price: '$299',
    students: '2.5k',
    instructor: 'Sarah Chen',
    lessons: 45,
    projects: 8
  },
  {
    title: 'Python for Data Science',
    description: 'Learn pandas, numpy, and machine learning fundamentals with real-world projects',
    duration: '12 weeks',
    rating: 4.9,
    level: 'Intermediate',
    category: 'Data Science',
    price: '$399',
    students: '3.2k',
    instructor: 'Dr. Mike Johnson',
    lessons: 68,
    projects: 12
  },
  {
    title: 'AWS Cloud Architecture',
    description: 'Design scalable cloud solutions with AWS services and best practices',
    duration: '10 weeks',
    rating: 4.7,
    level: 'Advanced',
    category: 'Cloud',
    price: '$499',
    students: '1.8k',
    instructor: 'David Kim',
    lessons: 52,
    projects: 6
  },
  {
    title: 'Cybersecurity Fundamentals',
    description: 'Protect systems with ethical hacking and security practices',
    duration: '6 weeks',
    rating: 4.6,
    level: 'Beginner',
    category: 'Security',
    price: '$249',
    students: '4.1k',
    instructor: 'Alex Rodriguez',
    lessons: 32,
    projects: 4
  },
  {
    title: 'Full-Stack JavaScript',
    description: 'Build complete web applications with MERN stack from scratch',
    duration: '16 weeks',
    rating: 4.9,
    level: 'Intermediate',
    category: 'Frontend',
    price: '$599',
    students: '5.2k',
    instructor: 'Emma Wilson',
    lessons: 89,
    projects: 15
  },
  {
    title: 'Machine Learning with TensorFlow',
    description: 'Deep learning and neural networks for AI applications',
    duration: '14 weeks',
    rating: 4.8,
    level: 'Advanced',
    category: 'Data Science',
    price: '$699',
    students: '2.1k',
    instructor: 'Prof. James Liu',
    lessons: 76,
    projects: 10
  },
];

const categories = ['All', 'Frontend', 'Data Science', 'Cloud', 'Security'];

const getLevelColor = (level) => {
  switch (level) {
    case 'Beginner': return 'var(--success)';
    case 'Intermediate': return 'var(--warning)';
    case 'Advanced': return 'var(--error)';
    default: return 'var(--text-secondary)';
  }
};

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isDark } = useTheme();

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <ProtectedRoute>
        <Navigation />
        <Box sx={{ pt: 12, pb: 4, background: 'var(--background)', minHeight: '100vh' }}>
          <Container maxWidth="xl">
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--text-primary)', mb: 1 }}>
                Explore Courses
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
                Discover your next learning adventure with expert-led courses
              </Typography>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: 'var(--text-secondary)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 2,
                        '& fieldset': { border: 'none' },
                        '&:hover': {
                          borderColor: 'var(--primary)',
                        },
                        '&.Mui-focused': {
                          borderColor: 'var(--primary)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'var(--text-primary)',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        onClick={() => setSelectedCategory(category)}
                        variant={selectedCategory === category ? 'filled' : 'outlined'}
                        sx={{
                          background: selectedCategory === category 
                            ? 'var(--accent)'
                            : 'transparent',
                          color: selectedCategory === category 
                            ? '#000'
                            : 'var(--text-primary)',
                          borderColor: 'var(--border)',
                          '&:hover': {
                            background: selectedCategory === category 
                              ? 'var(--accent)'
                              : 'rgba(0,0,0,0.1)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Results Count */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                Showing {filteredCourses.length} courses
              </Typography>
            </Box>

            {/* Course Grid */}
            <Grid container spacing={3}>
              {filteredCourses.map((course, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      {/* Course Image */}
                      <Box sx={{ position: 'relative', height: 200, background: 'var(--gradient-secondary)' }}>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                          }}
                        >
                          <Chip
                            label={course.level}
                            size="small"
                            sx={{
                              background: getLevelColor(course.level),
                              color: 'white',
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 12,
                            left: 12,
                            background: 'rgba(0,0,0,0.7)',
                            borderRadius: 1,
                            px: 1,
                            py: 0.5,
                          }}
                        >
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                            {course.category}
                          </Typography>
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        {/* Course Title */}
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)' }}>
                          {course.title}
                        </Typography>

                        {/* Course Description */}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'var(--text-secondary)', 
                            mb: 2, 
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {course.description}
                        </Typography>

                        {/* Instructor */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, background: 'var(--accent)', color: '#000', fontSize: '0.7rem' }}>
                            {course.instructor.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                            {course.instructor}
                          </Typography>
                        </Box>

                        {/* Course Stats */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Schedule sx={{ fontSize: 16, color: 'var(--text-secondary)' }} />
                            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                              {course.duration}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Person sx={{ fontSize: 16, color: 'var(--text-secondary)' }} />
                            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                              {course.students}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Rating value={course.rating} precision={0.1} size="small" readOnly />
                            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                              ({course.rating})
                            </Typography>
                          </Box>
                        </Box>

                        {/* Price and Enroll */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--accent)' }}>
                            {course.price}
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<PlayArrow />}
                            sx={{
                              background: 'var(--gradient-primary)',
                              color: 'white',
                              fontWeight: 600,
                              borderRadius: 2,
                              minHeight: 36,
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                background: 'var(--primary)',
                                transform: 'scale(1.02)',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                              },
                            }}
                          >
                            Enroll Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </ProtectedRoute>
    </div>
  );
}