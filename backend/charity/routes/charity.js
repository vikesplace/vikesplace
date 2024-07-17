import express from "express";
import { getAllCharities } from "../controller/get_all_charities.js";
import { createCharity } from "../controller/create_charity.js";

const router = express.Router();

//Get All Charities
router.get("/", getAllCharities);

//Create a charity
router.post("/", createCharity);

export default router;