'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Container } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { performanceConfig, getDuration } from '@/utils/motionConfig';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    content: 'KaushalX transformed my career from marketing to tech. The AI-powered learning path was perfectly tailored to my needs.',
    avatar: 'SC'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Data Scientist at Microsoft',
    content: 'The mentorship program connected me with industry experts who guided me every step of the way. Incredible experience!',
    avatar: 'MR'
  },
  {
    name: 'Priya Sharma',
    role: 'Cloud Architect at AWS',
    content: 'From zero coding experience to landing my dream job in 6 months. The community support was amazing throughout.',
    avatar: 'PS'
  },
  {
    name: 'David Kim',
    role: 'DevOps Engineer at Netflix',
    content: 'The hands-on projects and real-world scenarios prepared me perfectly for my current role. Highly recommend!',
    avatar: 'DK'
  },
  {
    name: 'Lisa Wang',
    role: 'Product Manager at Meta',
    content: 'Switched from finance to tech seamlessly. The career transition support was exceptional and truly life-changing.',
    avatar: 'LW'
  }
];

const TestimonialCarousel = ({ isDark }) => {
  const [rotation, setRotation] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  
  const radius = 450;
  const itemCount = testimonials.length;
  const angleStep = 360 / itemCount;

  // Optimized rotation animation
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setRotation(prev => prev + angleStep);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [angleStep, shouldReduceMotion]);

  const containerVariants = useMemo(() => ({
    animate: {
      rotateY: shouldReduceMotion ? 0 : rotation,
      transition: {
        duration: getDuration(shouldReduceMotion, 1.5),
        ease: "easeInOut"
      }
    }
  }), [rotation, shouldReduceMotion]);

  const cardVariants = useMemo(() => ({
    hover: {
      scale: shouldReduceMotion ? 1 : 1.05,
      y: shouldReduceMotion ? 0 : -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }), [shouldReduceMotion]);

  const textContainerVariants = useMemo(() => ({
    animate: {
      rotateY: shouldReduceMotion ? 0 : -rotation,
      transition: {
        duration: getDuration(shouldReduceMotion, 1.5),
        ease: "easeInOut"
      }
    }
  }), [rotation, shouldReduceMotion]);

  return (
    <Box sx={{ 
      position: 'relative', 
      height: '400px', 
      overflow: 'hidden',
      perspective: '1200px',
      perspectiveOrigin: 'center center'
    }}>
      <motion.div
        variants={containerVariants}
        animate="animate"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          ...performanceConfig.hardwareAcceleration
        }}
      >
        {testimonials.map((testimonial, index) => {
          const angle = index * angleStep;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '320px',
                height: '280px',
                marginLeft: '-160px',
                marginTop: '-140px',
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
                ...performanceConfig.optimizedTransform
              }}
            >
              <Card sx={{
                height: '100%',
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(78,205,196,0.15) 0%, rgba(255,107,107,0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(78,205,196,0.08) 100%)',
                backdropFilter: 'blur(20px)',
                border: isDark 
                  ? '2px solid rgba(78,205,196,0.4)' 
                  : '2px solid rgba(78,205,196,0.3)',
                borderRadius: 4,
                boxShadow: isDark 
                  ? '0 15px 35px rgba(78,205,196,0.3)'
                  : '0 15px 35px rgba(78,205,196,0.2)',
                cursor: 'pointer',
                ...performanceConfig.hardwareAcceleration
              }}>
                {/* Counter-rotating content to keep text front-facing */}
                <motion.div
                  variants={textContainerVariants}
                  animate="animate"
                  style={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    ...performanceConfig.optimizedTransform
                  }}
                >
                  <CardContent sx={{ 
                    p: 3, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    transform: 'translateZ(1px)'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ 
                        width: 45, 
                        height: 45, 
                        background: '#ffd700', 
                        color: '#000', 
                        fontWeight: 'bold',
                        mr: 2,
                        fontSize: '0.9rem'
                      }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700, 
                          color: isDark ? 'white' : '#2c1810', 
                          fontSize: '1rem',
                          lineHeight: 1.2
                        }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#4ecdc4', 
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(44,24,16,0.9)',
                      lineHeight: 1.5,
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}>
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default TestimonialCarousel;