import React, { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ChatList } from "react-chat-elements";
import { useNavigate } from 'react-router-dom';
import "react-chat-elements/dist/main.css";
import '../App.css';
import DataService from '../services/DataService';
import { Store } from 'react-notifications-component';

function Messages() {
  const dataService = useMemo(() => new DataService(), []);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      let chatIds = [];
      let user;

      try {
        let response = await dataService.getChats(); 
        if (response.status === 200 && Array.isArray(response.data.chats)) {
          chatIds = response.data.chats;
        } else {
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
        alert(error.message);
        console.error(error); 
      }
    };

    fetchChats();
  }, [dataService]);

  const handleClick = (event) => {
    console.log(event);
    navigate('/message-history/' + event.id);    
  };

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
