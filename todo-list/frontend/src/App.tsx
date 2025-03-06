import Router from './config/Router';
import { ThemeProvider } from './components/ThemeProvider';
import { Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Box className="app-container">
        <Router />
      </Box>
    </ThemeProvider>
  );
}

export default App;
