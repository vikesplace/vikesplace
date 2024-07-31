import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination'
import ListingCard from '../components/ListingCard';
import '../App.css';
import DataService from '../services/DataService';
import { Store } from 'react-notifications-component';

function ManageListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noListingMessage, setNoListingMessage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function getMyListings() {
      const dataService = new DataService();
      setNoListingMessage("Loading...");
      const response = await dataService.getSellerListings();
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
        setListings(response.data);
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
      setNoListingMessage("No Listings Available");
    }

    getMyListings();
  }, []);

  const handleListingClick = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedListings = listings.slice((currentPage - 1) * itemsPerPage, (currentPage) * itemsPerPage);

  return (
    <div className="ManageListings">
      <Container>
      <Pagination
          count={Math.ceil(listings.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        />
      <Box mt={2}>
        {(listings.length === 0) && 
          <Typography align="center" variant='h6'>
            {noListingMessage}
          </Typography>
        }
        {paginatedListings.map((listing) => (
          <div key={'div' + listing.listingId} onClick={() => handleListingClick(listing.listingId)}>
            <ListingCard
              id={listing.listingId}
              title={listing.title}
              price={listing.price}
              location={listing.location}
              status={listing.status}
              listedAt={listing.listedAt} 
              lastUpdatedAt={listing.lastUpdatedAt} 
              forCharity={listing.forCharity}   
              sellerId={listing.sellerId}         
            />
            <br />
          </div>
        ))}
      </Box>
      <Pagination
        count={Math.ceil(listings.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
      />
    </Container>
  </div>
  );
}

export default ManageListings;