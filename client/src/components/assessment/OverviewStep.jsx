'use client';
import { Box, Typography, Button, Paper, Chip, Grid, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowBack, Send, Code, Favorite, School, Work, Analytics, Rocket, EmojiEvents } from '@mui/icons-material';

const OverviewStep = ({ data, onSubmit, onBack }) => {
  const totalItems = (data.skills?.length || 0) + (data.interests?.length || 0) + (data.education ? 1 : 0) + (data.experience ? 1 : 0);
  
  const summaryCards = [
    {
      title: 'Technical Skills',
      icon: Code,
      count: data.skills?.length || 0,
      color: '#00D4FF',
      items: data.skills || [],
      gradient: 'var(--gradient-primary)'
    },
    {
      title: 'Career Interests',
      icon: Favorite,
      count: data.interests?.length || 0,
      color: '#EC4899',
      items: data.interests || [],
      gradient: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)'
    },
    {
      title: 'Education Level',
      icon: School,
      count: data.education ? 1 : 0,
      color: '#FBBF24',
      items: data.education ? [data.education] : [],
      gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)'
    },
    {
      title: 'Experience',
      icon: Work,
      count: data.experience ? 1 : 0,
      color: '#10B981',
      items: data.experience ? [data.experience] : [],
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    }
  ];

  return (
    <Box sx={{ width: '100%', minHeight: '70vh' }}>
      {/* Header */}
      <Paper sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        borderRadius: 4,
        p: { xs: 4, md: 6 },
        textAlign: 'center',
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Success Animation Background */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300%',
          height: '300%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <Box sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
              position: 'relative'
            }}>
              <CheckCircle sx={{ fontSize: 50, color: 'white' }} />
              <Box sx={{
                position: 'absolute',
                width: '120%',
                height: '120%',
                borderRadius: '50%',
                border: '3px solid rgba(16, 185, 129, 0.3)',
                animation: 'successPulse 2s ease-in-out infinite'
              }} />
            </Box>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography variant="h2" sx={{ 
              color: 'var(--text-primary)', 
              fontWeight: 800, 
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3rem' },
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Assessment Complete!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Typography variant="h5" sx={{ 
              color: 'var(--text-secondary)', 
              mb: 4,
              maxWidth: '700px',
              mx: 'auto'
            }}>
              Review your profile summary below. We'll use this information to create your personalized AI/ML learning roadmap.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              flexWrap: 'wrap',
              mb: 4
            }}>
              {[
                { icon: Analytics, text: `${totalItems} Data Points`, color: '#00D4FF' },
                { icon: EmojiEvents, text: 'Profile Complete', color: '#FBBF24' },
                { icon: Rocket, text: 'Ready to Launch', color: '#EC4899' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                >
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 3,
                    py: 1.5,
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 3,
                    border: `1px solid ${item.color}30`
                  }}>
                    <item.icon sx={{ fontSize: 20, color: item.color }} />
                    <Typography sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {item.text}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
            >
              <Paper sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${card.color}30`,
                borderRadius: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: `0 10px 30px ${card.color}20`
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: card.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <card.icon sx={{ fontSize: 24, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      color: 'var(--text-primary)', 
                      fontWeight: 700,
                      mb: 0.5
                    }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                      {card.count} {card.count === 1 ? 'item' : 'items'} selected
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ minHeight: '120px' }}>
                  {card.items.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {card.items.map((item, itemIndex) => (
                        <Chip
                          key={itemIndex}
                          label={item}
                          size="small"
                          sx={{
                            background: `${card.color}20`,
                            color: card.color,
                            border: `1px solid ${card.color}40`,
                            fontWeight: 500,
                            '&:hover': {
                              background: `${card.color}30`
                            }
                          }}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography sx={{ 
                      color: 'var(--text-secondary)',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      py: 4
                    }}>
                      No {card.title.toLowerCase()} specified
                    </Typography>
                  )}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* AI Recommendation Preview */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Paper sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border)',
          borderRadius: 3,
          mb: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h5" sx={{ 
            color: 'var(--text-primary)', 
            fontWeight: 700,
            mb: 2
          }}>
            🤖 AI-Powered Recommendations Ready
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'var(--text-secondary)',
            mb: 3,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6
          }}>
            Our AI will analyze your {data.skills?.length || 0} skills, {data.interests?.length || 0} interests, 
            and experience level to create a personalized learning roadmap. You'll get custom course recommendations, 
            project ideas, and career guidance tailored specifically for your AI/ML and blockchain journey.
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            {['Custom Learning Path', 'Project Recommendations', 'Skill Gap Analysis', 'Career Roadmap'].map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                sx={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            ))}
          </Box>
        </Paper>
      </motion.div>

      {/* Navigation */}
      <Paper sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        borderRadius: 3,
        p: 3
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3
        }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{
              px: 4,
              py: 1.5,
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 2,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: '#10B981'
              }
            }}
          >
            Back to Edit
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ 
              color: 'var(--text-primary)',
              fontWeight: 600,
              mb: 1
            }}>
              Ready to Generate Your Roadmap
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Submit to receive your personalized AI/ML learning plan
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<Send />}
            onClick={() => {
              // Create stunning portal transition
              const overlay = document.createElement('div');
              overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, #00D4FF 0%, #A855F7 50%, #0A0A0F 100%);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.5s ease;
              `;
              
              overlay.innerHTML = `
                <div style="
                  width: 200px;
                  height: 200px;
                  border-radius: 50%;
                  background: radial-gradient(circle, #00D4FF 0%, #A855F7 50%, transparent 70%);
                  box-shadow: 0 0 100px #00D4FF, inset 0 0 50px #A855F7;
                  animation: portalExpand 2s ease-in-out;
                "></div>
              `;
              
              const style = document.createElement('style');
              style.textContent = `
                @keyframes portalExpand {
                  0% { transform: scale(0) rotate(0deg); opacity: 0; }
                  50% { transform: scale(1) rotate(180deg); opacity: 1; }
                  100% { transform: scale(20) rotate(360deg); opacity: 0; }
                }
              `;
              document.head.appendChild(style);
              
              document.body.appendChild(overlay);
              
              requestAnimationFrame(() => {
                overlay.style.opacity = '1';
              });
              
              setTimeout(() => {
                window.location.href = '/navothhan';
              }, 2000);
            }}
            sx={{
              px: 8,
              py: 2,
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1.2rem',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 40px rgba(16, 185, 129, 0.4)'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s',
              },
              '&:hover::before': {
                left: '100%'
              }
            }}
          >
            🚀 Rebuild Your Career
          </Button>
        </Box>
      </Paper>

      <style jsx global>{`
        @keyframes successPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </Box>
  );
};

export default OverviewStep;