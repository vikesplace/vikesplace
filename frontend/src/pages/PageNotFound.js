import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import { Link } from "react-router-dom"; 
import { Typography } from '@mui/material';
import { Button } from '@mui/material';


function PageNotFound() {
  return (
    <div className="PageNotFound">
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
                Sorry, this page does not exist.
            </Typography>   
            <br /> 
            <Typography variant='body2'>
                
            </Typography> 
            <br />
            <Link to={'/home'}>
                <Button variant="contained">Home</Button>
            </Link>
        </Box>
      </Container>
    </div>
  );
}

export default PageNotFound;