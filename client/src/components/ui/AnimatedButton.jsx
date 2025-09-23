'use client';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const AnimatedButton = ({ 
  children, 
  variant = 'contained', 
  color = 'primary',
  glowColor,
  ...props 
}) => {
  const { isDark } = useTheme();
  const defaultGlow = glowColor || 'rgba(0,0,0,0.15)';
  
  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Button
          variant={variant}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            transition: 'all 0.3s ease-in-out',
            minHeight: '44px',
            '&:hover': {
              boxShadow: `0 8px 25px ${defaultGlow}`,
              transform: 'translateY(-2px)',
              '&::before': {
                opacity: 1,
              },
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'all 0.5s ease',
              opacity: 0,
            },
            '&:hover::before': {
              left: '100%',
              opacity: 1,
            },
          }}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    </div>
  );
};

export default AnimatedButton;