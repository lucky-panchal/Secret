'use client';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Rocket } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <Box sx={{ background: 'transparent' }}>
      <Box
        id="contact"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'var(--background)',

          position: 'relative',
          overflow: 'hidden',
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
              width: 400,
              height: 100,
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
                boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.1)',
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
              top: '60%',
              width: 350,
              height: 90,
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
                boxShadow: '0 8px 32px 0 rgba(244, 63, 94, 0.1)',
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
              bottom: '10%',
              width: 250,
              height: 60,
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
                boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.1)',
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

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Box sx={{ textAlign: 'center' }}>
              {/* Main CTA Title */}
              <Typography
                variant="h2"
                sx={{
                  color: '#f8fafc',
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                  letterSpacing: '-0.025em',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Stay Relevant. Stay Future-Proof.
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h6"
                sx={{
                  color: '#cbd5e1',
                  mb: { xs: 4, md: 6 },
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Join thousands of professionals who are already transforming their careers with AI-powered reskilling. The future of work starts today.
              </Typography>

              {/* CTA Button */}
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    px: { xs: 4, md: 6 },
                    py: { xs: 2, md: 2.5 },
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    fontWeight: 600,
                    minHeight: { xs: 56, md: 64 },
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Join the Reskilling Revolution
                </Button>
              </motion.div>

              {/* Footer Info */}
              <Box sx={{ mt: { xs: 6, md: 8 } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#94a3b8',
                    mb: 2,
                    fontWeight: 400,
                  }}
                >
                  © 2024 Future Work Reskilling Platform. Empowering careers worldwide.
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: { xs: 2, md: 4 },
                    flexWrap: 'wrap',
                  }}
                >
                  {['Privacy Policy', 'Terms of Service', 'Contact Us', 'About'].map((link, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      component="a"
                      href="#"
                      sx={{
                        color: '#cbd5e1',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          color: '#6366f1',
                          textDecoration: 'none',
                        },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>

        {/* Floating Elements */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              delay: index * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: `${20 + index * 30}%`,
              left: `${5 + index * 40}%`,
              zIndex: 0,
            }}
          >
            <Box
              sx={{
                width: { xs: 60, md: 80 },
                height: { xs: 60, md: 80 },
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(20px)',
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;