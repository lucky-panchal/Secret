import { Box, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../theme/muiTheme';
import Sidebar from './Sidebar';
import TopBar from '../ui/TopBar';
import WelcomeCard from '../ui/WelcomeCard';
import FolderCard from '../ui/FolderCard';
import FileTable from '../ui/FileTable';
import CalendarWidget from '../ui/CalendarWidget';
import TaskCard from '../ui/TaskCard';
import StorageChart from '../ui/StorageChart';

const folders = [
  { name: 'Student Records', color: '#f44336', users: ['A', 'B'], files: 245, date: 'today' },
  { name: 'Job Applications', color: '#2196f3', users: ['C', 'D'], files: 128, date: '2h ago' },
  { name: 'Placement Reports', color: '#ff9800', users: ['E'], files: 89, date: 'last week' }
];

export default function DriveLayout() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Box sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default' }}>
            <TopBar />
            <WelcomeCard />
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {folders.map((folder, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <FolderCard {...folder} />
                </Grid>
              ))}
            </Grid>
            <FileTable />
          </Box>
          <Box sx={{ width: 300, p: 3, backgroundColor: 'background.paper', borderLeft: 1, borderColor: 'divider' }}>
            <CalendarWidget />
            <TaskCard />
            <StorageChart />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}