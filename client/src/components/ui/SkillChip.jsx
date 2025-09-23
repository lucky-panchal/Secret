'use client';
import { Chip } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const SkillChip = ({ label, selected = false, onToggle, variant = 'default' }) => {
  return (
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
              ? 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)'
              : 'rgba(255,255,255,0.1)',
            color: selected ? '#0a0a0a' : '#ffffff',
            border: `1px solid ${selected ? 'transparent' : 'rgba(255,255,255,0.3)'}`,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: selected
                ? 'linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)'
                : 'rgba(255,255,255,0.2)',
              boxShadow: selected
                ? '0 8px 25px rgba(255,255,255,0.2)'
                : '0 8px 25px rgba(255,255,255,0.1)',
            },
            '& .MuiChip-deleteIcon': {
              color: selected ? '#0a0a0a' : '#ffffff',
            },
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillChip;