'use client';
import { Card, CardContent, Box, Typography, Chip, Tooltip, IconButton } from '@mui/material';
import { TrendingUp, Info, Security } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const AICareerMonitor = ({ onNavigate }) => {
  const { isDark } = useTheme();

  const handleViewDetails = () => {
    if (onNavigate) {
      onNavigate('career-analysis');
    }
  };

  return (
    <Box>
      <Card 
        elevation={0}
        onClick={handleViewDetails}
        sx={{ 
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(0, 245, 255, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)',
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.25), 0 0 80px rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(0, 245, 255, 0.4)'
          }
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
              AI Career Lifeline Monitor
            </Typography>
            
            <Tooltip title="AI analyzes job market trends and automation risks">
              <IconButton size="small">
                <Info sx={{ color: '#94A3B8' }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box 
              sx={{ 
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: `conic-gradient(#00F5FF 0deg ${85 * 3.6}deg, rgba(15, 15, 35, 0.6) ${85 * 3.6}deg 360deg)`,
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
                mb: 2
              }}
            >
              <Box 
                sx={{ 
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  background: 'rgba(26, 26, 46, 0.9)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)'
                }}
              >
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#00F5FF'
                  }}
                >
                  85%
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#94A3B8',
                    fontWeight: 600,
                    fontSize: '0.8rem'
                  }}
                >
                  SAFE
                </Typography>
              </Box>
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600,
                color: '#F8FAFC',
                mb: 1
              }}
            >
              Job Security Score
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94A3B8'
              }}
            >
              Your role has low automation risk
            </Typography>
          </Box>

          <Box 
            sx={{ 
              background: 'rgba(0, 245, 255, 0.1)',
              border: '1px solid rgba(0, 245, 255, 0.2)',
              borderRadius: 2,
              p: 2.5,
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TrendingUp sx={{ color: '#00F5FF', fontSize: 20 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: '#00F5FF'
                }}
              >
                Daily Update
              </Typography>
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#F8FAFC',
                lineHeight: 1.5
              }}
            >
              Your job safety level is improving this week
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              icon={<Security />}
              label="Future-Proof Skills" 
              size="small"
              sx={{
                background: 'rgba(168, 85, 247, 0.2)',
                color: '#A855F7',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}
            />
            <Chip 
              label="High Demand" 
              size="small"
              sx={{
                background: 'rgba(52, 211, 153, 0.2)',
                color: '#34D399',
                border: '1px solid rgba(52, 211, 153, 0.3)'
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AICareerMonitor;