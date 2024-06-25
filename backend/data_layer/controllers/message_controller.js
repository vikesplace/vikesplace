import Messages from "../models/message_models.js";

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Messages.findAll({
            where: {
                chat_id: req.params.chatId
            }
        });
        res.json(messages);
    } catch (error) {
        res.json({
            message: "Chat id not found"
        });
    }
};