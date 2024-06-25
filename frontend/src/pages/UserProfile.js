import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import { Typography } from '@mui/material';
import DataService from '../services/DataService';

function UserProfile() {
  const dataService = new DataService();

  let user = {};
  let response = dataService.getMyUserData();
  if (response !== undefined) {
    user = response.data;
  }

  return (
    <div className="UserProfile">
      <Container>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.paper"
    >
      <Box
        border={1}
        borderRadius={5}
        borderColor="grey.300"
        p={4}
        width="30%"
        textAlign="left"
        boxShadow={3}
        mt={-20} 
      >
            <Typography variant='h6'>
              Username: 
            </Typography>   
            <Typography variant='body2'>
              {user.username}
            </Typography>
            <br /> 
            <Typography variant='h6'>
               Email:
            </Typography> 
            <Typography variant='body2'>
                {user.email}
            </Typography> 
            <br />
            <Typography variant='h6'>
               Postal Code:
            </Typography> 
            <Typography variant='body2'>
                {user.postalCode}
            </Typography> 
            <br />
            <Typography variant='h6'>
               Date Joined:
            </Typography> 
            <Typography variant='body2'>
                {user.createDate}
            </Typography> 
            <br />
        </Box>
        </Box>
      </Container>
    </div>
  );
}

export default UserProfile;