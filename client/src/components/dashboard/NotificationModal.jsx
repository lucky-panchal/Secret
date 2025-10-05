'use client';
import { Box, Modal, Card, CardContent, Typography, IconButton, List, ListItem, ListItemAvatar, ListItemText, Avatar, Chip, Button, Divider } from '@mui/material';
import { Close, Notifications, CheckCircle, Warning, Info, School, Work } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const NotificationModal = ({ open, onClose }) => {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'course',
      title: 'Course Completed!',
      message: 'Congratulations! You have successfully completed "Advanced React Patterns"',
      time: '2 minutes ago',
      read: false,
      icon: School,
      color: '#34D399'
    },
    {
      id: 2,
      type: 'job',
      title: 'New Job Match',
      message: 'A new job opportunity matches your skills: Senior React Developer at TechCorp',
      time: '1 hour ago',
      read: false,
      icon: Work,
      color: '#00F5FF'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Certificate Expiring',
      message: 'Your "Data Science Fundamentals" certificate expires in 30 days',
      time: '3 hours ago',
      read: true,
      icon: Warning,
      color: '#FBBF24'
    },
    {
      id: 4,
      type: 'info',
      title: 'Weekly Progress Report',
      message: 'Your learning progress report for this week is now available',
      time: '1 day ago',
      read: true,
      icon: Info,
      color: '#A855F7'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You earned the "Blockchain Expert" badge for completing 5 blockchain courses',
      time: '2 days ago',
      read: true,
      icon: CheckCircle,
      color: '#34D399'
    }
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={0} sx={{ 
          width: { xs: '90vw', sm: 500 }, 
          maxHeight: '80vh', 
          background: 'rgba(26, 26, 46, 0.95)', 
          backdropFilter: 'blur(20px)', 
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent sx={{ p: 0 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Notifications sx={{ color: '#00F5FF' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                  Notifications
                </Typography>
                {unreadCount > 0 && (
                  <Chip label={unreadCount} size="small" sx={{ bgcolor: '#EF4444', color: '#ffffff', fontWeight: 600 }} />
                )}
              </Box>
              <IconButton onClick={onClose} sx={{ color: '#94A3B8' }}>
                <Close />
              </IconButton>
            </Box>

            {/* Actions */}
            {unreadCount > 0 && (
              <Box sx={{ p: 2, borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
                <Button 
                  variant="text" 
                  size="small" 
                  onClick={handleMarkAllAsRead}
                  sx={{ color: '#00F5FF', textTransform: 'none' }}
                >
                  Mark all as read
                </Button>
              </Box>
            )}

            {/* Notifications List */}
            <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
              <List sx={{ p: 0 }}>
                {notifications.map((notification, index) => (
                  <Box key={notification.id}>
                    <ListItem 
                      sx={{ 
                        py: 2, 
                        px: 3, 
                        bgcolor: notification.read ? 'transparent' : 'rgba(0, 245, 255, 0.05)',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(0, 245, 255, 0.1)' }
                      }}
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: `${notification.color}20`, color: notification.color, width: 40, height: 40 }}>
                          <notification.icon sx={{ fontSize: 20 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                              {notification.title}
                            </Typography>
                            {!notification.read && (
                              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00F5FF' }} />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 0.5 }}>
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748B' }}>
                              {notification.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < notifications.length - 1 && <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.1)' }} />}
                  </Box>
                ))}
              </List>
            </Box>

            {/* Footer */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(148, 163, 184, 0.2)', textAlign: 'center' }}>
              <Button variant="text" sx={{ color: '#A855F7', textTransform: 'none' }}>
                View All Notifications
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Modal>
  );
};

export default NotificationModal;