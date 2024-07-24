import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ManageListing from '../components/ManageListing.js';
import '../App.css';
import DataService from '../services/DataService.js';
import { Store } from 'react-notifications-component';

function EditListing() {
  const { id } = useParams();
  const [listing, setListing] = useState(undefined);

  useEffect(() => {
    async function getMyListings() {
      const dataService = new DataService();
      const response = await dataService.getListing(id);
      if (response === undefined) {
        Store.addNotification({
          title: 'Connection Error!',
          message: 'Please try again',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      } else if (response.status === 200) {
        setListing(response.data);
      } else {
        Store.addNotification({
          title: 'Unable to Get Listing',
          message: 'Please try again',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
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