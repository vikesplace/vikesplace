import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListingCard from '../components/ListingCard';
import '../App.css';

// TODO GET with api calls
const listings = [
  { id: '4', title: 'Test 1', price: '2.00', location: 'V9V 9W9', category: 'Furniture', status: 'AVAILABLE' },
  { id: '10',title: 'Super cool object', price: '3.45', location: 'V9V 9W9', category: 'Technology',status: 'SOLD' },
  { id: '100',title: 'Buy Me!', price: '1234.56', location: 'V9V 9W9', category: 'SchoolSupplies',status: 'AVAILABLE' },
  { id: '3',title: 'Another listings for sale', price: '98765432.10', location: 'V9V 9W9', category: 'Furniture', status: 'AVAILABLE' }
];

function ManageListings() {
  const navigate = useNavigate();

  const handleListingClick = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  return (
    <div className="ManageListings">
      <Container>
      <Box mt={2}>
          {(listings.length === 0) && 
            <Typography align="center" variant='h6'>
              No Listings Meet Criteria
            </Typography>
          }
          {listings.map((listing) => (
            <div key={'div' + listing.id} onClick={() => handleListingClick(listing.id)}>
              <ListingCard
                id={listing.id}
                title={listing.title}
                price={listing.price}
                location={listing.location}
                status={listing.status}          
              />
              <br />
            </div>
          ))}
        </Box>
      </Container>
    </div>
  );
}

export default ManageListings;