import axios from 'axios';

export const sendMessages = async (req, res) => {
    //retrieve user_id of sender from JWT
    const user_id = res.locals.decodedToken.userId;
    try{
        const response = await axios.post(`/message/${req.params.chatId}`,{
            user_id: user_id,
            content: req.body.content,
        });
        res.json(response.data);
    } catch (err) {
        if (err.response && (err.response.status == 400)) { // if bad request, return error to client
            return res.status(400).json({ message: err.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error(err);
            return res.status(500).json({ message: "Failed to send message"});
        }
    }
};
