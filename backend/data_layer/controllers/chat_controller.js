import Chats from "../models/chat_models.js";

export const getChatData = async (req, res) => {
    try {
        const entry = await Chats.findByPk(req.params.chatId);
        const {chat_id, user_id_one, user_id_two, listing_id, timestamp, last_message_time} = entry;
        res.json({
            users: [user_id_one, user_id_two],
            listing_id: listing_id,
            last_message_time: last_message_time
        });
    } catch (error) {
        res.json({
            message: "Unable to get chat data with id: " + req.params.chatId
        });
    };
};