'use client';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { PlayArrow, Rocket, Psychology, TrendingUp } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box
        id="home"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--background)',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 12 },
          pb: { xs: 4, md: 8 },
        }}
      >
        {/* Background Gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--gradient-primary)',
            opacity: 0.05,
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            {/* Left Column - Content */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h1"
                    sx={{
                      color: 'var(--text-primary)',
                      mb: { xs: 2, md: 3 },
                      fontWeight: 800,
                    }}
                  >
                    Future-Proof Your{' '}
                    <Box
                      component="span"
                      sx={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Career
                    </Box>
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'var(--text-secondary)',
                      mb: { xs: 3, md: 4 },
                      maxWidth: '600px',
                      lineHeight: 1.6,
                    }}
                  >
                    Join the world's first AI-driven reskilling platform. Transform from vulnerable to future-proof with personalized learning paths, blockchain certifications, and guaranteed job placement.
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: { xs: 2, md: 3 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'stretch', sm: 'center' },
                    }}
                  >
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Rocket />}
                        sx={{
                          background: 'var(--gradient-primary)',
                          color: 'white',
                          px: { xs: 3, md: 4 },
                          py: { xs: 1.5, md: 2 },
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 600,
                          minHeight: { xs: 48, md: 56 },
                          '&:hover': {
                            background: 'var(--primary)',
                          },
                        }}
                      >
                        Get Started
                      </Button>
                    </motion.div>

                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<PlayArrow />}
                        sx={{
                          borderColor: 'var(--border)',
                          color: 'var(--text-primary)',
                          px: { xs: 3, md: 4 },
                          py: { xs: 1.5, md: 2 },
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 600,
                          minHeight: { xs: 48, md: 56 },
                          '&:hover': {
                            borderColor: 'var(--primary)',
                            color: 'var(--primary)',
                            background: 'rgba(0,0,0,0.05)',
                          },
                        }}
                      >
                        Watch Demo
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right Column - Illustration */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: { xs: 300, md: 500 },
                    position: 'relative',
                  }}
                >
                  {/* Central Illustration */}
                  <Box
                    sx={{
                      width: { xs: 250, md: 400 },
                      height: { xs: 250, md: 400 },
                      borderRadius: '50%',
                      background: 'var(--gradient-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        right: -20,
                        bottom: -20,
                        borderRadius: '50%',
                        background: 'var(--gradient-primary)',
                        opacity: 0.1,
                        animation: 'pulse 2s infinite',
                      },
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)', opacity: 0.1 },
                        '50%': { transform: 'scale(1.05)', opacity: 0.2 },
                        '100%': { transform: 'scale(1)', opacity: 0.1 },
                      },
                    }}
                  >
                    <Rocket
                      sx={{
                        fontSize: { xs: 80, md: 120 },
                        color: 'white',
                      }}
                    />
                  </Box>

                  {/* Floating Elements */}
                  {[
                    { icon: Psychology, label: 'AI', position: { top: '20%', left: '10%' } },
                    { icon: TrendingUp, label: 'BC', position: { top: '50%', right: '10%' } },
                    { icon: Rocket, label: 'ML', position: { bottom: '20%', left: '20%' } },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: index * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        position: 'absolute',
                        ...item.position,
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 60, md: 80 },
                          height: { xs: 60, md: 80 },
                          borderRadius: 2,
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          gap: 1,
                        }}
                      >
                        <item.icon sx={{ fontSize: { xs: 20, md: 24 }, color: 'var(--primary)' }} />
                        <Typography
                          variant="caption"
                          sx={{ color: 'var(--text-primary)', fontWeight: 600 }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Hero;