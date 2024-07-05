import express from "express";
import { getUserData } from "../controller/get_user_data.js";

const router = express.Router();

//get data of the user who is logged in
router.get("/me", (req, res) => {
    //handle logic here
    res.json({ message: "Get user data" });
});

//get another user's data
router.get("/:userId", getUserData);

//update user data
router.patch("/:userId", (req, res) => {
    //handle logic here
    res.json({ message: "Update user data" });
});

export default router;

