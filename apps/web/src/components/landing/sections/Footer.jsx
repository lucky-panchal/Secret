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
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box
        id="contact"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'var(--gradient-primary)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            zIndex: 0,
          }}
        />

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
                  color: 'white',
                  fontWeight: 800,
                  mb: { xs: 2, md: 3 },
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Stay Relevant. Stay Future-Proof.
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: { xs: 4, md: 6 },
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
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
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.3)',
                    px: { xs: 4, md: 6 },
                    py: { xs: 2, md: 2.5 },
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    fontWeight: 700,
                    minHeight: { xs: 56, md: 64 },
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.25)',
                      borderColor: 'rgba(255,255,255,0.5)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
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
                    color: 'rgba(255,255,255,0.7)',
                    mb: 2,
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
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'white',
                          textDecoration: 'underline',
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
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            />
          </motion.div>
        ))}
      </Box>
    </div>
  );
};

export default Footer;