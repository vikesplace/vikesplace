import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import RecommendedList from '../components/recommender/RecommendedList.js';
import { Typography } from '@mui/material';
import { SAMPLE_DATA as data } from '../utils/SampleRecommenderData.js';
import { useSearch } from '../components/searchbar/searchContext.js';


function Home() {

  const {setShowSearch} = useSearch();
 
  useEffect(()=>{
    setShowSearch(true);

    return()=> setShowSearch(false);
  }, [setShowSearch]);

  return (
    <div className="Home">
      <Container>
        
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
