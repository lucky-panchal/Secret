'use client';
import { AppBar, Toolbar, Box, IconButton, Typography, Avatar, Badge, useMediaQuery, useTheme as useMuiTheme, Tooltip } from '@mui/material';
import { Notifications, Settings, LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        bgcolor: isDark ? '#1e1e1e' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#333333' : '#e5e7eb'}`,
        boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
        zIndex: 1100
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: { xs: 64, sm: 70 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'}
            sx={{ 
              fontWeight: 700,
              color: isDark ? '#ffffff' : '#1976d2',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              letterSpacing: '-0.025em'
            }}
          >
            {isMobile ? 'CareerAI' : 'CareerAI Dashboard'}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, sm: 1 }
        }}>
          <Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'}>
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                color: isDark ? '#ffffff' : '#374151',
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                }
              }}
            >
              {isDark ? <LightMode fontSize={isMobile ? 'small' : 'medium'} /> : <DarkMode fontSize={isMobile ? 'small' : 'medium'} />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifications">
            <IconButton 
              sx={{ 
                color: isDark ? '#ffffff' : '#374151',
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications fontSize={isMobile ? 'small' : 'medium'} />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton 
              sx={{ 
                color: isDark ? '#ffffff' : '#374151',
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <Settings fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          </Tooltip>
          
          <Avatar 
            sx={{ 
              width: { xs: 36, sm: 40 }, 
              height: { xs: 36, sm: 40 },
              bgcolor: '#1976d2',
              ml: { xs: 0.5, sm: 1 },
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 600
            }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;