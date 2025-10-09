'use client';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress, 
  Chip, 
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
  Divider
} from '@mui/material';
import { 
  TrendingUp, 
  School, 
  Work, 
  CheckCircle, 
  PlayArrow,
  Timeline,
  AutoAwesome,
  Psychology,
  EmojiEvents,
  ExpandMore,
  Assignment,
  Quiz,
  Group,
  Speed,
  Star,
  AccessTime,
  TrendingFlat,
  Lightbulb,
  Build,
  Assessment
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '@/services/api';

const PersonalizedRoadmap = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAIProfile();
      
      if (response.success) {
        setUserProfile(response.data);
        
        // Set active step to first incomplete milestone
        const firstIncomplete = response.data.roadmap?.milestones?.findIndex(
          milestone => milestone.status !== 'Completed'
        );
        setActiveStep(firstIncomplete >= 0 ? firstIncomplete : 0);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to load your personalized roadmap');
    } finally {
      setLoading(false);
    }
  };

  const updateMilestoneProgress = async (milestoneId, progress) => {
    try {
      await apiService.updateProgress(milestoneId, progress);
      await fetchUserProfile(); // Refresh data
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress sx={{ color: '#00F5FF' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (!userProfile?.roadmap) {
    return (
      <Card sx={{ background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(0, 245, 255, 0.2)' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Psychology sx={{ fontSize: 60, color: '#00F5FF', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 2 }}>
            Complete Your Assessment
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
            Take our AI-powered assessment to get your personalized career roadmap
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.href = '/assessment'}
            sx={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
              textTransform: 'none'
            }}
          >
            Start Assessment
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { roadmap, transferableSkills, skillGaps, automationRisk, careerViability } = userProfile;

  return (
    <Box>
      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ 
          background: 'rgba(26, 26, 46, 0.8)', 
          border: '1px solid rgba(0, 245, 255, 0.2)',
          mb: 3
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <AutoAwesome sx={{ color: '#00F5FF', fontSize: 32 }} />
              <Typography variant="h4" sx={{ color: '#F8FAFC', fontWeight: 700 }}>
                Your AI-Powered Career Roadmap
              </Typography>
              <Chip 
                label={`${Math.round((userProfile.confidenceScore || 0.5) * 100)}% Confidence`}
                sx={{ 
                  background: 'rgba(16, 185, 129, 0.2)', 
                  color: '#10B981',
                  fontWeight: 600
                }}
              />
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ color: '#00F5FF', fontWeight: 600, mb: 1 }}>
                  🎯 Target Role: {roadmap.targetRole}
                </Typography>
                <Typography variant="body1" sx={{ color: '#94A3B8', mb: 2 }}>
                  {roadmap.targetRoleDescription}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    icon={<AccessTime />}
                    label={`${roadmap.estimatedDuration}`}
                    sx={{ background: 'rgba(251, 191, 36, 0.2)', color: '#FBBF24' }}
                  />
                  <Chip 
                    icon={<TrendingUp />}
                    label={`${Math.round((roadmap.matchScore || 0) * 100)}% Match`}
                    sx={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}
                  />
                  <Chip 
                    icon={<Work />}
                    label={roadmap.salaryRange}
                    sx={{ background: 'rgba(168, 85, 247, 0.2)', color: '#A855F7' }}
                  />
                  <Chip 
                    icon={<Speed />}
                    label={roadmap.difficultyLevel}
                    sx={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444' }}
                  />
                  <Chip 
                    icon={<TrendingFlat />}
                    label={roadmap.careerTransitionType}
                    sx={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}
                  />
                </Box>
                
                {roadmap.totalHours && (
                  <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
                    📚 Total Learning Time: ~{roadmap.totalHours} hours
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 1 }}>
                    Overall Progress
                  </Typography>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={roadmap.totalProgress || 0}
                      size={80}
                      thickness={4}
                      sx={{
                        color: '#00F5FF',
                        '& .MuiCircularProgress-circle': {
                          strokeLinecap: 'round',
                        },
                      }}
                    />
                    <Box sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                        {roadmap.totalProgress || 0}%
                      </Typography>
                    </Box>
                  </Box>
                  
                  {roadmap.confidenceLevel && (
                    <Typography variant="body2" sx={{ color: '#94A3B8', mt: 1 }}>
                      Confidence: {Math.round(roadmap.confidenceLevel * 100)}%
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transferable Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card sx={{ 
          background: 'rgba(26, 26, 46, 0.8)', 
          border: '1px solid rgba(16, 185, 129, 0.2)',
          mb: 3
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TrendingUp sx={{ color: '#10B981' }} />
              <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                🚀 Your Transferable Skills ({transferableSkills?.length || 0})
              </Typography>
            </Box>
            
            {transferableSkills && transferableSkills.length > 0 ? (
              <Grid container spacing={2}>
                {transferableSkills.map((skill, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card sx={{ 
                      background: 'rgba(15, 23, 42, 0.5)', 
                      border: '1px solid rgba(16, 185, 129, 0.2)' 
                    }}>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="body1" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                          {typeof skill === 'string' ? skill : skill.originalSkill}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
                          {typeof skill === 'object' && skill.transfersTo ? 
                            `Transfers to: ${Array.isArray(skill.transfersTo) ? skill.transfersTo.join(', ') : skill.transfersTo}` :
                            'Transferable to trending technologies'
                          }
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip 
                            label={typeof skill === 'object' ? (skill.marketDemand || 'High') : 'High'}
                            size="small"
                            sx={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontSize: '0.7rem' }}
                          />
                          <Chip 
                            label={typeof skill === 'object' ? (skill.learningEffort || 'Medium') : 'Medium'}
                            size="small"
                            sx={{ background: 'rgba(168, 85, 247, 0.2)', color: '#A855F7', fontSize: '0.7rem' }}
                          />
                        </Box>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                            textTransform: 'none',
                            fontWeight: 600
                          }}
                          onClick={() => {
                            console.log('Find courses for:', typeof skill === 'string' ? skill : skill.originalSkill);
                          }}
                        >
                          Find Courses
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ color: '#94A3B8', fontStyle: 'italic' }}>
                Complete your assessment to see transferable skills
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Learning Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card sx={{ 
          background: 'rgba(26, 26, 46, 0.8)', 
          border: '1px solid rgba(168, 85, 247, 0.2)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Timeline sx={{ color: '#A855F7' }} />
              <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                📚 Personalized Learning Milestones
              </Typography>
              <Chip 
                label={`${roadmap.milestones?.length || 0} Phases`}
                size="small"
                sx={{ background: 'rgba(168, 85, 247, 0.2)', color: '#A855F7' }}
              />
            </Box>

            <Stepper activeStep={activeStep} orientation="vertical">
              {roadmap.milestones?.map((milestone, index) => (
                <Step key={milestone.id || index}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: milestone.status === 'Completed' 
                          ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                          : milestone.status === 'In Progress'
                          ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)'
                          : 'rgba(156, 163, 175, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}>
                        {milestone.status === 'Completed' ? (
                          <CheckCircle sx={{ fontSize: 20 }} />
                        ) : (
                          <Typography sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                            {index + 1}
                          </Typography>
                        )}
                      </Box>
                    )}
                    sx={{
                      '& .MuiStepLabel-label': {
                        color: '#F8FAFC',
                        fontWeight: 600,
                        fontSize: '1.1rem'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {milestone.title}
                      {milestone.difficulty && (
                        <Chip 
                          label={milestone.difficulty}
                          size="small"
                          sx={{ 
                            background: milestone.difficulty === 'High' ? 'rgba(239, 68, 68, 0.2)' : 
                                       milestone.difficulty === 'Medium' ? 'rgba(251, 191, 36, 0.2)' : 
                                       'rgba(16, 185, 129, 0.2)',
                            color: milestone.difficulty === 'High' ? '#EF4444' : 
                                  milestone.difficulty === 'Medium' ? '#FBBF24' : '#10B981',
                            fontSize: '0.7rem'
                          }}
                        />
                      )}
                    </Box>
                  </StepLabel>
                  
                  <StepContent>
                    <Box sx={{ pb: 3 }}>
                      <Typography variant="body1" sx={{ color: '#94A3B8', mb: 2 }}>
                        {milestone.description}
                      </Typography>
                      
                      {/* Enhanced Progress Bar */}
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                            Progress
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                              {milestone.completionPercentage || 0}%
                            </Typography>
                            {milestone.estimatedHours && (
                              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                ~{milestone.estimatedHours}h
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={milestone.completionPercentage || 0}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(156, 163, 175, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #00F5FF 0%, #A855F7 100%)',
                              borderRadius: 4
                            }
                          }}
                        />
                      </Box>
                      
                      {/* Expandable Content */}
                      <Accordion 
                        sx={{ 
                          background: 'rgba(15, 23, 42, 0.5)', 
                          border: '1px solid rgba(168, 85, 247, 0.2)',
                          mb: 2
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#A855F7' }} />}>
                          <Typography sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                            📋 Detailed Learning Plan
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/* Skills Section */}
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Build sx={{ fontSize: 16 }} /> Skills to Master ({milestone.skills?.length || 0})
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {milestone.skills?.map((skill, skillIndex) => (
                                <Chip
                                  key={skillIndex}
                                  label={skill}
                                  size="small"
                                  sx={{
                                    background: 'rgba(0, 245, 255, 0.2)',
                                    color: '#00F5FF',
                                    fontSize: '0.75rem'
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                          
                          {/* Projects Section */}
                          {milestone.projects && milestone.projects.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Assignment sx={{ fontSize: 16 }} /> Key Projects ({milestone.projects.length})
                              </Typography>
                              <List dense>
                                {milestone.projects.map((project, projectIndex) => (
                                  <ListItem key={projectIndex} sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      <Star sx={{ color: '#A855F7', fontSize: 16 }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary={typeof project === 'object' ? project.title : project}
                                      secondary={typeof project === 'object' ? project.description : null}
                                      primaryTypographyProps={{ color: '#F8FAFC', fontSize: '0.9rem' }}
                                      secondaryTypographyProps={{ color: '#94A3B8', fontSize: '0.8rem' }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          )}
                          
                          {/* Assessments Section */}
                          {milestone.assessments && milestone.assessments.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Quiz sx={{ fontSize: 16 }} /> Assessments ({milestone.assessments.length})
                              </Typography>
                              <List dense>
                                {milestone.assessments.map((assessment, assessmentIndex) => (
                                  <ListItem key={assessmentIndex} sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      <Assessment sx={{ color: '#FBBF24', fontSize: 16 }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary={assessment.title}
                                      secondary={`${assessment.format} • ${assessment.duration} • Pass: ${assessment.passingScore}%`}
                                      primaryTypographyProps={{ color: '#F8FAFC', fontSize: '0.9rem' }}
                                      secondaryTypographyProps={{ color: '#94A3B8', fontSize: '0.8rem' }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          )}
                          
                          {/* Quick Wins */}
                          {milestone.quickWins && milestone.quickWins.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Lightbulb sx={{ fontSize: 16 }} /> Quick Wins
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {milestone.quickWins.map((win, winIndex) => (
                                  <Chip
                                    key={winIndex}
                                    label={win}
                                    size="small"
                                    sx={{
                                      background: 'rgba(16, 185, 129, 0.2)',
                                      color: '#10B981',
                                      fontSize: '0.75rem'
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </AccordionDetails>
                      </Accordion>
                      
                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={milestone.status === 'Completed' ? <CheckCircle /> : <PlayArrow />}
                          disabled={milestone.status === 'Completed'}
                          onClick={() => {
                            if (milestone.status !== 'Completed') {
                              updateMilestoneProgress(milestone._id || milestone.id, 25);
                            }
                          }}
                          sx={{
                            background: milestone.status === 'Completed' 
                              ? 'rgba(16, 185, 129, 0.3)'
                              : 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                            textTransform: 'none',
                            fontWeight: 600
                          }}
                        >
                          {milestone.status === 'Completed' ? 'Completed' : 'Start Learning'}
                        </Button>
                        
                        {milestone.courses && milestone.courses.length > 0 && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<School />}
                            sx={{
                              borderColor: '#A855F7',
                              color: '#A855F7',
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#A855F7',
                                background: 'rgba(168, 85, 247, 0.1)'
                              }
                            }}
                          >
                            View Courses ({milestone.courses.length})
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </StepContent>
                </Step>
              )) || []}
            </Stepper>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Career Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(26, 26, 46, 0.8)', 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              height: '100%'
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <EmojiEvents sx={{ color: '#10B981', fontSize: 40, mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                  Career Viability
                </Typography>
                <Typography variant="h4" sx={{ color: '#10B981', fontWeight: 700, mb: 1 }}>
                  {Math.round((careerViability || 0.5) * 100)}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  Future-proof potential
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(26, 26, 46, 0.8)', 
              border: '1px solid rgba(251, 191, 36, 0.2)',
              height: '100%'
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Psychology sx={{ color: '#FBBF24', fontSize: 40, mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                  Automation Risk
                </Typography>
                <Typography variant="h4" sx={{ 
                  color: automationRisk > 0.6 ? '#EF4444' : automationRisk > 0.4 ? '#FBBF24' : '#10B981', 
                  fontWeight: 700, 
                  mb: 1 
                }}>
                  {Math.round((automationRisk || 0.5) * 100)}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  {automationRisk > 0.6 ? 'High risk' : automationRisk > 0.4 ? 'Medium risk' : 'Low risk'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(26, 26, 46, 0.8)', 
              border: '1px solid rgba(168, 85, 247, 0.2)',
              height: '100%'
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <School sx={{ color: '#A855F7', fontSize: 40, mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                  Skills to Learn
                </Typography>
                <Typography variant="h4" sx={{ color: '#A855F7', fontWeight: 700, mb: 1 }}>
                  {skillGaps?.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  New skills needed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(26, 26, 46, 0.8)', 
              border: '1px solid rgba(59, 130, 246, 0.2)',
              height: '100%'
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Group sx={{ color: '#3B82F6', fontSize: 40, mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                  Market Alignment
                </Typography>
                <Typography variant="h4" sx={{ color: '#3B82F6', fontWeight: 700, mb: 1 }}>
                  {Math.round((userProfile.marketAlignment || 0.5) * 100)}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  Skills match market demand
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
      
      {/* Success Metrics Section */}
      {roadmap.successMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card sx={{ 
            background: 'rgba(26, 26, 46, 0.8)', 
            border: '1px solid rgba(34, 197, 94, 0.2)',
            mt: 3
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <EmojiEvents sx={{ color: '#22C55E' }} />
                <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                  🎯 Success Metrics & Goals
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 2 }}>
                    Portfolio Targets
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Assignment sx={{ color: '#22C55E', fontSize: 20 }} /></ListItemIcon>
                      <ListItemText 
                        primary={`${roadmap.successMetrics.portfolioTargets?.projectsCompleted || 0} Projects to Complete`}
                        primaryTypographyProps={{ color: '#94A3B8', fontSize: '0.9rem' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Build sx={{ color: '#22C55E', fontSize: 20 }} /></ListItemIcon>
                      <ListItemText 
                        primary={`${roadmap.successMetrics.portfolioTargets?.skillsDemonstrated || 0} Skills to Demonstrate`}
                        primaryTypographyProps={{ color: '#94A3B8', fontSize: '0.9rem' }}
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 2 }}>
                    Competency Targets
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Star sx={{ color: '#FBBF24', fontSize: 20 }} /></ListItemIcon>
                      <ListItemText 
                        primary={`${roadmap.successMetrics.skillCompetencyTargets?.foundation || 75}% Foundation Skills`}
                        primaryTypographyProps={{ color: '#94A3B8', fontSize: '0.9rem' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Star sx={{ color: '#A855F7', fontSize: 20 }} /></ListItemIcon>
                      <ListItemText 
                        primary={`${roadmap.successMetrics.skillCompetencyTargets?.specialization || 85}% Specialized Skills`}
                        primaryTypographyProps={{ color: '#94A3B8', fontSize: '0.9rem' }}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default PersonalizedRoadmap;