'use client';
import { Box, Typography, Container, Paper, Grid, TextField, Button } from '@mui/material';
import { Email, Phone, LocationOn, Schedule } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { GlowCard } from '@/components/ui/spotlight-card';

const ContactPage = () => {
  const { isDark } = useTheme();

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 30, color: '#1976d2' }} />,
      title: 'Email Support',
      details: 'support@kaushalx.com',
      subtitle: 'We respond within 24 hours'
    },
    {
      icon: <Phone sx={{ fontSize: 30, color: '#2196f3' }} />,
      title: 'Phone Support',
      details: '+91-XXXXXXXXXX',
      subtitle: 'Mon-Fri, 10AM-6PM IST'
    },
    {
      icon: <LocationOn sx={{ fontSize: 30, color: '#03a9f4' }} />,
      title: 'Headquarters',
      details: 'KaushalX HQ',
      subtitle: 'Mumbai, Maharashtra, India'
    },
    {
      icon: <Schedule sx={{ fontSize: 30, color: '#1976d2' }} />,
      title: 'Support Hours',
      details: 'Monday - Friday',
      subtitle: '10:00 AM - 6:00 PM IST'
    }
  ];

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box sx={{ 
        minHeight: '100vh', 
        background: '#000000',
        py: { xs: 2, md: 4 }
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 3, 
            textAlign: 'center', 
            color: isDark ? '#F8FAFC' : '#2D3748'
          }}>
            Contact Us
          </Typography>
          
          <Typography variant="h6" sx={{ 
            color: isDark ? '#CBD5E1' : '#4A5568', 
            mb: 4, 
            textAlign: 'center' 
          }}>
            Get in touch with the KaushalX team
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  mb: 3, 
                  color: isDark ? '#1976d2' : '#1976d2',
                  textAlign: 'center'
                }}>
                  Get In Touch
                </Typography>
                
                <Grid container spacing={2}>
                  {contactInfo.map((info, index) => (
                    <Grid item xs={12} key={index}>
                      <GlowCard 
                        glowColor={index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'purple' : 'green'} 
                        customSize 
                        width="100%" 
                        height="120px"
                        className="!rounded-none !aspect-auto"
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', p: 2 }}>
                          <Box sx={{ mr: 3 }}>
                            {info.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 600, 
                              color: isDark ? '#F8FAFC' : '#2D3748'
                            }}>
                              {info.title}
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: isDark ? '#CBD5E1' : '#4A5568' 
                            }}>
                              {info.details}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: isDark ? '#94a3b8' : '#718096' 
                            }}>
                              {info.subtitle}
                            </Typography>
                          </Box>
                        </Box>
                      </GlowCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <GlowCard 
                glowColor="purple" 
                customSize 
                width="100%" 
                height="100%"
                className="!rounded-none !aspect-auto"
              >
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  mb: 3, 
                  color: isDark ? '#1976d2' : '#1976d2'
                }}>
                  Send us a Message
                </Typography>
                
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: isDark ? '#F8FAFC' : '#2D3748',
                        background: isDark ? 'rgba(13, 71, 161, 0.1)' : 'rgba(13, 71, 161, 0.05)',
                        '& fieldset': { borderColor: isDark ? '#0d47a1' : '#1565c0' },
                        '&:hover fieldset': { borderColor: '#0d47a1' },
                        '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                        borderRadius: 0
                      },
                      '& .MuiInputLabel-root': { color: isDark ? '#0d47a1' : '#1565c0' }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: isDark ? '#F8FAFC' : '#2D3748',
                        background: isDark ? 'rgba(13, 71, 161, 0.1)' : 'rgba(13, 71, 161, 0.05)',
                        '& fieldset': { borderColor: isDark ? '#0d47a1' : '#1565c0' },
                        '&:hover fieldset': { borderColor: '#0d47a1' },
                        '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                        borderRadius: 0
                      },
                      '& .MuiInputLabel-root': { color: isDark ? '#0d47a1' : '#1565c0' }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: isDark ? '#F8FAFC' : '#2D3748',
                        background: isDark ? 'rgba(13, 71, 161, 0.1)' : 'rgba(13, 71, 161, 0.05)',
                        '& fieldset': { borderColor: isDark ? '#0d47a1' : '#1565c0' },
                        '&:hover fieldset': { borderColor: '#0d47a1' },
                        '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                        borderRadius: 0
                      },
                      '& .MuiInputLabel-root': { color: isDark ? '#0d47a1' : '#1565c0' }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: isDark ? '#F8FAFC' : '#2D3748',
                        background: isDark ? 'rgba(13, 71, 161, 0.1)' : 'rgba(13, 71, 161, 0.05)',
                        '& fieldset': { borderColor: isDark ? '#0d47a1' : '#1565c0' },
                        '&:hover fieldset': { borderColor: '#0d47a1' },
                        '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                        borderRadius: 0
                      },
                      '& .MuiInputLabel-root': { color: isDark ? '#0d47a1' : '#1565c0' }
                    }}
                  />
                  
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #03a9f4 100%)',
                      '&:hover': { 
                        background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #0288d1 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                      },
                      py: 1.5,
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      borderRadius: 0
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </GlowCard>
            </Grid>
          </Grid>

          <Paper sx={{ 
            p: 4, 
            borderRadius: 0, 
            mt: 4, 
            textAlign: 'center', 
            background: '#000000',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#F8FAFC'
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2, 
              color: '#64b5f6',
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}>
              Need Immediate Help?
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#90caf9', 
              lineHeight: 1.7,
              fontSize: { xs: '0.875rem', md: '0.95rem' }
            }}>
              For urgent technical issues or account problems, please email us directly at 
              <strong> support@kaushalx.com</strong> with "URGENT" in the subject line. 
              We'll respond within 2-4 hours during business hours.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default ContactPage;