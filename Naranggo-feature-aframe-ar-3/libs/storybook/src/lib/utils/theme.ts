import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    custom: {
      light: 'rgba(255, 255, 255, 1)',
      default: 'rgba(233, 131, 79, 1)',
      grey200: '#eeeeee',
      grey: 'rgba(167, 167, 167, 1)',
      grey2: 'rgba(219, 219, 219, 0.3)',
      grey3: 'rgba(127, 127, 127, 1)',
      grey4: 'rgba(110, 110, 110, 1)',
      dark: 'rgba(0, 0, 0, 1)',
      blue: 'rgba(49, 34, 174, 1)',
      blue100: '#BBDEFB',
      skyblue: 'rgba(135, 206, 235, 1)',
      yellow: 'rgba(239, 188, 14, 1)',
      green: 'rgba(17, 183, 25, 1)',
      red: 'rgba(255, 76, 59, 1)',
      orange: 'rgba(233, 131, 79, 1)'
    }
  }
});

export default theme;
