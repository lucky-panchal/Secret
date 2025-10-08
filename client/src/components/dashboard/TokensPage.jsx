'use client';
import { Box, Grid, Card, CardContent, Typography, Button, Chip, LinearProgress, Avatar } from '@mui/material';
import { Token, TrendingUp, History, Redeem, School, People, Assignment } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const TokensPage = ({ onNavigate }) => {
  const { isDark } = useTheme();

  const tokenStats = {
    total: 1250,
    available: 850,
    earned: 400,
    redeemed: 400,
    monthlyEarned: 180
  };

  const earningActivities = [
    { activity: 'Complete Course Module', tokens: 50, icon: School, color: '#00F5FF' },
    { activity: 'Peer Mentoring Session', tokens: 25, icon: People, color: '#A855F7' },
    { activity: 'Submit Assignment', tokens: 15, icon: Assignment, color: '#FBBF24' },
    { activity: 'Community Participation', tokens: 10, icon: People, color: '#34D399' }
  ];

  const recentTransactions = [
    { id: 1, type: 'earned', activity: 'React Course Completion', tokens: 50, date: '2024-01-15', time: '10:30 AM' },
    { id: 2, type: 'redeemed', activity: 'Premium Course Access', tokens: -100, date: '2024-01-14', time: '2:15 PM' },
    { id: 3, type: 'earned', activity: 'Peer Help Session', tokens: 25, date: '2024-01-14', time: '11:45 AM' },
    { id: 4, type: 'earned', activity: 'Assignment Submission', tokens: 15, date: '2024-01-13', time: '4:20 PM' },
    { id: 5, type: 'redeemed', activity: 'Certificate Fast Track', tokens: -75, date: '2024-01-12', time: '9:30 AM' }
  ];

  const redeemOptions = [
    { id: 1, title: 'Premium Course Access', cost: 100, description: 'Unlock any premium course for 30 days', popular: true },
    { id: 2, title: 'Fast-Track Certificate', cost: 75, description: 'Get your certificate processed in 24 hours', popular: false },
    { id: 3, title: '1-on-1 Mentor Session', cost: 150, description: '60-minute session with industry expert', popular: true },
    { id: 4, title: 'Career Consultation', cost: 200, description: 'Personalized career guidance session', popular: false },
    { id: 5, title: 'Skill Assessment', cost: 50, description: 'Detailed skill evaluation report', popular: false }
  ];

  const handleRedeem = (optionId, cost) => {
    if (tokenStats.available >= cost) {
      console.log(`Redeeming option ${optionId} for ${cost} tokens`);
      alert(`Successfully redeemed for ${cost} tokens!`);
    } else {
      alert('Insufficient tokens for this redemption.');
    }
  };

  const handleEarnTokens = () => {
    if (onNavigate) {
      onNavigate('courses');
    }
  };

  return (
    <Box sx={{ p: 3, maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8FAFC', mb: 1 }}>
            Reskilling Tokens & Rewards
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            Earn tokens through learning activities and redeem them for premium benefits.
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          {/* Token Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Token sx={{ color: '#FBBF24', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                    Token Balance
                  </Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 3, mb: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#FBBF24' }}>
                      {tokenStats.total}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                      Total Earned
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#34D399' }}>
                      {tokenStats.available}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                      Available
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#00F5FF' }}>
                      +{tokenStats.monthlyEarned}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                      This Month
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<TrendingUp />}
                  onClick={handleEarnTokens}
                  sx={{
                    background: 'linear-gradient(135deg, #FBBF24 0%, #A855F7 100%)',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  Earn More Tokens
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Earning Activities */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                  Ways to Earn Tokens
                </Typography>
                
                <Grid container spacing={2}>
                  {earningActivities.map((activity, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        p: 2, 
                        borderRadius: 2, 
                        background: 'rgba(15, 15, 35, 0.6)',
                        border: `1px solid ${activity.color}20`
                      }}>
                        <Avatar sx={{ bgcolor: `${activity.color}20`, color: activity.color }}>
                          <activity.icon />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                            {activity.activity}
                          </Typography>
                          <Chip 
                            label={`+${activity.tokens} tokens`} 
                            size="small" 
                            sx={{ 
                              bgcolor: `${activity.color}20`, 
                              color: activity.color, 
                              fontWeight: 600,
                              mt: 0.5
                            }} 
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Redeem Options */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 3 }}>
                  Redeem Tokens
                </Typography>
                
                <Grid container spacing={2}>
                  {redeemOptions.map((option) => (
                    <Grid item xs={12} sm={6} key={option.id}>
                      <Box sx={{ 
                        p: 2.5, 
                        borderRadius: 2, 
                        background: 'rgba(15, 15, 35, 0.6)',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        position: 'relative'
                      }}>
                        {option.popular && (
                          <Chip 
                            label="Popular" 
                            size="small" 
                            sx={{ 
                              position: 'absolute', 
                              top: -8, 
                              right: 8, 
                              bgcolor: '#A855F7', 
                              color: '#ffffff', 
                              fontWeight: 600 
                            }} 
                          />
                        )}
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 1 }}>
                          {option.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                          {option.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip 
                            label={`${option.cost} tokens`} 
                            sx={{ 
                              bgcolor: 'rgba(168, 85, 247, 0.2)', 
                              color: '#A855F7', 
                              fontWeight: 600 
                            }} 
                          />
                          <Button 
                            variant="contained" 
                            size="small"
                            onClick={() => handleRedeem(option.id, option.cost)}
                            disabled={tokenStats.available < option.cost}
                            sx={{ 
                              background: 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)', 
                              textTransform: 'none',
                              '&:disabled': { 
                                bgcolor: 'rgba(148, 163, 184, 0.2)', 
                                color: '#64748B' 
                              }
                            }}
                          >
                            Redeem
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} xl={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Recent Transactions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <History sx={{ color: '#00F5FF' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                      Recent Activity
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 400, overflow: 'auto' }}>
                    {recentTransactions.map((transaction) => (
                      <Box key={transaction.id} sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(15, 15, 35, 0.6)'
                      }}>
                        <Box>
                          <Typography variant="body2" sx={{ 
                            color: '#F8FAFC', 
                            fontWeight: 500,
                            mb: 0.5
                          }}>
                            {transaction.activity}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                            {transaction.date} • {transaction.time}
                          </Typography>
                        </Box>
                        <Chip 
                          label={transaction.tokens > 0 ? `+${transaction.tokens}` : transaction.tokens} 
                          size="small"
                          sx={{
                            bgcolor: transaction.tokens > 0 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: transaction.tokens > 0 ? '#34D399' : '#EF4444',
                            fontWeight: 600
                          }}
                        />
                      </Box>
                    ))}
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

export default TokensPage;