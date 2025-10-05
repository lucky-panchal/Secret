'use client';
import { Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ variant = 'card', height = 200, width = '100%' }) => {
  const pulseAnimation = {
    animate: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const wireframeLines = Array.from({ length: 3 }, (_, i) => (
    <motion.div
      key={i}
      initial={{ width: 0 }}
      animate={{ width: `${60 + i * 15}%` }}
      transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, repeatType: "reverse" }}
      style={{
        height: '8px',
        background: 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.4), transparent)',
        borderRadius: '4px',
        marginBottom: '12px'
      }}
    />
  ));

  if (variant === 'card') {
    return (
      <motion.div {...pulseAnimation}>
        <Box
          sx={{
            height,
            width,
            background: 'rgba(26, 26, 46, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
            borderRadius: 3,
            p: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.1), transparent)',
              animation: 'shimmer 2s infinite'
            },
            '@keyframes shimmer': {
              '0%': { left: '-100%' },
              '100%': { left: '100%' }
            }
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Skeleton
              variant="rectangular"
              width="40%"
              height={20}
              sx={{
                bgcolor: 'rgba(0, 245, 255, 0.1)',
                borderRadius: 1
              }}
            />
          </Box>
          {wireframeLines}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={32}
              sx={{
                bgcolor: 'rgba(168, 85, 247, 0.1)',
                borderRadius: 2
              }}
            />
            <Skeleton
              variant="rectangular"
              width={60}
              height={32}
              sx={{
                bgcolor: 'rgba(251, 191, 36, 0.1)',
                borderRadius: 2
              }}
            />
          </Box>
        </Box>
      </motion.div>
    );
  }

  if (variant === 'stats') {
    return (
      <motion.div {...pulseAnimation}>
        <Box
          sx={{
            height,
            width,
            background: 'rgba(26, 26, 46, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: 3,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Skeleton
            variant="circular"
            width={60}
            height={60}
            sx={{
              bgcolor: 'rgba(168, 85, 247, 0.2)',
              mb: 2
            }}
          />
          <Skeleton
            variant="rectangular"
            width="80%"
            height={16}
            sx={{
              bgcolor: 'rgba(0, 245, 255, 0.1)',
              borderRadius: 1,
              mb: 1
            }}
          />
          <Skeleton
            variant="rectangular"
            width="60%"
            height={12}
            sx={{
              bgcolor: 'rgba(251, 191, 36, 0.1)',
              borderRadius: 1
            }}
          />
        </Box>
      </motion.div>
    );
  }

  return (
    <motion.div {...pulseAnimation}>
      <Skeleton
        variant="rectangular"
        width={width}
        height={height}
        sx={{
          bgcolor: 'rgba(26, 26, 46, 0.8)',
          borderRadius: 3,
          border: '1px solid rgba(0, 245, 255, 0.2)'
        }}
      />
    </motion.div>
  );
};

export default SkeletonLoader;