import express from "express";
import { getAllCharities } from "../controller/get_all_charities.js";

const router = express.Router();

//Get All Charities
router.get("/", getAllCharities);

export default router;