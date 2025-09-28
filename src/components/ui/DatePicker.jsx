import { Card, CardContent, Typography, Box, Button, Skeleton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [12, 13, 14, 15, 16, 17, 18];

export default function DatePicker({ loading = false }) {
  if (loading) {
    return (
      <Card sx={{ height: 120 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="text" width={100} height={24} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: 120 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            This Week
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" sx={{ minWidth: 32, p: 0.5 }}>
              <ChevronLeft />
            </Button>
            <Button size="small" sx={{ minWidth: 32, p: 0.5 }}>
              <ChevronRight />
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {weekDays.map((day, index) => (
            <Box
              key={day}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                backgroundColor: index === 2 ? 'primary.main' : 'transparent',
                color: index === 2 ? 'primary.contrastText' : 'text.primary',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: index === 2 ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {day}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {dates[index]}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}