import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

export default function StatusCard({ title, value, change, trend, icon, loading = false }) {
  if (loading) {
    return (
      <Card sx={{ height: 120 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={60} height={32} sx={{ mt: 1 }} />
              <Skeleton variant="text" width={40} height={16} sx={{ mt: 0.5 }} />
            </Box>
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card sx={{ height: 120 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendIcon 
                sx={{ 
                  fontSize: 16, 
                  color: isPositive ? 'success.main' : 'error.main' 
                }} 
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: isPositive ? 'success.main' : 'error.main',
                  fontWeight: 500 
                }}
              >
                {change}
              </Typography>
            </Box>
          </Box>
          <Box 
            sx={{ 
              p: 1, 
              borderRadius: 2, 
              backgroundColor: 'primary.light',
              color: 'primary.contrastText' 
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}