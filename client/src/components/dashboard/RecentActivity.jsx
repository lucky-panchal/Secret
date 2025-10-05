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
      color: '#34D399'
    },
    {
      id: 2,
      action: 'Started Learning',
      title: 'TypeScript Basics',
      time: '5 hours ago',
      icon: PlayArrow,
      color: '#00F5FF'
    },
    {
      id: 3,
      action: 'Downloaded Certificate',
      title: 'JavaScript Advanced',
      time: '1 day ago',
      icon: Download,
      color: '#FBBF24'
    },
    {
      id: 4,
      action: 'Joined Group',
      title: 'Frontend Developers',
      time: '2 days ago',
      icon: Group,
      color: '#A855F7'
    }
  ];

  return (
    <Card 
      elevation={0}
      sx={{ 
        background: 'rgba(26, 26, 46, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        borderRadius: 3,
        boxShadow: '0 0 30px rgba(251, 191, 36, 0.15), 0 0 60px rgba(0, 245, 255, 0.1)'
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
                background: 'rgba(15, 15, 35, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(251, 191, 36, 0.2)'
              }}
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  background: `radial-gradient(circle, ${activity.color}20 0%, ${activity.color}10 100%)`,
                  border: `1px solid ${activity.color}30`,
                  boxShadow: `0 0 10px ${activity.color}20`
                }}
              >
                <activity.icon sx={{ color: activity.color, fontSize: 20 }} />
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#F8FAFC',
                    fontWeight: 600,
                    mb: 0.5
                  }}
                >
                  {activity.action}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94A3B8'
                  }}
                >
                  {activity.title}
                </Typography>
              </Box>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#64748B'
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