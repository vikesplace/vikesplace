import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchBar from '../components/SearchBar.js';
import '../App.css';

function Home() {
  return (
    <div className="Home">
      <Container>
        <SearchBar />
        <Box mt={2}>
            Home
          {/* Add your main content here */}
        </Box>
      </Container>
    </div>
  );
}

export default Home;
