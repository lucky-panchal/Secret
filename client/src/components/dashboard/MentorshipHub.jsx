'use client';
import { Card, CardContent, Box, Typography, Button, Avatar, Chip, Rating } from '@mui/material';
import { PersonAdd, Group, Chat } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const MentorshipHub = () => {
  const { isDark } = useTheme();

  const mentors = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior React Developer',
      company: 'Google',
      rating: 4.9,
      expertise: ['React', 'TypeScript']
    },
    {
      id: 2,
      name: 'Mike Johnson',
      role: 'Full Stack Engineer',
      company: 'Microsoft',
      rating: 4.8,
      expertise: ['Node.js', 'AWS']
    }
  ];

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          bgcolor: isDark ? '#1e1e1e' : '#ffffff',
          border: `1px solid ${isDark ? '#333333' : '#e5e7eb'}`,
          borderRadius: 3,
          boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.07)',
          height: '100%'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: isDark ? '#ffffff' : '#212121',
              mb: 3
            }}
          >
            Mentorship & Networking Hub
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 3 }}>
            {mentors.map((mentor, index) => (
              <Box key={mentor.id}>
                <Box 
                  sx={{ 
                    border: `1px solid ${isDark ? '#444444' : '#e5e7eb'}`,
                    borderRadius: 2,
                    p: 2.5,
                    bgcolor: isDark ? '#2a2a2a' : '#f8f9fa'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 50, 
                        height: 50,
                        bgcolor: '#1976d2',
                        fontSize: '1.2rem',
                        fontWeight: 600
                      }}
                    >
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 600,
                          color: isDark ? '#ffffff' : '#212121',
                          mb: 0.5
                        }}
                      >
                        {mentor.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: isDark ? '#b0b0b0' : '#6b7280',
                          mb: 0.5
                        }}
                      >
                        {mentor.role} at {mentor.company}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating 
                          value={mentor.rating} 
                          precision={0.1} 
                          size="small" 
                          readOnly 
                        />
                        <Typography 
                          variant="caption" 
                          sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}
                        >
                          {mentor.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                    {mentor.expertise.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        label={skill}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          bgcolor: isDark ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                          color: '#1976d2'
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<PersonAdd />}
                      sx={{
                        flex: 1,
                        borderColor: isDark ? '#555555' : '#d1d5db',
                        color: isDark ? '#ffffff' : '#374151',
                        fontSize: '0.75rem',
                        '&:hover': {
                          borderColor: '#1976d2',
                          color: '#1976d2'
                        }
                      }}
                    >
                      Request
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Chat />}
                      sx={{
                        flex: 1,
                        borderColor: isDark ? '#555555' : '#d1d5db',
                        color: isDark ? '#ffffff' : '#374151',
                        fontSize: '0.75rem',
                        '&:hover': {
                          borderColor: '#1976d2',
                          color: '#1976d2'
                        }
                      }}
                    >
                      Message
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<Group />}
            sx={{
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Join Community Groups
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MentorshipHub;