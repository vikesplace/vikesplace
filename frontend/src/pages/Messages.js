import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ChatList } from "react-chat-elements";
import { useNavigate } from 'react-router-dom';
import "react-chat-elements/dist/main.css";
import '../App.css';
import DataService from '../services/DataService';
import AuthService from '../services/AuthService';

function Messages() {

  const navigate = useNavigate();
  
  let authService = new AuthService();
  let dataService = new DataService();
  let response = authService.getCurrentUserId();

  let chats = [];
  if (response !== undefined) {
    response = dataService.getChats(response.data.userId);
    chats = response.data;
  }

  let chatsToDisplay = [];
    chats.forEach(chat => {
        chatsToDisplay.push({
            id:chat.id,
            title:chat.sender,
            subtitle:chat.listing_title,
            date:chat.mostRecent,
        });
    });

  const handleClick = (event) => {
    navigate('/message-history/'+event.id);    
  }

  return (
    <div className="Messages">
      <Container>
        <Box mt={2}>
        <ChatList
          className='chat-list'
          dataSource={chatsToDisplay} 
          onClick={handleClick}
        />
        </Box>
      </Container>
    </div>
  );
}

export default Messages;