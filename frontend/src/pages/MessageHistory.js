import React, { useState, useEffect } from 'react';
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
    const [messages, setMessages] = useState([]);
    const [chatInfo, setChatInfo] = useState({});
    const dataService = new DataService();

    const fetchMessages = async () => {
        try {
            const response = await dataService.getChatMessages(id);
            if (response && response.status === 200) {
                // Ensure messages is an array from the 'messages' key
                setMessages(Array.isArray(response.data.messages) ? response.data.messages : []);
            } else {
                console.error("Failed to fetch messages:", response);
                setMessages([]); // Set default empty array on error
            }
        } catch (error) {
            console.error("An error occurred while fetching messages:", error);
            setMessages([]); // Set default empty array on error
        }
    };

    const fetchChatInfo = async () => {
        try {
            const response = await dataService.getChatInformation(id);
            if (response && response.status === 200) {
                setChatInfo(response.data);
            } else {
                console.error("Failed to fetch chat info:", response);
            }
        } catch (error) {
            console.error("An error occurred while fetching chat info:", error);
        }
    };

    useEffect(() => {
        fetchChatInfo();
        fetchMessages();
    }, [id]);

    const handleInputKeys = (event) => {
        setNewMessage(event.target.value);
    };

    const handleReloadMessages = () => {
        fetchMessages();
    };

    const handleSend = async () => {
        if (newMessage.trim() === "") {
            return; // Don't send an empty message
        }

        try {
            const response = await dataService.sendMessage(id, newMessage);
            
            if (response && response.status === 200) {
                await fetchMessages(); // Refresh messages
                clearTextInput();
            } else {
                console.error("Failed to send message:", response);
            }
        } catch (error) {
            console.error("An error occurred while sending the message:", error);
        }
    };

    const clearTextInput = () => {
        setNewMessage("");
    };

    const messagesToDisplay = messages.map(message => ({
        position: message.senderId === chatInfo.userId ? "left" : "right",
        type: "text",
        title: message.senderId === chatInfo.userId ? chatInfo.title : "You",
        text: message.messageContent,
    }));

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
                        rightButtons={<Button onClick={handleSend} variant="contained">Send</Button>}
                        onChange={handleInputKeys}
                        value={newMessage}
                    />
                </Box>
            </Container>
        </div>
    );
}

export default MessageHistory;
