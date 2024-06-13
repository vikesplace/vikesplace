import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ManageListing from '../components/ManageListing.js';
import '../App.css';



function EditListing({ id }) {
  return (
    <div className="EditListing">
      <Container>
        <Box mt={2}>
          <ManageListing id={id} />
        </Box>
      </Container>
    </div>
  );
}

export default EditListing;