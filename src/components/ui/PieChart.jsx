import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Product A', value: 400, color: '#1976d2' },
  { name: 'Product B', value: 300, color: '#42a5f5' },
  { name: 'Product C', value: 200, color: '#90caf9' },
  { name: 'Product D', value: 100, color: '#bbdefb' },
];

export default function DonutChart({ loading = false }) {
  if (loading) {
    return (
      <Card sx={{ height: 300 }}>
        <CardContent>
          <Skeleton variant="text" width={140} height={24} sx={{ mb: 2 }} />
          <Box sx={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton variant="circular" width={160} height={160} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: 300 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Top Product Sale
        </Typography>
        <Box sx={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{
                  fontSize: '12px',
                  paddingTop: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}