'use client';
import { IconButton, Box } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: 'relative',
            width: 48,
            height: 48,
            background: 'var(--gradient-secondary)',
            backdropFilter: 'blur(15px)',
            border: '2px solid var(--border)',
            borderRadius: '50%',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'var(--gradient-primary)',
              boxShadow: '0 0 25px var(--accent)',
              borderColor: 'var(--accent)',
              transform: 'scale(1.02)',
            },
          }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="light"
                initial={{ rotate: -360, opacity: 0, scale: 0.3 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 360, opacity: 0, scale: 0.3 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeInOut",
                  rotate: { type: "spring", stiffness: 200, damping: 20 }
                }}
              >
                <LightMode sx={{ 
                  color: 'var(--accent)',
                  fontSize: '1.5rem',
                  filter: 'drop-shadow(0 0 12px var(--accent))',
                }} />
              </motion.div>
            ) : (
              <motion.div
                key="dark"
                initial={{ rotate: 360, opacity: 0, scale: 0.3 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -360, opacity: 0, scale: 0.3 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeInOut",
                  rotate: { type: "spring", stiffness: 200, damping: 20 }
                }}
              >
                <DarkMode sx={{ 
                  color: 'var(--primary)',
                  fontSize: '1.5rem',
                  filter: 'drop-shadow(0 0 12px var(--primary))',
                }} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Animated orbital particles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                width: '4px',
                height: '4px',
                background: 'var(--secondary)',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 8px var(--secondary)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '10%',
                right: '20%',
                width: '3px',
                height: '3px',
                background: 'var(--accent)',
                borderRadius: '50%',
                boxShadow: '0 0 6px var(--accent)',
              }}
            />
          </motion.div>
          
          {/* Pulsing background effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              opacity: 0.2,
            }}
          />
        </IconButton>
      </motion.div>
    </div>
  );
};

export default ThemeToggle;