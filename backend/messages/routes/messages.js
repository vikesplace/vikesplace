import express from "express";

const router = express.Router();

//get all chat_ids for the logged in user
router.get("/chats", (req, res) => {
    //handle logic here
    res.json({ message: "Get all chat_ids" });
});

//get all messages for a chat
router.get("/:chatId", (req, res) => {
    //handle logic here
    res.json({ message: "Get all messages for a chat" });
});

//send a message
router.post("/:chatId", (req, res) => {
    //handle logic here
    res.json({ message: "Send a message" });
});

export default router;

