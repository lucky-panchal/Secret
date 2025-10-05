'use client';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const { isDark } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={hoverVariants}>
          <Card
            sx={{
              height: '100%',
              minHeight: { xs: 280, md: 320 },
              background: isDark ? 'var(--surface)' : '#ffffff',
              border: isDark ? '1px solid var(--border)' : '1px solid #e2e8f0',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                borderColor: isDark ? 'var(--primary)' : '#1976d2',
              },
            }}
          >
            <CardContent
              sx={{
                p: { xs: 3, md: 4 },
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    borderRadius: '50%',
                    background: isDark ? 'var(--gradient-primary)' : 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: { xs: 2, md: 3 },
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: { xs: 28, md: 36 },
                      color: 'white',
                    }}
                  />
                </Box>
              </motion.div>

              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  color: isDark ? 'var(--text-primary)' : '#2d3748',
                  fontWeight: 600,
                  mb: { xs: 1.5, md: 2 },
                  textAlign: 'center',
                }}
              >
                {title}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: isDark ? 'var(--text-secondary)' : '#4a5568',
                  lineHeight: 1.6,
                  textAlign: 'center',
                  maxWidth: '280px',
                }}
              >
                {description}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeatureCard;