import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListingDetails from '../components/ListingDetails';
import DataService from '../services/DataService.js';
import { Store } from 'react-notifications-component';

const ViewReviewsPage = () => {
  const dataService = useMemo(() => new DataService(), []);
  const { id } = useParams();

  const [listing, setListing] = useState(undefined);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    async function getListing() {
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

    async function getReviews() {
      let displayValues = [];
      const responseRatings = await dataService.getRatings(id);
      if (responseRatings === undefined) {
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
      } else if (responseRatings.status !== 200) {
        Store.addNotification({
          title: 'Unable to Get Ratings',
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
      } else {
        for (let i = 0; i < responseRatings.data.ratings.length; i++) {
          displayValues.push({
            rating: responseRatings.data.ratings[i].rating,
            review: ""
          })
        }
      }

      const responseReviews = await dataService.getReviews(id);
      if (responseReviews === undefined) {
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
      } else if (responseReviews.status !== 200) {
        Store.addNotification({
          title: 'Unable to Get Reviews',
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
      } else {
        for (let j = 0; j < responseReviews.data.reviews.length; j++) {
          displayValues.push({
            rating: "",
            review: responseReviews.data.reviews[j].review
          })          
        } 
      }

      // TODO update after backend changes (eg. include username, createdOn)
      // try to map username/createdOn so can display ratings and reviews next to each other
      setReviews(displayValues);
    }

    getListing();
    getReviews();
  }, [id, dataService]);

  if (!listing) {
    return <div>
      <Typography align="center" variant='h6' sx={{mt: 2}}>
        No Listing Found
      </Typography>
    </div>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      bgcolor="background.paper"
    >
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <ListingDetails listing={listing} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            border={1}
            borderRadius={5}
            borderColor="grey.300"
            p={4}
            textAlign="left"
            boxShadow={3}
          >
            <Typography variant="h5" component="h3" gutterBottom>
              Reviews
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell>Review</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(reviews !== undefined && reviews !== null && reviews.length !== 0) && 
                  reviews.map((review, index) => (
                    <TableRow key={index}>
                      <TableCell>{review.rating}</TableCell>
                      <TableCell>{review.review}</TableCell>
                    </TableRow>
                  ))}
                  {(reviews === undefined || reviews === null || reviews.length === 0) &&
                  <Typography>
                    <TableRow key={0}>
                      <TableCell> 
                        No Reviews or Ratings Available
                      </TableCell>
                    </TableRow>
                  </Typography>
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewReviewsPage;
