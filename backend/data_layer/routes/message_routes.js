import express from "express";
import { getAllMessages, createChat } from "../controllers/message_controller.js";

const router = express.Router();

//Get all messsages for a chat_id
router.get("/:chatId", getAllMessages);

//create new chat
router.post("/:listingId", getAllMessages);

export default router;