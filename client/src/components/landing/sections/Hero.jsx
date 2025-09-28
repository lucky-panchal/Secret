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
                        onClick={() => {
                          const element = document.getElementById('contact');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
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
                  {/* Advanced 3D Sphere */}
                  <Box
                    sx={{
                      width: { xs: 250, md: 400 },
                      height: { xs: 250, md: 400 },
                      borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, #1e3a8a, #1e40af, #1d4ed8, #0f172a, #1e3a8a)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'inset -40px -40px 80px rgba(0,0,0,0.6), inset 40px 40px 80px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.3)',

                    }}
                  >
                    {/* Stylized Moon */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '15%',
                        right: '15%',
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ffd700, #ffeb3b, #fff176)',
                        boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), inset -10px -10px 20px rgba(0,0,0,0.2)',
                        animation: 'moonPulse 3s infinite ease-in-out',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '20%',
                          left: '30%',
                          width: '15px',
                          height: '15px',
                          borderRadius: '50%',
                          background: 'rgba(0,0,0,0.1)',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: '30%',
                          right: '25%',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: 'rgba(0,0,0,0.1)',
                        },
                        '@keyframes moonPulse': {
                          '0%, 100%': { transform: 'scale(1) rotate(0deg)', boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' },
                          '50%': { transform: 'scale(1.2) rotate(10deg)', boxShadow: '0 0 50px rgba(255, 215, 0, 1)' },
                        },
                      }}
                    />
                    
                    {/* Large Rocket Launch */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '5%',
                        left: '15%',
                        fontSize: { xs: '4rem', md: '6rem' },
                        animation: 'realisticLaunch 6s infinite',
                        '@keyframes realisticLaunch': {
                          '0%': { 
                            transform: 'translateY(0px) rotate(0deg) scale(1)',
                            opacity: 1,
                            filter: 'drop-shadow(0 0 0px orange)'
                          },
                          '10%': {
                            transform: 'translateY(-20px) rotate(5deg) scale(1.1)',
                            filter: 'drop-shadow(0 5px 15px orange)'
                          },
                          '30%': { 
                            transform: 'translateY(-100px) translateX(30px) rotate(15deg) scale(1.2)',
                            opacity: 1,
                            filter: 'drop-shadow(0 10px 25px red)'
                          },
                          '60%': { 
                            transform: 'translateY(-250px) translateX(80px) rotate(25deg) scale(0.8)',
                            opacity: 0.8,
                            filter: 'drop-shadow(0 15px 35px blue)'
                          },
                          '100%': { 
                            transform: 'translateY(-400px) translateX(150px) rotate(35deg) scale(0.3)',
                            opacity: 0
                          },
                        },
                      }}
                    >
                      🚀
                    </Box>
                    
                    {/* Stylized Stars */}
                    {[...Array(6)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          position: 'absolute',
                          left: `${25 + (i * 12)}%`,
                          top: `${20 + (i * 10)}%`,
                          width: { xs: 8, md: 12 },
                          height: { xs: 8, md: 12 },
                          background: 'linear-gradient(45deg, #ffffff, #e3f2fd, #bbdefb)',
                          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                          animation: `starPop${i} ${2 + (i * 0.4)}s infinite ease-in-out`,
                          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
                          [`@keyframes starPop${i}`]: {
                            '0%, 100%': { 
                              transform: 'scale(1) rotate(0deg)', 
                              opacity: 0.6,
                              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))'
                            },
                            '50%': { 
                              transform: 'scale(1.5) rotate(180deg)', 
                              opacity: 1,
                              filter: 'drop-shadow(0 0 15px rgba(255,255,255,1))'
                            },
                          },
                        }}
                      />
                    ))}

                  </Box>

                  {/* Circular Text Outside */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: { xs: 350, md: 550 },
                      height: { xs: 350, md: 550 },
                      pointerEvents: 'none',
                    }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 550 550" style={{ animation: 'svgRotate 12s infinite linear' }}>
                      <defs>
                        <path
                          id="outerCircle"
                          d="M 275,275 m -250,0 a 250,250 0 1,1 500,0 a 250,250 0 1,1 -500,0"
                        />
                      </defs>
                      <text
                        fontSize="24"
                        fontFamily="'Roboto', 'Arial', sans-serif"
                        fontWeight="600"
                        fill={isDark ? '#00f5ff' : 'var(--primary)'}
                        style={{
                          animation: 'animeRotate 8s infinite linear',
                        }}
                      >
                        <textPath href="#outerCircle" startOffset="0%">
                          ✨ START YOUR JOURNEY TODAY WITH CAREER AI ✨ LAUNCH YOUR CAREER LIKE ROCKET LAUNCH ✨
                        </textPath>
                      </text>
                      <style>
                        {`
                          @keyframes animeRotate {
                            0% { transform-origin: 275px 275px; transform: rotate(0deg); }
                            100% { transform-origin: 275px 275px; transform: rotate(360deg); }
                          }

                        `}
                      </style>
                    </svg>
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
                          width: { xs: 70, md: 90 },
                          height: { xs: 70, md: 90 },
                          borderRadius: 3,
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          gap: 1,
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.15)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <item.icon sx={{ 
                          fontSize: { xs: 24, md: 30 }, 
                          color: isDark 
                            ? (index === 0 ? '#00f5ff' : index === 1 ? '#ff6b35' : '#7c3aed')
                            : (index === 0 ? '#0066cc' : index === 1 ? '#cc4400' : '#4c1d95'),
                          filter: 'drop-shadow(0 0 8px currentColor)',
                        }} />
                        <Typography
                          variant="caption"
                          sx={{ 
                            color: '#ffffff', 
                            fontWeight: 700,
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            textShadow: '0 0 10px rgba(255,255,255,0.5)',
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