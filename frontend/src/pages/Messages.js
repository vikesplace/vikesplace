import React, { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ChatList } from "react-chat-elements";
import { useNavigate } from 'react-router-dom';
import "react-chat-elements/dist/main.css";
import '../App.css';
import DataService from '../services/DataService';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'; 

function Messages() {
  const dataService = useMemo(() => new DataService(), []);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [noChatsMessage, setNoChatsMessage] = useState("Loading...");

  useEffect(() => {
    const fetchChats = async () => {
      let chatIds = [];
      let user;

      try {
        let response = await dataService.getChats(); 
        if (response.status === 200 && Array.isArray(response.data.chats)) {
          chatIds = response.data.chats;
        } else {
          setNoChatsMessage("No Chats Available");
          throw new Error('Unable to get chats');
        }

        response = await dataService.getMyUserData(); 
        if (response.status === 200) {
          user = response.data;
        } else {
          throw new Error('Unable to load user data');
        }

        const chatObjs = [];
        for (const id of chatIds) {
          response = await dataService.getChatInformation(id); 
          if (response.status === 200) {
            const chatInfo = response.data;
            const otherUserId = user.userId === chatInfo.users[0] ? chatInfo.users[1] : chatInfo.users[0];

            response = await dataService.getUserData(otherUserId); 
            if (response.status === 200) {
              const otherUser = response.data;

              response = await dataService.getListing(chatInfo.listingId); 
              if (response.status === 200) {
                chatObjs.push({
                  id: id,
                  title: otherUser.username,
                  subtitle: response.data.title,
                  date: chatInfo.lastMessageTime,
                });
              }
            }
          }
        }
        setChats(chatObjs);
      } catch (error) {
        setNoChatsMessage("Error Loading Chats");
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

    fetchChats();
  }, [dataService]);

  const handleClick = (event) => {
    navigate('/message-history/' + event.id);    
  };

  return (
    <div className="Messages">
      <Container>
        <Box mt={2}>
          {chats.length === 0 ? (
            <div>{noChatsMessage}</div>
          ) : (
            <ChatList
              className='chat-list'
              dataSource={chats} 
              onClick={handleClick}
            />
          )}
        </Box>
      </Container>
    </div>
  );
}

export default Messages;
