'use client';
import { Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Navigation />
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        pt: 10,
        pb: 4
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper sx={{ 
              p: { xs: 3, md: 5 }, 
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                mb: 2, 
                color: '#1e293b',
                textAlign: 'center'
              }}>
                Privacy Policy
              </Typography>
              
              <Typography variant="h6" sx={{ 
                color: '#64748b', 
                mb: 4, 
                textAlign: 'center'
              }}>
                Future Work Reskilling Platform (RUTH160)
              </Typography>

              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                Welcome to Future Work Reskilling Platform, the world's first AI-driven reskilling platform. 
                Students enter their skills, and our app suggests suitable job roles or internships. We offer 
                personalized learning paths, blockchain certifications, AI career assessment, micro-learning 
                courses, reskilling token economy, and global job matching.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                1. Data We Collect
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                We collect personal information including your name, email, educational background, skills, 
                career preferences, assessment results, learning progress, and interaction data with our platform.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                2. How We Use Your Data
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                Your data is used to provide personalized job role suggestions, create custom learning paths, 
                generate AI-powered career assessments, match you with relevant opportunities, and improve our 
                platform's effectiveness.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                3. Data Sharing
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                We may share anonymized data with educational partners and employers for job matching purposes. 
                Personal information is only shared with your explicit consent or as required by law.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                4. Blockchain Verification
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                Your certifications and achievements are recorded on blockchain for verification purposes. 
                This creates an immutable record of your credentials that employers can trust.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                5. Third-Party Providers
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                We work with trusted third-party providers for course content, assessment tools, and job 
                matching services. These partners follow strict data protection standards.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                6. Security Practices
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                We implement industry-standard security measures including encryption, secure servers, 
                regular security audits, and access controls to protect your personal information.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                7. Your Rights
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                You have the right to access, update, delete your personal data, and withdraw consent at any time. 
                Contact us to exercise these rights or for any privacy-related concerns.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                8. Cookies and Tracking
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can manage cookie preferences in your browser settings.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                9. Children's Privacy
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                Our platform is designed for students and young professionals. For users under 18, we require 
                parental consent and implement additional privacy protections as required by applicable laws.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                10. International Transfers
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                Your data may be processed in countries other than your own. We ensure appropriate safeguards 
                are in place to protect your information during international transfers.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                11. Policy Updates
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                We may update this Privacy Policy periodically. We'll notify you of significant changes via 
                email or platform notifications. Continued use constitutes acceptance of updated terms.
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                12. Contact Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                For privacy-related questions or concerns, contact us at privacy@futureworkreskilling.com 
                or through our platform's support system.
              </Typography>

              <Box sx={{ 
                p: 3, 
                background: '#f1f5f9', 
                borderRadius: 2, 
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  By using Future Work Reskilling Platform, you consent to this Privacy Policy.
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ 
                mt: 3, 
                textAlign: 'center', 
                color: '#64748b' 
              }}>
                Last updated: {new Date().toLocaleDateString()}
              </Typography>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default PrivacyPolicyPage;