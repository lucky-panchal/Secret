'use client';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Chip,
  LinearProgress,
  CircularProgress,
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Badge,
  Divider
} from '@mui/material';
import { 
  Psychology,
  TrendingUp,
  AutoAwesome,
  Speed,
  Timeline,
  Assessment,
  School,
  Work,
  Star,
  ExpandMore,
  Lightbulb,
  Security,
  Analytics,
  Build,
  Group,
  CheckCircle,
  Warning,
  Info
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import apiService from '@/services/api';

const AIAnalysisDashboard = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAIProfile();
      
      if (response.success) {
        setAnalysisData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Error fetching analysis data:', err);
      setError('Failed to load AI analysis data');
    } finally {
      setLoading(false);
    }
  };

  const regenerateAnalysis = async () => {
    try {
      setRegenerating(true);
      const response = await apiService.generateAIProfile();
      
      if (response.success) {
        setAnalysisData(response.data.profile);
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Error regenerating analysis:', err);
      setError('Failed to regenerate analysis');
    } finally {
      setRegenerating(false);
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
      <Alert 
        severity="error" 
        sx={{ mb: 3 }}
        action={
          <Button color="inherit" size="small" onClick={fetchAnalysisData}>
            Retry
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  if (!analysisData) {
    return (
      <Card sx={{ background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(0, 245, 255, 0.2)' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Psychology sx={{ fontSize: 60, color: '#00F5FF', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 2 }}>
            No AI Analysis Available
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
            Complete your assessment to get AI-powered career insights
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

  const { 
    transferableSkills, 
    skillGaps, 
    automationRisk, 
    careerViability, 
    marketAlignment,
    confidenceScore,
    recommendedRoles,
    roadmap
  } = analysisData;

  return (
    <Box>
      {/* AI Analysis Header */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AutoAwesome sx={{ color: '#00F5FF', fontSize: 32 }} />
                <Typography variant="h4" sx={{ color: '#F8FAFC', fontWeight: 700 }}>
                  AI Career Analysis
                </Typography>
                <Chip 
                  label={`${Math.round((confidenceScore || 0.5) * 100)}% Confidence`}
                  sx={{ 
                    background: 'rgba(16, 185, 129, 0.2)', 
                    color: '#10B981',
                    fontWeight: 600
                  }}
                />
              </Box>
              
              <Button
                variant="outlined"
                onClick={regenerateAnalysis}
                disabled={regenerating}
                startIcon={regenerating ? <CircularProgress size={16} /> : <Psychology />}
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
                {regenerating ? 'Regenerating...' : 'Regenerate Analysis'}
              </Button>
            </Box>
            
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 2 }}>
              Our AI has analyzed your skills, interests, and market trends to provide personalized career insights.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                icon={<TrendingUp />}
                label={`${transferableSkills?.length || 0} Transferable Skills`}
                sx={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}
              />
              <Chip 
                icon={<Build />}
                label={`${skillGaps?.length || 0} Skills to Learn`}
                sx={{ background: 'rgba(168, 85, 247, 0.2)', color: '#A855F7' }}
              />
              <Chip 
                icon={<Work />}
                label={`${recommendedRoles?.length || 0} Career Matches`}
                sx={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}
              />
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(26, 26, 46, 0.8)', 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              height: '100%'
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <TrendingUp sx={{ color: '#10B981', fontSize: 40, mb: 2 }} />
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
                <Security sx={{ color: '#FBBF24', fontSize: 40, mb: 2 }} />
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
              border: '1px solid rgba(59, 130, 246, 0.2)',
              height: '100%'
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Analytics sx={{ color: '#3B82F6', fontSize: 40, mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                  Market Alignment
                </Typography>
                <Typography variant="h4" sx={{ color: '#3B82F6', fontWeight: 700, mb: 1 }}>
                  {Math.round((marketAlignment || 0.5) * 100)}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  Skills match demand
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
                <Psychology sx={{ color: '#A855F7', fontSize: 40, mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                  AI Confidence
                </Typography>
                <Typography variant="h4" sx={{ color: '#A855F7', fontWeight: 700, mb: 1 }}>
                  {Math.round((confidenceScore || 0.5) * 100)}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  Analysis reliability
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>

      {/* Transferable Skills Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card sx={{ 
          background: 'rgba(26, 26, 46, 0.8)', 
          border: '1px solid rgba(16, 185, 129, 0.2)',
          mb: 3
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Lightbulb sx={{ color: '#10B981' }} />
              <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                🚀 Transferable Skills Analysis
              </Typography>
              <Chip 
                label={`${transferableSkills?.length || 0} Skills`}
                size="small"
                sx={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}
              />
            </Box>
            
            {transferableSkills && transferableSkills.length > 0 ? (
              <Grid container spacing={2}>
                {transferableSkills.map((skill, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card sx={{ 
                      background: 'rgba(15, 23, 42, 0.5)', 
                      border: '1px solid rgba(16, 185, 129, 0.2)' 
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="body1" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                            {skill.originalSkill}
                          </Typography>
                          <Chip 
                            label={`${Math.round((skill.transferScore || 0) * 100)}%`}
                            size="small"
                            sx={{ 
                              background: skill.transferScore > 0.7 ? 'rgba(16, 185, 129, 0.2)' : 
                                         skill.transferScore > 0.5 ? 'rgba(251, 191, 36, 0.2)' : 
                                         'rgba(239, 68, 68, 0.2)',
                              color: skill.transferScore > 0.7 ? '#10B981' : 
                                    skill.transferScore > 0.5 ? '#FBBF24' : '#EF4444'
                            }}
                          />
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                          Transfers to: {skill.transfersTo && Array.isArray(skill.transfersTo) ? 
                            skill.transfersTo.join(', ') : 
                            (skill.transfersTo || 'Trending technologies in your field')
                          }
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                          <Chip 
                            label={skill.marketDemand || 'Medium'}
                            size="small"
                            sx={{ 
                              background: 'rgba(59, 130, 246, 0.2)', 
                              color: '#3B82F6',
                              fontSize: '0.7rem'
                            }}
                          />
                          <Chip 
                            label={skill.learningEffort || 'Medium'}
                            size="small"
                            sx={{ 
                              background: 'rgba(168, 85, 247, 0.2)', 
                              color: '#A855F7',
                              fontSize: '0.7rem'
                            }}
                          />
                          {skill.timeToMarket && (
                            <Chip 
                              label={skill.timeToMarket}
                              size="small"
                              sx={{ 
                                background: 'rgba(251, 191, 36, 0.2)', 
                                color: '#FBBF24',
                                fontSize: '0.7rem'
                              }}
                            />
                          )}
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
                            console.log('Find courses for:', skill.originalSkill);
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
                Complete your assessment to see transferable skills analysis
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Career Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card sx={{ 
          background: 'rgba(26, 26, 46, 0.8)', 
          border: '1px solid rgba(59, 130, 246, 0.2)',
          mb: 3
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Work sx={{ color: '#3B82F6' }} />
              <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                🎯 AI-Recommended Career Paths
              </Typography>
            </Box>
            
            {recommendedRoles && recommendedRoles.length > 0 ? (
              <Grid container spacing={3}>
                {recommendedRoles.map((role, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{ 
                      background: 'rgba(15, 23, 42, 0.5)', 
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      height: '100%'
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                            {role.title}
                          </Typography>
                          <Chip 
                            label={`${Math.round((role.matchScore || 0) * 100)}%`}
                            sx={{ 
                              background: 'rgba(16, 185, 129, 0.2)', 
                              color: '#10B981',
                              fontWeight: 600
                            }}
                          />
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                          {role.description}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1 }}>
                            💰 {role.salaryRange}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
                            📈 Growth: {role.jobGrowth}
                          </Typography>
                          {role.automationResistance && (
                            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                              🛡️ Automation Resistance: {Math.round(role.automationResistance * 100)}%
                            </Typography>
                          )}
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {role.transitionDifficulty && (
                            <Chip 
                              label={`${role.transitionDifficulty} Transition`}
                              size="small"
                              sx={{ 
                                background: 'rgba(168, 85, 247, 0.2)', 
                                color: '#A855F7',
                                fontSize: '0.7rem'
                              }}
                            />
                          )}
                          {role.timeToTransition && (
                            <Chip 
                              label={role.timeToTransition}
                              size="small"
                              sx={{ 
                                background: 'rgba(251, 191, 36, 0.2)', 
                                color: '#FBBF24',
                                fontSize: '0.7rem'
                              }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ color: '#94A3B8', fontStyle: 'italic' }}>
                Complete your assessment to see career recommendations
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Gaps Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card sx={{ 
          background: 'rgba(26, 26, 46, 0.8)', 
          border: '1px solid rgba(168, 85, 247, 0.2)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Assessment sx={{ color: '#A855F7' }} />
              <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                📚 Skills Gap Analysis
              </Typography>
              <Chip 
                label={`${skillGaps?.length || 0} Skills to Learn`}
                size="small"
                sx={{ background: 'rgba(168, 85, 247, 0.2)', color: '#A855F7' }}
              />
            </Box>
            
            {skillGaps && skillGaps.length > 0 ? (
              <List>
                {skillGaps.map((gap, index) => (
                  <ListItem key={index} sx={{ 
                    background: 'rgba(15, 23, 42, 0.5)', 
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: 2,
                    mb: 2
                  }}>
                    <ListItemIcon>
                      <Build sx={{ 
                        color: gap.priority === 'Critical' ? '#EF4444' : 
                               gap.priority === 'High' ? '#FBBF24' : '#10B981' 
                      }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                            {gap.requiredSkill}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip 
                              label={gap.priority}
                              size="small"
                              sx={{ 
                                background: gap.priority === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : 
                                           gap.priority === 'High' ? 'rgba(251, 191, 36, 0.2)' : 
                                           'rgba(16, 185, 129, 0.2)',
                                color: gap.priority === 'Critical' ? '#EF4444' : 
                                      gap.priority === 'High' ? '#FBBF24' : '#10B981',
                                fontSize: '0.7rem'
                              }}
                            />
                            {gap.estimatedLearningTime && (
                              <Chip 
                                label={`${gap.estimatedLearningTime}h`}
                                size="small"
                                sx={{ 
                                  background: 'rgba(59, 130, 246, 0.2)', 
                                  color: '#3B82F6',
                                  fontSize: '0.7rem'
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
                            Target Level: {gap.targetLevel} • Current: {gap.currentLevel}
                          </Typography>
                          {gap.marketDemand && (
                            <Chip 
                              label={`${gap.marketDemand} Demand`}
                              size="small"
                              sx={{ 
                                background: 'rgba(16, 185, 129, 0.2)', 
                                color: '#10B981',
                                fontSize: '0.7rem'
                              }}
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography sx={{ color: '#94A3B8', fontStyle: 'italic' }}>
                No skill gaps identified. Great job!
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default AIAnalysisDashboard;