import express from "express";
import { getSearchResults } from "../controllers/getSearchResults.js";

const router = express.Router();

//Get search results
router.get("/", getSearchResults);

export default router;