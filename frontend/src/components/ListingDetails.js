import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DataService from '../services/DataService.js';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_REVIEWS } from '../utils/SampleRecommenderData.js';

const ListingDetails = ({ listing, hideButton }) => {
  const dataService = new DataService();
  const navigate = useNavigate();
  const location = useLocation();
  const reviews = SAMPLE_REVIEWS.filter(review => review.listingId === listing.id);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSendMessage () {
    // TODO: check if chat already exists...
    // Chat Exists: send message
    // Chat Does Not: dataService.createNewChat, then send messsage
    let response = await dataService.sendMessage(listing.listingId, message);
    if (response === undefined) {
      alert("Connection error, please try again.");
    } else if (response.status === 200) {
        handleClose();
    } else {
        alert("Unable to send message, please try again.");
    }
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleClickReview = (id) => {
    navigate(`/view-reviews/${id}`);
  };

  const handleBackClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const isReviews = location.pathname.includes('/view-reviews/');

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      bgcolor="background.paper"
    >
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      <Grid item xs={12} md={4}>
        <Box
          border={1}
          borderRadius={5}
          borderColor="grey.300"
          p={4}
          textAlign="left"
          boxShadow={3}
        >
          <Typography variant="h4" component="h3" gutterBottom>
            {listing.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: ${listing.price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Location: {listing.location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Posted: {new Date(listing.listedAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric"})}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {listing.forCharity ? "Funds to Charity" : ""}
          </Typography>
          <Box display="flex" flexDirection="column" mt={5} width="100%">
          {!isReviews ||(hideButton === undefined || hideButton === false) &&(
            <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{ mb: 2 }}
            >
              Message Seller
            </Button>
            <Button 
            variant="contained" 
            color="secondary"
            sx={{ mb: 2 }}
            onClick={(event) => {
              navigate("/create-review/" + listing.listingId);
            }}>
              Add Review
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickReview(listing.id)}
              sx={{ mb : 2 }}
              >
              View Reviews
            </Button>
            </>
          )}
          {isReviews &&(
            <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBackClick(listing.id)}
              >
                Back
              </Button>
              </>
          )}
        
          </Box>
        </Box>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Send Message to Seller</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write your message below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            value={message}
            onChange={handleChangeMessage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      {isReviews &&(
        <>
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
        </>
      )}
      </Grid>
    </Box>
  );
};

export default ListingDetails;
