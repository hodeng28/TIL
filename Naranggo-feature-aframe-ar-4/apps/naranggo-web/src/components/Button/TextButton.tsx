import theme from '@/utils/theme';
import { Button, styled } from '@mui/material';

export const TextButton = styled(Button)(() => ({
  minWidth: 'initial',
  padding: '0',
  color: theme.palette.secondary.main,
  fontWeight: 'bold',
  fontSize: '1rem'
}));
