import express from "express";
import { updateUserData} from "../controller/update_user_data.js";

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
router.patch("/:userId", updateUserData);

export default router;

