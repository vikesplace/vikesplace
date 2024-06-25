import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { MessageList, Input } from "react-chat-elements";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "react-chat-elements/dist/main.css";
import '../App.css';
import DataService from '../services/DataService';

function MessageHistory() {

    const { id } = useParams();
    const [newMessage, setNewMessage] = useState("");

    let dataService = new DataService ();
    let chatInfo = {};
    let messages = [];

    let response = dataService.getChatInformation(id);
    if (response !== undefined) {
        chatInfo = response.data;
    }

    response = dataService.getChatMessages(id);
    if (response !== undefined) {
        messages = response.data;
    }
    
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
        setNewMessage(event.target.value);
    };

    const handleReloadMessages = (event) => {
        response = dataService.getChatMessages(id);
        if (response !== undefined) {
            messages = response.data;
        }
    };

    const handleSend = (event) => {
        if (newMessage === "") {
            return;
        }

        response = dataService.sendMessage(newMessage);
        if (response !== undefined) {
            response = dataService.getChatMessages(id);
            if (response !== undefined) {
                messages = response.data;
            }
        } 
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
                    <Button
                        type="refresh"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleReloadMessages}
                        >
                        Reload Messages
                    </Button>
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
                        rightButtons={<Button onClick={handleSend} variant="contained" >Send</Button>}
                        onKeyUp={handleInputKeys}
                    />
                </Box>
            </Container>
        </div>
    );
}

export default MessageHistory;