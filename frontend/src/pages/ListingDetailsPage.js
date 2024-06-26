import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListingDetails from '../components/ListingDetails';

// Mock data for the example
const listings = [
  { id: '4', title: 'Test 1', price: '2.00', location: 'V9VW9W', status: 'AVAILABLE', category: 'Sports' },
  { id: '10', title: 'Super cool object', price: '3.45', location: 'V9VW9W', status: 'SOLD', category: 'Health' },
  { id: '100', title: 'Buy Me!', price: '1234.56', location: 'V9VW9W', status: 'AVAILABLE', category: 'Office Supplies' },
  { id: '3', title: 'Another listing for sale', price: '98765432.10', location: 'V9VW9W', status: 'AVAILABLE', category: 'Sports' },
  
];

const ListingDetailsPage = () => {
  const { id } = useParams();
  const listing = listings.find((listing) => listing.id === id);

  if (!listing) {
    return <div>
      <Typography align="center" variant='h6' sx={{mt: 2}}>
        No Listing Found
      </Typography>
    </div>;
  }

  return (
    <div>
      <ListingDetails listing={listing} />
    </div>
  );
};

export default ListingDetailsPage;
