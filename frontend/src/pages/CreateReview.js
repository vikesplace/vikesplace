import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ListingDetails from '../components/ListingDetails';
import DataService from '../services/DataService.js';

const CreateReview = () => {
  const dataService = useMemo(() => new DataService(), []);
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(undefined);
  const [rating, setRating] = React.useState(null);
  const [review, setReview] = React.useState(null);
  const [reviewError, setReviewError] = React.useState(false);

  useEffect(() => {
    async function getMyListings() {
      const response = await dataService.getListing(id);
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status === 200) {
        setListing(response.data);
      } else {
        alert("Unable to get listing, please try again.");
      }
    }

    getMyListings();
  }, [id, dataService]);

  const validateForm = () => {
    if (rating === null) {
      // set error
    }

    if (review === null) {
        setReviewError(true);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateForm();

    let response = await dataService.createRating(id, rating);
    if (response === undefined) {
      alert("Connection error, please try again.");
    } else if (response.status !== 200 && response.status !== 201) {
      alert("Unable to create rating, please try again.");
    }

    response = await dataService.createReview(id, review);
    if (response === undefined) {
      alert("Connection error, please try again.");
    } else if (response.status === 200 || response.status === 201) {
      navigate("/listings/" + id);
    } else {
      alert("Unable to create review, please try again.");
    }
  }

  if (listing === undefined) {
    return <div>
      <Typography align="center" variant='h6' sx={{mt: 2}}>
        No Listing Found
      </Typography>
    </div>;
  }

  return (
    <Grid container spacing={1} >
      <Grid item xs={12} md={6}>
        <ListingDetails listing={listing} hideButton={true} />
      </Grid>
      <Grid item xs={12} md={6}>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.paper"
            >
                <Box
                    border={1}
                    borderRadius={5}
                    borderColor="grey.300"
                    p={4}
                    width="30%"
                    textAlign="left"
                    boxShadow={3}
                    mt={-20} 
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newRating) => {
                                    setRating(newRating);
                                }}
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="review"
                                    label="Review"
                                    id="review"
                                    placeholder="Enter your review"
                                    value={review}
                                    onChange={(event, newReview) => {
                                        setReview(newReview);
                                    }}
                                    error={reviewError}
                                    helperText={
                                        reviewError ? "Review is required" : ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                             >
                                Submit
                              </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Grid>
    </Grid>
  );
};

export default CreateReview;