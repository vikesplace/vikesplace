import axios from 'axios';

export const createChat = async (req, res) => {
    try {
        //get user_id from JWT
        const user_id_one = res.locals.decodedToken.userId;
        const response = await axios.post(`/chat/${req.params.listingId}`, {
            user_id_one: user_id_one,
        });
        res.json({chatId: response.data});
    } catch (err) {
        if (err.response && (err.response.status == 400)) { // if bad request, return error to client
            return res.status(400).json({ message: err.response.data.message, chatId: err.response.data.chatId });
        } else { // if internal server error, log error and return message to client
            console.error(err);
            return res.status(500).json({ message: "Failed to create chat"});
        }
    }
}