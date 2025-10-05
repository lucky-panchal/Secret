'use client';
import { Box, TextField, IconButton, Avatar, Badge, InputAdornment } from '@mui/material';
import { Search, Notifications, Message, Settings } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

const TopNavbar = () => {
  const { isDark } = useTheme();

  return (
    <Box
      sx={{
        height: 80,
        bgcolor: isDark ? '#1a1a1a' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      {/* Search Bar */}
      <TextField
        placeholder="Search your course..."
        variant="outlined"
        size="small"
        sx={{
          width: { xs: '100%', sm: 320, md: 420 },
          maxWidth: { xs: 'calc(100% - 120px)', sm: 420 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            bgcolor: '#f8fafc',
            height: { xs: 42, md: 46 },
            fontSize: { xs: '0.875rem', md: '0.95rem' },
            fontWeight: 400,
            color: '#374151',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': { 
              border: '1px solid #e2e8f0',
              borderRadius: 3
            },
            '&:hover': {
              bgcolor: '#ffffff',
              borderColor: '#cbd5e1',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              '& fieldset': { 
                borderColor: '#cbd5e1'
              }
            },
            '&.Mui-focused': {
              bgcolor: '#ffffff',
              borderColor: '#705CF6',
              boxShadow: '0 0 0 3px rgba(112, 92, 246, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
              '& fieldset': { 
                borderColor: '#705CF6',
                borderWidth: '2px'
              }
            },
            '& input': {
              padding: '12px 14px',
              '&::placeholder': {
                color: '#9ca3af',
                opacity: 1,
                fontSize: '0.875rem'
              }
            }
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ 
                color: '#9ca3af', 
                fontSize: { xs: 18, md: 20 },
                ml: 0.5
              }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Right Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ color: isDark ? '#ffffff' : '#374151' }}>
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        
        <IconButton sx={{ color: isDark ? '#ffffff' : '#374151' }}>
          <Badge badgeContent={2} color="primary">
            <Message />
          </Badge>
        </IconButton>
        
        <IconButton sx={{ color: isDark ? '#ffffff' : '#374151' }}>
          <Settings />
        </IconButton>
        
        <Avatar sx={{ bgcolor: '#705CF6', ml: 1 }}>A</Avatar>
      </Box>
    </Box>
  );
};

export default TopNavbar;