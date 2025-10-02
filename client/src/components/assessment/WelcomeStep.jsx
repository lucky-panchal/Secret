'use client';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Psychology, TrendingUp, School, Rocket, Analytics, AutoAwesome, Speed, EmojiObjects } from '@mui/icons-material';

const WelcomeStep = ({ onNext }) => {
  const features = [
    { 
      icon: Psychology, 
      title: 'AI-Powered Analysis', 
      desc: 'Advanced algorithms evaluate your technical skills and potential',
      color: '#00D4FF'
    },
    { 
      icon: TrendingUp, 
      title: 'Career Mapping', 
      desc: 'Identify optimal career paths in AI/ML and blockchain',
      color: '#A855F7'
    },
    { 
      icon: School, 
      title: 'Personalized Learning', 
      desc: 'Custom roadmaps tailored to your background and goals',
      color: '#FBBF24'
    },
    { 
      icon: Rocket, 
      title: 'Fast Track', 
      desc: 'Accelerated learning paths for career transition',
      color: '#EC4899'
    },
    { 
      icon: Analytics, 
      title: 'Data-Driven', 
      desc: 'Evidence-based recommendations for skill development',
      color: '#10B981'
    },
    { 
      icon: AutoAwesome, 
      title: 'Smart Insights', 
      desc: 'Discover hidden strengths and growth opportunities',
      color: '#8B5CF6'
    }
  ];

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Hero Section */}
      <Paper sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        borderRadius: 4,
        p: { xs: 4, md: 8 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        mb: 4
      }}>
        {/* Background Glow */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 4
            }}>
              <Box sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)',
                position: 'relative'
              }}>
                <Psychology sx={{ fontSize: 60, color: 'white' }} />
                <Box sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography variant="h2" sx={{ 
              color: 'var(--text-primary)', 
              fontWeight: 800, 
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'var(--gradient-primary)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2
            }}>
              AI/ML Career Assessment
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Typography variant="h5" sx={{ 
              color: 'var(--text-secondary)', 
              mb: 4,
              lineHeight: 1.6,
              maxWidth: '800px',
              mx: 'auto',
              fontWeight: 400
            }}>
              Unlock your potential in Artificial Intelligence, Machine Learning, and Blockchain technology. 
              Our comprehensive assessment creates a personalized roadmap for your tech career transformation.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 4,
              mb: 6,
              flexWrap: 'wrap'
            }}>
              {[
                { icon: Speed, text: '5 Minutes', color: '#00D4FF' },
                { icon: EmojiObjects, text: 'AI-Powered', color: '#A855F7' },
                { icon: Analytics, text: 'Personalized', color: '#FBBF24' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                >
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 3,
                    py: 1.5,
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 3,
                    border: `1px solid ${item.color}30`
                  }}>
                    <item.icon sx={{ fontSize: 20, color: item.color }} />
                    <Typography sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {item.text}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onNext}
              sx={{
                px: 8,
                py: 3,
                fontSize: '1.3rem',
                fontWeight: 700,
                background: 'var(--gradient-primary)',
                borderRadius: 4,
                textTransform: 'none',
                boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 40px rgba(0, 212, 255, 0.4)'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover::before': {
                  left: '100%'
                }
              }}
            >
              🚀 Start Your Journey
            </Button>
          </motion.div>
        </Box>
      </Paper>

      {/* Features Grid */}
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
            >
              <Paper sx={{
                p: 4,
                height: '100%',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${feature.color}30`,
                borderRadius: 3,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 10px 30px ${feature.color}20`,
                  border: `1px solid ${feature.color}60`
                }
              }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: `${feature.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}>
                  <feature.icon sx={{ fontSize: 30, color: feature.color }} />
                </Box>
                
                <Typography variant="h6" sx={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: 700, 
                  mb: 2 
                }}>
                  {feature.title}
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6
                }}>
                  {feature.desc}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </Box>
  );
};

export default WelcomeStep;