'use client';
import { Box, Typography, Avatar, TextField, IconButton } from '@mui/material';
import { Search, Notifications, Message, Dashboard as DashboardIcon, Task, CalendarToday, Analytics, Group, Settings, Help, Logout } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';

const DashboardLayout = ({ children }) => {
  const { isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Task />, label: 'Tasks', path: '/tasks' },
    { icon: <CalendarToday />, label: 'Calendar', path: '/calendar' },
    { icon: <Analytics />, label: 'Analytics', path: '/analytics' },
    { icon: <Group />, label: 'Team', path: '/team' },
    { icon: <Settings />, label: 'Settings', path: '/settings' },
    { icon: <Help />, label: 'Help', path: '/help' }
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', background: isDark ? '#0f0f0f' : '#f8f9fa', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: { xs: '100%', md: 280 }, 
        height: '100vh',
        background: isDark ? '#1a1a1a' : '#ffffff',
        borderRight: { md: `1px solid ${isDark ? '#333' : '#e0e0e0'}` },
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 800, 
          mb: 5, 
          color: isDark ? '#4a90e2' : '#1976d2',
          fontSize: '1.6rem',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.02em'
        }}>
          KaushalX
        </Typography>

        <Box sx={{ mb: 4 }}>
          {sidebarItems.map((item, index) => (
            <motion.div key={index} whileHover={{ x: 4 }}>
              <Box 
                onClick={() => router.push(item.path)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  cursor: 'pointer',
                  background: pathname === item.path ? (isDark ? 'rgba(74,144,226,0.2)' : 'rgba(25,118,210,0.1)') : 'transparent',
                  color: pathname === item.path ? (isDark ? '#4a90e2' : '#1976d2') : (isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'),
                  '&:hover': {
                    background: isDark ? 'rgba(74,144,226,0.1)' : 'rgba(25,118,210,0.05)'
                  }
                }}
              >
                {item.icon}
                <Typography sx={{ 
                  ml: 2.5, 
                  fontWeight: pathname === item.path ? 600 : 500,
                  fontSize: '0.95rem',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.01em'
                }}>
                  {item.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2, cursor: 'pointer', borderRadius: 2, '&:hover': { background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' } }}>
            <Logout sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }} />
            <Typography sx={{ ml: 2, color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>Logout</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: { md: '280px' } }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          p: 3,
          background: isDark ? '#1a1a1a' : '#ffffff',
          borderBottom: `1px solid ${isDark ? '#333' : '#e0e0e0'}`
        }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{ 
              width: 400,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: isDark ? '#2a2a2a' : '#f8f9fa'
              }
            }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }} />
            }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton><Notifications sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }} /></IconButton>
            <IconButton><Message sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }} /></IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Avatar sx={{ width: 40, height: 40, mr: 2, background: isDark ? '#4a90e2' : '#1976d2' }}>T</Avatar>
              <Typography sx={{ fontWeight: 600, color: isDark ? 'white' : 'black' }}>Tanya</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;