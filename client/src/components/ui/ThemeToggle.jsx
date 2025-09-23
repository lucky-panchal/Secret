'use client';
import { IconButton, Box } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
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
          background: isDark 
            ? 'linear-gradient(135deg, rgba(255,107,107,0.2), rgba(78,205,196,0.2))'
            : 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,107,107,0.2))',
          backdropFilter: 'blur(15px)',
          border: isDark 
            ? '2px solid rgba(255,215,0,0.3)' 
            : '2px solid rgba(44,24,16,0.3)',
          borderRadius: '50%',
          overflow: 'hidden',
          '&:hover': {
            background: isDark 
              ? 'linear-gradient(135deg, rgba(255,107,107,0.4), rgba(78,205,196,0.4))'
              : 'linear-gradient(135deg, rgba(255,215,0,0.4), rgba(255,107,107,0.4))',
            boxShadow: isDark 
              ? '0 0 25px rgba(255,215,0,0.5), 0 0 50px rgba(78,205,196,0.3)'
              : '0 0 25px rgba(255,107,107,0.5), 0 0 50px rgba(255,215,0,0.3)',
            borderColor: isDark ? 'rgba(255,215,0,0.6)' : 'rgba(255,107,107,0.6)',
          },
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                color: '#ffd700',
                fontSize: '1.5rem',
                filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.8))',
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
                color: '#2c1810',
                fontSize: '1.5rem',
                filter: 'drop-shadow(0 0 12px rgba(44,24,16,0.8))',
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
              background: isDark ? '#4ecdc4' : '#ff6b6b',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: `0 0 8px ${isDark ? '#4ecdc4' : '#ff6b6b'}`,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              right: '20%',
              width: '3px',
              height: '3px',
              background: isDark ? '#ffd700' : '#4ecdc4',
              borderRadius: '50%',
              boxShadow: `0 0 6px ${isDark ? '#ffd700' : '#4ecdc4'}`,
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
            background: isDark 
              ? 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,107,107,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      </IconButton>
    </motion.div>
  );
};

export default ThemeToggle;