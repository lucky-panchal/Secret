'use client';
import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import { TrendingUp, School, Work, EmojiEvents } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

const QuickStats = () => {
  const { isDark } = useTheme();

  const stats = [
    { title: 'Learning Streak', value: '12 days', icon: TrendingUp, color: '#1976d2' },
    { title: 'Courses Completed', value: '8', icon: School, color: '#4caf50' },
    { title: 'Job Applications', value: '15', icon: Work, color: '#ff9800' },
    { title: 'Achievements', value: '24', icon: EmojiEvents, color: '#9c27b0' }
  ];

  return (
    <Card 
      elevation={0}
      sx={{ 
        bgcolor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 3,
        boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: '#374151',
            mb: 3
          }}
        >
          Quick Stats
        </Typography>

        <Grid container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item xs={6} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: `${stat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1
                  }}
                >
                  <stat.icon sx={{ color: stat.color, fontSize: 24 }} />
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#374151',
                    mb: 0.5
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#6b7280',
                    fontWeight: 500
                  }}
                >
                  {stat.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickStats;