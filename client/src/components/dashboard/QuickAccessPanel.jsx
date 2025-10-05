'use client';
import { Card, CardContent, Box, Typography, Button, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Dashboard, School, VerifiedUser, Work, Token, Settings } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const QuickAccessPanel = ({ mobile = false }) => {
  const { isDark } = useTheme();
  const [value, setValue] = useState(0);

  const navigationItems = [
    { label: 'Dashboard', icon: Dashboard },
    { label: 'Courses', icon: School },
    { label: 'Certificates', icon: VerifiedUser },
    { label: 'Jobs', icon: Work },
    { label: 'Tokens', icon: Token },
    { label: 'Settings', icon: Settings }
  ];

  if (mobile) {
    return (
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          bgcolor: isDark ? '#1a1a1a' : '#ffffff',
          borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
          boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.3)' : '0 -4px 20px rgba(0,0,0,0.1)',
          borderRadius: '24px 24px 0 0'
        }} 
        elevation={0}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{
            bgcolor: 'transparent',
            height: 80,
            borderRadius: '24px 24px 0 0',
            '& .MuiBottomNavigationAction-root': {
              color: isDark ? '#b0b0b0' : '#6b7280',
              '&.Mui-selected': {
                color: '#705CF6'
              },
              minWidth: 'auto',
              fontSize: '0.75rem',
              borderRadius: 2,
              mx: 0.5
            }
          }}
        >
          {navigationItems.slice(0, 5).map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={<item.icon />}
            />
          ))}
        </BottomNavigation>
      </Paper>
    );
  }

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          bgcolor: isDark ? '#1e1e1e' : '#ffffff',
          border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
          borderRadius: 3,
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.07)'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: isDark ? '#ffffff' : '#374151',
              mb: 3
            }}
          >
            Quick Access
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="text"
                startIcon={<item.icon />}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  color: isDark ? '#ffffff' : '#374151',
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(112, 92, 246, 0.1)' : 'rgba(112, 92, 246, 0.05)',
                    color: '#705CF6'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}` }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDark ? '#b0b0b0' : '#6b7280',
                mb: 2,
                fontWeight: 600
              }}
            >
              Support
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {['Help Center', 'Contact Support', 'Terms', 'Privacy'].map((link, index) => (
                <Button
                  key={index}
                  variant="text"
                  size="small"
                  sx={{
                    justifyContent: 'flex-start',
                    color: isDark ? '#b0b0b0' : '#6b7280',
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    py: 0.5,
                    px: 1,
                    borderRadius: 1.5,
                    '&:hover': {
                      color: '#705CF6'
                    }
                  }}
                >
                  {link}
                </Button>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuickAccessPanel;