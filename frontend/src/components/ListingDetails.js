import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ListingDetails = ({ listing }) => {
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
        <Typography variant="h6" gutterBottom>
          Price: ${listing.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {listing.description || "No description available."}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: {listing.location}
        </Typography>
        <Box display="flex" flexDirection="column" mt={5} width="100%">
          <Button variant="contained" color="primary" width='100%' sx={{ mb: 2 }}>
            Message Seller
          </Button>
          <Button variant="contained" color="secondary">
            Add Review
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingDetails;
