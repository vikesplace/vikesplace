import Chats from "../models/chat_models.js";
import Listings from "../models/listing_models.js";

export const getChatData = async (req, res) => {
    try {
        const chatData = await Chats.findOne({
            where: {
                chat_id: req.params.chatId
            },
            attributes: [
                "user_id_one",
                "user_id_two",
                ["listing_id", "listingId"],
                ["last_message_time", "lastMessageTime"]
            ]
        });
        if (!chatData) {
            console.error("Chat not found");
            return res.status(500).send();
        }
        return res.status(200).json({
            users: [chatData.dataValues.user_id_one, chatData.dataValues.user_id_two],
            listingId: chatData.dataValues.listingId,
            lastMessageTime: chatData.dataValues.lastMessageTime
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    };
};

export const createChat = async (req, res) => {
    try {
        //get user_2 from listings table
        const listing_entry = await Listings.findOne({
            where: {
                listing_id: req.params.listingId
            }
        });
        if (!listing_entry) {
            console.error("Listing not found");
            return res.status(500).send();
        }
        const user_id_two = listing_entry.seller_id;
        
        //check if chat_id with these two users already exists
        const existingChat = await Chats.findOne({
            where: {
                user_id_one: req.body.user_id_one,
                user_id_two: user_id_two,
                listing_id: req.params.listingId
            }
        });
        if(existingChat) {
            return res.status(400).json({ 
                message: "Chat already exists", 
                chatId: existingChat.dataValues.chat_id 
            });
        }
        const createResult = await Chats.create(
            {
                listing_id: req.params.listingId,
                user_id_one: req.body.user_id_one,
                user_id_two
            }
        );

        res.json(createResult.dataValues.chat_id);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};