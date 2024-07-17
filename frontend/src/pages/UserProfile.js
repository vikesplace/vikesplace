import React, { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import { Typography } from '@mui/material';
import DataService from '../services/DataService';

function UserProfile() {
  const dataService = useMemo(() => new DataService(), []);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await dataService.getMyUserData(); 
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status === 200) {
        setUser(response.data);
      } else {
        alert("Unable to get listings, please try again.");
      }
    };

    fetchUser();
  }, [dataService]);

  if (user === undefined) {
    return <div>
      <Typography align="center" variant='h6' sx={{mt: 2}}>
        No User Found
      </Typography>
    </div>;
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
               Postal Code:
            </Typography> 
            <Typography variant='body2'>
                {user.location}
            </Typography> 
            <br />
            <Typography variant='h6'>
               Date Joined:
            </Typography> 
            <Typography variant='body2'>
                {new Date(user.joiningDate).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}
            </Typography> 
            <br />
        </Box>
        </Box>
      </Container>
    </div>
  );
}

export default UserProfile;