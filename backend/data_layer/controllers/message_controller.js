import Messages from "../models/message_models.js";

export const getAllMessages = async (req, res) => {
    try {
        const enteries = await Messages.findAll({
            where: {
                chat_id: req.params.chatId
            }
        });
        
        const messages = enteries.map(entry => {
            const {message_id, listing_id, message_content, timestamp, chat_id, sender_id, receiver_id} = entry;
            return {
                message_id: message_id,
                sender_id: sender_id,
                message_content: message_content,
                timestamp: timestamp
            };
        });

        res.json(messages);
    } catch (error) {
        res.json({
            message: "Chat id not found"
        });
    }
};