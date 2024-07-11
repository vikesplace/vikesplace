import express from "express";
import { getSearchResults } from "../controllers/get_search_results.js";


const router = express.Router();

//Get search results
router.get("/", getSearchResults);

export default router;