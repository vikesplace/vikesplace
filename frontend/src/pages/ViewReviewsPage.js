import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListingDetailsReview from '../components/ListingDetailsReview';
import DataService from '../services/DataService.js';
import { SAMPLE_DATA } from '../utils/SampleRecommenderData.js';

const ViewReviewsPage = () => {
  const dataService = new DataService();
  const { id } = useParams();

  const [listing, setListing] = useState(undefined);
  
  useEffect(() => {
    let response = dataService.getListing(id);
    if (response !== undefined) {
      setListing(response.data);
    } else {
      // TODO remove once we expect API to succeed
      setListing(SAMPLE_DATA.find((listing) => listing.id === id));
    }
  }, [id, dataService]);

  if (!listing) {
    return <div>
      <Typography align="center" variant='h6' sx={{mt: 2}}>
        No Listing Found
      </Typography>
    </div>;
  }

  return (
    <div>
      <ListingDetailsReview listing={listing} />
    </div>
  );
};

export default ViewReviewsPage;
