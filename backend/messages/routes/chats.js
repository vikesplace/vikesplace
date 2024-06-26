import express from "express";
import { getChatData } from "../controller/get_chat_data.js";

const router = express.Router();

// get chat data for chatId (user in chat, listingId, lastMessageTime)
router.get("/:chatId", getChatData);

export default router;