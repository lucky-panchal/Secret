'use client';
import { Card, CardContent, Box, Typography, Button, Chip, Divider } from '@mui/material';
import { Token, TrendingUp, History } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const TokenEconomy = ({ onNavigate }) => {
  const { isDark } = useTheme();

  const handleEarnMoreTokens = () => {
    if (onNavigate) {
      onNavigate('tokens');
    }
  };

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
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)',
          height: '100%'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#F8FAFC'
              }}
            >
              Reskilling Tokens & Rewards
            </Typography>
            
            <Token sx={{ color: '#FBBF24', fontSize: 28 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#FBBF24',
                  mb: 0.5
                }}
              >
                {tokenStats.total}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#94A3B8',
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
                  color: '#34D399',
                  mb: 0.5
                }}
              >
                {tokenStats.redeemable}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#94A3B8',
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
                  color: '#00F5FF',
                  mb: 0.5
                }}
              >
                +{tokenStats.earned}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#94A3B8',
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
            onClick={handleEarnMoreTokens}
            sx={{
              background: 'linear-gradient(135deg, #FBBF24 0%, #A855F7 100%)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': { 
                background: 'linear-gradient(135deg, #FBBF24 0%, #A855F7 100%)',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)',
                transform: 'translateY(-1px)'
              },
              textTransform: 'none',
              mb: 3,
              fontWeight: 600
            }}
          >
            Earn More Tokens
          </Button>

          <Divider sx={{ mb: 2, borderColor: 'rgba(251, 191, 36, 0.2)' }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <History sx={{ fontSize: 20, color: '#94A3B8' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                color: '#F8FAFC'
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
                      color: '#F8FAFC',
                      fontWeight: 500,
                      mb: 0.5
                    }}
                  >
                    {activity.action}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#94A3B8'
                    }}
                  >
                    {activity.date}
                  </Typography>
                </Box>
                
                <Chip 
                  label={`+${activity.tokens}`}
                  size="small"
                  sx={{
                    background: 'rgba(251, 191, 36, 0.2)',
                    color: '#FBBF24',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
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