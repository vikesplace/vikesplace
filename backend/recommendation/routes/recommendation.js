import express from "express";
import { ignoreRecommendation } from "../controller/ignore_recommendation.js";
import { getRecommendations } from "../controller/get_recommendations.js";

const router = express.Router();

//Get recommendations
router.get("/", getRecommendations);

//Ignore recommendation
router.post("/:listingId/ignore", ignoreRecommendation);

export default router;