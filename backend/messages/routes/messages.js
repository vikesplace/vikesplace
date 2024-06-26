import express from "express";
import { getAllMessages } from "../controller/get_all_messages.js";

const router = express.Router();

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

