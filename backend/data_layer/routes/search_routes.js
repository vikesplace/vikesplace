import express from "express";
import { searchListings } from "../controllers/search_controller.js";

const router = express.Router();

//Get search results
router.get("/", searchListings);

export default router;
