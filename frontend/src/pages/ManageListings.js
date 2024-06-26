import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListingCard from '../components/ListingCard';
import '../App.css';
import DataService from '../services/DataService';
import { SAMPLE_DATA } from '../utils/SampleRecommenderData';

function ManageListings() {
  const dataService = new DataService();

  const navigate = useNavigate();

  let listings = []; 
  let response = dataService.getSellerListings(); 
  if (response !== undefined) {
    listings = response.data;
  } else {
    // TODO remove once we expect api to succeed
    listings = SAMPLE_DATA;
  }

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
                category={listing.category}          
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