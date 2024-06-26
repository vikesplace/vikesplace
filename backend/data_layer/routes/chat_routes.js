import express from "express";
import { getChatData } from "../controllers/chat_controller.js";

const router = express.Router();

// get chat data for chatId (user in chat, listingId, lastMessageTime)
router.get("/:chatId", getChatData);

export default router;