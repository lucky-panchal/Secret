'use client';
import { Grid, Card, Typography, Box } from '@mui/material';
import { TrendingUp, PieChart, BarChart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import DashboardLayout from '@/components/layout/DashboardLayout';

const AnalyticsPage = () => {
  const { isDark } = useTheme();

  const chartData = [
    { label: 'Projects', value: 85, color: '#4a90e2' },
    { label: 'Tasks', value: 92, color: '#4ecdc4' },
    { label: 'Team', value: 78, color: '#ff6b6b' },
    { label: 'Revenue', value: 95, color: '#ffd700' }
  ];

  const metrics = [
    { title: 'Total Revenue', value: '$124,500', change: '+12%', icon: <TrendingUp /> },
    { title: 'Active Projects', value: '24', change: '+8%', icon: <BarChart /> },
    { title: 'Completion Rate', value: '89%', change: '+5%', icon: <PieChart /> }
  ];

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: isDark ? 'white' : '#1a1a1a' }}>
        Analytics
      </Typography>

      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card sx={{
                p: 3,
                background: isDark ? '#2a2a2a' : '#ffffff',
                border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Box sx={{ color: '#4a90e2', mb: 2, fontSize: '2rem' }}>
                  {metric.icon}
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#4a90e2', mb: 1 }}>
                  {metric.value}
                </Typography>
                <Typography variant="body1" sx={{ color: isDark ? 'white' : 'black', fontWeight: 600, mb: 1 }}>
                  {metric.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#4ecdc4' }}>
                  {metric.change}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}

        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3, background: isDark ? '#2a2a2a' : '#ffffff', border: isDark ? '1px solid #333' : '1px solid #e0e0e0', borderRadius: 2, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: isDark ? 'white' : 'black' }}>
              Performance Chart
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'end', height: 300, gap: 2 }}>
              {[65, 78, 45, 89, 67, 56, 78, 92, 34, 67, 89, 45].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  style={{
                    flex: 1,
                    background: `linear-gradient(to top, #4a90e2, #ff6b6b)`,
                    borderRadius: '4px 4px 0 0',
                    minHeight: '20px'
                  }}
                />
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ p: 3, background: isDark ? '#2a2a2a' : '#ffffff', border: isDark ? '1px solid #333' : '1px solid #e0e0e0', borderRadius: 2, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: isDark ? 'white' : 'black' }}>
              Distribution
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {chartData.map((item, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: isDark ? 'white' : 'black' }}>{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: item.color }}>{item.value}%</Typography>
                  </Box>
                  <Box sx={{ 
                    height: 8, 
                    background: isDark ? '#333' : '#f0f0f0', 
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      style={{
                        height: '100%',
                        background: item.color,
                        borderRadius: '4px'
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AnalyticsPage;