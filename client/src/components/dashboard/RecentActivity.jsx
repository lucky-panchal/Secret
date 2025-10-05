'use client';
import { Card, CardContent, Box, Typography, Avatar, Chip } from '@mui/material';
import { PlayArrow, CheckCircle, Download, Group } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { formatRelativeTime } from '@/utils/dateUtils';

const RecentActivity = () => {
  const { isDark } = useTheme();

  const activities = [
    {
      id: 1,
      action: 'Completed Course',
      title: 'React Fundamentals',
      time: '2 hours ago',
      icon: CheckCircle,
      color: '#4caf50'
    },
    {
      id: 2,
      action: 'Started Learning',
      title: 'TypeScript Basics',
      time: '5 hours ago',
      icon: PlayArrow,
      color: '#1976d2'
    },
    {
      id: 3,
      action: 'Downloaded Certificate',
      title: 'JavaScript Advanced',
      time: '1 day ago',
      icon: Download,
      color: '#ff9800'
    },
    {
      id: 4,
      action: 'Joined Group',
      title: 'Frontend Developers',
      time: '2 days ago',
      icon: Group,
      color: '#9c27b0'
    }
  ];

  return (
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
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: '#374151',
            mb: 3
          }}
        >
          Recent Activity
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {activities.map((activity) => (
            <Box 
              key={activity.id}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: '#f8f9fa',
                border: '1px solid #e5e7eb'
              }}
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  bgcolor: `${activity.color}20`
                }}
              >
                <activity.icon sx={{ color: activity.color, fontSize: 20 }} />
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#374151',
                    fontWeight: 600,
                    mb: 0.5
                  }}
                >
                  {activity.action}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6b7280'
                  }}
                >
                  {activity.title}
                </Typography>
              </Box>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#9ca3af'
                }}
              >
                {activity.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;