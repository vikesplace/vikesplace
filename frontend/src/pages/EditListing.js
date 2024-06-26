import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ManageListing from '../components/ManageListing.js';
import '../App.css';
import DataService from '../services/DataService.js';
import { SAMPLE_DATA } from '../utils/SampleRecommenderData.js';

function EditListing() {
  const dataService = new DataService();

  const { id } = useParams();

  let listing = undefined;
  let response = dataService.getListing(id);
  if (response !== undefined) {
    listing = response.data;
  } else {
    // TODO remove once we expect api to succeed
    listing = SAMPLE_DATA.find((listing) => listing.id === id);
  }

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