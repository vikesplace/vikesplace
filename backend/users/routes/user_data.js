import express from "express";

const router = express.Router();

//get data of the user who is logged in
router.get("/me", (req, res) => {
    //handle logic here
    res.json({ message: "Get user data" });
});

//get another user's data
router.get("/:userId", (req, res) => {
    //handle logic here
    res.json({ message: "Get another user data" });
});

//update user data
router.patch("/:userId", (req, res) => {
    //handle logic here
    res.json({ message: "Update user data" });
});

export default router;

