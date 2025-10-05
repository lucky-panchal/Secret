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
        return <TrendingUp sx={{ color: '#1976d2' }} />;
      case 'deadline':
        return <Schedule sx={{ color: '#ff9800' }} />;
      default:
        return <Notifications sx={{ color: '#4caf50' }} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      default:
        return '#4caf50';
    }
  };

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          bgcolor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 3,
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#374151'
              }}
            >
              Notifications & Updates
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
                    bgcolor: '#f8f9fa',
                    border: '1px solid #e5e7eb'
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
                          color: '#374151'
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
                        color: '#6b7280',
                        mb: 1,
                        lineHeight: 1.4
                      }}
                    >
                      {notification.message}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#9ca3af'
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