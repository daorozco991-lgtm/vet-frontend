import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2178d4',
      dark: '#1a5fa8',
      light: '#4a9de0',
      contrastText: '#ffffff',
    },
  },
  shape: { borderRadius: 8 },
});