import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DataService from '../services/DataService.js';
import { Store } from 'react-notifications-component';

const ListingDetails = ({ listing }) => {
  const dataService = new DataService();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessage = async () => {
    try {
      let chatId; 
      const newChatResponse = await dataService.createChat(listing.listingId);

      if (newChatResponse && newChatResponse.status === 200) {
        setChatId(newChatResponse.data.chatId);
        chatId = newChatResponse.data.chatId;
      } else {
        setChatId(chatId = newChatResponse?.data?.chatId);
        throw new Error('Chat already exists, go to messages');
      }

      const messageResponse = await dataService.sendMessage(chatId, message);

      if (messageResponse && messageResponse.status === 200) {
        handleClose();
      } else {
        throw new Error('Unable to send message');
      }
    } catch (error) {
      Store.addNotification({
        title: 'Error',
        message: error.message,
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
  };
  
  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleClickReview = () => {
    navigate(`/view-reviews/${listing.listingId}`);
  };

  const handleBackClick = () => {
    navigate(`/listings/${listing.listingId}`);
  };

  const handleViewSellerProfile = () => {
    navigate(`/sellers/${listing.sellerId}`);
  };

  const isReviews = location.pathname.includes('/view-reviews/') || location.pathname.includes('/create-review/');

  return (
    <div>
      <Box
        border={1}
        borderRadius={5}
        borderColor="grey.300"
        p={4}
        textAlign="left"
        boxShadow={3}
        mt={2}
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
          <Box display="flex" alignItems="center" mb={2}>
            <Button variant="outlined" startIcon={<PersonIcon />} onClick={handleViewSellerProfile}>
              View Seller Profile
            </Button>            
          </Box>
          {!isReviews && (
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
                onClick={() => navigate("/create-review/" + listing.listingId)}
              >
                Add Review
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickReview}
                sx={{ mb : 2 }}
              >
                View Reviews
              </Button>
            </>
          )}
          {isReviews && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackClick}
              >
                Back
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Send Message to Seller</DialogTitle>
        <DialogContent>
        {chatId === undefined && (
          <div key="newChat">
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
          </div>)
        }
        {chatId !== undefined &&
          <DialogContentText>
            <Link to={"/message-history/"+chatId}>See Chat</Link>
          </DialogContentText>
        }
      </DialogContent>
      {chatId === undefined && (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      )}
      </Dialog>
    </div>
  );
};

export default ListingDetails;
