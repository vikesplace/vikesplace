import axios from 'axios';

export const getAllMessages = async (req, res) => {
    try {
        const response = await axios.get(`/message/${req.params.chatId}`);
        res.json(response.data);
    } catch (err) {
        console.log(err);
    }
}