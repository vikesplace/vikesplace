import Chats from "../models/chat_models.js";
import Listings from "../models/listing_models.js";

export const getChatData = async (req, res) => {
    try {
        const entry = await Chats.findByPk(req.params.chatId);
        if (!entry) {
            console.error("Chat not found");
            return res.status(500).send();
        }
        const {chat_id, user_id_one, user_id_two, listing_id, timestamp, last_message_time} = entry;
        res.json({
            users: [user_id_one, user_id_two],
            listing_id: listing_id,
            last_message_time: last_message_time
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
        await Chats.create(
            {
                listing_id: req.params.listingId,
                user_id_one: req.body.user_id_one,
                user_id_two: listing_entry.seller_id,
            }
        );

        res.json();
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};