'use client';
import { Box, Container, Typography, Grid, Paper, Button, Card, CardContent, Avatar } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { Psychology, Group, WorkOutline, Support, Rocket, Star, FlashOn, School } from '@mui/icons-material';
import Navigation from '@/components/ui/Navigation';
import PowerfulHero from '@/components/ui/PowerfulHero';
import { useTheme } from '@/contexts/ThemeContext';
import { motionConfig, viewportConfig, performanceConfig } from '@/utils/motionConfig';
import Link from 'next/link';

const features = [
  {
    icon: <Psychology />,
    title: 'AI-Driven Personalization',
    description: 'Tailored learning paths that adapt to your unique pace, goals, and learning style for maximum efficiency.'
  },
  {
    icon: <Group />,
    title: 'Expert Mentorship',
    description: 'Get guidance from industry leaders at top companies like Google, Microsoft, and Amazon.'
  },
  {
    icon: <Support />,
    title: '24/7 AI Support',
    description: 'Round-the-clock intelligent assistance to keep you on track and answer your questions instantly.'
  },
  {
    icon: <WorkOutline />,
    title: 'Results-Oriented',
    description: 'Proven 98% job placement rate with measurable outcomes and real-world success stories.'
  }
];

const stats = [
  { number: '50K+', label: 'Success Stories', icon: <Rocket /> },
  { number: '98%', label: 'Job Placement Rate', icon: <Star /> },
  { number: '24/7', label: 'AI Support', icon: <FlashOn /> },
  { number: '200+', label: 'Expert Courses', icon: <School /> }
];

export default function Home() {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Navigation />
      <PowerfulHero />
      
      {/* About Section - Professional Excellence in Skills Development */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: 'var(--surface)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 }, mx: 'auto', maxWidth: '900px' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: '"Merriweather", serif',
                fontWeight: 700, 
                mb: { xs: 2, md: 4 }, 
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.2
              }}
            >
              Professional Excellence in Skills Development
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: '"Inter", sans-serif',
                maxWidth: '800px', 
                mx: 'auto', 
                mb: { xs: 3, md: 4 }, 
                px: { xs: 1, md: 0 },
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'var(--text-secondary)', 
                fontWeight: 500,
                lineHeight: 1.6
              }}
            >
              KaushalX delivers enterprise-grade reskilling solutions with proven results. Founded in 2023, we bridge the critical skills gap through AI-powered learning platforms and expert mentorship.
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center" sx={{ maxWidth: '1000px', mx: 'auto' }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <Paper sx={{
                  p: { xs: 2, md: 4 },
                  textAlign: 'center',
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 2,
                  height: '100%',
                  minHeight: { xs: '140px', md: '180px' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                  }
                }}>
                  <Box sx={{ color: 'var(--primary)', mb: { xs: 1, md: 2 }, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontFamily: '"Merriweather", serif',
                      fontWeight: 700, 
                      color: 'var(--primary)', 
                      mb: 1,
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: '"Inter", sans-serif',
                      color: 'var(--text-secondary)', 
                      fontWeight: 500,
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Core Capabilities */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: 'var(--background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 }, mx: 'auto', maxWidth: '800px' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: '"Merriweather", serif',
                fontWeight: 700, 
                mb: { xs: 2, md: 3 }, 
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.2
              }}
            >
              Core Capabilities
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: '"Inter", sans-serif',
                color: 'var(--text-secondary)', 
                maxWidth: '600px', 
                mx: 'auto', 
                fontWeight: 500,
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                px: { xs: 1, md: 0 },
                lineHeight: 1.6
              }}
            >
              Enterprise-grade solutions designed for measurable outcomes
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center" sx={{ maxWidth: '1200px', mx: 'auto' }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <Card sx={{
                  height: { xs: 'auto', md: '320px' },
                  minHeight: { xs: '250px', md: '320px' },
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardContent sx={{ 
                    p: { xs: 3, md: 4 }, 
                    textAlign: 'center', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Box sx={{ 
                      color: 'var(--primary)', 
                      mb: { xs: 2, md: 3 }, 
                      fontSize: { xs: '2.5rem', md: '3rem' }
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: '"Merriweather", serif',
                        fontWeight: 600, 
                        mb: { xs: 1.5, md: 2 }, 
                        color: 'var(--text-primary)',
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        textAlign: 'center'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: '"Inter", sans-serif',
                        color: 'var(--text-secondary)', 
                        lineHeight: 1.6, 
                        fontWeight: 400,
                        fontSize: { xs: '0.875rem', md: '0.95rem' },
                        textAlign: 'center',
                        maxWidth: '280px'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mission Section - Our Mission */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: 'var(--surface)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Paper sx={{
            p: { xs: 4, md: 8 },
            textAlign: 'center',
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            maxWidth: '900px',
            mx: 'auto',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            }
          }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: '"Merriweather", serif',
                fontWeight: 700, 
                mb: { xs: 3, md: 4 }, 
                color: 'var(--text-primary)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: 1.2
              }}
            >
              Our Mission
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500, 
                lineHeight: 1.6, 
                color: 'var(--text-secondary)',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                px: { xs: 1, md: 0 }
              }}
            >
              Delivering enterprise-grade reskilling solutions that bridge the critical skills gap in today's competitive market. 
              We combine advanced AI technology with expert mentorship to ensure measurable career advancement and 
              sustainable professional growth for our clients.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Success Stories Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: 'var(--background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 }, mx: 'auto', maxWidth: '800px' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: '"Merriweather", serif',
                fontWeight: 700, 
                mb: { xs: 2, md: 3 }, 
                color: 'var(--text-primary)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: 1.2
              }}
            >
              Success Stories
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'var(--text-secondary)', 
                fontWeight: 500,
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                px: { xs: 1, md: 0 }
              }}
            >
              Proven results from industry professionals
            </Typography>
          </Box>
          
          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center" sx={{ maxWidth: '1000px', mx: 'auto' }}>
            {[
              {
                name: 'Sarah Chen',
                role: 'Software Engineer at Google',
                avatar: 'SC',
                quote: 'KaushalX transformed my career from marketing to tech. The AI-powered learning path was perfectly tailored to my needs.'
              },
              {
                name: 'Mike Rodriguez', 
                role: 'Data Scientist at Microsoft',
                avatar: 'MR',
                quote: 'The mentorship program connected me with industry experts who guided me every step of the way. Incredible experience!'
              },
              {
                name: 'Priya Sharma',
                role: 'Cloud Architect at AWS', 
                avatar: 'PS',
                quote: 'From zero coding experience to landing my dream job in 6 months. The community support was amazing throughout.'
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{
                  height: '100%',
                  minHeight: { xs: '220px', md: '280px' },
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                  }
                }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ 
                        width: { xs: 45, md: 50 }, 
                        height: { xs: 45, md: 50 }, 
                        background: 'var(--primary)', 
                        color: 'white', 
                        fontWeight: 'bold', 
                        mr: 2 
                      }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700, 
                            color: 'var(--text-primary)',
                            fontSize: { xs: '1rem', md: '1.25rem' }
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'var(--primary)', 
                            fontWeight: 600,
                            fontSize: { xs: '0.8rem', md: '0.875rem' }
                          }}
                        >
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'var(--text-secondary)', 
                        lineHeight: 1.6, 
                        fontWeight: 400,
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        flex: 1
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section - Ready to Transform Your Career? */}
      <Box sx={{ 
        py: { xs: 8, md: 12 }, 
        background: 'var(--gradient-primary)'
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <motion.div
            {...(shouldReduceMotion ? motionConfig.reducedMotion : motionConfig.fadeInUp)}
            whileInView="animate"
            viewport={viewportConfig}
            style={performanceConfig.hardwareAcceleration}
          >
            <Paper sx={{
              p: { xs: 4, md: 8, lg: 10 },
              textAlign: 'center',
              maxWidth: '900px',
              mx: 'auto',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(30px)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: 3,
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
              }
            }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontFamily: '"Merriweather", serif',
                  fontWeight: 700, 
                  mb: { xs: 2, md: 3 }, 
                  color: 'white',
                  fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                  lineHeight: 1.2
                }}
              >
                Ready to Transform Your Career?
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: { xs: 3, md: 4 }, 
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: '600px',
                  mx: 'auto',
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  px: { xs: 1, md: 0 },
                  lineHeight: 1.6
                }}
              >
                Join thousands of professionals who have successfully transitioned to their dream careers with KaushalX
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 2, md: 3 }, 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                <Link href="/signup" passHref>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: { xs: 4, md: 6 },
                      py: { xs: 1.5, md: 2 },
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      background: 'var(--accent)',
                      color: '#000',
                      fontWeight: 600,
                      borderRadius: 2,
                      minHeight: 48,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        background: 'var(--warning)',
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    Start Free Today
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: { xs: 4, md: 6 },
                      py: { xs: 1.5, md: 2 },
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      borderColor: 'white',
                      color: 'white',
                      borderWidth: 2,
                      borderRadius: 2,
                      minHeight: 48,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        background: 'white',
                        color: 'var(--primary)',
                        borderColor: 'white',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </div>
  );
}