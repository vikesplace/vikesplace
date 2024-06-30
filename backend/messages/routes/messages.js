import express from "express";
import { getAllMessages } from "../controller/get_all_messages.js";
import { getChatIds } from "../controller/get_chat_ids.js";
import { sendMessages } from "../controller/send_messages.js";

const router = express.Router();

// get all chat_ids for the logged in user
router.get("/chats", getChatIds);

//get all messages for a chat
router.get("/:chatId", getAllMessages);

//send a message
router.post("/:chatId", sendMessages);

export default router;

