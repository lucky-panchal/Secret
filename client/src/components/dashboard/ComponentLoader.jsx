'use client';
import { Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

const ComponentLoader = ({ children, loading = false }) => {
  const shimmerAnimation = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  };

  if (!loading) return children;

  return (
    <motion.div {...shimmerAnimation}>
      <Box
        sx={{
          position: 'relative',
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 3,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.1), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear',
            zIndex: 1
          },
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '200% 0' },
            '100%': { backgroundPosition: '-200% 0' }
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, opacity: 0.3 }}>
          {children}
        </Box>
      </Box>
    </motion.div>
  );
};

export default ComponentLoader;