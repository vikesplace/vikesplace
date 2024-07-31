import express from "express";
import { getChatData } from "../controller/get_chat_data.js";
import { createChat } from "../controller/create_chat.js";

const router = express.Router();

// get chat data for chatId (user in chat, listingId, lastMessageTime)
router.get("/:chatId", getChatData);

// create a new chat with seller of a listing
router.post("/", createChat);

export default router;