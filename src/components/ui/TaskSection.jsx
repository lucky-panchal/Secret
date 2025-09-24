'use client';
import { Box, Card, Typography, Chip, Avatar, Button, Select, MenuItem, FormControl, LinearProgress, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Add, Visibility, Schedule, CheckCircle, Assignment, Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';

const TaskSection = () => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', due: '', assignee: 'SJ' });

  const initialTasks = [
    { id: 1, title: 'Update Dashboard UI', description: 'Redesign the main dashboard layout', status: 'in-progress', priority: 'high', due: '2024-01-15', assignee: 'SJ', progress: 75 },
    { id: 2, title: 'API Integration', description: 'Connect frontend with backend APIs', status: 'pending', priority: 'medium', due: '2024-01-18', assignee: 'MC', progress: 0 },
    { id: 3, title: 'Testing Phase', description: 'Complete unit and integration tests', status: 'completed', priority: 'low', due: '2024-01-20', assignee: 'LW', progress: 100 },
    { id: 4, title: 'Deploy to Production', description: 'Deploy application to live server', status: 'pending', priority: 'high', due: '2024-01-22', assignee: 'DK', progress: 0 },
    { id: 5, title: 'Code Review', description: 'Review pull requests and merge', status: 'in-progress', priority: 'medium', due: '2024-01-16', assignee: 'EW', progress: 50 },
    { id: 6, title: 'Documentation', description: 'Update project documentation', status: 'completed', priority: 'low', due: '2024-01-14', assignee: 'AR', progress: 100 }
  ];

  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: 'pending',
        progress: 0
      };
      setTasks(prev => [...prev, task]);
      setNewTask({ title: '', description: '', priority: 'medium', due: '', assignee: 'SJ' });
      setOpenDialog(false);
    }
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, status: newStatus, progress: newStatus === 'completed' ? 100 : task.progress }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4ecdc4';
      case 'in-progress': return '#4a90e2';
      case 'pending': return '#ffd700';
      case 'overdue': return '#ff6b6b';
      default: return '#999';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'in-progress': return <Schedule />;
      case 'pending': return <Assignment />;
      default: return <Assignment />;
    }
  };

  return (
    <Card sx={{ p: 3, background: isDark ? '#2a2a2a' : '#ffffff', border: isDark ? '1px solid #333' : '1px solid #e0e0e0', borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: isDark ? 'white' : 'black' }}>
          Tasks Overview
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? '#333' : '#e0e0e0'
              },
              '& .MuiSelect-select': {
                color: isDark ? 'white' : 'black'
              }
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Progress Tracker */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }}>
            Progress
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? 'white' : 'black' }}>
            {completedTasks}/{totalTasks} tasks
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={overallProgress} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            background: isDark ? '#333' : '#f0f0f0',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #4a90e2, #4ecdc4)'
            }
          }} 
        />
      </Box>

      {/* Task Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, 
        gap: 2, 
        mb: 3,
        maxHeight: 400,
        overflowY: 'auto'
      }}>
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <Card sx={{
              p: 2,
              background: isDark ? '#1a1a1a' : '#f8f9fa',
              border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              '&:hover': {
                borderColor: getStatusColor(task.status),
                boxShadow: `0 4px 12px ${getStatusColor(task.status)}20`,
                '& .task-actions': {
                  opacity: 1
                }
              }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: getStatusColor(task.status), fontSize: '1rem' }}>
                    {getStatusIcon(task.status)}
                  </Box>
                  <Chip 
                    label={task.status} 
                    size="small" 
                    onClick={() => {
                      const statuses = ['pending', 'in-progress', 'completed'];
                      const currentIndex = statuses.indexOf(task.status);
                      const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                      updateTaskStatus(task.id, nextStatus);
                    }}
                    sx={{ 
                      background: `${getStatusColor(task.status)}20`,
                      color: getStatusColor(task.status),
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 20,
                      cursor: 'pointer',
                      '&:hover': {
                        background: `${getStatusColor(task.status)}30`
                      }
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ 
                    width: 24, 
                    height: 24, 
                    background: isDark ? '#4a90e2' : '#1976d2',
                    fontSize: '0.7rem'
                  }}>
                    {task.assignee}
                  </Avatar>
                  <Box className="task-actions" sx={{ opacity: 0, transition: 'opacity 0.2s', display: 'flex', gap: 0.5 }}>
                    <Button 
                      size="small" 
                      onClick={() => deleteTask(task.id)}
                      sx={{ minWidth: 'auto', p: 0.5, color: '#ff6b6b' }}
                    >
                      <Delete sx={{ fontSize: '0.8rem' }} />
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Typography variant="subtitle2" sx={{ 
                fontWeight: 700, 
                color: isDark ? 'white' : 'black', 
                mb: 1,
                fontSize: '0.9rem'
              }}>
                {task.title}
              </Typography>

              <Typography variant="caption" sx={{ 
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', 
                mb: 2,
                display: 'block',
                lineHeight: 1.4
              }}>
                {task.description}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ 
                  color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                  fontSize: '0.7rem'
                }}>
                  Due: {task.due}
                </Typography>
                <Chip 
                  label={task.priority} 
                  size="small" 
                  color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}
                  sx={{ fontSize: '0.65rem', height: 18 }}
                />
              </Box>

              {task.status !== 'completed' && task.progress > 0 && (
                <LinearProgress 
                  variant="determinate" 
                  value={task.progress} 
                  sx={{ 
                    mt: 1,
                    height: 4, 
                    borderRadius: 2,
                    background: isDark ? '#333' : '#e0e0e0'
                  }} 
                />
              )}
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: 'linear-gradient(45deg, #4a90e2, #4ecdc4)',
            '&:hover': {
              background: 'linear-gradient(45deg, #357abd, #26a69a)'
            },
            borderRadius: 2,
            px: 3
          }}
        >
          Add Task
        </Button>
        <Button
          variant="outlined"
          startIcon={<Visibility />}
          sx={{
            borderColor: isDark ? '#4a90e2' : '#1976d2',
            color: isDark ? '#4a90e2' : '#1976d2',
            borderRadius: 2,
            px: 3,
            '&:hover': {
              borderColor: isDark ? '#357abd' : '#1565c0',
              background: isDark ? 'rgba(74,144,226,0.1)' : 'rgba(25,118,210,0.05)'
            }
          }}
        >
          View All
        </Button>
      </Box>

      {/* Add Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: isDark ? 'white' : 'black', background: isDark ? '#2a2a2a' : '#ffffff' }}>
          Add New Task
        </DialogTitle>
        <DialogContent sx={{ background: isDark ? '#2a2a2a' : '#ffffff' }}>
          <TextField
            fullWidth
            label="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            margin="normal"
            sx={{
              '& .MuiInputLabel-root': { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' },
              '& .MuiOutlinedInput-root': {
                color: isDark ? 'white' : 'black',
                '& fieldset': { borderColor: isDark ? '#333' : '#e0e0e0' }
              }
            }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            margin="normal"
            multiline
            rows={3}
            sx={{
              '& .MuiInputLabel-root': { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' },
              '& .MuiOutlinedInput-root': {
                color: isDark ? 'white' : 'black',
                '& fieldset': { borderColor: isDark ? '#333' : '#e0e0e0' }
              }
            }}
          />
          <FormControl fullWidth margin="normal">
            <Select
              value={newTask.priority}
              onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
              sx={{
                color: isDark ? 'white' : 'black',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: isDark ? '#333' : '#e0e0e0' }
              }}
            >
              <MenuItem value="low">Low Priority</MenuItem>
              <MenuItem value="medium">Medium Priority</MenuItem>
              <MenuItem value="high">High Priority</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={newTask.due}
            onChange={(e) => setNewTask(prev => ({ ...prev, due: e.target.value }))}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiInputLabel-root': { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' },
              '& .MuiOutlinedInput-root': {
                color: isDark ? 'white' : 'black',
                '& fieldset': { borderColor: isDark ? '#333' : '#e0e0e0' }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ background: isDark ? '#2a2a2a' : '#ffffff' }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
            Cancel
          </Button>
          <Button onClick={addTask} variant="contained" sx={{ background: '#4a90e2' }}>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TaskSection;