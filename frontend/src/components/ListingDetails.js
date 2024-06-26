import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DataService from '../services/DataService.js';

const ListingDetails = ({ listing }) => {
  const dataService = new DataService();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessage = () => {
    let response = dataService.sendMessage(message);
    if (response !== undefined) {
      handleClose();
    } else {
      // TODO remove once we expect api to succeed
      handleClose();
    }
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

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
        <Box display="flex" flexDirection="column" mt={5} width="100%">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            sx={{ mb: 2 }}
          >
            Message Seller
          </Button>
          <Button variant="contained" color="secondary">
            Add Review
          </Button>
        </Box>
      </Box>
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
    </Box>
  );
};

export default ListingDetails;
