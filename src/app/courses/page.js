'use client';
import { Box, Container, Typography, Grid, TextField, InputAdornment, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, FilterList } from '@mui/icons-material';
import { useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import CourseCard from '@/components/ui/CourseCard';

const courses = [
  {
    title: 'Advanced React Development',
    description: 'Master React hooks, context, and performance optimization techniques',
    duration: '8 weeks',
    rating: '4.8',
    level: 'Advanced',
    category: 'Frontend',
  },
  {
    title: 'Python for Data Science',
    description: 'Learn pandas, numpy, and machine learning fundamentals',
    duration: '12 weeks',
    rating: '4.9',
    level: 'Intermediate',
    category: 'Data Science',
  },
  {
    title: 'AWS Cloud Architecture',
    description: 'Design scalable cloud solutions with AWS services',
    duration: '10 weeks',
    rating: '4.7',
    level: 'Advanced',
    category: 'Cloud',
  },
  {
    title: 'Cybersecurity Fundamentals',
    description: 'Protect systems with ethical hacking and security practices',
    duration: '6 weeks',
    rating: '4.6',
    level: 'Beginner',
    category: 'Security',
  },
];

const categories = ['All', 'Frontend', 'Data Science', 'Cloud', 'Security'];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navigation />
      <Box sx={{ pt: 10, pb: 8, background: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 800 }}>
              Explore Courses
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
              Discover your next learning adventure
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                  },
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    sx={{
                      background: selectedCategory === category 
                        ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
                        : 'transparent',
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Grid container spacing={3}>
              {filteredCourses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}