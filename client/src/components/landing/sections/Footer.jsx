'use client';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Rocket } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import '../../../styles/landing-color-scheme.css';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <Box sx={{ background: 'transparent' }}>
      <Box
        id="contact"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'var(--deep-black)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Main CTA Title */}
            <Typography
              variant="h3"
              sx={{
                color: 'var(--primary-text)',
                fontWeight: 700,
                mb: { xs: 2, md: 3 },
                letterSpacing: '-0.025em',
                fontFamily: 'Oswald',
              }}
            >
              Stay Relevant. Stay Future-Proof
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h6"
              sx={{
                color: 'var(--secondary-text)',
                mb: { xs: 4, md: 6 },
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
                fontFamily: 'Outfit',
              }}
            >
              Join thousands of professionals who are already transforming their careers with AI-powered reskilling. The future of work starts today.
            </Typography>

            {/* CTA Button */}
            <Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<Rocket />}
                className="landing-btn-primary"
                sx={{
                  px: { xs: 4, md: 6 },
                  py: { xs: 2, md: 2.5 },
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontWeight: 600,
                  minHeight: { xs: 56, md: 64 },
                  borderRadius: 3,
                  textTransform: 'none',
                  fontFamily: 'Jost',
                }}
              >
                Join the Reskilling Revolution
              </Button>
            </Box>

            {/* Footer Info */}
            <Box sx={{ mt: { xs: 6, md: 8 } }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--secondary-text)',
                  mb: 2,
                  fontWeight: 400,
                  fontFamily: 'Jost',
                }}
              >
                © 2024 KaushalX Platform. Empowering careers worldwide.
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
                      color: 'var(--secondary-text)',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontFamily: 'Jost',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        color: 'var(--primary-text)',
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
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;