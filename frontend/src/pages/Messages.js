import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ChatList } from "react-chat-elements";
import { useNavigate } from 'react-router-dom';
import "react-chat-elements/dist/main.css";
import '../App.css';

const chats = [
  {
    id: 3,
    sender: "Person's Name",
    listing_title: "Title of this item I would like to buy",
    mostRecent: new Date(),
  },
  {
    id: 16,
    sender: "Person Number Two",
    listing_title: "Super cool item",
    mostRecent: new Date(),
  },
  {
    id: 87,
    sender: "Person Three",
    listing_title: "Here is another item available for purchase",
    mostRecent: new Date(),
  },
];

function Messages() {

  const navigate = useNavigate();

  //TODO GET chats and convert to below format
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