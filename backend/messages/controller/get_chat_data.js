import axios from 'axios';

export const getChatData = async (req, res) => {
    try {
        const response = await axios.get(`/chat/${req.params.chatId}`);
        res.json(response.data);
    } catch (error) {
        res.json({
            message: "Chat id not found"
        });
    }
};