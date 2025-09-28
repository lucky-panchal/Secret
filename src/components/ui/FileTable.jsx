import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { InsertDriveFile, Share, MoreVert } from '@mui/icons-material';

const files = [
  { name: 'Project Report.pdf', type: 'PDF', shared: true, date: '2 hours ago', size: '2.4 MB' },
  { name: 'Design Assets.zip', type: 'ZIP', shared: false, date: 'Yesterday', size: '15.2 MB' },
  { name: 'Meeting Notes.docx', type: 'DOC', shared: true, date: '3 days ago', size: '1.1 MB' },
];

export default function FileTable() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Files
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Shared</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Size</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <InsertDriveFile color="primary" />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{file.name}</Typography>
                      <Chip label={file.type} size="small" variant="outlined" />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {file.shared && <Share fontSize="small" color="primary" />}
                </TableCell>
                <TableCell>{file.date}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}