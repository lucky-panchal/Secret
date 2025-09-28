import { Card, CardContent, Typography, Box, Button, Grid } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dates = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, null]
];

export default function CalendarWidget() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>December 2024</Typography>
          <Box>
            <Button size="small" sx={{ minWidth: 32 }}><ChevronLeft /></Button>
            <Button size="small" sx={{ minWidth: 32 }}><ChevronRight /></Button>
          </Box>
        </Box>
        <Grid container spacing={0.5}>
          {days.map((day, i) => (
            <Grid item xs key={i}>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', fontWeight: 600, color: 'text.secondary' }}>
                {day}
              </Typography>
            </Grid>
          ))}
          {dates.flat().map((date, i) => (
            <Grid item xs key={i}>
              <Box 
                sx={{ 
                  height: 32, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderRadius: 1,
                  cursor: date ? 'pointer' : 'default',
                  backgroundColor: date === 15 ? 'primary.main' : 'transparent',
                  color: date === 15 ? 'white' : 'text.primary',
                  '&:hover': date ? { backgroundColor: date === 15 ? 'primary.dark' : 'action.hover' } : {}
                }}
              >
                <Typography variant="body2">{date}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}