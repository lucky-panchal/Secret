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
        {/* Elegant Geometric Background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #030303 0%, #0a0a0f 25%, #1a1a1f 50%, #0a0a0f 75%, #030303 100%)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.05) 0%, transparent 50%, rgba(244, 63, 94, 0.05) 100%)',
              filter: 'blur(48px)',
            }}
          />
          
          {/* Floating Geometric Shapes */}
          <motion.div
            initial={{ opacity: 0, y: -150, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 12 }}
            transition={{ duration: 2.4, delay: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
            style={{
              position: 'absolute',
              left: '-10%',
              top: '15%',
              width: 600,
              height: 140,
            }}
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(to right, rgba(99, 102, 241, 0.15), transparent)',
                backdropFilter: 'blur(2px)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.1)',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2), transparent 70%)',
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -150, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -15 }}
            transition={{ duration: 2.4, delay: 0.5, ease: [0.23, 0.86, 0.39, 0.96] }}
            style={{
              position: 'absolute',
              right: '-5%',
              top: '70%',
              width: 500,
              height: 120,
            }}
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(to right, rgba(244, 63, 94, 0.15), transparent)',
                backdropFilter: 'blur(2px)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px 0 rgba(37, 99, 235, 0.1)',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.2), transparent 70%)',
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -150, rotate: 7 }}
            animate={{ opacity: 1, y: 0, rotate: -8 }}
            transition={{ duration: 2.4, delay: 0.4, ease: [0.23, 0.86, 0.39, 0.96] }}
            style={{
              position: 'absolute',
              left: '5%',
              bottom: '5%',
              width: 300,
              height: 80,
            }}
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(to right, rgba(139, 92, 246, 0.15), transparent)',
                backdropFilter: 'blur(2px)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.1)',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2), transparent 70%)',
                }}
              />
            </motion.div>
          </motion.div>
        </Box>

        
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(3, 3, 3, 0.8) 0%, transparent 50%, #030303 100%)',
            pointerEvents: 'none',
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
                        onClick={() => window.location.href = '/register'}
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
                        onClick={() => window.location.href = '/demo'}
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
                        Demo
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right Column - Elegant Geometric Illustration */}
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
                  {/* Central Elegant Shape */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 2, delay: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
                    className="relative"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      style={{ width: 300, height: 300 }}
                      className="relative"
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          background: 'linear-gradient(90deg, rgba(30, 64, 175, 0.12) 0%, rgba(37, 99, 235, 0.12) 50%, rgba(59, 130, 246, 0.12) 100%)',
                          backdropFilter: 'blur(4px)',
                          border: '2px solid rgba(30, 64, 175, 0.25)',
                          boxShadow: '0 16px 64px 0 rgba(30, 64, 175, 0.08)',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.15), transparent 70%)',
                          },
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Floating Elements */}
                  {[
                    { icon: Psychology, label: 'AI', position: { top: '20%', left: '10%' }, color: '#1e40af' },
                    { icon: TrendingUp, label: 'BC', position: { top: '50%', right: '10%' }, color: '#2563eb' },
                    { icon: Rocket, label: 'ML', position: { bottom: '20%', left: '20%' }, color: '#3b82f6' },
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
                          width: { xs: 70, md: 90 },
                          height: { xs: 70, md: 90 },
                          borderRadius: 3,
                          background: 'rgba(30, 64, 175, 0.06)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(30, 64, 175, 0.15)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 32px rgba(30, 64, 175, 0.08), inset 0 1px 0 rgba(30, 64, 175, 0.08)',
                          gap: 1,
                          '&:hover': {
                            background: 'rgba(30, 64, 175, 0.1)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15), inset 0 1px 0 rgba(30, 64, 175, 0.15)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <item.icon sx={{ 
                          fontSize: { xs: 24, md: 30 }, 
                          color: item.color,
                          filter: 'drop-shadow(0 0 6px currentColor)',
                        }} />
                        <Typography
                          variant="caption"
                          sx={{ 
                            color: '#ffffff', 
                            fontWeight: 700,
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            textShadow: '0 0 8px rgba(255,255,255,0.4)',
                          }}
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