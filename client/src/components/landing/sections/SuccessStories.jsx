'use client';
import { Box, Container, Typography, Grid, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, School, Work } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import '../../../styles/landing-color-scheme.css';

const SuccessStories = () => {
  const { isDark } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const stories = [
    {
      name: 'Ananya',
      role: 'From Retail Worker to Data Analyst',
      steps: [
        {
          icon: School,
          title: 'AI Assessment',
          description: 'Discovered hidden analytical skills through comprehensive AI evaluation',
          status: 'completed',
        },
        {
          icon: TrendingUp,
          title: 'Micro-Learning',
          description: 'Completed 12 weeks of data science micro-courses during work breaks',
          status: 'completed',
        },
        {
          icon: CheckCircle,
          title: 'Blockchain Certification',
          description: 'Earned verified Data Analytics certification recognized globally',
          status: 'completed',
        },
        {
          icon: Work,
          title: 'Job Placement',
          description: 'Secured position at tech startup with 150% salary increase',
          status: 'completed',
        },
      ],
    },
    {
      name: 'Arjun',
      role: 'From Factory Worker to Cloud Engineer',
      steps: [
        {
          icon: School,
          title: 'Career Transition',
          description: 'Identified cloud computing as future-proof career path',
          status: 'completed',
        },
        {
          icon: TrendingUp,
          title: 'Skill Building',
          description: 'Mastered AWS, Azure, and DevOps through interactive learning',
          status: 'completed',
        },
        {
          icon: CheckCircle,
          title: 'Industry Recognition',
          description: 'Achieved multiple cloud certifications with blockchain verification',
          status: 'completed',
        },
        {
          icon: Work,
          title: 'Career Success',
          description: 'Now leads cloud infrastructure team at Fortune 500 company',
          status: 'completed',
        },
      ],
    },
  ];

  const TimelineStep = ({ step, index, isLast }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 3,
        mb: isLast ? 0 : 4,
        position: 'relative',
      }}
    >
      {/* Timeline Line */}
      {!isLast && (
        <Box
          sx={{
            position: 'absolute',
            left: 24,
            top: 48,
            width: 2,
            height: 'calc(100% + 16px)',
            background: 'var(--secondary-text)',
            zIndex: 0,
          }}
        />
      )}

      {/* Icon */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 0,
          background: step.status === 'completed' ? 'var(--gunmetal)' : 'var(--secondary-text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <step.icon
          sx={{
            fontSize: 24,
            color: 'white',
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, pt: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: 'var(--primary-text)',
            fontWeight: 600,
            mb: 1,
          }}
        >
          {step.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'var(--secondary-text)',
            lineHeight: 1.6,
          }}
        >
          {step.description}
        </Typography>
      </Box>
    </Box>
  );

  const StoryCard = ({ story }) => (
    <Box
      sx={{
        background: 'var(--charcoal)',
        border: '1px solid var(--gunmetal)',
        borderRadius: 0,
        p: { xs: 3, md: 4 },
        height: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: 'var(--primary-text)',
            fontWeight: 700,
            mb: 1,
          }}
        >
          {story.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'var(--primary-text)',
            fontWeight: 500,
          }}
        >
          {story.role}
        </Typography>
      </Box>

      {story.steps.map((step, index) => (
        <TimelineStep
          key={index}
          step={step}
          index={index}
          isLast={index === story.steps.length - 1}
        />
      ))}
    </Box>
  );

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box
        id="stories"
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
              y: [0, 12, 0],
              rotate: [-15, -10, -15],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              width: '600px',
              height: '150px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))',
              filter: 'blur(1px)',
              opacity: 0.6,
              left: '-20%',
              top: '10%',
              transform: 'rotate(-15deg)',
            }}
          />
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [20, 25, 20],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              width: '450px',
              height: '110px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.05))',
              filter: 'blur(1px)',
              opacity: 0.6,
              right: '-15%',
              bottom: '20%',
              transform: 'rotate(20deg)',
            }}
          />
        </Box>
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
            <Typography
              variant="h2"
              sx={{
                color: 'var(--primary-text)',
                fontWeight: 700,
                mb: { xs: 2, md: 3 },
              }}
            >
              From Vulnerable to Future-Proof
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
              Real transformation stories from professionals who future-proofed their careers with our platform.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {stories.map((story, index) => (
              <Grid item xs={12} md={6} key={index}>
                <StoryCard story={story} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default SuccessStories;