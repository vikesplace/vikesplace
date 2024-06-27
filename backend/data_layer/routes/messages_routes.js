import express from "express";
import { sendMessages } from "../controllers/message_controller.js";

const router = express.Router();

//send a message
router.post("/:chatId", sendMessages);

export default router;