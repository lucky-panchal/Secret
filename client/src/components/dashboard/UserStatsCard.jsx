'use client';
import { Card, CardContent, Box, Typography, Avatar, LinearProgress } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const UserStatsCard = () => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        elevation={0}
        sx={{
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(0, 245, 255, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', 
              width: 48, 
              height: 48,
              border: '2px solid rgba(0, 245, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)'
            }}>A</Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                Good Morning, Anmol!
              </Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                Ready to continue learning?
              </Typography>
            </Box>
          </Box>

          {/* Progress */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                Course Progress
              </Typography>
              <Typography variant="body2" sx={{ color: '#00F5FF', fontWeight: 600 }}>
                68%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={68}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(15, 15, 35, 0.6)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #00F5FF 0%, #A855F7 100%)',
                  borderRadius: 4,
                  boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
                },
              }}
            />
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#00F5FF' }}>
                12
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Courses
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#34D399' }}>
                8
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Completed
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FBBF24' }}>
                4.8
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Rating
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserStatsCard;