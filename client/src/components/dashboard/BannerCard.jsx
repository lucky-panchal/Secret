'use client';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { PlayArrow, TrendingUp } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const BannerCard = ({ onNavigate }) => {
  const { isDark } = useTheme();

  const handleStartLearning = () => {
    if (onNavigate) {
      onNavigate('courses');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 50%, #FBBF24 100%)',
          boxShadow: '0 0 40px rgba(0, 245, 255, 0.3), 0 0 80px rgba(168, 85, 247, 0.2)',
          borderRadius: 4,
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.2, color: '#ffffff' }}>
                Sharpen Your Skills with Professional Online Courses
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.95, maxWidth: '70%', color: '#ffffff' }}>
                Access premium courses designed by industry experts to accelerate your career growth and stay ahead in the competitive market.
              </Typography>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={handleStartLearning}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 0 25px rgba(255,255,255,0.4)',
                  },
                }}
              >
                Start Learning
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUp sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffffff' }}>
                +24% Growth
              </Typography>
            </Box>
          </Box>
        </CardContent>
        
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
            zIndex: 1,
          }}
        />
      </Card>
    </motion.div>
  );
};

export default BannerCard;