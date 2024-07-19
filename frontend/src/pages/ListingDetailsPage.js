import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListingDetails from '../components/ListingDetails';
import DataService from '../services/DataService.js';
import { Store } from 'react-notifications-component';

const ListingDetailsPage = () => {
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
          title: 'Unable to Get Listings',
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
    <div>
      <ListingDetails listing={listing} />
    </div>
  );
};

export default ListingDetailsPage;
