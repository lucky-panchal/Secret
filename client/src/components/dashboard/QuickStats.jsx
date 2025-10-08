'use client';
import { Card, CardContent, Box, Typography, Grid, CircularProgress } from '@mui/material';
import { TrendingUp, School, Work, EmojiEvents } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { useDashboardStats } from '@/hooks/useApi';

const QuickStats = () => {
  const { isDark } = useTheme();
  const { data: statsData, loading, error } = useDashboardStats();

  const stats = [
    { title: 'Total Courses', value: statsData?.data?.overview?.total || '0', icon: School, color: '#00F5FF' },
    { title: 'Active Courses', value: statsData?.data?.overview?.active || '0', icon: TrendingUp, color: '#34D399' },
    { title: 'Trending', value: statsData?.data?.overview?.trending || '0', icon: Work, color: '#FBBF24' },
    { title: 'Outdated', value: statsData?.data?.overview?.outdated || '0', icon: EmojiEvents, color: '#A855F7' }
  ];

  return (
    <Card 
      elevation={0}
      sx={{ 
        background: 'rgba(26, 26, 46, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        borderRadius: 3,
        boxShadow: '0 0 30px rgba(251, 191, 36, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)'
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
          Course Statistics
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress sx={{ color: '#00F5FF' }} />
          </Box>
        ) : (
        <Grid container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item xs={6} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${stat.color}20 0%, ${stat.color}10 100%)`,
                    border: `1px solid ${stat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: `0 0 15px ${stat.color}20`
                  }}
                >
                  <stat.icon sx={{ color: stat.color, fontSize: 24 }} />
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#F8FAFC',
                    mb: 0.5
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#94A3B8',
                    fontWeight: 500
                  }}
                >
                  {stat.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickStats;