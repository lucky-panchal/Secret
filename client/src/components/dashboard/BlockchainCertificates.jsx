'use client';
import { Card, CardContent, Box, Typography, Button, Chip, IconButton } from '@mui/material';
import { VerifiedUser, Download, Share } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const BlockchainCertificates = () => {
  const { isDark } = useTheme();

  const certificates = [
    {
      id: 1,
      title: 'React Developer Certification',
      issueDate: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      title: 'JavaScript Advanced Certification',
      issueDate: '2023-12-10',
      verified: true
    }
  ];

  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          borderRadius: 3,
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)',
          height: '100%'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#F8FAFC',
              mb: 3
            }}
          >
            Blockchain Certificates
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {certificates.map((cert, index) => (
              <Box key={cert.id}>
                <Box 
                  sx={{ 
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                    borderRadius: 2,
                    p: 2.5,
                    background: 'rgba(15, 15, 35, 0.6)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <VerifiedUser sx={{ color: '#FBBF24', fontSize: 24 }} />
                      <Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 600,
                            color: '#F8FAFC',
                            mb: 0.5
                          }}
                        >
                          {cert.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#94A3B8'
                          }}
                        >
                          Issued: {cert.issueDate}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Chip 
                      label="Verified on Blockchain" 
                      size="small"
                      sx={{
                        background: 'rgba(251, 191, 36, 0.2)',
                        color: '#FBBF24',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Download />}
                      sx={{
                        borderColor: 'rgba(251, 191, 36, 0.3)',
                        color: '#F8FAFC',
                        '&:hover': {
                          borderColor: '#FBBF24',
                          color: '#FBBF24',
                          boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)'
                        }
                      }}
                    >
                      Download
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Share />}
                      sx={{
                        borderColor: 'rgba(168, 85, 247, 0.3)',
                        color: '#F8FAFC',
                        '&:hover': {
                          borderColor: '#A855F7',
                          color: '#A855F7',
                          boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)'
                        }
                      }}
                    >
                      Share
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlockchainCertificates;