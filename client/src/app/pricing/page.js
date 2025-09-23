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
    color: 'var(--success)',
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
    color: 'var(--accent)',
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
    color: 'var(--secondary)',
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
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Navigation />
      <Box sx={{ 
        pt: 12, 
        pb: 4, 
        background: 'var(--background)', 
        minHeight: '100vh' 
      }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'var(--text-primary)' }}>
              Choose Your Learning Plan
            </Typography>
            <Typography variant="h6" sx={{ color: 'var(--text-secondary)', maxWidth: 600, mx: 'auto' }}>
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
                  background: 'var(--surface)',
                  border: plan.popular 
                    ? `2px solid ${plan.color}` 
                    : '1px solid var(--border)',
                  borderRadius: 2,
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: plan.popular ? '0 20px 40px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: plan.popular ? 'scale(1.07)' : 'scale(1.02)',
                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                  }
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
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'var(--text-primary)' }}>
                      {plan.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: plan.color }}>
                        {plan.price}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'var(--text-secondary)', ml: 1 }}>
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
                            color: 'var(--text-secondary)'
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
                        borderRadius: 2,
                        minHeight: 44,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          background: plan.popular ? 'var(--primary)' : plan.color,
                          color: plan.popular ? 'white' : '#000',
                          borderColor: plan.color,
                          transform: 'scale(1.02)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
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
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'var(--text-primary)' }}>
              Questions? We're here to help.
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
              Contact our support team for personalized assistance with your learning journey.
            </Typography>
            <Link href="/contact" passHref>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: 'var(--accent)',
                  borderColor: 'var(--accent)',
                  borderRadius: 2,
                  minHeight: 44,
                  px: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'var(--accent)',
                    color: '#000',
                    borderColor: 'var(--accent)',
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                Contact Support
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </div>
  );
}