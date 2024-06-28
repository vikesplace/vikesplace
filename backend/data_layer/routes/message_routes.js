import express from "express";
import { getAllMessages, getChatIds, sendMessages } from "../controllers/message_controller.js";

const router = express.Router();

//Get all chat_ids for the logged in user
router.get("/chats", getChatIds)

//Get all messsages for a chat_id
router.get("/:chatId", getAllMessages);

//send a message
router.post("/:chatId", sendMessages);

export default router;