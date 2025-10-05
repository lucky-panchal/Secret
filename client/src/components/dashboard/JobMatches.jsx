'use client';
import { Card, CardContent, Box, Typography, Button, Chip, Avatar, Divider } from '@mui/material';
import { LocationOn, AttachMoney } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const JobMatches = () => {
  const { isDark } = useTheme();

  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Remote',
      salary: '$80k - $120k',
      match: 95,
      type: 'Remote'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'San Francisco',
      salary: '$90k - $130k',
      match: 88,
      type: 'Hybrid'
    }
  ];

  const getMatchColor = (match) => {
    if (match >= 90) return '#34D399';
    if (match >= 70) return '#FBBF24';
    return '#F87171';
  };

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(0, 245, 255, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)',
          height: '100%'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#F8FAFC'
              }}
            >
              AI Job Matches
            </Typography>
            
            <Button
              variant="text"
              size="small"
              sx={{ 
                color: '#00F5FF',
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              View All
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            {jobs.map((job, index) => (
              <Box key={job.id}>
                <Box 
                  sx={{ 
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    borderRadius: 2,
                    p: 2.5,
                    background: 'rgba(15, 15, 35, 0.6)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40,
                          background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          border: '1px solid rgba(0, 245, 255, 0.3)'
                        }}
                      >
                        {job.company.charAt(0)}
                      </Avatar>
                      
                      <Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 600,
                            color: '#F8FAFC',
                            mb: 0.5
                          }}
                        >
                          {job.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#94A3B8'
                          }}
                        >
                          {job.company}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Chip 
                      label={`${job.match}% Match`}
                      size="small"
                      sx={{
                        bgcolor: `${getMatchColor(job.match)}20`,
                        color: getMatchColor(job.match),
                        border: `1px solid ${getMatchColor(job.match)}40`,
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16, color: '#94A3B8' }} />
                      <Typography 
                        variant="caption" 
                        sx={{ color: '#94A3B8' }}
                      >
                        {job.location}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachMoney sx={{ fontSize: 16, color: '#94A3B8' }} />
                      <Typography 
                        variant="caption" 
                        sx={{ color: '#94A3B8' }}
                      >
                        {job.salary}
                      </Typography>
                    </Box>
                    
                    <Chip 
                      label={job.type}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Box>
                  
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                      '&:hover': { 
                        background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                        boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)'
                      },
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Apply Now
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          <Divider sx={{ mb: 2, borderColor: 'rgba(0, 245, 255, 0.2)' }} />
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Remote', 'Hybrid', 'On-site'].map((filter) => (
              <Chip
                key={filter}
                label={filter}
                size="small"
                variant="outlined"
                clickable
                sx={{
                  fontSize: '0.7rem',
                  borderColor: 'rgba(0, 245, 255, 0.3)',
                  color: '#94A3B8',
                  '&:hover': {
                    bgcolor: 'rgba(0, 245, 255, 0.1)',
                    borderColor: '#00F5FF',
                    color: '#00F5FF'
                  }
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobMatches;