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
        background: 'rgba(26, 26, 46, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0, 245, 255, 0.1), 0 0 40px rgba(168, 85, 247, 0.05)',
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
            background: 'rgba(26, 26, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            height: { xs: 42, md: 46 },
            fontSize: { xs: '0.875rem', md: '0.95rem' },
            fontWeight: 400,
            color: '#F8FAFC',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': { 
              border: '1px solid rgba(0, 245, 255, 0.2)',
              borderRadius: 3
            },
            '&:hover': {
              background: 'rgba(26, 26, 46, 0.8)',
              borderColor: 'rgba(0, 245, 255, 0.4)',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.1)',
              '& fieldset': { 
                borderColor: 'rgba(0, 245, 255, 0.4)'
              }
            },
            '&.Mui-focused': {
              background: 'rgba(26, 26, 46, 0.9)',
              borderColor: '#00F5FF',
              boxShadow: '0 0 0 3px rgba(0, 245, 255, 0.2), 0 0 20px rgba(0, 245, 255, 0.15)',
              '& fieldset': { 
                borderColor: '#00F5FF',
                borderWidth: '2px'
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
        <IconButton sx={{ 
          color: '#F8FAFC',
          '&:hover': {
            bgcolor: 'rgba(0, 245, 255, 0.1)',
            boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)'
          }
        }}>
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        
        <IconButton sx={{ 
          color: '#F8FAFC',
          '&:hover': {
            bgcolor: 'rgba(168, 85, 247, 0.1)',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)'
          }
        }}>
          <Badge badgeContent={2} color="primary">
            <Message />
          </Badge>
        </IconButton>
        
        <IconButton sx={{ 
          color: '#F8FAFC',
          '&:hover': {
            bgcolor: 'rgba(251, 191, 36, 0.1)',
            boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)'
          }
        }}>
          <Settings />
        </IconButton>
        
        <Avatar sx={{ 
          background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', 
          ml: 1,
          border: '2px solid rgba(0, 245, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 25px rgba(0, 245, 255, 0.4)'
          }
        }}>A</Avatar>
      </Box>
    </Box>
  );
};

export default TopNavbar;