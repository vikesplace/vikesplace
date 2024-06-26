import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ManageListing from '../components/ManageListing.js';
import '../App.css';

// mock data, remove when adding api calls
const listings = [
  { id: '4', title: 'Test 1', price: '2.00', location: 'V9V 9W9', category: 'Furniture', status: 'AVAILABLE' },
  { id: '10',title: 'Super cool object', price: '3.45', location: 'V9V 9W9', category: 'Technology',status: 'SOLD' },
  { id: '100',title: 'Buy Me!', price: '1234.56', location: 'V9V 9W9', category: 'SchoolSupplies',status: 'AVAILABLE' },
  { id: '3',title: 'Another listings for sale', price: '98765432.10', location: 'V9V 9W9', category: 'Furniture', status: 'AVAILABLE' }
];



function EditListing() {
  const { id } = useParams();

  // TODO get listing information
  const listing = listings.find((listing) => listing.id === id);

  if (!listing) {
    return <div>
      <Typography align="center" variant='h6' sx={{mt: 2}}>
        No Listing Found
      </Typography>
    </div>;
  }

  return (
    <div className="EditListing">
      <Container>
        <Box mt={2}>
          <ManageListing listing={listing} />
        </Box>
      </Container>
    </div>
  );
}

export default EditListing;