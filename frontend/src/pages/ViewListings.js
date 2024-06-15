import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import ActionAreaCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';

const listings = [
  { id: '4', title: 'Test 1', price: '2.00', location: 'V9VW9W', status: 'AVAILABLE' },
  { id: '10', title: 'Super cool object', price: '3.45', location: 'V9VW9W', status: 'SOLD' },
  { id: '100', title: 'Buy Me!', price: '1234.56', location: 'V9VW9W', status: 'AVAILABLE' },
  { id: '3', title: 'Another listings for sale', price: '98765432.10', location: 'V9VW9W', status: 'AVAILABLE' }
];

function ViewListings() {
  const navigate = useNavigate();

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  return (
    <div className="ViewListings">
      <Container>
        <SearchBar />
        <Box mt={2}>
          {listings.map((listing) => (
            <div key={'div' + listing.id} onClick={() => handleListingClick(listing.id)}>
              <ActionAreaCard
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

export default ViewListings;
