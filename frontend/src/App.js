import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppBar position="static" sx={{ backgroundColor: '#1891e6' }}>
        <Toolbar sx={{ justifyContent: 'flex-start' }}>
          <Typography variant="h5" component="div" >
            VikesPlace
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={2}>
          {/* Add your main content here */}
        </Box>
      </Container>
    </div>
  );
}

export default App;
