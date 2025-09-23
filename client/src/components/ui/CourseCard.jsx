'use client';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { PlayArrow, Schedule, Star } from '@mui/icons-material';

const CourseCard = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card
        sx={{
          background: 'rgba(26,26,26,0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3,
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 20px 60px rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="div"
            sx={{
              height: 200,
              background: 'linear-gradient(135deg, #333 0%, #666 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <PlayArrow sx={{ fontSize: 60, color: 'rgba(255,255,255,0.8)' }} />
            </motion.div>
          </CardMedia>
          <Chip
            label={course.level}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(255,255,255,0.9)',
              color: '#0a0a0a',
            }}
          />
        </Box>
        
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            {course.title}
          </Typography>
          
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
            {course.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption">{course.duration}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: '#ffd700' }} />
              <Typography variant="caption">{course.rating}</Typography>
            </Box>
          </Box>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                color: '#0a0a0a',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)',
                },
              }}
            >
              Enroll Now
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCard;