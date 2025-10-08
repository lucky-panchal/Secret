'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Card, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Work, TrendingUp, Psychology, Support, ExpandMore, ArrowForward } from '@mui/icons-material';

const PlacementPage = () => {
  const router = useRouter();
  const [currentMatch, setCurrentMatch] = useState(0);

  const jobMatches = [
    { 
      skill: 'Python + ML', 
      job: 'AI Engineer', 
      company: 'Google', 
      salary: '$120K', 
      match: 95,
      color: '#00D4FF'
    },
    { 
      skill: 'Data Science', 
      job: 'Data Scientist', 
      company: 'Netflix', 
      salary: '$110K', 
      match: 92,
      color: '#A855F7'
    },
    { 
      skill: 'Blockchain', 
      job: 'Blockchain Developer', 
      company: 'Ethereum', 
      salary: '$130K', 
      match: 88,
      color: '#FBBF24'
    }
  ];

  const interviewPrep = [
    { title: 'Technical Coding Interview', duration: '2 hours', topics: ['Algorithms', 'Data Structures', 'System Design'] },
    { title: 'ML/AI Concepts Interview', duration: '1.5 hours', topics: ['Neural Networks', 'Model Training', 'Feature Engineering'] },
    { title: 'Behavioral Interview', duration: '1 hour', topics: ['Leadership', 'Problem Solving', 'Team Collaboration'] }
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
            KaushalX
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Step 4: Connect with Employers
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
            <Work sx={{ fontSize: 80, color: '#10B981', mb: 2 }} />
            <Typography variant="h2" sx={{
              fontWeight: 800,
              color: '#ffffff',
              textShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
              mb: 2
            }}>
              Connect with Employers
            </Typography>
          </Box>
        </motion.div>

        {/* AI Job Matching */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)', mb: 3 }}>
            AI-Powered Job Matching
          </Typography>
          <Box sx={{ position: 'relative', height: 300, overflow: 'hidden' }}>
            {jobMatches.map((match, index) => (
              <motion.div
                key={index}
                initial={{ x: index === 0 ? 0 : 300, opacity: index === 0 ? 1 : 0 }}
                animate={{ 
                  x: index === currentMatch ? 0 : index < currentMatch ? -300 : 300,
                  opacity: index === currentMatch ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
                style={{ position: 'absolute', width: '100%' }}
              >
                <Card sx={{
                  background: `linear-gradient(135deg, ${match.color}20, transparent)`,
                  border: `2px solid ${match.color}`,
                  borderRadius: 3,
                  p: 4,
                  textAlign: 'center'
                }}>
                  <Typography variant="h4" sx={{ color: match.color, fontWeight: 700, mb: 2 }}>
                    {match.skill} → {match.job}
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                    {match.company}
                  </Typography>
                  <Typography variant="h6" sx={{ color: match.color, mb: 2 }}>
                    {match.salary} • {match.match}% Match
                  </Typography>
                  <Box sx={{
                    background: `${match.color}20`,
                    borderRadius: 2,
                    p: 2,
                    mt: 2
                  }}>
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                      Perfect fit based on your skills and interests!
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
            {jobMatches.map((_, index) => (
              <Button
                key={index}
                variant={index === currentMatch ? 'contained' : 'outlined'}
                onClick={() => setCurrentMatch(index)}
                sx={{
                  minWidth: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: index === currentMatch ? '#10B981' : 'transparent',
                  borderColor: '#10B981'
                }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Card>

        {/* Interview Preparation */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)', mb: 3 }}>
            Interview Preparation
          </Typography>
          {interviewPrep.map((prep, index) => (
            <Accordion key={index} sx={{
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: 2,
              mb: 2,
              '&:before': { display: 'none' }
            }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#A855F7' }} />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Psychology sx={{ color: '#A855F7' }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#A855F7', fontWeight: 600 }}>
                      {prep.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Duration: {prep.duration}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {prep.topics.map((topic, topicIndex) => (
                    <Box key={topicIndex} sx={{
                      background: 'rgba(168, 85, 247, 0.2)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      borderRadius: 1,
                      px: 2,
                      py: 1
                    }}>
                      <Typography variant="body2" sx={{ color: '#A855F7' }}>
                        {topic}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>

        {/* Salary Negotiation */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TrendingUp sx={{ fontSize: 40, color: '#FBBF24' }} />
            <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Salary Negotiation Coach
            </Typography>
          </Box>
          <Box sx={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: 3,
            p: 3
          }}>
            <Typography variant="h6" sx={{ color: '#FBBF24', fontWeight: 600, mb: 2 }}>
              Your Market Value: $95K - $135K
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
              Based on your skills in AI/ML and location, here's your negotiation strategy:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                • Start with $125K as your initial ask
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                • Highlight your blockchain and ML expertise
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                • Mention your portfolio projects as proof of capability
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Continuous Support */}
        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 6,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'linear-gradient(45deg, #00D4FF, #A855F7)',
            color: '#fff',
            px: 3,
            py: 1,
            borderBottomLeftRadius: 3,
            fontWeight: 600
          }}>
            Continuous Support
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Support sx={{ fontSize: 40, color: '#00D4FF' }} />
            <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              We're With You Until Success
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
            Our commitment doesn't end with training. We provide ongoing support until you land your dream job:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {[
              { title: '24/7 Career Support', desc: 'Round-the-clock guidance' },
              { title: 'Interview Coaching', desc: 'Mock interviews & feedback' },
              { title: 'Salary Negotiation', desc: 'Maximize your offer' }
            ].map((support, index) => (
              <Box key={index} sx={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: 2,
                p: 3,
                textAlign: 'center'
              }}>
                <Typography variant="h6" sx={{ color: '#00D4FF', fontWeight: 600, mb: 1 }}>
                  {support.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {support.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => router.push('/navothhan/success')}
            sx={{
              px: 8,
              py: 3,
              fontSize: '1.3rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #10B981, #00D4FF)',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 40px rgba(16, 185, 129, 0.4)'
              }
            }}
          >
            View Success Stories
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlacementPage;