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
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.15), 0 0 60px rgba(0, 245, 255, 0.1)',
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
                  background: 'rgba(15, 15, 35, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ 
                    background: 'linear-gradient(135deg, #A855F7 0%, #FBBF24 100%)', 
                    width: 40, 
                    height: 40,
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
                  }}>
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
                        border: '2px solid rgba(26, 26, 46, 0.8)',
                      }}
                    />
                  )}
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#F8FAFC',
                      mb: 0.5
                    }}
                  >
                    {mentor.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#94A3B8',
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
                      background: 'rgba(168, 85, 247, 0.2)',
                      color: '#A855F7',
                      fontSize: '0.7rem',
                      height: 20,
                      border: '1px solid rgba(168, 85, 247, 0.3)'
                    }}
                  />
                </Box>
                
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Message />}
                  sx={{
                    borderColor: '#A855F7',
                    color: '#A855F7',
                    minWidth: 'auto',
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.75rem',
                    '&:hover': {
                      bgcolor: 'rgba(168, 85, 247, 0.1)',
                      borderColor: '#A855F7',
                      boxShadow: '0 0 10px rgba(168, 85, 247, 0.3)',
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
              borderColor: 'rgba(168, 85, 247, 0.3)',
              color: '#F8FAFC',
              borderRadius: 2,
              py: 1,
              '&:hover': {
                borderColor: '#A855F7',
                color: '#A855F7',
                boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)',
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