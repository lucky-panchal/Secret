'use client';
import { Box, TextField, IconButton, Avatar, Badge, InputAdornment } from '@mui/material';
import { Search, Notifications, Message, Settings } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const TopNavbar = ({ onRefresh, currentPage, onNotificationClick, onMessageClick, onProfileClick, onNavigate }) => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Navigate to courses page with search filter
      if (onNavigate) {
        onNavigate('courses');
      }
      alert(`Searching for: "${searchQuery}"`);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSettingsClick = () => {
    if (onNavigate) {
      onNavigate('settings');
    }
  };

  return (
    <Box
      sx={{
        height: 80,
        background: 'rgba(26, 26, 46, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Search Bar */}
      <TextField
        placeholder="Search your course..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleSearch}
        sx={{
          width: { xs: '100%', sm: 320, md: 420 },
          maxWidth: { xs: 'calc(100% - 120px)', sm: 420 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            background: 'rgba(26, 26, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            height: { xs: 42, md: 46 },
            fontSize: { xs: '0.875rem', md: '0.95rem' },
            fontWeight: 400,
            color: '#F8FAFC',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': { 
              border: '1px solid rgba(148, 163, 184, 0.3) !important',
              borderRadius: 3
            },
            '&:hover': {
              background: 'rgba(26, 26, 46, 0.8)',
              borderColor: 'rgba(148, 163, 184, 0.4)',
              boxShadow: '0 0 15px rgba(148, 163, 184, 0.1)',
              '& fieldset': { 
                border: '1px solid rgba(148, 163, 184, 0.4) !important'
              }
            },
            '&.Mui-focused': {
              background: 'rgba(26, 26, 46, 0.9)',
              borderColor: '#00F5FF',
              boxShadow: '0 0 0 3px rgba(0, 245, 255, 0.2), 0 0 20px rgba(0, 245, 255, 0.15)',
              '& fieldset': { 
                border: '2px solid #00F5FF !important'
              }
            },
            '& input': {
              padding: '12px 14px',
              '&::placeholder': {
                color: '#94A3B8',
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
                color: '#94A3B8', 
                fontSize: { xs: 18, md: 20 },
                ml: 0.5
              }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Right Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton 
          onClick={onNotificationClick}
          sx={{ 
            color: '#F8FAFC',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(0, 245, 255, 0.1)',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)',
              transform: 'scale(1.05)'
            }
          }}>
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        
        <IconButton 
          onClick={onMessageClick}
          sx={{ 
            color: '#F8FAFC',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(168, 85, 247, 0.1)',
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)',
              transform: 'scale(1.05)'
            }
          }}>
          <Badge badgeContent={2} color="primary">
            <Message />
          </Badge>
        </IconButton>
        
        <IconButton 
          onClick={handleSettingsClick}
          sx={{ 
            color: '#F8FAFC',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(251, 191, 36, 0.1)',
              boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)',
              transform: 'scale(1.05)'
            }
          }}>
          <Settings />
        </IconButton>
        
        <Avatar 
          onClick={onProfileClick}
          sx={{ 
            background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', 
            ml: 1,
            border: '2px solid rgba(148, 163, 184, 0.2)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
            }
          }}>A</Avatar>
      </Box>
    </Box>
  );
};

export default TopNavbar;