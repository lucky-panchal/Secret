'use client';
import { Card, CardContent, Box, Typography, Avatar, Button, Chip } from '@mui/material';
import { Message, PersonAdd } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const MentorCard = () => {
  const { isDark } = useTheme();

  const mentors = [
    {
      name: 'Sarah Chen',
      role: 'Senior Data Scientist',
      company: 'Google',
      expertise: 'Machine Learning',
      avatar: 'S',
      online: true
    },
    {
      name: 'Mike Johnson',
      role: 'Full Stack Developer',
      company: 'Microsoft',
      expertise: 'React & Node.js',
      avatar: 'M',
      online: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        elevation={0}
        sx={{
          bgcolor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 3,
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.07)',
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
            Your Mentors
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mentors.map((mentor, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: isDark ? '#2a2a2a' : '#f8f9fc',
                  border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ bgcolor: '#705CF6', width: 40, height: 40 }}>
                    {mentor.avatar}
                  </Avatar>
                  {mentor.online && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        bgcolor: '#10b981',
                        borderRadius: '50%',
                        border: `2px solid ${isDark ? '#1e1e1e' : '#ffffff'}`,
                      }}
                    />
                  )}
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600,
                      color: isDark ? '#ffffff' : '#374151',
                      mb: 0.5
                    }}
                  >
                    {mentor.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: isDark ? '#b0b0b0' : '#6b7280',
                      display: 'block',
                      mb: 1
                    }}
                  >
                    {mentor.role} at {mentor.company}
                  </Typography>
                  <Chip
                    label={mentor.expertise}
                    size="small"
                    sx={{
                      bgcolor: isDark ? 'rgba(112, 92, 246, 0.1)' : 'rgba(112, 92, 246, 0.1)',
                      color: '#705CF6',
                      fontSize: '0.7rem',
                      height: 20,
                    }}
                  />
                </Box>
                
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Message />}
                  sx={{
                    borderColor: '#705CF6',
                    color: '#705CF6',
                    minWidth: 'auto',
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.75rem',
                    '&:hover': {
                      bgcolor: 'rgba(112, 92, 246, 0.1)',
                      borderColor: '#705CF6',
                    },
                  }}
                >
                  Chat
                </Button>
              </Box>
            ))}
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<PersonAdd />}
            sx={{
              mt: 2,
              borderColor: isDark ? '#333' : '#e5e7eb',
              color: isDark ? '#ffffff' : '#374151',
              borderRadius: 2,
              py: 1,
              '&:hover': {
                borderColor: '#705CF6',
                color: '#705CF6',
              },
            }}
          >
            Find More Mentors
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MentorCard;