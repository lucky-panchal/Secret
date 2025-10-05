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
          bgcolor: isDark ? '#1e1e1e' : '#ffffff',
          border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
          borderRadius: 3,
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.07)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ bgcolor: '#705CF6', width: 48, height: 48 }}>A</Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: isDark ? '#ffffff' : '#374151' }}>
                Good Morning, Anmol!
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}>
                Ready to continue learning?
              </Typography>
            </Box>
          </Box>

          {/* Progress */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? '#ffffff' : '#374151' }}>
                Course Progress
              </Typography>
              <Typography variant="body2" sx={{ color: '#705CF6', fontWeight: 600 }}>
                68%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={68}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: isDark ? '#333' : '#f3f4f6',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#705CF6',
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#705CF6' }}>
                12
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}>
                Courses
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                8
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}>
                Completed
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                4.8
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? '#b0b0b0' : '#6b7280' }}>
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