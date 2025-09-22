'use client';
import { Box, Container, Typography, Grid, Paper, LinearProgress, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp, School, Timer, Star } from '@mui/icons-material';
import Navigation from '@/components/ui/Navigation';

const stats = [
  { icon: <School />, label: 'Courses Completed', value: '12', color: '#4ecdc4' },
  { icon: <Timer />, label: 'Hours Learned', value: '156', color: '#ff6b6b' },
  { icon: <TrendingUp />, label: 'Skill Level', value: '85%', color: '#feca57' },
  { icon: <Star />, label: 'Certificates', value: '8', color: '#a55eea' },
];

const recentCourses = [
  { name: 'React Advanced Patterns', progress: 75, instructor: 'Sarah Chen' },
  { name: 'Python Data Analysis', progress: 45, instructor: 'Mike Johnson' },
  { name: 'AWS Solutions Architect', progress: 90, instructor: 'David Kim' },
];

export default function DashboardPage() {
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
            <Typography variant="h2" sx={{ mb: 6, fontWeight: 800 }}>
              Welcome back, Alex! 👋
            </Typography>

            <Grid container spacing={3} sx={{ mb: 6 }}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        textAlign: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: stat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    p: 3,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Continue Learning
                  </Typography>
                  {recentCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Box sx={{ mb: 3, p: 2, borderRadius: 2, background: 'rgba(255,255,255,0.03)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6">{course.name}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {course.progress}%
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          Instructor: {course.instructor}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={course.progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            background: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                            },
                          }}
                        />
                      </Box>
                    </motion.div>
                  ))}
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Learning Streak
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 800, color: '#4ecdc4', mb: 1 }}>
                      15
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Days in a row! 🔥
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}