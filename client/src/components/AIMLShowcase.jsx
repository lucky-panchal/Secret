'use client';
import { Box, Container, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Psychology, 
  Security, 
  AccountBalance, 
  TrendingUp, 
  Memory, 
  DataUsage,
  Hub,
  Token
} from '@mui/icons-material';

const AIMLShowcase = () => {
  const technologies = [
    {
      category: 'Artificial Intelligence',
      color: '#00F5FF',
      gradient: 'linear-gradient(135deg, #00F5FF 0%, #0EA5E9 100%)',
      icon: Psychology,
      items: [
        'Neural Networks',
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing',
        'Reinforcement Learning',
        'Generative AI'
      ]
    },
    {
      category: 'Machine Learning',
      color: '#A855F7',
      gradient: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
      icon: Memory,
      items: [
        'Supervised Learning',
        'Unsupervised Learning',
        'Feature Engineering',
        'Model Optimization',
        'Ensemble Methods',
        'AutoML'
      ]
    },
    {
      category: 'Blockchain Technology',
      color: '#FBBF24',
      gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)',
      icon: Security,
      items: [
        'Smart Contracts',
        'DeFi Protocols',
        'Cryptocurrency',
        'NFT Development',
        'Consensus Algorithms',
        'Layer 2 Solutions'
      ]
    },
    {
      category: 'Data Science',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      icon: DataUsage,
      items: [
        'Big Data Analytics',
        'Statistical Modeling',
        'Data Visualization',
        'Predictive Analytics',
        'Time Series Analysis',
        'A/B Testing'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Neural Network Background */}
      <Box
        className="neural-network"
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      {/* Matrix Background */}
      <Box
        className="matrix-bg"
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div variants={cardVariants}>
              <Typography
                variant="h2"
                className="text-hologram"
                sx={{
                  mb: 3,
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '3.5rem' },
                }}
              >
                Future Technologies
              </Typography>
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: 'var(--text-secondary)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Master cutting-edge technologies that are reshaping industries and creating the jobs of tomorrow
              </Typography>
            </motion.div>
          </Box>

          {/* Technology Cards */}
          <Grid container spacing={4}>
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <Grid item xs={12} md={6} key={tech.category}>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card
                      className={`${tech.category.toLowerCase().includes('ai') ? 'ai-card' : 
                                   tech.category.toLowerCase().includes('machine') ? 'ml-card' :
                                   tech.category.toLowerCase().includes('blockchain') ? 'blockchain-card' : 'ai-card'}`}
                      sx={{
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        background: `linear-gradient(135deg, ${tech.color}08 0%, var(--bg-card) 100%)`,
                        border: `2px solid ${tech.color}30`,
                        borderRadius: 4,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: `${tech.color}60`,
                          boxShadow: `0 20px 40px ${tech.color}20`,
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        {/* Category Header */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3,
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 3,
                              background: tech.gradient,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 8px 25px ${tech.color}30`,
                            }}
                          >
                            <IconComponent
                              sx={{
                                fontSize: 32,
                                color: 'white',
                                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                              }}
                            />
                          </Box>
                          
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              fontSize: { xs: '1.25rem', md: '1.5rem' },
                            }}
                          >
                            {tech.category}
                          </Typography>
                        </Box>

                        {/* Technology Items */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1.5,
                          }}
                        >
                          {tech.items.map((item, itemIndex) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                delay: itemIndex * 0.1,
                                duration: 0.3 
                              }}
                              viewport={{ once: true }}
                            >
                              <Chip
                                label={item}
                                sx={{
                                  background: `${tech.color}15`,
                                  color: tech.color,
                                  border: `1px solid ${tech.color}30`,
                                  fontWeight: 600,
                                  fontSize: '0.875rem',
                                  '&:hover': {
                                    background: `${tech.color}25`,
                                    transform: 'translateY(-2px) scale(1.05)',
                                    boxShadow: `0 8px 25px ${tech.color}20`,
                                  },
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                              />
                            </motion.div>
                          ))}
                        </Box>

                        {/* Data Stream Effect */}
                        <Box
                          className="data-stream"
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            background: tech.gradient,
                            opacity: 0.6,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          {/* Stats Section */}
          <motion.div variants={cardVariants}>
            <Box
              sx={{
                mt: 8,
                p: 4,
                borderRadius: 4,
                background: 'var(--gradient-neural)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease-in-out infinite',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    mb: 2,
                    textShadow: '0 0 20px rgba(255,255,255,0.5)',
                  }}
                >
                  Join the Future of Work
                </Typography>
                
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  Master these technologies and become part of the next generation of professionals
                  shaping the digital economy
                </Typography>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                  {[
                    { number: '500K+', label: 'AI Jobs Created' },
                    { number: '$150K', label: 'Average Salary' },
                    { number: '95%', label: 'Job Placement Rate' },
                    { number: '50+', label: 'Partner Companies' },
                  ].map((stat, index) => (
                    <Grid item xs={6} md={3} key={stat.label}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            color: 'white',
                            fontWeight: 800,
                            fontSize: { xs: '1.5rem', md: '2.5rem' },
                            textShadow: '0 0 15px rgba(255,255,255,0.4)',
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'rgba(255,255,255,0.8)',
                            fontWeight: 500,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AIMLShowcase;