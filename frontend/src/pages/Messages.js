import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ChatList } from "react-chat-elements";
import { useNavigate } from 'react-router-dom';
import "react-chat-elements/dist/main.css";
import '../App.css';
import DataService from '../services/DataService';
import { SAMPLE_CHATS } from '../utils/SampleRecommenderData';

function Messages() {

  const navigate = useNavigate();
  
  let dataService = new DataService();

  let userId = "";
  let response = dataService.getMyUserData();
  if (response !== undefined && response !== null) {
    userId = response.data.userId;
  } else {
    // TODO remove once api works
    userId = "12345";
  }

  let chats = [];
  response = dataService.getChats(userId);
  if (response !== undefined && response !== null) {
    chats = response.data;
  } else {
    // TODO remove once api works
    chats = SAMPLE_CHATS;
  }

  let chatsToDisplay = [];
    chats.forEach(chat => {
      let chatInfo = {};
      response = dataService.getChatInformation(chat);
      if (response !== undefined && response !== null) {
        chatInfo = response.data;
      } else {
        // TODO remove once api works
        chatInfo = {
          users: ["12345", "12344"],
          listingId: "123456789",
          lastMessageTime: "2024-05-22T12:34:56Z"
        }
      }

      let otherUser = userId === chatInfo.users[0] ? chatInfo.users[1] : chatInfo.users[0];
      let otherUserInfo = {};
      response = dataService.getUserData(otherUser);
      if (response !== undefined && response !== null) {
        otherUserInfo = response.data;
      } else {
        // TODO remove once api works
        otherUserInfo = {
          location: "V8T",
          username: "alpha_123",
          joiningDate: "2024-05-22T12:34:56Z",
          itemsSold: ["123456789", "123356789"],
          itemsPurchased: ["123456788", "123356779"]
        }
      }

      let listingInfo = {};
      response = dataService.getListing(chatInfo.listingId);
      if (response !== undefined) {
        chatInfo = response.data;
        chats = response.data;
      } else {
        listingInfo = {
          sellerId: "12345",
          listingId: "123456789",
          title: "dell monitor 1080p",
          price: 110.00,
          location: "V8T",
          status: "SOLD",
          listedAt: "2024-05-22T12:34:56Z",
          lastUpdatedAt: "2024-05-22T12:34:56Z"
        }
      }

      chatsToDisplay.push({
          id:chat.id,
          title:otherUserInfo.username,
          subtitle:listingInfo.title,
          date:chatInfo.lastMessageTime,
      });
    });

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
          dataSource={chatsToDisplay} 
          onClick={handleClick}
        />
        </Box>
      </Container>
    </div>
  );
}

export default Messages;