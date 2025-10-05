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
          background: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0, 245, 255, 0.2)',
          boxShadow: '0 -4px 30px rgba(0, 245, 255, 0.2), 0 -8px 60px rgba(168, 85, 247, 0.1)',
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
              color: '#94A3B8',
              '&.Mui-selected': {
                color: '#00F5FF'
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
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(0, 245, 255, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#F8FAFC',
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
                  color: '#F8FAFC',
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: 'rgba(0, 245, 255, 0.1)',
                    color: '#00F5FF',
                    boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0, 245, 255, 0.2)' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94A3B8',
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
                    color: '#94A3B8',
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    py: 0.5,
                    px: 1,
                    borderRadius: 1.5,
                    '&:hover': {
                      color: '#00F5FF'
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