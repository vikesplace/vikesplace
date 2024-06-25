import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListingDetails from '../components/ListingDetails';
import DataService from '../services/DataService.js';

const ListingDetailsPage = () => {
  const dataService = new DataService();
  const { id } = useParams();
  
  let listing = undefined;
  let response = dataService.getListing(id);
  if (response !== undefined) {
    listing = response.data;
  }

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
