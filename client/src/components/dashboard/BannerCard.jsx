'use client';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { PlayArrow, TrendingUp } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const BannerCard = () => {
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
          background: isDark 
            ? 'linear-gradient(135deg, #705CF6 0%, #8B5CF6 100%)'
            : 'linear-gradient(135deg, #705CF6 0%, #8B5CF6 100%)',
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
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
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