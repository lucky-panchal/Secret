'use client';
import { Card, CardContent, Box, Typography, Chip, Tooltip, IconButton } from '@mui/material';
import { TrendingUp, Info, Security } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const AICareerMonitor = () => {
  const { isDark } = useTheme();

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
              AI Career Lifeline Monitor
            </Typography>
            
            <Tooltip title="AI analyzes job market trends and automation risks">
              <IconButton size="small">
                <Info sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }} />
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
                background: `conic-gradient(#4caf50 0deg ${85 * 3.6}deg, ${isDark ? '#333333' : '#f3f4f6'} ${85 * 3.6}deg 360deg)`,
                mb: 2
              }}
            >
              <Box 
                sx={{ 
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  bgcolor: isDark ? '#1e1e1e' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#4caf50'
                  }}
                >
                  85%
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: isDark ? '#b0b0b0' : '#6b7280',
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
                color: isDark ? '#ffffff' : '#212121',
                mb: 1
              }}
            >
              Job Security Score
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDark ? '#b0b0b0' : '#6b7280'
              }}
            >
              Your role has low automation risk
            </Typography>
          </Box>

          <Box 
            sx={{ 
              bgcolor: isDark ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
              border: `1px solid ${isDark ? 'rgba(76, 175, 80, 0.3)' : 'rgba(76, 175, 80, 0.2)'}`,
              borderRadius: 2,
              p: 2.5,
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TrendingUp sx={{ color: '#4caf50', fontSize: 20 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: '#4caf50'
                }}
              >
                Daily Update
              </Typography>
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDark ? '#ffffff' : '#212121',
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
                bgcolor: isDark ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                color: '#1976d2',
                border: `1px solid ${isDark ? 'rgba(25, 118, 210, 0.3)' : 'rgba(25, 118, 210, 0.2)'}`
              }}
            />
            <Chip 
              label="High Demand" 
              size="small"
              color="success"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AICareerMonitor;