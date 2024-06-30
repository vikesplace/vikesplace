import axios from 'axios';

export const getAllMessages = async (req, res) => {
    try {
        const response = await axios.get(`/message/${req.params.chatId}`);
        res.json(response.data);
    } catch (err) {
        if (err.response && (err.response.status == 400)) { // if bad request, return error to client
            return res.status(400).json({ message: err.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error(err);
            return res.status(500).json({ message: "Failed to get messages"});
        }
    }
}