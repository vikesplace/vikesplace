import express from "express";
import { getAllMessages } from "../controllers/message_controller.js";

const router = express.Router();

//Get all messsages for a chat_id
router.get("/:chatId", getAllMessages);

export default router;