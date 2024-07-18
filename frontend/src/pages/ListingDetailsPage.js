import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListingDetails from '../components/ListingDetails';
import DataService from '../services/DataService.js';

const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(undefined);

  useEffect(() => {
    async function getMyListings() {
      const dataService = new DataService();
      const response = await dataService.getListing(id);
      if (response === undefined) {
        alert("Connection error, please try again.");
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
    <div>
      <ListingDetails listing={listing} />
    </div>
  );
};

export default ListingDetailsPage;
