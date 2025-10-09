'use client';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider } from '@mui/material';
import { Dashboard, VerifiedUser, School, Assignment, Work, Settings, Logout, Person, Token, Psychology, Timeline } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const Sidebar = ({ onNavigate, currentPage }) => {
  const { isDark } = useTheme();

  const navigationItems = [
    { label: 'Dashboard', icon: Dashboard, page: 'dashboard' },
    { label: 'AI Analysis', icon: Psychology, page: 'ai-analysis' },
    { label: 'Career Roadmap', icon: Timeline, page: 'roadmap' },
    { label: 'Courses', icon: School, page: 'courses' },
    { label: 'Tasks', icon: Assignment, page: 'tasks' },
    { label: 'Certificates', icon: VerifiedUser, page: 'certificates' },
    { label: 'Jobs', icon: Work, page: 'jobs' },
    { label: 'Tokens', icon: Token, page: 'tokens' },
    { label: 'Settings', icon: Settings, page: 'settings' },
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
        background: 'linear-gradient(180deg, rgba(26, 26, 46, 0.95) 0%, rgba(15, 15, 35, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        borderRight: 'none',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        boxShadow: '4px 0 20px rgba(0, 245, 255, 0.1), 0 0 40px rgba(168, 85, 247, 0.05)',
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#705CF6', fontSize: '1.125rem' }}>
          KaushalX
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flexGrow: 1 }}>
        {navigationItems.map((item, index) => (
          <motion.div key={index} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <ListItem
              onClick={() => onNavigate && onNavigate(item.page)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                py: 1,
                px: 1.5,
                bgcolor: currentPage === item.page ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)' : 'transparent',
                color: currentPage === item.page ? '#ffffff' : '#CBD5E1',
                border: 'none',
                boxShadow: currentPage === item.page ? '0 0 20px rgba(0, 245, 255, 0.2)' : 'none',
                outline: 'none',
                cursor: 'pointer',
                '&:focus': {
                  outline: 'none'
                },
                '&:hover': {
                  bgcolor: currentPage === item.page ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)' : 'rgba(0, 245, 255, 0.1)',
                  border: 'none',
                  boxShadow: '0 0 15px rgba(0, 245, 255, 0.15)',
                  color: '#ffffff'
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
        <Divider sx={{ mb: 2, borderColor: 'rgba(0, 245, 255, 0.2)', background: 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.3), transparent)' }} />
        
        {/* Mentors */}
        <Typography variant="caption" sx={{ mb: 1.5, color: '#94A3B8', fontWeight: 600, display: 'block' }}>
          Your Mentors
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
          {mentors.slice(0, 3).map((mentor, index) => (
            <Avatar
              key={index}
              sx={{ 
                width: 28, 
                height: 28, 
                background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                fontSize: '0.75rem',
                border: 'none',
                boxShadow: '0 0 10px rgba(0, 245, 255, 0.2)'
              }}
            >
              {mentor.name.charAt(0)}
            </Avatar>
          ))}
        </Box>

        {/* User Info */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5, 
          p: 1.5, 
          borderRadius: 2, 
          background: 'rgba(26, 26, 46, 0.6)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          boxShadow: '0 0 15px rgba(0, 245, 255, 0.1)'
        }}>
          <Avatar sx={{ 
            background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', 
            width: 32, 
            height: 32, 
            fontSize: '0.875rem',
            border: 'none',
            boxShadow: '0 0 10px rgba(0, 245, 255, 0.2)'
          }}>A</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: isDark ? '#ffffff' : '#374151' }}>
              Anmol Sinha
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.7rem' }}>
              Premium Member
            </Typography>
          </Box>
        </Box>

        {/* Logout */}
        <ListItem 
          onClick={() => {
            if (confirm('Are you sure you want to logout?')) {
              console.log('User logged out');
              alert('Logged out successfully!');
              // Here you would typically redirect to login page
            }
          }}
          sx={{ 
            mt: 2, 
            borderRadius: 2, 
            color: isDark ? '#ffffff' : '#374151', 
            cursor: 'pointer',
            '&:hover': { bgcolor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)' } 
          }}
        >
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