'use client';
import { Card, CardContent, Box, Typography, Button, Avatar } from '@mui/material';
import { TrendingUp, Schedule, Notifications } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const NotificationsPanel = () => {
  const { isDark } = useTheme();

  const notifications = [
    {
      id: 1,
      type: 'trend',
      title: 'New Skill Trend Detected',
      message: 'AI/ML skills are trending in your field',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'deadline',
      title: 'Course Deadline Approaching',
      message: 'Complete React Advanced by Friday',
      time: '1 day ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Milestone Completed!',
      message: 'You earned 50 Reskilling Tokens',
      time: '3 days ago',
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'trend':
        return <TrendingUp sx={{ color: '#00F5FF' }} />;
      case 'deadline':
        return <Schedule sx={{ color: '#FBBF24' }} />;
      default:
        return <Notifications sx={{ color: '#34D399' }} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#FBBF24';
      default:
        return '#34D399';
    }
  };

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: 'none',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(0, 245, 255, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)'
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
              Notifications & Updates
            </Typography>
            
            <Button
              variant="text"
              size="small"
              sx={{ 
                color: '#00F5FF',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'rgba(0, 245, 255, 0.1)',
                  boxShadow: '0 0 10px rgba(0, 245, 255, 0.2)'
                }
              }}
            >
              View All
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2.5,
                    borderRadius: 2,
                    background: 'rgba(15, 15, 35, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: 'none'
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: 'transparent'
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                  
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#F8FAFC'
                        }}
                      >
                        {notification.title}
                      </Typography>
                      
                      <Box 
                        sx={{ 
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: getPriorityColor(notification.priority)
                        }}
                      />
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#94A3B8',
                        mb: 1,
                        lineHeight: 1.4
                      }}
                    >
                      {notification.message}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#64748B'
                      }}
                    >
                      {notification.time}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationsPanel;