'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Card, Switch, Chip, LinearProgress } from '@mui/material';
import { Timeline, Delete, TrendingUp, CheckCircle, ArrowForward } from '@mui/icons-material';

const RoadmapPage = () => {
  const router = useRouter();
  const [removedSkills, setRemovedSkills] = useState({});
  const [selectedTrending, setSelectedTrending] = useState({});

  const outdatedSkills = [
    'jQuery', 'Flash', 'Internet Explorer Support', 'PHP 5', 'MySQL 5.0', 'FTP Deployment'
  ];

  const trendingSkills = [
    { name: 'Python', demand: 95, color: '#00D4FF' },
    { name: 'Machine Learning', demand: 92, color: '#A855F7' },
    { name: 'Cloud Computing', demand: 88, color: '#FBBF24' },
    { name: 'Blockchain', demand: 85, color: '#10B981' },
    { name: 'Data Science', demand: 90, color: '#EC4899' },
    { name: 'AI/Neural Networks', demand: 94, color: '#8B5CF6' }
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
          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            Step 1: Your Custom Learning Path
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
            <Timeline sx={{ fontSize: 80, color: '#00D4FF', mb: 2 }} />
            <Typography variant="h2" sx={{
              fontWeight: 800,
              color: '#ffffff',
              textShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
              mb: 2
            }}>
              Your Custom Learning Path
            </Typography>
          </Box>
        </motion.div>

        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Delete sx={{ fontSize: 40, color: '#ff4444', mr: 2 }} />
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
              Remove Outdated Skills
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {outdatedSkills.map((skill) => (
              <Box key={skill} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={skill}
                  sx={{
                    background: 'rgba(255, 68, 68, 0.1)',
                    color: '#ff4444',
                    border: '1px solid rgba(255, 68, 68, 0.3)'
                  }}
                />
                <Switch
                  onChange={(e) => setRemovedSkills({...removedSkills, [skill]: e.target.checked})}
                  sx={{
                    '& .MuiSwitch-thumb': { background: '#ff4444' },
                    '& .MuiSwitch-track': { background: 'rgba(255, 68, 68, 0.3)' }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Card>

        <Card sx={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: 4,
          p: 4,
          mb: 6
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TrendingUp sx={{ fontSize: 40, color: '#00D4FF', mr: 2 }} />
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
              Add Trending Skills
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {trendingSkills.map((skill) => (
              <Card key={skill.name} sx={{
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: 3,
                p: 3,
                cursor: 'pointer'
              }}
              onClick={() => setSelectedTrending({...selectedTrending, [skill.name]: !selectedTrending[skill.name]})}
              >
                <Typography variant="h6" sx={{ color: skill.color, fontWeight: 600, mb: 2 }}>
                  {skill.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={skill.demand}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: skill.color,
                      borderRadius: 3
                    }
                  }}
                />
                {selectedTrending[skill.name] && (
                  <CheckCircle sx={{ color: skill.color, fontSize: 24, mt: 1 }} />
                )}
              </Card>
            ))}
          </Box>
        </Card>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => router.push('/navothhan/learning')}
            sx={{
              px: 8,
              py: 3,
              fontSize: '1.3rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00D4FF, #A855F7)',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 40px rgba(0, 212, 255, 0.4)'
              }
            }}
          >
            Continue to Learning Phase
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RoadmapPage;