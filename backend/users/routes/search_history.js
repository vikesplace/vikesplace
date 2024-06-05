import express from "express";

const router = express.Router();

//get user's search history
router.get("/:userId/searches", (req, res) => {
    //handle logic here
    res.json({ message: "Get user's search history" });
});

export default router;

