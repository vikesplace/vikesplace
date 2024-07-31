import React, { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link, useParams } from 'react-router-dom';
import { MessageList, Input } from "react-chat-elements";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "react-chat-elements/dist/main.css";
import '../App.css';
import DataService from '../services/DataService';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function MessageHistory() {
    const { id } = useParams();
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatInfo, setChatInfo] = useState({});
    const dataService = useMemo(() => new DataService(), []);

    const fetchMessages = async () => {
        try {
            const response = await dataService.getChatMessages(id);
            if (response && response.status === 200) {
                setMessages(Array.isArray(response.data.messages) ? response.data.messages : []);
            } else {
                throw new Error("Failed to fetch messages");
            }
        } catch (error) {
            Store.addNotification({
                title: 'Error',
                message: 'Failed to fetch messages. Please try again.',
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
            console.error("An error occurred while fetching messages:", error);
            setMessages([]); 
        }
    };

    const fetchChatInfo = async () => {
        try {
            const response = await dataService.getChatInformation(id);
            if (response && response.status === 200) {
                setChatInfo(response.data);
            } else {
                throw new Error("Failed to fetch chat info");
            }
        } catch (error) {
            Store.addNotification({
                title: 'Error',
                message: 'Failed to fetch chat info. Please try again.',
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
            return; 
        }

        try {
            const response = await dataService.sendMessage(id, newMessage);
            if (response && response.status === 200) {
                await fetchMessages(); 
                clearTextInput();
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            Store.addNotification({
                title: 'Error',
                message: 'Failed to send message. Please try again.',
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
                        Message Seller <Link to={"/listings/"+chatInfo.listingId}>(See Listing)</Link>
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
