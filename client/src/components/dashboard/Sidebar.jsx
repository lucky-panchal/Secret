'use client';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider } from '@mui/material';
import { Dashboard, Inbox, School, Assignment, Group, Settings, Logout, Person } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { isDark } = useTheme();

  const navigationItems = [
    { label: 'Dashboard', icon: Dashboard, active: true },
    { label: 'Inbox', icon: Inbox },
    { label: 'Courses', icon: School },
    { label: 'Tasks', icon: Assignment },
    { label: 'Groups', icon: Group },
    { label: 'Settings', icon: Settings },
  ];

  const mentors = [
    { name: 'Sarah Chen', avatar: '/avatars/sarah.jpg' },
    { name: 'Mike Johnson', avatar: '/avatars/mike.jpg' },
    { name: 'Lisa Wang', avatar: '/avatars/lisa.jpg' },
  ];

  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        bgcolor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#705CF6', fontSize: '1.125rem' }}>
          ReskillPro
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flexGrow: 1 }}>
        {navigationItems.map((item, index) => (
          <motion.div key={index} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <ListItem
              sx={{
                borderRadius: 2,
                mb: 0.5,
                py: 1,
                px: 1.5,
                bgcolor: item.active ? '#705CF6' : 'transparent',
                color: item.active ? '#ffffff' : '#374151',
                '&:hover': {
                  bgcolor: item.active ? '#705CF6' : 'rgba(112, 92, 246, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
                <item.icon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ '& .MuiTypography-root': { fontWeight: 500, fontSize: '0.875rem' } }} />
            </ListItem>
          </motion.div>
        ))}
      </List>

      {/* User Profile */}
      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ mb: 3, borderColor: isDark ? '#333' : '#e5e7eb' }} />
        
        {/* Mentors */}
        <Typography variant="subtitle2" sx={{ mb: 2, color: isDark ? '#b0b0b0' : '#6b7280', fontWeight: 600 }}>
          Your Mentors
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          {mentors.map((mentor, index) => (
            <Avatar
              key={index}
              sx={{ width: 32, height: 32, bgcolor: '#705CF6' }}
            >
              {mentor.name.charAt(0)}
            </Avatar>
          ))}
        </Box>

        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, bgcolor: isDark ? '#2a2a2a' : '#f8f9fc' }}>
          <Avatar sx={{ bgcolor: '#705CF6' }}>A</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: isDark ? '#ffffff' : '#374151' }}>
              Anmol Singh
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}>
              Premium Member
            </Typography>
          </Box>
        </Box>

        {/* Logout */}
        <ListItem sx={{ mt: 2, borderRadius: 2, color: isDark ? '#ffffff' : '#374151', '&:hover': { bgcolor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)' } }}>
          <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ '& .MuiTypography-root': { fontWeight: 500 } }} />
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;