'use client';
import { Box, Container, Typography, Grid, Paper, LinearProgress, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { School, Timer, TrendingUp, Star, PlayArrow, MoreVert, EmojiEvents, Assignment, Group } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/ui/Navigation';

const stats = [
  { icon: <School />, label: 'Courses Enrolled', value: '12', color: '#ffd700', change: '+2 this month' },
  { icon: <Timer />, label: 'Learning Hours', value: '156', color: '#ffd700', change: '+24 this week' },
  { icon: <TrendingUp />, label: 'Skill Progress', value: '85%', color: '#ffd700', change: '+15% this month' },
  { icon: <Star />, label: 'Certificates', value: '8', color: '#ffd700', change: '+3 completed' },
];

const learningData = [
  { id: '#LRN001', course: 'React Advanced Patterns', instructor: 'Sarah Chen', startDate: '15 Jul 2024', progress: 85, status: 'In Progress', avatar: 'RC' },
  { id: '#LRN002', course: 'Python Data Science', instructor: 'Mike Johnson', startDate: '10 Aug 2024', progress: 92, status: 'Completed', avatar: 'PD' },
  { id: '#LRN003', course: 'AWS Cloud Architecture', instructor: 'David Kim', startDate: '22 Aug 2024', progress: 45, status: 'In Progress', avatar: 'AW' },
  { id: '#LRN004', course: 'Machine Learning Fundamentals', instructor: 'Anna Smith', startDate: '05 Sep 2024', progress: 78, status: 'In Progress', avatar: 'ML' },
  { id: '#LRN005', course: 'DevOps Engineering', instructor: 'John Doe', startDate: '12 Sep 2024', progress: 30, status: 'Started', avatar: 'DO' },
];

const recentActivity = [
  { action: 'Completed', item: 'React Hooks Module', time: '2 hours ago', type: 'lesson' },
  { action: 'Submitted', item: 'Python Project Assignment', time: '1 day ago', type: 'assignment' },
  { action: 'Earned', item: 'JavaScript Expert Badge', time: '3 days ago', type: 'achievement' },
  { action: 'Started', item: 'AWS Certification Path', time: '1 week ago', type: 'course' },
];

const upcomingTasks = [
  { task: 'React Final Project', course: 'Advanced React', due: 'Tomorrow', priority: 'High' },
  { task: 'Python Quiz #3', course: 'Data Science', due: '3 days', priority: 'Medium' },
  { task: 'AWS Practice Exam', course: 'Cloud Architecture', due: '1 week', priority: 'High' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return '#4caf50';
    case 'In Progress': return '#2196f3';
    case 'Started': return '#ff9800';
    default: return '#757575';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return '#f44336';
    case 'Medium': return '#ff9800';
    case 'Low': return '#4caf50';
    default: return '#757575';
  }
};

export default function DashboardPage() {
  const { isDark } = useTheme();

  return (
    <>
      <Navigation />
      <Box sx={{ 
        pt: 12, 
        pb: 4, 
        background: isDark ? '#0a0a0a' : '#faf6f2', 
        minHeight: '100vh' 
      }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? 'white' : '#2c1810', mb: 1 }}>
              Learning Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
              Welcome back, Alex! Track your progress and continue learning.
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(20px)',
                      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                      borderRadius: 2,
                      height: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: stat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          mr: 2,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: isDark ? 'white' : '#2c1810', lineHeight: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 600 }}>
                      {stat.change}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* Main Content */}
            <Grid item xs={12} lg={8}>
              {/* Learning Journey */}
              <Paper
                sx={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 3,
                }}
              >
                <Box sx={{ p: 3, borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: isDark ? 'white' : '#2c1810' }}>
                    My Learning Journey
                  </Typography>
                  <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
                    {learningData.length} active courses
                  </Typography>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', fontWeight: 600, py: 2 }}>Course</TableCell>
                        <TableCell sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', fontWeight: 600 }}>Instructor</TableCell>
                        <TableCell sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', fontWeight: 600 }}>Start Date</TableCell>
                        <TableCell sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', fontWeight: 600 }}>Progress</TableCell>
                        <TableCell sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {learningData.map((row, index) => (
                        <TableRow
                          key={row.id}
                          sx={{ 
                            '&:hover': { 
                              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(44,24,16,0.02)' 
                            } 
                          }}
                        >
                          <TableCell sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ width: 40, height: 40, background: '#ffd700', color: '#000', fontSize: '0.8rem', fontWeight: 600 }}>
                                {row.avatar}
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontWeight: 600, color: isDark ? 'white' : '#2c1810' }}>
                                  {row.course}
                                </Typography>
                                <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(44,24,16,0.5)' }}>
                                  {row.id}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(44,24,16,0.8)' }}>
                            {row.instructor}
                          </TableCell>
                          <TableCell sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(44,24,16,0.8)' }}>
                            {row.startDate}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                              <LinearProgress
                                variant="determinate"
                                value={row.progress}
                                sx={{
                                  flex: 1,
                                  height: 6,
                                  borderRadius: 3,
                                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(44,24,16,0.1)',
                                  '& .MuiLinearProgress-bar': {
                                    background: '#ffd700',
                                    borderRadius: 3,
                                  },
                                }}
                              />
                              <Typography variant="body2" sx={{ color: isDark ? 'white' : '#2c1810', minWidth: 35, fontSize: '0.8rem' }}>
                                {row.progress}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              size="small"
                              sx={{
                                background: getStatusColor(row.status),
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <IconButton size="small" sx={{ color: '#ffd700' }}>
                                <PlayArrow fontSize="small" />
                              </IconButton>
                              <IconButton size="small" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
                                <MoreVert fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              {/* Recent Activity */}
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: isDark ? 'white' : '#2c1810' }}>
                  Recent Activity
                </Typography>
                {recentActivity.map((activity, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(44,24,16,0.03)',
                  }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#ffd700',
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: isDark ? 'white' : '#2c1810', fontWeight: 500 }}>
                        <span style={{ color: '#ffd700' }}>{activity.action}</span> {activity.item}
                      </Typography>
                      <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(44,24,16,0.6)' }}>
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>

              {/* Upcoming Tasks */}
              <Paper
                sx={{
                  p: 3,
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: isDark ? 'white' : '#2c1810' }}>
                  Upcoming Tasks
                </Typography>
                {upcomingTasks.map((task, index) => (
                  <Box key={index} sx={{ 
                    p: 2, 
                    mb: 2, 
                    borderRadius: 2, 
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(44,24,16,0.03)',
                    border: `1px solid ${getPriorityColor(task.priority)}30`,
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? 'white' : '#2c1810' }}>
                        {task.task}
                      </Typography>
                      <Chip
                        label={task.priority}
                        size="small"
                        sx={{
                          background: getPriorityColor(task.priority),
                          color: 'white',
                          fontSize: '0.7rem',
                          height: 20,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
                      {task.course} • Due in {task.due}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}