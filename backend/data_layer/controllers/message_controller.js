import Messages from "../models/message_models.js";
import Chats from "../models/chat_models.js";

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Messages.findAll({
            where: {
                chat_id: req.params.chatId
            },
            attributes: [
                ["message_id", "messageId"],
                ["message_content", "messageContent"],
                "timestamp",
                ["sender_id", "senderId"],
            ]
        });
        if (!messages) {
            console.error("Chat not found");
            return res.status(500).send();
        }
        res.json(messages);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

export const getChatIds = async (req, res) => {
    try {
        const chatIds1 = await Chats.findAll
        ({
            where: {
                user_id_one: req.query.user_id
            },
            attributes: [["chat_id", "chatId"]]
        });

        const chatIds2 = await Chats.findAll
        ({
            where: {
                user_id_two: req.query.user_id
            },
            attributes: [["chat_id", "chatId"]]
        });
        const chatIds = chatIds1.concat(chatIds2);
        res.json(chatIds);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

export const sendMessages = async (req, res) => {
    const {user_id, content} = req.body;
    const chat_id = req.params.chatId;
    try {
        //get reciever id from chats table
        const receiver_id_entry = await Chats.findOne({
            chat_id: chat_id,
        });
        if (!receiver_id_entry) {
            console.error("Chat not found");
            return res.status(500).send();
        }
        const listing_id = receiver_id_entry.listing_id;
        let receiver_id = null;
        if(receiver_id_entry.user_id_one == user_id){
            receiver_id = receiver_id_entry.user_id_two;
        }
        else{
            receiver_id = receiver_id_entry.user_id_two;
        }
        await Messages.create({
            listing_id: listing_id,
            chat_id: chat_id,
            message_content: content,
            sender_id: user_id,
            receiver_id: receiver_id,
        });
        res.json({});
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error(error);
            res.status(400).json({ message: error.message });
        } else { 
            console.error(error);
            return res.status(500).send();
        }
    }
}
