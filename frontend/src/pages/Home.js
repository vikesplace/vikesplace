import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import NavBar from '../NavBar.js';
import '../App.css';

function Home() {
  return (
    <div className="Home">
      <NavBar position="static"></NavBar>
      <Container>
        <Box mt={2}>
          {/* Add your main content here */}
        </Box>
      </Container>
    </div>
  );
}

export default Home;
