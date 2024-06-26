import express from "express";
import { getAllMessages } from "../controller/get_all_messages.js";
import { createChat } from "../controller/create_chat.js";

const router = express.Router();

// create a new chat with seller of a listing
router/post("/chats/:listingId", createChat);

// get all chat_ids for the logged in user
router.get("/chats", (req, res) => {
    //handle logic here
    res.json({ message: "Get all chat_ids" });
});

//get all messages for a chat
router.get("/:chatId", getAllMessages);

// //send a message
router.post("/:chatId", (req, res) => {
    //handle logic here
    res.json({ message: "Send a message" });
});

export default router;

