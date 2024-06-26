import Messages from "../models/message_models.js";
import Chats from "../models/chat_models.js";
import Listings from "../models/listing_models.js";

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

export const getChatIds = async (req, res) => {
    try {
        const chatIds1 = await Chats.findAll
        ({
            where: {
                user_id_one: req.query.user_id
            }
        });

        const chatIds2 = await Chats.findAll
        ({
            where: {
                user_id_two: req.query.user_id
            }
        });

        const chatIds = chatIds1.concat(chatIds2);

        const chats = chatIds.map(entry => {
            const {chat_id, listing_id, user_id_one, user_id_two, timestamp, last_message_time} = entry;
            return {
                chat_id: chat_id
            };
        });

        res.json(chats);
    } catch (error) {
        res.json({
            message: "Invalid input data"
        });
    }
};

export const createChat = async (req, res) => {
    try {
        //get user_2 from listings table
        const listing_entry = await Listings.findOne({
            where: {
                listing_id: req.params.listingId
            }
        });
        const chat_entry = await Chats.create(
            {
                listing_id: req.params.listingId,
                user_id_one: res.body.userId,
                user_id_two: listing_entry.user_id,
            }
        );

        res.json(chat_entry);
    } catch (error) {
        res.json({
            message: "Could not create chat"
        });
    }
};