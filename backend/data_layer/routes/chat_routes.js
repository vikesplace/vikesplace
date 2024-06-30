import express from "express";
import { getChatData, createChat } from "../controllers/chat_controller.js";

const router = express.Router();

// get chat data for chatId (user in chat, listingId, lastMessageTime)
router.get("/:chatId", getChatData);

//create new chat
router.post("/:listingId", createChat);

export default router;