'use client';
import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import { TrendingUp, School, VerifiedUser, Work } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ProgressTracker = () => {
  const { isDark } = useTheme();

  const kpis = [
    {
      title: 'Skills Acquired',
      value: 12,
      change: '+3',
      icon: School,
      color: '#1976d2'
    },
    {
      title: 'Certificates Earned',
      value: 5,
      change: '+2',
      icon: VerifiedUser,
      color: '#4caf50'
    },
    {
      title: 'Job Matches',
      value: 28,
      change: '+8',
      icon: Work,
      color: '#ff9800'
    },
    {
      title: 'Learning Hours',
      value: 156,
      change: '+24',
      icon: TrendingUp,
      color: '#9c27b0'
    }
  ];

  const chartData = [
    { month: 'Jan', hours: 20, employability: 65 },
    { month: 'Feb', hours: 35, employability: 72 },
    { month: 'Mar', hours: 28, employability: 78 },
    { month: 'Apr', hours: 42, employability: 85 },
    { month: 'May', hours: 31, employability: 88 }
  ];

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
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: isDark ? '#ffffff' : '#212121',
              mb: 3
            }}
          >
            Career Progress Tracker
          </Typography>

          {/* KPI Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {kpis.map((kpi, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box>
                  <Box 
                    sx={{ 
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: isDark ? '#2a2a2a' : '#f8f9fa',
                      border: `1px solid ${isDark ? '#444444' : '#e5e7eb'}`,
                      textAlign: 'center'
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1.5
                      }}
                    >
                      <kpi.icon sx={{ color: kpi.color, fontSize: 24, mr: 1 }} />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 700,
                          color: isDark ? '#ffffff' : '#212121'
                        }}
                      >
                        {kpi.value}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#4caf50',
                          fontWeight: 600,
                          ml: 0.5
                        }}
                      >
                        {kpi.change}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: isDark ? '#b0b0b0' : '#6b7280',
                        fontWeight: 600
                      }}
                    >
                      {kpi.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Chart Area */}
          <Box 
            sx={{ 
              height: 200,
              bgcolor: isDark ? '#2a2a2a' : '#f8f9fa',
              borderRadius: 2,
              border: `1px solid ${isDark ? '#444444' : '#e5e7eb'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 3, height: '60%' }}>
              {chartData.map((data, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 24,
                      height: `${data.employability}%`,
                      bgcolor: '#1976d2',
                      borderRadius: 1,
                      mb: 1,
                      opacity: 0.8
                    }}
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: isDark ? '#b0b0b0' : '#6b7280',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}
                  >
                    {data.month}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            <Box 
              sx={{ 
                position: 'absolute',
                top: 16,
                left: 16
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDark ? '#ffffff' : '#212121',
                  fontWeight: 600
                }}
              >
                Employability Growth
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: isDark ? '#b0b0b0' : '#6b7280'
                }}
              >
                Monthly progress tracking
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProgressTracker;