import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { Storage } from '@mui/icons-material';

export default function StorageChart() {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Storage color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Storage</Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Uploads</Typography>
            <Typography variant="body2" color="primary">2.4 GB</Typography>
          </Box>
          <LinearProgress variant="determinate" value={60} sx={{ height: 6, borderRadius: 3 }} />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Files Received</Typography>
            <Typography variant="body2" color="secondary">1.8 GB</Typography>
          </Box>
          <LinearProgress variant="determinate" value={45} color="secondary" sx={{ height: 6, borderRadius: 3 }} />
        </Box>
        
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Space Left</Typography>
            <Typography variant="body2" color="success.main">5.8 GB</Typography>
          </Box>
          <LinearProgress variant="determinate" value={25} color="success" sx={{ height: 6, borderRadius: 3 }} />
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          10 GB total storage
        </Typography>
      </CardContent>
    </Card>
  );
}