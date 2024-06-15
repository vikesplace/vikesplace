import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import { Typography } from '@mui/material';


function CheckYourEmail() {
  return (
    <div className="CheckYourEmail">
      <Container>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography variant='h6'>
                Thank you for requesting and account!
            </Typography>   
            <br /> 
            <Typography variant='body2'>
                We have sent you a confirmation email.
            </Typography> 
            <Typography variant='body2'>
                Please check your email and follow the link to finish creating your account.
            </Typography> 
            <br />
        </Box>
      </Container>
    </div>
  );
}

export default CheckYourEmail;