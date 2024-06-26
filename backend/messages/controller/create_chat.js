import axios from 'axios';

export const createChat = async (req, res) => {
    try {
        //get user_id from JWT
        const user_id_one = res.locals.decodedToken.userId;
        const response = await axios.post(`/chats/${req.params.listingId}`, {
            user_id_one: user_id_one,
        });
        res.json(response.data);
    } catch (err) {
        console.log(err);
    }
}