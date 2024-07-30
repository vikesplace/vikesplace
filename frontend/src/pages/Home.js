import { React, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import RecommendedGrid from '../components/recommender/RecommendedGrid.js';
import { Typography } from '@mui/material';
import { useSearch } from '../components/searchbar/searchContext.js';
import DataService from '../services/DataService.js';
import { SAMPLE_DATA } from '../utils/SampleRecommenderData.js';




function Home() {

  const { setShowSearch } = useSearch();
  const dataService = new DataService();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {

   fetchRecommendations();
  //setRecommendations(SAMPLE_DATA)
  },[])
  
  const fetchRecommendations = async () => {
    const response = await dataService.getRecommendations();
    console.log(response.data);
    setRecommendations(response.data);
  }
  

  useEffect(() => {
    setShowSearch(true);

    return () => setShowSearch(false);
  }, [setShowSearch]);

 
  return (
    <div className="Home">
      <Container>

        <Box mt={2}>
          <Typography variant='h5'>
            Top picks for you
          </Typography>
          <br />
          <RecommendedGrid data ={recommendations} />
          {/* Add your main content here */}
        </Box>
      </Container>
    </div>
  );
}

export default Home;
