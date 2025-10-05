'use client';
import { Card, CardContent, Box, Typography, Avatar, LinearProgress, Button, Chip } from '@mui/material';
import { Edit, Settings, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const WelcomeSection = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          bgcolor: isDark ? '#1e1e1e' : '#ffffff',
          border: `1px solid ${isDark ? '#333333' : '#e5e7eb'}`,
          borderRadius: 3,
          boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.07)'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            justifyContent: 'space-between',
            gap: 3,
            mb: 3 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar 
                sx={{ 
                  width: { xs: 70, md: 80 }, 
                  height: { xs: 70, md: 80 },
                  bgcolor: '#1976d2',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
              
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: isDark ? '#ffffff' : '#212121',
                    mb: 1,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  Welcome back, {user?.name || 'User'}!
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Chip 
                    icon={<TrendingUp />}
                    label="Career Growth: +15%" 
                    color="success"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}
                  >
                    Last login: Today, 9:30 AM
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              gap: 1.5,
              flexDirection: { xs: 'row', sm: 'row' },
              width: { xs: '100%', sm: 'auto' }
            }}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                size="small"
                sx={{
                  borderColor: isDark ? '#555555' : '#d1d5db',
                  color: isDark ? '#ffffff' : '#374151',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    borderColor: '#1976d2',
                    bgcolor: isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)'
                  }
                }}
              >
                Edit Profile
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Settings />}
                size="small"
                sx={{
                  borderColor: isDark ? '#555555' : '#d1d5db',
                  color: isDark ? '#ffffff' : '#374151',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    borderColor: '#1976d2',
                    bgcolor: isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)'
                  }
                }}
              >
                Settings
              </Button>
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: isDark ? '#ffffff' : '#212121'
                }}
              >
                Career Roadmap Progress
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDark ? '#b0b0b0' : '#6b7280',
                  fontWeight: 600
                }}
              >
                68% Complete
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={68} 
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: isDark ? '#333333' : '#f3f4f6',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#1976d2',
                  borderRadius: 5
                }
              }}
            />
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDark ? '#b0b0b0' : '#6b7280',
                mt: 1.5
              }}
            >
              3 of 5 milestones completed • Next: Advanced React Development
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WelcomeSection;