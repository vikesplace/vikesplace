import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CharityDetails from '../components/CharityDetails';
import { SAMPLE_CHARITY } from '../utils/SampleRecommenderData';

const CharityDetailsPage = () => {
  const { id } = useParams();
  const [charity, setCharity] = useState(undefined);

  useEffect(() => {
    const charityData = SAMPLE_CHARITY.find(c => c.charityId === id);
    setCharity(charityData);
  }, [id]);

  if (charity === undefined) {
    return (
      <div>
        <Typography align="center" variant='h6' sx={{ mt: 2 }}>
          No Charity Found
        </Typography>
      </div>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      bgcolor="background.paper"
    >
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <CharityDetails charity={charity} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharityDetailsPage;


