'use client';
import { Box, Container, Typography, Paper, Avatar, Button, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, LinkedIn, GitHub, Email } from '@mui/icons-material';
import Navigation from '@/components/ui/Navigation';
import SkillChip from '@/components/ui/SkillChip';
import { useState } from 'react';

const skills = ['JavaScript', 'React', 'Python', 'AWS', 'Docker', 'Machine Learning'];
const achievements = [
  { title: 'Full-Stack Developer', date: '2024', issuer: 'ReskillingPro' },
  { title: 'AWS Solutions Architect', date: '2023', issuer: 'Amazon' },
  { title: 'Data Science Specialist', date: '2023', issuer: 'Google' },
];

export default function ProfilePage() {
  const [selectedSkills, setSelectedSkills] = useState(['JavaScript', 'React', 'Python']);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <>
      <Navigation />
      <Box sx={{ pt: 10, pb: 8, background: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Paper
              sx={{
                p: 4,
                mb: 4,
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    fontSize: '3rem',
                  }}
                >
                  A
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    Alex Johnson
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                    Full-Stack Developer & AI Enthusiast
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button startIcon={<LinkedIn />} size="small">LinkedIn</Button>
                    <Button startIcon={<GitHub />} size="small">GitHub</Button>
                    <Button startIcon={<Email />} size="small">Contact</Button>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                  }}
                >
                  Edit Profile
                </Button>
              </Box>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                Passionate developer with 5+ years of experience building scalable web applications. 
                Currently exploring AI/ML technologies and cloud architecture. Love mentoring junior developers 
                and contributing to open-source projects.
              </Typography>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map((skill) => (
                      <SkillChip
                        key={skill}
                        label={skill}
                        selected={selectedSkills.includes(skill)}
                        onToggle={() => toggleSkill(skill)}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Achievements
                  </Typography>
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Box sx={{ mb: 2, p: 2, borderRadius: 2, background: 'rgba(255,255,255,0.03)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {achievement.issuer} • {achievement.date}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}