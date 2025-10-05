'use client';
import { Box, Container, Typography, Paper } from '@mui/material';
import MenuBar from './MenuBar';

const MenuBarDemo = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <MenuBar />
      
      {/* Demo Content Sections */}
      <Box id="home" sx={{ pt: 12, pb: 8 }}>
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h2" gutterBottom>
              Welcome to KaushalX
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Professional Landing Page Menu Bar Demo
            </Typography>
          </Paper>
        </Container>
      </Box>

      <Box id="features" sx={{ py: 8, bgcolor: 'action.hover' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" gutterBottom>
            Features Section
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            This is the features section. The menu bar remains fixed at the top with smooth scrolling navigation.
          </Typography>
        </Container>
      </Box>

      <Box id="stories" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" gutterBottom>
            Success Stories Section
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Success stories content goes here. Notice how the menu bar adapts to different screen sizes.
          </Typography>
        </Container>
      </Box>

      <Box id="business" sx={{ py: 8, bgcolor: 'action.hover' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" gutterBottom>
            Business Model Section
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Business model information. The theme toggle smoothly switches between light and dark modes.
          </Typography>
        </Container>
      </Box>

      <Box id="contact" sx={{ py: 8, pb: 12 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" gutterBottom>
            Contact Section
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Contact information and forms. The menu bar maintains its professional appearance across all sections.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MenuBarDemo;