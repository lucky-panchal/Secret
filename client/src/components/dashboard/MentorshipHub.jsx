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
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.15), 0 0 60px rgba(0, 245, 255, 0.1)',
          height: '100%'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#F8FAFC',
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
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: 2,
                    p: 2.5,
                    background: 'rgba(15, 15, 35, 0.6)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 50, 
                        height: 50,
                        background: 'linear-gradient(135deg, #A855F7 0%, #FBBF24 100%)',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
                      }}
                    >
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#F8FAFC',
                          mb: 0.5
                        }}
                      >
                        {mentor.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#94A3B8',
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
                          sx={{ color: '#94A3B8' }}
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
                          background: 'rgba(168, 85, 247, 0.2)',
                          color: '#A855F7',
                          border: '1px solid rgba(168, 85, 247, 0.3)'
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
                        borderColor: 'rgba(168, 85, 247, 0.3)',
                        color: '#F8FAFC',
                        fontSize: '0.75rem',
                        '&:hover': {
                          borderColor: '#A855F7',
                          color: '#A855F7',
                          boxShadow: '0 0 10px rgba(168, 85, 247, 0.3)'
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
                        borderColor: 'rgba(0, 245, 255, 0.3)',
                        color: '#F8FAFC',
                        fontSize: '0.75rem',
                        '&:hover': {
                          borderColor: '#00F5FF',
                          color: '#00F5FF',
                          boxShadow: '0 0 10px rgba(0, 245, 255, 0.3)'
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
              background: 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)',
              '&:hover': { 
                background: 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
              },
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