import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { Work, School } from '@mui/icons-material';

const jobDatabase = {
  'JavaScript': ['Frontend Developer', 'Full Stack Developer', 'Web Developer'],
  'React': ['React Developer', 'Frontend Developer', 'UI Developer'],
  'Python': ['Backend Developer', 'Data Scientist', 'AI Engineer'],
  'AI': ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist'],
  'ML': ['ML Engineer', 'Data Scientist', 'AI Researcher'],
  'Java': ['Backend Developer', 'Software Engineer', 'Android Developer'],
  'CSS': ['Frontend Developer', 'UI/UX Designer', 'Web Designer']
};

export default function JobSuggestions({ skills }) {
  const getSuggestions = () => {
    const suggestions = new Set();
    skills.forEach(skill => {
      const jobs = jobDatabase[skill] || [];
      jobs.forEach(job => suggestions.add(job));
    });
    return Array.from(suggestions);
  };

  const suggestions = getSuggestions();

  if (skills.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Add skills to see job suggestions
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Work /> Suggested Job Roles
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {suggestions.map((job, index) => (
            <Box key={index} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {job}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip size="small" label="Full-time" />
                <Chip size="small" label="Internship" variant="outlined" />
              </Box>
              <Button variant="outlined" size="small">
                Apply Now
              </Button>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}