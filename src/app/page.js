'use client';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import PowerfulHero from '@/components/ui/PowerfulHero';
import LearningSlideshow from '@/components/ui/LearningSlideshow';
import StepperWizard from '@/components/ui/StepperWizard';
import SkillChip from '@/components/ui/SkillChip';
import { useState } from 'react';

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  
  const skills = ['JavaScript', 'React', 'Python', 'AI/ML', 'Cloud Computing', 'DevOps'];
  
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
      <PowerfulHero />
      
      <Box sx={{ py: 8, background: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 800 }}>
              Learning Paths
            </Typography>
            <LearningSlideshow />
          </motion.div>
        </Container>
      </Box>
      
      <Box sx={{ py: 8, background: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 800 }}>
              Your Learning Journey
            </Typography>
            <StepperWizard />
          </motion.div>
        </Container>
      </Box>
      
      <Box sx={{ py: 8, background: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800 }}>
              Choose Your Skills
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
              Select the skills you want to learn or improve
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {skills.map((skill) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  selected={selectedSkills.includes(skill)}
                  onToggle={() => toggleSkill(skill)}
                />
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}