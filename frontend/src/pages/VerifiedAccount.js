import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import { Link } from "react-router-dom"; 
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

function VerifiedAccount() {
  return (
    <div className="VerifiedAccount">
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
                Welcome!
            </Typography>    
            <Typography variant='body2'>
                Your account is now verified and ready for use.
            </Typography> 
            <br /> 
            <Typography variant='body2'>
                Click the button below to navigate to your home page
                and begin browsing.
            </Typography> 
            <br />
            <Link to={'/'}>
                <Button variant="contained">Home</Button>
            </Link>
        </Box>
      </Container>
    </div>
  );
}

export default VerifiedAccount;