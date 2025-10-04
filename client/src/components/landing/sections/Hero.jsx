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
          background: 'linear-gradient(135deg, #FAFBFF 0%, #F0F8FF 25%, #E6F3FF 50%, #F5FAFF 75%, #FAFBFF 100%)',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 8 },
        }}
      >
        {/* Elegant Geometric Background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: isDark ? 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 25%, #16213E 50%, #1A1A2E 75%, #0A0A0F 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: isDark ? 'linear-gradient(to bottom right, rgba(0, 245, 255, 0.08) 0%, transparent 50%, rgba(251, 191, 36, 0.08) 100%)' : 'linear-gradient(to bottom right, rgba(25, 118, 210, 0.05) 0%, transparent 50%, rgba(33, 150, 243, 0.05) 100%)',
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
                background: isDark ? 'linear-gradient(to right, rgba(0, 245, 255, 0.2), transparent)' : 'linear-gradient(to right, rgba(25, 118, 210, 0.1), transparent)',
                backdropFilter: 'blur(2px)',
                border: isDark ? '2px solid rgba(0, 245, 255, 0.3)' : '2px solid rgba(25, 118, 210, 0.2)',
                boxShadow: isDark ? '0 8px 32px 0 rgba(0, 245, 255, 0.2)' : '0 8px 32px 0 rgba(25, 118, 210, 0.1)',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: isDark ? 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.3), transparent 70%)' : 'radial-gradient(circle at 50% 50%, rgba(25, 118, 210, 0.2), transparent 70%)',
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
                background: isDark ? 'linear-gradient(to right, rgba(168, 85, 247, 0.2), transparent)' : 'linear-gradient(to right, rgba(33, 150, 243, 0.1), transparent)',
                backdropFilter: 'blur(2px)',
                border: isDark ? '2px solid rgba(168, 85, 247, 0.3)' : '2px solid rgba(33, 150, 243, 0.2)',
                boxShadow: isDark ? '0 8px 32px 0 rgba(168, 85, 247, 0.2)' : '0 8px 32px 0 rgba(33, 150, 243, 0.1)',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: isDark ? 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), transparent 70%)' : 'radial-gradient(circle at 50% 50%, rgba(33, 150, 243, 0.2), transparent 70%)',
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
                background: isDark ? 'linear-gradient(to right, rgba(251, 191, 36, 0.2), transparent)' : 'linear-gradient(to right, rgba(3, 169, 244, 0.1), transparent)',
                backdropFilter: 'blur(2px)',
                border: isDark ? '2px solid rgba(251, 191, 36, 0.3)' : '2px solid rgba(3, 169, 244, 0.2)',
                boxShadow: isDark ? '0 8px 32px 0 rgba(251, 191, 36, 0.2)' : '0 8px 32px 0 rgba(3, 169, 244, 0.1)',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: isDark ? 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3), transparent 70%)' : 'radial-gradient(circle at 50% 50%, rgba(3, 169, 244, 0.2), transparent 70%)',
                }}
              />
            </motion.div>
          </motion.div>
        </Box>

        
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: isDark ? 'linear-gradient(180deg, rgba(3, 3, 3, 0.8) 0%, transparent 50%, #030303 100%)' : 'linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, transparent 50%, rgba(248, 250, 252, 0.9) 100%)',
            pointerEvents: 'none',
          }}
        />


        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" justifyContent="center">
            {/* Left Column - Content */}
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: isDark ? '#ffffff' : '#2D3748',
                      mb: { xs: 2, md: 3 },
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                      lineHeight: 1.2,
                    }}
                  >
                    Future-Proof Your{' '}
                    <Box
                      component="span"
                      sx={{
                        background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #03a9f4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'inline-block',
                      }}
                    >
                      Career
                    </Box>
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: isDark ? '#e2e8f0' : '#4A5568',
                      mb: { xs: 3, md: 4 },
                      maxWidth: { xs: '100%', md: '500px' },
                      lineHeight: 1.6,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      mx: { xs: 'auto', md: 0 },
                    }}
                  >
                    Join the world's first AI-driven reskilling platform. Transform from vulnerable to future-proof with personalized learning paths, blockchain certifications, and guaranteed job placement.
                  </Typography>
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: { xs: 2, md: 3 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                    }}
                  >
                    <Box>
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
                    </Box>

                    <Box>
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
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Elegant Geometric Illustration */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: { xs: 300, md: 450 },
                    width: '100%',
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
                      style={{ width: 280, height: 280 }}
                      className="relative"
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          background: isDark ? 'linear-gradient(90deg, rgba(0, 245, 255, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(251, 191, 36, 0.15) 100%)' : 'linear-gradient(90deg, rgba(25, 118, 210, 0.1) 0%, rgba(33, 150, 243, 0.1) 50%, rgba(3, 169, 244, 0.1) 100%)',
                          backdropFilter: 'blur(4px)',
                          border: isDark ? '2px solid rgba(0, 245, 255, 0.3)' : '2px solid rgba(25, 118, 210, 0.2)',
                          boxShadow: isDark ? '0 16px 64px 0 rgba(0, 245, 255, 0.2)' : '0 16px 64px 0 rgba(25, 118, 210, 0.1)',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: isDark ? 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.2), transparent 70%)' : 'radial-gradient(circle at 50% 50%, rgba(25, 118, 210, 0.15), transparent 70%)',
                          },
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Floating Elements */}
                  {[
                    { icon: Psychology, label: 'AI', position: { top: '15%', left: '5%' }, color: '#1976d2' },
                    { icon: TrendingUp, label: 'BC', position: { top: '45%', right: '5%' }, color: '#2196f3' },
                    { icon: Rocket, label: 'ML', position: { bottom: '15%', left: '15%' }, color: '#03a9f4' },
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
                          width: { xs: 70, md: 80 },
                          height: { xs: 70, md: 80 },
                          borderRadius: 3,
                          background: isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: isDark ? '1px solid rgba(25, 118, 210, 0.2)' : '1px solid rgba(25, 118, 210, 0.3)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: isDark ? '0 4px 16px rgba(25, 118, 210, 0.15)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
                          gap: 1,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <item.icon sx={{ 
                          fontSize: { xs: 24, md: 28 }, 
                          color: item.color,
                        }} />
                        <Typography
                          variant="caption"
                          sx={{ 
                            color: isDark ? item.color : '#1976d2', 
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', md: '0.85rem' },
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        

      </Box>
    </div>
  );
};

export default Hero;