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
import { SAMPLE_REVIEWS } from '../utils/SampleRecommenderData.js';

const ViewReviewsPage = () => {
  const dataService = useMemo(() => new DataService(), []);
  const { id } = useParams();

  const [listing, setListing] = useState(undefined);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    async function getListing() {
      const response = await dataService.getListing(id);
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status === 200) {
        setListing(response.data);
      } else {
        alert("Unable to get listing, please try again.");
      }
    }

    async function getReviews() {
      const responseRatings = await dataService.getRatings(id);
      if (responseRatings === undefined) {
        alert("Connection error, please try again.");
      } else if (responseRatings.status !== 200) {
        alert("Unable to get reviews, please try again.");
      }

      const responseReviews = await dataService.getReviews(id);
      if (responseReviews === undefined) {
        alert("Connection error, please try again.");
      } else if (responseReviews.status !== 200) {
        alert("Unable to get ratingsg, please try again.");
      }

      // TODO map reviews and ratings by username/createdOn date (wait for backend to pass those)
      // if (responseRatings.status === 200 && responseReviews.status === 200) {
      //   let displayValues = [];
      //   for (let i = 0; i < responseRatings.data.ratings.length; i++) {
      //     const nextRating = responseRatings.data.ratings[i];
      //     for (let j = 0; i < responseReviews.data.reviews.length; j++) {
      //       const nextReview = responseReviews.data.reviews[j];
      //       if ((nextRating.username === nextReview.username) && 
      //             (new Date(nextRating.createdOn)
      //               .toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"numeric"}) 
      //             === new Date(nextReview.createdOn))
      //               .toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"numeric"}) ) {
      //         displayValues.push({
      //           rating: nextRating.rating,
      //           review: nextReview.review
      //         })
      //       }            
      //     }            
      //   }
      //   setReviews(displayValues);
      // }  

      setReviews(SAMPLE_REVIEWS);
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
                  {reviews.map((review, index) => (
                    <TableRow key={index}>
                      <TableCell>{review.rating}</TableCell>
                      <TableCell>{review.review}</TableCell>
                    </TableRow>
                  ))}
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
