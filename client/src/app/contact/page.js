'use client';
import { Box, Container, Typography, Grid, Paper, TextField, Button, Card, CardContent } from '@mui/material';
import { Email, Phone, LocationOn, Schedule } from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/ui/Navigation';

const contactInfo = [
  {
    icon: <Email />,
    title: 'Email Us',
    details: 'support@kaushalx.com',
    description: 'Send us an email anytime!'
  },
  {
    icon: <Phone />,
    title: 'Call Us',
    details: '+1 (555) 123-4567',
    description: 'Mon-Fri from 8am to 5pm'
  },
  {
    icon: <LocationOn />,
    title: 'Visit Us',
    details: 'San Francisco, CA',
    description: 'Come say hello at our office'
  },
  {
    icon: <Schedule />,
    title: 'Support Hours',
    details: '24/7 Available',
    description: 'We are here to help you'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { isDark } = useTheme();

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Navigation />
      <Box sx={{ 
        pt: 12, 
        pb: 4, 
        background: isDark ? '#0f0f0f' : '#f8f4f0', 
        minHeight: '100vh' 
      }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: isDark ? 'white' : '#2c1810' }}>
              Get in Touch
            </Typography>
            <Typography variant="h6" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', maxWidth: 600, mx: 'auto' }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} lg={8}>
              <Paper sx={{
                p: 4,
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                borderRadius: 2,
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: isDark ? 'white' : '#2c1810' }}>
                  Send us a Message
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        value={formData.name}
                        onChange={handleChange('name')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,24,16,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#ffd700',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#ffd700',
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,24,16,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#ffd700',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#ffd700',
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        value={formData.subject}
                        onChange={handleChange('subject')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,24,16,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#ffd700',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#ffd700',
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleChange('message')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,24,16,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#ffd700',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#ffd700',
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          background: '#ffd700',
                          color: '#000',
                          fontWeight: 600,
                          '&:hover': {
                            background: '#ffed4e',
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                {contactInfo.map((info, index) => (
                  <Grid item xs={12} sm={6} lg={12} key={index}>
                    <Card sx={{
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(20px)',
                      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                      borderRadius: 2,
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ 
                            color: '#ffd700', 
                            mr: 2,
                            p: 1,
                            borderRadius: 1,
                            background: 'rgba(255,215,0,0.1)'
                          }}>
                            {info.icon}
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: isDark ? 'white' : '#2c1810' }}>
                            {info.title}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#ffd700' }}>
                          {info.details}
                        </Typography>
                        <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
                          {info.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}