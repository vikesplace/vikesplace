import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchBar from '../components/SearchBar.js';
import '../App.css';
import RecommendedList from '../components/RecommendedList.js';
import { Typography } from '@mui/material';
import { SAMPLE_DATA as data } from '../utils/SampleRecommenderData.js';

function Home() {
  return (
    <div className="Home">
      <Container>
        <SearchBar />
        <Box mt={2}>
          <Typography variant='h5'>
            Top picks for you
          </Typography>
          <br/>
          <RecommendedList data = {data}/>
          {/* Add your main content here */}
        </Box>
      </Container>
    </div>
  );
}

export default Home;
