import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logoDefault from '../logos/no-logo.png';
import logo1 from '../logos/breast_cancer.png';
import logo2 from '../logos/cancer_society.png';
import logo3 from '../logos/children_hospital.png';
import logo4 from '../logos/heart_stroke.png';
import logo5 from '../logos/red_cross.png';
import logo6 from '../logos/salvation_army.png';
import logo7 from '../logos/spca.png';


const CharityDetails = ({ charity }) => {
  let logo;
  switch (charity.logoUrl) {
    case 1:
      logo = logo1;
    case 2:
      logo = logo2;
    case 3:
      logo = logo3;
    case 4:
      logo = logo4;
    case 5:
      logo = logo5;
    case 6:
      logo = logo6;
    case 7:
      logo = logo7;
    default:
      logo = logoDefault;
  }

  return (
    <div key="charity-details">
      <Box
        border={1}
        borderRadius={5}
        borderColor="grey.300"
        p={4}
        textAlign="left"
        boxShadow={3}
        mt={2}
        key="info"
      >
        <Typography variant="h4">{charity.name}</Typography>
        <Typography variant="h6">Funds: {charity.funds}</Typography>
        <Typography variant="h6">Number of Listings: {charity.numListings}</Typography>
        <Typography variant="h6">End Date: {new Date(charity.endDate).toLocaleDateString()}</Typography>
        <Typography variant="h6">Status: {charity.status}</Typography>
      </Box>
      <Box
        border={1}
        borderRadius={5}
        borderColor="grey.300"
        p={4}
        textAlign="left"
        boxShadow={3}
        mt={2}
        key="partner-logo"
      >
      <Typography variant="h6">Thanks to our Partner:</Typography>
      <img src={logo} aria-label='partner organization logo'/>
    </Box>
  </div>
  );
};

export default CharityDetails;
