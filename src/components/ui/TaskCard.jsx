import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Assignment } from '@mui/icons-material';

export default function TaskCard() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Assignment color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Your Tasks</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            Review student applications
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Due: Today, 5:00 PM
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            Update job database
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Due: Tomorrow, 2:00 PM
          </Typography>
        </Box>
        <Chip label="3 pending" size="small" color="warning" />
      </CardContent>
    </Card>
  );
}