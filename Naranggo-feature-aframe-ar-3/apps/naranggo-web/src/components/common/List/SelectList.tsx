import Box from '@mui/material/Box';
import List from '@mui/material/List';

interface SelectListProps {
  children: React.ReactNode;
}

const SelectList = ({ children }: SelectListProps) => (
  <Box sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}>
    <List component="nav" aria-label="main mailbox folders">
      {children}
    </List>
  </Box>
);

export default SelectList;
