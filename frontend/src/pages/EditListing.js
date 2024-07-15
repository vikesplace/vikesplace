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
    async function getMyUser() {
      const dataService = new DataService();
      const response = await dataService.getMyUserData();
      if (response === undefined) {
        alert("Connection error, please try again.");
        return -1;
      } else if (response.status === 200) {
        return response.data.userId;
      } else {
        alert("Unable to get your listings, please try again.");
        return -1;
      }
    }

    async function getMyListings(userId) {
      if (sellerId !== -1) {
        const dataService = new DataService();
        const response = await dataService.getListing(id);
        if (response === undefined) {
          alert("Connection error, please try again.");
        } else if (response.status === 200) {
          if (response.data.sellerId === userId) {
            setListing(response.data);
          } else {
            alert("Permission denied.");
          }
        } else {
          alert("Unable to get your listing, please try again.");
        }
      }      
    }

    userId = getMyUser();
    getMyListings(userId);
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