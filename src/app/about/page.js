'use client';
import { Box, Container, Typography, Grid, Paper, Avatar } from '@mui/material';
import { School, TrendingUp, Group, EmojiEvents } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/ui/Navigation';

const stats = [
  { icon: <Group />, value: '50K+', label: 'Active Learners' },
  { icon: <School />, value: '200+', label: 'Expert Courses' },
  { icon: <TrendingUp />, value: '98%', label: 'Success Rate' },
  { icon: <EmojiEvents />, value: '15K+', label: 'Certificates Issued' },
];

const team = [
  { name: 'Sarah Chen', role: 'Lead Instructor', expertise: 'React & Frontend' },
  { name: 'Mike Johnson', role: 'Data Science Expert', expertise: 'Python & ML' },
  { name: 'David Kim', role: 'Cloud Architect', expertise: 'AWS & DevOps' },
  { name: 'Emma Wilson', role: 'Full-Stack Developer', expertise: 'MERN Stack' },
];

export default function AboutPage() {
  const { isDark } = useTheme();

  return (
    <>
      <Navigation />
      <Box sx={{ 
        pt: 12, 
        pb: 4, 
        background: isDark ? '#0f0f0f' : '#f8f4f0', 
        minHeight: '100vh' 
      }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: isDark ? 'white' : '#2c1810' }}>
              About KauShalX
            </Typography>
            <Typography variant="h6" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', maxWidth: 600, mx: 'auto' }}>
              Empowering careers through AI-powered learning and expert mentorship
            </Typography>
          </Box>

          {/* Mission */}
          <Paper sx={{ 
            p: 4, 
            mb: 6, 
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(20px)',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
            borderRadius: 2,
          }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: isDark ? 'white' : '#2c1810', textAlign: 'center' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(44,24,16,0.8)',
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto'
            }}>
              At KauShalX, we believe that everyone deserves access to world-class education and career opportunities. 
              Our platform combines cutting-edge AI technology with expert human mentorship to create personalized 
              learning experiences that transform careers and lives.
            </Typography>
          </Paper>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{
                  p: 3,
                  textAlign: 'center',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                  borderRadius: 2,
                }}>
                  <Box sx={{ color: '#ffd700', mb: 2, fontSize: '3rem' }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#ffd700', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Team */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: isDark ? 'white' : '#2c1810' }}>
              Meet Our Expert Team
            </Typography>
            <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
              Industry professionals dedicated to your success
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{
                  p: 3,
                  textAlign: 'center',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                  borderRadius: 2,
                }}>
                  <Avatar sx={{ 
                    width: 80, 
                    height: 80, 
                    mx: 'auto', 
                    mb: 2,
                    background: '#ffd700',
                    color: '#000',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: isDark ? 'white' : '#2c1810' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffd700', mb: 1, fontWeight: 600 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
                    {member.expertise}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}