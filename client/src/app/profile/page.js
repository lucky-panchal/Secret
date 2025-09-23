'use client';
import { Box, Container, Typography, Paper, Avatar, Button, Grid, Chip, LinearProgress, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, LinkedIn, GitHub, Email, School, WorkOutline, EmojiEvents, TrendingUp, LocationOn, CalendarToday } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/ui/Navigation';
import SkillChip from '@/components/ui/SkillChip';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';

const skills = ['JavaScript', 'React', 'Python', 'AWS', 'Docker', 'Machine Learning', 'Node.js', 'MongoDB'];
const achievements = [
  { title: 'Full-Stack Developer Certification', date: 'Dec 2024', issuer: 'KaushalX Academy', icon: <School />, color: 'var(--accent)' },
  { title: 'AWS Solutions Architect', date: 'Nov 2023', issuer: 'Amazon Web Services', icon: <WorkOutline />, color: 'var(--warning)' },
  { title: 'Data Science Specialist', date: 'Sep 2023', issuer: 'Google Cloud', icon: <EmojiEvents />, color: 'var(--success)' },
  { title: 'React Expert Badge', date: 'Aug 2024', issuer: 'Meta Blueprint', icon: <TrendingUp />, color: 'var(--info)' },
];

const learningStats = [
  { label: 'Courses Completed', value: 12, total: 15, percentage: 80 },
  { label: 'Skills Mastered', value: 8, total: 10, percentage: 80 },
  { label: 'Projects Built', value: 24, total: 30, percentage: 80 },
  { label: 'Mentorship Hours', value: 45, total: 60, percentage: 75 },
];

const recentActivity = [
  { action: 'Completed', item: 'Advanced React Patterns', date: '2 days ago', type: 'course' },
  { action: 'Started', item: 'Machine Learning Fundamentals', date: '1 week ago', type: 'course' },
  { action: 'Earned', item: 'JavaScript Expert Badge', date: '2 weeks ago', type: 'achievement' },
  { action: 'Submitted', item: 'E-commerce React Project', date: '3 weeks ago', type: 'project' },
];

const currentCourses = [
  { name: 'Advanced React Patterns', progress: 75, instructor: 'Sarah Chen', nextLesson: 'Context API Deep Dive' },
  { name: 'Python Data Analysis', progress: 45, instructor: 'Mike Johnson', nextLesson: 'Pandas Advanced Operations' },
  { name: 'AWS Solutions Architect', progress: 90, instructor: 'David Kim', nextLesson: 'Final Certification Exam' },
];

export default function ProfilePage() {
  const [selectedSkills, setSelectedSkills] = useState(['JavaScript', 'React', 'Python', 'AWS']);
  const { isDark } = useTheme();

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <ProtectedRoute>
        <Navigation />
        <Box sx={{ 
          pt: 12, 
          pb: 4, 
          background: 'var(--background)', 
          minHeight: '100vh' 
        }}>
          <Container maxWidth="xl">
            {/* Profile Header */}
            <Paper
              sx={{
                p: 4,
                mb: 4,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        background: 'var(--gradient-secondary)',
                        fontSize: '3rem',
                        color: '#000',
                        fontWeight: 'bold',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      AJ
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'var(--text-primary)' }}>
                      Alex Johnson
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'var(--text-secondary)', mb: 2 }}>
                      Senior Full-Stack Developer
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                      <Chip label="Pro Member" size="small" sx={{ background: 'var(--accent)', color: '#000', fontWeight: 600 }} />
                      <Chip label="85% Complete" size="small" sx={{ background: 'var(--success)', color: 'white', fontWeight: 600 }} />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ 
                    color: 'var(--text-secondary)', 
                    lineHeight: 1.8,
                    mb: 3 
                  }}>
                    Passionate developer with 5+ years of experience building scalable web applications. 
                    Currently exploring AI/ML technologies and cloud architecture. Love mentoring junior developers 
                    and contributing to open-source projects.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'var(--text-secondary)' }} />
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                        San Francisco, CA
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'var(--text-secondary)' }} />
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                        Joined March 2023
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button startIcon={<LinkedIn />} size="small" sx={{ color: 'var(--accent)' }}>LinkedIn</Button>
                    <Button startIcon={<GitHub />} size="small" sx={{ color: 'var(--accent)' }}>GitHub</Button>
                    <Button startIcon={<Email />} size="small" sx={{ color: 'var(--accent)' }}>Contact</Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      fullWidth
                      sx={{
                        background: 'var(--accent)',
                        color: '#000',
                        fontWeight: 600,
                        mb: 2,
                        borderRadius: 2,
                        minHeight: 44,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          background: 'var(--primary)',
                          color: 'white',
                          transform: 'scale(1.02)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      Edit Profile
                    </Button>
                    
                    <Grid container spacing={2}>
                      {learningStats.map((stat, index) => (
                        <Grid item xs={6} key={index}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--accent)' }}>
                              {stat.value}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                              {stat.label}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid item xs={12} lg={8}>
                {/* Current Courses */}
                <Paper
                  sx={{
                    p: 3,
                    mb: 3,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'var(--text-primary)' }}>
                    Current Learning Path
                  </Typography>
                  {currentCourses.map((course, index) => (
                    <Box key={index} sx={{ 
                      mb: 3, 
                      p: 3, 
                      borderRadius: 2, 
                      background: 'rgba(0,0,0,0.03)',
                      border: '1px solid var(--border)',
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {course.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--accent)', fontWeight: 600 }}>
                          {course.progress}%
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 2 }}>
                        Instructor: {course.instructor} • Next: {course.nextLesson}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          background: 'var(--border)',
                          '& .MuiLinearProgress-bar': {
                            background: 'var(--accent)',
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Paper>

                {/* Skills */}
                <Paper
                  sx={{
                    p: 3,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'var(--text-primary)' }}>
                    Skills & Technologies
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map((skill) => (
                      <SkillChip
                        key={skill}
                        label={skill}
                        selected={selectedSkills.includes(skill)}
                        onToggle={() => toggleSkill(skill)}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} lg={4}>
                {/* Achievements */}
                <Paper
                  sx={{
                    p: 3,
                    mb: 3,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'var(--text-primary)' }}>
                    Achievements & Certifications
                  </Typography>
                  {achievements.map((achievement, index) => (
                    <Box key={index} sx={{ 
                      mb: 3, 
                      p: 2, 
                      borderRadius: 2, 
                      background: 'rgba(255,215,0,0.1)',
                      border: '1px solid rgba(255,215,0,0.2)',
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Box sx={{ color: achievement.color }}>
                          {achievement.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {achievement.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                            {achievement.issuer} • {achievement.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Paper>

                {/* Recent Activity */}
                <Paper
                  sx={{
                    p: 3,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'var(--text-primary)' }}>
                    Recent Activity
                  </Typography>
                  {recentActivity.map((activity, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2, 
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(0,0,0,0.03)',
                    }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'var(--accent)',
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          <span style={{ color: 'var(--accent)' }}>{activity.action}</span> {activity.item}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                          {activity.date}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ProtectedRoute>
    </div>
  );
}