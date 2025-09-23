'use client';
import { Box, Container, Typography, Grid, Paper, Button, Card, CardContent, Avatar, Divider } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Psychology, EmojiObjects, Rocket, Star, FlashOn, School, Group, WorkOutline, Support, CheckCircle, ArrowForward } from '@mui/icons-material';
import Navigation from '@/components/ui/Navigation';
import PowerfulHero from '@/components/ui/PowerfulHero';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';
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
    <>
      <Navigation />
      <PowerfulHero />
      
      {/* About Section */}
      <Box sx={{ py: 8, background: isDark ? '#1a1a1a' : '#ffffff' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, color: isDark ? 'white' : '#1a1a1a' }}>
              Professional Excellence in Skills Development
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', mb: 4, color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.9)', fontWeight: 600 }}>
              KaushalX delivers enterprise-grade reskilling solutions with proven results. Founded in 2023, we bridge the critical skills gap through AI-powered learning platforms and expert mentorship.
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper sx={{
                  p: 4,
                  textAlign: 'center',
                  background: isDark ? '#2a2a2a' : '#f8f9fa',
                  border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <Box sx={{ color: isDark ? '#4a90e2' : '#1976d2', mb: 2, fontSize: '2rem' }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: isDark ? '#4a90e2' : '#1976d2', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(26,26,26,0.8)', fontWeight: 600 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, background: isDark ? '#0f0f0f' : '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, color: isDark ? 'white' : '#1a1a1a' }}>
              Core Capabilities
            </Typography>
            <Typography variant="h6" sx={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.9)', maxWidth: 600, mx: 'auto', fontWeight: 600 }}>
              Enterprise-grade solutions designed for measurable outcomes
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <Card sx={{
                  height: '280px',
                  background: isDark ? '#2a2a2a' : '#ffffff',
                  border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                  borderRadius: 2,
                  boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ color: isDark ? '#4a90e2' : '#1976d2', mb: 3, fontSize: '3rem' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: isDark ? 'white' : '#1a1a1a' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(26,26,26,0.8)', lineHeight: 1.6, fontWeight: 500 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: 8, background: isDark ? '#1a1a1a' : '#ffffff' }}>
        <Container maxWidth="lg">
          <Paper sx={{
            p: 8,
            textAlign: 'center',
            background: isDark ? '#2a2a2a' : '#f8f9fa',
            border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
            borderRadius: 3,
            boxShadow: isDark ? 'none' : '0 4px 16px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, color: isDark ? 'white' : '#1a1a1a' }}>
              Our Mission
            </Typography>
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              lineHeight: 1.6, 
              color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.9)',
              maxWidth: 800,
              mx: 'auto'
            }}>
              Delivering enterprise-grade reskilling solutions that bridge the critical skills gap in today's competitive market. 
              We combine advanced AI technology with expert mentorship to ensure measurable career advancement and 
              sustainable professional growth for our clients.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Success Stories Section */}
      <Box sx={{ py: 8, background: isDark ? '#0f0f0f' : '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, color: isDark ? 'white' : '#1a1a1a' }}>
              Success Stories
            </Typography>
            <Typography variant="h6" sx={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.9)', fontWeight: 600 }}>
              Proven results from industry professionals
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{
                height: '100%',
                background: isDark ? '#2a2a2a' : '#ffffff',
                border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ width: 50, height: 50, background: isDark ? '#4a90e2' : '#1976d2', color: 'white', fontWeight: 'bold', mr: 2 }}>
                      SC
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? 'white' : '#1a1a1a' }}>
                        Sarah Chen
                      </Typography>
                      <Typography variant="body2" sx={{ color: isDark ? '#4a90e2' : '#1976d2', fontWeight: 600 }}>
                        Software Engineer at Google
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.9)', lineHeight: 1.6, fontWeight: 500 }}>
                    "KaushalX transformed my career from marketing to tech. The AI-powered learning path was perfectly tailored to my needs."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{
                height: '100%',
                background: isDark ? '#2a2a2a' : '#ffffff',
                border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ width: 50, height: 50, background: isDark ? '#4a90e2' : '#1976d2', color: 'white', fontWeight: 'bold', mr: 2 }}>
                      MR
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? 'white' : '#1a1a1a' }}>
                        Mike Rodriguez
                      </Typography>
                      <Typography variant="body2" sx={{ color: isDark ? '#4a90e2' : '#1976d2', fontWeight: 600 }}>
                        Data Scientist at Microsoft
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.9)', lineHeight: 1.6, fontWeight: 500 }}>
                    "The mentorship program connected me with industry experts who guided me every step of the way. Incredible experience!"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{
                height: '100%',
                background: isDark ? '#2a2a2a' : '#ffffff',
                border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ width: 50, height: 50, background: isDark ? '#4a90e2' : '#1976d2', color: 'white', fontWeight: 'bold', mr: 2 }}>
                      PS
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? 'white' : '#1a1a1a' }}>
                        Priya Sharma
                      </Typography>
                      <Typography variant="body2" sx={{ color: isDark ? '#4a90e2' : '#1976d2', fontWeight: 600 }}>
                        Cloud Architect at AWS
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.9)', lineHeight: 1.6, fontWeight: 500 }}>
                    "From zero coding experience to landing my dream job in 6 months. The community support was amazing throughout."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        py: 12, 
        background: isDark 
          ? 'radial-gradient(ellipse at center, rgba(255,215,0,0.1) 0%, #0f0f0f 70%)'
          : 'radial-gradient(ellipse at center, rgba(255,107,107,0.1) 0%, #f8f4f0 70%)'
      }}>
        <Container maxWidth="lg">
          <motion.div
            {...(shouldReduceMotion ? motionConfig.reducedMotion : motionConfig.fadeInUp)}
            whileInView="animate"
            viewport={viewportConfig}
            style={performanceConfig.hardwareAcceleration}
          >
            <Paper sx={{
              p: 10,
              textAlign: 'center',
              background: isDark 
                ? 'linear-gradient(135deg, rgba(255,107,107,0.2) 0%, rgba(78,205,196,0.2) 50%, rgba(255,215,0,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,107,107,0.15) 50%, rgba(78,205,196,0.1) 100%)',
              backdropFilter: 'blur(30px)',
              border: isDark 
                ? '2px solid rgba(255,107,107,0.4)' 
                : '2px solid rgba(255,215,0,0.4)',
              borderRadius: 6,
              boxShadow: isDark 
                ? '0 40px 80px rgba(255,107,107,0.3), 0 0 50px rgba(78,205,196,0.2)'
                : '0 40px 80px rgba(255,215,0,0.3), 0 0 50px rgba(255,107,107,0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: isDark 
                  ? 'conic-gradient(from 0deg, transparent, rgba(255,215,0,0.1), transparent, rgba(78,205,196,0.1), transparent)'
                  : 'conic-gradient(from 0deg, transparent, rgba(255,107,107,0.1), transparent, rgba(255,215,0,0.1), transparent)',
                animation: 'rotate 20s linear infinite',
                pointerEvents: 'none',
              },
              '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: isDark ? 'white' : '#2c1810' }}>
                Ready to Transform Your Career?
              </Typography>
              <Typography variant="h6" sx={{ 
                mb: 4, 
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)',
                maxWidth: 600,
                mx: 'auto'
              }}>
                Join thousands of professionals who have successfully transitioned to their dream careers with KaushalX
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/signup" passHref>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #ff5252, #26a69a)',
                        transform: 'translateY(-2px)',
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
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      borderColor: '#ffd700',
                      color: '#ffd700',
                      '&:hover': {
                        background: 'rgba(255,215,0,0.1)',
                        borderColor: '#ffd700',
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
    </>
  );
}