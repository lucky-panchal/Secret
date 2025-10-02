
'use client';
import { Box, Container, Typography, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, School, Business, Security, TrendingUp } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

const BusinessModel = () => {
  const { isDark } = useTheme();

  const businessPoints = [
    {
      icon: CheckCircle,
      title: 'Freemium Model',
      description: 'Free basic courses with premium advanced content and personalized mentoring',
    },
    {
      icon: TrendingUp,
      title: 'Placement Fees',
      description: 'Success-based revenue from job placement partnerships with global employers',
    },
    {
      icon: Business,
      title: 'Corporate Training',
      description: 'Enterprise reskilling solutions for companies adapting to digital transformation',
    },
    {
      icon: Security,
      title: 'Insurance Partnerships',
      description: 'Collaboration with insurers to provide reskilling coverage for displaced workers',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const visionVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box
        id="business"
        sx={{
          py: { xs: 6, md: 10 },
          background: 'var(--background)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >


        {/* Subtle Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--gradient-secondary)',
            opacity: 0.02,
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            {/* Left Column - Business Model */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      mb: { xs: 2, md: 3 },
                    }}
                  >
                    Sustainable Business Model
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'var(--text-secondary)',
                      mb: { xs: 3, md: 4 },
                      lineHeight: 1.6,
                    }}
                  >
                    Our multi-revenue approach ensures platform sustainability while keeping education accessible.
                  </Typography>
                </motion.div>

                <List sx={{ p: 0 }}>
                  {businessPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      custom={index}
                    >
                      <ListItem
                        sx={{
                          px: 0,
                          py: 2,
                          alignItems: 'flex-start',
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 48, mt: 0.5 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              background: 'var(--gradient-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <point.icon
                              sx={{
                                fontSize: 20,
                                color: 'white',
                              }}
                            />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'var(--text-primary)',
                                fontWeight: 600,
                                mb: 0.5,
                              }}
                            >
                              {point.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'var(--text-secondary)',
                                lineHeight: 1.5,
                              }}
                            >
                              {point.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </motion.div>
            </Grid>

            {/* Right Column - Vision */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={visionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <Box
                  sx={{
                    background: 'var(--background)',
                    borderRadius: 3,
                    p: { xs: 4, md: 6 },
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  }}
                >


                  <School
                    sx={{
                      fontSize: { xs: 60, md: 80 },
                      color: 'var(--primary)',
                      mb: 3,
                    }}
                  />

                  <Typography
                    variant="h3"
                    sx={{
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      mb: 3,
                      lineHeight: 1.2,
                    }}
                  >
                    Our Vision
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                      lineHeight: 1.4,
                      mb: 3,
                    }}
                  >
                    "Establishing the world's first{' '}
                    <Box
                      component="span"
                      sx={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontWeight: 700,
                      }}
                    >
                      AI-Driven Reskilling University
                    </Box>
                    ."
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      maxWidth: '400px',
                      mx: 'auto',
                    }}
                  >
                    Where every individual, regardless of background, can transform their career and secure their future in the evolving digital economy.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default BusinessModel;