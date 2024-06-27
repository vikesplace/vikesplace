import axios from 'axios';

export const sendMessages = async (req, res) => {
    //retrieve user_id of sender from JWT
    const user_id = res.locals.decodedToken.userId;
    try{
    const response = await axios.post(`/messages/${req.params.chatId}`,{
        user_id: user_id,
        content: req.body.content,
        });
        res.json(response.data);
    } catch (error) {
        res.json({
            message: "Invalid input data",
        });
    }
};
