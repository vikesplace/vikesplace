import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const ListingDetails = ({ listing }) => {
  const dataService = new DataService();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await dataService.getMyUserData();
        if (response && response.status === 200) {
          setUser(response.data);
        } else {
          throw new Error("Unable to get user");
        }
      } catch (error) {
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
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessage = async () => {
    try {
      let chatId;
  
      const chatsResponse = await dataService.getChats();
      
      if (chatsResponse && chatsResponse.status === 200) {
        const chatIds = chatsResponse.data.chats;
  
        if (Array.isArray(chatIds)) {
          const existingChatId = chatIds.find(id => id === listing.listingId);
  
          if (existingChatId) {
            chatId = existingChatId;
          } else {
            const newChatResponse = await dataService.createChat(listing.listingId);
  
            if (newChatResponse && newChatResponse.status === 200) {
              chatId = newChatResponse.data.chatId;
            } else {
              throw new Error('Chat already exists, go to messages');
            }
          }
        } else {
          throw new Error('Invalid chat data received');
        }
      } else {
        throw new Error('Unable to fetch chats');
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
      console.error(error);
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
    </div>
  );
};

export default ListingDetails;
