import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



const CharityDetails = ({ charity }) => {
  return (
    <Box
          border={1}
          borderRadius={5}
          borderColor="grey.300"
          p={4}
          textAlign="left"
          boxShadow={3}
          mt={2}
        >
      <Typography variant="h4">{charity.name}</Typography>
      <Typography variant="h6">Funds: {charity.funds}</Typography>
      <Typography variant="h6">Number of Listings: {charity.numListings}</Typography>
      <Typography variant="h6">End Date: {new Date(charity.endDate).toLocaleDateString()}</Typography>
      <Typography variant="h6">Status: {charity.status}</Typography>
    </Box>
  );
};

export default CharityDetails;
