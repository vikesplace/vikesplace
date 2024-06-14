import express from "express";
import { getSearchResults } from "../controllers/search_controller.js";

const router = express.Router();

//Get search results
router.get("/", getSearchResults);

export default router;
