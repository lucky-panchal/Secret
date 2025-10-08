'use client';
import { Box, Container, Typography, Grid, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Psychology, Security, Work, School, AccountBalance } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import FeatureCard from '../ui/FeatureCard';
import '../../../styles/landing-color-scheme.css';

const Features = () => {
  const { isDark } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const features = [
    {
      icon: Psychology,
      title: 'AI Career Assessment',
      description: 'Advanced AI algorithms analyze your skills, interests, and market trends to create personalized career roadmaps.',
    },
    {
      icon: Security,
      title: 'Blockchain Certification',
      description: 'Secure, verifiable credentials stored on blockchain technology, recognized globally by employers.',
    },
    {
      icon: Work,
      title: 'Global Job Matching',
      description: 'Connect with opportunities worldwide through our intelligent job matching system and employer network.',
    },
    {
      icon: School,
      title: 'Micro-Learning Courses',
      description: 'Bite-sized, interactive learning modules designed for busy professionals to learn at their own pace.',
    },
    {
      icon: AccountBalance,
      title: 'Reskilling Token Economy',
      description: 'Earn tokens for learning achievements and use them for advanced courses, certifications, and career services.',
    },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box
        id="features"
        sx={{
          py: { xs: 6, md: 10 },
          background: '#030303',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating shapes */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [25, 30, 25],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), transparent)',
              filter: 'blur(1px)',
              opacity: 0.6,
              right: '-10%',
              top: '20%',
              transform: 'rotate(25deg)',
            }}
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [-20, -15, -20],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              width: '400px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), transparent)',
              filter: 'blur(1px)',
              opacity: 0.6,
              left: '-15%',
              bottom: '30%',
              transform: 'rotate(-20deg)',
            }}
          />
        </Box>

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Section Title */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'var(--primary-text)',
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                }}
              >
                Why Choose Our Platform?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'var(--secondary-text)',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Discover the revolutionary features that make our reskilling platform the future of career transformation.
              </Typography>
            </Box>
          </motion.div>

          {/* Features Grid */}
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Features;