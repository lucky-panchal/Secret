'use client';
import { Box, Grid, Card, CardContent, Typography, Chip, Button, LinearProgress, Checkbox, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import { Assignment, CheckCircle, Schedule, Flag, Person, Add, Edit, Delete, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const TasksPage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [tasks, setTasks] = useState([
    // Initial tasks data
    {
      id: 1,
      title: 'Complete React Advanced Patterns Module',
      description: 'Finish the advanced React patterns course and submit the final project',
      priority: 'High',
      dueDate: '2024-01-20',
      progress: 75,
      completed: false,
      category: 'Learning',
      assignedBy: 'AI Tutor'
    },
    {
      id: 2,
      title: 'Submit Blockchain Certificate Assessment',
      description: 'Complete the final assessment for blockchain development certification',
      priority: 'Medium',
      dueDate: '2024-01-25',
      progress: 45,
      completed: false,
      category: 'Assessment',
      assignedBy: 'Course Instructor'
    },
    {
      id: 3,
      title: 'Update LinkedIn Profile with New Skills',
      description: 'Add recently acquired AI and blockchain skills to professional profile',
      priority: 'Low',
      dueDate: '2024-01-30',
      progress: 0,
      completed: false,
      category: 'Career',
      assignedBy: 'Career Advisor'
    },
    {
      id: 4,
      title: 'Peer Review: Help 3 Students',
      description: 'Provide constructive feedback on peer projects to earn mentorship tokens',
      priority: 'Medium',
      dueDate: '2024-01-22',
      progress: 100,
      completed: true,
      category: 'Community',
      assignedBy: 'Platform'
    }
  ]);

  // Modal and form states
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    category: 'Learning',
    assignedBy: 'Self'
  });

  const handleTaskToggle = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed, progress: task.completed ? 75 : 100 } : task
    ));
  };

  // CRUD Functions
  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        category: task.category,
        assignedBy: task.assignedBy
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        category: 'Learning',
        assignedBy: 'Self'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTask(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveTask = () => {
    if (!formData.title.trim()) {
      alert('Task title is required!');
      return;
    }

    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...formData }
          : task
      ));
    } else {
      // Add new task
      const newTask = {
        id: Math.max(...tasks.map(t => t.id)) + 1,
        ...formData,
        progress: 0,
        completed: false
      };
      setTasks([...tasks, newTask]);
    }
    handleCloseDialog();
  };

  const handleDeleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#FBBF24';
      case 'Low': return '#34D399';
      default: return '#94A3B8';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Learning': return '#00F5FF';
      case 'Assessment': return '#A855F7';
      case 'Career': return '#FBBF24';
      case 'Community': return '#34D399';
      default: return '#94A3B8';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Box sx={{ p: 3, maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8FAFC', mb: 1 }}>
            Tasks & Assignments
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            Stay on track with your learning goals and career milestones.
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          {/* Progress Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                    Overall Progress
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#00F5FF' }}>
                    {completionRate}%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={completionRate} sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(15, 15, 35, 0.6)', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #00F5FF 0%, #A855F7 100%)', borderRadius: 4 } }} />
                <Typography variant="body2" sx={{ color: '#94A3B8', mt: 1 }}>
                  {completedTasks} of {totalTasks} tasks completed
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tasks List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Grid container spacing={2}>
              {tasks.map((task, index) => (
                <Grid item xs={12} key={task.id}>
                  <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${task.completed ? 'rgba(52, 211, 153, 0.3)' : 'rgba(0, 245, 255, 0.2)'}`, borderRadius: 3, opacity: task.completed ? 0.8 : 1 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Checkbox checked={task.completed} onChange={() => handleTaskToggle(task.id)} sx={{ color: '#00F5FF', '&.Mui-checked': { color: '#34D399' } }} />
                        
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', textDecoration: task.completed ? 'line-through' : 'none' }}>
                              {task.title}
                            </Typography>
                            <Chip label={task.priority} size="small" sx={{ bgcolor: `${getPriorityColor(task.priority)}20`, color: getPriorityColor(task.priority), border: `1px solid ${getPriorityColor(task.priority)}40` }} />
                          </Box>
                          
                          <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                            {task.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Schedule sx={{ fontSize: 16, color: '#94A3B8' }} />
                              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                Due: {task.dueDate}
                              </Typography>
                            </Box>
                            <Chip label={task.category} size="small" sx={{ bgcolor: `${getCategoryColor(task.category)}20`, color: getCategoryColor(task.category) }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Person sx={{ fontSize: 16, color: '#94A3B8' }} />
                              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                {task.assignedBy}
                              </Typography>
                            </Box>
                          </Box>
                          
                          {!task.completed && (
                            <Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" sx={{ color: '#94A3B8' }}>Progress</Typography>
                                <Typography variant="caption" sx={{ color: '#00F5FF' }}>{task.progress}%</Typography>
                              </Box>
                              <LinearProgress variant="determinate" value={task.progress} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(15, 15, 35, 0.6)', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #00F5FF 0%, #A855F7 100%)', borderRadius: 3 } }} />
                            </Box>
                          )}
                        </Box>
                        
                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog(task)}
                            sx={{ 
                              color: '#00F5FF', 
                              bgcolor: 'rgba(0, 245, 255, 0.1)',
                              '&:hover': { bgcolor: 'rgba(0, 245, 255, 0.2)' }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteTask(task.id)}
                            sx={{ 
                              color: '#EF4444', 
                              bgcolor: 'rgba(239, 68, 68, 0.1)',
                              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} xl={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                    Task Statistics
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>High Priority</Typography>
                      <Typography variant="body2" sx={{ color: '#EF4444', fontWeight: 600 }}>
                        {tasks.filter(t => t.priority === 'High' && !t.completed).length}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>Due This Week</Typography>
                      <Typography variant="body2" sx={{ color: '#FBBF24', fontWeight: 600 }}>2</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>Completed Today</Typography>
                      <Typography variant="body2" sx={{ color: '#34D399', fontWeight: 600 }}>1</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      startIcon={<Add />} 
                      onClick={() => handleOpenDialog()}
                      sx={{ 
                        background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', 
                        textTransform: 'none', 
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                          transform: 'scale(1.02)'
                        }
                      }}
                    >
                      Create New Task
                    </Button>
                    <Button variant="outlined" fullWidth sx={{ borderColor: 'rgba(0, 245, 255, 0.3)', color: '#00F5FF', textTransform: 'none' }}>
                      View Calendar
                    </Button>
                    <Button variant="outlined" fullWidth sx={{ borderColor: 'rgba(168, 85, 247, 0.3)', color: '#A855F7', textTransform: 'none' }}>
                      Export Tasks
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Grid>
      </Grid>

      {/* Task Dialog Modal */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#F8FAFC', 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {editingTask ? 'Edit Task' : 'Create New Task'}
          <IconButton onClick={handleCloseDialog} sx={{ color: '#94A3B8' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Task Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#F8FAFC',
                  '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#00F5FF' }
                },
                '& .MuiInputLabel-root': { color: '#94A3B8' }
              }}
            />
            
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#F8FAFC',
                  '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#00F5FF' }
                },
                '& .MuiInputLabel-root': { color: '#94A3B8' }
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#94A3B8' }}>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  label="Priority"
                  sx={{
                    color: '#F8FAFC',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 245, 255, 0.3)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 245, 255, 0.5)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00F5FF' }
                  }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#94A3B8' }}>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  label="Category"
                  sx={{
                    color: '#F8FAFC',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 245, 255, 0.3)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 245, 255, 0.5)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00F5FF' }
                  }}
                >
                  <MenuItem value="Learning">Learning</MenuItem>
                  <MenuItem value="Assessment">Assessment</MenuItem>
                  <MenuItem value="Career">Career</MenuItem>
                  <MenuItem value="Community">Community</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <TextField
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#F8FAFC',
                  '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#00F5FF' }
                },
                '& .MuiInputLabel-root': { color: '#94A3B8' }
              }}
            />
            
            <TextField
              label="Assigned By"
              value={formData.assignedBy}
              onChange={(e) => handleInputChange('assignedBy', e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#F8FAFC',
                  '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#00F5FF' }
                },
                '& .MuiInputLabel-root': { color: '#94A3B8' }
              }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            sx={{ color: '#94A3B8', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveTask} 
            variant="contained"
            sx={{ 
              background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TasksPage;