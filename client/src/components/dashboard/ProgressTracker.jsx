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
      color: '#00F5FF'
    },
    {
      title: 'Certificates Earned',
      value: 5,
      change: '+2',
      icon: VerifiedUser,
      color: '#34D399'
    },
    {
      title: 'Job Matches',
      value: 28,
      change: '+8',
      icon: Work,
      color: '#FBBF24'
    },
    {
      title: 'Learning Hours',
      value: 156,
      change: '+24',
      icon: TrendingUp,
      color: '#A855F7'
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
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(0, 245, 255, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#F8FAFC',
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
                      background: 'rgba(15, 15, 35, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0, 245, 255, 0.2)',
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
                          color: '#F8FAFC'
                        }}
                      >
                        {kpi.value}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#34D399',
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
                        color: '#94A3B8',
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
              background: 'rgba(15, 15, 35, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid rgba(0, 245, 255, 0.2)',
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
                      background: 'linear-gradient(180deg, #00F5FF 0%, #A855F7 100%)',
                      borderRadius: 1,
                      mb: 1,
                      boxShadow: '0 0 10px rgba(0, 245, 255, 0.3)'
                    }}
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#94A3B8',
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
                  color: '#F8FAFC',
                  fontWeight: 600
                }}
              >
                Employability Growth
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#94A3B8'
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