import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import { Link } from "react-router-dom"; 
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

function PasswordUpdated() {
  return (
    <div className="PasswordUpdated">
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
                Done!
            </Typography>    
            <Typography variant='body2'>
                Your password has been updated and is ready for use.
            </Typography> 
            <br /> 
            <Typography variant='body2'>
                Please login before continuing.
            </Typography> 
            <br />
            <Link to={'/login'}>
                <Button variant="contained">Login</Button>
            </Link>
        </Box>
      </Container>
    </div>
  );
}

export default PasswordUpdated;