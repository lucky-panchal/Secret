'use client';
import { Chip } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const SkillChip = ({ label, selected = false, onToggle, variant = 'default' }) => {
  const { isDark } = useTheme();
  
  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Chip
            label={label}
            onClick={onToggle}
            deleteIcon={selected ? <Close /> : <Add />}
            onDelete={variant === 'removable' ? onToggle : undefined}
            sx={{
              background: selected 
                ? 'var(--accent)'
                : 'var(--surface)',
              color: selected ? '#000' : 'var(--text-primary)',
              border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                background: selected
                  ? 'var(--accent)'
                  : 'var(--primary)',
                color: selected ? '#000' : 'white',
                transform: 'scale(1.02)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              },
              '& .MuiChip-deleteIcon': {
                color: selected ? '#000' : 'var(--text-primary)',
                '&:hover': {
                  color: selected ? '#000' : 'white',
                }
              },
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SkillChip;