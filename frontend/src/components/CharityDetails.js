import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



const CharityDetails = ({ charity }) => {

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/view-charities`);
  };


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
      <Button
              variant="contained"
              color="primary"
              onClick={() => handleBackClick()}
              >
                Back
       </Button>
    </Box>
  );
};

export default CharityDetails;
