'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Card, Avatar, CircularProgress } from '@mui/material';
import { School, PlayArrow, Person, Code, ArrowForward } from '@mui/icons-material';

const LearningPage = () => {
  const router = useRouter();
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [progress, setProgress] = useState(65);

  const courses = [
    { id: 1, title: 'Python Fundamentals', duration: '4 weeks', progress: 80, color: '#00D4FF' },
    { id: 2, title: 'Machine Learning Basics', duration: '6 weeks', progress: 45, color: '#A855F7' },
    { id: 3, title: 'Data Science Projects', duration: '8 weeks', progress: 20, color: '#FBBF24' }
  ];

  const projects = [
    { id: 1, title: 'AI Chatbot Development', tech: 'Python, NLP', difficulty: 'Intermediate' },
    { id: 2, title: 'Blockchain Voting System', tech: 'Solidity, Web3', difficulty: 'Advanced' },
    { id: 3, title: 'ML Prediction Model', tech: 'TensorFlow, Python', difficulty: 'Beginner' }
  ];

  const mentors = [
    { id: 1, name: 'Dr. Sarah Chen', expertise: 'AI/ML Expert', company: 'Google', rating: 4.9 },
    { id: 2, name: 'Alex Rodriguez', expertise: 'Blockchain Developer', company: 'Ethereum', rating: 4.8 },
    { id: 3, name: 'Maya Patel', expertise: 'Data Scientist', company: 'Netflix', rating: 4.9 }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', color: '#fff' }}>
      <Box sx={{ 
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
        p: 3
      }}>
        <Box sx={{ maxWidth: '1400px', mx: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ 
            color: '#00D4FF', 
            fontWeight: 800,
            background: 'linear-gradient(45deg, #00D4FF, #A855F7)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            NAVOTHHAN
          </Typography>
          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            Step 2: Interactive Skill Building
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <School sx={{ fontSize: 80, color: '#A855F7', mb: 2 }} />
            <Typography variant="h2" sx={{
              fontWeight: 800,
              color: '#ffffff',
              textShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
              mb: 2
            }}>
              Interactive Skill Building
            </Typography>
          </Box>
        </motion.div>

        {/* Progress Overview */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)', mb: 3 }}>
            Overall Progress
          </Typography>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={120}
              thickness={6}
              sx={{
                color: '#A855F7',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                }
              }}
            />
            <Box sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {progress}%
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Interactive Courses */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)', mb: 3 }}>
            Interactive Courses
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setHoveredCourse(course.id)}
                onHoverEnd={() => setHoveredCourse(null)}
              >
                <Card sx={{
                  background: `rgba(${course.color === '#00D4FF' ? '0,212,255' : course.color === '#A855F7' ? '168,85,247' : '251,191,36'},0.1)`,
                  border: `1px solid ${course.color}40`,
                  borderRadius: 3,
                  p: 3,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {hoveredCourse === course.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(45deg, ${course.color}20, transparent)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PlayArrow sx={{ fontSize: 60, color: course.color }} />
                    </motion.div>
                  )}
                  <Typography variant="h6" sx={{ color: course.color, fontWeight: 600, mb: 2 }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e2e8f0', mb: 2 }}>
                    Duration: {course.duration}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1, height: 8 }}>
                      <Box sx={{
                        width: `${course.progress}%`,
                        height: '100%',
                        background: course.color,
                        borderRadius: 1
                      }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: course.color }}>
                      {course.progress}%
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Card>

        {/* Project Showcase */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)', mb: 3 }}>
            Hands-on Projects
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ rotateY: 10, scale: 1.02 }}
                style={{ perspective: 1000 }}
              >
                <Card sx={{
                  background: 'rgba(251, 191, 36, 0.1)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: 3,
                  p: 3,
                  cursor: 'pointer'
                }}>
                  <Code sx={{ fontSize: 40, color: '#FBBF24', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#FBBF24', fontWeight: 600, mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e2e8f0', mb: 1 }}>
                    Tech: {project.tech}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Level: {project.difficulty}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Card>

        {/* Mentorship */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 6
        }}>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)', mb: 3 }}>
            Expert Mentors
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {mentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                whileHover={{ scale: 1.05 }}
              >
                <Card sx={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 3,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <Avatar sx={{ 
                    width: 60, 
                    height: 60, 
                    mx: 'auto', 
                    mb: 2,
                    background: 'linear-gradient(45deg, #10B981, #059669)'
                  }}>
                    <Person sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#10B981', fontWeight: 600, mb: 1 }}>
                    {mentor.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e2e8f0', mb: 1 }}>
                    {mentor.expertise}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    {mentor.company} • ⭐ {mentor.rating}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Card>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => router.push('/navothhan/certification')}
            sx={{
              px: 8,
              py: 3,
              fontSize: '1.3rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #A855F7, #FBBF24)',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 40px rgba(168, 85, 247, 0.4)'
              }
            }}
          >
            Continue to Certification
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LearningPage;