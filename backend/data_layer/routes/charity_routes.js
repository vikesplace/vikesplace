import express from "express";
import { getAllCharities } from "../controllers/charity_controller.js";
import { createCharity } from "../controllers/charity_controller.js";

const router = express.Router();

//Get all charities
router.get("/", getAllCharities);

//Create a charity
router.post("/", createCharity);

export default router;