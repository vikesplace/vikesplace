import React, { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ChatList } from "react-chat-elements";
import { useNavigate } from 'react-router-dom';
import "react-chat-elements/dist/main.css";
import '../App.css';
import DataService from '../services/DataService';

function Messages() {
  const dataService = useMemo(() => new DataService(), []);
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      let chatIds = [];
      let user;

      let response = await dataService.getChats(); 
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status === 200) {
        chatIds = response.data;
      } else {
        alert("Unable to get chats, please try again.");
      }

      response = await dataService.getMyUserData(); 
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status === 200) {
        user = response.data;
      } else {
        alert("Unable to load, please try again.");
      }

      const chatObjs = [];
      chatIds.forEach(async (id) => 
      {
        response = await dataService.getChatInformation(id); 
        if (response === undefined) {
          alert("Connection error, please try again.");
        } else if (response.status === 200) {
          // Get User Info
          const chatInfo = response.data;
          const otherUserId = user.userId === chatInfo.users[0] ? chatInfo.users[1] : chatInfo.users[0];
          response = await dataService.getUserData(otherUserId); 
          if (response !== undefined && response.status === 200) {
            const otherUser = response.data;

            // Get Listing Info
            response = await dataService.getListing(chatInfo.listingId); 
            if (response !== undefined && response.status === 200) {
              chatObjs.push({
                id:id,
                title:otherUser.username,
                subtitle:response.data.title,
                date:chatInfo.lastMessageTime,
              }); 
            }           
          }
        } else {
          alert("Unable to get chats, please try again.");
        }

        setChats(chatObjs);
      });
    };

    fetchChats();
  }, [dataService]);

  const handleClick = (event) => {
    console.log(event)
    navigate('/message-history/'+event.id);    
  }

  return (
    <div className="Messages">
      <Container>
        <Box mt={2}>
        <ChatList
          className='chat-list'
          dataSource={chats} 
          onClick={handleClick}
        />
        </Box>
      </Container>
    </div>
  );
}

export default Messages;