'use client';
import { Box, Container, Typography, Grid, Paper, LinearProgress, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { School, Timer, TrendingUp, Star, PlayArrow, MoreVert } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/ui/Navigation';


const stats = [
  { icon: <School />, label: 'Courses Enrolled', value: '12', change: '+2 this month' },
  { icon: <Timer />, label: 'Learning Hours', value: '156', change: '+24 this week' },
  { icon: <TrendingUp />, label: 'Skill Progress', value: '85%', change: '+15% this month' },
  { icon: <Star />, label: 'Certificates', value: '8', change: '+3 completed' },
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
    case 'Completed': return 'var(--success)';
    case 'In Progress': return 'var(--info)';
    case 'Started': return 'var(--warning)';
    default: return 'var(--text-secondary)';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'var(--error)';
    case 'Medium': return 'var(--warning)';
    case 'Low': return 'var(--success)';
    default: return 'var(--text-secondary)';
  }
};

export default function DashboardPage() {
  const { isDark } = useTheme();

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
        <Navigation />
        <Box sx={{ 
          pt: 12, 
          pb: 4, 
          background: 'var(--background)', 
          minHeight: '100vh' 
        }}>
          <Container maxWidth="xl">
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--text-primary)', mb: 1 }}>
                Learning Dashboard
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
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
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 2,
                        height: '100%',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: 'var(--accent)',
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
                          <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'var(--success)', fontWeight: 600 }}>
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
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 3,
                  }}
                >
                  <Box sx={{ p: 3, borderBottom: '1px solid var(--border)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      My Learning Journey
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                      {learningData.length} active courses
                    </Typography>
                  </Box>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: 'var(--text-secondary)', fontWeight: 600, py: 2 }}>Course</TableCell>
                          <TableCell sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Instructor</TableCell>
                          <TableCell sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Start Date</TableCell>
                          <TableCell sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Progress</TableCell>
                          <TableCell sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {learningData.map((row, index) => (
                          <TableRow
                            key={row.id}
                            sx={{ 
                              '&:hover': { 
                                background: 'rgba(0,0,0,0.02)' 
                              } 
                            }}
                          >
                            <TableCell sx={{ py: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  background: 'var(--accent)', 
                                  color: '#000', 
                                  fontSize: '0.8rem', 
                                  fontWeight: 600 
                                }}>
                                  {row.avatar}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {row.course}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                                    {row.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                                {row.instructor}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                                {row.startDate}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={row.progress}
                                  sx={{
                                    width: 60,
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: 'var(--border)',
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: 'var(--primary)',
                                      borderRadius: 3,
                                    },
                                  }}
                                />
                                <Typography variant="caption" sx={{ color: 'var(--text-secondary)', minWidth: 35 }}>
                                  {row.progress}%
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={row.status}
                                size="small"
                                sx={{
                                  backgroundColor: getStatusColor(row.status),
                                  color: 'white',
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton 
                                  size="small" 
                                  sx={{ 
                                    color: 'var(--primary)',
                                    '&:hover': {
                                      background: 'var(--primary)',
                                      color: 'white',
                                    }
                                  }}
                                >
                                  <PlayArrow />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  sx={{ 
                                    color: 'var(--text-secondary)',
                                    '&:hover': {
                                      background: 'var(--surface)',
                                      color: 'var(--text-primary)',
                                    }
                                  }}
                                >
                                  <MoreVert />
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
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Box sx={{ p: 3, borderBottom: '1px solid var(--border)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      Recent Activity
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    {recentActivity.map((activity, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2, '&:last-child': { mb: 0 } }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'var(--accent)',
                            mr: 2,
                            flexShrink: 0,
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                            {activity.action} {activity.item}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                            {activity.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>

                {/* Upcoming Tasks */}
                <Paper
                  sx={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ p: 3, borderBottom: '1px solid var(--border)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      Upcoming Tasks
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    {upcomingTasks.map((task, index) => (
                      <Box key={index} sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {task.task}
                          </Typography>
                          <Chip
                            label={task.priority}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(task.priority),
                              color: 'white',
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', mb: 0.5 }}>
                          {task.course}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'var(--accent)', fontWeight: 600 }}>
                          Due: {task.due}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
    </div>
  );
}