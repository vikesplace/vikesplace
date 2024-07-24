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

      let response = await dataService.getChats(); 
      if (response === undefined) {
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
      } else if (response.status === 200) {
        chatIds = response.data;
      } else {
        Store.addNotification({
          title: 'Unable to Get Chats',
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
      }

      response = await dataService.getMyUserData(); 
      if (response === undefined) {
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
      } else if (response.status === 200) {
        user = response.data;
      } else {
        Store.addNotification({
          title: 'Unable to Load',
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
      }

      const chatObjs = [];
      chatIds.forEach(async (id) => 
      {
        response = await dataService.getChatInformation(id); 
        if (response === undefined) {
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
          Store.addNotification({
            title: 'Unable to Get Chats',
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