'use client';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';
import { Shield, Database, Share2, Lock, Cookie, Mail } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

const sections = [
  {
    icon: <Database size={24} />,
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support."
  },
  {
    icon: <Shield size={24} />,
    title: "How We Use Your Information", 
    content: "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you."
  },
  {
    icon: <Share2 size={24} />,
    title: "Information Sharing",
    content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy."
  },
  {
    icon: <Lock size={24} />,
    title: "Data Security",
    content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
  },
  {
    icon: <Cookie size={24} />,
    title: "Cookies",
    content: "We use cookies to enhance your experience on our platform. You can choose to disable cookies through your browser settings."
  },
  {
    icon: <Mail size={24} />,
    title: "Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at privacy@kaushalx.com"
  }
];

export default function PrivacyPolicyPage() {
  const { isDark } = useTheme();

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box sx={{ 
        pt: 12, 
        pb: 4, 
        background: '#000000', 
        minHeight: '100vh' 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'var(--text-primary)', textAlign: 'center' }}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-secondary)', textAlign: 'center', mb: 4 }}>
            
          </Typography>
          
          <Grid container spacing={3}>
            {sections.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <GlowCard 
                  glowColor={index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'purple' : 'green'} 
                  customSize 
                  width="100%" 
                  height="250px"
                  className="!rounded-none !aspect-auto"
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'var(--ai-neural)', mr: 2 }}>
                      {section.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {section.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    {section.content}
                  </Typography>
                </GlowCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}