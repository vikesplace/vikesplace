import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ManageListing from '../components/ManageListing.js';
import '../App.css';
import DataService from '../services/DataService.js';

function EditListing() {
  const { id } = useParams();
  const [listing, setListing] = useState(undefined);

  useEffect(() => {
    async function getMyListings() {
      const dataService = new DataService();
      const response = await dataService.getListing(id);
      if (response === undefined) {
        alert("Connection error. Please try again.");
      } else if (response.status === 200) {
        setListing(response.data);
      } else {
        alert("Unable to get your listings, please try again.");
      }
    }

    getMyListings();
  }, [id]);

  if (listing === undefined) {
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