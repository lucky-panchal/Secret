'use client';
import { Grid, Card, Typography, Avatar, Chip, Button, Box } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import DashboardLayout from '@/components/layout/DashboardLayout';

const TeamPage = () => {
  const { isDark } = useTheme();

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Frontend Developer', avatar: 'SJ', status: 'active', tasks: 5, email: 'sarah@company.com', phone: '+1 234 567 8901' },
    { name: 'Mike Chen', role: 'Backend Developer', avatar: 'MC', status: 'busy', tasks: 3, email: 'mike@company.com', phone: '+1 234 567 8902' },
    { name: 'Lisa Wang', role: 'UI/UX Designer', avatar: 'LW', status: 'active', tasks: 7, email: 'lisa@company.com', phone: '+1 234 567 8903' },
    { name: 'David Kim', role: 'DevOps Engineer', avatar: 'DK', status: 'offline', tasks: 2, email: 'david@company.com', phone: '+1 234 567 8904' },
    { name: 'Emma Wilson', role: 'Product Manager', avatar: 'EW', status: 'active', tasks: 4, email: 'emma@company.com', phone: '+1 234 567 8905' },
    { name: 'Alex Rodriguez', role: 'QA Engineer', avatar: 'AR', status: 'busy', tasks: 6, email: 'alex@company.com', phone: '+1 234 567 8906' }
  ];

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: isDark ? 'white' : '#1a1a1a' }}>
        Team
      </Typography>

      <Grid container spacing={3}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card sx={{
                p: 3,
                background: isDark ? '#2a2a2a' : '#ffffff',
                border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 2,
                textAlign: 'center',
                height: '100%'
              }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  <Avatar sx={{ 
                    width: 80, 
                    height: 80, 
                    background: isDark ? '#4a90e2' : '#1976d2',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    {member.avatar}
                  </Avatar>
                  <Box sx={{
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: member.status === 'active' ? '#4ecdc4' : member.status === 'busy' ? '#ffd700' : '#999',
                    border: `3px solid ${isDark ? '#2a2a2a' : '#ffffff'}`
                  }} />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: isDark ? 'white' : 'black' }}>
                  {member.name}
                </Typography>
                
                <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', mb: 2 }}>
                  {member.role}
                </Typography>

                <Chip 
                  label={`${member.tasks} active tasks`} 
                  size="small" 
                  sx={{ 
                    mb: 3,
                    background: isDark ? 'rgba(74,144,226,0.2)' : 'rgba(25,118,210,0.1)',
                    color: isDark ? '#4a90e2' : '#1976d2'
                  }}
                />

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
                  <Button
                    size="small"
                    startIcon={<Email />}
                    sx={{ 
                      minWidth: 'auto',
                      color: isDark ? '#4a90e2' : '#1976d2'
                    }}
                  />
                  <Button
                    size="small"
                    startIcon={<Phone />}
                    sx={{ 
                      minWidth: 'auto',
                      color: isDark ? '#4a90e2' : '#1976d2'
                    }}
                  />
                </Box>

                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    borderRadius: 2,
                    borderColor: isDark ? '#4a90e2' : '#1976d2',
                    color: isDark ? '#4a90e2' : '#1976d2'
                  }}
                >
                  View Profile
                </Button>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
};

export default TeamPage;