import express from "express";
import { updateUserData} from "../controller/update_user_data.js";
import { getUserMe } from "../controller/get_user_me.js";
import { getUserData } from "../controller/get_user_data.js";
import { getUserSearchHistory } from "../controller/get_user_search_history.js";

const router = express.Router();

//get data of the user who is logged in
router.get("/me", getUserMe);

router.get("/:userId/searches", getUserSearchHistory)

//get another user's data
router.get("/:userId", getUserData);

//update user data
router.patch("/:userId", updateUserData);

export default router;

