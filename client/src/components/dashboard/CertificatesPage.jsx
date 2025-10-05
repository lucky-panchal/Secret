'use client';
import { Box, Grid, Card, CardContent, Typography, Chip, Button, Avatar } from '@mui/material';
import { VerifiedUser, Download, Share, School, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const CertificatesPage = ({ onNavigate }) => {
  const { isDark } = useTheme();

  const certificates = [
    {
      id: 1,
      title: 'Advanced React Development',
      issuer: 'KaushalX Academy',
      issueDate: '2024-01-15',
      expiryDate: '2026-01-15',
      credentialId: 'RCT-ADV-2024-001',
      skills: ['React', 'Redux', 'TypeScript', 'Testing'],
      verified: true,
      blockchainHash: '0x1a2b3c4d5e6f...',
      grade: 'A+',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Blockchain Smart Contracts',
      issuer: 'Web3 Institute',
      issueDate: '2024-01-10',
      expiryDate: '2027-01-10',
      credentialId: 'BLC-SMC-2024-002',
      skills: ['Solidity', 'Web3.js', 'DeFi', 'Security'],
      verified: true,
      blockchainHash: '0x2b3c4d5e6f7a...',
      grade: 'A',
      status: 'Active'
    },
    {
      id: 3,
      title: 'AI Prompt Engineering',
      issuer: 'AI Skills Hub',
      issueDate: '2024-01-05',
      expiryDate: '2025-01-05',
      credentialId: 'AI-PE-2024-003',
      skills: ['GPT', 'Prompt Design', 'AI Ethics', 'Automation'],
      verified: true,
      blockchainHash: '0x3c4d5e6f7a8b...',
      grade: 'A+',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Data Science Fundamentals',
      issuer: 'DataTech Academy',
      issueDate: '2023-12-20',
      expiryDate: '2025-12-20',
      credentialId: 'DS-FND-2023-004',
      skills: ['Python', 'Pandas', 'Machine Learning', 'Visualization'],
      verified: true,
      blockchainHash: '0x4d5e6f7a8b9c...',
      grade: 'B+',
      status: 'Active'
    }
  ];

  const handleDownload = (certId) => {
    console.log(`Downloading certificate ${certId}`);
    alert(`Certificate ${certId} downloaded!`);
  };

  const handleShare = (certId) => {
    console.log(`Sharing certificate ${certId}`);
    alert(`Certificate ${certId} shared to LinkedIn!`);
  };

  const handleVerify = (hash) => {
    console.log(`Verifying blockchain hash: ${hash}`);
    alert(`Certificate verified on blockchain: ${hash}`);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A+')) return '#34D399';
    if (grade.includes('A')) return '#00F5FF';
    if (grade.includes('B')) return '#FBBF24';
    return '#94A3B8';
  };

  return (
    <Box sx={{ p: 3, maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8FAFC', mb: 1 }}>
            Blockchain Certificates
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            Your verified achievements secured on the blockchain for lifetime credibility.
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          <Grid container spacing={3}>
            {certificates.map((cert, index) => (
              <Grid item xs={12} md={6} key={cert.id}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 3, height: '100%' }}>
                    {/* Certificate Header */}
                    <Box sx={{ background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', p: 3, borderRadius: '12px 12px 0 0', position: 'relative' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <VerifiedUser sx={{ color: '#ffffff', fontSize: 32 }} />
                        <Chip icon={<Star />} label={cert.grade} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#ffffff', fontWeight: 600 }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', mb: 1 }}>
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {cert.issuer}
                      </Typography>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
                          Credential ID: {cert.credentialId}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
                          Issued: {cert.issueDate} | Expires: {cert.expiryDate}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                          Status: <span style={{ color: '#34D399', fontWeight: 600 }}>{cert.status}</span>
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                          Skills Verified:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {cert.skills.map((skill, idx) => (
                            <Chip key={idx} label={skill} size="small" sx={{ bgcolor: 'rgba(0, 245, 255, 0.1)', color: '#00F5FF', fontSize: '0.7rem' }} />
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Button variant="contained" size="small" startIcon={<Download />} onClick={() => handleDownload(cert.id)} sx={{ background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', textTransform: 'none', flex: 1 }}>
                          Download
                        </Button>
                        <Button variant="outlined" size="small" startIcon={<Share />} onClick={() => handleShare(cert.id)} sx={{ borderColor: 'rgba(0, 245, 255, 0.3)', color: '#00F5FF', textTransform: 'none', flex: 1 }}>
                          Share
                        </Button>
                      </Box>

                      <Button variant="text" size="small" fullWidth onClick={() => handleVerify(cert.blockchainHash)} sx={{ color: '#A855F7', textTransform: 'none', fontSize: '0.8rem' }}>
                        🔗 Verify on Blockchain
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} xl={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Certificate Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                    Certificate Portfolio
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: '#00F5FF' }}>4</Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>Total Certificates</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#34D399' }}>2</Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>A+ Grade</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#FBBF24' }}>100%</Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>Verified</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Blockchain Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                    🔗 Blockchain Security
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2, lineHeight: 1.5 }}>
                    All certificates are secured on Ethereum blockchain, ensuring permanent verification and tamper-proof credentials.
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button variant="outlined" fullWidth sx={{ borderColor: 'rgba(251, 191, 36, 0.3)', color: '#FBBF24', textTransform: 'none' }}>
                      View Blockchain Explorer
                    </Button>
                    <Button variant="text" fullWidth sx={{ color: '#A855F7', textTransform: 'none' }}>
                      Learn About Verification
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CertificatesPage;