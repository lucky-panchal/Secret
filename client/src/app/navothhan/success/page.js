'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Card, Avatar } from '@mui/material';
import { EmojiEvents, Person, TrendingUp, Home } from '@mui/icons-material';

const SuccessPage = () => {
  const router = useRouter();
  const [hoveredStory, setHoveredStory] = useState(null);

  const successStories = [
    {
      id: 1,
      name: 'Sarah Johnson',
      before: 'Marketing Coordinator',
      after: 'AI/ML Engineer',
      company: 'Google',
      timeline: '6 months',
      salaryIncrease: '+150%',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
      color: '#00D4FF',
      testimonial: "KaushalX transformed my career completely. The AI-powered learning path was exactly what I needed to transition from marketing to ML engineering."
    },
    {
      id: 2,
      name: 'Mike Chen',
      before: 'Accountant',
      after: 'Data Scientist',
      company: 'Microsoft',
      timeline: '8 months',
      salaryIncrease: '+120%',
      skills: ['R', 'SQL', 'Statistics', 'Business Intelligence'],
      color: '#A855F7',
      testimonial: "The personalized roadmap and blockchain-verified certifications gave me the credibility I needed to land my dream job at Microsoft."
    },
    {
      id: 3,
      name: 'Priya Sharma',
      before: 'Teacher',
      after: 'Blockchain Developer',
      company: 'Ethereum Foundation',
      timeline: '7 months',
      salaryIncrease: '+180%',
      skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi'],
      color: '#FBBF24',
      testimonial: "From teaching to blockchain development - KaushalX made the impossible possible with their structured learning approach."
    }
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
          <Button
            startIcon={<Home />}
            onClick={() => router.push('/')}
            sx={{
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 2,
              px: 3,
              py: 1,
              '&:hover': {
                background: 'rgba(255,255,255,0.1)',
                borderColor: '#00D4FF'
              }
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <EmojiEvents sx={{ fontSize: 100, color: '#FBBF24', mb: 3 }} />
            <Typography variant="h1" sx={{
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '5rem' },
              background: 'linear-gradient(45deg, #FBBF24, #10B981, #00D4FF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              Success Stories
            </Typography>
            <Typography variant="h4" sx={{ 
              color: '#00D4FF', 
              fontWeight: 400,
              mb: 4
            }}>
              Real People, Real Results
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6
            }}>
              Meet professionals who successfully transformed their careers using our AI-powered reskilling platform. 
              Their journeys prove that with the right guidance, anyone can rebuild their career in emerging technologies.
            </Typography>
          </Box>
        </motion.div>

        {/* Success Stories */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, mb: 8 }}>
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              onHoverStart={() => setHoveredStory(story.id)}
              onHoverEnd={() => setHoveredStory(null)}
            >
              <Card sx={{
                background: `linear-gradient(135deg, ${story.color}10, rgba(255,255,255,0.02))`,
                backdropFilter: 'blur(20px)',
                border: `2px solid ${story.color}40`,
                borderRadius: 4,
                p: 6,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: `2px solid ${story.color}`,
                  boxShadow: `0 20px 40px ${story.color}20`,
                  transform: 'translateY(-5px)'
                }
              }}>
                {/* Floating Skills */}
                {hoveredStory === story.id && (
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                    {story.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ scale: 0, x: Math.random() * 400, y: Math.random() * 300 }}
                        animate={{ 
                          scale: 1,
                          x: Math.random() * 400,
                          y: Math.random() * 300,
                          rotate: 360
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: skillIndex * 0.2
                        }}
                        style={{
                          position: 'absolute',
                          background: `${story.color}30`,
                          border: `1px solid ${story.color}`,
                          borderRadius: '20px',
                          padding: '8px 16px',
                          fontSize: '12px',
                          color: story.color,
                          fontWeight: 600
                        }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </Box>
                )}

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Avatar sx={{
                      width: 120,
                      height: 120,
                      background: `linear-gradient(45deg, ${story.color}, ${story.color}80)`,
                      fontSize: '3rem'
                    }}>
                      <Person sx={{ fontSize: 60 }} />
                    </Avatar>
                    
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography variant="h3" sx={{ 
                        color: story.color, 
                        fontWeight: 800, 
                        mb: 2,
                        fontSize: { xs: '2rem', md: '3rem' }
                      }}>
                        {story.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {story.before}
                        </Typography>
                        <TrendingUp sx={{ color: story.color, fontSize: 30 }} />
                        <Typography variant="h5" sx={{ color: story.color, fontWeight: 600 }}>
                          {story.after}
                        </Typography>
                      </Box>
                      
                      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                        Now at <span style={{ color: story.color, fontWeight: 700 }}>{story.company}</span>
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, 
                    gap: 4, 
                    mb: 4 
                  }}>
                    <Box sx={{
                      background: `${story.color}20`,
                      border: `1px solid ${story.color}40`,
                      borderRadius: 3,
                      p: 3,
                      textAlign: 'center'
                    }}>
                      <Typography variant="h4" sx={{ color: story.color, fontWeight: 800, mb: 1 }}>
                        {story.timeline}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Transformation Timeline
                      </Typography>
                    </Box>
                    
                    <Box sx={{
                      background: `${story.color}20`,
                      border: `1px solid ${story.color}40`,
                      borderRadius: 3,
                      p: 3,
                      textAlign: 'center'
                    }}>
                      <Typography variant="h4" sx={{ color: story.color, fontWeight: 800, mb: 1 }}>
                        {story.salaryIncrease}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Salary Increase
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 3,
                    p: 4,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <Typography variant="h6" sx={{ color: story.color, fontWeight: 600, mb: 2 }}>
                      "
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}>
                      {story.testimonial}
                    </Typography>
                    <Typography variant="h6" sx={{ color: story.color, fontWeight: 600, textAlign: 'right', mt: 2 }}>
                      "
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3, justifyContent: 'center' }}>
                    {story.skills.map((skill) => (
                      <Box key={skill} sx={{
                        background: `${story.color}30`,
                        border: `1px solid ${story.color}`,
                        borderRadius: 2,
                        px: 2,
                        py: 1
                      }}>
                        <Typography variant="body2" sx={{ color: story.color, fontWeight: 600 }}>
                          {skill}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(168, 85, 247, 0.1))',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            borderRadius: 4,
            p: 6,
            textAlign: 'center'
          }}>
            <Typography variant="h2" sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #00D4FF, #A855F7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              Your Success Story Starts Here
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              mb: 6,
              maxWidth: '600px',
              mx: 'auto'
            }}>
              Join thousands of professionals who have successfully transformed their careers with KaushalX's AI-powered reskilling platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/assessment')}
              sx={{
                px: 10,
                py: 4,
                fontSize: '1.5rem',
                fontWeight: 800,
                background: 'linear-gradient(45deg, #00D4FF, #A855F7)',
                borderRadius: 4,
                boxShadow: '0 15px 35px rgba(0, 212, 255, 0.3)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 45px rgba(0, 212, 255, 0.4)'
                }
              }}
            >
              🚀 Start Your Transformation
            </Button>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SuccessPage;