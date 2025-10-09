'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, ThemeProvider } from '@mui/material';
import { ArrowBack, ArrowForward, Home, Person, Assessment, School, Work, Security, CheckCircle } from '@mui/icons-material';
import { createMuiTheme } from '@/theme/muiTheme';
import { useTheme } from '@/contexts/ThemeContext';

const DemoPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = createMuiTheme(isDark);

  const demoPages = [
    {
      id: 0,
      title: "Welcome to Career AI",
      subtitle: "Future-Proof Your Career Today",
      content: "The world's first AI-driven reskilling platform that identifies career vulnerabilities and transforms them into opportunities.",
      type: "welcome",
      stats: [
        { number: "10,000+", label: "Successful Transitions" },
        { number: "95%", label: "Job Placement Rate" },
        { number: "6 Months", label: "Average Timeline" },
        { number: "150%", label: "Salary Increase" }
      ]
    },
    {
      id: 1,
      title: "Platform Demo",
      subtitle: "See Our Technology",
      content: "Experience our AI-powered platform in action. Watch how we assess skills, create personalized roadmaps, and guide users through their transformation journey.",
      type: "demo",
      media: "/videos/AI_Career_Foundation_Video_Generation.mp4"
    },
    {
      id: 2,
      title: "Step 1: Sign Up & Assessment",
      subtitle: "Your Journey Begins Here",
      content: "Create your account and complete our comprehensive AI-powered assessment. We analyze your current skills, interests, education background, and career goals.",
      type: "step",
      details: [
        "Complete detailed skills inventory",
        "AI analyzes market trends vs your profile",
        "Identify transferable skills from current role",
        "Generate personalized risk assessment report"
      ],
      icon: Person
    },
    {
      id: 3,
      title: "Step 2: Personalized Roadmap",
      subtitle: "Your Custom Learning Path",
      content: "Based on your assessment, our AI creates a personalized roadmap that removes outdated skills and adds trending, future-proof skills.",
      type: "step",
      details: [
        "Remove outdated skills from your profile",
        "Add trending skills in high-demand sectors",
        "Create timeline with milestones",
        "Set realistic learning goals and deadlines"
      ],
      icon: Assessment
    },
    {
      id: 4,
      title: "Step 3: Learning Phase",
      subtitle: "Interactive Skill Building",
      content: "Engage in hands-on learning through interactive courses, real-world projects, and industry mentorship.",
      type: "step",
      details: [
        "Interactive video courses with real examples",
        "Hands-on projects with industry datasets",
        "1-on-1 mentorship with industry experts",
        "Regular progress tracking and feedback"
      ],
      icon: School
    },
    {
      id: 5,
      title: "Step 4: Certification & Validation",
      subtitle: "Blockchain-Verified Credentials",
      content: "Complete assessments and earn blockchain-verified certifications that employers trust.",
      type: "step",
      details: [
        "Complete practical skill assessments",
        "Earn blockchain-verified certificates",
        "Build portfolio of completed projects",
        "Get industry-recognized credentials"
      ],
      icon: Security
    },
    {
      id: 6,
      title: "Step 5: Job Matching & Placement",
      subtitle: "Connect with Employers",
      content: "Our AI matches your new skills with job opportunities from our network of 500+ hiring partners.",
      type: "step",
      details: [
        "AI-powered job matching with 500+ partners",
        "Interview preparation and mock sessions",
        "Salary negotiation coaching",
        "Continuous support until job secured"
      ],
      icon: Work
    },
    {
      id: 7,
      title: "Success Stories",
      subtitle: "Real People, Real Results",
      content: "Meet professionals who successfully transitioned their careers using our platform.",
      type: "success",
      stories: [
        {
          name: "Sarah Johnson",
          before: "Marketing Coordinator",
          after: "AI/ML Engineer",
          timeline: "6 months",
          salary: "+150%",
          company: "Google",
          skills: ["Python", "TensorFlow", "Machine Learning", "Data Science"]
        },
        {
          name: "Mike Chen",
          before: "Accountant",
          after: "Data Scientist",
          timeline: "8 months",
          salary: "+120%",
          company: "Microsoft",
          skills: ["R", "SQL", "Statistics", "Business Intelligence"]
        }
      ]
    },
    {
      id: 8,
      title: "Ready to Transform?",
      subtitle: "Your Future Starts Now",
      content: "Don't wait for AI to disrupt your career. Take control today and transform into a future-proof professional.",
      type: "cta",
      images: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      ]
    }
  ];

  const nextPage = () => {
    if (currentPage < demoPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goHome = () => {
    window.location.href = '/';
  };

  const renderPageContent = (page) => {
    switch (page.type) {
      case 'welcome':
        return (
          <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ 
                color: 'var(--text-primary)',
                fontWeight: 800, 
                mb: 1, 
                fontSize: { xs: '1.8rem', md: '2.5rem' }, 
                lineHeight: 1.1
              }}>
                {page.title}
              </Typography>
              <Typography sx={{ color: 'var(--text-secondary)', mb: 2, fontWeight: 400, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                {page.subtitle}
              </Typography>
              <Typography sx={{ color: 'var(--text-primary)', lineHeight: 1.4, mb: 3, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {page.content}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
                {page.stats.map((stat, index) => (
                  <Box key={index} sx={{ 
                    textAlign: 'center', 
                    p: 1.5, 
                    border: '1px solid var(--primary)', 
                    borderRadius: 2, 
                    background: 'var(--surface)'
                  }}>
                    <Typography sx={{ color: 'var(--primary)', fontWeight: 700, mb: 0.5, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                      {stat.number}
                    </Typography>
                    <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        );

      case 'demo':
        return (
          <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ 
                color: 'var(--text-primary)',
                fontWeight: 700, 
                mb: 1, 
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}>
                {page.title}
              </Typography>
              <Typography sx={{ color: 'var(--text-secondary)', mb: 2, fontWeight: 400, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {page.subtitle}
              </Typography>
              <Typography sx={{ color: 'var(--text-primary)', lineHeight: 1.4, mb: 3, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {page.content}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <video 
                controls 
                width="100%" 
                height="300"
                style={{ 
                  borderRadius: '8px', 
                  border: '1px solid var(--primary)'
                }}
              >
                <source src={page.media} type="video/mp4" />
              </video>
            </Box>
          </Box>
        );

      case 'step':
        return (
          <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
                <page.icon sx={{ fontSize: 40, color: 'var(--primary)', mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 } }} />
                <Box>
                  <Typography sx={{ 
                    color: 'var(--text-primary)',
                    fontWeight: 700, 
                    mb: 0.5, 
                    fontSize: { xs: '1.4rem', md: '1.8rem' }
                  }}>
                    {page.title}
                  </Typography>
                  <Typography sx={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: { xs: '1rem', md: '1.2rem' } }}>
                    {page.subtitle}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ color: 'var(--text-primary)', lineHeight: 1.4, mb: 3, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {page.content}
              </Typography>
              <Box sx={{ 
                p: 2, 
                border: '1px solid var(--primary)', 
                borderRadius: 2, 
                background: 'var(--surface)'
              }}>
                <Typography sx={{ color: 'var(--text-primary)', mb: 2, fontWeight: 600, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  What Happens in This Step:
                </Typography>
                {page.details.map((detail, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ color: 'var(--primary)', mr: 1, fontSize: 16 }} />
                    <Typography sx={{ color: 'var(--text-primary)', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                      {detail}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ 
                height: 400,
                border: '1px solid var(--primary)',
                borderRadius: 2,
                background: 'var(--surface)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {page.id >= 2 && page.id <= 6 ? (
                  <>
                    <img 
                      src={`/images/Gemini_Generated_Image_${page.id === 2 ? 'c1qpec1qpec1qpec' : page.id === 3 ? 'nvubo2nvubo2nvub' : page.id === 4 ? 'ofat5xofat5xofat' : page.id === 5 ? 'q3yi0bq3yi0bq3yi' : 'tleu05tleu05tleu'}.png`}
                      alt={`${page.title} Demo`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                      p: 1.5,
                      textAlign: 'center'
                    }}>
                      <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                        Step {page.id - 1} Preview
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Box sx={{ textAlign: 'center', p: 3 }}>
                      <page.icon sx={{ fontSize: 80, color: 'var(--primary)', mb: 2, opacity: 0.5 }} />
                      <Typography sx={{ color: 'var(--text-primary)', mb: 1, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                        Interactive Demo
                      </Typography>
                      <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                        Experience this step in our live platform
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        );

      case 'success':
        return (
          <Box sx={{ height: 'calc(100vh - 100px)', py: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography sx={{ 
                color: 'var(--text-primary)',
                fontWeight: 700, 
                mb: 1, 
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}>
                {page.title}
              </Typography>
              <Typography sx={{ color: 'var(--text-secondary)', mb: 2, fontWeight: 400, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {page.subtitle}
              </Typography>
              <Typography sx={{ color: 'var(--text-primary)', maxWidth: 600, mx: 'auto', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {page.content}
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, flex: 1, alignItems: 'start' }}>
              {page.stories.map((story, index) => (
                <Box key={index} sx={{ 
                  p: 3, 
                  border: '1px solid var(--primary)', 
                  borderRadius: 2,
                  background: 'var(--surface)',
                  textAlign: 'center'
                }}>
                  <Typography sx={{ color: 'var(--text-primary)', mb: 1, fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
                    {story.name}
                  </Typography>
                  <Typography sx={{ color: 'var(--text-secondary)', mb: 0.5, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    {story.before}
                  </Typography>
                  <Typography sx={{ color: 'var(--text-primary)', mb: 1 }}>
                    ↓
                  </Typography>
                  <Typography sx={{ color: 'var(--text-primary)', mb: 2, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    {story.after} at {story.company}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 } }}>
                    <Box>
                      <Typography sx={{ color: 'var(--primary)', fontWeight: 700, fontSize: { xs: '1rem', md: '1.2rem' } }}>
                        {story.timeline}
                      </Typography>
                      <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.7rem', md: '0.8rem' } }}>Timeline</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'var(--primary)', fontWeight: 700, fontSize: { xs: '1rem', md: '1.2rem' } }}>
                        {story.salary}
                      </Typography>
                      <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.7rem', md: '0.8rem' } }}>Salary Increase</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {story.skills.map((skill, skillIndex) => (
                      <Box key={skillIndex} sx={{ 
                        px: 1, 
                        py: 0.5, 
                        background: 'var(--primary)', 
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}>
                        <span style={{ color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 600 }}>
                          {skill}
                        </span>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'cta':
        return (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <Typography sx={{ 
              color: 'var(--text-primary)',
              fontWeight: 800, 
              mb: 2, 
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}>
              {page.title}
            </Typography>
            <Typography sx={{ color: 'var(--text-secondary)', mb: 3, fontWeight: 400, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              {page.subtitle}
            </Typography>
            <Typography sx={{ color: 'var(--text-primary)', lineHeight: 1.4, mb: 4, maxWidth: 600, mx: 'auto', fontSize: { xs: '0.9rem', md: '1rem' } }}>
              {page.content}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 1.5, mb: 4 }}>
              {page.images.map((image, index) => (
                <Box key={index} sx={{ 
                  height: 120,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid var(--primary)'
                }}>
                  <img 
                    src={image} 
                    alt={`Success ${index + 1}`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button 
                variant="contained" 
                onClick={() => router.push('/assessment')}
                sx={{ 
                  background: 'var(--primary) !important', 
                  color: '#FFFFFF !important', 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  '&:hover': {
                    background: 'var(--secondary) !important',
                    color: '#FFFFFF !important'
                  }
                }}
              >
                Start Free Assessment
              </Button>
              <Button sx={{ 
                borderColor: 'var(--primary) !important', 
                color: 'var(--primary) !important', 
                px: 4, 
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2,
                border: '1px solid var(--primary)',
                background: 'transparent',
                '&:hover': {
                  borderColor: 'var(--secondary) !important',
                  color: 'var(--secondary) !important',
                  background: 'transparent'
                }
              }}>
                Schedule Consultation
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <ThemeProvider theme={theme}>
        <Box sx={{ 
          height: '100vh', 
          background: 'var(--background)',
          color: 'var(--text-primary)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <Box sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1000,
            background: 'var(--background)',
            px: { xs: 2, md: 4 },
            py: 2,
            height: '60px'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', mx: 'auto' }}>
              <Button
                startIcon={<Home sx={{ color: 'var(--primary)' }} />}
                onClick={goHome}
                sx={{ 
                  color: 'var(--primary)', 
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  border: '1px solid var(--primary)',
                  borderRadius: '6px',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    color: 'var(--secondary)',
                    background: 'transparent'
                  }
                }}
              >
                ← Back to Home
              </Button>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {demoPages.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: index === currentPage ? 10 : 6,
                      height: index === currentPage ? 10 : 6,
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setCurrentPage(index)}
                  />
                ))}
              </Box>
              <Typography sx={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                {currentPage + 1} of {demoPages.length}
              </Typography>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ 
            pt: '60px', 
            pb: '20px', 
            px: { xs: 2, md: 3 }, 
            height: '100vh', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box sx={{ maxWidth: '1400px', mx: 'auto', width: '100%', height: 'calc(100vh - 80px)' }}>
              {renderPageContent(demoPages[currentPage])}
            </Box>
          </Box>

          {/* Navigation */}
          <Box sx={{ 
            position: 'fixed', 
            bottom: '20px', 
            left: 0, 
            right: 0,
            background: 'var(--background)',
            px: { xs: 2, md: 4 },
            py: 2,
            height: '60px',
            zIndex: 1000
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', mx: 'auto' }}>
              <Button
                startIcon={<ArrowBack sx={{ color: 'var(--primary)' }} />}
                onClick={prevPage}
                disabled={currentPage === 0}
                sx={{ 
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  px: 3,
                  py: 1,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  border: '1px solid var(--primary)',
                  background: 'transparent',
                  '&:hover': {
                    borderColor: 'var(--secondary)',
                    color: 'var(--secondary)',
                    background: 'transparent'
                  },
                  '&:disabled': { 
                    opacity: 0.3, 
                    borderColor: 'var(--primary)', 
                    color: 'var(--primary)',
                    background: 'transparent'
                  }
                }}
              >
                Previous
              </Button>

              <Box sx={{ textAlign: 'center', display: { xs: 'none', sm: 'block' } }}>
                <Typography sx={{ color: 'var(--text-primary)', fontWeight: 700, mb: 0.5, fontSize: '0.9rem' }}>
                  {demoPages[currentPage].title}
                </Typography>
                <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  {demoPages[currentPage].subtitle}
                </Typography>
              </Box>

              <Button
                endIcon={<ArrowForward sx={{ color: '#FFFFFF' }} />}
                onClick={nextPage}
                disabled={currentPage === demoPages.length - 1}
                sx={{ 
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  px: 3,
                  py: 1,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  '&:hover': {
                    background: 'var(--secondary)',
                    color: '#FFFFFF'
                  },
                  '&:disabled': { 
                    opacity: 0.3, 
                    background: 'var(--primary)', 
                    color: '#FFFFFF'
                  }
                }}
              >
                {currentPage === demoPages.length - 1 ? '🚀 Get Started' : 'Next →'}
              </Button>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default DemoPage;