'use client';
import { Box, Grid, Card, CardContent, Typography, Chip, Button, Avatar, TextField, InputAdornment } from '@mui/material';
import { Work, LocationOn, AttachMoney, Search, Bookmark, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const JobsPage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Jobs');

  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$80k - $120k',
      type: 'Full-time',
      experience: '3-5 years',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      match: 95,
      posted: '2 days ago',
      applicants: 23,
      description: 'Join our innovative team building next-generation web applications with cutting-edge technologies.',
      remote: true,
      trending: true
    },
    {
      id: 2,
      title: 'Blockchain Developer',
      company: 'CryptoTech Solutions',
      location: 'San Francisco, CA',
      salary: '$90k - $140k',
      type: 'Full-time',
      experience: '2-4 years',
      skills: ['Solidity', 'Web3.js', 'Smart Contracts', 'DeFi'],
      match: 88,
      posted: '1 day ago',
      applicants: 15,
      description: 'Build the future of decentralized finance with our expert blockchain development team.',
      remote: false,
      trending: true
    },
    {
      id: 3,
      title: 'AI/ML Engineer',
      company: 'DataMind AI',
      location: 'New York, NY',
      salary: '$100k - $150k',
      type: 'Full-time',
      experience: '3-6 years',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
      match: 82,
      posted: '3 days ago',
      applicants: 41,
      description: 'Develop intelligent systems that transform how businesses operate using advanced AI technologies.',
      remote: true,
      trending: true
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      salary: '$70k - $100k',
      type: 'Full-time',
      experience: '2-4 years',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      match: 76,
      posted: '5 days ago',
      applicants: 32,
      description: 'Join a fast-growing startup and help build products that impact millions of users.',
      remote: true,
      trending: false
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudScale Systems',
      location: 'Seattle, WA',
      salary: '$85k - $125k',
      type: 'Full-time',
      experience: '3-5 years',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
      match: 71,
      posted: '1 week ago',
      applicants: 28,
      description: 'Optimize and scale cloud infrastructure for high-performance applications.',
      remote: true,
      trending: false
    }
  ];

  const filters = ['All Jobs', 'Remote', 'Trending', 'High Match', 'Recent'];

  const getFilteredJobs = () => {
    let filtered = jobs;
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    switch (activeFilter) {
      case 'Remote':
        return filtered.filter(job => job.remote);
      case 'Trending':
        return filtered.filter(job => job.trending);
      case 'High Match':
        return filtered.filter(job => job.match >= 80);
      case 'Recent':
        return filtered.filter(job => job.posted.includes('day'));
      default:
        return filtered;
    }
  };

  const filteredJobs = getFilteredJobs();

  const handleApply = (jobId) => {
    console.log(`Applying to job ${jobId}`);
    alert(`Application submitted for job ${jobId}!`);
  };

  const handleSave = (jobId) => {
    console.log(`Saving job ${jobId}`);
    alert(`Job ${jobId} saved to bookmarks!`);
  };

  const getMatchColor = (match) => {
    if (match >= 90) return '#34D399';
    if (match >= 80) return '#00F5FF';
    if (match >= 70) return '#FBBF24';
    return '#F87171';
  };

  return (
    <Box sx={{ p: 3, maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8FAFC', mb: 1 }}>
            AI-Matched Job Opportunities
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            Discover roles perfectly aligned with your skills and career goals.
          </Typography>

          {/* Search and Filters */}
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search jobs, companies, or skills..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(26, 26, 46, 0.6)',
                  borderRadius: 3,
                  color: '#F8FAFC',
                  '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#00F5FF' }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#94A3B8' }} />
                  </InputAdornment>
                )
              }}
            />

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {filters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  onClick={() => setActiveFilter(filter)}
                  sx={{
                    background: activeFilter === filter ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)' : 'rgba(26, 26, 46, 0.6)',
                    color: activeFilter === filter ? '#ffffff' : '#94A3B8',
                    border: `1px solid ${activeFilter === filter ? 'rgba(0, 245, 255, 0.3)' : 'rgba(0, 245, 255, 0.2)'}`,
                    '&:hover': {
                      background: activeFilter === filter ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)' : 'rgba(0, 245, 255, 0.1)',
                      borderColor: 'rgba(0, 245, 255, 0.4)'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          <Grid container spacing={3}>
            {filteredJobs.map((job, index) => (
              <Grid item xs={12} key={job.id}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 48, height: 48, background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', fontWeight: 600 }}>
                            {job.company.charAt(0)}
                          </Avatar>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                                {job.title}
                              </Typography>
                              {job.trending && <TrendingUp sx={{ color: '#34D399', fontSize: 20 }} />}
                            </Box>
                            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                              {job.company}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={`${job.match}% Match`} 
                            size="small" 
                            sx={{ 
                              bgcolor: `${getMatchColor(job.match)}20`, 
                              color: getMatchColor(job.match), 
                              border: `1px solid ${getMatchColor(job.match)}40`,
                              fontWeight: 600 
                            }} 
                          />
                          <Button variant="text" size="small" onClick={() => handleSave(job.id)} sx={{ minWidth: 'auto', p: 1 }}>
                            <Bookmark sx={{ color: '#94A3B8', fontSize: 20 }} />
                          </Button>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2, lineHeight: 1.5 }}>
                        {job.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 16, color: '#94A3B8' }} />
                          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                            {job.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AttachMoney sx={{ fontSize: 16, color: '#94A3B8' }} />
                          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                            {job.salary}
                          </Typography>
                        </Box>
                        <Chip label={job.type} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                          {job.experience} • {job.posted}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 3 }}>
                        {job.skills.map((skill, idx) => (
                          <Chip key={idx} label={skill} size="small" sx={{ bgcolor: 'rgba(0, 245, 255, 0.1)', color: '#00F5FF', fontSize: '0.7rem' }} />
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                          {job.applicants} applicants
                        </Typography>
                        <Button 
                          variant="contained" 
                          onClick={() => handleApply(job.id)}
                          sx={{ 
                            background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', 
                            textTransform: 'none', 
                            fontWeight: 600,
                            '&:hover': { 
                              boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
                              transform: 'translateY(-1px)'
                            }
                          }}
                        >
                          Apply Now
                        </Button>
                      </Box>
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
            {/* Job Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                    Job Market Insights
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: '#00F5FF' }}>{filteredJobs.length}</Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>Available Jobs</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#34D399' }}>
                          {filteredJobs.filter(j => j.match >= 90).length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>Perfect Match</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#FBBF24' }}>
                          {filteredJobs.filter(j => j.remote).length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>Remote Jobs</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Career Tips */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                    💡 Career Tips
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.5 }}>
                      • Update your skills regularly to maintain high match scores
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.5 }}>
                      • Apply within 48 hours for better visibility
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.5 }}>
                      • Customize your application for each role
                    </Typography>
                  </Box>
                  <Button variant="outlined" fullWidth sx={{ mt: 2, borderColor: 'rgba(251, 191, 36, 0.3)', color: '#FBBF24', textTransform: 'none' }}>
                    Get Career Coaching
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobsPage;