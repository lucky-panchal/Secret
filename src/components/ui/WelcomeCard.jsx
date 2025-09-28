import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

export default function WelcomeCard() {
  return (
    <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', color: 'white', border: 'none' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <TrendingUp sx={{ fontSize: 64 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome to Your Drive
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Manage your files, track progress, and collaborate with your team efficiently.
            </Typography>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
                backdropFilter: 'blur(10px)'
              }}
            >
              Upgrade Now
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}