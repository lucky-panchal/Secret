'use client';
import { Box, Container, Typography, Grid, Paper, Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { Check, Star, Rocket, Diamond } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/ui/Navigation';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    icon: <Star />,
    color: '#4caf50',
    features: [
      '3 Free Courses',
      'Basic Learning Path',
      'Community Support',
      'Progress Tracking',
      'Mobile Access'
    ],
    limitations: [
      'Limited Course Access',
      'No Certificates',
      'No 1-on-1 Mentorship'
    ]
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    icon: <Rocket />,
    color: '#ffd700',
    popular: true,
    features: [
      'All 200+ Courses',
      'Personalized AI Learning',
      'Industry Certificates',
      '24/7 AI Support',
      'Project-Based Learning',
      'Career Guidance',
      'Resume Review'
    ],
    limitations: []
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    icon: <Diamond />,
    color: '#9c27b0',
    features: [
      'Everything in Pro',
      '1-on-1 Expert Mentorship',
      'Custom Learning Paths',
      'Priority Support',
      'Team Management',
      'Advanced Analytics',
      'Job Placement Assistance'
    ],
    limitations: []
  }
];

export default function PricingPage() {
  const { isDark } = useTheme();

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
              Choose Your Learning Plan
            </Typography>
            <Typography variant="h6" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', maxWidth: 600, mx: 'auto' }}>
              Start free and upgrade as you grow. All plans include our core learning platform.
            </Typography>
          </Box>

          {/* Pricing Cards */}
          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{
                  p: 4,
                  height: '100%',
                  position: 'relative',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: plan.popular 
                    ? `2px solid ${plan.color}` 
                    : isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(44,24,16,0.1)',
                  borderRadius: 2,
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: plan.popular ? `0 20px 40px ${plan.color}30` : 'none',
                }}>
                  {plan.popular && (
                    <Chip 
                      label="Most Popular" 
                      sx={{ 
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: plan.color,
                        color: '#000',
                        fontWeight: 600
                      }} 
                    />
                  )}

                  {/* Plan Header */}
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ color: plan.color, mb: 2, fontSize: '3rem' }}>
                      {plan.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: isDark ? 'white' : '#2c1810' }}>
                      {plan.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: plan.color }}>
                        {plan.price}
                      </Typography>
                      <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', ml: 1 }}>
                        {plan.period}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Features */}
                  <List sx={{ mb: 3 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Check sx={{ color: plan.color, fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                            color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(44,24,16,0.8)'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {/* CTA Button */}
                  <Link href="/signup" passHref>
                    <Button
                      fullWidth
                      variant={plan.popular ? 'contained' : 'outlined'}
                      size="large"
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        background: plan.popular ? plan.color : 'transparent',
                        color: plan.popular ? '#000' : plan.color,
                        borderColor: plan.color,
                        '&:hover': {
                          background: plan.popular ? plan.color : `${plan.color}20`,
                          borderColor: plan.color,
                        },
                      }}
                    >
                      {plan.name === 'Free' ? 'Get Started Free' : `Choose ${plan.name}`}
                    </Button>
                  </Link>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* FAQ Section */}
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: isDark ? 'white' : '#2c1810' }}>
              Questions? We're here to help.
            </Typography>
            <Typography variant="body1" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)', mb: 3 }}>
              Contact our support team for personalized assistance with your learning journey.
            </Typography>
            <Link href="/contact" passHref>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: '#ffd700',
                  borderColor: '#ffd700',
                  '&:hover': {
                    background: 'rgba(255,215,0,0.1)',
                    borderColor: '#ffd700',
                  },
                }}
              >
                Contact Support
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}