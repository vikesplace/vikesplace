import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DataService from '../services/DataService.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SAMPLE_REVIEWS } from '../utils/SampleRecommenderData.js';
import { useNavigate } from 'react-router-dom';


const ListingDetailsReview = ({ listing }) => {
  const dataService = new DataService();
  const navigate = useNavigate();

  const handleBackClick = (id) => {
    navigate(`/listings/${id}`);
  };



  const reviews = SAMPLE_REVIEWS.filter(review => review.listingId === listing.id);

  return (
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
        <Typography variant="h4" component="h3" gutterBottom>
          {listing.title}
        </Typography>
        <Typography variant="body1" component="h3" gutterBottom>
          {listing.category}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Price: ${listing.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {listing.description || "No description available."}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: {listing.location}
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleBackClick(listing.id)}
          >
            Back
          </Button>
        </Box>
      </Box>
      <Box
        border={1}
        borderRadius={5}
        borderColor="grey.300"
        p={4}
        width="50%"
        textAlign="left"
        boxShadow={3}
        mt={-20}
        ml={2}
      >
        <Typography variant="h5" component="h3" gutterBottom>
          Reviews
        </Typography>
        <TableContainer component={Paper}>
          <Table>
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
    </Box>
  );
};

export default ListingDetailsReview;
