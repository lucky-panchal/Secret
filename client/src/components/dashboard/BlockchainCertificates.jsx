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
          bgcolor: isDark ? '#1e1e1e' : '#ffffff',
          border: `1px solid ${isDark ? '#333333' : '#e5e7eb'}`,
          borderRadius: 3,
          boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.07)',
          height: '100%'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: isDark ? '#ffffff' : '#212121',
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
                    border: `1px solid ${isDark ? '#444444' : '#e5e7eb'}`,
                    borderRadius: 2,
                    p: 2.5,
                    bgcolor: isDark ? '#2a2a2a' : '#f8f9fa'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <VerifiedUser sx={{ color: '#4caf50', fontSize: 24 }} />
                      <Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 600,
                            color: isDark ? '#ffffff' : '#212121',
                            mb: 0.5
                          }}
                        >
                          {cert.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: isDark ? '#b0b0b0' : '#6b7280'
                          }}
                        >
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Chip 
                      label="Verified on Blockchain" 
                      size="small"
                      sx={{
                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                        color: '#4caf50',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
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
                        borderColor: isDark ? '#555555' : '#d1d5db',
                        color: isDark ? '#ffffff' : '#374151',
                        '&:hover': {
                          borderColor: '#1976d2',
                          color: '#1976d2'
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
                        borderColor: isDark ? '#555555' : '#d1d5db',
                        color: isDark ? '#ffffff' : '#374151',
                        '&:hover': {
                          borderColor: '#1976d2',
                          color: '#1976d2'
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