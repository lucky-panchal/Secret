'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack, ArrowForward, Home, Person, Assessment, School, Work, Security, CheckCircle } from '@mui/icons-material';

const DemoPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

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
          <Box sx={{ display: 'flex', minHeight: '80vh', alignItems: 'center', gap: { xs: 4, md: 8 }, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h1" sx={{ 
                color: '#E0E0E0',
                fontWeight: 800, 
                mb: 2, 
                fontSize: { xs: '2.5rem', md: '4rem' }, 
                lineHeight: 1.1,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}>
                {page.title}
              </Typography>
              <Typography variant="h4" sx={{ color: '#80D8FF', mb: 4, fontWeight: 400, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {page.subtitle}
              </Typography>
              <Typography variant="h6" sx={{ color: '#B0B0B0', lineHeight: 1.7, mb: 6, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {page.content}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3, mb: 6 }}>
                {page.stats.map((stat, index) => (
                  <Box key={index} sx={{ 
                    textAlign: 'center', 
                    p: 3, 
                    border: '2px solid rgba(128, 216, 255, 0.2)', 
                    borderRadius: 3, 
                    background: 'linear-gradient(135deg, rgba(128, 216, 255, 0.05) 0%, rgba(30, 30, 30, 0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(128, 216, 255, 0.4)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(128, 216, 255, 0.15)'
                    }
                  }}>
                    <Typography variant="h3" sx={{ color: '#80D8FF', fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#E0E0E0' }}>
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
          <Box sx={{ display: 'flex', minHeight: '80vh', alignItems: 'center', gap: { xs: 4, md: 8 }, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" sx={{ 
                color: '#E0E0E0',
                fontWeight: 700, 
                mb: 2, 
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}>
                {page.title}
              </Typography>
              <Typography variant="h4" sx={{ color: '#B0B0B0', mb: 4, fontWeight: 400, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                {page.subtitle}
              </Typography>
              <Typography variant="h6" sx={{ color: '#B0B0B0', lineHeight: 1.7, mb: 6, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {page.content}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <video 
                controls 
                width="100%" 
                height="400"
                style={{ 
                  borderRadius: '16px', 
                  border: '2px solid rgba(128, 216, 255, 0.3)',
                  boxShadow: '0 8px 25px rgba(128, 216, 255, 0.15)'
                }}
              >
                <source src={page.media} type="video/mp4" />
              </video>
            </Box>
          </Box>
        );

      case 'step':
        return (
          <Box sx={{ display: 'flex', minHeight: '80vh', alignItems: 'center', gap: { xs: 4, md: 8 }, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
                <page.icon sx={{ fontSize: 60, color: '#80D8FF', mr: { xs: 0, sm: 3 }, mb: { xs: 2, sm: 0 } }} />
                <Box>
                  <Typography variant="h2" sx={{ 
                    color: '#E0E0E0',
                    fontWeight: 700, 
                    mb: 1, 
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                  }}>
                    {page.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#B0B0B0', fontWeight: 400, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                    {page.subtitle}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ color: '#B0B0B0', lineHeight: 1.7, mb: 6, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {page.content}
              </Typography>
              <Box sx={{ 
                p: 4, 
                border: '2px solid rgba(128, 216, 255, 0.3)', 
                borderRadius: 3, 
                background: 'linear-gradient(135deg, rgba(128, 216, 255, 0.05) 0%, rgba(176, 176, 176, 0.05) 100%)',
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="h6" sx={{ color: '#80D8FF', mb: 3, fontWeight: 600 }}>
                  What Happens in This Step:
                </Typography>
                {page.details.map((detail, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle sx={{ color: '#80D8FF', mr: 2, fontSize: 20 }} />
                    <Typography variant="body1" sx={{ color: '#E0E0E0' }}>
                      {detail}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ 
                height: 400,
                border: '2px solid rgba(176, 176, 176, 0.3)',
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(176, 176, 176, 0.05) 0%, rgba(30, 30, 30, 0.8) 100%)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box sx={{ textAlign: 'center', p: 4 }}>
                  <page.icon sx={{ fontSize: 120, color: '#B0B0B0', mb: 3, opacity: 0.5 }} />
                  <Typography variant="h4" sx={{ color: '#E0E0E0', mb: 2, textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
                    Interactive Demo
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
                    Experience this step in our live platform
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );

      case 'success':
        return (
          <Box sx={{ minHeight: '80vh', py: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ 
                color: '#E0E0E0',
                fontWeight: 700, 
                mb: 2, 
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}>
                {page.title}
              </Typography>
              <Typography variant="h4" sx={{ color: '#80D8FF', mb: 4, fontWeight: 400, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                {page.subtitle}
              </Typography>
              <Typography variant="h6" sx={{ color: '#B0B0B0', maxWidth: 800, mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {page.content}
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 6 }}>
              {page.stories.map((story, index) => (
                <Box key={index} sx={{ 
                  p: 6, 
                  border: '2px solid rgba(128, 216, 255, 0.3)', 
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(128, 216, 255, 0.05) 0%, rgba(30, 30, 30, 0.8) 100%)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(128, 216, 255, 0.5)',
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 35px rgba(128, 216, 255, 0.2)'
                  }
                }}>
                  <Typography variant="h4" sx={{ color: '#E0E0E0', mb: 2, fontWeight: 700, textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
                    {story.name}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#80D8FF', mb: 1 }}>
                    {story.before}
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#B0B0B0', mb: 3 }}>
                    ↓
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#80D8FF', mb: 4 }}>
                    {story.after} at {story.company}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
                    <Box>
                      <Typography variant="h5" sx={{ color: '#80D8FF', fontWeight: 700 }}>
                        {story.timeline}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Timeline</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ color: '#80D8FF', fontWeight: 700 }}>
                        {story.salary}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Salary Increase</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {story.skills.map((skill, skillIndex) => (
                      <Box key={skillIndex} sx={{ 
                        px: 2, 
                        py: 1, 
                        background: 'linear-gradient(45deg, #80D8FF, #B0B0B0)', 
                        color: '#121212', 
                        borderRadius: 2,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(128, 216, 255, 0.3)'
                      }}>
                        {skill}
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
          <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <Typography variant="h1" sx={{ 
              color: '#E0E0E0',
              fontWeight: 800, 
              mb: 3, 
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 3px 15px rgba(0, 0, 0, 0.6)'
            }}>
              {page.title}
            </Typography>
            <Typography variant="h3" sx={{ color: '#80D8FF', mb: 6, fontWeight: 400, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              {page.subtitle}
            </Typography>
            <Typography variant="h5" sx={{ color: '#B0B0B0', lineHeight: 1.7, mb: 8, maxWidth: 800, mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' } }}>
              {page.content}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 8 }}>
              {page.images.map((image, index) => (
                <Box key={index} sx={{ 
                  height: 200,
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '2px solid rgba(128, 216, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(176, 176, 176, 0.5)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 25px rgba(128, 216, 255, 0.2)'
                  }
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
            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button 
                variant="contained" 
                onClick={() => router.push('/assessment')}
                sx={{ 
                  background: 'linear-gradient(45deg, #80D8FF, #B0B0B0)', 
                  color: '#121212', 
                  px: 8, 
                  py: 3,
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  boxShadow: '0 8px 25px rgba(128, 216, 255, 0.3)',
                  '&:hover': { 
                    background: 'linear-gradient(45deg, #B0B0B0, #80D8FF)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(176, 176, 176, 0.4)'
                  }
                }}
              >
                Start Free Assessment
              </Button>
              <Button variant="outlined" sx={{ 
                borderColor: 'rgba(128, 216, 255, 0.5)', 
                color: '#80D8FF', 
                px: 8, 
                py: 3,
                fontSize: '1.3rem',
                fontWeight: 700,
                borderRadius: 3,
                borderWidth: 2,
                '&:hover': { 
                  borderColor: '#80D8FF', 
                  color: '#E0E0E0',
                  background: 'rgba(128, 216, 255, 0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(128, 216, 255, 0.2)'
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
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #121212 0%, #1E1E1E 50%, #121212 100%)',
      color: '#E0E0E0',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, rgba(128, 216, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(176, 176, 176, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(224, 224, 224, 0.04) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: -1
      }
    }}>
      {/* Header */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        background: 'linear-gradient(135deg, rgba(128, 216, 255, 0.05) 0%, rgba(30, 30, 30, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(128, 216, 255, 0.2)',
        boxShadow: '0 4px 20px rgba(128, 216, 255, 0.1)',
        px: { xs: 4, md: 6 },
        py: 3
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', mx: 'auto' }}>
          <Button
            startIcon={<Home />}
            onClick={goHome}
            sx={{ 
              color: '#80D8FF', 
              fontSize: '1rem',
              fontWeight: 600,
              border: '1px solid rgba(128, 216, 255, 0.3)',
              borderRadius: '8px',
              px: 2,
              py: 1,
              '&:hover': { 
                color: '#E0E0E0', 
                background: 'rgba(128, 216, 255, 0.1)',
                borderColor: '#80D8FF'
              }
            }}
          >
            ← Back to Home
          </Button>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {demoPages.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: index === currentPage ? 12 : 8,
                  height: index === currentPage ? 12 : 8,
                  borderRadius: '50%',
                  background: index === currentPage ? '#80D8FF' : 'rgba(176, 176, 176, 0.3)',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </Box>
          <Typography variant="body1" sx={{ color: '#80D8FF', fontWeight: 600 }}>
            {currentPage + 1} of {demoPages.length}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ pt: 12, px: { xs: 4, md: 6 }, pb: 12 }}>
        <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
          {renderPageContent(demoPages[currentPage])}
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        background: 'linear-gradient(135deg, rgba(128, 216, 255, 0.05) 0%, rgba(30, 30, 30, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '2px solid rgba(128, 216, 255, 0.2)',
        boxShadow: '0 -4px 20px rgba(128, 216, 255, 0.1)',
        px: { xs: 4, md: 6 },
        py: 3
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', mx: 'auto' }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={prevPage}
            disabled={currentPage === 0}
            variant="outlined"
            sx={{ 
              borderColor: 'rgba(176, 176, 176, 0.5)',
              color: '#B0B0B0',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': { 
                borderColor: '#B0B0B0', 
                color: '#E0E0E0',
                background: 'rgba(176, 176, 176, 0.1)'
              },
              '&:disabled': { opacity: 0.3, borderColor: 'rgba(176, 176, 176, 0.2)', color: 'rgba(176, 176, 176, 0.5)' }
            }}
          >
            Previous
          </Button>

          <Box sx={{ textAlign: 'center', display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="h6" sx={{ color: '#E0E0E0', fontWeight: 700, mb: 0.5, textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
              {demoPages[currentPage].title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
              {demoPages[currentPage].subtitle}
            </Typography>
          </Box>

          <Button
            endIcon={<ArrowForward />}
            onClick={nextPage}
            disabled={currentPage === demoPages.length - 1}
            variant="contained"
            sx={{ 
              background: 'linear-gradient(45deg, #80D8FF, #B0B0B0)',
              color: '#121212',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: '0 4px 15px rgba(128, 216, 255, 0.3)',
              '&:hover': { 
                background: 'linear-gradient(45deg, #B0B0B0, #80D8FF)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(176, 176, 176, 0.4)'
              },
              '&:disabled': { 
                opacity: 0.3, 
                background: 'rgba(176, 176, 176, 0.3)', 
                color: 'rgba(224, 224, 224, 0.5)',
                transform: 'none',
                boxShadow: 'none'
              }
            }}
          >
            {currentPage === demoPages.length - 1 ? '🚀 Get Started' : 'Next →'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DemoPage;