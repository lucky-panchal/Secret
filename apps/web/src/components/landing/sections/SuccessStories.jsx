'use client';
import { Box, Container, Typography, Grid, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, School, Work } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

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

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const TimelineStep = ({ step, index, isLast }) => (
    <motion.div
      custom={index}
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
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
              background: 'var(--border)',
              zIndex: 0,
            }}
          />
        )}

        {/* Icon */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: step.status === 'completed' ? 'var(--success)' : 'var(--border)',
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
              color: step.status === 'completed' ? 'white' : 'var(--text-secondary)',
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, pt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'var(--text-primary)',
              fontWeight: 600,
              mb: 1,
            }}
          >
            {step.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {step.description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );

  const StoryCard = ({ story }) => (
    <Box
      sx={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 2,
        p: { xs: 3, md: 4 },
        height: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: 'var(--text-primary)',
            fontWeight: 700,
            mb: 1,
          }}
        >
          {story.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'var(--primary)',
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
          background: 'var(--background)',
          position: 'relative',
        }}
      >
        {/* Background Gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--gradient-primary)',
            opacity: 0.03,
            zIndex: 0,
          }}
        />

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
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                }}
              >
                From Vulnerable to Future-Proof
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'var(--text-secondary)',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Real transformation stories from professionals who future-proofed their careers with our platform.
              </Typography>
            </Box>
          </motion.div>

          {/* Stories */}
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