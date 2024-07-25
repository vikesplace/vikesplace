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
          alert("Unable to get user, please try again.");
        }
      } catch (error) {
        alert("Connection error, please try again.");
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
  
      // Fetch existing chat IDs
      const chatsResponse = await dataService.getChats();
      
      if (chatsResponse && chatsResponse.status === 200) {
        const chatIds = chatsResponse.data.chats;
  
        // Ensure chatIds is an array
        if (Array.isArray(chatIds)) {
          // Check if the listing's chat ID is already in the existing chats
          const existingChatId = chatIds.find(id => id === listing.listingId);
  
          if (existingChatId) {
            chatId = existingChatId;
          } else {
            // Create a new chat if not found
            const newChatResponse = await dataService.createChat(listing.listingId);
  
            if (newChatResponse && newChatResponse.status === 200) {
              chatId = newChatResponse.data.chatId;
            } else {
              throw new Error('Unable to create new chat');
            }
          }
        } else {
          throw new Error('Invalid chat data received');
        }
      } else {
        throw new Error('Unable to fetch chats');
      }
  
      // Send the message to the chat
      const messageResponse = await dataService.sendMessage(chatId, message);
  
      if (messageResponse && messageResponse.status === 200) {
        handleClose();
      } else {
        alert('Unable to send message, please try again.');
      }
    } catch (error) {
      alert(error.message);
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
