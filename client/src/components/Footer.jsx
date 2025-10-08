'use client';
import { Box, Typography, Container, Link, Grid } from '@mui/material';

const Footer = () => {
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <Box sx={{ 
      background: '#1A1A2E', 
      color: '#F8FAFC', 
      py: 4, 
      mt: 'auto',
      borderTop: '1px solid #334155'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#778979' }}>
              KaushalX
            </Typography>
            <Typography variant="body2" sx={{ color: '#CBD5E1' }}>
              AI-Based Job Role Suggestion & Reskilling Platform
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  sx={{
                    color: '#CBD5E1',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#778979',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 3, pt: 3, borderTop: '1px solid #334155' }}>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            © 2025 KaushalX. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;