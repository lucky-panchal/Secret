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
    if (match >= 90) return '#4caf50';
    if (match >= 70) return '#ff9800';
    return '#f44336';
  };

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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: isDark ? '#ffffff' : '#212121'
              }}
            >
              AI Job Matches
            </Typography>
            
            <Button
              variant="text"
              size="small"
              sx={{ 
                color: '#1976d2',
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
                    border: `1px solid ${isDark ? '#444444' : '#e5e7eb'}`,
                    borderRadius: 2,
                    p: 2.5,
                    bgcolor: isDark ? '#2a2a2a' : '#f8f9fa'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40,
                          bgcolor: '#1976d2',
                          fontSize: '1rem',
                          fontWeight: 600
                        }}
                      >
                        {job.company.charAt(0)}
                      </Avatar>
                      
                      <Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 600,
                            color: isDark ? '#ffffff' : '#212121',
                            mb: 0.5
                          }}
                        >
                          {job.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: isDark ? '#b0b0b0' : '#6b7280'
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
                      <LocationOn sx={{ fontSize: 16, color: isDark ? '#b0b0b0' : '#6b7280' }} />
                      <Typography 
                        variant="caption" 
                        sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}
                      >
                        {job.location}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachMoney sx={{ fontSize: 16, color: isDark ? '#b0b0b0' : '#6b7280' }} />
                      <Typography 
                        variant="caption" 
                        sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}
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
                      bgcolor: '#1976d2',
                      '&:hover': { bgcolor: '#1565c0' },
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

          <Divider sx={{ mb: 2, borderColor: isDark ? '#444444' : '#e5e7eb' }} />
          
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
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)'
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