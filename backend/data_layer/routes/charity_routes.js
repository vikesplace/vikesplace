import express from "express";
import { getAllCharities } from "../controllers/charity_controller.js";

const router = express.Router();

//Get all charities
router.get("/", getAllCharities);

export default router;