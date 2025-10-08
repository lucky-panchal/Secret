'use client';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';
import { Gavel, Security, Policy, Update, Warning, Info } from '@mui/icons-material';
import { GlowCard } from '@/components/ui/spotlight-card';

const TermsOfServicePage = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      icon: <Info sx={{ fontSize: { xs: 24, md: 32 }, color: '#1976d2' }} />,
      title: 'Accurate Information Required',
      content: 'You must provide accurate and complete information about your skills, education, and career preferences. False information may result in inappropriate recommendations and account suspension.'
    },
    {
      icon: <Warning sx={{ fontSize: { xs: 24, md: 32 }, color: '#f44336' }} />,
      title: 'Prohibited Use',
      content: 'You may not misuse our platform, attempt to hack or disrupt our services, or use our platform for any illegal activities. Violation may result in immediate account termination.'
    },
    {
      icon: <Policy sx={{ fontSize: { xs: 24, md: 32 }, color: '#2196f3' }} />,
      title: 'Content Ownership',
      content: 'KaushalX owns all content, certificates, and intellectual property on the platform. Your blockchain certificates remain verifiable but are issued under KaushalX authority.'
    },
    {
      icon: <Gavel sx={{ fontSize: { xs: 24, md: 32 }, color: '#ff9800' }} />,
      title: 'AI Suggestions Disclaimer',
      content: 'Our AI-powered job role suggestions are recommendations based on data analysis. They do not guarantee job placement or career success. Final career decisions remain your responsibility.'
    },
    {
      icon: <Update sx={{ fontSize: { xs: 24, md: 32 }, color: '#4caf50' }} />,
      title: 'Updates and Changes',
      content: 'KaushalX may update features, policies, and terms of service at any time. Continued use of the platform constitutes acceptance of updated terms.'
    },
    {
      icon: <Security sx={{ fontSize: { xs: 24, md: 32 }, color: '#9c27b0' }} />,
      title: 'Account Security',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.'
    }
  ];

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box sx={{ 
        minHeight: '100vh', 
        background: '#000000',
        py: { xs: 2, md: 4 }
      }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 6 } }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 800, 
              mb: { xs: 1, md: 2 }, 
              color: isDark ? '#F8FAFC' : '#2D3748',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}>
              Terms of Service
            </Typography>
            
            <Typography variant="h6" sx={{ 
              color: isDark ? '#CBD5E1' : '#4A5568', 
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}>
              KaushalX - AI-Based Job Role Suggestion Platform
            </Typography>
          </Box>

          <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: '900px', mx: 'auto' }}>
            <GlowCard 
              glowColor="blue" 
              customSize 
              width="100%" 
              height="120px"
              className="!rounded-none !aspect-auto"
            >
              <Box sx={{ 
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 3, md: 4 },
                transition: 'all 0.3s ease',
                cursor: 'default',
                '&:hover': {
                  transform: 'scale(1.02)',
                  '& .MuiTypography-root': {
                    color: '#64b5f6'
                  }
                }
              }}>
                <Typography variant="body1" sx={{ 
                  lineHeight: 1.7, 
                  color: isDark ? '#F8FAFC' : '#2D3748',
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  maxWidth: '800px'
                }}>
                  By using KaushalX, you agree to these terms of service. Please read them carefully 
                  as they govern your use of our AI-powered career development platform.
                </Typography>
              </Box>
            </GlowCard>
          </Box>

          <Grid container spacing={{ xs: 2, md: 4 }}>
            {sections.map((section, index) => (
              <Grid item xs={12} md={6} key={index}>
                <GlowCard 
                  glowColor={index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'red' : 'orange'} 
                  customSize 
                  width="100%" 
                  height="200px"
                  className="!rounded-none !aspect-auto"
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 2, md: 3 } }}>
                    <Box sx={{ 
                      p: { xs: 1.5, md: 2 }, 
                      borderRadius: 0, 
                      background: isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)',
                      border: isDark ? '1px solid rgba(25, 118, 210, 0.2)' : '1px solid rgba(25, 118, 210, 0.1)',
                      flexShrink: 0
                    }}>
                      {section.icon}
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        mb: { xs: 1, md: 2 }, 
                        color: isDark ? '#F8FAFC' : '#2D3748',
                        fontSize: { xs: '1.1rem', md: '1.25rem' }
                      }}>
                        {section.title}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        lineHeight: 1.6, 
                        color: isDark ? '#CBD5E1' : '#4A5568',
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      }}>
                        {section.content}
                      </Typography>
                    </Box>
                  </Box>
                </GlowCard>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: { xs: 3, md: 6 }, maxWidth: '900px', mx: 'auto' }}>
            <GlowCard 
              glowColor="purple" 
              customSize 
              width="100%" 
              height="200px"
              className="!rounded-none !aspect-auto"
            >
              <Box sx={{ 
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 3, md: 4 },
                transition: 'all 0.3s ease',
                cursor: 'default',
                '&:hover': {
                  transform: 'scale(1.02)',
                  '& .MuiTypography-root': {
                    color: '#ba68c8'
                  }
                }
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  mb: { xs: 1, md: 2 }, 
                  color: isDark ? '#F8FAFC' : '#2D3748',
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}>
                  Questions About These Terms?
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: isDark ? '#CBD5E1' : '#4A5568',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  mb: { xs: 2, md: 3 }
                }}>
                  © 2025 KaushalX. All rights reserved.<br/>
                  Committed to transparency, security and fair use.<br/>
                  Need help? Email support@kaushalx.com
                </Typography>
                
                <Box sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 1,
                  px: { xs: 2, md: 3 }, 
                  py: { xs: 1, md: 1.5 }, 
                  borderRadius: 0,
                  background: isDark ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                  border: isDark ? '1px solid rgba(25, 118, 210, 0.3)' : '1px solid rgba(25, 118, 210, 0.2)'
                }}>
                  <Gavel sx={{ fontSize: { xs: 16, md: 20 }, color: '#1976d2' }} />
                  <Typography variant="caption" sx={{ 
                    color: isDark ? '#1976d2' : '#1976d2', 
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                  }}>
                    Legally Binding Agreement
                  </Typography>
                </Box>
              </Box>
            </GlowCard>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default TermsOfServicePage;