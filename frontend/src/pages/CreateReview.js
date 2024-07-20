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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

const CreateReview = () => {
  const dataService = useMemo(() => new DataService(), []);
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(undefined);
  const [rating, setRating] = React.useState(null);
  const [review, setReview] = React.useState("");
  const [ratingError, setRatingError] = React.useState(false);
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

  const validateRating = () => {
    if (rating === null) {
      setRatingError(true);
      return false;
    } else {
      setRatingError(false);
      return true;
    }
  }

  const validateReview = () => {
    if (review === "") {
      setReviewError(true);
      return false;
    } else {
      setReviewError(false);
      return true;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateRating()) {
      const response = await dataService.createRating(id, rating);
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status !== 200 && response.status !== 201) {
        alert("Unable to create rating, please try again.");
      }
    }

    if (validateRating()) {
      const response = await dataService.createReview(id, review);
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status !== 200 && response.status !== 201) {
        alert("Unable to create review, please try again.");
      }
    }
    navigate("/view-reviews/" + id);
  }

  if (listing === undefined) {
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
        <Grid item xs={12} md={5}>
          <ListingDetails listing={listing} />
        </Grid>
        <Grid item xs={12} md={7}>
        <Box
          border={1}
          borderRadius={5}
          borderColor="grey.300"
          p={4}
          textAlign="left"
          boxShadow={3}
        >
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControl id="rating-control" required error={ratingError} variant="standard" component="fieldset">
                  <FormLabel id="rating-label" component="legend">
                  Rating
                  </FormLabel>
                  <FormGroup name="rating-group">
                    <FormControlLabel
                    control={
                    <Rating
                        id="rating"
                        name="rating"
                        value={rating}
                        getLabelText={function defaultLabelText(value) {
                          return `${value} out of 5 stars`;
                        }}
                        onChange={(event, value) => {
                            setRating(value);
                        }}
                        style={{ paddingLeft: '8px' }}
                    />}></FormControlLabel>
                  </FormGroup>
                  <FormHelperText id="rating-error">{ratingError ? "Rating is required" : ""}</FormHelperText>
                </FormControl>
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
                    multiline
                    minRows={3}
                    onChange={(event) => {
                        setReview(event.target.value);
                    }}
                    onBlur={(event) => {
                      validateReview();
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
                    id="submit"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateReview;