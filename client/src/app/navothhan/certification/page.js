'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Card, Checkbox, LinearProgress } from '@mui/material';
import { Security, CheckCircle, Assignment, Folder, ArrowForward } from '@mui/icons-material';

const CertificationPage = () => {
  const router = useRouter();
  const [completedAssessments, setCompletedAssessments] = useState({});
  const [blockchainValidated, setBlockchainValidated] = useState(false);

  const certificates = [
    { id: 1, title: 'AI/ML Fundamentals', status: 'completed', color: '#00D4FF' },
    { id: 2, title: 'Python Development', status: 'completed', color: '#A855F7' },
    { id: 3, title: 'Data Science Mastery', status: 'in-progress', color: '#FBBF24' },
    { id: 4, title: 'Blockchain Basics', status: 'pending', color: '#10B981' }
  ];

  const assessments = [
    { id: 1, title: 'Python Coding Challenge', duration: '2 hours', difficulty: 'Intermediate' },
    { id: 2, title: 'ML Model Building', duration: '3 hours', difficulty: 'Advanced' },
    { id: 3, title: 'Data Analysis Project', duration: '4 hours', difficulty: 'Expert' }
  ];

  const portfolioProjects = [
    { id: 1, title: 'E-commerce Recommendation System', tech: 'Python, ML, Flask', status: 'completed' },
    { id: 2, title: 'Cryptocurrency Price Predictor', tech: 'TensorFlow, React', status: 'completed' },
    { id: 3, title: 'Smart Contract Voting App', tech: 'Solidity, Web3', status: 'in-progress' }
  ];

  const validateBlockchain = () => {
    setBlockchainValidated(true);
    setTimeout(() => {
      // Simulate blockchain validation animation
    }, 2000);
  };

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
            Step 3: Blockchain-Verified Credentials
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
            <Security sx={{ fontSize: 80, color: '#FBBF24', mb: 2 }} />
            <Typography variant="h2" sx={{
              fontWeight: 800,
              color: '#ffffff',
              textShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
              mb: 2
            }}>
              Blockchain-Verified Credentials
            </Typography>
          </Box>
        </motion.div>

        {/* Certificates */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ color: '#FBBF24', fontWeight: 600, mb: 3 }}>
            Your Certificates
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                style={{ perspective: 1000 }}
              >
                <Card sx={{
                  background: `linear-gradient(135deg, ${cert.color}20, transparent)`,
                  border: `2px solid ${cert.color}`,
                  borderRadius: 3,
                  p: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(45deg, ${cert.color}10, transparent)`,
                    pointerEvents: 'none'
                  }
                }}>
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ color: cert.color, fontWeight: 700 }}>
                        {cert.title}
                      </Typography>
                      {cert.status === 'completed' && (
                        <CheckCircle sx={{ color: cert.color, fontSize: 30 }} />
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      textTransform: 'capitalize',
                      mb: 2
                    }}>
                      Status: {cert.status.replace('-', ' ')}
                    </Typography>
                    {cert.status === 'completed' && (
                      <Box sx={{
                        background: `${cert.color}20`,
                        border: `1px solid ${cert.color}40`,
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center'
                      }}>
                        <Typography variant="body2" sx={{ color: cert.color, fontWeight: 600 }}>
                          🔗 Blockchain Verified
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Card>

        {/* Blockchain Validation */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h5" sx={{ color: '#10B981', fontWeight: 600, mb: 3 }}>
            Blockchain Validation
          </Typography>
          {!blockchainValidated ? (
            <Button
              variant="contained"
              onClick={validateBlockchain}
              sx={{
                px: 6,
                py: 2,
                background: 'linear-gradient(45deg, #10B981, #059669)',
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              🔗 Validate Credentials on Blockchain
            </Button>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid #10B981',
                borderRadius: 3,
                p: 3,
                display: 'inline-block'
              }}>
                <CheckCircle sx={{ fontSize: 60, color: '#10B981', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#10B981', fontWeight: 600 }}>
                  Credentials Successfully Validated!
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Hash: 0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b
                </Typography>
              </Box>
            </motion.div>
          )}
        </Card>

        {/* Assessments */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ color: '#A855F7', fontWeight: 600, mb: 3 }}>
            Skill Assessments
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {assessments.map((assessment) => (
              <Box key={assessment.id} sx={{
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <Checkbox
                  checked={completedAssessments[assessment.id] || false}
                  onChange={(e) => setCompletedAssessments({
                    ...completedAssessments,
                    [assessment.id]: e.target.checked
                  })}
                  sx={{ color: '#A855F7' }}
                />
                <Assignment sx={{ color: '#A855F7', fontSize: 30 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: '#A855F7', fontWeight: 600 }}>
                    {assessment.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {assessment.duration} • {assessment.difficulty}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Card>

        {/* Portfolio */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 6
        }}>
          <Typography variant="h5" sx={{ color: '#00D4FF', fontWeight: 600, mb: 3 }}>
            Project Portfolio
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {portfolioProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.05 }}
              >
                <Card sx={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: 3,
                  p: 3
                }}>
                  <Folder sx={{ fontSize: 40, color: '#00D4FF', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#00D4FF', fontWeight: 600, mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                    {project.tech}
                  </Typography>
                  <Box sx={{
                    background: project.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                    border: `1px solid ${project.status === 'completed' ? '#10B981' : '#FBBF24'}`,
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    display: 'inline-block'
                  }}>
                    <Typography variant="body2" sx={{ 
                      color: project.status === 'completed' ? '#10B981' : '#FBBF24',
                      textTransform: 'capitalize'
                    }}>
                      {project.status.replace('-', ' ')}
                    </Typography>
                  </Box>
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
            onClick={() => router.push('/navothhan/placement')}
            sx={{
              px: 8,
              py: 3,
              fontSize: '1.3rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FBBF24, #10B981)',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 40px rgba(251, 191, 36, 0.4)'
              }
            }}
          >
            Continue to Job Placement
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CertificationPage;