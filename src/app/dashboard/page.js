'use client';
import { Box, Container, Grid, Paper, Typography, Avatar, Button, TextField, IconButton, Card, CardContent, LinearProgress, Skeleton, Chip, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { Search, Notifications, Message, Dashboard as DashboardIcon, Task, CalendarToday, Analytics, Group, Settings, Help, Logout, PlayArrow, PauseCircle, TrendingUp, Assignment, AccessTime, CheckCircle, Schedule } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import TaskSection from '@/components/ui/TaskSection';
import ProfessionalChat from '@/components/ui/ProfessionalChat';

const DashboardPage = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [timeTracking, setTimeTracking] = useState({ isRunning: false, time: '02:34:15', seconds: 9255 });
  const [dashboardData, setDashboardData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const sidebarItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', active: true },
    { icon: <Task />, label: 'Tasks' },
    { icon: <CalendarToday />, label: 'Calendar' },
    { icon: <Analytics />, label: 'Analytics' },
    { icon: <Group />, label: 'Team' },
    { icon: <Settings />, label: 'Settings' },
    { icon: <Help />, label: 'Help' }
  ];

  // Dynamic data that would come from API
  const mockData = {
    projectStats: [
      { title: 'Total Projects', value: 24, change: '+12%', color: '#4a90e2' },
      { title: 'Ended Projects', value: 18, change: '+8%', color: '#4ecdc4' },
      { title: 'Running Projects', value: 4, change: '+2%', color: '#ff6b6b' },
      { title: 'Pending Projects', value: 2, change: '-1%', color: '#ffd700' }
    ],
    chartData: [65, 78, 45, 89, 67, 56, 78],
    reminders: [
      { title: 'Team Meeting', time: '10:00 AM', type: 'meeting' },
      { title: 'Project Deadline', time: '2:00 PM', type: 'deadline' },
      { title: 'Code Review', time: '4:30 PM', type: 'review' }
    ],
    teamMembers: [
      { name: 'Sarah Johnson', role: 'Frontend Dev', avatar: 'SJ', status: 'active', tasks: 5 },
      { name: 'Mike Chen', role: 'Backend Dev', avatar: 'MC', status: 'busy', tasks: 3 },
      { name: 'Lisa Wang', role: 'UI Designer', avatar: 'LW', status: 'active', tasks: 7 },
      { name: 'David Kim', role: 'DevOps', avatar: 'DK', status: 'offline', tasks: 2 }
    ],
    projectTasks: [
      { title: 'Update Dashboard UI', due: '2024-01-15', status: 'in-progress', priority: 'high' },
      { title: 'API Integration', due: '2024-01-18', status: 'pending', priority: 'medium' },
      { title: 'Testing Phase', due: '2024-01-20', status: 'completed', priority: 'low' },
      { title: 'Deploy to Production', due: '2024-01-22', status: 'pending', priority: 'high' }
    ]
  };

  useEffect(() => {
    const fetchData = () => {
      // Simulate dynamic data changes
      const dynamicData = {
        ...mockData,
        projectStats: mockData.projectStats.map(stat => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * 3) - 1,
          change: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 15)}%`
        })),
        chartData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 20)
      };
      setDashboardData(dynamicData);
      setLoading(false);
    };

    const timer = setTimeout(fetchData, 2000);
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [refreshKey]);

  useEffect(() => {
    let interval;
    if (timeTracking.isRunning) {
      interval = setInterval(() => {
        setTimeTracking(prev => {
          const newSeconds = prev.seconds + 1;
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const secs = newSeconds % 60;
          return {
            ...prev,
            seconds: newSeconds,
            time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeTracking.isRunning]);

  const toggleTimeTracker = () => {
    setTimeTracking(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const refreshData = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', background: isDark ? '#0f0f0f' : '#f8f9fa' }}>
        {/* Sidebar Skeleton */}
        <Box sx={{ width: 280, p: 3, background: isDark ? '#1a1a1a' : '#ffffff', borderRight: `1px solid ${isDark ? '#333' : '#e0e0e0'}` }}>
          <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 3, borderRadius: 2 }} />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="100%" height={48} sx={{ mb: 2, borderRadius: 2 }} />
          ))}
          <Skeleton variant="text" width="60%" sx={{ mt: 4, mb: 2 }} />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="100%" height={40} sx={{ mb: 2, borderRadius: 2 }} />
          ))}
        </Box>

        {/* Main Content Skeleton */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 3, borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 3, borderRadius: 3 }} />
          <Grid container spacing={3}>
            {[...Array(3)].map((_, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Skeleton variant="rectangular" width="100%" height={180} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Right Panel Skeleton */}
        <Box sx={{ width: 320, p: 3, background: isDark ? '#1a1a1a' : '#ffffff', borderLeft: `1px solid ${isDark ? '#333' : '#e0e0e0'}` }}>
          <Skeleton variant="rectangular" width="100%" height={150} sx={{ mb: 3, borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 3, borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={180} sx={{ borderRadius: 2 }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', background: isDark ? '#0f0f0f' : '#f8f9fa' }}>
      {/* Sidebar */}
      <Box sx={{ 
        width: { xs: '100%', md: 280 }, 
        height: { xs: 'auto', md: '100vh' },
        background: isDark ? '#1a1a1a' : '#ffffff',
        borderRight: { md: `1px solid ${isDark ? '#333' : '#e0e0e0'}` },
        borderBottom: { xs: `1px solid ${isDark ? '#333' : '#e0e0e0'}`, md: 'none' },
        p: 3,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 800, 
          mb: 4, 
          color: isDark ? '#4a90e2' : '#1976d2',
          fontFamily: 'Poppins, sans-serif',
          letterSpacing: '-0.02em'
        }}>
          KaushalX
        </Typography>

        {/* Main Menu */}
        <Box sx={{ mb: 4 }}>
          {sidebarItems.map((item, index) => (
            <motion.div key={index} whileHover={{ x: 4 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                mb: 1,
                borderRadius: 2,
                cursor: 'pointer',
                background: item.active ? (isDark ? 'rgba(74,144,226,0.2)' : 'rgba(25,118,210,0.1)') : 'transparent',
                color: item.active ? (isDark ? '#4a90e2' : '#1976d2') : (isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'),
                '&:hover': {
                  background: isDark ? 'rgba(74,144,226,0.1)' : 'rgba(25,118,210,0.05)'
                }
              }}>
                {item.icon}
                <Typography sx={{ 
                  ml: 2, 
                  fontWeight: item.active ? 600 : 400,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  letterSpacing: '-0.01em'
                }}>
                  {item.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>



        {/* Logout */}
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2, cursor: 'pointer', borderRadius: 2, '&:hover': { background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' } }}>
            <Logout sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }} />
            <Typography sx={{ 
              ml: 2, 
              color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem'
            }}>Logout</Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          p: 3,
          background: isDark ? '#1a1a1a' : '#ffffff',
          borderBottom: `1px solid ${isDark ? '#333' : '#e0e0e0'}`
        }}>
          <TextField
            placeholder="Search courses, mentors..."
            variant="outlined"
            size="small"
            sx={{ 
              width: 400,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: isDark ? '#2a2a2a' : '#f8f9fa'
              }
            }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }} />
            }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <Notifications sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }} />
            </IconButton>
            <IconButton>
              <Message sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Avatar sx={{ width: 40, height: 40, mr: 2, background: isDark ? '#4a90e2' : '#1976d2' }}>T</Avatar>
              <Typography sx={{ 
                fontWeight: 600, 
                color: isDark ? 'white' : 'black',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                letterSpacing: '-0.01em'
              }}>Tanya</Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1, 
          p: { xs: 3, md: 4 }, 
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 4,
          height: 'calc(100vh - 80px)',
          background: isDark ? '#0a0a0a' : '#fafafa'
        }}>
          {/* Left Column */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Project Stats Cards */}
            <Grid container spacing={3}>
              {dashboardData?.projectStats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                  >
                    <Card sx={{
                      p: 3,
                      background: isDark 
                        ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                      borderRadius: 3,
                      textAlign: 'center',
                      minHeight: 140,
                      boxShadow: isDark 
                        ? '0 8px 32px rgba(0,0,0,0.3)'
                        : '0 8px 32px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: isDark 
                          ? `0 12px 40px ${stat.color}20`
                          : `0 12px 40px ${stat.color}15`
                      }
                    }}>
                      <Typography variant="h3" sx={{ 
                        fontWeight: 700, 
                        color: stat.color, 
                        mb: 1.5,
                        fontSize: { xs: '1.8rem', sm: '2.2rem' },
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ 
                        color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)', 
                        fontWeight: 600, 
                        mb: 1,
                        fontSize: '0.95rem',
                        lineHeight: 1.3
                      }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: stat.change.startsWith('+') ? '#4ecdc4' : '#ff6b6b',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}>
                        {stat.change}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Project Analytics Chart */}
            <Card sx={{ 
              p: 4, 
              background: isDark 
                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
              border: isDark ? '1px solid #333' : '1px solid #e0e0e0', 
              borderRadius: 3, 
              flex: 1,
              boxShadow: isDark 
                ? '0 8px 32px rgba(0,0,0,0.3)'
                : '0 8px 32px rgba(0,0,0,0.08)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  color: isDark ? 'white' : '#1a1a1a',
                  fontSize: '1.4rem',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Project Analytics
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                  fontSize: '0.85rem'
                }}>
                  Last 7 days
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'end', height: 220, gap: 2, px: 1 }}>
                {dashboardData?.chartData.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
                    style={{
                      flex: 1,
                      background: `linear-gradient(to top, ${isDark ? '#4a90e2' : '#1976d2'}, ${isDark ? '#ff6b6b' : '#ff6b6b'})`,
                      borderRadius: '4px 4px 0 0',
                      minHeight: '20px',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(74,144,226,0.3)'
                    }}
                  />
                ))}
              </Box>
            </Card>

            {/* Reminders */}
            <Card sx={{ p: 3, background: isDark ? '#2a2a2a' : '#ffffff', border: isDark ? '1px solid #333' : '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: isDark ? 'white' : 'black' }}>
                Reminders
              </Typography>
              <List sx={{ p: 0 }}>
                {dashboardData?.reminders.map((reminder, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ background: isDark ? '#4a90e2' : '#1976d2', width: 32, height: 32 }}>
                        <Schedule sx={{ fontSize: '1rem' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={reminder.title}
                      secondary={reminder.time}
                      primaryTypographyProps={{ fontWeight: 600, color: isDark ? 'white' : 'black', fontSize: '0.9rem' }}
                      secondaryTypographyProps={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: '0.8rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>

            {/* Task Section */}
            <TaskSection />
          </Box>

          {/* Right Column */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', gap: 3 }}>
            {/* Time Tracker */}
            <Card sx={{ p: 3, background: isDark ? '#2a2a2a' : '#ffffff', border: isDark ? '1px solid #333' : '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: isDark ? 'white' : 'black' }}>
                Time Tracker
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: isDark ? '#4a90e2' : '#1976d2', mb: 2 }}>
                  {timeTracking.time}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={toggleTimeTracker}
                  startIcon={timeTracking.isRunning ? <PauseCircle /> : <PlayArrow />}
                  sx={{
                    background: timeTracking.isRunning ? '#ff6b6b' : '#4ecdc4',
                    '&:hover': {
                      background: timeTracking.isRunning ? '#ff5252' : '#26a69a'
                    }
                  }}
                >
                  {timeTracking.isRunning ? 'Pause' : 'Start'}
                </Button>
              </Box>
            </Card>

            {/* Project Progress */}
            <Card sx={{ p: 3, background: isDark ? '#2a2a2a' : '#ffffff', border: isDark ? '1px solid #333' : '1px solid #e0e0e0', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: isDark ? 'white' : 'black' }}>
                  Project Progress
                </Typography>
                <Button size="small" onClick={refreshData} sx={{ minWidth: 'auto', p: 1 }}>
                  🔄
                </Button>
              </Box>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: `conic-gradient(#4a90e2 0deg ${(dashboardData?.projectStats[0]?.value || 68) * 3.6}deg, ${isDark ? '#333' : '#e0e0e0'} ${(dashboardData?.projectStats[0]?.value || 68) * 3.6}deg 360deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  transition: 'all 0.5s ease'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? 'white' : 'black' }}>
                    {dashboardData?.projectStats[0]?.value || 68}%
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                  Overall Completion
                </Typography>
              </Box>
            </Card>

            {/* Team Collaboration */}
            <Card sx={{ p: 3, background: isDark ? '#2a2a2a' : '#ffffff', border: isDark ? '1px solid #333' : '1px solid #e0e0e0', borderRadius: 2, flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: isDark ? 'white' : 'black' }}>
                Team Collaboration
              </Typography>
              {dashboardData?.teamMembers.map((member, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ position: 'relative' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, background: isDark ? '#4a90e2' : '#1976d2' }}>
                          {member.avatar}
                        </Avatar>
                        <Box sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 8,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: member.status === 'active' ? '#4ecdc4' : member.status === 'busy' ? '#ffd700' : '#999',
                          border: `2px solid ${isDark ? '#2a2a2a' : '#ffffff'}`
                        }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? 'white' : 'black', fontSize: '0.85rem' }}>
                          {member.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontSize: '0.75rem' }}>
                          {member.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={`${member.tasks}`} 
                      size="small" 
                      sx={{ 
                        background: isDark ? 'rgba(74,144,226,0.2)' : 'rgba(25,118,210,0.1)',
                        color: isDark ? '#4a90e2' : '#1976d2',
                        fontSize: '0.7rem',
                        height: 20
                      }}
                    />
                  </Box>
                </motion.div>
              ))}
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Right Panel */}
      <Box sx={{ 
        width: { xs: '100%', lg: 320 }, 
        display: { xs: 'none', lg: 'block' },
        background: isDark ? '#1a1a1a' : '#ffffff',
        borderLeft: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
        p: 3,
        overflow: 'auto'
      }}>
        {/* Project Progress */}
        <Paper sx={{ p: 3, mb: 3, background: isDark ? '#2a2a2a' : '#f8f9fa', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: isDark ? 'white' : 'black' }}>
            Project Progress
          </Typography>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Box sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%', 
              background: `conic-gradient(#4a90e2 0deg ${68 * 3.6}deg, ${isDark ? '#333' : '#e0e0e0'} ${68 * 3.6}deg 360deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2
            }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: isDark ? 'white' : 'black' }}>
                68%
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
              Overall Completion
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Active Projects</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>4</Typography>
            </Box>
            <LinearProgress variant="determinate" value={75} sx={{ height: 6, borderRadius: 3, mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Completed Tasks</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>23/34</Typography>
            </Box>
            <LinearProgress variant="determinate" value={68} sx={{ height: 6, borderRadius: 3 }} />
          </Box>
        </Paper>

        {/* Team Collaboration */}
        <Paper sx={{ p: 3, background: isDark ? '#2a2a2a' : '#f8f9fa', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: isDark ? 'white' : 'black' }}>
            Team Collaboration
          </Typography>
          {dashboardData?.teamMembers.map((member, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2, background: isDark ? '#4a90e2' : '#1976d2' }}>
                      {member.avatar}
                    </Avatar>
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 8,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: member.status === 'active' ? '#4ecdc4' : member.status === 'busy' ? '#ffd700' : '#999',
                      border: `2px solid ${isDark ? '#2a2a2a' : '#f8f9fa'}`
                    }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? 'white' : 'black' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label={`${member.tasks} tasks`} 
                  size="small" 
                  sx={{ 
                    background: isDark ? 'rgba(74,144,226,0.2)' : 'rgba(25,118,210,0.1)',
                    color: isDark ? '#4a90e2' : '#1976d2'
                  }}
                />
              </Box>
            </motion.div>
          ))}
        </Paper>
      </Box>
      
      {/* Professional Chat Component */}
      <ProfessionalChat />
    </Box>
  );
};

export default DashboardPage;