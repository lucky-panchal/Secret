'use client';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DynamicChart from './DynamicChart';

const ChartExample = () => {
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Skills Progress',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => ({
        ...prev,
        datasets: [{
          ...prev.datasets[0],
          data: prev.datasets[0].data.map(() => Math.floor(Math.random() * 50) + 10)
        }]
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Dynamic Chart Example
      </Typography>
      <DynamicChart type="line" data={chartData} />
    </Box>
  );
};

export default ChartExample;