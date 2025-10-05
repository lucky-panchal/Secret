'use client';
import { Box, Modal, Card, CardContent, Typography, IconButton, Avatar, Button, Divider, Chip, LinearProgress } from '@mui/material';
import { Close, Person, Edit, Settings, Logout, VerifiedUser, School, Work, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ProfileModal = ({ open, onClose, onNavigate }) => {
  const { isDark } = useTheme();

  const userStats = {
    coursesCompleted: 8,
    totalCourses: 12,
    certificates: 4,
    skillsLearned: 15,
    studyStreak: 23,
    totalStudyHours: 156
  };

  const recentAchievements = [
    { name: 'React Expert', icon: '⚛️', date: '2024-01-15' },
    { name: 'Blockchain Pioneer', icon: '⛓️', date: '2024-01-10' },
    { name: 'AI Enthusiast', icon: '🤖', date: '2024-01-05' }
  ];

  const skillProgress = [
    { skill: 'React Development', progress: 85, color: '#00F5FF' },
    { skill: 'Blockchain', progress: 70, color: '#A855F7' },
    { skill: 'AI/ML', progress: 60, color: '#FBBF24' },
    { skill: 'Node.js', progress: 75, color: '#34D399' }
  ];

  const handleEditProfile = () => {
    onClose();
    if (onNavigate) {
      onNavigate('settings');
    }
  };

  const handleViewCertificates = () => {
    onClose();
    if (onNavigate) {
      onNavigate('certificates');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      console.log('User logged out');
      alert('Logged out successfully!');
    }
  };

  const completionRate = Math.round((userStats.coursesCompleted / userStats.totalCourses) * 100);

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={0} sx={{ 
          width: { xs: '90vw', sm: 450 }, 
          maxHeight: '85vh', 
          background: 'rgba(26, 26, 46, 0.95)', 
          backdropFilter: 'blur(20px)', 
          border: 'none', 
          borderRadius: 3,
          boxShadow: '0 0 40px rgba(0, 245, 255, 0.2)',
          overflow: 'auto'
        }}>
          <CardContent sx={{ p: 0 }}>
            {/* Header */}
            <Box sx={{ position: 'relative', background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', p: 3, borderRadius: '12px 12px 0 0' }}>
              <IconButton 
                onClick={onClose} 
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16, 
                  color: 'rgba(255,255,255,0.8)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Close />
              </IconButton>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
                <Avatar sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: '#ffffff', 
                  fontSize: '2rem', 
                  fontWeight: 700,
                  border: '3px solid rgba(255,255,255,0.3)',
                  mb: 2
                }}>
                  A
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff', mb: 0.5 }}>
                  Anmol Sinha
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip 
                    icon={<VerifiedUser />} 
                    label="Premium Member" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)', 
                      color: '#ffffff', 
                      fontWeight: 600,
                      '& .MuiChip-icon': { color: '#ffffff' }
                    }} 
                  />
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>
                  Full-stack developer passionate about AI and blockchain
                </Typography>
              </Box>
            </Box>

            {/* Stats */}
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 2 }}>
                Learning Progress
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                    Course Completion
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#00F5FF', fontWeight: 600 }}>
                    {completionRate}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={completionRate} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    bgcolor: 'rgba(15, 15, 35, 0.6)',
                    '& .MuiLinearProgress-bar': { 
                      background: 'linear-gradient(90deg, #00F5FF 0%, #A855F7 100%)', 
                      borderRadius: 4 
                    }
                  }} 
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#00F5FF' }}>
                    {userStats.coursesCompleted}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                    Completed
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#34D399' }}>
                    {userStats.certificates}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                    Certificates
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#FBBF24' }}>
                    {userStats.studyStreak}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                    Day Streak
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.2)', mb: 3 }} />

              {/* Skills */}
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 2 }}>
                Top Skills
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                {skillProgress.map((skill, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 500 }}>
                        {skill.skill}
                      </Typography>
                      <Typography variant="body2" sx={{ color: skill.color, fontWeight: 600 }}>
                        {skill.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.progress} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3, 
                        bgcolor: 'rgba(15, 15, 35, 0.6)',
                        '& .MuiLinearProgress-bar': { 
                          bgcolor: skill.color, 
                          borderRadius: 3 
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Box>

              <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.2)', mb: 3 }} />

              {/* Recent Achievements */}
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 2 }}>
                Recent Achievements
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                {recentAchievements.map((achievement, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: 2, bgcolor: 'rgba(15, 15, 35, 0.6)' }}>
                    <Typography variant="h6">{achievement.icon}</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                        {achievement.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        {achievement.date}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<Edit />}
                  onClick={handleEditProfile}
                  sx={{ 
                    background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', 
                    textTransform: 'none', 
                    fontWeight: 600 
                  }}
                >
                  Edit Profile
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<VerifiedUser />}
                  onClick={handleViewCertificates}
                  sx={{ 
                    borderColor: 'transparent', 
                    color: '#00F5FF', 
                    textTransform: 'none' 
                  }}
                >
                  View Certificates
                </Button>
                
                <Button 
                  variant="text" 
                  fullWidth 
                  startIcon={<Settings />}
                  onClick={() => { onClose(); onNavigate && onNavigate('settings'); }}
                  sx={{ 
                    color: '#94A3B8', 
                    textTransform: 'none' 
                  }}
                >
                  Account Settings
                </Button>
                
                <Divider sx={{ borderColor: 'rgba(239, 68, 68, 0.2)', my: 1 }} />
                
                <Button 
                  variant="text" 
                  fullWidth 
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  sx={{ 
                    color: '#EF4444', 
                    textTransform: 'none' 
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Modal>
  );
};

export default ProfileModal;