'use client';

import { Grid, Typography, Box } from '@mui/material';
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SkillInput from '../../components/ui/SkillInput';
import JobSuggestions from '../../components/ui/JobSuggestions';

export default function Career() {
  const [skills, setSkills] = useState([]);

  return (
    <DashboardLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          AI-Based Job Role Suggestion
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your skills and get personalized job role recommendations
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SkillInput onSkillsChange={setSkills} />
        </Grid>
        <Grid item xs={12} md={6}>
          <JobSuggestions skills={skills} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}