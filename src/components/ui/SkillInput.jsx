import { Card, CardContent, TextField, Chip, Box, Typography } from '@mui/material';
import { useState } from 'react';

export default function SkillInput({ onSkillsChange }) {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addSkill = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newSkills = [...skills, inputValue.trim()];
      setSkills(newSkills);
      setInputValue('');
      onSkillsChange(newSkills);
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    onSkillsChange(newSkills);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>Enter Your Skills</Typography>
        <TextField
          fullWidth
          placeholder="Type a skill and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={addSkill}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => removeSkill(skill)}
              color="primary"
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}