'use client';

import { Grid, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { People, ShoppingCart, AttachMoney, CloudUpload, Folder } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatusCard from '../../components/ui/StatusCard';
import MetricsChart from '../../components/ui/MetricsChart';
import DatePicker from '../../components/ui/DatePicker';
import DonutChart from '../../components/ui/PieChart';
import TrafficChart from '../../components/ui/BarChart';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout loading={loading}>
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <CloudUpload sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Welcome to Career Dashboard
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                Track student progress and manage job placements efficiently
              </Typography>
              <Button variant="contained" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } }}>
                Upload Files
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Status Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatusCard
            title="Students"
            value="2,420"
            change="+12.5%"
            trend="up"
            icon={<People />}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatusCard
            title="Job Matches"
            value="1,340"
            change="+8.2%"
            trend="up"
            icon={<ShoppingCart />}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatusCard
            title="Placements"
            value="850"
            change="+15.3%"
            trend="up"
            icon={<AttachMoney />}
            loading={loading}
          />
        </Grid>

        {/* Charts Row */}
        <Grid item xs={12} md={8}>
          <MetricsChart loading={loading} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker loading={loading} />
        </Grid>

        {/* Bottom Charts */}
        <Grid item xs={12} md={6}>
          <DonutChart loading={loading} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrafficChart loading={loading} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}