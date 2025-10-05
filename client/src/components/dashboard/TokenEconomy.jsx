'use client';
import { Card, CardContent, Box, Typography, Button, Chip, Divider } from '@mui/material';
import { Token, TrendingUp, History } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const TokenEconomy = () => {
  const { isDark } = useTheme();

  const tokenStats = {
    total: 1250,
    redeemable: 850,
    earned: 400
  };

  const activities = [
    { action: 'Course Completion', tokens: 50, date: '2024-01-15' },
    { action: 'Peer Mentoring', tokens: 25, date: '2024-01-14' },
    { action: 'Community Help', tokens: 15, date: '2024-01-13' }
  ];

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          bgcolor: isDark ? '#1e1e1e' : '#ffffff',
          border: `1px solid ${isDark ? '#333333' : '#e5e7eb'}`,
          borderRadius: 3,
          boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.07)',
          height: '100%'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: isDark ? '#ffffff' : '#212121'
              }}
            >
              Reskilling Tokens & Rewards
            </Typography>
            
            <Token sx={{ color: '#ff9800', fontSize: 28 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#ff9800',
                  mb: 0.5
                }}
              >
                {tokenStats.total}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: isDark ? '#b0b0b0' : '#6b7280',
                  fontWeight: 600
                }}
              >
                Total Tokens
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#4caf50',
                  mb: 0.5
                }}
              >
                {tokenStats.redeemable}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: isDark ? '#b0b0b0' : '#6b7280',
                  fontWeight: 600
                }}
              >
                Redeemable
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#1976d2',
                  mb: 0.5
                }}
              >
                +{tokenStats.earned}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: isDark ? '#b0b0b0' : '#6b7280',
                  fontWeight: 600
                }}
              >
                This Month
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<TrendingUp />}
            sx={{
              bgcolor: '#ff9800',
              '&:hover': { bgcolor: '#f57c00' },
              textTransform: 'none',
              mb: 3,
              fontWeight: 600
            }}
          >
            Earn More Tokens
          </Button>

          <Divider sx={{ mb: 2, borderColor: isDark ? '#444444' : '#e5e7eb' }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <History sx={{ fontSize: 20, color: isDark ? '#b0b0b0' : '#6b7280' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                color: isDark ? '#ffffff' : '#212121'
              }}
            >
              Recent Activity
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {activities.map((activity, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1
                }}
              >
                <Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: isDark ? '#ffffff' : '#212121',
                      fontWeight: 500,
                      mb: 0.5
                    }}
                  >
                    {activity.action}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: isDark ? '#b0b0b0' : '#6b7280'
                    }}
                  >
                    {new Date(activity.date).toLocaleDateString()}
                  </Typography>
                </Box>
                
                <Chip 
                  label={`+${activity.tokens}`}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 152, 0, 0.1)',
                    color: '#ff9800',
                    border: '1px solid rgba(255, 152, 0, 0.3)',
                    fontWeight: 600
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TokenEconomy;