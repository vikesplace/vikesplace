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
                Thank you for your request!
            </Typography>   
            <br /> 
            <Typography variant='body2'>
                We have sent you an email with next steps. Please follow the link in the email.
            </Typography> 
            <br />
        </Box>
      </Container>
    </div>
  );
}

export default CheckYourEmail;