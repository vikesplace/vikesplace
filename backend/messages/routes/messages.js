import express from "express";
import { getAllMessages } from "../controller/get_all_messages.js";
import { getChatIds } from "../controller/get_chat_ids.js";
const router = express.Router();

// get all chat_ids for the logged in user
router.get("/chats", getChatIds);

//get all messages for a chat
router.get("/:chatId", getAllMessages);

// get chat data (user in chat, listingId, lastMessageTime)
router.get("/chats/:chatId", (req, res) => {
    //handle logic here
    res.json({ message: "Get chat data" });
});

// //send a message
router.post("/:chatId", (req, res) => {
    //handle logic here
    res.json({ message: "Send a message" });
});

export default router;

