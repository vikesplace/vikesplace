import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { MessageList, Input, Button } from "react-chat-elements";
import Typography from '@mui/material/Typography';
import "react-chat-elements/dist/main.css";
import '../App.css';

const chats = [
    {
      id: 3,
      title: "Person's Name",
      subtitle: "Title of this item I would like to buy",
      date: new Date(),
      unread: 3,
    },
    {
      id: 16,
      title: "Person Number Two",
      subtitle: "Super cool item",
      date: new Date(),
      unread: 0,
    },
    {
      id: 87,
      title: "Person Three",
      subtitle: "Here is another item available for purchase",
      date: new Date(),
      unread: 10,
    },
];

function MessageHistory() {

    const { id } = useParams();
    const [newMessage, setNewMessage] = useState("");

    //TODO GET chats/messages
    const chatInfo = chats.find((chat) => chat.id.toString() === id);
    const messages = [
        {
            sender:chatInfo.title,
            content:"I'm interested in buying this item...",
        },
        {
            sender:chatInfo.title,
            content:"Could I ask for a $5 discount?",
        },
        {
            sender:chatInfo.title,
            content:"How long have you had this item?",
        },
        {
            sender:"Test User",
            content:"I've had it for 2 years, and it has been very useful to me. I'm glad you're interested in it...",
        },
        {
            sender:"Test User",
            content:"I can give you $2 off if that works?",
        },
        {
            sender:chatInfo.title,
            content:"Yes that works. Are you comfortable meeting at the library?",
        },
        {
            sender:"Test User",
            content:"Yes! That works for me",
        },
    ];
    
    let messagesToDisplay = [];
    messages.forEach(message => {
        messagesToDisplay.push({
            position: message.sender === chatInfo.title? "left" : "right",
            type: "text",
            title: message.sender === chatInfo.title? message.sender : "You",
            text: message.content,
        });
    });

    const handleInputKeys = (event) => {
        setNewMessage(event.target.value)
    };

    const handleSend = (event) => {
        //TODO send/receive messages? (similar to below?)
        //TODO may need to reload MessageList?
        if (newMessage === "") {
            return;
        }
        messagesToDisplay.push(
            {
                position: "right",
                type: "text",
                title: "You",
                text: newMessage,
            },
        );
        alert("Sending... "+newMessage)
        clearTextInput();
    };

    const clearTextInput = () => {
        setNewMessage("");
    };

    return (
        <div className="MessageHistory">
            <Container>
                <Box
                    sx={{
                        marginTop: 6,
                        alignItems: "center",
                    }}
                    >
                    <Typography component="h1" variant="h5">
                        Message <b>{chatInfo.title}</b> about <b>{chatInfo.subtitle}</b>
                    </Typography>
                    <br />
                    <MessageList
                        className='message-list'
                        lockable={true}
                        toBottomHeight={'100%'}
                        dataSource={messagesToDisplay}
                    />
                    <br />
                    <Input
                        placeholder="Type here..."
                        multiline={true}
                        rightButtons={<Button text={"Send"} onClick={handleSend} title="Send" />}
                        onKeyUp={handleInputKeys}
                    />
                </Box>
            </Container>
        </div>
    );
}

export default MessageHistory;