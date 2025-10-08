'use client';
import { Box, Typography, Container, Paper, Grid, Button } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';
import { Assessment, School, Security, TrendingUp, Psychology, Token } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { GlowCard } from '@/components/ui/spotlight-card';

const AboutPage = () => {
  const { isDark } = useTheme();
  const router = useRouter();

  const features = [
    {
      icon: <Assessment sx={{ fontSize: { xs: 24, md: 32 }, color: '#2196f3' }} />,
      title: 'AI-Based Career Assessments',
      description: 'Our AI-powered system evaluates your skills, interests, and goals to suggest the best career paths for you. Get personalized, data-driven recommendations to build a future-ready and successful career.'
    },
    {
      icon: <School sx={{ fontSize: { xs: 24, md: 32 }, color: '#4caf50' }} />,
      title: 'Personalized Learning Pathways',
      description: 'AI tailors a unique learning journey based on your skills, goals, and progress. Get customized course recommendations to master the skills needed for your dream career.'
    },
    {
      icon: <Security sx={{ fontSize: { xs: 24, md: 32 }, color: '#ff9800' }} />,
      title: 'Blockchain Certificate',
      description: 'Earn secure, tamper-proof digital certificates verified through blockchain technology. Showcase your achievements with globally recognized, easily verifiable credentials.'
    },
    {
      icon: <TrendingUp sx={{ fontSize: { xs: 24, md: 32 }, color: '#9c27b0' }} />,
      title: 'Career Lifeline Monitor',
      description: 'Track your career growth, skill progress, and learning milestones in real time. Stay on course with AI insights that guide you toward continuous improvement and success.'
    },
    {
      icon: <Psychology sx={{ fontSize: { xs: 24, md: 32 }, color: '#f44336' }} />,
      title: 'AI-Human Collaboration Training',
      description: 'Learn how to work alongside AI tools to boost creativity, productivity, and decision-making. Develop future-ready skills that combine human intelligence with the power of artificial intelligence.'
    },
    {
      icon: <Token sx={{ fontSize: { xs: 24, md: 32 }, color: '#607d8b' }} />,
      title: 'Reskilling Token Economy',
      description: 'Earn digital tokens as rewards for learning, completing courses, and achieving milestones. Use your tokens to unlock premium training, certifications, or mentorship opportunities within the platform.'
    }
  ];

  const values = [
    'Innovation-driven approach to career development',
    'Accessibility and inclusivity for all learners',
    'Transparency in AI recommendations and processes',
    'Continuous adaptation to market changes'
  ];

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Box sx={{ 
        minHeight: '100vh', 
        background: '#000000',
        py: { xs: 2, md: 4 }
      }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
            <Typography variant="h1" sx={{ 
              fontWeight: 800, 
              mb: { xs: 2, md: 3 }, 
              color: isDark ? '#F8FAFC' : '#2D3748',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }
            }}>
              About KaushalX
            </Typography>
            
            <Typography variant="h4" sx={{ 
              color: isDark ? '#CBD5E1' : '#4A5568', 
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              maxWidth: '600px',
              mx: 'auto'
            }}>
              Future-ready careers with AI-powered guidance
            </Typography>
          </Box>

          <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: '900px', mx: 'auto' }}>
            <GlowCard 
              glowColor="blue" 
              customSize 
              width="100%" 
              height="220px"
              className="!rounded-none !aspect-auto"
            >
              <Box sx={{ 
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 4, md: 6 }
              }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 700, 
                  mb: { xs: 2, md: 3 }, 
                  color: isDark ? '#1976d2' : '#1976d2',
                  fontSize: { xs: '1.8rem', md: '2.5rem' }
                }}>
                  Who We Are
                </Typography>
                
                <Typography variant="body1" sx={{ 
                  lineHeight: 1.8, 
                  color: isDark ? '#F8FAFC' : '#2D3748',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  maxWidth: '800px',
                  mx: 'auto'
                }}>
                  KaushalX is an AI-driven reskilling and career guidance platform helping students and professionals 
                  stay relevant in the future job market. We bridge the gap between today's skills and tomorrow's 
                  opportunities through cutting-edge technology and personalized learning experiences.
                </Typography>
              </Box>
            </GlowCard>
          </Box>

          <Box sx={{ mb: { xs: 4, md: 8 } }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 700, 
              mb: { xs: 3, md: 5 }, 
              color: isDark ? '#1976d2' : '#1976d2',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              textAlign: 'center'
            }}>
              What We Do
            </Typography>

            <Grid container spacing={{ xs: 3, md: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <GlowCard 
                    glowColor={index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'purple' : 'green'} 
                    customSize 
                    width="100%" 
                    height="200px"
                    className="!rounded-none !aspect-auto"
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 2, md: 3 } }}>
                      <Box sx={{ 
                        p: { xs: 1.5, md: 2 }, 
                        borderRadius: 0, 
                        background: isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)',
                        border: isDark ? '1px solid rgba(25, 118, 210, 0.2)' : '1px solid rgba(25, 118, 210, 0.1)',
                        flexShrink: 0
                      }}>
                        {feature.icon}
                      </Box>
                      
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700, 
                          mb: { xs: 1, md: 2 }, 
                          color: isDark ? '#F8FAFC' : '#2D3748',
                          fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}>
                          {feature.title}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ 
                          lineHeight: 1.6, 
                          color: isDark ? '#CBD5E1' : '#4A5568',
                          fontSize: { xs: '0.9rem', md: '1rem' }
                        }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </GlowCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 4, md: 6 } }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: { xs: 4, md: 5 }, 
                borderRadius: 0, 
                height: '100%',
                background: '#000000',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                '&:hover': {
                  transform: 'scale(1.05)',
                  background: 'rgba(25, 118, 210, 0.15)',
                  '& h3': { color: '#fff' },
                  '& .MuiTypography-body1': { color: '#fff' }
                }
              }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 700, 
                  mb: { xs: 2, md: 3 }, 
                  color: isDark ? '#1976d2' : '#1976d2',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  Why We Exist
                </Typography>
                
                <Typography variant="body1" sx={{ 
                  lineHeight: 1.7, 
                  color: isDark ? '#F8FAFC' : '#2D3748',
                  fontSize: { xs: '0.95rem', md: '1.1rem' }
                }}>
                  AI is rapidly transforming the job market, making many traditional roles obsolete while creating 
                  new opportunities. KaushalX exists to ensure no one gets left behind in this transformation by 
                  providing the tools and guidance needed to adapt and thrive.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: { xs: 4, md: 5 }, 
                borderRadius: 0, 
                height: '100%',
                background: '#000000',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                '&:hover': {
                  transform: 'scale(1.05)',
                  background: 'rgba(25, 118, 210, 0.15)',
                  '& h3': { color: '#fff' },
                  '& .MuiTypography-body1': { color: '#fff' }
                }
              }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 700, 
                  mb: { xs: 2, md: 3 }, 
                  color: isDark ? '#1976d2' : '#1976d2',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  Our Mission
                </Typography>
                
                <Typography variant="body1" sx={{ 
                  lineHeight: 1.7, 
                  color: isDark ? '#F8FAFC' : '#2D3748',
                  fontSize: { xs: '0.95rem', md: '1.1rem' }
                }}>
                  To empower individuals with AI-driven insights and personalized learning paths that transform 
                  career uncertainty into confident, future-ready professional growth.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              mb: { xs: 3, md: 4 }, 
              color: isDark ? '#1976d2' : '#1976d2',
              fontSize: { xs: '1.5rem', md: '2rem' },
              textAlign: 'center'
            }}>
              Our Values
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }}>
              {values.map((value, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <GlowCard 
                    glowColor={index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'purple' : 'green'} 
                    customSize 
                    width="100%" 
                    height="120px"
                    className="!rounded-none !aspect-auto"
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      height: '100%',
                      p: { xs: 2, md: 3 }
                    }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        background: '#1976d2', 
                        mr: 2,
                        flexShrink: 0
                      }} />
                      <Typography variant="body1" sx={{ 
                        color: isDark ? '#F8FAFC' : '#2D3748',
                        fontSize: { xs: '0.9rem', md: '1rem' }
                      }}>
                        {value}
                      </Typography>
                    </Box>
                  </GlowCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/register')}
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #03a9f4 100%)',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 700,
                borderRadius: 0,
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #0288d1 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
                }
              }}
            >
              Get Started with KaushalX
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default AboutPage;